# Expedient Employment 2.2.0

## New

1. **Autonomous submission.** Agent C can fill and submit applications with no action from you. You turn it on one time with `autonomy enable`. Then `agent-c-auto` submits each eligible job, best score first. See [AUTONOMY.md](AUTONOMY.md).
2. **Codex Crew app.** The `crew/expedient-employment` folder holds the Crew app, its CLI, its skill and its tests. A Crew agent can run, check and stop autonomy. It cannot turn autonomy on.
3. **Resume and interview tools.** The assistant reviews resumes, maps job evidence, prepares interview practice and checks drafts. See [CAREER.md](CAREER.md).
4. **Plain writing.** Saved assistant replies have no dash punctuation. The documents use Simplified Technical English with no em dashes, en dashes or hyphenated words in prose.

## Safety

1. Autonomy is off until you enable it. A policy expires in 90 days or less and allows 25 attempts each day or less.
2. Each job gets a receipt bound to the exact packet and the current policy. The receipt expires in one hour. It stops working when you change or disable the policy.
3. A job with an unanswered question is skipped. The agent never guesses.
4. A job is marked applied only when the employer shows a confirmation.
5. Every attempt goes into a ledger with no contact details.
6. only-cli login, logout, `do` and `site` tools now need an exact approval.
7. Word documents over 16 MiB, document text over 4 MiB, DTDs and entities are refused before parsing.

## Fixed

1. The Crew interface builds with Tailwind CSS 4.
2. Idle Crew sidebar buttons no longer show a gray fill, and the active page has the correct highlight in light and dark themes.
3. The test dependency `@vitest/mocker` is updated. All lockfiles report no known vulnerabilities.

## Checks

Python: 181 tests pass. Crew app: 20 tests pass. Interface: 17 tests pass, both builds pass and 15 interface checks pass in light, dark and narrow views. `npm audit` reports no vulnerabilities.

## Limits

1. The agent cannot pass a CAPTCHA, a login wall or a bot check. It skips those jobs.
2. Some sites do not allow automated applications. Use `--host` to limit the agent.
3. Submission needs the optional browser runtime and an AI model key.
