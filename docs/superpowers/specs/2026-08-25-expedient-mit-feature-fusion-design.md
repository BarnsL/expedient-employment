# Expedient Employment MIT Feature Fusion Design

**Status:** Approved by the user on 2026-08-25

## Objective

Build one production-quality, MIT-licensed Expedient Employment application that:

1. Preserves the existing desktop application and job pipeline.
2. Incorporates every nonconflicting feature from Adeluna's MIT-licensed `ai-job-search-pipeline`.
3. Exposes only-cli as a first-class tool available to the assistant and scheduled workflows.
4. Recreates the useful Wigolo and Maxun capabilities as original MIT code without copying AGPL implementation material.
5. Adds a full assistant with queued messages, image context, tool execution, scheduling, application drafting, and visible audit history.
6. Improves web automation through verification, challenge detection, bounded pacing, circuit breakers, and safe handoff rather than evasion.
7. Ships with thorough documentation, security evidence, packaged-runtime verification, and a user-visible review launch.

## License and Provenance Boundary

The following repositories are eligible for direct code integration with preserved copyright notices and attribution:

| Source | License | Integration rule |
|---|---|---|
| `BarnsL/expedient-employment` | MIT | Canonical product and destination |
| `adeluna1/ai-job-search-pipeline` | MIT | Selectively port all nonconflicting features and tests |
| `only-cli/oc` | MIT | Pin a reviewed revision, preserve notices, fix Windows portability, and expose through the tool broker |

The following repositories are not eligible for MIT relicensing or direct source integration:

| Source | License | Product treatment |
|---|---|---|
| `KnockOutEZ/wigolo` | AGPL-3.0 | Recreate required behavior from product requirements and public interface behavior using original code |
| `getmaxun/maxun` | AGPL-3.0 | Recreate required workflow automation behavior using original code and the application's existing browser boundary |

No Wigolo or Maxun source, tests, assets, prompts, schemas, generated artifacts, or implementation structure may be copied into the repository. Provenance documentation must identify every directly imported MIT file and every independently implemented replacement capability.

## Integration Strategy

Directly merging the Adeluna branch is rejected because the repositories have unrelated histories and the upstream removes current Expedient files. The implementation will selectively port coherent feature modules and their tests into the current repository, preserving existing behavior and resolving conflicts at the domain boundary.

The product remains a Python standard-library core with an Electron and React interface. SQLite is the durable system of record. External tools run through small adapters registered with a central capability broker instead of being callable as arbitrary shell commands.

## Core Pipeline Fusion

The following Adeluna feature groups will be ported and reconciled:

- Candidate triage and explicit review queues.
- Geography, commute, relocation, and role-scope gates.
- Job exclusions and deterministic rejection reasons.
- Immutable A to B to C handoff integrity and freshness checks.
- Application lifecycle events, outcomes, undo, and dashboard summaries.
- Posting intelligence, cross-listing detection, and repost recognition.
- Direct employer and ATS discovery with domain verification.
- Cross-board deduplication and application-history synchronization.
- Tailoring plans and truthful application draft preparation.
- Current-run isolation, discovery caps, provider timeouts, and cache behavior.
- Failure classification, challenge detection, and provider circuit breakers.
- Manual queues for incomplete data, unresolved fields, or blocked browser states.

Existing Expedient integrations, packaging, Paperclip roles, documentation, and reviewed browser policies remain unless a ported implementation demonstrably supersedes them.

## Durable Data Model

SQLite will own these records:

- `runs`: scheduled and manual execution identity, status, timestamps, and summaries.
- `jobs`: normalized roles, sources, employer identity, posting intelligence, and freshness.
- `matches`: deterministic scores, eligibility gates, explanations, and resume evidence.
- `applications`: lifecycle status, application identity, approved packet digest, and outcome.
- `application_events`: immutable lifecycle and audit events.
- `conversations`: assistant provider, model, title, and state.
- `messages`: role, content, queue state, retry metadata, and timestamps.
- `attachments`: bounded metadata, content digest, local path, media type, and extraction state.
- `tool_invocations`: tool, arguments digest, policy class, status, result summary, and error class.
- `schedules`: task definition, local timezone, recurrence, enabled state, and next run.
- `approvals`: exact subject digest, action class, decision, actor, and expiry.

Schema upgrades remain forward-only and transactional. Existing databases migrate without losing current job, match, run, or application data.

## Agent Tool Broker

