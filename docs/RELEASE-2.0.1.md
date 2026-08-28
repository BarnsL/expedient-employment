# Expedient Employment 2.0.1

Released: 2026-08-27

## Fixed

- `jobs.pipeline.run` no longer fails at startup when external WebClaw is not installed and Tavily is not configured.
- The packaged, pinned MIT only-cli runtime now provides zero-setup public job discovery and page extraction.
- Public LinkedIn guest job results are used first, with bounded DuckDuckGo and Bing fallbacks when the source is unavailable or challenged.
- Search redirects are unwrapped and tracking parameters are removed before jobs are stored.
- LinkedIn page blocks are normalized into clean role, employer, and location fields instead of storing full page titles.
- Successful pipeline tool calls now return the current run's structured job rows to chat, preventing follow-up tool guessing when the assistant summarizes results.
- Runtime failures no longer copy only-cli page content into assistant error messages.

## Verification

- 160 Python tests passed.
- 17 renderer and Electron tests passed.
- GUI lint and production build passed.
- GUI and bundled only-cli dependency audits reported zero known vulnerabilities.
- The outgoing repair diff contains no email addresses or credential assignments.
- A live no-key, no-WebClaw recruiting run saved five jobs with zero extraction errors and produced the HTML report.

The application remains MIT licensed. only-cli remains a separately attributed MIT dependency pinned to the reviewed revision recorded in `docs/PROVENANCE.md`. External WebClaw remains optional and is not packaged.
