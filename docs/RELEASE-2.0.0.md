# Expedient Employment 2.0.0

## Release scope

Version 2.0.0 combines the MIT application-lifecycle and recruiting improvements from the reviewed AI Job Search Pipeline revision with original Expedient modules for tool brokering, web intelligence, workflow execution, scheduling, assistant conversations, and the desktop Control Anything surface.

## Major additions

- Durable Connection Assistant with queue editing, cancellation, retries, image context, provider readiness, model selection, and tool events.
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

## Verification requirements

Release verification includes the complete Python suite, renderer tests and build, Electron tests, dependency audits, static analysis, tracked-source and packaged-payload privacy scans, three synthetic recruiting trials, installed control-service smoke tests, Start Menu verification, and a visible app launch.

The Windows package includes the pinned Python timezone fallback required for named daily schedules on systems without an IANA timezone database.
Scheduler storage is synchronized across the loopback service's concurrent request threads.
