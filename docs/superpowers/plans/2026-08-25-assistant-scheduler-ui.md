# Assistant, Scheduler, and UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the full queued, image-aware, tool-using assistant and restart-safe scheduled job hunting through the Electron control center.

**Architecture:** A loopback-authenticated Python control service owns conversations, schedules, tools, and SQLite state. Electron owns process lifecycle and narrow IPC. React renders the assistant and operations surfaces from typed APIs and receives bounded event streams.

**Tech Stack:** Python standard library HTTP server and SQLite, Electron 43, React 19, TypeScript 5.9, Vitest, Testing Library

## Global Constraints

- Scheduled discovery, scoring, extraction, and drafting may run unattended.
- Employer-facing submissions and messages require exact action-time approval.
- Image attachment data stays local unless the selected provider requires transmission and the user opted into it.
- The screenshot is the assistant interaction reference and the current dark control-center identity remains intact.
- All primary interactions are keyboard operable and announce status changes.

---

### Task 1: Add Conversation, Message, Attachment, and Provider Models

**Files:**
- Create: `job_pipeline/assistant.py`
- Create: `tests/test_assistant.py`
- Modify: `job_pipeline/storage.py`

**Interfaces:**
- Produces: `AssistantProvider`, `OpenAICompatibleProvider`, `ConversationService`, `QueuedMessage`, `AttachmentRecord`, and provider readiness records
- Consumes: `ToolBroker`, SQLite, and an injected provider HTTP transport

- [ ] **Step 1: Write failing storage and provider tests**

Cover conversation creation, ordered message queueing, edit-before-run, cancellation, retry, clear transcript, attachment count and byte caps, content digests, provider readiness, model listing, and an OpenAI-compatible tool-call response.

- [ ] **Step 2: Run tests and confirm missing module**

Run: `python -m unittest tests.test_assistant -v`

Expected: FAIL because `job_pipeline.assistant` is missing.

- [ ] **Step 3: Implement the minimal models and provider contract**

```python
class AssistantProvider(Protocol):
    name: str
    def readiness(self) -> dict[str, Any]: ...
    def models(self) -> list[str]: ...
    def complete(self, request: AssistantRequest) -> AssistantResponse: ...

class ConversationService:
    def enqueue(self, conversation_id: str, content: str, attachment_ids: Sequence[str]) -> QueuedMessage: ...
    def run_next(self, conversation_id: str) -> QueuedMessage | None: ...
    def cancel(self, message_id: str) -> QueuedMessage: ...
```

The provider adapter accepts a configured loopback or HTTPS base URL and reads the key from an environment variable name, never from persisted conversation state.

- [ ] **Step 4: Run focused and full tests**

Run:

```powershell
python -m unittest tests.test_assistant -v
python -m unittest discover -s tests -v
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```powershell
git add job_pipeline/assistant.py job_pipeline/storage.py tests/test_assistant.py
git commit -m "feat: add durable assistant conversations"
```

### Task 2: Execute Tool Calls and only-cli from the Assistant Queue

**Files:**
- Modify: `job_pipeline/assistant.py`
- Modify: `job_pipeline/tool_broker.py`
- Modify: `tests/test_assistant.py`

**Interfaces:**
- Produces: bounded multi-turn tool execution with `tool_start`, `tool_result`, `approval_required`, `message_complete`, and `message_failed` events
- Consumes: provider tool calls and registered `web.only_cli.*` specifications

- [ ] **Step 1: Write failing end-to-end queue tests**

Use a deterministic provider fixture that requests `web.only_cli.read`, receives the typed result, then returns an assistant answer. Assert that two queued messages run in order, cancellation prevents a third message from starting, and every tool event has an audit record.

- [ ] **Step 2: Run the focused tool-loop test**

Run: `python -m unittest tests.test_assistant.AssistantTests.test_only_cli_tool_call_runs_from_queue -v`

Expected: FAIL because provider tool calls are not executed.

- [ ] **Step 3: Implement the bounded tool loop**

```python
MAX_TOOL_ROUNDS = 8

