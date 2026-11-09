# MCP Builder — Model Context Protocol Architect & Security Shield 🛠️🛡️

> **Universal MCP Server Generator, Security Hardener, and Orchestrator**  
> *Gerador, Blindador de Segurança e Configurador Universal de Servidores Model Context Protocol*  
> **Versão / Version: v0.1.0-beta**

---

## 🇧🇷 Português

### 📌 Visão Geral
O **MCP Builder** é uma suíte de engenharia de software e inteligência artificial criada para projetar, gerar, blindar e configurar servidores **Model Context Protocol (MCP)** nativos e seguros em **PHP (8.4+)**, **Python (3.12+)**, **Node.js (22+) / JavaScript**, **TypeScript (5+)**, **Go (1.22+)** e **Rust (2021+)**.

Ela resolve os principais gargalos no ecossistema de MCPs:
1. **Geração Automatizada Sem Dependências Inchadas:** Converte qualquer documentação de API, código legado ou especificação OpenAPI em servidores MCP ultraleves via protocolo padrão `stdio` JSON-RPC 2.0.
2. **Security Shield Transversal:** Protege contra ataques de Prompt Injection em documentações recebidas, remove segredos acidentalmente expostos e faz análise estática (SAST) no código gerado.
3. **Resiliência Fail-Safe com Abertura Automática de Issues:** Se o MCP gerado falhar no handshake ou na validação, o usuário é avisado no chat e uma issue é criada em segundo plano no GitHub com o log do erro sanitizado e proposta de correção.
4. **Monitor de Versão e Auto-Update:** Checa constantemente novas releases da skill e de suas dependências.
5. **Configurador de MCPs Externos:** Automatiza a injeção de MCPs prontos no **Antigravity IDE**, **Claude Desktop** e **Cursor**.

---

### 🌐 Módulos e Componentes

| Módulo | Caminho | Descrição |
| :--- | :--- | :--- |
| **Skill Principal** | [`SKILL.md`](SKILL.md) | Diretrizes obrigatórias para agentes de IA |
| **Security Shield** | [`security/prompt_shield.py`](security/prompt_shield.py) | Detector de injeções de prompt e analisador SAST |
| **Fail-Safe Reporter** | [`scripts/issue_reporter.py`](scripts/issue_reporter.py) | Abertura automática de issues sanitizadas no GitHub |
| **Verificador de Atualizações** | [`scripts/check_updates.py`](scripts/check_updates.py) | Checagem de versão upstream no GitHub |
| **Configurador de MCPs** | [`scripts/configure_external_mcp.py`](scripts/configure_external_mcp.py) | Injeção em arquivos de configuração locais |
| **Adapter PHP 8.4+** | [`adapters/Php84Adapter.php`](adapters/Php84Adapter.php) | Gerador nativo PHP 8.4+ com tipagem estrita |
| **Adapter Python 3.12+** | [`adapters/python_adapter.py`](adapters/python_adapter.py) | Gerador nativo Python async-first |
| **Adapter Node.js 22+** | [`adapters/node_adapter.mjs`](adapters/node_adapter.mjs) | Gerador nativo Node.js ESM |
| **Adapter TypeScript 5+**| [`adapters/typescript_adapter.py`](adapters/typescript_adapter.py) | Gerador nativo TypeScript 5+ fortemente tipado |
| **Adapter Go 1.22+** | [`adapters/go_adapter.py`](adapters/go_adapter.py) | Gerador nativo Go com standard library pura |
| **Adapter Rust 2021+** | [`adapters/rust_adapter.py`](adapters/rust_adapter.py) | Gerador nativo Rust com `serde_json` |
| **Cheatsheet Rápido** | [`cheatsheet.md`](cheatsheet.md) | Tabela de métodos e mensagens JSON-RPC |
| **Padrões & Boas Práticas**| [`patterns.md`](patterns.md) | Padrões arquiteturais e blindagem |
| **Glossário** | [`glossary.md`](glossary.md) | Definições e vocabulário técnico do MCP |
| **Changelog** | [`CHANGELOG.md`](CHANGELOG.md) | Histórico de versões e notas de lançamento |
| **Versão** | [`VERSION`](VERSION) | `0.1.0-beta` |

---

## 🇺🇸 English

### 📌 Overview
**MCP Builder** is a comprehensive software engineering suite for designing, generating, and securing native **Model Context Protocol (MCP)** servers in **PHP (8.4+)**, **Python (3.12+)**, **Node.js (22+) / JavaScript**, **TypeScript (5+)**, **Go (1.22+)**, and **Rust (2021+)**.

### 🚀 Key Features
- **Prompt Injection Defense:** Active heuristic detection and quarantine of prompt injection attempts in input documentation.
- **Fail-Safe Issue Reporter:** Automated background issue submission on GitHub when compilation or handshake tests fail.
- **Native Zero-Bloat Runtimes:** Standard JSON-RPC 2.0 stdio implementations across all supported runtimes.
- **External MCP Configurator:** Automatic integration with Antigravity IDE, Claude Desktop, and Cursor.

