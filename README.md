# Expedient Employment

[![Tests](https://github.com/BarnsL/expedient-employment/actions/workflows/tests.yml/badge.svg)](https://github.com/BarnsL/expedient-employment/actions/workflows/tests.yml)
[![Python](https://img.shields.io/badge/python-3.10%2B-15324a)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-cc8b19)](LICENSE)

Expedient Employment is a local-first job research, ranking, application-drafting, and automation workspace. It combines a deterministic recruiting pipeline with a durable tool-using assistant, repeatable web workflows, and scheduled background runs.

The application prepares work for the user. It never submits an application, sends an employer-facing message, solves a challenge, or conceals automated traffic without an explicit action-specific approval path.

## What is included

- **Recruiting pipeline:** discovers, validates, deduplicates, verifies, scores, and ranks roles with explainable evidence.
- **Application workspace:** records lifecycle state, outcomes, notes, evidence, packets, and undoable user decisions.
- **Connection assistant:** supports provider and model selection, durable transcripts, queued and editable messages, retries, local image context, and tool calls.
- **Agent tool broker:** exposes JSON-schema tools through typed policy classes, bounded execution, cancellation, output caps, content-free audit events, and exact approval digests.
- **only-cli integration:** gives the assistant implemented read and navigation tools through a pinned MIT runtime. Optional fingerprint impersonation is not installed or packaged.
- **Web Workbench:** runs validated DAG workflows with dry-run previews, bounded retries, resumable state, cancellation, circuit controls, interpolation, and structured results.
- **Automations:** stores interval or daily schedules, leases due work safely, coalesces missed runs, records history, and can install a hidden per-user Windows wake task.
- **Application drafts:** creates local draft packets only. Employer-facing execution is not registered as a tool.
- **Control Anything surface:** centralizes provider readiness, tools, workflows, schedules, jobs, application state, and service health in one desktop application.

## Safety model

The app uses these default boundaries:

1. Public-page reads and local writes can run automatically within their configured limits.
2. External drafts can be prepared automatically but remain local.
3. External actions require a digest bound to the exact tool call and arguments.
4. Scheduled workflows reject external-action tools entirely.
5. Access challenges, login walls, and bot checks stop automation and request visible user handoff.
6. There is no CAPTCHA bypass, fingerprint spoofing, credential replay, stealth timing, or concealed form submission.

See [docs/SECURITY.md](docs/SECURITY.md) for the threat model and [docs/AUTOMATION.md](docs/AUTOMATION.md) for workflow policy.

## Windows install

Release output contains:

- `ExpedientEmployment-Setup-2.0.0.exe`, a per-user installer.
- `Expedient Employment-2.0.0-win.zip`, a portable archive.

The installer places the application under the current user's local programs directory and creates a Start Menu shortcut. It does not require administrator rights.

## Run from source

Requirements:

- Python 3.10 or newer
- Node.js 20 or newer
- PowerShell on Windows
- Docker only for the optional Resume-Matcher service

```powershell
pip install -e .
npm install
npm --prefix gui ci
npm --prefix gui run only-cli:install
.\run.ps1 doctor
npm --prefix gui run electron:dev
```

The assistant can use a loopback OpenAI-compatible provider or an HTTPS provider configured by environment variable. Credentials stay in the main-process service environment and are never sent to the renderer.

## Useful commands

```powershell
# Deterministic offline demo
.\run.ps1 demo

# Full Python suite
python -m unittest discover -s tests

# Recruiting scale acceptance run
python -m job_pipeline.recruiting_acceptance --output reports/recruiting_acceptance.json

# Renderer tests, lint, and production build
npm --prefix gui test
npm --prefix gui run lint
npm --prefix gui run build

# Electron boundary tests
node --test gui/electron/*.test.cjs

# Build Windows installer and portable archive
powershell -NoProfile -ExecutionPolicy Bypass -File packaging/build-windows.ps1
```

The recruiting acceptance suite is synthetic and offline. It produces hundreds of eligible recruiting records across multiple seeded trials, verifies ranking precision, and asserts that bounded output contains no contact-shaped data.

## Architecture

```text
Electron renderer
    -> context-isolated preload with fixed IPC methods
    -> Electron main process
    -> authenticated loopback control service
    -> assistant, broker, workflows, scheduler, pipeline, only-cli
    -> local SQLite and content-addressed attachment storage
```

The renderer never receives the control-service bearer token. Webviews are restricted to approved job-board identity surfaces or the two fixed loopback service ports. Permissions and popups are denied by default.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/ASSISTANT.md](docs/ASSISTANT.md), and [docs/APP_REFERENCE.md](docs/APP_REFERENCE.md) for implementation detail.

## Source and licenses

All original Expedient Employment source is MIT licensed. MIT source from [adeluna1/ai-job-search-pipeline](https://github.com/adeluna1/ai-job-search-pipeline) and [only-cli](https://github.com/only-cli/oc) is integrated at reviewed revisions recorded in [docs/PROVENANCE.md](docs/PROVENANCE.md).

No Wigolo or Maxun source, tests, schemas, prompts, assets, or internal implementation structure is copied. Comparable product behaviors were implemented independently in original MIT modules from public product requirements.

Third-party packages keep their own licenses. Optional AGPL software is a separate user-installed process and is not part of the MIT installer payload. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Responsible use

- Read only pages you are authorized to access and respect site terms and reasonable request rates.
- Use visible browser handoff for login and challenge completion.
- Review every application packet for truthfulness, eligibility, salary, location, and freshness.
- Keep employer-facing actions under human approval.

MIT License. See [LICENSE](LICENSE).
