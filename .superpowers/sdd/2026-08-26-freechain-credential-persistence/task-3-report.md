# Task 3 Report: Provider Contract and Readiness

Date: 2026-08-26

## Status

Task 3 is implemented in the assigned worktree. The Electron child-environment contract, FreeChain defaults, authenticated readiness probe, direct model loading, and direct completion path are green in the focused suites.

No real credential was accessed, printed, persisted, or used. Every credential value in tests is synthetic. No external service request was made.

## Files

- Modified `gui/electron/control-service.cjs`.
- Modified `gui/electron/control-service.test.cjs`.
- Modified `job_pipeline/service.py`.
- Modified `job_pipeline/assistant.py`.
- Modified `tests/test_assistant.py`.
- Created this report at `.superpowers/sdd/2026-08-26-freechain-credential-persistence/task-3-report.md`.

## Implementation

`ControlServiceManager.start()` now accepts an optional `providerEnv` object. When supplied, it:

- requires exactly `EXPEDIENT_PROVIDER_URL`, `EXPEDIENT_PROVIDER_KEY_ENV`, and the credential key named by `EXPEDIENT_PROVIDER_KEY_ENV`;
- rejects all other own keys, including symbol keys;
- requires a loopback HTTP URL whose path is exactly `/v1`, with no user information, query, or fragment;
- validates the credential environment name with `^[A-Z][A-Z0-9_]{0,71}$` and prevents collision with manager-owned child variables;
- requires a non-empty, single-line credential of at most 64 KiB;
- returns a new validated object and merges it only into the new child environment;
- leaves `process.env`, the caller object, command arguments, status objects, and logs unchanged.

The Task 2 lifecycle remains in place. Validation runs before spawning, while stop, restart, blocked-child, timeout, and stale-event ownership behavior is unchanged.

The default Python runtime now creates FreeChain with:

- base URL `http://127.0.0.1:4853/v1`;
- credential environment `FREECHAIN_ACCESS_KEY`.

`OpenAICompatibleProvider` now:

- treats a missing or blank configured credential as unavailable without a network call;
- performs one authenticated `GET` to the exact `/models` endpoint for readiness;
- reports only `ready`, `credential_configured`, `reachable`, `authenticated`, `model_count`, and a bounded constant detail;
- classifies missing credentials, unreachable transport, authorization failure, invalid response, and ready state without returning raw exceptions or response content;
- accepts only non-empty string model identifiers and caps the list at 200 entries;
- makes `models()` perform its own single authenticated request and raise a safe `ProviderError` when unavailable;
- makes `complete()` check only credential configuration before its existing completion request, so it does not perform a redundant model probe;
- converts completion transport failures to a constant safe error while preserving completion parsing and tool-call behavior.

## TDD Evidence

Initial committed RED, from `gui`:

```text
node --test electron/provider-credential-store.test.cjs electron/control-service.test.cjs

tests 7
pass 6
fail 1

Failure: provider values were undefined in the child environment.
```

Initial committed RED, from the repository root:

```text
python -m unittest tests.test_assistant tests.test_service

Ran 14 tests
FAILED (failures=6)

Five readiness assertions failed because no authenticated model request occurred.
One default-runtime assertion failed because the URL still used port 8000.
```

Added validation and safe-provider regression RED:

```text
node --test electron/control-service.test.cjs

tests 6
pass 4
fail 2

python -m unittest tests.test_assistant

Ran 10 tests
FAILED (failures=3)
```

The new failures proved missing provider-environment validation, recursive model loading, incomplete readiness fields, and completion transport-detail exposure.

Completion direct-request RED after authenticated readiness was implemented:

```text
python -m unittest \
  tests.test_assistant.AssistantTests.test_openai_provider_completion_failure_does_not_expose_transport_detail \
  tests.test_assistant.AssistantTests.test_openai_provider_completion_does_not_probe_models

Ran 2 tests
FAILED (failures=2)
```

One failure showed the old completion guard returning the wrong safe error. The other recorded an unwanted `GET /models` before `POST /chat/completions`.

Unknown symbol-key RED from self-review:

```text
node --test --test-name-pattern="rejects malformed provider environments" electron/control-service.test.cjs

tests 1
pass 0
fail 1
```

The symbol-keyed option reached the spawn double before validation used all own keys. The regression passed after replacing enumerable string-key inspection with `Reflect.ownKeys()`.

## Verification Evidence

Focused Electron suites, from `gui`:

```text
node --test electron/provider-credential-store.test.cjs electron/control-service.test.cjs

tests 8
pass 8
fail 0
```

Focused Python suites, from the repository root:

```text
python -m unittest tests.test_assistant tests.test_service

Ran 17 tests in 4.030s
OK
```

Python compilation, from the repository root:

```text
python -m py_compile job_pipeline/assistant.py job_pipeline/service.py tests/test_assistant.py tests/test_service.py

No output. Exit 0.
```

Node syntax and targeted lint, from `gui`:

```text
node --check electron/control-service.cjs
node --check electron/control-service.test.cjs
npx --no-install eslint electron/control-service.cjs electron/control-service.test.cjs

No output. Every command exited 0.
```

Whitespace and outgoing-scope checks, from the repository root:

```text
git diff --check

Exit 0. Git printed only LF-to-CRLF working-copy notices.

Changed files before this report: 5
Raw email matches: 0
Literal secret-like matches: 0
```

## Security Review

