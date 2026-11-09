"""
Go (Golang 1.22+) Adapter for MCP Builder
Generates compiled or 'go run' high-performance JSON-RPC 2.0 stdio MCP servers.
Uses standard library encoding/json and bufio (zero third-party dependencies).
"""

import json
from typing import Dict, Any

class GoAdapter:
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
        tools_raw = json.dumps(context["tools"], indent=2, ensure_ascii=False)

        # Backticks in tools_raw need safe embedding in Go raw string
        escaped_tools = tools_raw.replace('`', '` + "`" + `')

        return f'''package main

/*
 * Servidor MCP Nativo Gerado por MCP Builder (Go 1.22+)
 * Protocolo: JSON-RPC 2.0 sobre stdio (Standard Library pura, zero dependências externas)
 */

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"
)

const (
	ServerName    = "{server_name}"
	ServerVersion = "{version}"
)

type JSONRPCRequest struct {{
	JSONRPC string          `json:"jsonrpc"`
	ID      interface{{}}     `json:"id,omitempty"`
	Method  string          `json:"method"`
	Params  json.RawMessage `json:"params,omitempty"`
}}

type JSONRPCResponse struct {{
	JSONRPC string      `json:"jsonrpc"`
	ID      interface{{}} `json:"id"`
	Result  interface{{}} `json:"result,omitempty"`
	Error   *RPCError   `json:"error,omitempty"`
}}

type RPCError struct {{
	Code    int    `json:"code"`
	Message string `json:"message"`
}}

type ToolCallParams struct {{
	Name      string                 `json:"name"`
	Arguments map[string]interface{{}} `json:"arguments"`
}}

type ContentItem struct {{
	Type string `json:"type"`
	Text string `json:"text"`
}}

type ToolCallResult struct {{
	Content []ContentItem `json:"content"`
}}

var toolsJSON = `{escaped_tools}`

func dispatchTool(name string, args map[string]interface{{}}) interface{{}} {{
	// Ponto de injeção dos manipuladores de ferramentas da API
	return map[string]interface{{}}{{
		"status":     "executado",
		"tool":       name,
		"argumentos": args,
		"timestamp":  time.Now().Format(time.RFC3339),
	}}
}}

func sendResponse(resp JSONRPCResponse) {{
	bytes, err := json.Marshal(resp)
	if err != nil {{
		fmt.Fprintf(os.Stderr, "Erro ao serializar resposta JSON-RPC: %v\\n", err)
		return
	}}
	os.Stdout.Write(bytes)
	os.Stdout.WriteString("\\n")
}}

func main() {{
	scanner := bufio.NewScanner(os.Stdin)

	// Buffer grande para payloads extensos
	buf := make([]byte, 1024*1024)
	scanner.Buffer(buf, 10*1024*1024)

	for scanner.Scan() {{
		line := strings.TrimSpace(scanner.Text())
		if line == "" {{
			continue
		}}

		var req JSONRPCRequest
		if err := json.Unmarshal([]byte(line), &req); err != nil {{
			sendResponse(JSONRPCResponse{{
				JSONRPC: "2.0",
				ID:      nil,
				Error:   &RPCError{{Code: -32700, Message: "Parse error: invalid JSON"}},
			}})
			continue
		}}

		switch req.Method {{
		case "initialize":
			sendResponse(JSONRPCResponse{{
				JSONRPC: "2.0",
				ID:      req.ID,
				Result: map[string]interface{{}}{{
					"protocolVersion": "2024-11-05",
					"capabilities":    map[string]interface{{}}{{"tools": map[string]interface{{}}{{}}}},
					"serverInfo": map[string]string{{
						"name":    ServerName,
						"version": ServerVersion,
					}},
				}},
			}})
		case "notifications/initialized":
			// Notificação do cliente, nenhuma resposta exigida
		case "tools/list":
			var toolsList interface{{}}
			_ = json.Unmarshal([]byte(toolsJSON), &toolsList)
			sendResponse(JSONRPCResponse{{
				JSONRPC: "2.0",
				ID:      req.ID,
				Result:  map[string]interface{{}}{{"tools": toolsList}},
			}})
		case "tools/call":
			var callParams ToolCallParams
			if err := json.Unmarshal(req.Params, &callParams); err != nil {{
				sendResponse(JSONRPCResponse{{
					JSONRPC: "2.0",
					ID:      req.ID,
					Error:   &RPCError{{Code: -32602, Message: "Invalid params"}},
				}})
				continue
			}}

			out := dispatchTool(callParams.Name, callParams.Arguments)
			outBytes, _ := json.MarshalIndent(out, "", "  ")

			sendResponse(JSONRPCResponse{{
				JSONRPC: "2.0",
				ID:      req.ID,
				Result: ToolCallResult{{
					Content: []ContentItem{{
						Type: "text",
						Text: string(outBytes),
					}},
				}},
			}})
		case "ping":
			sendResponse(JSONRPCResponse{{
				JSONRPC: "2.0",
				ID:      req.ID,
				Result:  map[string]interface{{}}{{}},
			}})
		default:
			sendResponse(JSONRPCResponse{{
				JSONRPC: "2.0",
				ID:      req.ID,
				Error: &RPCError{{
					Code:    -32601,
					Message: fmt.Sprintf("Método não suportado: %s", req.Method),
				}},
			}})
		}}
	}}

	if err := scanner.Err(); err != nil {{
		fmt.Fprintf(os.Stderr, "Erro ao ler entrada padrão: %v\\n", err)
	}}
}}
'''

    def generate_client_config(self, binary_or_main_path: str, env_vars: Dict[str, str] = None) -> Dict[str, Any]:
        # Se for arquivo .go, executa via 'go run'; se for binário compilado, executa diretamente
        if binary_or_main_path.endswith(".go"):
            return {
                "command": "go",
                "args": ["run", binary_or_main_path],
                "env": env_vars or {}
            }
        return {
            "command": binary_or_main_path,
            "args": [],
            "env": env_vars or {}
        }

