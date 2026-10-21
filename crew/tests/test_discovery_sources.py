"""Public job URLs must survive filtering before a search source wins."""
import json
from pathlib import Path
from types import SimpleNamespace
import sys
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from job_pipeline.webclaw import WebClawClient


class MicrosoftDiscovery(unittest.TestCase):
    def test_microsoft_requires_production_public_job_detail(self):
        for url in (
            'https://stage.apply.careers.microsoft.com/careers/job/1970359197244530?hl=en',
            'https://apply.careers.microsoft.com/careerhub/explore/jobs/1970393556827486',
            'https://apply.careers.microsoft.com/?jobsource=linkedin',
            'https://apply.careers.microsoft.com/careers?query=Azure',
        ):
            with self.subTest(url=url):
                self.assertEqual(WebClawClient._only_cli_result_url(url, 'https://bing.com/'), '')
        good = 'https://apply.careers.microsoft.com/careers/job/1970393556989677'
        self.assertEqual(WebClawClient._only_cli_result_url(good, 'https://bing.com/'), good)
        other = 'https://jobs.lever.co/example/role-123'
        self.assertEqual(WebClawClient._only_cli_result_url(other, 'https://bing.com/'), other)

    def test_rejected_staging_result_does_not_stop_fallback(self):
        calls = []
        good = 'https://apply.careers.microsoft.com/careers/job/1970393556989677'
        class Reader:
            def available(self): return True
            def run(self, command, arguments, **kwargs):
                calls.append(arguments[0])
                url = 'https://stage.apply.careers.microsoft.com/careers/job/123' if len(calls) == 2 else good
                payload = {'url': 'https://bing.com/', 'blocks': [] if len(calls) == 1 else [{'type': 'heading', 'text': 'Azure role', 'href': url}]}
                return SimpleNamespace(status='ok', stdout=json.dumps(payload), stderr='', exit_code=0)
        client = WebClawClient(Path('.'), only_cli=Reader())
        results = client._only_cli_search('Microsoft Azure', 3)
        self.assertEqual(results[0]['link'], good)
        self.assertEqual(calls, ['linkedin', 'ddg', 'bing'])


if __name__ == '__main__':
    unittest.main()
