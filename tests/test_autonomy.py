"""Standing autonomy policy: bounded grants, bound receipts and honest outcomes."""

from __future__ import annotations

import json
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path

from job_pipeline import autonomy
from job_pipeline.integrations.browser_use_runner import BrowserUseError, BrowserUseRunner


class AutonomyPolicyTests(unittest.TestCase):
    def setUp(self) -> None:
        self.folder = tempfile.TemporaryDirectory()
        self.root = Path(self.folder.name)
        self.policy_path = self.root / "autonomy_policy.json"
        self.ledger = self.root / "ledger.jsonl"

    def tearDown(self) -> None:
        self.folder.cleanup()

    def enable(self, **overrides):
        values = {"granted_by": "Owner", "days": 30, "daily_cap": 2, "min_score": 70}
        values.update(overrides)
        return autonomy.enable_policy(self.policy_path, **values)

    def packet(self, unresolved=()):
        resume = self.root / "resume.docx"
        resume.write_bytes(b"fixture")
        path = self.root / "packet.json"
        path.write_text(json.dumps({
            "job": {"id": "job12345", "url": "https://jobs.example.com/apply/1", "title": "Analyst"},
            "candidate": {"resume_path": str(resume)},
            "unresolved_questions": list(unresolved),
        }), encoding="utf-8")
        return BrowserUseRunner(path)

    def test_off_by_default_and_bounded_grants(self) -> None:
        with self.assertRaisesRegex(autonomy.AutonomyError, "off"):
            autonomy.load_policy(self.policy_path)
        for bad in ({"days": 91}, {"days": 0}, {"daily_cap": 26}, {"daily_cap": 0},
                    {"min_score": 101}, {"granted_by": ""}, {"allowed_hosts": ["bad host"]}):
            with self.assertRaises(autonomy.AutonomyError, msg=str(bad)):
                self.enable(**bad)

    def test_expired_and_disabled_policies_stop_work(self) -> None:
        self.enable(days=1)
        later = datetime.now(timezone.utc) + timedelta(days=2)
        with self.assertRaisesRegex(autonomy.AutonomyError, "expired"):
            autonomy.load_policy(self.policy_path, now=later)
        autonomy.disable_policy(self.policy_path)
        with self.assertRaisesRegex(autonomy.AutonomyError, "disabled"):
            autonomy.load_policy(self.policy_path)

    def test_blockers_never_allow_unresolved_answers_low_scores_or_other_hosts(self) -> None:
        policy = self.enable(allowed_hosts=["jobs.example.com"])
        self.assertEqual(
            autonomy.blockers(policy, host="jobs.example.com", score=80, unresolved=[], ledger=self.ledger), []
        )
        reasons = autonomy.blockers(
            policy, host="other.example.com", score=50, unresolved=["salary"], ledger=self.ledger
        )
        self.assertEqual(len(reasons), 3)

    def test_daily_cap_counts_attempts_but_not_skips(self) -> None:
        policy = self.enable()
        autonomy.record_attempt(self.ledger, job_id="a", outcome="skipped")
        autonomy.record_attempt(self.ledger, job_id="b", outcome="unconfirmed")
        autonomy.record_attempt(self.ledger, job_id="c", outcome="submitted")
        reasons = autonomy.blockers(policy, host="x.example", score=90, unresolved=[], ledger=self.ledger)
        self.assertTrue(any("Daily cap" in reason for reason in reasons))

    def test_receipt_is_bound_to_packet_and_current_policy(self) -> None:
        policy = self.enable()
        runner = self.packet()
        approval = self.root / "approval.json"
        autonomy.issue_receipt(
            policy, self.policy_path, job_id=runner.job_id, job_url=runner.job_url,
            packet_sha256=runner.digest, approval_path=approval,
        )
        runner.validate_execution(approval, "fill_and_submit")
        self.enable(daily_cap=3)
        with self.assertRaisesRegex(BrowserUseError, "current policy"):
            runner.validate_execution(approval, "fill_and_submit")
        autonomy.issue_receipt(
            autonomy.load_policy(self.policy_path), self.policy_path, job_id=runner.job_id,
            job_url=runner.job_url, packet_sha256=runner.digest, approval_path=approval,
        )
        autonomy.disable_policy(self.policy_path)
        with self.assertRaisesRegex(BrowserUseError, "disabled"):
            runner.validate_execution(approval, "fill_and_submit")

    def test_unresolved_packet_cannot_submit_even_with_receipt(self) -> None:
        policy = self.enable()
        runner = self.packet(unresolved=["contact.phone"])
        approval = self.root / "approval.json"
        autonomy.issue_receipt(
            policy, self.policy_path, job_id=runner.job_id, job_url=runner.job_url,
            packet_sha256=runner.digest, approval_path=approval,
        )
        with self.assertRaisesRegex(BrowserUseError, "unresolved"):
            runner.validate_execution(approval, "fill_and_submit")

    def test_only_an_explicit_confirmation_counts_as_submitted(self) -> None:
        self.assertTrue(autonomy.confirmed("Done.\nSUBMISSION_CONFIRMED: yes"))
        self.assertFalse(autonomy.confirmed("SUBMISSION_CONFIRMED: no"))
        self.assertFalse(autonomy.confirmed("I think it was submitted"))
        self.assertFalse(autonomy.confirmed("SUBMISSION_CONFIRMED: yes\nSUBMISSION_CONFIRMED: no"))
        self.assertFalse(autonomy.confirmed(None))


if __name__ == "__main__":
    unittest.main()
