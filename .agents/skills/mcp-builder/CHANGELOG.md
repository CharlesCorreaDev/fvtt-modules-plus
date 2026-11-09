# Changelog - MCP Builder 🛠️⚡

Todas as alterações notáveis na skill **mcp-builder** serão documentadas neste arquivo.

O formato é baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [0.1.0-beta] - 2026-11-04

### Adicionado / Added
- **Fundação da Skill (`mcp-builder`):**
  - Diretrizes mestras no `SKILL.md` para agentes de IA atuarem como engenheiros e arquitetos de protocolos MCP.
  - Espelhamento automático para o diretório `.agents/skills/mcp-builder/SKILL.md`.
- **Security Shield (Blindagem de Segurança e Anti-Prompt Injection):**
  - Motor de detecção e contenção de injeções de prompt (`security/prompt_shield.py`), jailbreaks e escapes de delimitadores em documentações de entrada.
  - Scanner de credenciais e alta entropia para prevenir vazamento acidental de tokens e API keys.
  - Analisador estático (SAST) para validar código de MCPs gerados contra falhas de segurança (SQLi, XSS, Path Traversal, SSRF, Command Injection).
- **Adapters de Código Multilinguagem:**
  - **PHP 8.4+ Adapter**: Suporte a tipagem estrita, classes `readonly`, enums, FlightPHP v3 e JSON-RPC 2.0 via `stdio`.
  - **Python 3.12+ Adapter**: Async-first, suporte a stdio puro e FastMCP.
  - **Node.js 22+ Adapter**: Padrão ECMAScript Modules (ESM) nativo sem dependências inchadas.
  - **TypeScript 5+ Adapter** (`adapters/typescript_adapter.py`): Geração com interfaces estritas para schemas, requisições e respostas JSON-RPC 2.0.
  - **Go 1.22+ Adapter** (`adapters/go_adapter.py`): Standard library pura (`bufio`, `encoding/json`), buffer de 10MB para payloads grandes e concorrência nativa.
  - **Rust 2021+ Adapter** (`adapters/rust_adapter.py`): Segurança estrita de tipos e memória com `serde` e `serde_json`, locking de I/O em stdout e compilação de binário de alta performance.
- **Fail-Safe & Auto Issue Reporter (`scripts/issue_reporter.py`):**
  - Monitoramento de falhas em tempo de compilação ou teste de handshake do servidor MCP.
  - Comunicação transparente ao usuário no chat com abertura automática em segundo plano de Issue no repositório GitHub oficial (`CharlesCorreaDev/skills-ai`) com diagnóstico estruturado e proposta de solução.
- **Self-Updater & Monitor de Atualizações (`scripts/check_updates.py`):**
  - Verificação de novas versões da skill no GitHub Releases com cache TTL e notificação ao usuário.
- **Configurador de MCPs Externos (`scripts/configure_external_mcp.py`):**
  - Assistente para configuração automática de MCPs no Antigravity IDE (`mcp_config.json`), Claude Desktop e Cursor.
- **Documentação de Engenharia:**
  - `cheatsheet.md`: Tabela rápida de templates, métodos JSON-RPC e validações.
  - `patterns.md`: Padrões arquiteturais de servidores MCP (stdio vs sse, buffer pooling, sanitização de inputs).
  - `glossary.md`: Glossário técnico com os principais termos da especificação Model Context Protocol.
