# Security, Release, and Verification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden, document, package, install, and visibly verify the complete MIT Expedient Employment application.

**Architecture:** Security controls live at URL, process, IPC, attachment, approval, and persistence trust boundaries. Verification covers source, dependencies, packaged artifacts, installed shortcuts, scheduled execution, assistant tool use, and the user-visible Electron runtime.

**Tech Stack:** Python, Node.js, Electron Builder, Windows PowerShell, pip-audit or equivalent, npm audit, static scanners, Understand Anything

## Global Constraints

- Do not print or retain discovered secrets, contact details, message bodies, page bodies, or candidate packet content in audit artifacts.
- Audit the exact shipped dependency and artifact scope, not only source manifests.
- Do not call the app complete until the installed runtime, assistant, only-cli tool call, scheduler, and Control Anything surface are visibly verified.
- Any residual high or critical finding blocks packaging unless the affected component is removed from the shipped scope.

---

### Task 1: Harden Electron, URLs, Attachments, and Auditing

**Files:**
- Modify: `gui/electron/main.cjs`
- Modify: `gui/electron/preload.cjs`
- Modify: `gui/electron/safety.cjs`
- Modify: `gui/electron/safety.test.cjs`
- Modify: `job_pipeline/access_policy.py`
- Modify: `job_pipeline/assistant.py`
- Modify: `job_pipeline/service.py`
- Modify: `job_pipeline/storage.py`
- Create: `tests/test_security_boundaries.py`

**Interfaces:**
- Produces: exact navigation allowlist, redirect revalidation, attachment validation, redacted audit summaries, origin checks, and approval invalidation

- [ ] **Step 1: Write failing exploit-regression tests**

Cover traversal, malformed drive paths, UNC paths, shell metacharacters, unsafe protocols, private redirect, DNS mismatch, oversized or binary attachment, misleading MIME, origin mismatch, forged approval digest, prompt text that requests authorization, and audit secret redaction.

- [ ] **Step 2: Run focused security tests**

Run:

```powershell
python -m unittest tests.test_security_boundaries -v
node --test gui/electron/safety.test.cjs
```

Expected: new exploit regressions fail before production changes.

- [ ] **Step 3: Apply minimal boundary fixes**

Centralize each check once at its trust boundary. Electron windows use `contextIsolation: true`, `nodeIntegration: false`, sandboxing where compatible, a restrictive Content Security Policy, denied unexpected navigation, and no arbitrary IPC channel.

- [ ] **Step 4: Run focused and full suites**

Run:

```powershell
python -m unittest tests.test_security_boundaries -v
node --test gui/electron/*.test.cjs
python -m unittest discover -s tests -v
npm --prefix gui run build
```

Expected: all commands pass.

- [ ] **Step 5: Commit**

```powershell
git add gui/electron job_pipeline tests/test_security_boundaries.py
git commit -m "security: harden automation trust boundaries"
```

### Task 2: Complete Provenance, Product, and Security Documentation

**Files:**
- Create: `docs/SECURITY.md`
- Create: `docs/PROVENANCE.md`
- Modify: `README.md`
- Modify: `FEATURES.md`
- Modify: `ISSUES.md`
- Modify: `docs/APP_REFERENCE.md`
- Modify: `THIRD_PARTY_NOTICES.md`
- Modify: source files at non-obvious trust boundaries

**Interfaces:**
- Produces: exact feature matrix, operator guide, threat model, source ledger, audit instructions, and residual limitations

- [ ] **Step 1: Generate factual inventories from the implemented code**

Run:

```powershell
rg --files job_pipeline gui scripts tests
python -m job_pipeline --help
npm --prefix gui ls --all
```

Use output as evidence. Do not add capabilities that are not implemented and tested.

- [ ] **Step 2: Write the documentation and source annotations**

`docs/PROVENANCE.md` records repository URL, immutable revision, license, imported file, local destination, and whether the item was copied, adapted, or independently implemented. `docs/SECURITY.md` records assets, threats, controls, audit commands, and residual risk.

- [ ] **Step 3: Verify documentation against code and scan for prohibited content**

Run:

```powershell
rg -n "Wigolo|Maxun|only-cli|approval|schedule|attachment|tool" README.md FEATURES.md docs THIRD_PARTY_NOTICES.md
rg -n -i "placeholder text|unfinished section|documentation pending" README.md FEATURES.md ISSUES.md docs THIRD_PARTY_NOTICES.md
```

Expected: every implemented subsystem is documented, no placeholder language appears, and no AGPL component is listed as shipped code.

- [ ] **Step 4: Run tests and documentation-linked commands**

Every command shown in the quick start and verification sections must run successfully in the current checkout.

- [ ] **Step 5: Commit**

