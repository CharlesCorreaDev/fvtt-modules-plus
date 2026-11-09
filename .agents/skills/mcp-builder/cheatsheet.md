# MCP Builder - Cheatsheet & Tabela Rápida 🛠️⚡

## Estrutura de Mensagens JSON-RPC 2.0 (MCP Specification)

### 1. Handshake de Inicialização (`initialize`)
```json
// Requisição do Cliente
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": { "tools": {} },
    "clientInfo": { "name": "antigravity", "version": "1.0.0" }
  }
}

// Resposta do Servidor
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2024-11-05",
    "capabilities": { "tools": {} },
    "serverInfo": { "name": "meu-servidor-mcp", "version": "1.0.0" }
  }
}
```

### 2. Confirmação (`notifications/initialized`)
```json
{
  "jsonrpc": "2.0",
  "method": "notifications/initialized"
}
```

### 3. Listagem de Ferramentas (`tools/list`)
```json
// Resposta do Servidor
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "tools": [
      {
        "name": "nome_da_ferramenta",
        "description": "Explicação clara para a IA de quando e como acionar.",
        "inputSchema": {
          "type": "object",
          "properties": {
            "parametro1": { "type": "string", "description": "Descrição do parâmetro" }
          },
          "required": ["parametro1"]
        }
      }
    ]
  }
}
```

### 4. Execução de Ferramenta (`tools/call`)
```json
// Requisição do Cliente
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "nome_da_ferramenta",
    "arguments": { "parametro1": "valor" }
  }
}

// Resposta do Servidor
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Resultado textual ou JSON stringificado"
      }
    ]
  }
}
```

---

## Tabela de Stacks & Runtimes Suportados

| Runtime | Requisito Mínimo | Protocolo Padrão | Framework Opcional |
| :--- | :--- | :--- | :--- |
| **PHP** | **PHP 8.4+** | `stdio` nativo (`php://stdin`, `php://stdout`) | FlightPHP v3 / PDO |
| **Python** | **Python 3.12+** | `stdio` nativo (`sys.stdin`, `sys.stdout`) | FastMCP / Starlette |
| **Node.js** | **Node.js 22+** | `stdio` nativo (`readline`, `process.stdout`) | ESM nativo puro |
| **TypeScript** | **TypeScript 5+** | `stdio` nativo (interfaces estritas) | tsx / ts-node / bun |
| **Go** | **Go 1.22+** | `stdio` nativo (`bufio.Scanner`, `encoding/json`) | Stdlib pura (sem dependências) |
| **Rust** | **Rust Edition 2021+** | `stdio` nativo (`io::stdin`, `io::stdout`) | `serde_json` |
| **JavaScript** | **Deno / Bun / Node** | `stdio` | Vanilla JS |

