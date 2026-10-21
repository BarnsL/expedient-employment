# Expedient Employment

[![Tests](https://github.com/BarnsL/expedient-employment/actions/workflows/tests.yml/badge.svg)](https://github.com/BarnsL/expedient-employment/actions/workflows/tests.yml)
[![Python](https://img.shields.io/badge/python-3.11%2B-15324a)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-cc8b19)](LICENSE)

Expedient Employment is a job search agent that runs on your own computer. It finds jobs, scores them against your resume, prepares each application and can submit applications for you. You can use it as a desktop app, as a command line tool or as a Codex Crew app.

## What it does

1. **Find jobs.** It searches many job boards, removes duplicates, checks that each posting is live and records the employer site.
2. **Score jobs.** It compares each job to your resume and shows the evidence for each score. Scoring works with no AI key.
3. **Review jobs.** Agent B checks each good match again. It confirms that the posting is fresh, the employer domain is real and the location fits.
4. **Prepare applications.** Agent C builds an application packet from your reviewed facts and your resume.
5. **Submit applications.** When you turn on autonomy, Agent C fills and submits each eligible application with no action from you.
6. **Track results.** It records each application, the employer confirmation and your later outcomes.

It also reviews resumes, prepares interview practice and checks drafts for clear writing. See [the career guide](docs/CAREER.md).

## Autonomous submission

You turn autonomy on one time. After that, Agent C submits applications by itself.

```powershell
python -m job_pipeline autonomy enable --granted-by "Your Name" --days 30 --daily-cap 10 --min-score 70
python -m job_pipeline agent-c-auto --resume C:\path\resume.docx
```

Each run does these steps for each verified job, best score first:

1. It builds the application packet.
2. It skips the job if a question has no answer in your reviewed facts. It never guesses an answer.
3. It skips the job if the score is too low, the host is not allowed or the daily cap is reached.
4. It writes a receipt that binds the policy to the exact packet. The receipt expires in one hour.
5. It fills and submits the form, then reads the employer page.
6. It marks the job as applied only when the employer shows a confirmation.

Every attempt goes into `data/autonomous_submissions.jsonl`. To stop at once, run `python -m job_pipeline autonomy disable`. All receipts become invalid when you disable or change the policy. A policy expires after 90 days or less. The daily cap is 25 or less.

Some steps still need you. The agent does not solve a CAPTCHA, create an account, pass a login check or answer a question that your facts do not cover. It skips that job and records the reason. See [docs/AUTONOMY.md](docs/AUTONOMY.md).

## Codex Crew app

The `crew/expedient-employment` folder holds the Crew app. It gives Crew agents the same jobs, applications, settings and assistant through an authenticated local API. A Crew agent can run, check or stop autonomy. Only you can turn autonomy on, from your own terminal.

```powershell
python crew/package_apps.py
```

The installed LLM Browser app provides the research browser for the Crew app. See [the Crew app guide](crew/expedient-employment/README.md).

## Safety model

1. Public page reads and local writes run automatically within set limits.
2. Assistant tools that act on outside sites need an approval bound to the exact tool call.
3. Scheduled workflows cannot use outside action tools.
4. Autonomous submission needs your standing policy, a fresh receipt for each job and complete reviewed facts.
5. Login walls and bot checks stop the agent. There is no CAPTCHA bypass, fingerprint spoofing, credential replay or hidden traffic.
6. Contact details stay out of logs, reports and the submission ledger.

See [docs/SECURITY.md](docs/SECURITY.md) and [docs/AUTOMATION.md](docs/AUTOMATION.md).

## Install on Windows

The release has a per user installer and a portable archive. The installer puts the app in your local programs folder and adds a Start Menu shortcut. It does not need administrator rights.

## Run from source

You need Python 3.11 or newer, Node.js 20 or newer and PowerShell. Docker is necessary only for the optional Resume Matcher service.

```powershell
pip install -e .
npm install
npm --prefix gui ci
npm --prefix gui run only-cli:install
.\run.ps1 doctor
npm --prefix gui run electron:dev
```

For browser submission, install the isolated browser runtime with `scripts/install-agent-integrations.ps1 -BrowserUse`.

The assistant can use a local OpenAI compatible provider or an HTTPS provider that you set in an environment variable. Keys stay in the main process. The interface never receives them. See [docs/ASSISTANT.md](docs/ASSISTANT.md).

## Useful commands

```powershell
.\run.ps1 demo                                   # offline demo
python -m unittest discover -s tests             # Python tests
python crew/tests/test_expedient_parity.py       # Crew app tests
npm --prefix gui test                            # interface tests
npm --prefix gui run build                       # interface build
python -m job_pipeline autonomy status           # autonomy state and attempts today
python -m job_pipeline agent-c-auto --resume C:\path\resume.docx --dry-run
```

## Architecture

```text
Electron interface or Codex Crew app
    -> authenticated local control service
    -> assistant, tool broker, workflows, scheduler, pipeline
    -> Agent A (find), Agent B (review), Agent C (apply)
    -> local SQLite storage
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/APP_REFERENCE.md](docs/APP_REFERENCE.md).

## Source and licenses

Original Expedient Employment source uses the MIT license. Reviewed MIT source from [adeluna1/ai-job-search-pipeline](https://github.com/adeluna1/ai-job-search-pipeline) and [only-cli](https://github.com/only-cli/oc) is recorded in [docs/PROVENANCE.md](docs/PROVENANCE.md). Third party packages keep their own licenses. Optional AGPL software runs as a separate process and is not in the installer. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Responsible use

1. Use only sites that you can access, and obey their terms and rate limits.
2. Keep your reviewed facts true and current. The agent submits what your facts say.
3. Read the submission ledger often.
4. Disable autonomy when you stop your job search.

MIT License. See [LICENSE](LICENSE).
