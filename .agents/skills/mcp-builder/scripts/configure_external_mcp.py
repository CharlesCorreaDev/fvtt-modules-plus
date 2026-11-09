#!/usr/bin/env python3
"""
External MCP Configurator
Configures third-party or existing MCP servers into Antigravity IDE, Claude Desktop, or Cursor configuration files.
"""

import sys
import os
import json
from typing import Dict, Any

SUPPORTED_TARGETS = {
    "antigravity": os.path.expanduser("~/.gemini/antigravity/mcp_config.json"),
    "claude_desktop": os.path.expandvars(r"%APPDATA%\Claude\claude_desktop_config.json"),
    "cursor": ".cursor/mcp.json"
}

def load_or_init_config(path: str) -> dict:
    if os.path.exists(path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {"mcpServers": {}}
    return {"mcpServers": {}}

def add_mcp_server(target: str, server_id: str, command: str, args: list, env: dict = None, custom_path: str = None) -> dict:
    target_key = target.lower()
    config_path = custom_path or SUPPORTED_TARGETS.get(target_key)
    
    if not config_path:
        return {"success": False, "error": f"Target desconhecido '{target}'. Suportados: antigravity, claude_desktop, cursor"}

    config = load_or_init_config(config_path)
    if "mcpServers" not in config:
        config["mcpServers"] = {}

    config["mcpServers"][server_id] = {
        "command": command,
        "args": args,
        "env": env or {}
    }

    os.makedirs(os.path.dirname(os.path.abspath(config_path)), exist_ok=True)
    with open(config_path, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2, ensure_ascii=False)

    return {
        "success": True,
        "target": target_key,
        "config_path": config_path,
        "server_id": server_id
    }

if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Uso: python configure_external_mcp.py <target> <server_id> <command> <args_json> [env_json]")
        sys.exit(1)

    tgt = sys.argv[1]
    s_id = sys.argv[2]
    cmd = sys.argv[3]
    args_list = json.loads(sys.argv[4])
    env_dict = json.loads(sys.argv[5]) if len(sys.argv) > 5 else {}

    res = add_mcp_server(tgt, s_id, cmd, args_list, env_dict)
    sys.stdout.buffer.write((json.dumps(res, indent=2, ensure_ascii=False) + "\n").encode("utf-8"))

