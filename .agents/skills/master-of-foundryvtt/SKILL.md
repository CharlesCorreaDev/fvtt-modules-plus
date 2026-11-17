---
name: master-of-foundryvtt
description: Master development, administration, and automation suite for Foundry Virtual Tabletop (v8 to v14.370 Stable) by GM Charles Corrêa. Orquestra 12 subagentes especializados cobrindo especificações técnicas (Specs/PRs/Handoff), scaffolding moderno via Foundry Next Factory (FNF), engenharia de regras de RPG (60+ sistemas), backend com TypeDataModel, frontend reativo com ApplicationV2, Canvas/PixiJS, integração de APIs de módulos (Midi-QOL, Sequencer, Item Piles), QA com Vitest/Jest, auditoria de código com SAST, verificação de releases e documentação técnica bilíngue (EN/PT-BR). Ingests KB, Release Notes, Policies, API docs across all versions e servidor MCP nativo oficial.
---

# Master of Foundry VTT 🎲⚡
> *by GM Charles Corrêa* • **Suíte Multiagente para Foundry VTT (v8 até v14.370 Stable)**

---

## 🏛️ Topologia dos 12 Subagentes Federados

Para erradicar alucinações de API entre versões do Foundry e garantir código limpo e testado, a suíte opera em pipeline modular:

`mermaid
flowchart TD
    User([Usuário / Desenvolvedor]) --> Showrunner[1. Showrunner & Orquestrador Mestre]
    Showrunner --> SpecHandoff[2. Specs, PRs, SSD & Handoff SemVer]
    SpecHandoff -->|Scaffolding| Scaffolder[3. Arquiteto FNF Vite/ESM]
    SpecHandoff -->|Regras RPG| RuleEngineer[4. Engenheiro de Regras 60+ Sistemas]
    RuleEngineer --> BackendDev[5. Backend & TypeDataModel]
    RuleEngineer --> FrontendDev[6. Frontend & ApplicationV2]
    BackendDev & FrontendDev --> CanvasDev[7. Canvas, PixiJS, Macros & Sockets]
    BackendDev & FrontendDev --> ApiIntegrator[8. APIs de Módulos Midi-QOL/Sequencer]
    CanvasDev & ApiIntegrator --> QAEvaluator[9. QA & Testes Vitest/Jest]
    QAEvaluator --> CodeReviewer[10. Auditor Geral de Código & Portão SAST]
    CodeReviewer --> VersionGatekeeper[11. Guardião de Versões & Releases v8-v14]
    VersionGatekeeper --> TechnicalWriter[12. Documentador Bilíngue EN/PT-BR]
    TechnicalWriter --> SpecHandoff
    SpecHandoff --> OutputFinal([Pacote Pronto, Testado e Homologado])
`

---

## ⚡ Regras Canônicas & Portões Obrigatórios (Fast Gates)

