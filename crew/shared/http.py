"""Crew-managed loopback admission and owner CLI transport for both apps."""
import hashlib
import hmac
import json
import os
import re
import secrets
import subprocess
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

EMAIL = re.compile(r'(?i)\b[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}\b')
MAX_BODY = 12 * 1024 * 1024
PRIVATE_FIELDS = {'authorization', 'cookie', 'password', 'api_key', 'access_token',
    'refresh_token', 'client_secret', 'private_key', 'secret'}


def private_output(value):
    if isinstance(value, str):
        value = re.sub(r'(?i)\bBearer\s+[^\s,;"<>]+', 'Bearer [omitted]', value)
        value = re.sub(r'(?i)\b(api[_-]?key|access[_-]?token|client[_-]?secret|password)\s*[:=]\s*[^\s,;"<>]+', r'\1=[omitted]', value)
        value = re.sub(r'(?i)([?&](?:access_token|id_token|token|key|ticket|code|state)=)[^&\s#]+', r'\1[omitted]', value)
        return EMAIL.sub('[contact omitted]', value)
    if isinstance(value, dict):
        return {k: '[omitted]' if str(k).lower() in PRIVATE_FIELDS else private_output(v) for k, v in value.items()}
    if isinstance(value, (tuple, list)):
        return [private_output(v) for v in value]
    return value


def sign(secret, method, target, body=b'', stamp=None):
    stamp = str(int(time.time()) if stamp is None else stamp)
    digest = hashlib.sha256(body).hexdigest()
    mac = hmac.new(secret.encode(), f'{stamp}:{method}:{target}:{digest}'.encode(), hashlib.sha256).hexdigest()
    return f'{stamp}:{mac}'


def verified(signature, secret, method, target, body):
    if not secret or not re.fullmatch(r'\d{10}:[a-f0-9]{64}', signature or ''):
        return False
    stamp = signature.split(':', 1)[0]
    return abs(time.time() - int(stamp)) <= 60 and hmac.compare_digest(signature, sign(secret, method, target, body, stamp))


def sign_cli(secret, method, target, body=b'', stamp=None, nonce=None):
    stamp = str(int(time.time()) if stamp is None else stamp)
    nonce = nonce or secrets.token_hex(16)
    digest = hashlib.sha256(body).hexdigest()
    mac = hmac.new(secret.encode(), f'cli-v2:{stamp}:{nonce}:{method}:{target}:{digest}'.encode(), hashlib.sha256).hexdigest()
    return f'{stamp}:{nonce}:{mac}'


def registration(root, app_name):
    try:
        record = json.loads((Path(root) / 'installed.json').read_text(encoding='utf-8'))
        if record.get('name') != app_name or type(record.get('enabled')) is not bool:
            raise ValueError('Invalid app registration')
        return {'app': app_name, 'enabled': record['enabled'], 'updated_at': record.get('updatedAt', ''),
            'version': record.get('version', ''), 'state': 'enabled' if record['enabled'] else 'disabled'}
    except (OSError, ValueError, TypeError, AttributeError):
        return {'app': app_name, 'enabled': False, 'state': 'registration_unavailable'}


def private_directory(directory):
    directory = Path(directory)
    directory.mkdir(parents=True, exist_ok=True, mode=0o700)
    if os.name == 'nt':
        command = Path(os.environ.get('SystemRoot', 'C:/Windows')) / 'System32/icacls.exe'
        subprocess.run([str(command), str(directory), '/inheritance:r', '/grant:r',
            '*S-1-3-4:(OI)(CI)F', '*S-1-5-18:(OI)(CI)F', '*S-1-5-32-544:(OI)(CI)F'],
            check=True, capture_output=True, timeout=15, creationflags=subprocess.CREATE_NO_WINDOW)
    else:
        directory.chmod(0o700)


def atomic_json(path, value):
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + '.' + secrets.token_hex(6) + '.tmp')
    try:
        with os.fdopen(os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600), 'w', encoding='utf-8') as stream:
            stream.write(json.dumps(value, ensure_ascii=True, indent=2) + '\n')
        os.replace(temporary, path)
    finally:
        temporary.unlink(missing_ok=True)


