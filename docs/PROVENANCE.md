# Source Provenance

This ledger records source incorporated into Expedient Employment and the
license boundary used for each integration. It is maintained beside the code
so a release reviewer can trace a feature to its reviewed source revision.

## Expedient Employment baseline

- Repository: <https://github.com/BarnsL/expedient-employment>
- Baseline revision: `ec58e50`
- License: MIT
- Role: canonical repository, security policy, packaging, Electron control
  center, Paperclip agents, and existing provider integrations.

## AI Job Search Pipeline

- Repository: <https://github.com/adeluna1/ai-job-search-pipeline>
- Reviewed revision: `3962e0a0ecbaad4c6ab618b0113be1a2611073f4`
- License: MIT
- Integration method: test-first source port into the canonical Expedient
  history, followed by local security reconciliation.

Imported Python domain modules:

- `job_pipeline/application_dashboard.py`
- `job_pipeline/candidate_triage.py`
- `job_pipeline/geography.py`
- `job_pipeline/handoff.py`
- `job_pipeline/job_exclusions.py`
- `job_pipeline/lifecycle.py`
- `job_pipeline/posting_intelligence.py`
- `job_pipeline/role_scope.py`
- `job_pipeline/tailoring.py`

Reconciled Python and launcher modules:

- `job_pipeline/agents.py`
- `job_pipeline/application_history.py`
- `job_pipeline/cli.py`
- `job_pipeline/discovery_fallback.py`
- `job_pipeline/integrations/agent_web_browser.py`
- `job_pipeline/integrations/browser_use_runner.py`
- `job_pipeline/integrations/jobspy_source.py`
- `job_pipeline/jobs.py`
- `job_pipeline/report.py`
- `job_pipeline/storage.py`
- `job_pipeline/util.py`
- `job_pipeline/webclaw.py`
- `scripts/agent-run.cmd`
- `scripts/agent-run.ps1`

Imported regression suites:

- `tests/test_application_dashboard.py`
- `tests/test_application_outcomes.py`
- Upstream behavior cases reconciled into `tests/test_pipeline.py`

The Expedient access guard remains authoritative after the port. Board
timeouts from the upstream project and the local HTTP and human-check
classification are both covered by regression tests.

## Restricted-license references

No source, tests, assets, prompts, schemas, or implementation structure from
Wigolo or Maxun is incorporated. Their desired user-facing capabilities are
implemented as original Expedient modules from the public product-level
requirements recorded in the feature-fusion design specification.
