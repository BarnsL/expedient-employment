"""Expedient Employment's authenticated Crew CLI."""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from shared.cli import body_from_stdin, request
from shared.http import registration

HELP = '''Expedient Employment Crew CLI
  status                         Runtime and complete operation inventory
  doctor                         Pipeline and dependency readiness
  diagnostics                    Registration state without starting app code
  agent-reach health             Read Agent Reach backend readiness
  agent-reach read URL            Read a public job page through Agent Reach
  jobs                           Authoritative saved jobs
  autonomy status|disable        Read or stop unattended submission
  autonomy run RESUME [--dry-run] Submit eligible applications under the owner policy
  applications                   Application lifecycle dashboard
  settings NAME                  Read a documented configuration file
  set-settings NAME              Read a JSON object from stdin and save it
  call OPERATION                 Read {"args":[...]} from stdin
  search                         Read search parameters from stdin
  run RUN_ID                     Search progress and final output
  cancel RUN_ID                  Cancel an owned search run
  browser                        Read a browser operation object from stdin
  request METHOD /api/...        Generic documented API; write bodies use stdin
  help
Crew starts the backend. Enable the app and grant its requested access in Library.
'''

def main(arguments):
    command = arguments[0] if arguments else 'help'
    if command in {'help', '-h', '--help'}:
        print(HELP)
        return 0
    routes = {'status': '/api/status', 'jobs': '/api/jobs', 'applications': '/api/applications'}
    if command == 'diagnostics' and len(arguments) == 1:
        result = registration(ROOT, 'expedient-employment')
        result['runtime_record_present'] = (ROOT / 'data/runtime.json').is_file()
        result['saved_jobs_present'] = (ROOT / 'data/workspace/data/jobs.sqlite3').is_file()
    elif command == 'agent-reach' and len(arguments) == 2 and arguments[1] == 'health':
        result = request(ROOT, 'expedient-employment', 'POST', '/api/research/agent-reach', {'operation': 'health'})
    elif command == 'agent-reach' and len(arguments) == 3 and arguments[1] == 'read':
        result = request(ROOT, 'expedient-employment', 'POST', '/api/research/agent-reach',
            {'operation': 'read_web', 'arguments': {'url': arguments[2]}})
    elif command == 'autonomy' and len(arguments) == 2 and arguments[1] in {'status', 'disable'}:
        operation = 'autonomyStatus' if arguments[1] == 'status' else 'autonomyDisable'
        result = request(ROOT, 'expedient-employment', 'POST', '/api/bridge', {'operation': operation, 'args': []})
    elif command == 'autonomy' and len(arguments) in {3, 4} and arguments[1] == 'run':
        if len(arguments) == 4 and arguments[3] != '--dry-run':
            raise ValueError('Use autonomy run RESUME [--dry-run]')
        result = request(ROOT, 'expedient-employment', 'POST', '/api/bridge',
            {'operation': 'autonomyRun', 'args': [arguments[2], len(arguments) == 4]})
    elif command in routes and len(arguments) == 1:
        result = request(ROOT, 'expedient-employment', 'GET', routes[command])
    elif command == 'doctor' and len(arguments) == 1:
        result = request(ROOT, 'expedient-employment', 'POST', '/api/bridge', {'operation': 'doctor', 'args': []})
    elif command in {'settings', 'set-settings'}:
        if len(arguments) != 2:
            raise ValueError('Provide one configuration filename')
        args = [arguments[1]]
        if command == 'set-settings':
            args.append(json.dumps(body_from_stdin()))
        result = request(ROOT, 'expedient-employment', 'POST', '/api/bridge',
            {'operation': 'configWrite' if command == 'set-settings' else 'configRead', 'args': args})
    elif command == 'call':
        body = body_from_stdin()
        if len(arguments) != 2 or set(body) != {'args'}:
            raise ValueError('Use call OPERATION with {"args":[...]} on stdin')
        result = request(ROOT, 'expedient-employment', 'POST', '/api/bridge', {'operation': arguments[1], 'args': body['args']})
    elif command in {'search', 'browser'} and len(arguments) == 1:
        result = request(ROOT, 'expedient-employment', 'POST', '/api/jobs/search' if command == 'search' else '/api/browser', body_from_stdin())
    elif command in {'run', 'cancel'}:
        if len(arguments) != 2:
            raise ValueError('Provide one run identifier')
        result = request(ROOT, 'expedient-employment', 'GET' if command == 'run' else 'DELETE', '/api/runs/' + arguments[1])
    elif command == 'request' and len(arguments) == 3:
        method, target = arguments[1:]
        result = request(ROOT, 'expedient-employment', method, target,
            body_from_stdin() if method in {'POST', 'PATCH', 'PUT'} else None)
    else:
        raise ValueError('Unknown command. Run help.')
    print(json.dumps(result, ensure_ascii=True, indent=2))
    return 0

if __name__ == '__main__':
    try:
        sys.exit(main(sys.argv[1:]))
    except (ValueError, RuntimeError, OSError) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
