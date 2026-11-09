<?php
declare(strict_types=1);

namespace McpBuilder\Adapters;

use McpBuilder\Core\MCPGeneratorInterface;

/**
 * Gerador de Servidor MCP Nativo para PHP 8.4+.
 * Utiliza tipagem estrita, enums, JSON-RPC 2.0 sobre stdio e zero dependências.
 */
class Php84Adapter implements MCPGeneratorInterface
{
    public function validateContext(array $context): bool
    {
        if (empty($context['server_name'])) {
            throw new \InvalidArgumentException('Nome do servidor MCP (server_name) é obrigatório.');
        }
        if (!isset($context['tools']) || !is_array($context['tools'])) {
            throw new \InvalidArgumentException('Lista de ferramentas (tools) é obrigatória.');
        }
        return true;
    }

    public function generateServer(array $context): string
    {
        $this->validateContext($context);

        $serverName = addslashes((string)$context['server_name']);
        $version = addslashes((string)($context['version'] ?? '1.0.0'));
        $toolsJson = json_encode($context['tools'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        return <<<PHP
<?php
declare(strict_types=1);

/**
 * Servidor MCP Nativo Gerado por MCP Builder (PHP 8.4+)
 * Protocolo: JSON-RPC 2.0 sobre stdio (sem dependências externas)
 */

namespace GeneratedMcp;

class McpServer
{
    private const string SERVER_NAME = '{$serverName}';
    private const string SERVER_VERSION = '{$version}';

    /**
     * @var array<int, array<string, mixed>>
     */
    private array \$tools = {$toolsJson};

    public function run(): void
    {
        \$stdin = fopen('php://stdin', 'r');
        if (!\$stdin) {
            error_log('Não foi possível abrir o canal php://stdin');
            exit(1);
        }

        while ((\$line = fgets(\$stdin)) !== false) {
            \$line = trim(\$line);
            if (\$line === '') {
                continue;
            }

            \$req = json_decode(\$line, true);
            if (json_last_error() !== JSON_ERROR_NONE || !is_array(\$req)) {
                \$this->sendResponse([
                    'jsonrpc' => '2.0',
                    'id' => null,
                    'error' => ['code' => -32700, 'message' => 'Parse error: invalid JSON']
                ]);
                continue;
            }

            \$id = \$req['id'] ?? null;
            \$method = \$req['method'] ?? '';
            \$params = \$req['params'] ?? [];

            \$this->handleRequest(\$id, \$method, \$params);
        }

        fclose(\$stdin);
    }

    private function handleRequest(mixed \$id, string \$method, array \$params): void
    {
        match (\$method) {
            'initialize' => \$this->sendResponse([
                'jsonrpc' => '2.0',
                'id' => \$id,
                'result' => [
                    'protocolVersion' => '2024-11-05',
                    'capabilities' => ['tools' => new \stdClass()],
                    'serverInfo' => [
                        'name' => self::SERVER_NAME,
                        'version' => self::SERVER_VERSION
                    ]
                ]
            ]),
            'notifications/initialized' => null, // Notificação do cliente
            'tools/list' => \$this->sendResponse([
                'jsonrpc' => '2.0',
                'id' => \$id,
                'result' => ['tools' => \$this->tools]
            ]),
            'tools/call' => \$this->executeTool(\$id, (string)(\$params['name'] ?? ''), \$params['arguments'] ?? []),
            'ping' => \$this->sendResponse(['jsonrpc' => '2.0', 'id' => \$id, 'result' => new \stdClass()]),
            default => \$this->sendResponse([
                'jsonrpc' => '2.0',
                'id' => \$id,
                'error' => ['code' => -32601, 'message' => "Método não suportado: {\$method}"]
            ])
        };
    }

    private function executeTool(mixed \$id, string \$toolName, array \$args): void
    {
        try {
            // Ponto de injeção dos manipuladores de ferramentas da API
            \$output = \$this->dispatch(\$toolName, \$args);

            \$this->sendResponse([
                'jsonrpc' => '2.0',
                'id' => \$id,
                'result' => [
                    'content' => [
                        [
                            'type' => 'text',
                            'text' => is_string(\$output) ? \$output : json_encode(\$output, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
                        ]
                    ]
                ]
            ]);
        } catch (\\Throwable \$e) {
            \$this->sendResponse([
                'jsonrpc' => '2.0',
                'id' => \$id,
                'error' => ['code' => -32000, 'message' => \$e->getMessage()]
            ]);
        }
    }

    private function dispatch(string \$toolName, array \$args): mixed
    {
        // Implementação base default: ecoar parâmetros ou delegar ao método
        return [
            'status' => 'executado',
            'tool' => \$toolName,
            'argumentos' => \$args,
            'timestamp' => date('Y-m-d H:i:s')
        ];
    }

    private function sendResponse(array \$payload): void
    {
        fwrite(STDOUT, json_encode(\$payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . PHP_EOL);
        fflush(STDOUT);
    }
}

// Execução direta via CLI stdio
if (php_sapi_name() === 'cli') {
    (new McpServer())->run();
}
PHP;
    }

    public function generateClientConfig(string $serverFilePath, array $envVars = []): array
    {
        return [
            'command' => 'php',
            'args' => [$serverFilePath],
            'env' => $envVars
        ];
    }
}

