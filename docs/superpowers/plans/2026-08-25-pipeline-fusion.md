# Pipeline Fusion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port every nonconflicting Adeluna pipeline feature into the current Expedient Employment Python core and application lifecycle UI.

**Architecture:** Keep Expedient Employment as the canonical history, copy MIT modules only after their tests fail against the current tree, and reconcile overlapping files at existing domain boundaries. SQLite remains the system of record and external application actions remain bound to exact approvals.

**Tech Stack:** Python 3.10+, standard-library `unittest`, `sqlite3`, Electron, React 19, TypeScript 5.9

## Global Constraints

- Preserve the current CLI, Paperclip roles, provider adapters, and packaging behavior.
- Preserve MIT notices and record each imported Adeluna file in `docs/PROVENANCE.md`.
- Never copy Wigolo or Maxun implementation material in this plan.
- Never weaken freshness, verification, approval, or unresolved-field gates to satisfy a test.
- Each production change begins with a focused failing test and ends with the relevant full suite.

---

### Task 1: Make the Existing Baseline Deterministic

**Files:**
- Modify: `tests/test_pipeline.py`
- Test: `tests/test_pipeline.py`

**Interfaces:**
- Consumes: `MatchAnalystAgent.analyze(..., now: datetime | None)`
- Produces: a fixed `self.analysis_now` shared by time-sensitive test calls

- [ ] **Step 1: Change one failing test to pass an explicit clock**

```python
self.analysis_now = datetime(2026, 7, 28, 12, 0, tzinfo=timezone.utc)

analysis = MatchAnalystAgent().analyze(
    job,
    match,
    finding,
    threshold=72,
    fresh_days=30,
    resume_matcher={"overall_score": 45, "missing_keywords": ["Workday"]},
    now=self.analysis_now,
)
```

- [ ] **Step 2: Run the focused test and confirm the old call fails before the test edit**

Run: `python -m unittest tests.test_pipeline.PipelineTests.test_low_resume_matcher_preview_routes_agent_b_to_review -v`

Expected before the edit: FAIL because the fixture date is older than 30 days relative to the machine clock.

- [ ] **Step 3: Apply the fixed clock to all three affected analyses**

Pass `now=self.analysis_now` to the low ATS preview, Resume Matcher outage, and three-specialist contract tests. Do not change `MatchAnalystAgent` freshness behavior.

- [ ] **Step 4: Run the full current suite**

Run: `python -m unittest discover -s tests -v`

Expected: 26 tests pass with zero failures.

- [ ] **Step 5: Commit**

```powershell
git add tests/test_pipeline.py
git commit -m "test: pin pipeline freshness clock"
```

### Task 2: Port the Adeluna Domain Modules Test First

**Files:**
- Create: `job_pipeline/application_dashboard.py`
- Create: `job_pipeline/candidate_triage.py`
- Create: `job_pipeline/geography.py`
- Create: `job_pipeline/handoff.py`
- Create: `job_pipeline/job_exclusions.py`
- Create: `job_pipeline/lifecycle.py`
- Create: `job_pipeline/posting_intelligence.py`
- Create: `job_pipeline/role_scope.py`
- Create: `job_pipeline/tailoring.py`
- Create: `tests/test_application_dashboard.py`
- Create: `tests/test_application_outcomes.py`
- Modify: `tests/test_pipeline.py`

**Interfaces:**
- Produces: `partition_by_geography`, `partition_by_role_scope`, `partition_excluded_jobs`, `triage_candidates`, `deduplicate_candidates`, `build_agent_c_handoff`, `validate_agent_c_handoff`, `validate_transition`, `collect_application_records`, `application_summary`, `assess_posting_trust`, `enrich_jobs_with_posting_intelligence`, and `build_tailoring_plan`
- Consumes: current `Job`, `MatchResult`, normalization utilities, and current application records

- [ ] **Step 1: Copy the MIT upstream tests without production modules**

Copy the two focused upstream test files and merge the upstream test methods for geography, role scope, triage, handoffs, exclusions, posting intelligence, and tailoring into `tests/test_pipeline.py`. Preserve upstream copyright and provenance.

- [ ] **Step 2: Run the copied tests and verify import failures**

Run: `python -m unittest tests.test_application_dashboard tests.test_application_outcomes tests.test_pipeline -v`

Expected: FAIL with missing `job_pipeline` modules or missing exported functions.

- [ ] **Step 3: Copy and reconcile the nine MIT modules**

Use the reviewed Adeluna revision recorded in `docs/PROVENANCE.md`. Keep each module's public signatures unchanged so the upstream tests remain meaningful. Replace any project-root assumptions with current `JobStore` and utility interfaces only where required.

- [ ] **Step 4: Run the focused ported suite**

