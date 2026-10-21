"""The Crew adapter reads authoritative job state from SQLite."""
import sqlite3
import json
import math
import os
import re
import shutil
import subprocess
import sys
import threading
import uuid
from datetime import datetime, timezone
from contextlib import closing
from pathlib import Path
from urllib.parse import urlsplit
import urllib.request

from shared.http import EMAIL, atomic_json, private_output
from job_pipeline import cli as pipeline_cli
from job_pipeline.service import build_default_runtime
from job_pipeline.assistant import OpenAICompatibleProvider, ProviderError
from job_pipeline.tool_broker import ToolContext
from job_pipeline.storage import JobStore
from job_pipeline.application_dashboard import collect_application_records, application_summary

CONTROL = {
    'assistantProviders': ('GET', '/v1/providers', None),
    'assistantModels': ('GET', '/v1/providers/{0}/models', None),
    'assistantConversations': ('GET', '/v1/conversations', None),
    'assistantCreate': ('POST', '/v1/conversations', 0),
    'assistantMessages': ('GET', '/v1/conversations/{0}/messages', None),
    'assistantQueue': ('GET', '/v1/conversations/{0}/queue', None),
    'assistantEvents': ('GET', '/v1/conversations/{0}/events', None),
    'assistantAttach': ('POST', '/v1/conversations/{0}/attachments', 1),
    'assistantSend': ('POST', '/v1/conversations/{0}/messages', 1),
    'assistantRun': ('POST', '/v1/conversations/{0}/run', None),
    'assistantEdit': ('PATCH', '/v1/messages/{0}', 'content'),
    'assistantCancel': ('POST', '/v1/messages/{0}/cancel', None),
    'assistantRetry': ('POST', '/v1/messages/{0}/retry', None),
    'assistantClear': ('DELETE', '/v1/conversations/{0}/messages', None),
    'toolsList': ('GET', '/v1/tools', None),
    'workflowsDryRun': ('POST', '/v1/workflows/dry-run', 0),
    'workflowsRun': ('POST', '/v1/workflows/run', 0),
    'schedulesList': ('GET', '/v1/schedules', None),
    'schedulesCreate': ('POST', '/v1/schedules', 0),
    'schedulesToggle': ('POST', '/v1/schedules/{0}/enabled', 'enabled'),
    'schedulesRunDue': ('POST', '/v1/schedules/run-due', None),
    'schedulesHistory': ('GET', '/v1/schedules/{0}/history', None),
}
LOCAL = {'doctor', 'services', 'servicesStart', 'searchSpawn', 'jobsRead', 'reportOpen',
    'applicationsRead', 'applicationsRefresh', 'applicationsFlag', 'applicationsUndo',
    'applicationsReportOpen', 'agentsList', 'configRead', 'configWrite', 'sessionsRead',
    'awbLaunch', 'loginUrl', 'controlStatus', 'providerCredentialStatus',
    'providerCredentialReimport', 'providerCredentialClear', 'schedulesInstallWake', 'browserRequest', 'searchCancel',
    'autonomyStatus', 'autonomyDisable', 'autonomyRun'}
UI_OPERATIONS = {name: 'local' for name in LOCAL} | {name: route[0] for name, route in CONTROL.items()}
CONFIG_NAMES = {'profile.json', 'searches.json', 'access_policy.json', 'agent_web_browser.json'}


def identifier(value):
    text = str(value)
    if not re.fullmatch(r'[A-Za-z0-9_-]{1,160}', text):
        raise ValueError('Invalid record identifier')
    return text


def text_value(value, label, cap=1600):
    if not isinstance(value, str) or len(value) > cap or any(ord(c) < 32 for c in value) or EMAIL.search(value):
        raise ValueError(f'Provide {label} without control characters or contact details')
    return value.strip()


def crew_home():
    return Path(os.environ.get('CODEXCREW_HOME', str(Path.home() / '.codex-crew')))


