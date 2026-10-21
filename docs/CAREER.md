# Job and resume preparation

The Assistant can review a resume, map possible evidence to a job posting, prepare interview practice and check a draft. These functions use the standard library and need no account, browser or model when run from the CLI.

## Start with the agent

1. Supply a current resume and the actual job description. Remove contact details and confidential employer material before sharing them with any provider.
2. Ask the agent to use `career.resume.review`. It returns repeated content, incomplete date ranges, generic claims, writing issues and possible evidence matches.
3. Ask for a targeted summary and achievement bullets. Keep employment, projects, training and earned credentials distinct. Ask one unresolved question at a time.
4. Use `career.draft.check` before accepting the wording. It flags numbers absent from supplied evidence and suggests plain punctuation. A matching number is not proof of the claim around it.
5. Use `career.interview.prepare` for twelve practice questions and a scoring rubric. The agent should ask `next_question` and wait, then discuss the problem, personal action, verification and outcome.

The tools do not establish eligibility or an ATS score. Shared words are only possible evidence links. Negation, depth of experience, dates, work authorization and credential status need explicit review. No tool in this group reads files, opens URLs, changes candidate facts or submits an application.

## CLI examples

Run from the repository root with Python 3.11 or newer. JSON arrives on standard input, so private resume content need not appear in command arguments. The CLI prints results and does not save the input.

```powershell
'{"resume_text":"Experience\nBuilt API diagnostics.\nSkills\nPython","job_description":"Diagnose API failures.","target_role":"Support Engineer"}' | python -m job_pipeline.career review
'{"role":"Support Engineer","job_description":"Diagnose API failures.","evidence":["Built API diagnostics."]}' | python -m job_pipeline.career interview
'{"draft":"Built high-impact tools that saved 75%.","evidence":["Built diagnostic tools."]}' | python -m job_pipeline.career check
python -m job_pipeline.career sources
```

For a saved local JSON request, use `Get-Content -Raw` and pipe it to the same command. Keep private requests outside Git. Text fields are limited to 32,000 characters. Evidence lists allow twenty statements of up to 2,000 characters each. Unknown fields and malformed inputs fail with a short error without echoing the input.

## Writing controls

The shared assistant policy calls for direct language, specific evidence and natural interview answers. Saved assistant prose passes through deterministic punctuation normalization and contact redaction. It replaces dash punctuation in ordinary prose, converts numeric ranges to words and keeps date meaning with slash formatting.

Exact URLs, fenced code, inline code, machine JSON and explicit Markdown source quotations are preserved as technical or quoted material. They are not authored prose. The draft checker exposes its suggested text for review instead of editing the original resume. This is a style check, not a grammar model or a factual verifier.

## Transcript basis

The lessons below came from timestamped speech transcripts produced from the original videos by Reel Repo Hunter, using automatic speech recognition. They were read on October 21, 2026. They are not summaries substituted for a transcript. The ASR artifacts reported no uncovered detected speech for these seven sources, but semantic accuracy was not independently certified. Some segment ends exceed the reported video duration, so timestamps are approximate. A recognizer misheard LaTeX as late tech in one source.

Raw transcripts, example resumes visible in frames, private Discord records and local media files are excluded from the public repository. The code contains paraphrased lessons and public links only.

| Source | Speech interval reviewed | Adopted lesson | Rejected or limited claim |
| :--- | :--- | :--- | :--- |
| [Project examples](https://www.instagram.com/reel/DbJQVAVIUhr/) | 00:05 to 00:40 | Show relevant projects with actions and supported results. | Project ordering depends on the target and actual experience. Do not copy example metrics. |
| [Career gaps](https://www.instagram.com/reel/DeHnINnSHN_/) | 00:09 to 00:55 | Emphasize accomplishments and relevant learning. | Never imply a current job or tenure that does not exist. |
| [Clear resume layout](https://www.instagram.com/reel/DeMzspoyDU6/) | 00:14 to 00:38 | Use clear sections and recognizable employment information. | No format guarantees ATS success. |
| [Resume formats](https://www.instagram.com/reel/DcwdKhsoESL/) | 00:03 to 00:24 | Keep the document orderly and check reading order. | LaTeX is optional and cannot guarantee acceptance. |
| [Summary metrics](https://www.instagram.com/reel/DeR4b5dOaLa/) | 00:05 to 00:19 | Supported impact can strengthen a summary. | The advertised 75 percent interview improvement is unsupported. |
| [Natural interview answers](https://www.instagram.com/reel/DemwpdMTAJ7/) | 00:41 to 02:18 | Explain the problem, thinking, action and outcome naturally. | Do not perform a memorized script or treat charisma as a selection rule. |
| [Data analysis practice](https://www.instagram.com/reel/Ddr_6VaOWK9/) | 00:29 to 02:34 | State hypotheses, check generated code and inspect subgroup composition. | The scenario is illustrative, not a confirmed employer question. |

The system design clip `DdV0cTeJrGy` had no detected speech. The short clip `Deev5vMSj8c` had incomplete speech coverage. Neither is presented as a usable speech transcript. Carousel text is a different evidence type and is not described as spoken content.

General layout and evidence guidance can be checked against [CareerOneStop](https://cloudfront.careeronestop.org/JobSearch/Resumes/ResumeGuide/formatting.aspx). Employer instructions take priority over a social media recommendation.

## Verification and privacy

```powershell
python -m unittest tests.test_career tests.test_assistant tests.test_app_tools
python -m unittest discover -s tests
```

Tests cover broker discovery, input limits, no file writes from career tools, contact redaction, unsupported metrics, fact review requirements, source preservation and actual assistant persistence. DOCX parsing now rejects files over 16 MiB and document XML over 4 MiB before decompression. DTD and entity rejection also covers XML encoded with UTF16 or UTF32.

These controls reduce specific risks. They do not prove the entire application is free of vulnerabilities. Existing external action approval rules remain in force.