for round_index in range(MAX_TOOL_ROUNDS):
    response = provider.complete(request)
    if not response.tool_calls:
        return self._complete_message(message, response)
    for call in response.tool_calls:
        result = self.broker.invoke(call.name, call.arguments, context)
        request = request.with_tool_result(call.id, result)
raise AssistantError("tool round limit exceeded")
```

Stop immediately on cancellation, approval-required, challenge, or provider circuit-breaker events.

- [ ] **Step 4: Run assistant, only-cli, broker, and full suites**

Run:

```powershell
python -m unittest tests.test_assistant tests.test_only_cli tests.test_tool_broker -v
python -m unittest discover -s tests -v
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```powershell
git add job_pipeline/assistant.py job_pipeline/tool_broker.py tests/test_assistant.py
git commit -m "feat: run only-cli through assistant queue"
```

### Task 3: Add the Restart-Safe Scheduler

**Files:**
- Create: `job_pipeline/scheduler.py`
- Create: `tests/test_scheduler.py`
- Create: `scripts/install-scheduler.ps1`
- Modify: `job_pipeline/storage.py`
- Modify: `job_pipeline/cli.py`

**Interfaces:**
- Produces: `Schedule`, `ScheduleService.create`, `ScheduleService.due`, `ScheduleService.run_due`, CLI `schedule run-due`, and an opt-in Windows Task Scheduler installer
- Consumes: workflow runner and pipeline commands registered as local tools

- [ ] **Step 1: Write failing recurrence and safety tests**

Cover interval and daily recurrence, local timezone conversion, restart persistence, missed-run coalescing, enabled state, duplicate wake lock, read-only scheduled workflow, draft preparation, and rejection of external-action schedules.

- [ ] **Step 2: Run focused tests and verify the missing scheduler**

Run: `python -m unittest tests.test_scheduler -v`

Expected: FAIL because `job_pipeline.scheduler` is missing.

- [ ] **Step 3: Implement the scheduler and CLI wake command**

```python
ALLOWED_SCHEDULE_POLICIES = frozenset({
    ToolPolicy.READ,
    ToolPolicy.LOCAL_WRITE,
    ToolPolicy.EXTERNAL_DRAFT,
})

def run_due(self, *, now: datetime, limit: int = 10) -> list[RunSummary]: ...
```

The PowerShell installer registers one per-user hidden task that runs `python -m job_pipeline schedule run-due` with the repository or installed runtime path and never stores credentials in the task definition.

- [ ] **Step 4: Run scheduler, CLI, and full suites**

Run:

```powershell
python -m unittest tests.test_scheduler -v
python -m job_pipeline schedule --help
python -m unittest discover -s tests -v
```

Expected: all commands pass.

- [ ] **Step 5: Commit**

```powershell
git add job_pipeline/scheduler.py job_pipeline/storage.py job_pipeline/cli.py tests/test_scheduler.py scripts/install-scheduler.ps1
git commit -m "feat: add restart-safe job hunting scheduler"
```

### Task 4: Add the Authenticated Control Service and Electron Bridge

**Files:**
- Create: `job_pipeline/service.py`
- Create: `tests/test_service.py`
- Create: `gui/electron/control-service.cjs`
- Create: `gui/electron/control-service.test.cjs`
- Modify: `gui/electron/main.cjs`
- Modify: `gui/electron/preload.cjs`
- Modify: `gui/src/lib/api.ts`

**Interfaces:**
- Produces: loopback `/v1` JSON routes, server-sent event stream, owned-process lifecycle, and typed preload methods
- Consumes: assistant, schedules, tools, jobs, applications, and workflows

- [ ] **Step 1: Write failing authentication and IPC tests**

Cover missing token, invalid token, non-loopback bind rejection, body-size cap, invalid JSON, unknown route, event-stream redaction, service child shutdown, and preload method allowlist.

- [ ] **Step 2: Run Python and Node service tests**

Run:

