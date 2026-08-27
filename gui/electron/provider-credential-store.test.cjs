'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { ProviderCredentialStore } = require('./provider-credential-store.cjs');

function fakeSafeStorage() {
  const encrypted = new Map();
  const calls = { encrypt: [], decrypt: [] };
  let sequence = 0;
  return {
    calls,
    isEncryptionAvailable: () => true,
    encryptString: (value) => {
      calls.encrypt.push(value);
      const ciphertext = Buffer.from(`opaque-ciphertext-${++sequence}`, 'utf8');
      encrypted.set(ciphertext.toString('base64'), value);
      return ciphertext;
    },
    decryptString: (value) => {
      calls.decrypt.push(Buffer.from(value));
      const plaintext = encrypted.get(Buffer.from(value).toString('base64'));
      if (!plaintext) throw new Error('ciphertext is invalid');
      return plaintext;
    },
  };
}

test('persists only encrypted provider credentials across imports, restarts, and clearing', () => {
  const userDataPath = fs.mkdtempSync(path.join(os.tmpdir(), 'expedient-provider-credential-'));
  const environment = { FREECHAIN_ACCESS_KEY: 'synthetic-provider-key-one' };
  const safeStorage = fakeSafeStorage();
  const options = { userDataPath, safeStorage, environment };

  try {
    const store = new ProviderCredentialStore(options);
    const imported = store.importFromEnvironment();
    const persistedPath = path.join(userDataPath, 'provider-credential.json');
    const persisted = fs.readFileSync(persistedPath, 'utf8');

    assert.deepEqual(imported, { available: true, source: 'environment' });
    assert.deepEqual(safeStorage.calls.encrypt, [environment.FREECHAIN_ACCESS_KEY]);
    assert.equal(persisted.includes(environment.FREECHAIN_ACCESS_KEY), false);
    assert.match(persisted, /ciphertext/);
    assert.equal(JSON.stringify(store.status()).includes(environment.FREECHAIN_ACCESS_KEY), false);

    const restartedStore = new ProviderCredentialStore(options);
    assert.equal(restartedStore.credential(), environment.FREECHAIN_ACCESS_KEY);

    environment.FREECHAIN_ACCESS_KEY = 'synthetic-provider-key-two';
    assert.deepEqual(store.reimportFromEnvironment(), { available: true, source: 'environment' });
    assert.deepEqual(safeStorage.calls.encrypt, ['synthetic-provider-key-one', 'synthetic-provider-key-two']);
    assert.equal(new ProviderCredentialStore(options).credential(), environment.FREECHAIN_ACCESS_KEY);
    assert.equal(fs.readFileSync(persistedPath, 'utf8').includes('synthetic-provider-key-one'), false);

    fs.writeFileSync(persistedPath, '{"version":1,"provider":"FreeChain","ciphertext":"corrupt"}', 'utf8');
    const corruptStore = new ProviderCredentialStore(options);
    assert.equal(corruptStore.credential(), null);
    assert.deepEqual(corruptStore.status(), { available: false, source: 'unavailable' });

    store.clear();
    assert.equal(fs.existsSync(persistedPath), false);
    assert.deepEqual(store.status(), { available: false, source: 'unavailable' });

    assert.deepEqual(store.reimportFromEnvironment(), { available: true, source: 'environment' });
    assert.equal(new ProviderCredentialStore(options).credential(), environment.FREECHAIN_ACCESS_KEY);
    assert.ok(safeStorage.calls.decrypt.length >= 3);
  } finally {
    fs.rmSync(userDataPath, { recursive: true, force: true });
  }
});