The broker is the only assistant entry point to application tools. Each registered tool declares:

- Stable name and human-readable description.
- JSON-compatible input and output schemas.
- Policy class: `read`, `local_write`, `external_draft`, or `external_action`.
- Required capability and optional provider dependency.
- Timeout, output-size limit, and cancellation behavior.
- Audit redaction rules.

The broker rejects unknown tools and arguments, never accepts arbitrary shell text, and records each invocation. `external_action` tools require an approval matching the exact normalized arguments. The assistant can discover tools and readiness state without receiving credentials or unrestricted process access.

## only-cli Integration

only-cli is exposed through a pinned adapter with a fixed command allowlist. The assistant can use supported operations such as opening an approved URL, reading page content, locating elements, inspecting state, navigating, and invoking reviewed site verbs.

The adapter will:

- Resolve Windows paths without constructing invalid drive-prefixed paths.
- Use an application-owned session directory rather than copying browser credentials.
- Validate URLs through the same access policy used by other browser providers.
- Bound subprocess time, stdout, stderr, and result size.
- Convert command output into typed tool results.
- Surface login-required and challenge states as user handoffs.
- Avoid claiming unsupported `fill` or `submit` functionality from the upstream project.

only-cli remains available to the chat assistant, scheduled discovery tasks, and the Operations surface wherever the requested command's policy permits it.

## MIT Web Intelligence Replacement

An original `web_intelligence` package will provide the appropriate Wigolo-style capabilities:

- Safe URL search and fetch orchestration through registered providers.
- Page reading and normalized text extraction.
- Link discovery, bounded same-site crawl, and structured field extraction.
- Content-addressed cache with freshness and source metadata.
- HTML-to-text conversion using permissively licensed dependencies or existing platform facilities.
- Challenge, robots, terms, and rate-limit signals.
- SSRF protection, redirect revalidation, DNS connection pinning where applicable, and response-size limits.
- No local plugin loading, arbitrary child processes, automatic model downloads, or mutable remote code.

## MIT Workflow Automation Replacement

An original `web_workflows` package will provide the appropriate Maxun-style capabilities:

- Versioned workflow definitions containing typed browser steps.
- A recorder/import surface for user-reviewed selectors and extraction fields.
- Step validation before execution.
- Dry-run and read-only execution modes.
- Resume, timeout, cancellation, retry, and circuit-breaker state.
- Structured dataset output and artifact provenance.
- Schedule integration through the same run coordinator.
- Exact approval before any representational or employer-facing action.

Workflow steps call registered broker tools. They do not execute JavaScript, shell commands, or arbitrary plugins supplied by page content.

## Assistant Surface

The assistant extends the existing dark control-center identity and uses the supplied screenshot as the interaction reference. It operates as a docked panel and optional focused workspace.

Required behavior:

- Provider selector, model selector, refresh control, and readiness indicators.
- Streaming transcript with user, assistant, tool, error, and approval events.
- Durable message queue with send-now, reorder, edit-before-run, cancel, retry, and clear controls.
- Enter to queue or send, Shift+Enter for newline, with accessible alternatives.
- Bounded image attachments with thumbnails, removal, digesting, and vision-capability checks.
- Visible tool plan, active tool status, completion summary, and sanitized errors.
- New conversation, clear transcript, conversation history, and model-switch boundaries.
- Schedule creation from an assistant proposal only after the user confirms the recurrence and scope.
- Draft cards for resumes, cover letters, application answers, and follow-up material.
- Approval cards showing the exact external action and the payload digest being approved.

Queued messages execute sequentially per conversation. Cancellation prevents queued work from starting and requests cooperative cancellation for active tools. Image data remains local unless the chosen provider invocation explicitly requires transmission and the user has opted into that provider.

## Scheduler

The scheduler is durable, local-time aware, and restart-safe. It may run unattended tasks for:

- Discovery and direct-source verification.
- Deduplication and posting intelligence.
- Deterministic scoring and candidate triage.
- Read-only extraction workflows.
- Local data processing and report generation.
- Application draft preparation.

It may not submit applications, send messages, accept terms, solve challenges, or transmit candidate data without a current exact approval. Missed runs use an explicit coalescing policy so a machine waking from sleep does not launch an unbounded backlog.

## Safety and Security Architecture

