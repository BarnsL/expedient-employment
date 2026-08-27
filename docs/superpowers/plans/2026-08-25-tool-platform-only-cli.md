# Tool Platform and only-cli Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the assistant and scheduled workflows a typed tool broker, the complete supported only-cli surface, and original MIT web intelligence and workflow capabilities.

**Architecture:** Python owns tool policy and audit records. only-cli is pinned from its MIT Git repository and invoked through a bounded subprocess adapter. Original Python packages implement safe reading, extraction, caching, and typed workflows without using Wigolo or Maxun implementation material.

**Tech Stack:** Python standard library, Node.js 20+, only-cli, SQLite, `unittest`, Node test runner

## Global Constraints

- The tool broker never accepts arbitrary command strings.
- only-cli is pinned to a reviewed Git revision and shipped with its MIT notice.
- No Wigolo or Maxun source, tests, assets, prompts, schemas, or implementation structure may enter the tree.
- All URLs pass access policy before use and after redirects.
- Tool output is size bounded and audit logs exclude page bodies and secrets.

---

### Task 1: Build the Typed Tool Broker

**Files:**
- Create: `job_pipeline/tool_broker.py`
- Create: `tests/test_tool_broker.py`
- Modify: `job_pipeline/storage.py`

**Interfaces:**
- Produces: `ToolPolicy`, `ToolSpec`, `ToolContext`, `ToolResult`, `ToolBroker.register`, `ToolBroker.list_tools`, and `ToolBroker.invoke`
- Consumes: exact approvals and `JobStore.record_tool_invocation`

- [ ] **Step 1: Write failing broker behavior tests**

```python
def test_unknown_tool_is_rejected(self):
    with self.assertRaises(UnknownToolError):
        ToolBroker().invoke("shell", {}, self.context)

def test_external_action_requires_matching_digest(self):
    broker = ToolBroker([external_tool])
    with self.assertRaises(ApprovalRequiredError):
        broker.invoke("application.submit", {"job_id": "j1"}, self.context)
```

Also cover argument validation, timeout classification, cancellation, result caps, and redacted audit storage.

- [ ] **Step 2: Run the focused tests and verify missing imports**

Run: `python -m unittest tests.test_tool_broker -v`

Expected: FAIL because `job_pipeline.tool_broker` does not exist.

- [ ] **Step 3: Implement the minimal broker**

```python
class ToolPolicy(StrEnum):
    READ = "read"
    LOCAL_WRITE = "local_write"
    EXTERNAL_DRAFT = "external_draft"
    EXTERNAL_ACTION = "external_action"

@dataclass(frozen=True)
class ToolSpec:
    name: str
    description: str
    policy: ToolPolicy
    input_schema: dict[str, Any]
    handler: Callable[[dict[str, Any], ToolContext], ToolResult]
    timeout_seconds: float = 30.0
    max_output_bytes: int = 262_144
```

The broker validates simple JSON Schema types without a new Python dependency and records only argument and result digests plus bounded summaries.

- [ ] **Step 4: Run broker and full Python tests**

Run:

```powershell
python -m unittest tests.test_tool_broker -v
python -m unittest discover -s tests -v
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```powershell
git add job_pipeline/tool_broker.py job_pipeline/storage.py tests/test_tool_broker.py
git commit -m "feat: add typed agent tool broker"
```

### Task 2: Make only-cli a First-Class Bot Tool

**Files:**
- Create: `job_pipeline/integrations/only_cli.py`
- Create: `tests/test_only_cli.py`
- Modify: `gui/package.json`
- Modify: `gui/electron-builder.yml`
- Modify: `THIRD_PARTY_NOTICES.md`
- Modify: `docs/PROVENANCE.md`

**Interfaces:**
- Produces: `OnlyCliAdapter.available`, `OnlyCliAdapter.run`, `OnlyCliAdapter.tool_specs`, and broker names under `web.only_cli.*`
- Consumes: an explicit CLI entry path, an application-owned session directory, and the access policy

- [ ] **Step 1: Add failing Windows adapter tests**

```python
result = adapter.run("read", ["https://example.test/page"], timeout_seconds=2)
self.assertEqual(result.command, "read")
self.assertNotIn("C:\\C:\\", result.process_args)

with self.assertRaises(OnlyCliCommandError):
    adapter.run("submit", ["https://example.test"])
```

Cover the supported commands `open`, `do`, `find`, `read`, `next`, `raw`, site verbs, `login`, and `logout`; unsupported commands; timeout; stdout cap; stderr redaction; missing binary; and challenge/login classification.

- [ ] **Step 2: Run the focused tests and verify the missing adapter**

Run: `python -m unittest tests.test_only_cli -v`

Expected: FAIL because `OnlyCliAdapter` is missing.

- [ ] **Step 3: Pin only-cli and implement the adapter**

Add `@only-cli/oc` as a Git-revision-pinned production dependency. Resolve its bin entry during development and from packaged resources in production.

```python
SUPPORTED_COMMANDS = frozenset({
    "open", "do", "find", "read", "next", "raw", "login", "logout", "site",
})

def run(self, command: str, args: Sequence[str], *, timeout_seconds: float = 30.0) -> OnlyCliResult:
    if command not in SUPPORTED_COMMANDS:
        raise OnlyCliCommandError("unsupported only-cli command")
