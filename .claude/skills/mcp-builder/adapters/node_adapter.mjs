/**
 * Node.js 22+ Adapter for MCP Builder
 * Generates modern ECMAScript Module (ESM) JSON-RPC 2.0 stdio MCP servers.
 */

class NodeAdapter {
  validateContext(context) {
    if (!context || !context.server_name) {
      throw new Error('O campo "server_name" é obrigatório no contexto.');
    }
    if (!Array.isArray(context.tools)) {
      throw new Error('O campo "tools" deve ser um array válido de ferramentas.');
    }
    return true;
  }

  generateServer(context) {
    this.validateContext(context);
    const serverName = context.server_name;
    const version = context.version || '1.0.0';
    const toolsJson = JSON.stringify(context.tools, null, 2);

    return `#!/usr/bin/env node
/**
 * Servidor MCP Nativo Gerado por MCP Builder (Node.js 22+ ESM)
 * Protocolo: JSON-RPC 2.0 sobre stdio (sem dependências externas)
 */

import readline from 'node:readline';

const SERVER_NAME = ${JSON.stringify(serverName)};
const SERVER_VERSION = ${JSON.stringify(version)};
const TOOLS = ${toolsJson};

function dispatchTool(name, args) {
  // Ponto de injeção dos manipuladores de ferramentas da API
  return {
    status: 'executado',
    tool: name,
    argumentos: args,
    timestamp: new Date().toISOString()
  };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  let req;
  try {
    req = JSON.parse(trimmed);
  } catch (err) {
    process.stdout.write(JSON.stringify({
      jsonrpc: '2.0',
      id: null,
      error: { code: -32700, message: 'Parse error: invalid JSON' }
    }) + '\\n');
    return;
  }

  const { id, method, params } = req;

  try {
    if (method === 'initialize') {
      process.stdout.write(JSON.stringify({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: SERVER_NAME, version: SERVER_VERSION }
        }
      }) + '\\n');
    } else if (method === 'notifications/initialized') {
      // Notificação do cliente, sem resposta requerida
    } else if (method === 'tools/list') {
      process.stdout.write(JSON.stringify({
        jsonrpc: '2.0',
        id,
        result: { tools: TOOLS }
      }) + '\\n');
    } else if (method === 'tools/call') {
      const toolName = params?.name;
      const toolArgs = params?.arguments || {};
      const out = dispatchTool(toolName, toolArgs);

      process.stdout.write(JSON.stringify({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: typeof out === 'string' ? out : JSON.stringify(out, null, 2)
            }
          ]
        }
      }) + '\\n');
    } else if (method === 'ping') {
      process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, result: {} }) + '\\n');
    } else {
      process.stdout.write(JSON.stringify({
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: \`Método não suportado: \${method}\` }
      }) + '\\n');
    }
  } catch (e) {
    process.stdout.write(JSON.stringify({
      jsonrpc: '2.0',
      id,
      error: { code: -32000, message: e.message || 'Erro interno' }
    }) + '\\n');
  }
});
`;
  }

  generateClientConfig(serverPath, envVars = {}) {
    return {
      command: 'node',
      args: [serverPath],
      env: envVars
    };
  }
}

export { NodeAdapter };

