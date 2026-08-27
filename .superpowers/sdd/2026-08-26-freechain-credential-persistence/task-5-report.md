# Task 5 Report: Delivered Behavior Documentation

Date: 2026-08-26

## Status

Task 5 documentation is complete in the assigned worktree. The four required public documents now describe the delivered FreeChain contract, credential lifecycle, readiness states, chat root cause, verification boundary, and constrained automation policy without including credential material or local user data.

## Updated documents

- `docs/ASSISTANT.md` documents the installed provider contract, ordered import, protected persistence, clear and re-import behavior, shared-account warning, readiness recovery, root cause, and Task 6 live-verification boundary.
- `docs/SECURITY.md` documents the current-user protection boundary, ciphertext-only persistence, owned-child plaintext boundary, fail-closed clear behavior, and policy-constrained browser automation.
- `docs/RELEASE-2.0.0.md` records the delivered credential and chat-recovery behavior while keeping the live two-launch acceptance result pending.
- `README.md` adds an installed FreeChain assistant overview with the safe configuration, lifecycle, readiness, and recovery facts.

## Evidence reviewed

- Task 2 confirms ordered first-run import, protected storage, bounded status, truthful clear behavior, and restart of only the owned control service.
- Task 3 confirms the installed endpoint, bearer credential contract, sanitized owned-child environment, authenticated model probe, safe readiness fields, real model count, and safe provider failures.
- Task 4 confirms the renderer shows only safe credential status, requires clear confirmation, refreshes readiness and real models after mutation, removes the fake model fallback, and keeps model-dependent actions disabled while unavailable.
- Current implementation review confirmed the documented endpoint, import precedence, protected storage, clear result handling, owned-control-service restart, and readiness state mapping.

## Verification boundary

Committed reports record passing unit, React, Electron, lint, and production-build checks. These checks use synthetic or mocked credential contracts and do not access a real local credential. Installed two-launch chat recovery, including live credential mutation, remains pending Task 6 and is not claimed as completed.

## Documentation verification

- Reviewed every required statement against the current implementation and Task 2 through Task 4 reports.
- Confirmed the documentation preserves source provenance and MIT claims.
- Confirmed the browser policy states challenge detection, throttling, cooldown and site-policy compliance, visible handoff, and the prohibited anti-bot evasions.
- Confirmed this report and the four requested documents contain no credential values, ciphertext, raw email address, private user-data location, or em dash.

## Concerns and follow-up

The documentation intentionally does not claim installed two-launch chat recovery. Task 6 must perform and record that live acceptance check without exposing credential material.
