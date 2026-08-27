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
