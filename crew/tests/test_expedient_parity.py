"""Use disposable stores; never read or change owner state."""
import json
import sys
import tempfile
import unittest
from dataclasses import replace
from datetime import datetime, timedelta, timezone
from pathlib import Path
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[2]
sys.path[:0] = [str(ROOT), str(ROOT / "crew"), str(ROOT / "crew/expedient-employment/backend")]
import runtime
from job_pipeline.application_history import record_applied_entries
from job_pipeline.cli import ingest_urls
from job_pipeline.jobs import Job
from job_pipeline.storage import JobStore
from job_pipeline.matching import score_job


class Parity(unittest.TestCase):
    def test_packaged_web_tools_find_code_outside_data_workspace(self):
        from job_pipeline.integrations import only_cli
        with tempfile.TemporaryDirectory() as folder:
            package = Path(folder)
            entry = package / 'only-cli-runtime/node_modules/@only-cli/oc/src/cli.js'
            entry.parent.mkdir(parents=True)
            entry.write_text('// disposable entry')
            with patch.object(only_cli, '__file__', str(package / 'job_pipeline/integrations/only_cli.py')), patch.dict('os.environ', {'ONLY_CLI_ENTRY': ''}):
                self.assertEqual(only_cli._resolve_entry(package / 'data/workspace', None), entry)

    def test_unknown_tenure_is_not_invented_by_ranking(self):
        profile = json.loads((ROOT / 'config/profile.json').read_text())
        profile['candidate']['years_experience_status'] = 'not_provided_numeric_placeholder'
        job = Job(id='unknown-tenure', url='https://example.com/job/1', title='Cloud Engineer', company='Example', location='Remote', work_mode='remote', employment_type='Full-Time', posted_date='', salary='', description='Responsibilities: operate cloud infrastructure. Qualifications: five years experience.')
        result = score_job(job, profile)
        self.assertEqual(result.fit_label, 'unassessed')
        self.assertTrue(any('not been confirmed' in gap for gap in result.gaps))

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.app = runtime.CrewRuntime(self.root)
        self.addCleanup(self.app.close)

    def test_autonomy_bridge_can_run_and_stop_but_never_grant(self):
        with self.assertRaises(ValueError):
            self.app.bridge("autonomyEnable", [])
        with self.assertRaises(ValueError):
            self.app.bridge("autonomyRun", [str(self.root / "missing.docx")])
        resume = self.root / "resume.docx"
        resume.write_bytes(b"fixture")
        with self.assertRaises(ValueError):
            self.app.bridge("autonomyRun", [str(resume), "yes"])
        status = self.app.bridge("autonomyStatus", [])
        self.assertIn("Autonomy is off", status["output"])
        refused = self.app.bridge("autonomyRun", [str(resume), True])
        self.assertNotEqual(refused["code"], 0)
        self.assertIn("Autonomy is off", refused["output"])

    def test_application_flag_and_undo(self):
        record_applied_entries(self.app.workspace / "data/applied_jobs.json", [{"company": "Example", "title": "Cloud Engineer"}])
        identity = self.app.applications()["applications"][0]["identity_key"]
        for operation, args, expected in [("applicationsFlag", [identity, "interview"], "interview"), ("applicationsUndo", [identity], "")]:
            result = self.app.bridge(operation, args)
            self.assertEqual(result["code"], 0, result["output"])
            self.assertEqual(self.app.applications()["applications"][0]["outcome_flag"], expected)

    def test_cancel_queued_run(self):
        self.app.runs["queued"] = {"id": "queued", "status": "running", "code": None, "output": "queued"}
        _, result = self.app.handle("DELETE", "/api/runs/queued", {})
        self.assertTrue(result.get("cancel_requested"))

    def test_invalid_config_preserves_previous_bytes(self):
        path = self.app.workspace / "config/profile.json"
        before = path.read_bytes()
        for weights in ({"a": float("nan")}, {"a": -1, "b": 2}):
            with self.assertRaises(ValueError):
                self.app.config("profile.json", json.dumps({"candidate": {"target_roles": []}, "scoring": {"weights": weights}}))
            self.assertEqual(path.read_bytes(), before)
        with self.assertRaises(ValueError):
            self.app.config("../profile.json")

    def test_search_age_reaches_pipeline(self):
        before = self.app.config("searches.json")
        with patch.object(runtime.threading, "Thread") as worker:
            self.app.start_search({"query": "Azure Engineer", "location": "Remote", "hoursOld": 48, "resultsWanted": 3})
        args = worker.call_args.kwargs["args"][1]
        self.assertIn("--hours-old", args)
        self.assertEqual(args[args.index("--hours-old") + 1], "48")
        self.assertEqual(self.app.config("searches.json"), before)

    def test_bridge_argument_validation(self):
        for operation, args in [("assistantMessages", []), ("configWrite", ["profile.json"]), ("jobsRead", ["extra"]), ("schedulesToggle", [1, "false"])]:
            with self.subTest(operation=operation), self.assertRaises(ValueError):
                self.app.bridge(operation, args)

    def test_assistant_and_schedule_persistence(self):
        chat = self.app.bridge("assistantCreate", [{"provider": "FreeChain", "model": "fixture", "title": "Review"}])
        message = self.app.bridge("assistantSend", [chat["id"], {"content": "Review jobs"}])
        self.app.bridge("assistantEdit", [message["id"], "Review remote jobs"])
        self.assertEqual(self.app.bridge("assistantQueue", [chat["id"]])[0]["content"], "Review remote jobs")
        self.app.bridge("assistantCancel", [message["id"]])
        self.assertEqual(self.app.bridge("assistantQueue", [chat["id"]]), [])
        workflow = {"name": "Review", "steps": [{"id": "read", "tool": "web.only_cli.read", "arguments": {"args": []}}]}
        schedule = self.app.bridge("schedulesCreate", [{"name": "Fixture", "workflow": workflow, "recurrence": {"kind": "interval", "interval_minutes": 60}, "enabled": False}])
        self.assertFalse(self.app.bridge("schedulesList", [])[0]["enabled"])
        self.assertEqual(self.app.handle("GET", "/api/v1/schedules", {})[1][0]["id"], schedule["id"])

    def test_age_filter_preserves_existing_jobs(self):
        now = datetime.now(timezone.utc)
        job = Job(id="recent-job", url="https://example.com/jobs/1", title="Cloud Engineer", company="Example", location="Remote", work_mode="remote", employment_type="Full-Time", posted_date=(now - timedelta(hours=2)).isoformat(), salary="", description="Responsibilities: operate Azure infrastructure. Qualifications: cloud experience.")
        old = replace(job, id="old-job", url="https://example.com/jobs/2", posted_date=(now - timedelta(days=90)).isoformat())
        unknown = replace(job, id="unknown-job", url="https://example.com/jobs/3", posted_date="")
        with JobStore(self.root / "fixture.sqlite3") as store:
            store.upsert_job(old)
            with patch("job_pipeline.cli._scrape_one", side_effect=[job, old, unknown]):
                jobs, errors = ingest_urls(store, None, [job.url, old.url, unknown.url], self.root, concurrency=1, hours_old=24)
            self.assertEqual([item.id for item in jobs], ["recent-job"])
            self.assertEqual(len(errors), 2)
            self.assertEqual({item.id for item in store.jobs()}, {"recent-job", "old-job"})


if __name__ == "__main__":
    unittest.main()
