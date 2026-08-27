'use strict';

const crypto = require('node:crypto');
const http = require('node:http');
const path = require('node:path');
const { spawn } = require('node:child_process');

const START_TIMEOUT_MS = 15000;
const RESPONSE_CAP_BYTES = 2 * 1024 * 1024;

function validateControlPath(value) {
  const text = String(value || '');
  if (!text.startsWith('/v1/') || text.includes('..') || text.includes('://')) {
    throw new Error('Invalid control service path.');
  }
  if (!/^\/v1\/[A-Za-z0-9_./:-]+$/.test(text)) {
    throw new Error('Invalid control service path.');
  }
  return text;
}

function requestJson(port, token, method, requestPath, payload) {
  return new Promise((resolve, reject) => {
    const body = payload === undefined ? null : Buffer.from(JSON.stringify(payload), 'utf8');
    const req = http.request({
      host: '127.0.0.1',
      port,
      path: validateControlPath(requestPath),
      method,
      timeout: 30000,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        ...(body ? {
          'Content-Type': 'application/json',
          'Content-Length': String(body.length),
        } : {}),
      },
    }, (res) => {
      const chunks = [];
      let size = 0;
      res.on('data', (chunk) => {
        size += chunk.length;
        if (size > RESPONSE_CAP_BYTES) {
          req.destroy(new Error('Control response exceeded the 2 MB cap.'));
          return;
        }
        chunks.push(chunk);
      });
      res.on('end', () => {
        let value = null;
        try {
          value = chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : null;
        } catch {
          reject(new Error('Control service returned invalid JSON.'));
          return;
        }
        if ((res.statusCode || 500) >= 400) {
          reject(new Error(value && value.error ? String(value.error) : `Control request failed with HTTP ${res.statusCode}.`));
          return;
        }
        resolve(value);
      });
    });
    req.on('timeout', () => req.destroy(new Error('Control request timed out.')));
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

class ControlServiceManager {
  constructor({ spawnImpl = spawn, requestImpl = requestJson } = {}) {
    this.spawnImpl = spawnImpl;
    this.requestImpl = requestImpl;
    this.child = null;
    this.port = 0;
    this.token = '';
    this.startPromise = null;
  }

  status() {
    return { ready: Boolean(this.child && this.port), port: this.port || null };
  }

  async start({ pythonExecutable, projectRoot, dataRoot, nodeExecutable }) {
    if (this.child && this.port) return this.status();
    if (this.startPromise) return this.startPromise;
    this.startPromise = new Promise((resolve, reject) => {
      const token = crypto.randomBytes(32).toString('base64url');
      const env = {
        ...process.env,
        PYTHONPATH: projectRoot,
        EXPEDIENT_CONTROL_TOKEN: token,
        EXPEDIENT_DATA_DIR: dataRoot,
        ONLY_CLI_NODE: nodeExecutable,
        ELECTRON_RUN_AS_NODE: nodeExecutable === process.execPath ? '1' : process.env.ELECTRON_RUN_AS_NODE,
      };
      const child = this.spawnImpl(
        pythonExecutable,
        [
          '-m', 'job_pipeline.service',
          '--host', '127.0.0.1',
          '--port', '0',
          '--project-root', projectRoot,
          '--data-root', dataRoot,
        ],
        {
          cwd: projectRoot,
          env,
          windowsHide: true,
          stdio: ['ignore', 'pipe', 'pipe'],
        },
      );
      this.child = child;
      this.token = token;
      let stdoutBuffer = '';
      let settled = false;
      const finishError = (error) => {
        if (settled) return;
        settled = true;
        this.stop();
        reject(error);
      };
      const timeout = setTimeout(() => {
        finishError(new Error('Control service did not become ready within 15 seconds.'));
      }, START_TIMEOUT_MS);
      child.stdout.on('data', (chunk) => {
        stdoutBuffer += chunk.toString('utf8');
        const lines = stdoutBuffer.split(/\r?\n/);
        stdoutBuffer = lines.pop() || '';
        for (const line of lines) {
          let record;
          try { record = JSON.parse(line); } catch { continue; }
          if (record.event !== 'expedient_control_ready') continue;
          if (record.host !== '127.0.0.1' || !Number.isInteger(record.port)) {
            finishError(new Error('Control service returned an invalid ready record.'));
            return;
          }
          if (settled) return;
          settled = true;
          clearTimeout(timeout);
          this.port = record.port;
          resolve(this.status());
        }
      });
      child.stderr.on('data', () => {
        // Intentionally not forwarded to the renderer. Startup failures surface by exit.
      });
      child.on('error', (error) => finishError(error));
      child.on('exit', (code) => {
        this.child = null;
        this.port = 0;
        this.token = '';
        if (!settled) finishError(new Error(`Control service exited before ready with code ${code}.`));
      });
    }).finally(() => { this.startPromise = null; });
    return this.startPromise;
  }

  async request(method, requestPath, payload) {
    if (!this.child || !this.port || !this.token) {
      throw new Error('Control service is not ready.');
    }
    return this.requestImpl(
      this.port,
      this.token,
      String(method || 'GET').toUpperCase(),
      validateControlPath(requestPath),
      payload,
    );
  }

  stop() {
    const child = this.child;
    this.child = null;
    this.port = 0;
    this.token = '';
    if (child) {
      try { child.kill(); } catch { /* already stopped */ }
    }
  }
}

function packagedPipelineRoot(resourcesPath) {
  return path.join(resourcesPath, 'pipeline');
}

module.exports = {
  ControlServiceManager,
  packagedPipelineRoot,
  requestJson,
  validateControlPath,
};
