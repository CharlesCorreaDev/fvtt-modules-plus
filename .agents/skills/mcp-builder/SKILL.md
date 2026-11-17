---
name: mcp-builder
description: Gerador, blindador de segurança e configurador universal de servidores Model Context Protocol (MCP) para PHP 8.4+, Python 3.12+, Node.js 22+, TypeScript 5+, Go 1.22+ e Rust 2021+. Orquestra 10 subagentes cobrindo Specs, PRs, SSD e Handoff OpenAPI/MCP, transporte Stdio/SSE, código poliglota, contenção contra prompt injection, auditoria SAST, testes multi-IDE (Claude/Cursor/Antigravity), benchmarks de latência e documentação técnica bilíngue.
---

# MCP Builder 🔌🛠️
> *by GM Charles Corrêa — Ecossistema Skills AI* • **Suíte Federada de 10 Subagentes para MCP (0.6.0-beta)**

---

## 🏛️ Topologia dos 10 Subagentes Especializados

Para erradicar vulnerabilidades de injeção, falhas de transporte e configurações quebradas em IDEs:

`mermaid
flowchart TD
    User([Usuário / Desenvolvedor]) --> Showrunner[1. Showrunner & Orquestrador MCP]
    Showrunner --> SpecHandoff[2. Specs, PRs, SSD & OpenAPI/MCP Handoff]
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

## ⚡ Regras Canônicas & Portões Obrigatórios (Fast Gates)

1. **Blindagem de Segurança Obrigatória:** Sanitização absoluta contra Prompt Injection e vazamento de .env.
2. **Schema JSON Estrito:** Ferramentas devem declarar tipos, descrições claras e campos obrigatórios (
equired).
3. **Conectividade Multi-IDE:** Forneça configurações validadas para Claude Desktop, Antigravity e Cursor.
4. **SemVer 2.0.0 (PT-BR) & Padrão Bilíngue:** Nomenclatura e documentação estritamente em EN e PT-BR.
5. **Portão SAST & Latência:** Nenhum servidor é entregue sem passar por análise estática e teste de latência.

---

## 🔗 Protocolo de Skills Companheiras
`ash
# Stack Supremo de Economia de Tokens & Otimizacao
npx skills@latest add headroomlabs-ai/headroom
npx skills@latest add rtk-ai/rtk
npx skills@latest add JuliusBrussee/caveman
npx skills@latest add dietrichgebert/ponytail

# Suite de Engenharia Rigorosa, SDD, TDD, Handoff & GodMode
npx skills@latest add noobygains/godmode
npx skills@latest add addyosmani/agent-skills --skill=spec-driven-development
npx skills@latest add mattpocock/skills --skill=grill-me
npx skills@latest add mattpocock/skills --skill=handoff
npx skills@latest add mattpocock/skills --skill=tdd
npx skills@latest add aihero-dev/skills-code-review
npx skills@latest add multica-ai/andrej-karpathy-skills
npx skills@latest add cloudflare/security-audit-skill
npx skills@latest add NVIDIA/auto-ontology
`

---

## 📚 Índice Modular de Referências (Carregamento Sob Demanda)

- [Metodologias SDD, Handoff, Grill-Me & TDD](references/sdd-handoff-grillme-tdd.md): Especificação rigorosa, alinhamento, TDD e handoff.
- [Arquitetura dos 10 Subagentes](references/arquitetura-subagentes-mcp-builder.md): Perfis e responsabilidades de cada especialista.
- [Cheatsheet de Comandos](cheatsheet.md): Snippets rápidos para TypeScript, Python e PHP.
- [Padrões de Arquitetura & Segurança](patterns.md): Modelos de transporte Stdio/SSE e sanitização.
- [Glossário Canônico](glossary.md): Termos fundamentais da especificação MCP.
- [Módulos de Segurança](security/): Defesas contra injeção e blindagem de transporte.
- [Adaptadores Multi-Linguagem](adapters/): Scaffolding para Node, Python, PHP, Rust e Go.
