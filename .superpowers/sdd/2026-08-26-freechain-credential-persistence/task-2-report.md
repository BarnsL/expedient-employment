# Task 2 Report: Encrypted Credential Storage

Date: 2026-08-26

## Status

Task 2 is implemented in the assigned worktree. The credential-store contract is green. The focused control-service provider-environment test remains red at the planned Task 3 boundary because `ControlServiceManager.start()` does not yet merge `providerEnv` into the owned child environment.

No real credential was accessed, printed, persisted, or used during implementation or verification. All direct credential-store checks used synthetic values in temporary directories.

## Files

- Created `gui/electron/provider-credential-store.cjs`.
- Modified `gui/electron/main.cjs`.
- Modified `gui/electron/preload.cjs`.
- Created this report at `.superpowers/sdd/2026-08-26-freechain-credential-persistence/task-2-report.md`.

## Implementation

`ProviderCredentialStore` now:

- reads only a non-empty `FREECHAIN_ACCESS_KEY`, an absolute path named by `EXPEDIENT_FREECHAIN_ENV_FILE`, or the fixed `%LOCALAPPDATA%\FreeChain\.env` path, in that order;
- stops at the first valid source so lower-priority files are not read unnecessarily;
- accepts only regular env files no larger than 64 KiB;
- parses only an exact `FREECHAIN_ACCESS_KEY` assignment and rejects duplicate, empty, control-character, or larger-than-64-KiB values;
- fails closed when Electron encryption is unavailable or stored data is invalid;
- writes version 1 JSON containing only provider, base64 ciphertext, and update time;
- uses a sibling temporary file followed by rename and removes a failed temporary write best-effort;
- returns only bounded source labels in public status;
- decrypts saved ciphertext only into main-process memory;
- clears the encrypted record and replaces it on successful re-import.

Electron main now initializes the store only inside `app.whenReady()`, using `safeStorage` and `app.getPath('userData')`. Before starting the owned control service it forms an in-memory `providerEnv` with:

- the fixed FreeChain endpoint `http://127.0.0.1:4853/v1`;
- the fixed credential environment name `FREECHAIN_ACCESS_KEY`;
- the decrypted credential or an empty value when unavailable.

The preload bridge exposes status, re-import, and clear calls. Their IPC responses contain only `configured`, `saved`, and `source`. Re-import and clear stop and restart only the owned Python control service.

## TDD Evidence

Initial red, from `gui`:

```text
node --test electron/provider-credential-store.test.cjs

Error: Cannot find module './provider-credential-store.cjs'
tests 1
pass 0
fail 1
```

Green after the minimum implementation, from `gui`:

```text
node --test electron/provider-credential-store.test.cjs

tests 1
pass 1
fail 0
```

A self-review found that a malformed explicit-path value could reach `path.resolve`. The synthetic regression initially failed with `ERR_INVALID_ARG_TYPE`, then passed after the type guard:

```text
node -e "<synthetic malformed-path assertion>"

No output, exit 0 after the fix.
```

A second self-review found that the first implementation collected all candidates after finding the direct environment value. A getter-backed synthetic regression initially failed with `lower-priority source was accessed`, then passed after changing candidate collection to a priority short-circuit:

```text
node -e "<synthetic priority short-circuit assertion>"

priority short-circuit passed
```

## Verification Commands and Outputs

Credential and existing Electron safety tests, from `gui`:

```text
node --test electron/provider-credential-store.test.cjs electron/safety.test.cjs

tests 9
pass 9
fail 0
```

Focused Task 2 and Task 3 boundary tests, from `gui`:

```text
node --test electron/provider-credential-store.test.cjs electron/control-service.test.cjs

tests 4
pass 3
fail 1
```

The only failure is the committed Task 3 contract `manager passes the supplied provider environment only to its owned child`. Its actual child values are still `undefined` because Task 3 owns the `ControlServiceManager` change. The credential-store test passes in the same run.

Synthetic import order, record-shape, plaintext exclusion, encryption-unavailable, and oversize checks, from the repository root:

```text
node -e "<synthetic boundary assertions>"

synthetic boundary checks passed
```

Syntax checks, from `gui`:

```text
node --check electron/provider-credential-store.cjs
node --check electron/main.cjs
node --check electron/preload.cjs

No output. Each command exited 0.
```

Targeted lint, from `gui`:

```text
npm exec eslint -- electron/provider-credential-store.cjs electron/main.cjs electron/preload.cjs

No output. Exit 0.
```

Whitespace validation, from the repository root:

```text
git diff --check

Exit 0. Git printed only existing LF-to-CRLF working-copy notices for `main.cjs` and `preload.cjs`.
```

## Security Reasoning

