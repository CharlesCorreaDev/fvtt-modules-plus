# Arquitetura dos 10 Subagentes Especializados — MCP Builder 🔌🛠️
## 10 Specialized Subagents Architecture — MCP Builder 🔌🛠️

A suíte **MCP Builder** opera em linha de montagem com 10 especialistas dedicados para erradicar prompt injection, vazamento de chaves de API, tipos fracos e incompatibilidade de IDEs.

The **MCP Builder** suite operates as an assembly line of 10 dedicated specialists to eliminate prompt injection, secret leaks, loose typing, and IDE incompatibilities.

`mermaid
flowchart TD
    User([Usuário / Desenvolvedor / User]) --> Showrunner[1. Showrunner & Orquestrador MCP]
    Showrunner --> SpecHandoff[2. Specs & OpenAPI/MCP]
    SpecHandoff --> ProtocolDev[3. Protocolo JSON-RPC Stdio/SSE]
    ProtocolDev --> PolyglotDev[4. Dev Poliglota TS/PHP/Python/Go/Rust]
    PolyglotDev --> SecurityShield[5. Blindador contra Prompt Injection]
    PolyglotDev --> TypingSastAuditor[6. Auditor SAST & Tipagem Estrita]
    SecurityShield & TypingSastAuditor --> IdeTester[7. Conectividade Multi-IDE]
    IdeTester --> QABenchmarker[8. QA & Benchmarks de Latência]
    QABenchmarker --> ReleaseGatekeeper[9. Guardião SemVer 2.0.0]
    ReleaseGatekeeper --> TechnicalWriter[10. Documentador Bilíngue EN/PT-BR]
    TechnicalWriter --> SpecHandoff
    SpecHandoff --> OutputFinal([Servidor MCP Seguro, Testado e Homologado])
`

---

## 🇧🇷 Português (Brasil) — Papéis e Responsabilidades dos 10 Subagentes

1. **Showrunner & Orquestrador MCP:** Entrevista o desenvolvedor, delimita fontes de dados (APIs, DBs, arquivos) e orquestra o pipeline.
2. **Engenheiro de Specs, PRs, SSD & Handoff OpenAPI/MCP:** Modela RFCs, diagramas SSD de sequência JSON-RPC, especificações de PRs e guias de handoff, além de  Modela schemas JSON Schema estritos, nomeação de tools sem ambiguidade e descrições semânticas para LLMs.
3. **Engenheiro de Protocolo JSON-RPC 2.0 (Stdio & SSE):** Implementa o ciclo de transporte, tratamento assíncrono de mensagens e multiplexação.
4. **Desenvolvedor Poliglota (TS, PHP 8.4+, Python 3.12+, Go, Rust):** Implementa os handlers nativos de ferramentas e recursos com alta velocidade.
5. **Blindador de Segurança (Security Shield):** Contenção contra Prompt Injection indireto, validação de inputs e proteção de variáveis de ambiente.
6. **Auditor de Tipagem Estrita & SAST:** Valida estaticamente TypeScript strict, PHPStan Level 9, Mypy strict e auditoria Bandit.
7. **Engenheiro de Conectividade Multi-IDE:** Valida integração e gera arquivos de configuração para Claude Desktop, Antigravity, Cursor e VS Code.
8. **Engenheiro de QA, Stress Test & Latência:** Executa benchmarks de tempo de resposta (<50ms em stdio), concorrência e resiliência a timeouts.
9. **Guardião de Versões & SemVer 2.0.0:** Controla a semântica de versionamento de tools e backward compatibility conforme [SemVer 2.0.0 PT-BR](https://semver.org/lang/pt-BR/).
10. **Redator Técnico & Documentador Bilíngue:** Gera READMEs de instalação, documentação de tools e exemplos de prompts em EN e PT-BR.

---

## 🇺🇸 English — Roles and Responsibilities of the 10 Subagents

1. **Showrunner & MCP Orchestrator:** Interviews developer, establishes data boundaries (APIs, DBs, filesystem), and governs the pipeline.
2. **Specs, PRs, SSD & Handoff OpenAPI/MCP Engineer:** Authors architectural RFCs, JSON-RPC System Sequence Diagrams (SSD), PR definitions, and handoff guides, along with  Designs strict JSON Schema models, unambiguous tool naming, and semantic descriptions for LLMs.
3. **JSON-RPC 2.0 Protocol Engineer (Stdio & SSE):** Implements transport lifecycles, asynchronous event parsing, and message multiplexing.
4. **Polyglot Developer (TS, PHP 8.4+, Python 3.12+, Go, Rust):** Implements high-throughput native tool and resource handlers.
5. **Security Shield (Hardening Engineer):** Enforces defenses against indirect Prompt Injection, input validation, and .env isolation.
6. **Strict Typing & SAST Auditor:** Validates static conformance under TypeScript strict, PHPStan Level 9, Mypy strict, and Bandit.
7. **Multi-IDE Connectivity Engineer:** Verifies integration and generates config manifests for Claude Desktop, Antigravity, Cursor, and VS Code.
8. **QA, Stress Test & Latency Benchmarker:** Runs sub-50ms response latency benchmarks, concurrency validation, and timeout resilience.
9. **SemVer 2.0.0 & Release Guardian:** Oversees backwards compatibility and semantic releases per [semver.org](https://semver.org/).
10. **Bilingual Technical Writer (EN / PT-BR):** Produces installation guides, tool references, and runnable prompting examples in English and Brazilian Portuguese.