class CrewRuntime:
    name = 'expedient-employment'
    version = '2.2.0'

    def __init__(self, root, workspace=None):
        self.root = Path(root).resolve()
        self.code_root = Path(pipeline_cli.__file__).resolve().parent.parent
        self.workspace = Path(workspace or self.root / 'data' / 'workspace').resolve()
        for name in ('config', 'data', 'reports', 'logs'):
            (self.workspace / name).mkdir(parents=True, exist_ok=True)
        for name in CONFIG_NAMES | {'job_schema.json', 'application_profile.example.json'}:
            target = self.workspace / 'config' / name
            if not target.exists() and (self.code_root / 'config' / name).is_file():
                shutil.copy2(self.code_root / 'config' / name, target)
        self.controls = build_default_runtime(self.workspace, self.root / 'data' / 'control')
        self.controls.assistant._providers = {'FreeChain': OpenAICompatibleProvider('FreeChain',
            'http://127.0.0.1:4853/v1', transport=self.provider_transport)}
        self.runs = {}
        self.provider_enabled_path = self.root / 'data/provider-access.json'
        self.provider_enabled = json.loads(self.provider_enabled_path.read_text()).get('enabled', True) if self.provider_enabled_path.exists() else True
        self.run_lock = threading.RLock()
        self.pipeline_lock = threading.Lock()
        self.stopping = threading.Event()
        self.worker = threading.Thread(target=self.scheduler_loop, daemon=True)
        self.worker.start()

    def child_environment(self):
        environment = {key: value for key, value in os.environ.items()
            if key.upper() not in {'CODEXCREW_PROXY_SECRET', 'KIROCREW_PROXY_SECRET',
                'EXPEDIENT_CONTROL_TOKEN', 'ELECTRON_RUN_AS_NODE'}}
        entry = self.code_root / 'only-cli-runtime/node_modules/@only-cli/oc/src/cli.js'
        if not entry.exists():
            entry = self.code_root / 'gui/only-cli-runtime/node_modules/@only-cli/oc/src/cli.js'
        environment.update({'PYTHONPATH': str(self.code_root), 'PYTHONDONTWRITEBYTECODE': '1',
            'EXPEDIENT_PROJECT_ROOT': str(self.workspace), 'ONLY_CLI_ENTRY': str(entry),
            'WEBCLAW_TIMEOUT_SECONDS': '20', 'EXPEDIENT_BROWSER_DRIVER': 'llm-browser'})
        return environment

    def command(self, arguments, timeout=180):
        with self.pipeline_lock:
            result = subprocess.run([sys.executable, '-B', '-m', 'job_pipeline', *arguments],
                cwd=self.code_root, env=self.child_environment(), capture_output=True, text=True,
                encoding='utf-8', errors='replace', timeout=timeout,
                creationflags=(subprocess.CREATE_NO_WINDOW | subprocess.BELOW_NORMAL_PRIORITY_CLASS) if os.name == 'nt' else 0)
        return {'code': result.returncode, 'output': private_output((result.stdout + '\n' + result.stderr).strip())[-131072:]}

    def provider_transport(self, method, url, _headers, body, timeout):
        if not self.provider_enabled:
            raise ProviderError('Provider access is disconnected for this app. Reconnect it in Assistant.')
        route = urlsplit(url).path
        if route not in {'/v1/models', '/v1/chat/completions'}:
            raise ProviderError('Unsupported Crew provider operation')
        launch = crew_home() / 'apps/freechain/bin/freechain.mjs'
        if not launch.is_file():
            raise ProviderError('Enable the FreeChain app in Crew Library')
        result = subprocess.run([shutil.which('node') or 'node', str(launch), 'request', method, route],
            input=json.dumps(body) if body is not None else None, capture_output=True, text=True,
            encoding='utf-8', errors='replace', timeout=max(1, min(float(timeout), 120)),
            creationflags=subprocess.CREATE_NO_WINDOW if os.name == 'nt' else 0)
        if result.returncode:
            raise ProviderError(private_output(result.stderr.strip())[:300] or 'Crew provider request failed')
        return json.loads(result.stdout)

    def browser(self, method='GET', route='/api/status', payload=None):
        launch = crew_home() / 'apps/llm-browser/bin/llm-browser.py'
        if not launch.is_file():
            raise RuntimeError('Install and enable LLM Browser in Crew Library')
        result = subprocess.run([sys.executable, '-B', str(launch), 'request', method, route],
            input=json.dumps(payload) if payload is not None else None, capture_output=True, text=True,
            encoding='utf-8', errors='replace', timeout=120,
            creationflags=subprocess.CREATE_NO_WINDOW if os.name == 'nt' else 0)
        if result.returncode:
            raise RuntimeError(private_output(result.stderr.strip())[:300] or 'LLM Browser is not ready')
        return json.loads(result.stdout)

    def config(self, name, text=None):
        if name not in CONFIG_NAMES:
            raise ValueError('Only the documented job-search configuration files are available')
        path = self.workspace / 'config' / name
        if text is None:
            return {'exists': path.is_file(), 'text': path.read_text(encoding='utf-8') if path.is_file() else ''}
        if not isinstance(text, str) or len(text.encode()) > 262144 or EMAIL.search(text):
            raise ValueError('Configuration must be bounded JSON without contact details')
        value = json.loads(text)
        if not isinstance(value, dict):
            raise ValueError('Configuration must be a JSON object')
        if name == 'profile.json':
            candidate = value.get('candidate')
            weights = value.get('scoring', {}).get('weights', {})
            if not isinstance(candidate, dict) or not isinstance(candidate.get('target_roles'), list):
                raise ValueError('Profile requires candidate target roles')
            if not isinstance(weights, dict) or set(weights) != {'title', 'skills', 'experience', 'location', 'responsibilities'} or any(type(w) not in {int, float} or not math.isfinite(w) or not 0 <= w <= 1 for w in weights.values()) or abs(sum(weights.values()) - 1) > 0.001:
                raise ValueError('The five scoring weights must be finite, nonnegative numbers that sum to one')
        if name == 'searches.json' and not isinstance(value.get('queries'), list):
            raise ValueError('Searches require a query array')
        if path.is_file():
            shutil.copy2(path, path.with_suffix('.json.bak'))
        atomic_json(path, value)
        return {'ok': True}

    def applications(self):
        with JobStore(self.workspace / 'data/jobs.sqlite3') as store:
            records = collect_application_records(store, self.workspace / 'data/applied_jobs.json')
        return {'exists': True, 'summary': application_summary(records), 'applications': records}

    def start_search(self, parameters):
        if not isinstance(parameters, dict):
            raise ValueError('Search parameters must be an object')
        query = text_value(parameters.get('query', ''), 'a search query')
        location = text_value(parameters.get('location', ''), 'a location', 200)
        count = parameters.get('resultsWanted', 10)
        hours = parameters.get('hoursOld', 720)
        if type(count) is not int or not 1 <= count <= 30 or type(hours) is not int or not 1 <= hours <= 8760:
            raise ValueError('Use 1 to 30 results and a valid posting-age window')
        if location:
            query = (query + ' ' + location).strip()
        with self.run_lock:
            if any(run['status'] == 'running' for run in self.runs.values()):
                raise ValueError('A search is already running. Wait or cancel it before starting another.')
            run_id = uuid.uuid4().hex
            record = {'id': run_id, 'status': 'running', 'code': None, 'output': 'Running public job discovery...',
                'effective_concurrency': 1, 'hours_old_requested': hours}
            self.runs[run_id] = record
        arguments = ['run', '--max-jobs', str(count), '--concurrency', '1', '--hours-old', str(hours), '--output-json']
        if query:
            arguments += ['--query', query]
        threading.Thread(target=self.search_worker, args=(run_id, arguments), daemon=True).start()
        return {'run_id': run_id}

    def search_worker(self, run_id, arguments):
        try:
            with self.pipeline_lock:
                with self.run_lock:
                    if self.runs[run_id].get('cancel_requested'):
                        self.runs[run_id].update(status='cancelled', code=-1, output='Search cancelled before launch.')
                        return
                process = subprocess.Popen([sys.executable, '-B', '-m', 'job_pipeline', *arguments],
                    cwd=self.code_root, env=self.child_environment(), stdout=subprocess.PIPE,
                    stderr=subprocess.STDOUT, text=True, encoding='utf-8', errors='replace',
                    creationflags=(subprocess.CREATE_NO_WINDOW | subprocess.BELOW_NORMAL_PRIORITY_CLASS) if os.name == 'nt' else 0)
                with self.run_lock:
                    self.runs[run_id]['_process'] = process
                    if self.runs[run_id].get('cancel_requested'):
                        process.terminate()
                try:
                    output, _ = process.communicate(timeout=900)
                except subprocess.TimeoutExpired:
                    process.terminate()
                    output, _ = process.communicate(timeout=10)
                    output += '\nSearch time limit reached. Saved jobs were preserved.'
            with self.run_lock:
                record = self.runs[run_id]
                record.update(code=process.returncode,
                    status='cancelled' if record.get('cancel_requested') else 'succeeded' if process.returncode == 0 else 'failed',
                    output=private_output(output[-131072:]))
                record.pop('_process', None)
                atomic_json(self.root / 'data/runs' / (run_id + '.json'), record)
        except Exception as error:
            with self.run_lock:
                self.runs[run_id].update(status='failed', code=-1, output=private_output(str(error))[:300])

    def run_state(self, run_id):
        identifier(run_id)
        with self.run_lock:
            if run_id in self.runs:
                return {k: v for k, v in self.runs[run_id].items() if not k.startswith('_')}
        path = self.root / 'data/runs' / (run_id + '.json')
        if not path.is_file():
            raise ValueError('Unknown search run')
        return json.loads(path.read_text(encoding='utf-8'))

    def optional_service(self, name):
        address = {'paperclip': 'http://127.0.0.1:3100/api/companies',
            'resume-matcher': 'http://127.0.0.1:3000/api/v1/health'}[name]
        try:
            with urllib.request.urlopen(address, timeout=3) as response:
                data = response.read(1048577)
                if len(data) > 1048576:
                    raise ValueError('Optional service response exceeded its cap')
                return {'up': response.status == 200, 'data': json.loads(data), 'raw': response.status}
        except Exception:
            return {'up': False, 'raw': 'Optional service is not running'}

    def bridge(self, operation, args):
        if operation not in UI_OPERATIONS or not isinstance(args, list) or len(args) > 3:
            raise ValueError('Unknown UI operation or invalid argument list')
        if operation in CONTROL:
            method, pattern, body_index = CONTROL[operation]
            indexes = [int(i) for i in re.findall(r'\{(\d+)\}', pattern)]
            if type(body_index) is int:
                indexes.append(body_index)
            elif body_index in {'content', 'enabled'}:
                indexes.append(1)
            if len(args) != max(indexes, default=-1) + 1:
                raise ValueError('Incorrect argument count for this operation')
            if body_index == 'enabled' and type(args[1]) is not bool:
                raise ValueError('Schedule enabled must be a boolean')
            route = re.sub(r'\{(\d+)\}', lambda match: identifier(args[int(match.group(1))]), pattern)
            body = args[body_index] if type(body_index) is int else {'content': args[1]} if body_index == 'content' else {'enabled': args[1]} if body_index == 'enabled' else {}
            if not isinstance(body, dict):
                raise ValueError('Operation payload must be an object')
            app = self.controls.application
            result = app.get(route) if method == 'GET' else app.delete(route) if method == 'DELETE' else getattr(app, method.lower())(route, body)
            status, value = result
            if status >= 400:
                raise RuntimeError(str(value))
            return value
        counts = {'applicationsFlag': {2}, 'applicationsUndo': {1}, 'configRead': {1},
            'configWrite': {2}, 'searchSpawn': {1}, 'browserRequest': {2,3},
            'servicesStart': {1}, 'loginUrl': {1}, 'autonomyRun': {1, 2}}
        if len(args) not in counts.get(operation, {0}):
            raise ValueError('Incorrect argument count for this operation')
        if operation == 'doctor':
            return self.command(['doctor'])
        if operation == 'autonomyStatus':
            return self.command(['autonomy', 'status'])
        if operation == 'autonomyDisable':
            return self.command(['autonomy', 'disable'])
        if operation == 'autonomyRun':
            # Enabling stays with the owner on the command line; an agent may only run or stop.
            resume = Path(str(args[0])).expanduser()
            if resume.suffix.casefold() != '.docx' or not resume.is_file():
                raise ValueError('Provide the path of an existing DOCX resume')
            if len(args) == 2 and type(args[1]) is not bool:
                raise ValueError('dry_run must be a boolean')
            extra = ['--dry-run'] if len(args) == 2 and args[1] else []
            return self.command(['agent-c-auto', '--resume', str(resume.resolve()), *extra], timeout=1800)
        if operation == 'jobsRead':
            return read_jobs(self.workspace)
        if operation == 'applicationsRead':
            return self.applications()
        if operation == 'applicationsRefresh':
            return self.command(['applications-report'])
        if operation == 'applicationsFlag':
            if args[1] not in {'interview', 'denied', 'not_selected'}:
                raise ValueError('Unknown application outcome')
            return self.command(['application-flag', identifier(args[0]), args[1]])
        if operation == 'applicationsUndo':
            return self.command(['application-undo', identifier(args[0])])
        if operation in {'configRead', 'configWrite'}:
            return self.config(args[0], args[1] if operation == 'configWrite' else None)
        if operation == 'searchSpawn':
            return self.start_search(args[0])
        if operation == 'searchCancel':
            with self.run_lock:
                active = next((r for r in self.runs.values() if r['status'] == 'running'), None)
                if not active:
                    return {'cancelled': False, 'reason': 'No active search'}
                active['cancel_requested'] = True
                process = active.get('_process')
                if process is not None and process.poll() is None:
                    process.terminate()
            return {'cancelled': True}
        if operation == 'browserRequest':
            return self.browser(args[0], args[1], args[2] if len(args) > 2 else None)
        if operation in {'reportOpen', 'applicationsReportOpen'}:
            filename = 'applications_dashboard.html' if operation == 'applicationsReportOpen' else 'job_matches.html'
            path = self.workspace / 'reports' / filename
            if not path.is_file():
                result = self.command(['applications-report' if operation == 'applicationsReportOpen' else 'report'])
                if result['code'] != 0:
                    return {'ok': False, 'error': result['output']}
            return {'ok': path.is_file(), 'html': private_output(path.read_text(encoding='utf-8')) if path.is_file() else ''}
        if operation == 'controlStatus':
            return {'ready': True, 'port': None, 'managed': True}
        if operation == 'services':
            try:
                browser = self.browser()
                browser_status = {'up': True, 'app': 'LLM Browser', 'isBridge': True, 'raw': browser.get('tier', 'idle')}
            except RuntimeError as error:
                browser_status = {'up': False, 'app': 'LLM Browser', 'raw': str(error)}
            return {'awb': browser_status, 'paperclip': self.optional_service('paperclip'),
                'resumeMatcher': self.optional_service('resume-matcher')}
        if operation == 'servicesStart':
            name = args[0]
            if name not in {'paperclip', 'resume-matcher', 'all'}:
                raise ValueError('Unknown optional service')
            names = ['paperclip', 'resume-matcher'] if name == 'all' else [name]
            return {('resumeMatcher' if item == 'resume-matcher' else item):
                {**self.optional_service(item), 'error': 'This optional service is managed separately. Open its page for setup.'}
                for item in names}
        if operation == 'sessionsRead':
            state = self.browser()
            return {'exists': True, 'data': {'llm-browser': {'tier': state.get('tier'), 'url': state.get('url', '')}}}
        if operation == 'awbLaunch':
            state = self.browser('POST', '/api/start', {'tier': 'lean'})
            return {'launched': bool(state.get('ok')), 'bridgeUp': bool(state.get('ok')), 'app': 'LLM Browser', 'error': state.get('error')}
        if operation == 'loginUrl':
            policy = json.loads(self.config('access_policy.json')['text'])
            site = policy.get('session_sites', {}).get(identifier(args[0]))
            return {'ok': bool(site), 'url': site.get('login_url', '') if site else ''}
        if operation == 'agentsList':
            status = self.optional_service('paperclip')
            if not status['up']:
                return {'online': False, 'agents': [], 'message': 'Paperclip is optional and currently unavailable.'}
            companies = status['data'] if isinstance(status['data'], list) else status['data'].get('companies', [])
            company = next((c for c in companies if c.get('name') == 'AI Job Search Team'), None)
            if not company:
                return {'online': True, 'agents': [], 'message': 'No job-search team is configured in Paperclip.'}
            target = 'http://127.0.0.1:3100/api/companies/' + identifier(company['id']) + '/agents'
            with urllib.request.urlopen(target, timeout=5) as response:
                agents = json.loads(response.read(1048576))
            return {'online': True, 'company': company['name'], 'agents': agents}
        if operation.startswith('providerCredential'):
            if operation == 'providerCredentialClear':
                self.provider_enabled = False
                atomic_json(self.provider_enabled_path, {'enabled': False})
                return {'configured': False, 'saved': False, 'source': 'Manage provider access in the FreeChain Crew app'}
            if operation == 'providerCredentialReimport':
                self.provider_enabled = True
                atomic_json(self.provider_enabled_path, {'enabled': True})
            ready = self.controls.assistant._providers['FreeChain'].readiness()
            return {'configured': ready['ready'], 'saved': False, 'source': 'Crew-managed FreeChain'}
        if operation == 'schedulesInstallWake':
            return {'code': 0, 'output': 'Background schedules run while this Crew app is enabled. No separate Windows wake task is needed.'}
        raise ValueError('Unsupported operation')

    def handle(self, method, target, payload):
        path = urlsplit(target).path
        if method == 'GET' and path in {'/api/status', '/api/schema'}:
            return 200, {'app': self.name, 'version': self.version, 'ready': True,
                'browser': 'llm-browser', 'operations': sorted(UI_OPERATIONS), 'workspace': str(self.workspace)}
        if method == 'GET' and path == '/api/jobs':
            return 200, read_jobs(self.workspace)
        if method == 'GET' and path == '/api/applications':
            return 200, self.applications()
        if method == 'POST' and path == '/api/bridge':
            if set(payload) != {'operation', 'args'}:
                raise ValueError('Provide the operation name and argument array')
            return 200, self.bridge(payload['operation'], payload['args'])
        if method == 'POST' and path == '/api/research/agent-reach':
            operation = payload.get('operation')
            if operation not in {'health', 'read_web'} or set(payload) - {'operation', 'arguments'}:
                raise ValueError('Use Agent Reach health or read_web with structured arguments')
            arguments = payload.get('arguments', {})
            if not isinstance(arguments, dict):
                raise ValueError('Agent Reach arguments must be an object')
            result = self.controls.broker.invoke('research.agent_reach.' + operation, arguments,
                ToolContext(actor='crew-api', request_id=uuid.uuid4().hex))
            return 200, result.data
        if method == 'POST' and path == '/api/jobs/search':
            return 202, self.start_search(payload)
        if path.startswith('/api/runs/'):
            run_id = path.rsplit('/', 1)[-1]
            if method == 'GET':
                return 200, self.run_state(run_id)
            if method == 'DELETE':
                with self.run_lock:
                    record = self.runs.get(identifier(run_id))
                    if record and record.get('status') == 'running':
                        record['cancel_requested'] = True
                        if record.get('_process') and record['_process'].poll() is None:
                            record['_process'].terminate()
                return 200, self.run_state(run_id)
        if method == 'POST' and path == '/api/browser':
            request_method = payload.get('method', 'GET')
            route = payload.get('route', '/api/status')
            if request_method not in {'GET', 'POST'} or route not in {'/api/status', '/api/read', '/api/frame',
                    '/api/start', '/api/stop', '/api/swap', '/api/navigate', '/api/act', '/api/realclick', '/api/type', '/api/press', '/api/settings'}:
                raise ValueError('Unsupported browser operation')
            return 200, self.browser(request_method, route, payload.get('body'))
        if path.startswith('/api/v1/'):
            route = path[4:]
            app = self.controls.application
            return app.get(route) if method == 'GET' else app.delete(route) if method == 'DELETE' else getattr(app, method.lower())(route, payload)
        return 404, {'error': 'Unknown API route'}

    def scheduler_loop(self):
        while not self.stopping.wait(30):
            try:
                self.controls.scheduler.run_due(now=datetime.now(timezone.utc))
            except Exception:
                continue

    def close(self):
        self.stopping.set()
        self.worker.join(timeout=2)
        with self.run_lock:
            for record in self.runs.values():
                process = record.get('_process')
                if process is not None and process.poll() is None:
                    process.terminate()
        self.controls.close()


def read_jobs(workspace):
    database = Path(workspace) / 'data' / 'jobs.sqlite3'
    if not database.exists():
        return {'exists': False, 'rows': []}
    with closing(sqlite3.connect(database.as_uri() + '?mode=ro', uri=True)) as connection:
        connection.row_factory = sqlite3.Row
        records = connection.execute('''
            SELECT j.id, j.title, j.company, j.location, j.work_mode, j.employment_type,
                   j.posted_date, j.salary, j.url, j.description,
                   COALESCE(a.status, 'new') AS status, COALESCE(a.notes, '') AS notes,
                   m.final_score AS score, m.final_score, COALESCE(m.fit_label, 'unassessed') AS fit_label,
                   COALESCE(m.matched_skills_json, '[]') AS matched_skills,
                   COALESCE(m.gaps_json, '[]') AS gaps,
                   COALESCE(m.recommendation, 'Review qualifications with the owner.') AS recommendation
            FROM jobs j LEFT JOIN applications a ON a.job_id=j.id
            LEFT JOIN matches m ON m.job_id=j.id ORDER BY j.updated_at DESC, j.title
        ''').fetchall()
    return {'exists': True, 'rows': [{key: '' if row[key] is None else str(row[key])
        for key in row.keys()} for row in records]}