- The persistent path is derived only from Electron `userData`; no repository or pipeline data path is accepted by the store.
- Plaintext exists only in the supplied environment, the bounded source file while parsing, safe-storage calls, and Electron main-process memory.
- Ciphertext is serialized as base64 only after `safeStorage.encryptString()` succeeds.
- The record parser checks file type, size, version, provider, update-time type, and canonical base64 before decryption.
- Lower-priority source files are not opened after a higher-priority source succeeds.
- No credential enters renderer IPC, status objects, logs, command arguments, source literals, or the report.
- The module never mutates `process.env` or the supplied environment object.
- Clear and re-import restart the application-owned control service only. They do not affect unrelated services or processes.
- No browser automation, external-action approval, challenge handling, or anti-bot behavior changed.

## Concerns and Follow-up

1. The committed provider-environment child-process test is intentionally red until Task 3 adds validated `providerEnv` merging to `ControlServiceManager.start()`.
2. Task 4 still owns renderer types, visible credential controls, status refresh, and the shared-device warning.
3. Installed Windows safe-storage behavior and cross-launch chat recovery remain release-level verification work, not Task 2 unit-test scope.
4. A first targeted ESLint attempt was launched from the repository root, where that package context did not own the Electron paths. It reported no matching files. The final targeted lint was rerun from `gui` and exited 0.

## Fix Round 1: Truthful Clear and Reliable Restart

Date: 2026-08-26

### Findings addressed

1. `ProviderCredentialStore.clear()` previously suppressed every deletion error, cleared the in-memory credential, and reported `saved: false` even when the encrypted record remained. A later launch could decrypt that record again, contradicting the clear result.
2. Electron main previously called `controlService.stop()` and immediately called `start()`. During an in-flight start, `start()` could return the stale `startPromise`; after a ready start, the old process could still be exiting while a replacement opened the same data directory.

### Fixes

- The credential store now accepts an injected filesystem for deterministic failure testing.
- `clear()` returns `true` only when the record was deleted or already absent with `ENOENT`.
- Other deletion failures return `false` and preserve the existing credential, source, and saved state. Main therefore does not restart or claim the change took effect.
- `ControlServiceManager.stop()` is now asynchronous and idempotent while a stop is active.
- Stop cancels and settles an in-flight start, sends termination, and waits for `exit` or `close`.
- Stop rejects after a bounded five-second production timeout. A timed-out child blocks every later start until its exit is observed, preventing data-directory overlap.
- Child event handlers clear runtime state only when they still own the current child, so a delayed event from an older child cannot erase replacement state.
- `ControlServiceManager.restart()` serializes restart operations, waits for the complete stop barrier, and then starts one replacement.
- Electron main now uses `restart()` with a fresh in-memory provider option object. Task 3 provider-environment merging remains unchanged and deferred.
- Existing control-service tests now await stop and make their synthetic children emit exit, matching the real lifecycle contract.

### TDD evidence

Credential deletion failure red:

```text
node --test --test-name-pattern="clear preserves truthful state" electron/provider-credential-store.test.cjs

tests 1
pass 0
fail 1
actual: { available: false, source: 'unavailable' }
expected: false
```

Credential deletion failure green:

```text
node --test --test-name-pattern="clear preserves truthful state" electron/provider-credential-store.test.cjs

tests 1
pass 1
fail 0
```

Restart lifecycle red:

```text
node --test --test-name-pattern="restart cancels|restart times out" electron/control-service.test.cjs

tests 2
pass 0
fail 2
TypeError: manager.restart is not a function
```

Restart lifecycle green:

```text
node --test --test-name-pattern="restart cancels|restart times out" electron/control-service.test.cjs

tests 2
pass 2
fail 0
```

### Focused verification evidence

Task 2 control lifecycle only:

```text
node --test --test-name-pattern="control paths|manager keeps bearer|restart cancels|restart times out" electron/control-service.test.cjs

tests 4
pass 4
fail 0
```

Credential store plus Electron safety:

```text
node --test electron/provider-credential-store.test.cjs electron/safety.test.cjs

tests 10
pass 10
fail 0
```

Syntax and targeted lint:

```text
node --check electron/provider-credential-store.cjs
node --check electron/control-service.cjs
node --check electron/main.cjs
node --check electron/preload.cjs
npm exec eslint -- electron/provider-credential-store.cjs electron/provider-credential-store.test.cjs electron/control-service.cjs electron/control-service.test.cjs electron/main.cjs electron/preload.cjs

No output. Every command exited 0.
```

Full control-service boundary:

```text
node --test electron/control-service.test.cjs

tests 5
pass 4
fail 1
```

The only failure remains the committed Task 3 provider-environment injection contract. There are no asynchronous cleanup warnings after the lifecycle-test adaptation.

### Remaining concerns

1. Task 3 must still validate and merge `providerEnv` into the owned Python child. This fix does not move that behavior across task ownership.
2. If an owned child ignores termination beyond the stop timeout, the manager deliberately refuses to start another child until exit is observed. This is a safe unavailable state rather than a data-directory overlap.
3. Installed Windows process-exit timing and cross-launch credential behavior remain release-level acceptance work.
