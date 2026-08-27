# Expedient Employment 2.0.0

## Release scope

Version 2.0.0 combines the MIT application-lifecycle and recruiting improvements from the reviewed AI Job Search Pipeline revision with original Expedient modules for tool brokering, web intelligence, workflow execution, scheduling, assistant conversations, and the desktop Control Anything surface.

## Major additions

- Durable Connection Assistant with queue editing, cancellation, retries, image context, provider readiness, real model selection, tool events, and current-user protected FreeChain credential persistence.
- Typed agent tool broker with JSON Schema, approval digests, policy enforcement, timeouts, cancellation, result caps, and content-free audit records.
- Pinned only-cli runtime and complete adapter for every implemented command family.
- Original MIT web intelligence client with SSRF controls, DNS and peer checks, redirect revalidation, response caps, challenge detection, and bounded crawling.
- Original MIT workflow engine with DAG validation, dry runs, retries, resume state, cancellation, circuit controls, and structured datasets.
- Restart-safe scheduler with interval and timezone-aware daily recurrence, leases, coalescing, history, and a hidden Windows wake task.
- Scheduled recruiting runs that can request hundreds of candidates and prepare local drafts without external submission authority.
- Application lifecycle dashboard, outcome controls, undo, private packet preparation, and reports.
- Assistant, Automations, and Web Workbench desktop pages with responsive navigation and accessibility states.
- Authenticated Electron-to-Python control service with a main-process-only bearer token.

## License boundary

All new Expedient source is MIT. Integrated AI Job Search Pipeline and only-cli source is MIT at the revisions recorded in `docs/PROVENANCE.md`.

No Wigolo or Maxun source or internal implementation material is present. Comparable useful behaviors were recreated independently in original MIT modules. Optional third-party processes remain separate and keep their own licenses.

## Safety boundary

- Employer-facing applications and messages remain human-controlled.
- Scheduled workflows cannot call external-action tools.
- Challenges and login walls produce visible handoff states.
- Fingerprint spoofing and optional impersonation dependencies are excluded.
- Renderer permissions, popups, webview attachment, and navigation fail closed.
- Resumes reject XML entity declarations and redact contact details before optional provider use.

## FreeChain chat recovery

The desktop now targets the installed FreeChain endpoint at `http://127.0.0.1:4853/v1` with bearer authentication. It loads an existing protected credential record first, then imports from the process environment, an explicitly configured environment file, or the allowlisted per-user FreeChain environment file. Electron user data contains ciphertext only, with plaintext limited to Electron main-process memory and the owned Python control child environment.

Re-import replaces the protected record only after a successful write. Clear does not claim success when deletion fails. A successful credential change restarts only the owned control service. Users sharing one Windows account must clear the saved key before handing over the account.

Readiness distinguishes a missing credential, an unreachable service, authentication failure, an invalid model response, and a ready state with a real model count. This corrects the earlier chat failure, where the app used port 8000 without the required credential while the installed service used port 4853 with bearer authentication. The former interface also showed a fake `auto` model after model loading failed.

## Verification requirements

Release verification includes the complete Python suite, renderer tests and build, Electron tests, dependency audits, static analysis, tracked-source and packaged-payload privacy scans, three synthetic recruiting trials, installed control-service smoke tests, Start Menu verification, and a visible app launch.

Committed evidence covers unit, React, Electron, lint, and production-build checks for credential persistence, readiness, and the safe Assistant controls. Live credential mutation and installed two-launch chat recovery are not claimed here. Task 6 owns that final installed acceptance check.

The Windows package includes the pinned Python timezone fallback required for named daily schedules on systems without an IANA timezone database.
Scheduler storage is synchronized across the loopback service's concurrent request threads.

## Dependency and payload status

The locked GUI and only-cli trees each audit at zero known vulnerabilities, and the default core Python project audits at zero. The locked root development tree contains six known vulnerabilities, five moderate and one high, in the Paperclip Cursor adapter dependency chain. No compatible transitive update is available: the fixed `undici` major is outside the current `@connectrpc/connect-node` constraint, and the only automated npm proposal is a forced breaking Paperclip downgrade. The root development tools are not bundled in either Windows artifact, but this finding remains an explicit upstream concern.

The optional browser-use pin is updated from 0.13.6 to 0.13.8. Its isolated metadata audit improves from 53 known vulnerabilities to six residual advisories across three transitive packages. The current `python-jobspy` 1.1.82 selection has one residual advisory in `markdownify` 0.13.1; the fix is 0.14.1, outside JobSpy's `<0.14.0` constraint. Both optional groups remain separately installed and are absent from the Windows payload.

Packaged documentation excludes internal implementation plans. The bundled only-cli dependency tree excludes dependency-owned workflow files, test directories, and source maps while retaining package manifests, licenses, readmes, runtime JavaScript, and source entrypoints. License, third-party notice, provenance, only-cli runtime, and Windows timezone resources remain in both artifact payloads.

The Windows installer is unsigned. The published SHA-256 checksums verify file integrity only and do not provide code-signing identity.
