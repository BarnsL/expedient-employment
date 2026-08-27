'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const { PassThrough } = require('node:stream');
const {
  ControlServiceManager,
  validateControlPath,
} = require('./control-service.cjs');

test('control paths stay inside the fixed versioned API', () => {
  assert.equal(validateControlPath('/v1/conversations/abc/messages'), '/v1/conversations/abc/messages');
  assert.throws(() => validateControlPath('http://outside.example/v1/health'), /path/);
  assert.throws(() => validateControlPath('/v1/../secrets'), /path/);
  assert.throws(() => validateControlPath('/admin'), /path/);
});

test('manager keeps bearer token out of public status and kills its child', async () => {
  let captured = null;
  const child = new EventEmitter();
  child.stdout = new PassThrough();
  child.stderr = new PassThrough();
  child.killedByTest = false;
  child.kill = () => { child.killedByTest = true; };
  const spawnImpl = (command, args, options) => {
    captured = { command, args, options };
    process.nextTick(() => {
      child.stdout.write('{"event":"expedient_control_ready","host":"127.0.0.1","port":32123}\n');
    });
    return child;
  };
  const requests = [];
  const requestImpl = async (port, token, method, path, payload) => {
    requests.push({ port, token, method, path, payload });
    return { ok: true };
  };
  const manager = new ControlServiceManager({ spawnImpl, requestImpl });
  const status = await manager.start({
    pythonExecutable: 'python-test',
    projectRoot: 'C:\\app\\pipeline',
    dataRoot: 'C:\\app\\data',
    nodeExecutable: 'C:\\app\\electron.exe',
  });

  assert.deepEqual(status, { ready: true, port: 32123 });
  assert.ok(captured.options.env.EXPEDIENT_CONTROL_TOKEN);
  assert.equal(
    captured.options.env.PYTHONPATH,
    ['C:\\app\\pipeline', 'C:\\app\\pipeline\\python-runtime'].join(require('node:path').delimiter),
  );
  assert.equal(captured.options.env.PYTHONDONTWRITEBYTECODE, '1');
  assert.equal(JSON.stringify(status).includes(captured.options.env.EXPEDIENT_CONTROL_TOKEN), false);
  await manager.request('GET', '/v1/health');
  assert.equal(requests[0].token, captured.options.env.EXPEDIENT_CONTROL_TOKEN);
  manager.stop();
  assert.equal(child.killedByTest, true);
});

test('manager passes the supplied provider environment only to its owned child', async () => {
  let captured = null;
  const child = new EventEmitter();
  child.stdout = new PassThrough();
  child.stderr = new PassThrough();
  child.kill = () => {};
  const providerEnv = {
    EXPEDIENT_PROVIDER_URL: 'http://127.0.0.1:4853/v1',
    EXPEDIENT_PROVIDER_KEY_ENV: 'TEST_FREECHAIN_ACCESS_KEY',
    TEST_FREECHAIN_ACCESS_KEY: 'synthetic-provider-key',
  };
  const parentProviderEnv = Object.fromEntries(
    Object.keys(providerEnv).map((name) => [name, process.env[name]]),
  );
  const manager = new ControlServiceManager({
    spawnImpl: (_command, _args, options) => {
      captured = options;
      process.nextTick(() => {
        child.stdout.write('{"event":"expedient_control_ready","host":"127.0.0.1","port":32124}\n');
      });
      return child;
    },
  });

  const status = await manager.start({
    pythonExecutable: 'python-test',
    projectRoot: 'C:\\app\\pipeline',
    dataRoot: 'C:\\app\\data',
    nodeExecutable: 'C:\\app\\electron.exe',
    providerEnv,
  });

  assert.deepEqual(
    Object.fromEntries(Object.keys(providerEnv).map((name) => [name, captured.env[name]])),
    providerEnv,
  );
  assert.deepEqual(
    Object.fromEntries(Object.keys(providerEnv).map((name) => [name, process.env[name]])),
    parentProviderEnv,
  );
  assert.equal(JSON.stringify(status).includes(providerEnv.FREECHAIN_ACCESS_KEY), false);
  assert.equal(JSON.stringify(status).includes(providerEnv.EXPEDIENT_PROVIDER_URL), false);
  assert.equal(JSON.stringify(manager.status()).includes(providerEnv.FREECHAIN_ACCESS_KEY), false);
  assert.equal(JSON.stringify(manager.status()).includes(providerEnv.EXPEDIENT_PROVIDER_URL), false);
  manager.stop();
});
