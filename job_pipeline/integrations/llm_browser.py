"""Use the installed LLM Browser's supported owner CLI for primary page reads."""
import json
import os
import subprocess
import sys
import time
from pathlib import Path


class LlmBrowserError(RuntimeError):
    pass


class LlmBrowserClient:
    def __init__(self):
        home = Path(os.environ.get('CODEXCREW_HOME', str(Path.home() / '.codex-crew')))
        self.launcher = home / 'apps/llm-browser/bin/llm-browser.py'

    def request(self, method, route, body=None):
        if not self.launcher.is_file():
            raise LlmBrowserError('Install and enable LLM Browser in Crew Library')
        result = subprocess.run([sys.executable, '-B', str(self.launcher), 'request', method, route],
            input=json.dumps(body) if body is not None else None, capture_output=True,
            text=True, encoding='utf-8', errors='replace', timeout=120,
            creationflags=subprocess.CREATE_NO_WINDOW if os.name == 'nt' else 0)
        if result.returncode:
            raise LlmBrowserError(result.stderr.strip()[:300] or 'LLM Browser request failed')
        value = json.loads(result.stdout)
        if value.get('ok') is False:
            raise LlmBrowserError(value.get('error') or value.get('remedy') or 'Browser operation did not complete')
        return value

    def status(self):
        return self.request('GET', '/api/status')

    def scrape(self, url):
        self.request('POST', '/api/navigate', {'url': url})
        deadline = time.monotonic() + 30
        while True:
            page = self.request('GET', '/api/read?max_chars=30000')
            if page.get('needs_handoff'):
                raise LlmBrowserError('Page needs owner sign-in or bot-challenge verification in LLM Browser')
            if len(page.get('text', '')) >= 180 and page.get('state') != 'loading':
                return {'url': page.get('url', url), 'metadata': {'title': page.get('title', '')},
                    'content': {'plain_text': page['text'], 'markdown': page['text']},
                    'structured_data': page.get('structured_data', []), 'reader': 'llm-browser'}
            if time.monotonic() >= deadline:
                raise LlmBrowserError('The page did not produce enough readable job content within the time limit')
            time.sleep(0.75)
