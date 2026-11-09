<?php
declare(strict_types=1);

namespace McpBuilder\Core;

/**
 * Interface obrigatória para geradores de servidores MCP em qualquer linguagem.
 */
interface MCPGeneratorInterface
{
    /**
     * Valida os metadados do MCP e as definições das ferramentas.
     *
     * @param array<string, mixed> $context Dados extraídos da documentação.
     * @return bool True se válido, lança exceção em caso de erro crítico.
     */
    public function validateContext(array $context): bool;

    /**
     * Gera o código-fonte completo do servidor MCP nativo.
     *
     * @param array<string, mixed> $context Metadados e ferramentas.
     * @return string Código-fonte gerado pronto para execução.
     */
    public function generateServer(array $context): string;

    /**
     * Gera o arquivo de configuração para o cliente MCP (JSON).
     *
     * @param string $serverFilePath Caminho absoluto ou relativo do script.
     * @param array<string, string> $envVars Variáveis de ambiente requeridas.
     * @return array<string, mixed> Estrutura pronta para mcp_config.json.
     */
    public function generateClientConfig(string $serverFilePath, array $envVars = []): array;
}

