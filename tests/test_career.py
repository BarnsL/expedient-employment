"""Career tools must preserve evidence, privacy and readable writing."""
import json
import tempfile
import unittest
import zipfile
from pathlib import Path

from job_pipeline import career, writing
from job_pipeline.app_tools import JobPipelineToolAdapter
from job_pipeline.assistant import AssistantResponse, ConversationService
from job_pipeline.resume import ResumeError, extract_docx_text
from job_pipeline.tool_broker import ToolBroker, ToolContext


class CareerTests(unittest.TestCase):
    def test_review_reports_gaps_without_calling_overlap_verified_experience(self):
        result = career.review_resume(
            "Summary\nI have no Python experience.\nExperience\nStarted July 2021\n"
            "Built a workflow.\nBuilt a workflow.",
            "Python development and PostgreSQL support are required.",
            "Support Engineer",
        )
        self.assertEqual(result["status"], "needs_review")
        self.assertFalse(result["eligibility_assessed"])
        self.assertIn("date_range", {x["code"] for x in result["findings"]})
        self.assertIn("repeated_line", {x["code"] for x in result["findings"]})
        self.assertTrue(result["job_evidence"][0]["owner_review_required"])
        self.assertNotIn("verified", result["job_evidence"][0]["status"])

    def test_review_redacts_contacts_and_never_fetches_source_text(self):
        address = "person" + "@" + "example.test"
        result = career.review_resume("Summary\nContact " + address + "\nSkills\nPython")
        self.assertNotIn(address, json.dumps(result))
        self.assertFalse(result["source_modified"])

    def test_interview_is_role_specific_and_waits_for_one_answer(self):
        result = career.prepare_interview("Support Engineer", "Diagnose API failures.", ["Built API diagnostics."])
        self.assertEqual(len(result["questions"]), 12)
        self.assertIn("API", json.dumps(result["questions"]))
        self.assertEqual(result["next_question"], result["questions"][0])
        self.assertTrue(result["wait_for_answer"])
        self.assertIn("verification", result["rubric"])

    def test_draft_flags_numbers_without_evidence_and_keeps_review_gate(self):
        result = career.check_draft("Saved 75% through high-impact work.", ["Built an alarm tool."])
        self.assertIn("75%", result["metrics_needing_evidence"])
        self.assertEqual(result["status"], "needs_review")
        self.assertNotIn("-", result["suggested_text"])
        self.assertFalse(result["facts_verified"])

    def test_direct_calls_reject_oversized_and_wrong_type_inputs(self):
        for value in ("x" * 32001, None, {"text": "resume"}):
            with self.assertRaises(ValueError):
                career.review_resume(value)
        with self.assertRaises(ValueError):
            career.prepare_interview("Role", "Posting", "not a list")

    def test_broker_exposes_read_tools_without_file_or_network_access(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            broker = ToolBroker(JobPipelineToolAdapter(root).tool_specs())
            context = ToolContext(actor="test", request_id="career")
            result = broker.invoke("career.resume.review", {"resume_text": "Skills\nPython"}, context)
            self.assertEqual(result.data["status"], "needs_review")
            self.assertEqual(list(root.iterdir()), [])
            policies = {x["name"]: x["policy"] for x in broker.list_tools()}
            self.assertEqual(policies["career.resume.review"], "read")
            with self.assertRaises(Exception):
                broker.invoke("career.resume.review", {"resume_text": "x", "path": "secret"}, context)

    def test_docx_rejects_oversized_xml_before_decompression(self):
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / "large.docx"
            with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as archive:
                archive.writestr("word/document.xml", b"x" * (4 * 1024 * 1024 + 1))
            with self.assertRaises(ResumeError):
                extract_docx_text(path)

    def test_docx_rejects_entities_in_utf16_xml(self):
        xml = '<?xml version="1.0" encoding="UTF-16"?><!DOCTYPE document [<!ENTITY payload "expanded">]><document>&payload;</document>'
        with tempfile.TemporaryDirectory() as temp:
            path = Path(temp) / "entity.docx"
            with zipfile.ZipFile(path, "w") as archive:
                archive.writestr("word/document.xml", xml.encode("utf-16"))
            with self.assertRaises(ResumeError):
                extract_docx_text(path)


class WritingTests(unittest.TestCase):
    def test_plain_prose_has_no_dash_punctuation_and_preserves_number_meaning(self):
        value = writing.polish_prose("- Built high-impact tools\u2014tested 3-5 cases on 2026-10-21. Change: -5%.")
        self.assertIn("high impact", value)
        self.assertIn("3 to 5", value)
        self.assertIn("2026/10/21", value)
        self.assertIn("minus 5%", value)
        self.assertFalse(writing.prose_dash_count(value))

    def test_urls_code_and_source_quotes_survive_exactly(self):
        source = "[my-link](https://example.test/a-b) `--flag`\n```sh\nrun --flag\n```\n> Original source: high-impact."
        result = writing.polish_prose(source)
        self.assertIn("https://example.test/a-b", result)
        self.assertIn("`--flag`", result)
        self.assertIn("run --flag", result)
        self.assertIn("> Original source: high-impact.", result)
        self.assertIn("[my link]", result)

    def test_machine_json_remains_valid_and_unchanged(self):
        source = '{"job-id": "abc-def", "delta": -5}'
        self.assertEqual(writing.polish_prose(source), source)

    def test_mathematical_minus_is_not_changed_to_a_range(self):
        self.assertEqual(writing.polish_prose("4\u22122 equals 2."), "4 minus 2 equals 2.")

    def test_assistant_policy_and_persisted_output_are_enforced(self):
        class Provider:
            def complete(self, request):
                self.request = request
                return AssistantResponse("Clear\u2014specific, evidence-based writing.")
        provider = Provider()
        with tempfile.TemporaryDirectory() as temp:
            service = ConversationService(Path(temp) / "chat.db", Path(temp) / "attachments",
                                          providers={"test": provider}, broker=ToolBroker())
            try:
                conversation = service.create_conversation("test", "test")
                service.enqueue(conversation.id, "Review this resume.")
                service.run_next(conversation.id)
                self.assertEqual(provider.request.messages[0]["role"], "system")
                self.assertIn("evidence", provider.request.messages[0]["content"])
                reply = service.messages(conversation.id)[-1].content
                self.assertFalse(writing.prose_dash_count(reply))
            finally:
                service.close()


if __name__ == "__main__":
    unittest.main()
