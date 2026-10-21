"""Standing owner policy for unattended Agent C submission.

The owner enables autonomy once. Each job then gets a short receipt that binds
the policy digest to the exact packet bytes. A job with an unresolved answer is
skipped, never guessed. Every attempt is written to a ledger and counts against
the daily cap.
"""

from __future__ import annotations

import hashlib
import json
import re
from dataclasses import asdict, dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

from .util import read_json, utc_now, write_json

POLICY_SCHEMA_VERSION = 1
MAX_POLICY_DAYS = 90
MAX_DAILY_CAP = 25
RECEIPT_MINUTES = 60
POLICY_ACTOR_PREFIX = "autonomy_policy:"
CONFIRMATION = re.compile(r"SUBMISSION_CONFIRMED:\s*(yes|no)\b", re.IGNORECASE)
HOST = re.compile(r"^[a-z0-9.\-]{1,253}$")


class AutonomyError(RuntimeError):
    """Raised when the standing policy is missing, invalid or exceeded."""


@dataclass(frozen=True)
class AutonomyPolicy:
    """Owner grant for unattended fill_and_submit runs."""

    schema_version: int
    enabled: bool
    granted_by: str
    granted_at: str
    expires_at: str
    daily_cap: int
    min_score: float
    allowed_hosts: tuple[str, ...]

    def to_dict(self) -> dict[str, Any]:
        """Return JSON data in a stable field order."""
        data = asdict(self)
        data["allowed_hosts"] = list(self.allowed_hosts)
        return data

    @property
    def digest(self) -> str:
        """Bind receipts to the exact policy content."""
        canonical = json.dumps(self.to_dict(), sort_keys=True, separators=(",", ":"))
        return hashlib.sha256(canonical.encode("utf-8")).hexdigest()


def _time(value: str, field: str) -> datetime:
    try:
        parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except ValueError as exc:
        raise AutonomyError(f"Autonomy policy {field} is not a valid ISO time.") from exc
    return parsed if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)


def _hosts(values: Any) -> tuple[str, ...]:
    if not isinstance(values, (list, tuple)):
        raise AutonomyError("Autonomy policy allowed_hosts must be a list.")
    hosts = tuple(sorted({str(item).strip().casefold() for item in values if str(item).strip()}))
    for host in hosts:
        if not HOST.match(host) or ".." in host:
            raise AutonomyError(f"Autonomy policy host is not valid: {host}")
    return hosts


def _validated(data: dict[str, Any]) -> AutonomyPolicy:
    if data.get("schema_version") != POLICY_SCHEMA_VERSION:
        raise AutonomyError("Autonomy policy schema version is not supported.")
    granted_by = str(data.get("granted_by") or "").strip()
    if not granted_by or len(granted_by) > 120:
        raise AutonomyError("Autonomy policy must name the owner who granted it.")
    granted = _time(data.get("granted_at", ""), "granted_at")
    expires = _time(data.get("expires_at", ""), "expires_at")
    if expires <= granted or expires - granted > timedelta(days=MAX_POLICY_DAYS):
        raise AutonomyError(f"Autonomy policy must expire within {MAX_POLICY_DAYS} days of its grant.")
    cap = data.get("daily_cap")
    if type(cap) is not int or not 1 <= cap <= MAX_DAILY_CAP:
        raise AutonomyError(f"Autonomy daily_cap must be an integer from 1 to {MAX_DAILY_CAP}.")
    score = data.get("min_score")
    if type(score) not in (int, float) or not 0 <= float(score) <= 100:
        raise AutonomyError("Autonomy min_score must be a number from 0 to 100.")
    return AutonomyPolicy(
        schema_version=POLICY_SCHEMA_VERSION,
        enabled=data.get("enabled") is True,
        granted_by=granted_by,
        granted_at=granted.astimezone(timezone.utc).isoformat(),
        expires_at=expires.astimezone(timezone.utc).isoformat(),
        daily_cap=cap,
        min_score=float(score),
        allowed_hosts=_hosts(data.get("allowed_hosts", [])),
    )


def enable_policy(
    path: Path,
    *,
    granted_by: str,
    days: int,
    daily_cap: int,
    min_score: float,
    allowed_hosts: list[str] | tuple[str, ...] = (),
    now: datetime | None = None,
) -> AutonomyPolicy:
    """Write a validated owner grant. Old receipts become invalid."""
    if type(days) is not int or not 1 <= days <= MAX_POLICY_DAYS:
        raise AutonomyError(f"Autonomy days must be an integer from 1 to {MAX_POLICY_DAYS}.")
    granted = (now or datetime.now(timezone.utc)).astimezone(timezone.utc)
    policy = _validated({
        "schema_version": POLICY_SCHEMA_VERSION,
        "enabled": True,
        "granted_by": granted_by,
        "granted_at": granted.isoformat(),
        "expires_at": (granted + timedelta(days=days)).isoformat(),
        "daily_cap": daily_cap,
        "min_score": min_score,
        "allowed_hosts": list(allowed_hosts),
    })
    write_json(path, policy.to_dict())
    return policy


