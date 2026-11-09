#!/usr/bin/env python3
"""
Fail-Safe Issue Reporter for MCP Builder.
When a server generation or execution test fails, this script:
1. Sanitizes stack trace and error logs (purging secrets, tokens, system absolute paths).
2. Attempts to open an issue automatically on GitHub repository using GitHub CLI (gh) or fallback REST API.
"""

import sys
import os
import re
import subprocess
import json
import urllib.request
import urllib.error

REPO_DEFAULT = "CharlesCorreaDev/skills-ai"

def sanitize_log(text: str) -> str:
    """Removes sensitive tokens, local usernames and secrets from error logs."""
    # Redact common tokens
    text = re.sub(r"(?i)(token|key|secret|password|bearer)[=:\s]+['\"]?[A-Za-z0-9_\-\.]{12,}['\"]?", r"\1=[REDACTED]", text)
    # Generic home directory neutralization
    text = re.sub(r"[A-Za-z]:\\[Uu]sers\\[^\\]+", "C:/Users/<USER>", text)
    text = re.sub(r"/home/[^/]+", "/home/<USER>", text)
    return text

def report_issue(title: str, error_details: str, stack_lang: str, suggestion: str = "", repo: str = REPO_DEFAULT) -> dict:
    clean_error = sanitize_log(error_details)
    clean_title = f"[MCP-Builder Auto-Report] {title[:80]}"
    
    body = f"""### 🚨 Falha Reportada Automaticamente pelo MCP Builder

**Linguagem/Stack:** `{stack_lang}`
**Componente:** Servidor MCP Gerado

#### 📋 Detalhes do Erro Sanitizado:
```
{clean_error}
```

#### 💡 Sugestão de Resolução para Próxima Versão:
{suggestion if suggestion else "Analisar template de geração e tratar exceção na fase de validação."}

---
*Gerado automaticamente pelo módulo Fail-Safe da skill `mcp-builder` (v0.1.0-beta).*
"""

    # 1. Try using GitHub CLI (gh)
    try:
        cmd = [
            "gh", "issue", "create",
            "--repo", repo,
            "--title", clean_title,
            "--body", body,
            "--label", "bug,auto-reported,mcp-builder"
        ]
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
        if res.returncode == 0:
            issue_url = res.stdout.strip()
            return {"success": True, "method": "gh_cli", "issue_url": issue_url}
    except Exception as e:
        pass

    # 2. Try using GITHUB_TOKEN fallback via REST API
    github_token = os.getenv("GITHUB_TOKEN", "")
    if github_token:
        try:
            api_url = f"https://api.github.com/repos/{repo}/issues"
            payload = json.dumps({
                "title": clean_title,
                "body": body,
                "labels": ["bug", "auto-reported", "mcp-builder"]
            }).encode("utf-8")
            
            req = urllib.request.Request(api_url, data=payload, headers={
                "Authorization": f"Bearer {github_token}",
                "Accept": "application/vnd.github+json",
                "User-Agent": "MCP-Builder-FailSafe/1.0"
            }, method="POST")
            
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                return {"success": True, "method": "github_api", "issue_url": data.get("html_url")}
        except Exception as e:
            return {"success": False, "error": f"Falha ao chamar GitHub API: {str(e)}", "body": body}

    return {
        "success": False,
        "message": "GitHub CLI não autenticado e GITHUB_TOKEN ausente. Issue estruturada pronta para submissão manual.",
        "title": clean_title,
        "body": body
    }

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python issue_reporter.py <titulo> <erro> [linguagem] [sugestao]")
        sys.exit(1)
    
    t = sys.argv[1]
    err = sys.argv[2]
    lang = sys.argv[3] if len(sys.argv) > 3 else "unknown"
    sug = sys.argv[4] if len(sys.argv) > 4 else ""
    
    result = report_issue(t, err, lang, sug)
    sys.stdout.buffer.write((json.dumps(result, indent=2, ensure_ascii=False) + "\n").encode("utf-8"))