class Server(ThreadingHTTPServer):
    daemon_threads = True
    allow_reuse_address = False

    def __init__(self, app, root, proxy_secret, port=0):
        if not proxy_secret:
            raise ValueError('Crew must provide its app proxy signature key')
        self.application = app
        self.root = Path(root)
        self.proxy_secret = proxy_secret
        self.slots = threading.BoundedSemaphore(4)
        self.nonces = {}
        self.nonce_lock = threading.Lock()
        key_path = self.root / 'data' / '.cli-key'
        private_directory(key_path.parent)
        if not key_path.exists():
            try:
                with os.fdopen(os.open(key_path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600), 'w') as file:
                    file.write(secrets.token_urlsafe(48))
            except FileExistsError:
                pass
        self.cli_key = key_path.read_text(encoding='utf-8').strip()
        if len(self.cli_key) < 32:
            raise ValueError('Invalid owner CLI key')
        super().__init__(('127.0.0.1', port), Handler)
        atomic_json(self.root / 'data' / 'runtime.json', {'app': app.name, 'version': app.version,
            'pid': os.getpid(), 'port': self.server_address[1], 'started_at': int(time.time())})

    def admit_cli(self, signature, method, target, body):
        if not re.fullmatch(r'\d{10}:[a-f0-9]{32}:[a-f0-9]{64}', signature or ''):
            return 401
        stamp, nonce, _mac = signature.split(':')
        if abs(time.time() - int(stamp)) > 60 or not hmac.compare_digest(signature, sign_cli(self.cli_key, method, target, body, stamp, nonce)):
            return 401
        with self.nonce_lock:
            self.nonces = {key: value for key, value in self.nonces.items() if time.time() - value < 120}
            if nonce in self.nonces:
                return 409
            if len(self.nonces) >= 4096:
                return 429
            self.nonces[nonce] = time.time()
        return 200

    def server_close(self):
        super().server_close()
        runtime = self.root / 'data/runtime.json'
        try:
            record = json.loads(runtime.read_text(encoding='utf-8'))
            if record.get('pid') == os.getpid() and record.get('port') == self.server_address[1]:
                runtime.unlink()
        except (OSError, ValueError):
            pass

    def process_request(self, request, client_address):
        if not self.slots.acquire(blocking=False):
            self.shutdown_request(request)
            return
        try:
            super().process_request(request, client_address)
        except Exception:
            self.slots.release()
            raise

    def process_request_thread(self, request, client_address):
        try:
            super().process_request_thread(request, client_address)
        finally:
            self.slots.release()


class Handler(BaseHTTPRequestHandler):
    server_version = 'CrewManagedApp'
    sys_version = ''

    def setup(self):
        self.request.settimeout(20)
        super().setup()

    def log_message(self, *_args):
        pass

    def send(self, status, value):
        payload = json.dumps(private_output(value), ensure_ascii=True).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(payload)))
        if getattr(self, 'response_signature', ''):
            target = f'{self.command}:{self.path}:{self.response_signature}:{status}'
            self.send_header('X-Crew-App-Response', sign(self.server.cli_key, 'RESPONSE', target, payload))
        self.end_headers()
        self.wfile.write(payload)

    def dispatch(self):
        try:
            self.response_signature = ''
            lengths = self.headers.get_all('Content-Length', [])
            if self.headers.get('Transfer-Encoding') or len(lengths) > 1:
                return self.send(400, {'error': 'Unsupported request framing'})
            length = lengths[0] if lengths else '0'
            if not re.fullmatch(r'\d{1,8}', length) or int(length) > MAX_BODY:
                return self.send(413, {'error': 'Request exceeds the size limit'})
            body = self.rfile.read(int(length))
            if len(body) != int(length):
                return self.send(400, {'error': 'Incomplete request'})
            if self.command == 'GET' and self.path == '/health':
                return self.send(200, {'status': 'ok', 'app': self.server.application.name,
                    'version': self.server.application.version, 'managed': True})
            proxy = verified(self.headers.get('X-CodexCrew-Proxy'), self.server.proxy_secret, self.command, self.path, body)
            signature = self.headers.get('X-Crew-App-CLI', '')
            cli_status = self.server.admit_cli(signature, self.command, self.path, body) if signature else 401
            if cli_status != 401:
                self.response_signature = signature
            if not proxy and cli_status in {409, 429}:
                return self.send(cli_status, {'error': 'Request already used' if cli_status == 409 else 'Request admission is busy'})
            admitted = proxy or cli_status == 200
            if not admitted:
                return self.send(401, {'error': 'Authenticated Crew proxy or owner CLI required'})
            state = registration(self.server.root, self.server.application.name)
            if not state['enabled']:
                return self.send(403, {'error': 'App registration is disabled or unavailable. No action was performed.'})
            if body and self.headers.get_content_type() != 'application/json':
                return self.send(415, {'error': 'Send application/json'})
            payload = json.loads(body) if body else {}
            if not isinstance(payload, dict):
                return self.send(400, {'error': 'JSON body must be an object'})
            status, value = self.server.application.handle(self.command, self.path, payload)
            return self.send(status, value)
        except (ValueError, TypeError, KeyError) as error:
            return self.send(400, {'error': private_output(str(error))[:300]})
        except (OSError, RuntimeError) as error:
            return self.send(503, {'error': private_output(str(error))[:300]})
        except Exception:
            return self.send(500, {'error': 'Operation failed; existing data was preserved'})

    do_GET = dispatch
    do_POST = dispatch
    do_PATCH = dispatch
    do_DELETE = dispatch
    do_PUT = dispatch


def run(app, root):
    if os.name == 'nt':
        import ctypes
        ctypes.windll.kernel32.SetPriorityClass(ctypes.windll.kernel32.GetCurrentProcess(), 0x4000)
    port = int(os.environ.get('PORT', '0'))
    if not 1 <= port <= 65535:
        raise SystemExit('Crew must allocate PORT')
    server = Server(app, root, os.environ.get('CODEXCREW_PROXY_SECRET', ''), port)
    try:
        server.serve_forever()
    finally:
        app.close()
        server.server_close()