```powershell
python -m unittest tests.test_service -v
node --test gui/electron/control-service.test.cjs
```

Expected: FAIL because both service modules are missing.

- [ ] **Step 3: Implement the service and narrow Electron proxy**

The Python process prints one startup record containing its random loopback port. Electron generates the bearer token, passes it only through the child environment, and proxies fixed IPC methods. Renderer code never receives the bearer token.

```typescript
assistantSend(input: AssistantSendInput): Promise<QueuedMessage>;
assistantMessages(conversationId: string): Promise<Message[]>;
assistantCancel(messageId: string): Promise<Message>;
assistantAttach(input: AttachmentInput): Promise<Attachment>;
toolsList(): Promise<ToolReadiness[]>;
schedulesList(): Promise<Schedule[]>;
schedulesSave(input: ScheduleInput): Promise<Schedule>;
```

- [ ] **Step 4: Run service, Electron, Python, and TypeScript checks**

Run:

```powershell
python -m unittest tests.test_service -v
node --test gui/electron/*.test.cjs
npm --prefix gui run build
python -m unittest discover -s tests -v
```

Expected: all commands pass.

- [ ] **Step 5: Commit**

```powershell
git add job_pipeline/service.py tests/test_service.py gui/electron gui/src/lib/api.ts
git commit -m "feat: bridge assistant service into Electron"
```

### Task 5: Build the Assistant, Automations, and Web Workbench Surfaces

**Files:**
- Create: `gui/src/pages/Assistant.tsx`
- Create: `gui/src/pages/Automations.tsx`
- Create: `gui/src/pages/WebWorkbench.tsx`
- Create: `gui/src/components/assistant/Composer.tsx`
- Create: `gui/src/components/assistant/MessageQueue.tsx`
- Create: `gui/src/components/assistant/Transcript.tsx`
- Create: `gui/src/components/assistant/ToolEvent.tsx`
- Create: `gui/src/components/assistant/AttachmentStrip.tsx`
- Create: `gui/src/components/assistant/ApprovalCard.tsx`
- Create: `gui/src/components/assistant/assistant.test.tsx`
- Modify: `gui/src/App.tsx`
- Modify: `gui/src/index.css`
- Modify: `gui/package.json`

**Interfaces:**
- Produces: navigation routes and accessible assistant, schedule, workflow, only-cli, extraction, and run-history controls
- Consumes: typed `api` methods and event records from Task 4

- [ ] **Step 1: Install the UI test harness and write failing interaction tests**

Tests must cover provider and model selection, readiness refresh, Enter and Shift+Enter, queue order, edit, cancel, retry, image attachment removal, tool-event rendering, approval card, new conversation, clear transcript, schedule enable/disable, workflow dry run, only-cli command selection, and responsive overflow.

- [ ] **Step 2: Run the focused UI tests**

Run: `npm --prefix gui test -- --run gui/src/components/assistant/assistant.test.tsx`

Expected: FAIL because the components and test script do not exist.

- [ ] **Step 3: Implement the Operate-mode surfaces**

Preserve the dark control-center world. The assistant opens with provider and model controls, readiness chips, transcript, message queue, image attachment strip, keyboard hints, and one clear send action. Tool events remain compact by default and expand for details. External-action approval cards remain visually distinct from ordinary tool output.

- [ ] **Step 4: Run UI tests, detector, build, lint, and full backend tests**

Run:

```powershell
npm --prefix gui test -- --run
npm --prefix gui run lint
npm --prefix gui run build
node %USERPROFILE%\.codex\skills\impeccable\scripts\detect.mjs --json gui/src/pages/Assistant.tsx gui/src/pages/Automations.tsx gui/src/pages/WebWorkbench.tsx gui/src/components/assistant
python -m unittest discover -s tests -v
```

Expected: tests, lint, and build pass. Mechanical detector findings are fixed once and remaining design judgments are sent to finish review.

- [ ] **Step 5: Commit**

```powershell
git add gui
git commit -m "feat: add assistant and automation workspaces"
```
