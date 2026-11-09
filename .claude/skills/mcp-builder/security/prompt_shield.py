"""
PromptShield - Security Shield for Input Context & Output Code
Detects Prompt Injections, Leaked Secrets, and Common Vulnerabilities.
Zero external dependencies (uses standard python re module).
"""

import re
from typing import Dict, List, Tuple, Any

class PromptShield:
    # Heuristic jailbreak & prompt injection patterns
    INJECTION_PATTERNS = [
        r"(?i)ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|directives|rules)",
        r"(?i)disregard\s+(all\s+)?(previous|prior)\s+(instructions|system\s+prompts)",
        r"(?i)system\s+override",
        r"(?i)you\s+are\s+now\s+in\s+(developer|unrestricted|god|dan)\s+mode",
        r"(?i)do\s+anything\s+now",
        r"(?i)jailbreak",
        r"(?i)bypass\s+all\s+(security|safety|content)\s+(filters|policies|protocols)",
        r"(?i)output\s+the\s+entire\s+(system\s+prompt|hidden\s+prompt|context\s+window)",
        r"(?i)<\s*system\s*>",
        r"(?i)\[\s*system\s*\]"
    ]

    # Common credentials and secrets patterns (high entropy/keys)
    SECRET_PATTERNS = [
        (r"(?i)(api[_-]?key|secret[_-]?key|auth[_-]?token|access[_-]?token)\s*[:=]\s*['\"]([a-zA-Z0-9_\-]{16,})['\"]", "API/Secret Key"),
        (r"(?i)bearer\s+[a-zA-Z0-9_\-\.]{24,}", "Bearer Token"),
        (r"(?i)gh[pousr]_[A-Za-z0-9_]{36,}", "GitHub Token"),
        (r"(?i)xox[baprs]-[0-9a-zA-Z]{10,48}", "Slack Token"),
        (r"(?i)aws[_-]?(secret|access)[_-]?key[_-]?id?\s*[:=]\s*['\"]?[A-Za-z0-9/+=]{16,}['\"]?", "AWS Credential"),
        (r"-----BEGIN\s+(RSA|EC|DSA|OPENSSH)?\s*PRIVATE\s+KEY-----", "Private Key")
    ]

    # SAST Vulnerability signatures in generated code
    VULN_PATTERNS = [
        (r"(?i)(shell_exec|exec|system|passthru|popen)\s*\(\s*.*\$_(GET|POST|REQUEST)", "Command Injection via unsanitized input"),
        (r"(?i)child_process\.(exec|execSync)\s*\(\s*`[^`]*\$\{", "Unsafe Command Interpolation"),
        (r"(?i)subprocess\.(Popen|run|call)\s*\(\s*f?['\"].*shell\s*=\s*True", "Insecure shell=True in Subprocess"),
        (r"(?i)eval\s*\(", "Insecure eval() detected"),
        (r"(?i)(SELECT|INSERT|UPDATE|DELETE).*\+.*\$_(GET|POST|REQUEST)", "Possible SQL Injection concatenation")
    ]

    @classmethod
    def inspect_input(cls, text: str) -> Dict[str, Any]:
        """
        Scans input context or user prompt for prompt injection and sensitive secrets.
        """
        injections = []
        for pattern in cls.INJECTION_PATTERNS:
            match = re.search(pattern, text)
            if match:
                injections.append(match.group(0))

        secrets_found = []
        sanitized_text = text
        for pattern, secret_type in cls.SECRET_PATTERNS:
            matches = list(re.finditer(pattern, sanitized_text))
            for m in matches:
                secrets_found.append(secret_type)
                val = m.group(0)
                sanitized_text = sanitized_text.replace(val, f"[{secret_type.upper()}_REDACTED]")

        is_safe = len(injections) == 0 and len(secrets_found) == 0

        return {
            "safe": is_safe,
            "has_injection": len(injections) > 0,
            "injections": injections,
            "has_secrets": len(secrets_found) > 0,
            "secrets_detected": secrets_found,
            "sanitized_text": sanitized_text
        }

    @classmethod
    def inspect_output_code(cls, code: str) -> Dict[str, Any]:
        """
        Performs static analysis on generated MCP code to detect dangerous patterns.
        """
        findings = []
        for pattern, desc in cls.VULN_PATTERNS:
            matches = list(re.finditer(pattern, code))
            if matches:
                findings.append({
                    "description": desc,
                    "matched": [m.group(0) for m in matches[:3]]
                })

        return {
            "safe": len(findings) == 0,
            "findings_count": len(findings),
            "findings": findings
        }

