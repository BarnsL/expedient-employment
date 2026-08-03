# Expedient Employment

[![Tests](https://github.com/BarnsL/expedient-employment/actions/workflows/tests.yml/badge.svg)](https://github.com/BarnsL/expedient-employment/actions/workflows/tests.yml)
[![Python](https://img.shields.io/badge/python-3.10%2B-15324a)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-cc8b19)](LICENSE)

**Expedient Employment is a local-first job-hunting assistant.** It searches the big job boards for you, checks that each posting is real and still open, scores every role against your own resume with a fully explainable rubric, and helps you prepare applications — nothing is ever submitted without your explicit, per-role approval. All of your data (jobs, scores, resume, notes) stays on your own computer.

A desktop app (Electron GUI) wraps the whole workflow, and a small team of AI agents — coordinated by [Paperclip](https://github.com/paperclipai/paperclip) — can do the heavy lifting: one agent finds and triages roles, a second independently verifies them, and a third prepares application packets that wait for your sign-off.

## Download (easiest way — Windows)

Not technical? You don't need to install Python or Node yourself:

1. Go to the [Releases](https://github.com/BarnsL/expedient-employment/releases) page.
2. Download either:
   - **`ExpedientEmployment-Setup-<version>.exe`** — a normal installer (no admin rights needed), or
   - **`ExpedientEmployment-portable-<version>.zip`** — a portable zip you can unzip and run anywhere.
3. Launch **Expedient Employment**, open the **Settings** page, and fill in your profile (target roles, locations, skills). Then run a search from the **Search** page.

macOS (`.dmg`) and Linux (`.AppImage`) packages are defined in the same build configuration; see [`packaging/README.md`](packaging/README.md) for build instructions.

## Screenshots

> Screenshots coming soon. Suggested captures: Dashboard with pipeline doctor and service health, Search page with live run log, Jobs shortlist, Settings JSON editors, and the embedded Paperclip control plane.

## Feature highlights

- **Multi-board discovery** — searches LinkedIn, Indeed, Glassdoor, and ZipRecruiter via [JobSpy](https://github.com/speedyapply/JobSpy), with automatic [WebClaw](https://github.com/0xMassi/webclaw) fallback when a board can't be read directly.
- **Verification before scoring** — every posting is resolved to the employer's own application page and confirmed active; closed or unverifiable listings never reach your shortlist.
- **Explainable scoring** — a deterministic rubric (title 35%, skills 30%, experience 15%, location 10%, responsibilities 10%) with matched evidence and gaps for every job. Optional AI re-ranking blends in at most 30%.
- **Optional ATS evidence** — a self-hosted [Resume-Matcher](https://github.com/srbhr/Resume-Matcher) (Docker, port 3000) can add a tailoring-preview ATS score — only after you explicitly authorize the resume upload.
- **Approval-gated applications** — the application assistant prepares a private packet and a dry-run plan; a browser helper can fill a form only after you accept a per-role confirmation bound to the exact packet.
- **Desktop GUI** — Dashboard with pipeline doctor and service health, Search, Jobs, Agents, Browser (per-site login tabs), Settings editors, and embedded Paperclip / Resume-Matcher pages with Engine Start buttons.
- **Session persistence** — log in to job boards yourself, once, in the built-in browser tabs; sessions persist locally.
- **Local-first privacy** — job data, scores, and reports live in this folder; your resume is read in memory and contact details are redacted before any optional AI call.

See [`FEATURES.md`](FEATURES.md) for the complete list and [`ISSUES.md`](ISSUES.md) for known issues and the change log.

## Install from source

### Prerequisites (all platforms)

| Requirement | Notes |
|---|---|
| Python 3.11+ (3.10 works) | [python.org](https://www.python.org/downloads/) |
| Node.js 20+ | [nodejs.org](https://nodejs.org/) — needed for the Paperclip control plane and the GUI |
| PowerShell | Built in on Windows. On macOS/Linux install `pwsh`: [PowerShell docs](https://learn.microsoft.com/powershell/scripting/install/installing-powershell) |
| Docker Desktop (optional) | Only for the optional Resume-Matcher ATS service |

### Windows

```powershell
cd path\to\expedient-employment
Set-ExecutionPolicy -Scope Process Bypass

# Python pipeline
pip install -e .

# Paperclip control plane
npm install

# Desktop GUI
cd gui; npm install; cd ..

# Check your setup
.\run.ps1 doctor

# Start the app
cd gui; npm run electron:dev
```

### macOS / Linux

```bash
cd path/to/expedient-employment

# Python pipeline
pip install -e .

# Paperclip control plane
npm install

# Desktop GUI
cd gui && npm install && cd ..

# Check your setup (requires pwsh on PATH)
pwsh ./run.ps1 doctor

# Start the app
cd gui && npm run electron:dev
```

Then open the **Settings** page in the app and personalize `config/profile.json` and `config/searches.json` (or edit the files directly). Copy `.env.example` to `.env` and add a `SERPER_API_KEY` if you want automated web search — you can always ingest job URLs by hand without any key.

### Try it without any keys

```powershell
.\run.ps1 demo        # ranks three fictional jobs, no network or keys needed
.\run.ps1 test        # runs the test suite
```

### Optional extras

- **JobSpy + browser-use runtimes** (isolated environments): `scripts/install-agent-integrations.ps1 -JobSpy` and `-BrowserUse`
- **Resume-Matcher** (optional ATS evidence):
  ```powershell
  docker run --name expedient-resume-matcher -p 3000:3000 `
    -v resume-matcher-data:/app/backend/data `
    ghcr.io/srbhr/resume-matcher:1.2.0
  ```
- **Paperclip agent team**: `scripts/start-paperclip.ps1`, then `scripts/setup-paperclip.ps1`, then open <http://127.0.0.1:3100>. Agents are created **paused**; see [`docs/PAPERCLIP_AGENTS.md`](docs/PAPERCLIP_AGENTS.md).

## How it works (brief)

```text
Job boards (JobSpy) ──► fallback search (WebClaw) ──► employer-page verification
      ──► deterministic scoring (optional AI blend / optional Resume-Matcher ATS)
      ──► HTML + CSV shortlist ──► Agent A triage ──► Agent B verify
      ──► Agent C packet ──► your confirmation ──► assisted form fill
```

The core is a standard-library-only Python CLI (`job_pipeline/`). Paperclip coordinates three agents (recruiter, verifier, application assistant); every external action is gated by an explicit human confirmation. The Electron GUI wraps the same commands.

For the full architecture, action map, and function reference, see [`docs/APP_REFERENCE.md`](docs/APP_REFERENCE.md), [`docs/PAPERCLIP_AGENTS.md`](docs/PAPERCLIP_AGENTS.md), and [`paperclip/PIPELINE_GRAPH.md`](paperclip/PIPELINE_GRAPH.md).

## Responsible use

- Only read public job pages you are allowed to access, and respect site terms and reasonable request rates.
- When a board can't be read directly, the app falls back to session-aware reading of job boards you have logged into yourself, in a visible window you control.
- No agent ever submits an application, messages a recruiter, creates an account, or invents answers about you. Unknown or sensitive questions always come back to you.
- Verify salary, location, eligibility, and freshness on the employer's own site before applying.

## License

MIT — see [LICENSE](LICENSE). Third-party components and their licenses are listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
