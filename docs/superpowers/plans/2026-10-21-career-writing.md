# Career writing implementation plan

Goal: add useful resume review, job evidence mapping and interview practice to the existing agent without changing application approval rules.

Architecture: pure standard library functions process bounded text, the existing broker exposes them as read operations, and the shared assistant response boundary enforces prose style. The CLI provides the same functions from JSON on standard input. No new service or dependency is required.

1. Add failing behavior tests for review findings, evidence gaps, interview questions, input limits, contact redaction, dash removal and technical literal preservation.
2. Implement career functions and a shared writing policy. Register three tools with strict schemas and add a CLI entry point.
3. Protect DOCX extraction from oversized compressed XML. Test both valid documents and rejected inputs.
4. Document transcript provenance using public source URLs, timestamps and paraphrases. Exclude raw transcripts, private Discord links, personal resumes and local media paths from publication.
5. Run the full Python suite, CLI examples, broker acceptance and security scans. Review the exact outgoing diff and dependencies. Publish the explicit feature branch and verify the public revision before sending the requested Discord DM.

Acceptance: the actual Assistant receives the writing policy, saved prose contains no dash punctuation, URLs and code remain unchanged, factual gaps stay visible, all career tools are discoverable and bounded, no action submits an application, and the outgoing files contain no owner data or credentials.

Baseline: 174 tests were attempted in the sandbox. Five errors were caused by blocked DNS and loopback sockets. A supported host execution rerun establishes the real baseline before changes.