- Electron uses context isolation, sandboxing where compatible, no renderer Node integration, narrow preload methods, and schema-validated IPC.
- Local APIs bind to loopback, require a per-install secret, validate Origin, and use restrictive CORS and CSP.
- URLs are normalized, policy checked before and after redirects, and rejected for private or link-local targets unless explicitly configured as local services.
- Browser sessions never copy credentials from unrelated profiles and never record secrets in audit events.
- Attachments use type, count, and size caps, content digests, safe local paths, and bounded decoders.
- Page content, tool output, attachments, and model responses are untrusted and cannot authorize tools.
- Logs capture lifecycle, attribution, duration, status, usage, errors, and cooldowns while excluding message bodies, page content, credentials, and candidate secrets.
- Challenge handling stops the affected provider, records a classified event, applies cooldown, and offers user handoff.

## Interface Topology

The application shell gains these coordinated surfaces:

- **Dashboard:** scheduled activity, pipeline health, review queue, and recent outcomes.
- **Jobs:** lifecycle, posting intelligence, eligibility reasons, source provenance, and application state.
- **Assistant:** full conversation, queue, image context, tool activity, drafts, and approvals.
- **Automations:** schedules, workflow definitions, run history, dry runs, and circuit breakers.
- **Web Workbench:** safe browser tools, only-cli operations, extraction workflows, sessions, and datasets.
- **Agents:** provider and model readiness plus registered tool capabilities.
- **Settings:** credentials, local-only privacy choices, access policy, retention, and integrations.
- **Control Anything:** the generated knowledge graph and guided architecture tour.

## Failure Behavior

- Provider outage: classify, record, back off, and continue through configured fallback providers.
- Login required: pause the affected task and offer an explicit browser handoff.
- Challenge detected: stop, cool down, and never attempt bypass.
- Stale or mutated application packet: invalidate approval and return to review.
- Scheduler interruption: mark the run interrupted and resume only from an idempotent boundary.
- Tool timeout: terminate only the owned subprocess or operation and store a bounded error summary.
- Attachment decoding failure: keep the message as a draft and explain which attachment must be removed or replaced.
- Unresolved application field: preserve it as unresolved and prohibit submission.

## Verification Strategy

Implementation follows test-driven development. Every new behavior starts with a focused failing test.

Required automated evidence:

- Current Expedient Python suite with deterministic clock handling.
- Ported Adeluna unit and integration tests.
- only-cli adapter tests on Windows paths, process timeouts, output caps, and login/challenge classification.
- Tool-broker schema, policy, cancellation, approval, and audit tests.
- Scheduler recurrence, restart, missed-run, and approval-boundary tests.
- Web intelligence SSRF, redirect, crawl-bound, cache, and challenge tests.
- Workflow validation, dry-run, resume, and circuit-breaker tests.
- Assistant queue, attachment, provider switching, and tool event tests.
- Electron IPC, origin, navigation, CSP, and preload contract tests.
- React accessibility, keyboard, empty, loading, error, overflow, and responsive tests.

Required final evidence:

- Python, Node, Electron, and packaging test commands pass.
- Production dependency audits and a transitive license inventory are recorded.
- Static security scans and secret scans cover the exact packaged scope.
- The Windows packaged artifact is scanned and launched.
- Start Menu installation is verified for the packaged desktop application.
- A scheduled read-only job completes from a fresh launch.
- The assistant queues multiple messages, accepts an image, invokes only-cli, calls another registered tool, and records the sanitized audit trail.
- The final Control Anything graph is regenerated and its dashboard opens without console errors.
- The finished Expedient Employment application is opened for user review.

## Documentation Deliverables

- `README.md`: supported workflow and startup.
- `FEATURES.md`: implemented capability matrix.
- `ISSUES.md`: only verified remaining limitations.
- `docs/APP_REFERENCE.md`: complete commands, APIs, data, and failure behavior.
- `docs/SECURITY.md`: threat model, controls, audits, and residual risk.
- `docs/PROVENANCE.md`: source revision, license, copied-file attribution, and clean-room replacements.
- `THIRD_PARTY_NOTICES.md`: complete shipped dependency notices.
- Source comments at trust boundaries and for non-obvious safety invariants.

## Completion Definition

The work is complete only when implementation, documentation, automated tests, security and license audits, packaged-runtime verification, Start Menu installation, live assistant and only-cli demonstration, scheduled dry run, refreshed Control Anything graph, and final visible application launch are all evidenced. Code presence or a successful build alone is not completion.
