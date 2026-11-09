"""
Python 3.12+ Adapter for MCP Builder
Generates asynchronous, zero-dependency JSON-RPC 2.0 stdio MCP servers.
"""

import json
from typing import Dict, Any, List

class PythonAdapter:
    def validate_context(self, context: Dict[str, Any]) -> bool:
        if not context.get("server_name"):
            raise ValueError("O campo 'server_name' é obrigatório no contexto.")
        if "tools" not in context or not isinstance(context["tools"], list):
            raise ValueError("O campo 'tools' deve ser uma lista válida de ferramentas.")
        return True

    def generate_server(self, context: Dict[str, Any]) -> str:
        self.validate_context(context)
        server_name = context["server_name"]
        version = context.get("version", "1.0.0")
        tools_json = json.dumps(context["tools"], indent=2, ensure_ascii=False)

        code = f'''#!/usr/bin/env python3
"""
Servidor MCP Nativo Gerado por MCP Builder (Python 3.12+)
Protocolo: JSON-RPC 2.0 sobre stdio (sem dependências externas)
"""

import sys
import json
from datetime import datetime

SERVER_NAME = "{server_name}"
SERVER_VERSION = "{version}"
TOOLS = {tools_json}

def dispatch_tool(name: str, args: dict):
    # Ponto de injeção dos manipuladores de ferramentas da API
    return {{
        "status": "executado",
        "tool": name,
        "argumentos": args,
        "timestamp": datetime.now().isoformat()
    }}

def main():
    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            req = json.loads(line)
        except Exception:
            resp = {{"jsonrpc": "2.0", "id": None, "error": {{"code": -32700, "message": "Parse error"}}}}
            sys.stdout.write(json.dumps(resp) + "\\n")
            sys.stdout.flush()
            continue

        req_id = req.get("id")
        method = req.get("method")
        params = req.get("params", {{}})

        try:
            if method == "initialize":
                res = {{
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {{
                        "protocolVersion": "2024-11-05",
                        "capabilities": {{"tools": {{}}}},
                        "serverInfo": {{"name": SERVER_NAME, "version": SERVER_VERSION}}
                    }}
                }}
            elif method == "notifications/initialized":
                continue
            elif method == "tools/list":
                res = {{"jsonrpc": "2.0", "id": req_id, "result": {{"tools": TOOLS}}}}
            elif method == "tools/call":
                t_name = params.get("name")
                t_args = params.get("arguments", {{}})
                out = dispatch_tool(t_name, t_args)
                res = {{
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "result": {{
                        "content": [
                            {{"type": "text", "text": json.dumps(out, indent=2, ensure_ascii=False) if isinstance(out, (dict, list)) else str(out)}}
                        ]
                    }}
                }}
            elif method == "ping":
                res = {{"jsonrpc": "2.0", "id": req_id, "result": {{}}}}
            else:
                res = {{"jsonrpc": "2.0", "id": req_id, "error": {{"code": -32601, "message": f"Método não suportado: {{method}}"}}
                }}
            
            sys.stdout.write(json.dumps(res, ensure_ascii=False) + "\\n")
            sys.stdout.flush()
        except Exception as e:
            res = {{"jsonrpc": "2.0", "id": req_id, "error": {{"code": -32000, "message": str(e)}}}}
            sys.stdout.write(json.dumps(res, ensure_ascii=False) + "\\n")
            sys.stdout.flush()

if __name__ == "__main__":
    main()
'''
        return code

    def generate_client_config(self, server_path: str, env_vars: Dict[str, str] = None) -> Dict[str, Any]:
        return {
            "command": "python",
            "args": [server_path],
            "env": env_vars or {}
        }

