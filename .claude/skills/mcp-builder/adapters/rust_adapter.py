"""
Rust (Edition 2021+) Adapter for MCP Builder
Generates ultra-safe, high-performance JSON-RPC 2.0 stdio MCP servers in Rust.
Uses standard library io + serde/serde_json.
"""

import json
from typing import Dict, Any

class RustAdapter:
    def validate_context(self, context: Dict[str, Any]) -> bool:
        if not context.get("server_name"):
            raise ValueError("O campo 'server_name' é obrigatório no contexto.")
        if "tools" not in context or not isinstance(context["tools"], list):
            raise ValueError("O campo 'tools' deve ser uma lista válida de ferramentas.")
        return True

    def generate_cargo_toml(self, context: Dict[str, Any]) -> str:
        server_name = context.get("server_name", "mcp-server").lower().replace(" ", "-")
        return f'''[package]
name = "{server_name}"
version = "{context.get("version", "1.0.0")}"
edition = "2021"

[dependencies]
serde = {{ version = "1.0", features = ["derive"] }}
serde_json = "1.0"
chrono = {{ version = "0.4", features = ["serde"] }}
'''

    def generate_server(self, context: Dict[str, Any]) -> str:
        self.validate_context(context)
        server_name = context["server_name"]
        version = context.get("version", "1.0.0")
        tools_raw = json.dumps(context["tools"], indent=2, ensure_ascii=False)

        # Escape backslashes and quotes for Rust raw string literal
        escaped_tools = tools_raw.replace('"', '\\"')

        return f'''// Servidor MCP Nativo Gerado por MCP Builder (Rust Edition 2021+)
// Protocolo: JSON-RPC 2.0 sobre stdio

use std::io::{{self, BufRead, Write}};
use serde::{{Deserialize, Serialize}};
use serde_json::{{json, Value}};
use chrono::Utc;

const SERVER_NAME: &str = "{server_name}";
const SERVER_VERSION: &str = "{version}";
const TOOLS_JSON: &str = "{escaped_tools}";

#[derive(Deserialize, Debug)]
struct JsonRpcRequest {{
    #[serde(default)]
    jsonrpc: String,
    id: Option<Value>,
    method: String,
    #[serde(default)]
    params: Value,
}}

#[derive(Serialize, Debug)]
struct JsonRpcResponse {{
    jsonrpc: &'static str,
    id: Option<Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    result: Option<Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    error: Option<Value>,
}}

fn send_response(resp: JsonRpcResponse) {{
    if let Ok(serialized) = serde_json::to_string(&resp) {{
        let stdout = io::stdout();
        let mut handle = stdout.lock();
        let _ = writeln!(handle, "{{}}", serialized);
        let _ = handle.flush();
    }}
}}

fn dispatch_tool(name: &str, args: &Value) -> Value {{
    // Ponto de injeção dos manipuladores de ferramentas da API
    json!({{
        "status": "executado",
        "tool": name,
        "argumentos": args,
        "timestamp": Utc::now().to_rfc3339()
    }})
}}

fn main() -> io::Result<()> {{
    let stdin = io::stdin();
    let reader = stdin.lock();

    for line_result in reader.lines() {{
        let line = match line_result {{
            Ok(l) => l,
            Err(e) => {{
                eprintln!("Erro ao ler stdin: {{}}", e);
                break;
            }}
        }};

        let trimmed = line.trim();
        if trimmed.is_empty() {{
            continue;
        }}

        let req: JsonRpcRequest = match serde_json::from_str(trimmed) {{
            Ok(r) => r,
            Err(_) => {{
                send_response(JsonRpcResponse {{
                    jsonrpc: "2.0",
                    id: None,
                    result: None,
                    error: Some(json!({{ "code": -32700, "message": "Parse error: invalid JSON" }})),
                }});
                continue;
            }}
        }};

        match req.method.as_str() {{
            "initialize" => {{
                send_response(JsonRpcResponse {{
                    jsonrpc: "2.0",
                    id: req.id,
                    result: Some(json!({{
                        "protocolVersion": "2024-11-05",
                        "capabilities": {{ "tools": {{}} }},
                        "serverInfo": {{
                            "name": SERVER_NAME,
                            "version": SERVER_VERSION
                        }}
                    }})),
                    error: None,
                }});
            }}
            "notifications/initialized" => {{
                // Notificação do cliente, sem resposta
            }}
            "tools/list" => {{
                let tools_val: Value = serde_json::from_str(TOOLS_JSON).unwrap_or(json!([]));
                send_response(JsonRpcResponse {{
                    jsonrpc: "2.0",
                    id: req.id,
                    result: Some(json!({{ "tools": tools_val }})),
                    error: None,
                }});
            }}
            "tools/call" => {{
                let tool_name = req.params.get("name").and_then(|v| v.as_str()).unwrap_or("");
                let empty_args = json!({{}});
                let tool_args = req.params.get("arguments").unwrap_or(&empty_args);

                let out = dispatch_tool(tool_name, tool_args);
                let out_str = serde_json::to_string_pretty(&out).unwrap_or_default();

                send_response(JsonRpcResponse {{
                    jsonrpc: "2.0",
                    id: req.id,
                    result: Some(json!({{
                        "content": [
                            {{
                                "type": "text",
                                "text": out_str
                            }}
                        ]
                    }})),
                    error: None,
                }});
            }}
            "ping" => {{
                send_response(JsonRpcResponse {{
                    jsonrpc: "2.0",
                    id: req.id,
                    result: Some(json!({{}})),
                    error: None,
                }});
            }}
            _ => {{
                send_response(JsonRpcResponse {{
                    jsonrpc: "2.0",
                    id: req.id,
                    result: None,
                    error: Some(json!({{
                        "code": -32601,
                        "message": format!("Método não suportado: {{}}", req.method)
                    }})),
                }});
            }}
        }}
    }}

    Ok(())
}}
'''

    def generate_client_config(self, binary_or_cargo_dir: str, env_vars: Dict[str, str] = None) -> Dict[str, Any]:
        # Se for pasta do projeto Cargo, executa com cargo run; se for binário executável, executa direto
        if "Cargo.toml" in binary_or_cargo_dir or not binary_or_cargo_dir.endswith(".exe"):
            return {
                "command": "cargo",
                "args": ["run", "--release", "--manifest-path", f"{binary_or_cargo_dir}/Cargo.toml"],
                "env": env_vars or {}
            }
        return {
            "command": binary_or_cargo_dir,
            "args": [],
            "env": env_vars or {}
        }