```powershell
git add README.md FEATURES.md ISSUES.md docs THIRD_PARTY_NOTICES.md job_pipeline gui
git commit -m "docs: document assistant automation and security"
```

### Task 3: Run Source, Dependency, License, and Packaged-Artifact Audits

**Files:**
- Create: `docs/audits/2026-08-25-security-audit.md`
- Create: `docs/audits/2026-08-25-license-inventory.json`
- Modify: manifests or code only when a finding requires remediation

**Interfaces:**
- Produces: sanitized commands, counts, classifications, fixes, and residual limitations for the exact release candidate

- [ ] **Step 1: Run dependency and license inventories**

Run production Python and Node audits, `npm ls --all`, package-license inventory, and only-cli dependency review. Record package names, versions, licenses, and advisory identifiers without secrets.

- [ ] **Step 2: Run static security and secret scans**

Scan Python, Electron, React, PowerShell, configuration, Git-tracked files, and the exact outgoing Git diff. Treat fixtures and public provider identifiers as context-sensitive findings rather than automatic leaks.

- [ ] **Step 3: Remediate findings with regression tests**

For every code finding, add a failing regression test, confirm it fails, apply the narrow fix, and rerun the focused scanner or test.

- [ ] **Step 4: Re-run the full audit suite**

Expected: no unresolved high or critical production vulnerability, no incompatible shipped license, no secret in the current tree, and all residual lower-severity items explicitly documented.

- [ ] **Step 5: Commit**

```powershell
git add docs/audits manifests lockfiles tests job_pipeline gui
git commit -m "security: record release candidate audits"
```

### Task 4: Package, Install, and Verify the Windows Application

**Files:**
- Modify: `gui/electron-builder.yml`
- Modify: `packaging/build-windows.ps1`
- Modify: `installer/windows.iss`
- Modify: runtime code only for defects reproduced during package verification

**Interfaces:**
- Produces: Windows installer, installed application, Start Menu shortcut, packaged Python service, only-cli runtime, and owned scheduler entry point

- [ ] **Step 1: Build the release candidate**

Run the Python package build, React production build, Electron tests, and Windows packaging script. Confirm the package contains the Python modules, only-cli entry and dependencies, licenses, icons, and no development secrets or caches.

- [ ] **Step 2: Scan the packaged artifact before execution**

Run available antivirus and archive-level scans over the installer and unpacked application. Record hashes and scanner versions in the audit document.

- [ ] **Step 3: Install per-user and verify delivery**

Confirm the installed executable, application icon, uninstall entry, and Start Menu shortcut. Launch minimized for the first health check and verify only owned child processes start.

- [ ] **Step 4: Run the installed end-to-end acceptance scenario**

From a fresh application launch:

1. Open the Assistant surface.
2. Refresh providers and models.
3. Queue two messages and cancel a third.
4. Attach a local test image and verify its digest and thumbnail.
5. Invoke `web.only_cli.read` against an approved local fixture.
6. Invoke one original web intelligence extraction tool.
7. Run one workflow dry run.
8. Create and execute one due read-only schedule.
9. Prepare one application draft and confirm submission remains blocked without exact approval.
10. Inspect the sanitized tool and schedule audit history.

- [ ] **Step 5: Commit packaging fixes**

```powershell
git add gui packaging installer tests docs/audits
git commit -m "build: verify installed Windows release"
```

### Task 5: Finish UI Review and Refresh Control Anything

**Files:**
- Modify: UI files only for finish-review findings
- Create or update: `DESIGN.md`
- Update: `.ua/knowledge-graph.json`
- Update: `.ua/fingerprints.json`
- Update: `.ua/meta.json`

**Interfaces:**
- Produces: final UI verdict, durable design system record, fresh architecture graph, and open user review surfaces

- [ ] **Step 1: Capture desktop and narrow-window screenshots**

Capture the Dashboard, Assistant, Automations, Web Workbench, Applications, and approval state in one bounded inspection round.

- [ ] **Step 2: Run the Impeccable finish reviewer and apply one fix batch**

Provide the approved screenshot reference, original request, product record, changed targets, screenshots, and detector output. Apply material fixes, rebuild once, recapture the same viewports, and obtain a final verdict.

- [ ] **Step 3: Generate `DESIGN.md` from the shipped UI**

Run the Impeccable documenter after the final verdict so the file records the implemented world rather than an intention.

- [ ] **Step 4: Regenerate and validate Control Anything**

Run the full Understand Anything workflow against the final commit, validate zero structural issues, start the token-protected dashboard, and inspect it for browser console errors.

- [ ] **Step 5: Open both final review surfaces**

Keep the installed Expedient Employment application and the final Control Anything dashboard visible for the user. Report exact test totals, audit disposition, package path, installed shortcut, remaining limitations, and unpushed commits.
