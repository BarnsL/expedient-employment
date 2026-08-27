"""Static safety checks for the Windows scheduler wake installer."""

from __future__ import annotations

import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent


class SchedulerCliTests(unittest.TestCase):
    def test_installer_is_hidden_per_user_and_contains_no_credentials(self) -> None:
        script = (ROOT / "scripts" / "install-scheduler.ps1").read_text(encoding="utf-8")
        self.assertIn("-Hidden", script)
        self.assertIn("-RunLevel Limited", script)
        self.assertIn("-MultipleInstances IgnoreNew", script)
        self.assertIn("job_pipeline.scheduler_cli", script)
        self.assertNotIn("EXPEDIENT_CONTROL_TOKEN", script)
        self.assertNotIn("password", script.casefold())


if __name__ == "__main__":
    unittest.main()