1. **Gatekeeper de Versão & Releases Semanais:** Pergunte a versão-alvo do Foundry. Execute python scripts/check_releases.py --installed <versão> para verificar novidades em oundryvtt.com/releases/ e avisar sobre updates.
2. **Foundry Next Factory (FNF) Obrigatório:** Novos módulos e sistemas utilizam FNF com ApplicationV2, TypeDataModel e CSS isolado. 	emplate.json e FormApplication são estritamente depreciados.
3. **Padrão Bilíngue Estrito:** Documentações, manuais, JSDoc e i18n (languages/*.json) devem ser entregues simultaneamente em **Inglês e Português do Brasil**.
4. **SemVer 2.0.0 (PT-BR):** Releases, RFCs e PRs seguem rigorosamente a especificação [semver.org/lang/pt-BR/](https://semver.org/lang/pt-BR/).
5. **Portão de Auditoria Supremo:** Nenhum código é entregue sem passar pelo Revisor Supremo (SAST, mitigação de injeção, sem segredos vazados).

---

## 🔗 Protocolo de Skills Companheiras (SDD, Handoff, TDD & Rigor)
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

## 📚 Índice Modular de Referências & Documentação (Carregamento Sob Demanda)

### 🤖 Arquitetura Multiagente & Processos
- [Arquitetura dos 12 Subagentes](references/arquitetura-subagentes-foundry.md): Perfis, responsabilidades e fluxos de cada agente.
- [Specs, PRs e Handoff](references/specs-prs-e-handoff.md): Templates de RFC, pull requests e regras do SemVer 2.0.0.
- [QA e Testes Automatizados](references/qa-e-testes-automatizados.md): Vitest, Jest, fixtures e simulações de Hooks.
- [Integração de APIs de Módulos](references/integracao-apis-modulos.md): Guias para Midi-QOL, Sequencer, Item Piles e lib-wrapper.
- [Padrão de Documentação Bilíngue](references/padrao-documentacao-bilingue.md): Diretrizes para documentação e arquivos de i18n.
- [Guia Técnico de Desenvolvimento](references/guia-tecnico-desenvolvimento-foundry.md): Guia profundo de setup, CLI e compêndios.
- [Diretrizes Completas (EN)](references/mandatory-directives-en.md) | [Diretrizes Completas (PT-BR)](references/diretrizes-obrigatorias-ptbr.md): Os 24 mandatos normativos.

### ⚡ Consulta Rápida & Padrões
- [Cheatsheet do Desenvolvedor](cheatsheet.md): Hooks essenciais, CRUD de documentos e canvas.
- [Glossário Canônico](glossary.md): Definições técnicas (Document, DataModel, ApplicationV2).
- [Padrões de Arquitetura](patterns.md): Exemplos canônicos de TypeDataModel e ApplicationV2.
- [Deployment e Cloud](cloud-deployment-guide.md): Guia de deploy em Docker, SSL e servidores cloud.

### 📖 Guias Temáticos de Desenvolvimento (guides/)
- [Criação de Módulos](guides/creating-modules.md) • [Criação de Sistemas](guides/creating-systems.md) • [Publicação de Pacotes](guides/publishing-packages.md)
- [Ferramentas CLI Oficiais](guides/cli-tools.md) • [Ciclo de Release & Wiki](guides/wiki-and-release-lifecycle.md) • [Engenharia Reversa (REA)](guides/reverse-engineering.md)
- [Code Mode & Sandbox (CodeAct)](guides/code-mode-sandbox-orchestration.md) • [Humanização & Código Limpo](guides/humanization-and-clean-code.md)
- [Acessibilidade Sensorial & Cognitiva](guides/sensory-and-cognitive-accessibility.md) • [Otimização de Mídias](guides/media-optimization-and-conversion.md)
- [Mecânica AnyDice](guides/anydice-dice-mechanics.md) • [Armadilhas & Gatilhos](guides/automated-traps-and-triggers.md) • [Efeitos Ativos](guides/active-effects.md)
- [UI Bootstrap Prefixado](guides/bootstrap-prefixed-ui.md) • [Fullstack Dev](guides/fullstack-foundry-dev.md) • [Troubleshooting](guides/troubleshooting.md)

### 🎲 Sistemas de RPG & Regras (systems/)
- [01. D20 & Fantasia (D&D 5e, PF2e, Daggerheart, Tormenta20)](systems/01-d20-and-fantasy.md)
- [02. Storyteller & WoD (Vampiro V5/V20, Lobisomem, KULT)](systems/02-storyteller-and-world-of-darkness.md)
- [03. Investigação & Horror Cósmico (Call of Cthulhu 7e, Delta Green)](systems/03-investigative-and-horror.md)
- [04. Year Zero Engine (Alien, Blade Runner, Vaesen, Dragonbane)](systems/04-year-zero-engine.md)
- [05. Sci-Fi & Cyberpunk (Cyberpunk RED/2020, Shadowrun)](systems/05-pulp-scifi-and-cyberpunk.md)
- [06. Narrativos, PbtA & FitD (Blades in the Dark, City of Mist)](systems/06-narrative-and-pbta-fitd.md)
- [07. Genéricos & Rules-Light (SWADE, GURPS 4e, 3D&T, CSB)](systems/07-generic-and-rules-light.md)

### ⚙️ Versões da API (ersions/) & Base de Conhecimento (kb/)
- [API v14](versions/v14-api-guide.md) • [API v13](versions/v13-api-guide.md) • [API v12](versions/v12-api-guide.md) • [API v11](versions/v11-api-guide.md) • [API v10](versions/v10-api-guide.md) • [API v09](versions/v09-api-guide.md) • [API v08](versions/v08-api-guide.md)
- [KB 01-09](kb/): Hosting, Scenes, Documents, Dice, Áudio/Vídeo, Compêndios, SSL, Reverse Eng, RPG Engines.
- [Políticas & Licenças](policies/): Licença Limitada, IA Policy, Branding e Privacidade.
- [Servidor MCP Nativo](mcp/README.md): Instalação e integração do MCP Server unificado.
