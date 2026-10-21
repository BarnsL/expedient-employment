"""Owner CLI client. Authentication stays inside this supported local client."""
import json
import sys
import urllib.error
import urllib.request
from pathlib import Path

from .http import private_output, sign_cli, verified, registration


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, request, file, code, message, headers, new_url):
        return None


def request(root, app_name, method, target, payload=None):
    root = Path(root)
    if method not in {'GET', 'POST', 'PATCH', 'DELETE', 'PUT'} or not target.startswith('/api/'):
        raise ValueError('Use a documented API route and HTTP method')
    if '..' in target or any(ord(c) < 32 for c in target):
        raise ValueError('Invalid API target')
    state = registration(root, app_name)
    if not state['enabled']:
        raise RuntimeError(f"{app_name} is {state['state']} in Crew (updated {state.get('updated_at') or 'time unknown'}). Saved data is preserved. Review this app's named trust and enable it in Library.")
    try:
        runtime = json.loads((root / 'data' / 'runtime.json').read_text(encoding='utf-8'))
        if runtime.get('app') != app_name or type(runtime.get('port')) is not int or not 1 <= runtime['port'] <= 65535:
            raise ValueError('Invalid managed runtime discovery record')
        key = (root / 'data' / '.cli-key').read_text(encoding='utf-8').strip()
    except OSError as error:
        raise RuntimeError(f'{app_name} is not running in Crew. Enable it in Library and grant the requested app access.') from error
    body = b'' if payload is None else json.dumps(payload, ensure_ascii=True).encode()
    signature = sign_cli(key, method, target, body)
    message = urllib.request.Request(f"http://127.0.0.1:{runtime['port']}{target}", data=body if body else None,
        method=method, headers={'Content-Type': 'application/json', 'X-Crew-App-CLI': signature})
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), NoRedirect())
    try:
        with opener.open(message, timeout=180) as response:
            result = response.read(16 * 1024 * 1024 + 1)
            if len(result) > 16 * 1024 * 1024:
                raise RuntimeError('App response exceeded the output limit')
            response_target = f'{method}:{target}:{signature}:{response.status}'
            if not verified(response.headers.get('X-Crew-App-Response'), key, 'RESPONSE', response_target, result):
                raise RuntimeError('App response authentication failed. No result was accepted.')
    except urllib.error.HTTPError as error:
        if 300 <= error.code < 400:
            raise RuntimeError('App redirects are refused; the request was not forwarded.') from error
        error_body = error.read(4096)
        error_target = f'{method}:{target}:{signature}:{error.code}'
        if not verified(error.headers.get('X-Crew-App-Response'), key, 'RESPONSE', error_target, error_body):
            raise RuntimeError(f'App returned HTTP {error.code} without an authenticated error response.') from error
        try:
            detail = json.loads(error_body).get('error', f'HTTP {error.code}')
        except (ValueError, AttributeError):
            detail = f'App request failed with HTTP {error.code}'
        raise RuntimeError(private_output(str(detail))) from error
    except OSError as error:
        raise RuntimeError('The Crew-managed app is not reachable. Check Library enablement and app access.') from error
    return private_output(json.loads(result))


def body_from_stdin():
    if sys.stdin.isatty():
        raise ValueError('Pipe the JSON body into stdin; do not place private data in command arguments')
    text = sys.stdin.read(12 * 1024 * 1024 + 1)
    if len(text.encode()) > 12 * 1024 * 1024:
        raise ValueError('JSON input exceeds the request limit')
    value = json.loads(text)
    if not isinstance(value, dict):
        raise ValueError('JSON input must be an object')
    return value
