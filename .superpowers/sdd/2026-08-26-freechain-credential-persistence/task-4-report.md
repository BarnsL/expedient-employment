# Task 4 Report: Safe Assistant Credential Controls

Date: 2026-08-26

## Outcome

The Assistant now reflects the backend readiness contract without inventing a model or ready state. It exposes safe credential status, re-import, and confirmed clear controls while preserving the existing control-center layout and existing conversations.

## Changed files

- `gui/src/lib/api.ts`
  - Added `ProviderCredentialStatus` with only `configured`, `saved`, and `source`.
  - Added typed credential status, re-import, and clear methods to the preload API contract and exported wrapper.
  - Expanded `ProviderReadiness` with `reachable`, `authenticated`, and `model_count`.
  - Made browser fallbacks credential-free and removed the synthetic `auto` model fallback.
- `gui/src/pages/Assistant.tsx`
  - Reads credential status and backend readiness on initial load and refresh.
  - Shows a safe source label through an allowlisted mapper, never the raw source value.
  - Shows encrypted saved state and the shared-device warning for the current Windows user.
  - Adds re-import and confirmed clear controls with mutual disabled states, loading labels, static safe errors, and an `aria-live` result region.
  - Refreshes credential status, readiness, and real models after each credential change.
  - Displays a model count only after a successful readiness and model probe.
  - Keeps model lists empty when unavailable, preserves an existing conversation, and disables model-dependent actions until recovery.
  - Creates a conversation only when the selected provider is ready and at least one verified model exists.
- `gui/src/components/assistant/assistant.test.tsx`
  - Added mocked desktop coverage for unavailable, ready, re-import, confirmed clear, mutation loading, and mutation failure states.
  - Proves that unavailable state has no fake model count and disables new conversation and sending.
  - Proves that re-import refreshes saved status, readiness, and real models.
  - Proves that clear requires confirmation and visibly moves the provider to not ready.

## TDD evidence

The new tests were run before production changes. The focused run reported 4 existing tests passed and 4 new tests failed for the intended missing behavior:

- Missing `No verified models` state exposed the fake model fallback.
- Missing re-import control exposed the absent credential mutation UI.
- Missing clear control exposed the absent confirmation and loading lifecycle.
- Missing safe mutation alert exposed the absent recoverable error state.

After implementation, the focused file passed 8 of 8 tests.

## Final verification

All final commands were run from `gui` unless noted.

| Check | Command | Result |
|---|---|---|
| React | `npm test -- --run` | Pass, 1 file, 8 tests |
| Lint | `npm run lint` | Pass, exit 0 |
| Production build | `npm run build` | Pass, 1,744 modules transformed |
| Electron | `node --test electron/*.test.cjs` | Pass, 18 tests, 0 failures |
| Diff whitespace | `git diff --check` | Pass |
| Added email pattern scan | scoped modified-file scan | 0 matches |
| Added em dash scan | scoped added-line scan | 0 matches |
| Fake model fallback scan | scoped source scan | 0 matches |

The required Impeccable detector was run exactly once after the UI was complete. It reported one `gray-on-color` warning caused by a destructive button hover class. The colored hover background was removed, leaving the border and text treatment, and the flagged class pattern was confirmed absent without rerunning the one-shot detector.

## Accessibility and error-state self-review

- Credential actions have visible text names and keyboard-visible focus rings.
- Both actions disable during mutation, and the active action changes to a loading label.
- Clear requires explicit confirmation before mutation.
- Mutation outcomes use a polite, atomic `role="status"` live region.
- Errors use `role="alert"` and static recovery copy rather than raw exceptions.
- Provider readiness and model availability are stated in text, not color alone.
- Provider and model selectors disable when their state cannot be used safely.
- Long readiness and source text uses wrapping-safe containers.
- The existing transcript, queue, attachment, tool, and approval boundaries remain unchanged apart from required provider/model gating.

