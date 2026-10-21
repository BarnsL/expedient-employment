# Expedient Employment for Crew

This app puts the Expedient Employment job search agent in the Crew Library. It has the same Dashboard, Assistant, Automations, Web workbench, Search, Jobs, Applications, Agents, Browser, Paperclip, Resume Matcher and Settings pages as the desktop app. It uses the Crew theme. Saved jobs come from the SQLite database.

Start in Settings. Review your candidate facts and your search preferences. Search finds public jobs through the LLM Browser app. The posting age setting is enforced. A job with an unknown date is reported for review. It is not called recent.

Install and enable the LLM Browser app with this app. It gives light, lean and full browser modes, current page controls and challenge handoff. Sign in and site checks stay with you.

## Autonomous submission

Agent C can submit applications with no action from you. You turn this on one time, in your own terminal, from the project folder:

```powershell
python -m job_pipeline autonomy enable --granted-by "Your Name" --days 30 --daily-cap 10 --min-score 70
```

After that, a Crew agent or you can run, check or stop it:

```powershell
python "$env:USERPROFILE\.codex-crew\apps\expedient-employment\bin\expedient.py" autonomy run C:\path\resume.docx
python "$env:USERPROFILE\.codex-crew\apps\expedient-employment\bin\expedient.py" autonomy run C:\path\resume.docx --dry-run
python "$env:USERPROFILE\.codex-crew\apps\expedient-employment\bin\expedient.py" autonomy status
python "$env:USERPROFILE\.codex-crew\apps\expedient-employment\bin\expedient.py" autonomy disable
```

The Crew bridge has no operation that turns autonomy on. See [the autonomy guide](https://github.com/BarnsL/expedient-employment/blob/main/docs/AUTONOMY.md) for the checks, the receipts and the ledger.

## API and CLI

The Crew interface calls the authenticated API at `/apps/expedient-employment/api/*`. The CLI signs local requests by itself. Do not read or print its credential files.

```powershell
python "$env:USERPROFILE\.codex-crew\apps\expedient-employment\bin\expedient.py" status
python "$env:USERPROFILE\.codex-crew\apps\expedient-employment\bin\expedient.py" doctor
python "$env:USERPROFILE\.codex-crew\apps\expedient-employment\bin\expedient.py" jobs
python "$env:USERPROFILE\.codex-crew\apps\expedient-employment\bin\expedient.py" applications
python "$env:USERPROFILE\.codex-crew\apps\expedient-employment\bin\expedient.py" settings profile.json
```

`call OPERATION` reads `{"args":[...]}` from stdin. It runs each operation that `status` lists. `search` reads query, location, hoursOld and resultsWanted from stdin and returns a run ID. `run RUN_ID` reads progress. `cancel RUN_ID` stops a search. `request METHOD /api/...` calls the same API. Only `/health` accepts requests with no authentication.

The assistant uses the installed FreeChain app through its supported CLI. It does not copy provider keys. Paperclip and Resume Matcher are optional. Their pages show their real state. Schedules run only while this app is enabled.

## Security

1. `diagnostics` reports the registration state while the backend is stopped.
2. Lifecycle hooks use the Crew backend manager after admission. They never grant trust, enable an app or start a watchdog.
3. A disabled registration is refused by the app and by its CLI.
4. Each CLI request has a nonce that is valid one time. The CLI refuses redirects.
5. App state is readable only by its owner, Windows SYSTEM and administrators.
6. Responses hide credential fields and contact addresses.
7. Browser actions and session changes need an approval bound to the exact tool call.

Agent Reach gives two broker tools: `research.agent_reach.health` and `research.agent_reach.read_web`. The CLI commands are `agent-reach health` and `agent-reach read URL`. It reads public Microsoft careers pages and public LinkedIn job pages. It sends no private profile, contact data, sign in URL or token.

## Build and update

Build the interface from `gui` with `vite.crew.config.ts`. Run the Crew tests before you package:

```powershell
python crew/tests/test_expedient_parity.py
python crew/tests/test_security_hardening.py
python crew/tests/test_discovery_sources.py
python crew/package_apps.py --output NEW_FOLDER
```

The package has no credentials and no user state. Install it with `codexcrew app install`. The installed app keeps its state in `data/workspace` and its databases in `data/control`. Keep these folders when you update.
