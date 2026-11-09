#!/usr/bin/env python3
"""
Check Updates & Self-Updater for MCP Builder
Queries GitHub Releases / Tags to verify if a new skill version exists.
"""

import sys
import os
import json
import urllib.request
import urllib.error

REPO = "CharlesCorreaDev/skills-ai"
CURRENT_VERSION_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), "VERSION")

def get_local_version() -> str:
    if os.path.exists(CURRENT_VERSION_FILE):
        with open(CURRENT_VERSION_FILE, "r", encoding="utf-8") as f:
            return f.read().strip()
    return "0.1.0-beta"

def check_remote_version() -> dict:
    local_ver = get_local_version()
    api_url = f"https://api.github.com/repos/{REPO}/releases/latest"
    
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "MCP-Builder-Updater/1.0"
    }
    
    token = os.getenv("GITHUB_TOKEN", "")
    if token:
        headers["Authorization"] = f"Bearer {token}"
        
    try:
        req = urllib.request.Request(api_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            remote_tag = data.get("tag_name", "").lstrip("v")
            html_url = data.get("html_url", "")
            notes = data.get("body", "")
            
            has_update = remote_tag and remote_tag != local_ver
            return {
                "checked": True,
                "local_version": local_ver,
                "remote_version": remote_tag,
                "has_update": has_update,
                "release_url": html_url,
                "release_notes": notes[:300] + "..." if len(notes) > 300 else notes
            }
    except Exception as e:
        return {
            "checked": False,
            "local_version": local_ver,
            "error": str(e),
            "message": "Não foi possível verificar versões no GitHub no momento."
        }

if __name__ == "__main__":
    res = check_remote_version()
    sys.stdout.buffer.write((json.dumps(res, indent=2, ensure_ascii=False) + "\n").encode("utf-8"))