def disable_policy(path: Path) -> bool:
    """Turn autonomy off. Receipts issued under the old digest stop working."""
    if not path.exists():
        return False
    data = read_json(path)
    data["enabled"] = False
    write_json(path, data)
    return True


def load_policy(path: Path, *, now: datetime | None = None) -> AutonomyPolicy:
    """Return the active policy or raise a reason it cannot be used."""
    if not path.exists():
        raise AutonomyError("Autonomy is off. Run 'autonomy enable' once to allow unattended submission.")
    data = read_json(path)
    if not isinstance(data, dict):
        raise AutonomyError("Autonomy policy file is not a JSON object.")
    policy = _validated(data)
    if not policy.enabled:
        raise AutonomyError("Autonomy is disabled.")
    if _time(policy.expires_at, "expires_at") <= (now or datetime.now(timezone.utc)):
        raise AutonomyError("Autonomy policy has expired. Enable it again to continue.")
    return policy


def _ledger_rows(ledger: Path) -> list[dict[str, Any]]:
    if not ledger.exists():
        return []
    rows = []
    for line in ledger.read_text(encoding="utf-8").splitlines():
        try:
            row = json.loads(line)
        except ValueError:
            continue
        if isinstance(row, dict):
            rows.append(row)
    return rows


def attempts_today(ledger: Path, *, now: datetime | None = None) -> int:
    """Count attempts in the current UTC day, whatever their outcome."""
    day = (now or datetime.now(timezone.utc)).astimezone(timezone.utc).date().isoformat()
    return sum(
        1 for row in _ledger_rows(ledger)
        if str(row.get("at", "")).startswith(day) and row.get("outcome") != "skipped"
    )


def record_attempt(ledger: Path, **fields: Any) -> None:
    """Append one audit row. The ledger holds no contact data."""
    ledger.parent.mkdir(parents=True, exist_ok=True)
    row = {"at": utc_now(), **fields}
    with ledger.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(row, sort_keys=True) + "\n")


def blockers(
    policy: AutonomyPolicy,
    *,
    host: str,
    score: float,
    unresolved: list[str],
    ledger: Path,
    now: datetime | None = None,
) -> list[str]:
    """Return every reason this job must not be submitted without the owner."""
    reasons = []
    if unresolved:
        reasons.append("Unresolved answers: " + ", ".join(unresolved))
    if score < policy.min_score:
        reasons.append(f"Match score {score:g} is below the policy minimum {policy.min_score:g}.")
    if policy.allowed_hosts and host.casefold() not in policy.allowed_hosts:
        reasons.append(f"Host {host} is not in the policy allowed_hosts list.")
    if attempts_today(ledger, now=now) >= policy.daily_cap:
        reasons.append(f"Daily cap of {policy.daily_cap} attempts is reached.")
    return reasons


def issue_receipt(
    policy: AutonomyPolicy,
    policy_path: Path,
    *,
    job_id: str,
    job_url: str,
    packet_sha256: str,
    approval_path: Path,
    now: datetime | None = None,
) -> dict[str, Any]:
    """Write a short fill_and_submit receipt bound to the policy and packet."""
    issued = (now or datetime.now(timezone.utc)).astimezone(timezone.utc)
    receipt = {
        "schema_version": 1,
        "job_id": job_id,
        "job_url": job_url,
        "packet_sha256": packet_sha256,
        "decision": "approved",
        "allowed_action": "fill_and_submit",
        "approved_by": POLICY_ACTOR_PREFIX + policy.digest[:16],
        "approved_at": issued.isoformat(),
        "expires_at": (issued + timedelta(minutes=RECEIPT_MINUTES)).isoformat(),
        "policy_path": str(policy_path),
        "policy_sha256": policy.digest,
    }
    write_json(approval_path, receipt)
    return receipt


def verify_policy_receipt(receipt: dict[str, Any], *, now: datetime | None = None) -> None:
    """Reject a policy receipt after the owner changes or disables the policy."""
    if not str(receipt.get("approved_by", "")).startswith(POLICY_ACTOR_PREFIX):
        return
    policy = load_policy(Path(str(receipt.get("policy_path") or "")), now=now)
    if receipt.get("policy_sha256") != policy.digest:
        raise AutonomyError("Autonomy receipt does not match the current policy.")


def confirmed(final_result: Any) -> bool:
    """Accept only an explicit confirmation line from the browser agent."""
    matches = CONFIRMATION.findall(str(final_result or ""))
    return bool(matches) and matches[-1].casefold() == "yes"