```

Use `shell=False`, a fixed executable and script path, a controlled environment, and application-owned session storage. Do not copy credentials from external browser profiles.

- [ ] **Step 4: Run only-cli upstream, adapter, build, and audit checks**

Run:

```powershell
npm --prefix $env:TEMP\expedient-employment-upstreams-20260825\only-cli-oc test
python -m unittest tests.test_only_cli -v
npm --prefix gui run build
npm --prefix gui audit --omit=dev
```

Expected: adapter and build pass. Upstream Windows-only failures must either be fixed by the pinned revision or documented with adapter coverage proving the shipped path. Production audit must report no unresolved high or critical issue.

- [ ] **Step 5: Commit**

```powershell
git add job_pipeline/integrations/only_cli.py tests/test_only_cli.py gui/package.json gui/package-lock.json gui/electron-builder.yml THIRD_PARTY_NOTICES.md docs/PROVENANCE.md
git commit -m "feat: expose only-cli to agent tools"
```

### Task 3: Build the Original MIT Web Intelligence Package

**Files:**
- Create: `job_pipeline/web_intelligence.py`
- Create: `tests/test_web_intelligence.py`
- Modify: `job_pipeline/access_policy.py`
- Modify: `job_pipeline/storage.py`

**Interfaces:**
- Produces: `SafeUrlPolicy`, `WebDocument`, `WebCache`, `WebIntelligence.fetch`, `WebIntelligence.extract`, `WebIntelligence.links`, and `WebIntelligence.crawl`
- Consumes: injected HTTP transport for tests, access policy, SQLite cache, and broker context

- [ ] **Step 1: Write failing trust-boundary tests**

Cover loopback and link-local rejection, userinfo rejection, redirect revalidation, DNS pin mismatch, content-length and streamed-byte caps, MIME validation, bounded crawl depth and pages, cache freshness, robots signal, challenge classification, and safe extraction.

- [ ] **Step 2: Run the focused tests and confirm the missing package**

Run: `python -m unittest tests.test_web_intelligence -v`

Expected: FAIL because `job_pipeline.web_intelligence` is missing.

- [ ] **Step 3: Implement the original package**

```python
@dataclass(frozen=True)
class FetchLimits:
    max_bytes: int = 2_000_000
    timeout_seconds: float = 20.0
    max_redirects: int = 5
    max_pages: int = 20
    max_depth: int = 2

class WebIntelligence:
    def fetch(self, url: str, *, freshness_seconds: int = 0) -> WebDocument: ...
    def extract(self, document: WebDocument, fields: Mapping[str, str]) -> dict[str, str]: ...
    def crawl(self, start_url: str, *, same_site: bool = True) -> list[WebDocument]: ...
```

Implement with Python standard-library networking and HTML parsing. Do not add plugin loading, model downloads, or arbitrary child processes.

- [ ] **Step 4: Run focused and full suites**

Run:

```powershell
python -m unittest tests.test_web_intelligence -v
python -m unittest discover -s tests -v
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```powershell
git add job_pipeline/web_intelligence.py job_pipeline/access_policy.py job_pipeline/storage.py tests/test_web_intelligence.py
git commit -m "feat: add MIT web intelligence tools"
```

### Task 4: Build the Original MIT Workflow Runtime

**Files:**
- Create: `job_pipeline/web_workflows.py`
- Create: `tests/test_web_workflows.py`
- Modify: `job_pipeline/storage.py`
- Modify: `job_pipeline/tool_broker.py`

**Interfaces:**
- Produces: `WorkflowDefinition`, `WorkflowStep`, `WorkflowValidator`, `WorkflowRunner.run`, `WorkflowRunner.resume`, and broker names under `workflow.*`
- Consumes: registered broker tools and durable run state

- [ ] **Step 1: Write failing workflow tests**

Cover schema versioning, unknown tool rejection, read-only dry run, variable interpolation without code execution, cancellation, retry bounds, resume from the last idempotent step, circuit breaker, dataset output, and exact approval for external actions.

- [ ] **Step 2: Run the tests and confirm missing behavior**

Run: `python -m unittest tests.test_web_workflows -v`

Expected: FAIL because the workflow module is missing.

- [ ] **Step 3: Implement the typed workflow runtime**

```python
@dataclass(frozen=True)
class WorkflowStep:
    id: str
    tool: str
    arguments: dict[str, Any]
    save_as: str | None = None
    retry_count: int = 0

@dataclass(frozen=True)
class WorkflowDefinition:
    version: int
    name: str
    steps: tuple[WorkflowStep, ...]
```

Interpolation may read prior structured results using a restricted `${result.field}` grammar. It must never evaluate Python or JavaScript.

- [ ] **Step 4: Run workflow, broker, and full suites**

Run:

```powershell
python -m unittest tests.test_web_workflows tests.test_tool_broker -v
python -m unittest discover -s tests -v
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```powershell
git add job_pipeline/web_workflows.py job_pipeline/storage.py job_pipeline/tool_broker.py tests/test_web_workflows.py
git commit -m "feat: add MIT browser workflow runtime"
```
