# FreeChain Credential Persistence and Chat Recovery Design

Date: 2026-08-26

## Goal

Make the desktop assistant connect to the installed FreeChain service, keep the approved access key usable across app launches, and report provider failures honestly without exposing private data.

## Confirmed failure

The app starts its Python control service with the provider defaulting to `http://127.0.0.1:8000/v1` and no credential environment name. The installed FreeChain service listens at `http://127.0.0.1:4853/v1` and requires bearer authentication. Provider readiness currently checks only whether an environment variable is configured, while the UI treats a failed model request as one `auto` model. This produces the misleading ready state seen in the failed chat.

## Architecture

Electron owns credential persistence because its `safeStorage` API uses the current Windows user's protected credential boundary. A small CommonJS module will:

1. Load and decrypt an existing ciphertext record from Electron `userData`.
2. On first launch only, import `FREECHAIN_ACCESS_KEY` from the process environment, an explicitly configured env file, or the allowlisted installed FreeChain env file.
3. Encrypt the value before an atomic write. The record contains version, provider, ciphertext, and update time, never plaintext.
4. Return the decrypted value only to Electron main-process memory.
5. Support status, re-import, and clear operations without returning secret material to the renderer.

Electron passes the decrypted value only in the environment of the Python control child. It also sets the installed FreeChain endpoint and credential environment name. No key is placed in command arguments, logs, IPC responses, transcripts, SQLite, source files, or Git.

## Provider readiness

`OpenAICompatibleProvider.readiness()` will require both credential configuration and a successful authenticated model probe. It will return a safe detail string for missing credentials, unreachable service, authorization failure, malformed response, or readiness. `models()` will perform its request directly so readiness does not recurse.

The Assistant UI will show the backend readiness result. A model request failure will no longer silently create a fake one-model ready state. The UI will also expose encrypted credential status with re-import and clear actions plus a shared-device warning.

## Lifecycle and recovery

- First approved launch imports and encrypts the installed FreeChain key.
- Later launches decrypt the saved record with Windows user protection.
- Clearing the key deletes the encrypted record and restarts the owned control service without a credential.
- Re-import replaces the encrypted record and restarts the owned control service.
- A corrupt or undecryptable record is treated as unavailable. The app may import an allowlisted source again, but never surfaces ciphertext or parser details to the renderer.

## Security boundaries

- Imports are limited to a named environment variable and explicit or allowlisted local files.
- Env files must be regular files within a small size cap.
- Renderer IPC receives booleans and safe source labels only.
- Errors redact network response bodies and credentials.
- Sensitive actions that submit applications or contact employers remain approval-gated.
- The design does not add scraping concealment, CAPTCHA bypass, or anti-bot evasion.

## Verification

Automated tests will cover encryption-only storage, two-instance restart loading, corrupt data, allowlisted import, clear/re-import, child environment injection, and live provider readiness failure/success. Full Python, Electron, React, lint, and production builds must pass.

Installed acceptance must prove two fresh conversations succeed across an app close and relaunch. Release checks must confirm the plaintext key is absent from the tracked tree, outgoing Git range, release archive, installer payload, Electron user data files, assistant database, and transcript output.
