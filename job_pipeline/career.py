"""Bounded local career review. Matching terms never establish candidate eligibility."""
from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from typing import Any

from .resume import redact_contact_details
from .util import redact_secrets
from .writing import polish_prose, prose_dash_count

MAX_TEXT = 32000
SOURCES = (
    {"id": "projects", "url": "https://www.instagram.com/reel/DbJQVAVIUhr/", "timestamp": "00:05 to 00:40",
     "lesson": "Relevant projects can lead when professional experience is limited. Explain actions and supported outcomes.",
     "limit": "Do not copy sample metrics or assume every candidate should put projects first."},
    {"id": "career_gaps", "url": "https://www.instagram.com/reel/DeHnINnSHN_/", "timestamp": "00:09 to 00:55",
     "lesson": "Emphasize relevant accomplishments and learning during a career gap.",
     "limit": "Never imply current employment or professional experience that the candidate does not have."},
    {"id": "layout", "url": "https://www.instagram.com/reel/DeMzspoyDU6/", "timestamp": "00:14 to 00:38",
     "lesson": "Use clear headings, recognizable job information and a focused professional summary.",
     "limit": "The claim of universal ATS success is unsupported. Table handling varies."},
    {"id": "format", "url": "https://www.instagram.com/reel/DcwdKhsoESL/", "timestamp": "00:03 to 00:24",
     "lesson": "Use an orderly resume structure and check the exported reading order.",
     "limit": "LaTeX is optional. A template cannot guarantee ATS acceptance. ASR renders LaTeX as late tech."},
    {"id": "metrics", "url": "https://www.instagram.com/reel/DeR4b5dOaLa/", "timestamp": "00:05 to 00:19",
     "lesson": "Supported commercial impact can make a summary more specific.",
     "limit": "The advertised 75 percent interview improvement is unsupported. Never invent financial impact."},
    {"id": "stories", "url": "https://www.instagram.com/reel/DemwpdMTAJ7/", "timestamp": "00:41 to 02:18",
     "lesson": "Explain the problem, thinking, action and outcome. Be specific and natural rather than reciting a script.",
     "limit": "Communication matters, but the video does not establish an employer selection rule."},
    {"id": "hypotheses", "url": "https://www.instagram.com/reel/Ddr_6VaOWK9/", "timestamp": "00:29 to 02:34",
     "lesson": "State hypotheses before coding, validate generated code and inspect subgroup composition.",
     "limit": "This is an illustrative exercise, not a confirmed employer question or evidence of candidate skills."},
)


def _text(value: str, label: str, limit: int = MAX_TEXT, *, required: bool = False) -> str:
    if not isinstance(value, str) or len(value) > limit or (required and not value.strip()):
        raise ValueError(f"Provide {label} as text within {limit} characters.")
    if any(ord(char) < 32 and char not in "\n\r\t" for char in value):
        raise ValueError(f"Remove control characters from {label}.")
    return redact_contact_details(redact_secrets(value)).strip()


def _evidence(values: list[str]) -> list[str]:
    if not isinstance(values, list) or len(values) > 20:
        raise ValueError("Provide evidence as a list of at most 20 statements.")
    return [_text(value, "evidence", 2000, required=True) for value in values]


def _terms(text: str) -> set[str]:
    stop = {"with", "that", "this", "have", "from", "your", "will", "they", "their", "must",
            "required", "experience", "skills", "work", "team", "role", "and", "the", "for", "are"}
    return {term for term in re.findall(r"\b[a-z][a-z0-9+#.]{2,}\b", text.lower()) if term not in stop}


def _requirements(posting: str) -> list[str]:
    # ponytail: explicit lines and sentences only; semantic requirement extraction stays with the reviewing agent.
    return [line.strip(" •*\t") for line in re.split(r"[\n;]+|(?<=[.!?])\s+", posting)
            if len(line.strip()) > 5][:12]


def _mapping(posting: str, evidence: list[str]) -> list[dict[str, Any]]:
    result = []
    for requirement in _requirements(posting):
        terms = _terms(requirement)
        candidates = [{"evidence_index": index, "shared_terms": sorted(terms & _terms(value))}
                      for index, value in enumerate(evidence) if terms & _terms(value)]
        result.append({"posting_text": requirement, "possible_evidence": candidates[:3],
                       "status": "needs_context_review" if candidates else "needs_evidence",
                       "owner_review_required": True})
    return result


