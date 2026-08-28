"""The single subprocess adapter for the separate WebClaw executable."""

from __future__ import annotations

import base64
import binascii
import json
import logging
import os
import shutil
import subprocess
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

from .integrations.only_cli import OnlyCliAdapter, OnlyCliError
from .util import canonical_url, redact_secrets
from .web_intelligence import SafeUrlPolicy, UnsafeUrlError


LOGGER = logging.getLogger(__name__)


class WebClawError(RuntimeError):
    """Raised when the separate WebClaw executable cannot complete a request."""


class WebClawClient:
    """Invoke WebClaw and validate its machine-readable JSON boundaries."""
    def __init__(
        self,
        project_root: Path,
        binary: str | None = None,
        timeout: int = 60,
        url_policy: SafeUrlPolicy | None = None,
        only_cli: Any | None = None,
    ):
        """Resolve optional discovery backends and retain a default request timeout."""
        self.project_root = project_root
        try:
            timeout = int(os.environ.get("WEBCLAW_TIMEOUT_SECONDS", str(timeout)))
        except ValueError:
            pass
        self.timeout = max(5, min(timeout, 120))
        self.binary = self._resolve_binary(binary)
        self.url_policy = url_policy or SafeUrlPolicy()
        self.only_cli = only_cli or OnlyCliAdapter(project_root)

    def _validate_page_url(self, url: str) -> None:
        """Reject local and non-public page targets before any network adapter sees them."""
        try:
            self.url_policy.resolve(url)
        except (UnsafeUrlError, OSError) as exc:
            raise WebClawError("Page URL must resolve only to public addresses.") from exc

    def _resolve_binary(self, explicit: str | None) -> str | None:
        """Find optional WebClaw from an explicit flag, environment, local tools, or PATH."""
        candidates = [
            explicit,
            os.environ.get("WEBCLAW_BIN"),
            str(self.project_root / "tools" / "webclaw" / "webclaw.exe"),
            str(self.project_root / "tools" / "webclaw" / "webclaw"),
            shutil.which("webclaw"),
            shutil.which("webclaw.exe"),
        ]
        for candidate in candidates:
            if not candidate:
                continue
            path = Path(candidate)
            if path.exists() or shutil.which(candidate):
                return str(path if path.exists() else candidate)
        return None

    def _only_cli_available(self) -> bool:
        """Return whether the pinned MIT reader shipped with the app can execute."""
        try:
            return bool(self.only_cli.available())
        except (AttributeError, OSError):
            return False

    def _only_cli_json(self, command: str, arguments: list[str]) -> dict[str, Any]:
        """Run only-cli with JSON output and validate its subprocess boundary."""
        if not self._only_cli_available():
            raise WebClawError("The bundled only-cli discovery runtime is unavailable.")
        try:
            result = self.only_cli.run(
                command,
                arguments,
                timeout_seconds=min(self.timeout, 60),
            )
        except OnlyCliError as exc:
            raise WebClawError(f"only-cli could not complete the request: {exc}") from exc
        if result.status != "ok":
            message = redact_secrets(result.stderr.strip())[:1000]
            raise WebClawError(
                f"only-cli failed ({result.exit_code}): {message or result.status}"
            )
        try:
            payload = json.loads(result.stdout)
        except json.JSONDecodeError as exc:
            raise WebClawError(f"only-cli returned invalid JSON: {exc}") from exc
        if not isinstance(payload, dict):
            raise WebClawError("only-cli returned an unexpected JSON shape.")
        return payload

    @staticmethod
    def _only_cli_result_url(raw_url: str, base_url: str) -> str:
        """Unwrap public search redirects without retaining tracking parameters."""
        value = str(raw_url or "").strip()
        if value.startswith("//"):
            value = "https:" + value
        value = urllib.parse.urljoin(base_url, value)
        parts = urllib.parse.urlsplit(value)
        if parts.hostname and parts.hostname.casefold().endswith("duckduckgo.com"):
            target = urllib.parse.parse_qs(parts.query).get("uddg", [""])[0]
            if target:
                value = target
                parts = urllib.parse.urlsplit(value)
        if (
            parts.hostname
            and parts.hostname.casefold().endswith("bing.com")
            and parts.path.casefold().startswith("/ck/")
        ):
            encoded = urllib.parse.parse_qs(parts.query).get("u", [""])[0]
            if encoded.startswith("a1"):
                try:
                    value = base64.urlsafe_b64decode(
                        encoded[2:] + "=" * (-len(encoded[2:]) % 4)
                    ).decode("utf-8")
                    parts = urllib.parse.urlsplit(value)
                except (binascii.Error, UnicodeDecodeError, ValueError):
                    return ""
        if parts.scheme not in {"http", "https"} or not parts.hostname:
            return ""
        if parts.username or parts.password:
            return ""
        if (
            parts.hostname.casefold().endswith("linkedin.com")
            and parts.path.casefold().startswith("/jobs/view/")
        ):
            value = urllib.parse.urlunsplit(
                (parts.scheme, parts.netloc, parts.path, "", "")
            )
        return canonical_url(value)

    def _only_cli_search_payload(
        self,
        payload: dict[str, Any],
        *,
        num: int,
        linkedin_only: bool,
    ) -> list[dict[str, Any]]:
        """Normalize public only-cli search blocks into the discovery contract."""
        base_url = str(payload.get("url") or "https://html.duckduckgo.com/")
        blocks = payload.get("blocks", [])
        if not isinstance(blocks, list) or payload.get("empty") is True:
            return []
        if linkedin_only:
            candidates = [
                item for item in blocks
                if isinstance(item, dict)
                and item.get("type") == "link"
                and "/jobs/view/" in str(item.get("href") or "")
            ]
        else:
            candidates = [
                item for item in blocks
                if isinstance(item, dict)
                and item.get("type") == "heading"
                and item.get("href")
            ]
            if not candidates:
                candidates = [
                    item for item in blocks
                    if isinstance(item, dict)
                    and item.get("type") == "link"
                    and item.get("href")
                ]
        results: list[dict[str, Any]] = []
        seen: set[str] = set()
        for item in candidates:
            url = self._only_cli_result_url(str(item.get("href") or ""), base_url)
            if linkedin_only and "/jobs/view/" not in urllib.parse.urlsplit(url).path:
                continue
            if not url or url in seen:
                continue
            seen.add(url)
            results.append({
                "title": str(item.get("text") or "").strip(),
                "link": url,
                "snippet": "",
                "score": None,
            })
            if len(results) >= max(1, min(int(num), 10)):
                break
        return results

    def _only_cli_search(self, query: str, num: int) -> list[dict[str, Any]]:
        """Search public job listings, with general engines as bounded fallbacks."""
        attempts = [
            (["linkedin", "jobs", query, "--json", "--budget", "8000"], True),
            (["ddg", "search", query, "--json", "--budget", "2400"], False),
            (["bing", "search", query, "--json", "--budget", "2400"], False),
        ]
        errors: list[str] = []
        for arguments, linkedin_only in attempts:
            try:
                payload = self._only_cli_json("site", arguments)
            except WebClawError as exc:
                errors.append(str(exc))
                continue
            results = self._only_cli_search_payload(
                payload,
                num=num,
                linkedin_only=linkedin_only,
            )
            if results:
                return results
        if errors:
            raise WebClawError("Public job search backends failed: " + " | ".join(errors))
        return []

    def _only_cli_scrape(self, url: str) -> dict[str, Any]:
        """Convert only-cli's compact page JSON into the pipeline extraction shape."""
        payload = self._only_cli_json(
            "open",
            [url, "--json", "--budget", "8000"],
        )
        blocks = payload.get("blocks", [])
        if payload.get("empty") is True or not isinstance(blocks, list):
            raise WebClawError(f"only-cli found no readable content for {url}.")
        text_parts = [
            str(item.get("text") or "").strip()
            for item in blocks
            if isinstance(item, dict) and str(item.get("text") or "").strip()
        ]
        plain_text = "\n".join(text_parts)
        if not plain_text:
            raise WebClawError(f"only-cli found no readable content for {url}.")
        title = str(payload.get("title") or "").strip()
        structured_data: list[dict[str, Any]] = []
        final_url = str(payload.get("url") or url)
        final_parts = urllib.parse.urlsplit(final_url)
        if (
            final_parts.hostname
            and final_parts.hostname.casefold().endswith("linkedin.com")
            and final_parts.path.casefold().startswith("/jobs/view/")
        ):
            role = next((
                str(item.get("text") or "").strip()
                for item in blocks
                if isinstance(item, dict)
                and item.get("type") == "heading"
                and item.get("level") in {1, 3}
                and str(item.get("text") or "").strip()
            ), "")
            company = ""
            company_index = -1
            for index, item in enumerate(blocks):
                if (
                    isinstance(item, dict)
                    and item.get("type") == "link"
                    and "/company/" in str(item.get("href") or "")
                    and str(item.get("text") or "").strip()
                ):
                    company = str(item["text"]).strip()
                    company_index = index
                    break
            location = next((
                str(item.get("text") or "").strip()
                for item in blocks[company_index + 1:company_index + 5]
                if company_index >= 0
                and isinstance(item, dict)
                and item.get("type") == "text"
                and str(item.get("text") or "").strip()
            ), "")
            if role:
                posting: dict[str, Any] = {
                    "@type": "JobPosting",
                    "title": role,
                    "description": plain_text,
                }
                if company:
                    posting["hiringOrganization"] = {"name": company}
                if location:
                    posting["jobLocation"] = {
                        "address": {"addressLocality": location}
                    }
                    if "remote" in location.casefold():
                        posting["jobLocationType"] = "TELECOMMUTE"
                structured_data.append(posting)
        return {
            "url": final_url,
            "metadata": {"title": title, "description": plain_text[:500]},
            "content": {"plain_text": plain_text, "markdown": plain_text},
            "structured_data": structured_data,
        }

    def _run(self, args: list[str], stdin_text: str | None = None, timeout: int | None = None) -> str:
        """Run WebClaw safely, isolate stderr, redact secrets, and surface concise errors."""
        if not self.binary:
            raise WebClawError(
                "This operation needs external WebClaw, which is not installed."
            )
        command = [self.binary, *args]
        LOGGER.debug("Running WebClaw: %s", " ".join(command[:4]))
        try:
            result = subprocess.run(
                command,
                input=stdin_text,
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                timeout=timeout or self.timeout,
                check=False,
                env=os.environ.copy(),
            )
        except subprocess.TimeoutExpired as exc:
            raise WebClawError(f"WebClaw timed out after {exc.timeout} seconds.") from exc
        except OSError as exc:
            raise WebClawError(f"Could not start WebClaw: {exc}") from exc

        if result.stderr:
            LOGGER.debug("WebClaw stderr: %s", redact_secrets(result.stderr.strip()))
        if result.returncode != 0:
            message = redact_secrets(result.stderr.strip() or result.stdout.strip() or "unknown error")
            raise WebClawError(f"WebClaw failed ({result.returncode}): {message}")
        return result.stdout.strip()

    def version(self) -> str:
        """Return the active extraction backend version string."""
        if self.binary:
            return self._run(["--version"], timeout=15)
        if self._only_cli_available():
            return "only-cli (bundled MIT fallback)"
        raise WebClawError("Neither WebClaw nor the bundled only-cli runtime is available.")

    def search(
        self,
        query: str,
        num: int = 8,
        country: str | None = "us",
        language: str | None = "en",
    ) -> list[dict[str, Any]]:
        """Use Tavily when configured, otherwise use the bundled public-job reader."""
        tavily_key = os.environ.get("TAVILY_API_KEY", "").strip()
        if tavily_key:
            payload = json.dumps({
                "query": query, "search_depth": "basic", "topic": "general",
                "max_results": max(1, min(int(num), 10)),
                "include_answer": False, "include_raw_content": False,
            }).encode("utf-8")
            request = urllib.request.Request(
                "https://api.tavily.com/search", data=payload,
                headers={"Authorization": f"Bearer {tavily_key}", "Content-Type": "application/json", "Accept": "application/json"},
                method="POST",
            )
            try:
                with urllib.request.urlopen(request, timeout=45) as response:  # nosec B310
                    raw = response.read().decode("utf-8", errors="replace")
            except urllib.error.HTTPError as exc:
                detail = exc.read(1024).decode("utf-8", errors="replace")
                raise WebClawError(f"Tavily search returned HTTP {exc.code}: {redact_secrets(detail)}") from exc
            except (urllib.error.URLError, TimeoutError, OSError) as exc:
                raise WebClawError(f"Tavily search failed: {exc}") from exc
            try:
                result_payload = json.loads(raw)
            except json.JSONDecodeError as exc:
                raise WebClawError(f"Tavily search returned invalid JSON: {exc}") from exc
            results = result_payload.get("results", []) if isinstance(result_payload, dict) else []
            return [{"title": item.get("title", ""), "link": item.get("url", ""), "snippet": item.get("content", ""), "score": item.get("score")}
                    for item in results if isinstance(item, dict) and item.get("url")]
        if self._only_cli_available():
            return self._only_cli_search(query, num)
        raise WebClawError(
            "Discovery requires TAVILY_API_KEY or the bundled only-cli runtime."
        )

    def scrape(self, url: str) -> dict[str, Any]:
        """Extract one public page into WebClaw's JSON metadata/content structure."""
        self._validate_page_url(url)
        tavily_key = os.environ.get("TAVILY_API_KEY", "").strip()
        if tavily_key:
            request = urllib.request.Request(
                "https://api.tavily.com/extract",
                data=json.dumps({"urls": [url], "extract_depth": "basic"}).encode("utf-8"),
                headers={"Authorization": f"Bearer {tavily_key}", "Content-Type": "application/json", "Accept": "application/json"},
                method="POST",
            )
            try:
                with urllib.request.urlopen(request, timeout=min(self.timeout, 45)) as response:  # nosec B310
                    payload = json.loads(response.read().decode("utf-8", errors="replace"))
            except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, OSError, json.JSONDecodeError) as exc:
                raise WebClawError(f"Tavily extraction failed for {url}: {exc}") from exc
            results = payload.get("results", []) if isinstance(payload, dict) else []
            item = results[0] if results and isinstance(results[0], dict) else {}
            return {"url": item.get("url", url), "content": item.get("raw_content", item.get("content", "")), "title": item.get("title", "")}
        if self.binary:
            output = self._run(
                [url, "--format", "json", "--only-main-content", "--timeout", str(self.timeout)],
                timeout=self.timeout + 15,
            )
        elif self._only_cli_available():
            return self._only_cli_scrape(url)
        else:
            raise WebClawError(
                "Page extraction requires WebClaw, TAVILY_API_KEY, or bundled only-cli."
            )
        try:
            payload = json.loads(output)
        except json.JSONDecodeError as exc:
            raise WebClawError(f"Scrape returned invalid JSON for {url}: {exc}") from exc
        if not isinstance(payload, dict):
            raise WebClawError(f"Scrape returned an unexpected JSON shape for {url}.")
        return payload

    def probe(self, url: str, max_bytes: int = 524_288) -> dict[str, Any]:
        """Fetch a job URL without cache and expose its final redirect target.

        Search indexes and extraction caches can retain a full job description after
        the employer closes the requisition. This lightweight second channel makes
        redirect-to-index and explicit expiry responses visible to the verifier.
        """
        self._validate_page_url(url)
        request = urllib.request.Request(
            url,
            headers={
                "Accept": "text/html,application/xhtml+xml",
                "Cache-Control": "no-cache, no-store",
                "Pragma": "no-cache",
                "User-Agent": "Mozilla/5.0 (compatible; AIJobSearchPipeline/1.0)",
            },
            method="GET",
        )
        limit = max(1, min(int(max_bytes), 1_048_576))
        try:
            with urllib.request.urlopen(request, timeout=min(self.timeout, 30)) as response:  # nosec B310
                body = response.read(limit)
                return {
                    "requested_url": url,
                    "final_url": response.geturl(),
                    "status": int(getattr(response, "status", 200)),
                    "content_type": str(response.headers.get("Content-Type", "")),
                    "body": body.decode("utf-8", errors="replace"),
                }
        except urllib.error.HTTPError as exc:
            return {
                "requested_url": url,
                "final_url": exc.geturl(),
                "status": int(exc.code),
                "content_type": str(exc.headers.get("Content-Type", "")),
                "body": exc.read(limit).decode("utf-8", errors="replace"),
            }
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            raise WebClawError(f"Fresh application probe failed for {url}: {exc}") from exc

    def extract_json_from_text(
        self,
        text: str,
        schema_path: Path,
        provider: str | None = None,
        model: str | None = None,
        timeout: int = 120,
    ) -> dict[str, Any]:
        """Pass local HTML/text through WebClaw's schema-based optional LLM provider chain."""
        args = ["--stdin", "--extract-json", f"@{schema_path}"]
        if provider:
            args.extend(["--llm-provider", provider])
        if model:
            args.extend(["--llm-model", model])
        output = self._run(args, stdin_text=text, timeout=timeout)
        try:
            payload = json.loads(output)
        except json.JSONDecodeError as exc:
            raise WebClawError(f"LLM extraction returned invalid JSON: {exc}") from exc
        if not isinstance(payload, dict):
            raise WebClawError("LLM extraction returned an unexpected JSON shape.")
        return payload