Run: `python -m unittest tests.test_application_dashboard tests.test_application_outcomes tests.test_pipeline -v`

Expected: all focused and current tests pass.

- [ ] **Step 5: Commit**

```powershell
git add job_pipeline tests
git commit -m "feat: port MIT pipeline domain features"
```

### Task 3: Reconcile Shared Pipeline Files and Persistence

**Files:**
- Modify: `job_pipeline/agents.py`
- Modify: `job_pipeline/application_history.py`
- Modify: `job_pipeline/cli.py`
- Modify: `job_pipeline/discovery_fallback.py`
- Modify: `job_pipeline/integrations/agent_web_browser.py`
- Modify: `job_pipeline/integrations/jobspy_source.py`
- Modify: `job_pipeline/jobs.py`
- Modify: `job_pipeline/report.py`
- Modify: `job_pipeline/storage.py`
- Modify: `job_pipeline/util.py`
- Modify: `tests/test_pipeline.py`

**Interfaces:**
- Produces: current-run isolation, atomic JSON writes, failure categories, bounded discovery caps, direct ATS discovery, lifecycle persistence, outcome updates, and candidate audit exports
- Preserves: existing `DiscoveryProvider`, `BrowserUseRunner`, `JobStore`, CLI commands, and provider-specific access policy

- [ ] **Step 1: Add the upstream regression methods before shared-file changes**

Port tests that cover run isolation, provider timeout behavior, board caching, direct ATS discovery, deduplication, liveness classification, application outcome synchronization, and candidate audit output.

- [ ] **Step 2: Run the expanded suite and record the exact failing behaviors**

Run: `python -m unittest discover -s tests -v`

Expected: the new tests fail because current shared files do not expose the upstream behavior.

- [ ] **Step 3: Reconcile shared files one responsibility at a time**

Keep existing integrations and add the upstream behavior behind these stable boundaries:

```python
def write_json_atomic(path: Path, value: Any) -> None: ...
def classify_resolution_failure(message: str) -> tuple[str, str]: ...
def direct_ats_discovery(client, company_domains, *, max_results: int) -> tuple[list[Job], dict[str, Any]]: ...
def update_application_outcome(self, job_id: str, status: str, *, note: str = "") -> dict[str, Any]: ...
```

Do not replace current browser authentication, Resume Matcher evidence handling, or exact packet approval.

- [ ] **Step 4: Run the full Python suite and CLI smoke tests**

Run:

```powershell
python -m unittest discover -s tests -v
python -m job_pipeline --help
python -m job_pipeline doctor
```

Expected: all tests pass and both CLI commands exit successfully.

- [ ] **Step 5: Commit**

```powershell
git add job_pipeline tests
git commit -m "feat: reconcile pipeline orchestration and lifecycle"
```

### Task 4: Add the Application Lifecycle Surface

**Files:**
- Create: `gui/src/pages/Applications.tsx`
- Create: `gui/electron/safety.cjs`
- Create: `gui/electron/safety.test.cjs`
- Modify: `gui/src/App.tsx`
- Modify: `gui/src/lib/api.ts`
- Modify: `gui/electron/main.cjs`
- Modify: `gui/electron/preload.cjs`
- Modify: `gui/package.json`

**Interfaces:**
- Produces: `api.applicationsRead()`, `api.applicationOutcomeUpdate(input)`, and an Applications navigation item
- Consumes: application dashboard JSON emitted by the Python service or CLI

- [ ] **Step 1: Port the upstream Electron safety test and add IPC contract tests**

The tests must assert that config names, status values, job identifiers, and output text are bounded before they reach filesystem or process boundaries.

- [ ] **Step 2: Run the Node tests and verify missing exports**

Run: `node --test gui/electron/*.test.cjs`

Expected: FAIL because `safety.cjs` and application IPC handlers are absent.

- [ ] **Step 3: Implement the minimal lifecycle bridge and page**

```typescript
export interface ApplicationRecord {
  jobId: string;
  company: string;
  title: string;
  status: string;
  updatedAt: string;
  needsReview: boolean;
}

applicationOutcomeUpdate(input: {
  jobId: string;
  status: string;
  note?: string;
}): Promise<{ ok: boolean; record?: ApplicationRecord; error?: string }>;
```

The page must support status selection, review flags, undo, empty state, loading state, and bounded errors without exposing application packet contents.

- [ ] **Step 4: Run safety, build, and Python tests**

Run:

```powershell
node --test gui/electron/*.test.cjs
npm --prefix gui run build
python -m unittest discover -s tests -v
```

Expected: all commands pass.

- [ ] **Step 5: Commit**

```powershell
git add gui job_pipeline tests
git commit -m "feat: add application lifecycle workspace"
```