## Privacy review

- No real credential was read, displayed, logged, or placed in test fixtures.
- Renderer state receives only the safe credential status fields.
- Unexpected credential source values map to `Unavailable` instead of rendering raw data.
- Browser fallbacks contain no credential material.
- Provider exceptions are replaced with bounded renderer-safe messages.
- No ciphertext, credential path, private path, raw email, or raw provider exception was added.

## Known constraints

- The required `npm test -- --run` form emits an npm deprecation warning for the forwarded `--run` option, but Vitest still executes once and passes all tests.
- Live credential mutation was intentionally not exercised. Task coverage uses mocked desktop contracts so no real credential or local credential location is accessed.

## Fix round 1

The review found three contract gaps. A resolved credential mutation was treated as success without validating its returned state, a failed refresh after clear could leave stale readiness visible, and credential source labels did not match the producer allowlist. Failure text was also duplicated between the polite status region and the alert.

### Changes

- Re-import now succeeds only when the returned status is both configured and saved.
- Clear now succeeds only when the returned status is neither configured nor saved.
- Clear invalidates local readiness and model state before the mutation and again after a valid response.
- A mutation refresh failure invalidates readiness and models until a later refresh succeeds.
- Rejected and resolved-failure mutations publish only a bounded alert. Successful mutations publish only to the polite status region.
- The source label allowlist now matches the credential store producer values: `saved`, `configured file`, `FreeChain file`, `environment`, and `unavailable`.
- Any unknown source remains `Unavailable` and is never rendered directly.

### Fix-round TDD evidence

Before the implementation change, the focused suite collected 17 tests: 8 passed and 9 failed for the expected review gaps. The failures covered real source labels, duplicate failure announcements, resolved unsaved re-import, resolved uncleared clear, and refresh rejection after a successful clear.

After the implementation change, the focused suite passed 17 of 17 tests.

### Fix-round verification

| Check | Command | Result |
|---|---|---|
| Focused React | focused Assistant test command | Pass, 1 file, 17 tests |
| Full React | `npm test -- --run` | Pass, 1 file, 17 tests |
| Lint | `npm run lint` | Pass, exit 0, no warnings |
| Production build | `npm run build` | Pass, 1,744 modules transformed |
| Electron | `node --test electron/*.test.cjs` | Pass, 18 tests, 0 failures |
| Diff whitespace | `git diff --check` | Pass |
| Added email pattern scan | scoped added-line scan | 0 matches |
| Added credential-shape scan | scoped added-line scan | 0 matches |
| Added private-path scan | scoped added-line scan | 0 matches |
| Added em dash scan | scoped added-line scan | 0 matches |
| Obsolete source value scan | scoped Assistant source and tests | 0 matches |
| Fake model fallback scan | scoped Assistant API and page source | 0 matches |
| Prior flagged hover class | scoped class scan | 0 matches |

The one-shot Impeccable detector was not rerun. Its previously flagged colored hover class remains absent.

### Fix-round accessibility and error-state review

- Successful mutation feedback appears only in the polite, atomic status region.
- Failure feedback appears only in the alert, avoiding duplicate assistive announcements.
- Mutation controls retain visible loading labels and disabled states.
- New conversation, model selection, and message submission stay disabled after an uncertain mutation refresh.
- Refresh remains available as the explicit recovery path, and a successful refresh clears the fail-closed state.
- Status, recovery, and source information remain text-visible without depending on color.

### Fix-round privacy review

- Tests use only contract-shaped status objects and inert model names.
- No real credential, ciphertext, credential location, raw provider exception, private path, or email was read or added.
- Producer source strings are mapped through a fixed safe allowlist. Unknown strings collapse to `Unavailable`.

### Fix-round constraint

- Live credential mutation remains intentionally untested. The mocked desktop coverage exercises success, rejection, resolved failure, and post-mutation refresh failure without touching a real local credential.
