# FreeChain Persistent Chat Implementation Plan

Date: 2026-08-26

## Objective

Repair installed chat connectivity, persist the approved FreeChain access key with Windows user encryption, make readiness truthful, and ship verified `v2.0.0` release assets.

## Task 1: Establish the red tests

Files:

- Create `gui/electron/provider-credential-store.test.cjs`
- Modify `gui/electron/control-service.test.cjs`
- Modify `tests/test_assistant.py`
- Modify `tests/test_service.py`

Steps:

1. Add Electron tests proving imported plaintext is encrypted before persistence, a new store instance can decrypt it, corrupt ciphertext fails closed, clear removes it, re-import replaces it, and returned status contains no key.
2. Add a control-service test proving only the supplied provider environment reaches the owned Python child and never appears in public status.
3. Add Python tests proving missing credentials, refused connections, unauthorized responses, and malformed model lists are not ready, while a valid authenticated model list is ready.
4. Add a service composition test for the FreeChain default URL and credential environment.
5. Run the focused test commands and record the expected failures:
   - `node --test electron/provider-credential-store.test.cjs electron/control-service.test.cjs` from `gui`
   - `python -m unittest tests.test_assistant tests.test_service` from the repository root

## Task 2: Implement encrypted credential storage

Files:

- Create `gui/electron/provider-credential-store.cjs`
- Modify `gui/electron/main.cjs`
- Modify `gui/electron/preload.cjs`

Steps:

1. Implement bounded env parsing, allowlisted import paths, versioned ciphertext persistence, atomic writes, decrypt, status, clear, and re-import.
2. Initialize the store only after Electron is ready, using `safeStorage` and `app.getPath('userData')`.
3. Resolve the credential before control-service startup and pass it in memory only.
4. Add minimal IPC handlers for safe credential status, re-import, and clear. Restart only the owned control service after changes.
5. Run the focused Electron tests until green.

## Task 3: Inject the provider contract and fix readiness

Files:

- Modify `gui/electron/control-service.cjs`
- Modify `job_pipeline/service.py`
- Modify `job_pipeline/assistant.py`

Steps:

1. Add a validated `providerEnv` option to `ControlServiceManager.start()` and merge only its explicit values into the child environment.
2. Set the default FreeChain URL to `http://127.0.0.1:4853/v1` and credential environment to `FREECHAIN_ACCESS_KEY`.
3. Make readiness perform the authenticated model probe and return safe status metadata.
4. Keep completion failures redacted and ensure model loading cannot report a fake ready state.
5. Run the focused Python and Electron tests until green.

## Task 4: Expose safe controls in the Assistant

Files:

- Modify `gui/src/lib/api.ts`
- Modify `gui/src/pages/Assistant.tsx`
- Modify `gui/src/components/assistant/assistant.test.tsx`

Steps:

1. Add typed API methods for credential status, re-import, and clear.
2. Display saved/unsaved status, safe source label, and a concise shared-device warning.
3. Add re-import and clear controls with disabled and error states.
4. Refresh readiness and real model count after a credential change.
5. Add UI tests for unavailable provider behavior and credential controls.
6. Run `npm test -- --run` and `npm run lint` from `gui` until green.

## Task 5: Document the delivered behavior

Files:

- Modify `docs/ASSISTANT.md`
- Modify `docs/SECURITY.md`
- Modify `docs/RELEASE-2.0.0.md`
- Modify `README.md`

Steps:

1. Document the FreeChain endpoint, first-run import order, DPAPI-backed persistence, clear/re-import behavior, shared-device warning, and troubleshooting states.
2. Record the chat root cause and verification boundary without including keys or private data.
3. Document that automated browsing remains policy-constrained and does not bypass anti-bot controls.

## Task 6: Verify, package, install, and release

Steps:

1. Run all Python tests, Electron tests, React tests, lint, TypeScript/Vite build, security tests, and dependency audits.
2. Scan the exact tracked tree and `origin/main..HEAD` for private data and secret patterns without printing any discovered values.
3. Build the Windows installer and portable archive with the existing release scripts.
4. Inspect the release payloads and confirm the plaintext FreeChain key is absent.
5. Install the rebuilt app, confirm the Start Menu shortcut, send a synthetic chat, close the app, relaunch it, and send a second synthetic chat.
6. Confirm the encrypted credential artifact contains no plaintext and the assistant database/transcript contains no key.
7. Merge the verified branch to `main` without rewriting history, push `main`, create signed release notes and tag `v2.0.0`, upload both assets and checksums, then verify the public tag, release, hashes, and repository privacy scan.
