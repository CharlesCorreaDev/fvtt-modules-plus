"""
TypeScript 5.x Adapter for MCP Builder
Generates strongly-typed TypeScript MCP servers using ESM and native stdio JSON-RPC 2.0.
Can be executed via tsx, ts-node, bun or compiled with tsc.
"""

import json
from typing import Dict, Any

class TypeScriptAdapter:
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

        return f'''#!/usr/bin/env node
/**
 * Servidor MCP Nativo Gerado por MCP Builder (TypeScript 5.x ESM)
 * Protocolo: JSON-RPC 2.0 sobre stdio
 */

import readline from "node:readline";

interface McpTool {{
  name: string;
  description: string;
  inputSchema: {{
    type: string;
    properties: Record<string, unknown>;
    required?: string[];
  }};
}}

interface JsonRpcRequest {{
  jsonrpc: string;
  id?: string | number | null;
  method: string;
  params?: {{
    name?: string;
    arguments?: Record<string, unknown>;
    [key: string]: unknown;
  }};
}}

interface JsonRpcResponse {{
  jsonrpc: "2.0";
  id: string | number | null;
  result?: unknown;
  error?: {{
    code: number;
    message: string;
    data?: unknown;
  }};
}}

const SERVER_NAME: string = {json.dumps(server_name)};
const SERVER_VERSION: string = {json.dumps(version)};
const TOOLS: McpTool[] = {tools_json};

function dispatchTool(name: string, args: Record<string, unknown>): unknown {{
  // Ponto de injeção dos manipuladores de ferramentas da API
  return {{
    status: "executado",
    tool: name,
    argumentos: args,
    timestamp: new Date().toISOString()
  }};
}}

const rl = readline.createInterface({{
  input: process.stdin,
  output: process.stdout,
  terminal: false
}});

rl.on("line", (line: string) => {{
  const trimmed = line.trim();
  if (!trimmed) return;

  let req: JsonRpcRequest;
  try {{
    req = JSON.parse(trimmed) as JsonRpcRequest;
  }} catch (err) {{
    const parseError: JsonRpcResponse = {{
      jsonrpc: "2.0",
      id: null,
      error: {{ code: -32700, message: "Parse error: invalid JSON" }}
    }};
    process.stdout.write(JSON.stringify(parseError) + "\\n");
    return;
  }}

  const id = req.id ?? null;
  const method = req.method;
  const params = req.params ?? {{}};

  try {{
    if (method === "initialize") {{
      const resp: JsonRpcResponse = {{
        jsonrpc: "2.0",
        id,
        result: {{
          protocolVersion: "2024-11-05",
          capabilities: {{ tools: {{}} }},
          serverInfo: {{ name: SERVER_NAME, version: SERVER_VERSION }}
        }}
      }};
      process.stdout.write(JSON.stringify(resp) + "\\n");
    }} else if (method === "notifications/initialized") {{
      // Notificação do cliente
    }} else if (method === "tools/list") {{
      const resp: JsonRpcResponse = {{
        jsonrpc: "2.0",
        id,
        result: {{ tools: TOOLS }}
      }};
      process.stdout.write(JSON.stringify(resp) + "\\n");
    }} else if (method === "tools/call") {{
      const toolName = params.name ?? "";
      const toolArgs = params.arguments ?? {{}};
      const out = dispatchTool(toolName, toolArgs);

      const resp: JsonRpcResponse = {{
        jsonrpc: "2.0",
        id,
        result: {{
          content: [
            {{
              type: "text",
              text: typeof out === "string" ? out : JSON.stringify(out, null, 2)
            }}
          ]
        }}
      }};
      process.stdout.write(JSON.stringify(resp) + "\\n");
    }} else if (method === "ping") {{
      const resp: JsonRpcResponse = {{ jsonrpc: "2.0", id, result: {{}} }};
      process.stdout.write(JSON.stringify(resp) + "\\n");
    }} else {{
      const resp: JsonRpcResponse = {{
        jsonrpc: "2.0",
        id,
        error: {{ code: -32601, message: `Método não suportado: ${{method}}` }}
      }};
      process.stdout.write(JSON.stringify(resp) + "\\n");
    }}
  }} catch (e: unknown) {{
    const errMessage = e instanceof Error ? e.message : "Erro interno";
    const resp: JsonRpcResponse = {{
      jsonrpc: "2.0",
      id,
      error: {{ code: -32000, message: errMessage }}
    }};
    process.stdout.write(JSON.stringify(resp) + "\\n");
  }}
}});
'''

    def generate_client_config(self, server_path: str, env_vars: Dict[str, str] = None) -> Dict[str, Any]:
        return {
            "command": "npx",
            "args": ["-y", "tsx", server_path],
            "env": env_vars or {}
        }

