"""Static safety checks for the Windows scheduler wake installer."""

from __future__ import annotations

import json
import subprocess
import tempfile
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

    def test_installer_registers_python_in_no_bytecode_mode(self) -> None:
        """Prevent scheduled wakes from writing caches into the installed payload."""
        with tempfile.TemporaryDirectory() as temp:
            fixture = Path(temp)
            project_root = fixture / "project"
            data_root = fixture / "data"
            module = project_root / "job_pipeline" / "scheduler_cli.py"
            module.parent.mkdir(parents=True)
            module.write_text("# scheduler fixture\n", encoding="utf-8")
            harness = fixture / "scheduler-harness.ps1"
            harness.write_text(
                """
param([string]$Installer, [string]$ProjectRoot, [string]$DataRoot)
function Get-Command {
    param([string]$Name, [Parameter(ValueFromRemainingArguments=$true)]$Rest)
    [pscustomobject]@{ Source = 'C:\\Python\\pythonw.exe' }
}
function New-ScheduledTaskAction {
    param([string]$Execute, [string]$Argument, [string]$WorkingDirectory)
    $global:Captured = [pscustomobject]@{
        Execute = $Execute
        Argument = $Argument
        WorkingDirectory = $WorkingDirectory
    }
    $global:Captured
}
function New-ScheduledTaskTrigger {
    param([switch]$Once, [datetime]$At, [timespan]$RepetitionInterval)
    [pscustomobject]@{}
}
function New-ScheduledTaskSettingsSet {
    param(
        [switch]$AllowStartIfOnBatteries,
        [switch]$DontStopIfGoingOnBatteries,
        [timespan]$ExecutionTimeLimit,
        [string]$MultipleInstances,
        [switch]$Hidden
    )
    [pscustomobject]@{}
}
function New-ScheduledTaskPrincipal {
    param([string]$UserId, [string]$LogonType, [string]$RunLevel)
    [pscustomobject]@{}
}
function Register-ScheduledTask {
    param(
        [string]$TaskName,
        [string]$Description,
        $Action,
        $Trigger,
        $Settings,
        $Principal,
        [switch]$Force
    )
}
& $Installer -Action Install -ProjectRoot $ProjectRoot -DataRoot $DataRoot
$global:Captured | ConvertTo-Json -Compress
""",
                encoding="utf-8",
            )
            completed = subprocess.run(
                [
                    "powershell",
                    "-NoProfile",
                    "-ExecutionPolicy",
                    "Bypass",
                    "-File",
                    str(harness),
                    "-Installer",
                    str(ROOT / "scripts" / "install-scheduler.ps1"),
                    "-ProjectRoot",
                    str(project_root),
                    "-DataRoot",
                    str(data_root),
                ],
                check=True,
                capture_output=True,
                text=True,
                encoding="utf-8",
            )
            captured = json.loads(completed.stdout.strip().splitlines()[-1])
            self.assertTrue(
                captured["Argument"].startswith("-B -m job_pipeline.scheduler_cli "),
                captured["Argument"],
            )


if __name__ == "__main__":
    unittest.main()
