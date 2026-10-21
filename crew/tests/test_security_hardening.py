"""Disposable tests for admission, replay, redirects and research boundaries."""
import json
import sys
import tempfile
import threading
import unittest
import urllib.error
import urllib.request
import subprocess
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT.parent))
from shared import http, cli


class Counter:
    name = 'expedient-employment'
    version = 'fixture'
    count = 0
    def handle(self, method, target, payload):
        self.count += 1
        return 200, {'count': self.count}


class Security(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / 'installed.json').write_text(json.dumps({'name': 'expedient-employment', 'enabled': True}))
        self.counter = Counter()
        self.server = http.Server(self.counter, self.root, 'fixture-proxy-secret', 0)
        thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        thread.start()
        self.addCleanup(self.server.server_close)
        self.addCleanup(self.server.shutdown)
        self.url = f'http://127.0.0.1:{self.server.server_address[1]}/api/counter'

    def test_disabled_registration_blocks_stale_backend_access(self):
        (self.root / 'installed.json').write_text(json.dumps({'name': 'expedient-employment', 'enabled': False}))
        with self.assertRaisesRegex(RuntimeError, 'disabled'):
            cli.request(self.root, 'expedient-employment', 'POST', '/api/counter', {})
        self.assertEqual(self.counter.count, 0)

    def test_legacy_replayable_cli_signature_is_rejected(self):
        body = b'{}'
        signature = http.sign(self.server.cli_key, 'POST', '/api/counter', body)
        request = urllib.request.Request(self.url, data=body, headers={'Content-Type': 'application/json', 'X-Crew-App-CLI': signature})
        with self.assertRaises(urllib.error.HTTPError) as error:
            urllib.request.urlopen(request)
        self.assertEqual(error.exception.code, 401)

    def test_cli_round_trip_and_response_authentication(self):
        self.assertEqual(cli.request(self.root, 'expedient-employment', 'POST', '/api/counter', {})['count'], 1)
        original = http.Handler.send_header
        def omit_signature(handler, name, value):
            if name != 'X-Crew-App-Response':
                original(handler, name, value)
        with patch.object(http.Handler, 'send_header', omit_signature), self.assertRaisesRegex(RuntimeError, 'response authentication'):
            cli.request(self.root, 'expedient-employment', 'GET', '/api/counter')

    def test_replay_is_rejected_before_another_mutation(self):
        body = b'{}'
        signature = http.sign_cli(self.server.cli_key, 'POST', '/api/counter', body)
        request = urllib.request.Request(self.url, data=body, headers={'Content-Type': 'application/json', 'X-Crew-App-CLI': signature})
        urllib.request.urlopen(request).close()
        with self.assertRaises(urllib.error.HTTPError) as error:
            urllib.request.urlopen(request)
        self.assertEqual(error.exception.code, 409)
        self.assertEqual(self.counter.count, 1)

    def test_cli_never_forwards_its_signature_on_redirect(self):
        received = []
        class Trap(BaseHTTPRequestHandler):
            def do_GET(self):
                received.append(True)
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b'{}')
            def log_message(self, *args):
                return
        trap = ThreadingHTTPServer(('127.0.0.1', 0), Trap)
        threading.Thread(target=trap.serve_forever, daemon=True).start()
        self.addCleanup(trap.server_close)
        self.addCleanup(trap.shutdown)
        def redirect(handler):
            handler.send_response(302)
            handler.send_header('Location', f'http://127.0.0.1:{trap.server_address[1]}/capture')
            handler.end_headers()
        with patch.object(http.Handler, 'do_GET', redirect), self.assertRaisesRegex(RuntimeError, 'redirects are refused'):
            cli.request(self.root, 'expedient-employment', 'GET', '/api/counter')
        self.assertEqual(received, [])

    def test_model_cannot_change_web_session_without_exact_approval(self):
        from job_pipeline.integrations.only_cli import OnlyCliAdapter
        from job_pipeline.tool_broker import ToolBroker, ToolContext, ApprovalRequiredError
        entry = self.root / 'fixture.js'
        entry.write_text('// fixture')
        calls = []
        def runner(args, **kwargs):
            calls.append(args)
            return subprocess.CompletedProcess(args, 0, '{}', '')
        adapter = OnlyCliAdapter(self.root, cli_entry=entry, runner=runner)
        broker = ToolBroker(adapter.tool_specs())
        with self.assertRaises(ApprovalRequiredError):
            broker.invoke('web.only_cli.do', {'args': ['click', 'apply']}, ToolContext(actor='fixture', request_id='fixture'))
        with self.assertRaises(ApprovalRequiredError):
            broker.invoke('web.only_cli.login', {'domain': 'example.com', 'credential_env': 'ONLY_CLI_COOKIE_FIXTURE'}, ToolContext(actor='fixture', request_id='fixture'))
        with self.assertRaises(ApprovalRequiredError):
            broker.invoke('web.only_cli.logout', {}, ToolContext(actor='fixture', request_id='fixture'))
        self.assertEqual(calls, [])
        broker.invoke('web.only_cli.read', {'args': []}, ToolContext(actor='fixture', request_id='read-fixture'))
        self.assertEqual(len(calls), 1)

    def test_agent_reach_rejects_private_or_credential_urls(self):
        from job_pipeline.integrations.agent_reach import public_job_url
        for url in ('http://127.0.0.1/', 'https://apply.careers.microsoft.com/candidate/login',
                    'https://apply.careers.microsoft.com/careers?token=private',
                    'https://www.linkedin.com/in/person/', 'https://careers.microsoft.com.attacker.test/'):
            with self.subTest(url=url), self.assertRaises(ValueError):
                public_job_url(url)
        with patch('socket.getaddrinfo', return_value=[(2, 1, 6, '', ('127.0.0.1', 443))]), self.assertRaises(ValueError):
            public_job_url('https://apply.careers.microsoft.com/careers/job/123')

    def test_output_redacts_credential_fields(self):
        output = http.private_output({'authorization': 'Bearer fixture-secret', 'api_key': 'fixture-key', 'model_count': 34})
        self.assertNotIn('fixture-secret', str(output))
        self.assertNotIn('fixture-key', str(output))
        self.assertEqual(output['model_count'], 34)


if __name__ == '__main__':
    unittest.main()
