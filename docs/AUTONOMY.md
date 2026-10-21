# Autonomous submission

Agent C can fill and submit job applications with no action from you. You give one standing permission. The agent then works inside the limits of that permission.

## Turn it on

```powershell
python -m job_pipeline autonomy enable --granted-by "Your Name" --days 30 --daily-cap 10 --min-score 70
```

| Setting | Meaning | Limit |
| :--- | :--- | :--- |
| `--granted-by` | Your name. It goes into the policy record. | Necessary |
| `--days` | Days until the policy expires. | 1 to 90 |
| `--daily-cap` | Attempts each UTC day. Skipped jobs do not count. | 1 to 25 |
| `--min-score` | Lowest match score that the agent submits. | 0 to 100 |
| `--host` | Optional. Submit only to this employer or ATS host. Repeat for more hosts. | Any number |

The policy is stored in `data/autonomy_policy.json`. Git ignores the `data` folder.

## Run it

```powershell
python -m job_pipeline agent-c-auto --resume C:\path\resume.docx
python -m job_pipeline agent-c-auto --resume C:\path\resume.docx --dry-run
```

The run reads the verified handoffs from Agent B in `data/agent_b_reviews.json`. To keep the agent working with no attention from you, schedule these three commands in order: `run`, `agent-b --live` and `agent-c-auto`. Windows Task Scheduler or a Crew schedule can run them.

In Crew, use `bin/expedient.py autonomy run RESUME` or the `autonomyRun` bridge operation.

## What the agent checks

For each job, best score first, the agent does these checks. If one check fails, it skips the job and writes the reason to the ledger.

1. The policy is enabled, valid and not expired.
2. The job is not already applied or excluded.
3. The Agent B handoff is intact, fresh and live verified.
4. Your reviewed facts answer every question in the packet.
5. The match score is at or above your minimum.
6. The host is allowed, if you set hosts.
7. The daily cap is not reached.

Then the agent writes a receipt. The receipt holds the job, the packet hash and the policy hash. It expires in one hour. The browser step checks the receipt again before it opens. If you change or disable the policy, every old receipt stops working.

## What counts as submitted

The browser agent must end its report with `SUBMISSION_CONFIRMED: yes`. It may write this only when the employer shows a confirmation. Any other result keeps the job at `ready_to_apply` and the ledger records `unconfirmed` or `failed`. The full browser report is in `data/application_results`.

## What the agent does not do

1. It does not guess an answer, a date, a salary or a credential.
2. It does not answer demographic or criminal history questions. Those jobs are skipped.
3. It does not solve a CAPTCHA, pass a bot check or create an account.
4. It does not use the stored policy to approve any other tool.
5. A Crew agent cannot turn autonomy on. Only your terminal command can.

## Stop it

```powershell
python -m job_pipeline autonomy disable
python -m job_pipeline autonomy status
```

## Ledger

`data/autonomous_submissions.jsonl` has one JSON line for each job. Each line has the time, the job ID, the outcome and the reasons for a skip. It holds no contact details. Outcomes are `submitted`, `unconfirmed`, `failed` and `skipped`.

## Your responsibility

The agent submits what your reviewed facts say. Keep `data/application_profile.json` true and current. Read the ledger often. Some sites do not allow automated applications. Use `--host` to limit the agent to sites that allow them.