- The credential is present only in Electron main-process memory and the owned Python child's environment.
- Provider overrides cannot enter command arguments, public status, renderer IPC, transcripts, SQLite, source literals, or logs through this change.
- Validation rejects remote HTTP, loopback HTTPS, non-`/v1` paths, user information, query data, fragments, malformed names, unknown keys, empty credentials, control characters, oversized values, and collisions with manager-owned child variables.
- Child-environment construction clones both the parent environment and validated provider values. Neither input object is mutated.
- Readiness returns only fixed safe detail strings and numeric or boolean metadata. It does not return headers, URLs, response bodies, credentials, or exception text.
- Model and completion transport failures are converted to safe `ProviderError` messages before the service can expose them.
- Existing provider completion parsing, image handling, tool-call parsing, tool approvals, and loopback-only control API behavior were not changed.
- No web automation or external-action approval policy changed.

## Self-Review

The final diff was checked against every Task 3 requirement and every caller of `ControlServiceManager.start()`, `readiness()`, `models()`, and `complete()`.

The review found and fixed one issue: `Object.keys()` did not observe symbol-keyed unknown options. A failing regression was added before the implementation changed to `Reflect.ownKeys()`.

No unrelated source files were modified. Task 2 credential persistence and restart lifecycle changes remain intact and are covered by the combined Electron suite.

## Concerns and Follow-up

1. Live installed FreeChain authentication was not exercised because Task 3 verification intentionally used no real credential. Installed runtime recovery remains a release acceptance step.
2. Task 4 still owns renderer readiness presentation, credential controls, model fallback removal, and the shared-device warning.
3. The provider probe classifies known 401 and 403 responses as authorization failures and known connection errors as unreachable. Other transport failures are intentionally reported as an invalid response rather than exposing raw exception details.

## Fix Round 1: Ambient Environment and Exception Chains

Date: 2026-08-26

### Findings addressed

1. The child environment started by cloning all of `process.env`. When `providerEnv` was omitted, inherited `EXPEDIENT_PROVIDER_URL`, `EXPEDIENT_PROVIDER_KEY_ENV`, `FREECHAIN_ACCESS_KEY`, and the credential variable selected by the inherited name reached Python without validation.
2. Model and completion transport failures returned a safe outer message but used `raise ... from exc`. The original transport exception, its cause, and restricted details remained traversable through `__cause__` and `__context__`.

### Fixes

- `ControlServiceManager` now accepts an injected environment for synthetic testing while defaulting to `process.env` in production.
- A new child-environment sanitizer clones the source object, identifies a parent-selected credential name only when it matches the bounded provider-name pattern, and removes that key plus both provider configuration keys and `FREECHAIN_ACCESS_KEY`.
- Manager-owned values and validated explicit `providerEnv` values are added only after sanitization.
- The source environment object is never mutated. Unrelated ambient variables remain present in the child clone.
- Model and completion transport handlers retain only a fixed safe detail or failure flag while inside the raw exception scope, then raise a new `ProviderError` after that scope ends.
- Completion response and tool-call parsing also raise their safe replacements outside the caught exception scope.
- Readiness continues returning constant structured status metadata and retains no exception object.

### TDD evidence

Ambient child-environment RED, from `gui`:

```text
node --test --test-name-pattern="ambient provider values" electron/control-service.test.cjs

tests 1
pass 0
fail 1
actual unrelated value: undefined
expected unrelated value: preserved
```

After the environment test seam was added, the same regression remained RED on the security behavior:

```text
tests 1
pass 0
fail 1
actual inherited provider key presence: true
expected: false
```

The focused test passed after sanitization:

```text
tests 1
pass 1
fail 0
```

Full exception-chain RED, from the repository root:

```text
python -m unittest tests.test_assistant.AssistantTests.test_openai_provider_safe_failures_drop_transport_exception_chains

Ran 1 test
FAILED (failures=1)
```

The safe outer `ProviderError` still had the raw transport `ProviderError` as `__cause__`. The regression passed after each replacement raise moved outside the original exception scope:

```text
Ran 1 test
OK
```

### Verification evidence

Focused Electron suites, from `gui`:

```text
node --test electron/provider-credential-store.test.cjs electron/control-service.test.cjs

tests 9
pass 9
fail 0
```

Focused Python suites, from the repository root:

```text
python -m unittest tests.test_assistant tests.test_service

Ran 18 tests in 4.441s
OK
```

Syntax, compile, lint, diff, and privacy checks:

```text
node --check electron/control-service.cjs
node --check electron/control-service.test.cjs
node_modules/.bin/eslint.cmd electron/control-service.cjs electron/control-service.test.cjs
python -m py_compile job_pipeline/assistant.py tests/test_assistant.py
git diff --check

No validation error. Every command exited 0.
Raw email matches: 0
Literal secret-like matches: 0
Em dash matches: 0
```

### Security review

- Omitted provider options now produce no active provider configuration in the child, even when the parent environment contains malicious synthetic values.
- A valid bounded parent selector cannot smuggle its named credential variable into the child clone.
- Explicit provider values still pass only after the existing URL, key-set, name, and credential validation.
- The ambient source object and `process.env` are never mutated.
- Full traversal of the safe model and completion exceptions finds no cause, context, synthetic credential, or raw transport detail.
- No real credential, external request, renderer state, transcript, database, log, or command argument entered the verification path.

### Remaining concerns

1. Live installed FreeChain authentication remains outside this synthetic fix round because no real credential was accessed.
2. Unrelated environment variables continue to be inherited by the owned child as required for normal process operation. Only active provider keys are removed.