def review_resume(resume_text: str, job_description: str = "", target_role: str = "") -> dict[str, Any]:
    resume = _text(resume_text, "resume", required=True)
    posting = _text(job_description, "job description")
    role = _text(target_role, "target role", 200)
    lines = [line.strip() for line in resume.splitlines() if line.strip()]
    findings = []
    for line, count in Counter(lines).items():
        if count > 1 and len(line) > 12:
            findings.append({"code": "repeated_line", "detail": "Remove repeated content.", "excerpt": line[:180]})
    if re.search(r"(?i)\bstarted\s+(?:[A-Z][a-z]+\s+)?\d{4}\b", resume):
        findings.append({"code": "date_range", "detail": "Confirm the end date or continuing status. Do not infer it."})
    if prose_dash_count(resume):
        findings.append({"code": "dash_punctuation", "detail": "Use plain sentences in authored prose. Preserve exact source facts."})
    if re.search(r"(?i)\b(?:results.driven|passionate|hard.working|team player|dynamic professional)\b", resume):
        findings.append({"code": "generic_claim", "detail": "Replace broad adjectives with a relevant action and evidence."})
    if any(len(line.split()) > 45 for line in lines):
        findings.append({"code": "long_line", "detail": "Split dense descriptions into a specific action and result."})
    sections = {"experience": r"(?im)^\s*(?:professional |work )?experience\s*$",
                "skills": r"(?im)^\s*(?:technical |core )?skills\s*$",
                "education": r"(?im)^\s*education\s*$",
                "projects": r"(?im)^\s*(?:selected |software |selected software )?projects\s*$"}
    found = [name for name, pattern in sections.items() if re.search(pattern, resume)]
    return {"status": "needs_review", "target_role": role, "source_modified": False,
            "eligibility_assessed": False, "findings": findings[:20], "sections_found": found,
            "job_evidence": _mapping(posting, lines), "evidence_index_basis": "Nonempty resume lines, indexed from zero.",
            "next_steps": ["Select the role before changing the summary.",
                           "Lead with the strongest relevant employment or project evidence.",
                           "Describe the problem, personal action, verification and outcome.",
                           "Confirm dates, credentials and metrics before using them.",
                           "Check reading order in the actual exported document."],
            "sources": list(SOURCES[:5]), "limits": "Text review cannot verify facts, page layout or ATS acceptance."}


def prepare_interview(role: str, job_description: str, evidence: list[str]) -> dict[str, Any]:
    role = _text(role, "role", 200, required=True)
    posting = _text(job_description, "job description", required=True)
    facts = _evidence(evidence)
    requirements = _requirements(posting)
    focus = requirements[0] if requirements else role
    questions = [
        {"kind": "project", "question": "Which real example best explains your fit for this role?"},
        {"kind": "project", "question": "What problem did that project solve, and who needed it?"},
        {"kind": "project", "question": "What did you personally build or change?"},
        {"kind": "project", "question": "How did you test the result and distinguish your work from the team's work?"},
        {"kind": "technical", "question": f"How would you approach this requirement: {focus}"},
        {"kind": "technical", "question": "What hypotheses would you test before selecting a solution?"},
        {"kind": "technical", "question": "Which failure cases and trade offs matter, and why?"},
        {"kind": "technical", "question": "How would you verify recovery, correctness and a safe rollback?"},
        {"kind": "behavioral", "question": "Describe a real time you clarified an ambiguous request."},
        {"kind": "behavioral", "question": "Describe a real mistake and what you changed afterward."},
        {"kind": "behavioral", "question": "How did you explain a technical problem to another person?"},
        {"kind": "behavioral", "question": "Which requirement needs more experience, and how would you address that honestly?"},
    ]
    return {"status": "practice_only", "role": role, "questions": questions, "next_question": questions[0],
            "wait_for_answer": True, "job_evidence": _mapping(posting, facts),
            "rubric": ["relevance", "specificity", "personal contribution", "verification", "outcome", "clarity"],
            "story_fields": ["problem", "action", "verification", "result", "evidence source"],
            "review_sheet": ["A natural introduction lasting about one minute.", "Three real stories.",
                             "Weak concepts to revise.", "Company facts checked against current primary sources.",
                             "Questions for the interviewer."],
            "sources": list(SOURCES[5:]), "limits": "Practice questions are not confirmed employer questions. Evidence is not independently verified."}


def check_draft(draft: str, evidence: list[str]) -> dict[str, Any]:
    draft = _text(draft, "draft", required=True)
    facts = _evidence(evidence)
    numbers = re.compile(r"(?<!\w)\$?\d+(?:[.,]\d+)*(?:%|\b)")
    supported = set(numbers.findall("\n".join(facts)))
    missing = sorted(set(numbers.findall(draft)) - supported)
    return {"status": "needs_review", "facts_verified": False, "auto_submit": False,
            "metrics_needing_evidence": missing, "dash_count": prose_dash_count(draft),
            "suggested_text": polish_prose(draft),
            "checks": ["Review every metric in its original context, even when the number appears in evidence.",
                       "Check each claim against its source. Text agreement is not factual verification.",
                       "Keep actual job titles, dates, project scope and credential status."],
            "sources": [SOURCES[4]]}


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Review career material locally from JSON on standard input.")
    parser.add_argument("operation", choices=("review", "interview", "check", "sources"))
    args = parser.parse_args(argv)
    try:
        if args.operation == "sources":
            result = list(SOURCES)
        else:
            raw = sys.stdin.read(100001)
            if len(raw) > 100000:
                raise ValueError("Input exceeds the request limit.")
            body = json.loads(raw)
            if not isinstance(body, dict):
                raise ValueError("Provide one JSON object.")
            function = {"review": review_resume, "interview": prepare_interview, "check": check_draft}[args.operation]
            result = function(**body)
        print(json.dumps(result, ensure_ascii=True, indent=2))
        return 0
    except (ValueError, TypeError, RecursionError):
        print("Invalid career request. Check field names, text limits and evidence lists.", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
