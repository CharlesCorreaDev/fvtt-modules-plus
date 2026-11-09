# Master of Foundry VTT 🎲⚡

> **Comprehensive Foundry Virtual Tabletop Mastery, Development & Architecture Suite**  
> *Suíte Completa de Desenvolvimento, Arquitetura e Mestria em Foundry Virtual Tabletop por GM Charles Corrêa*  
> **Current up to Foundry VTT v14.369 Stable**

---

## 🇺🇸 English

### 📌 Overview & Practical Authority
**Master of Foundry VTT** is an end-to-end development, scripting, automation, and rule ingestion suite designed for developers, module creators, and Game Masters running **Foundry Virtual Tabletop**.

> [!IMPORTANT]
> **Source Material & Real-World Experience:**  
> All information, architectural patterns, and troubleshooting guides in this repository are rigorously based on **official Foundry VTT documentation, official release notes, policies, and API references**, combined directly with **first-hand, battle-tested practical experience in developing custom modules and systems for Foundry VTT (including the latest v14 architecture, ApplicationV2, and TypeDataModels)**.

This suite encapsulates official documentation, knowledge base articles, policies, API references from **Version 8 through Version 14 (v14.369 Stable)**, native Model Context Protocol (MCP) integrations, CI/CD package publication automation, modern web exploration tools for module repositories, and architecture guides for over 60 famous RPG systems.

---

### 🌐 Knowledge Sources, Guides & Development Standards

| Category | Reference / Guides | Description |
|---|---|---|
| **Release & Packaging Pipeline** | [`scripts/foundry_package_publisher.mjs`](scripts/foundry_package_publisher.mjs) & [`guides/publishing-packages.md`](guides/publishing-packages.md) | Quality gate, HTTP 200 icon checks, safe zip packaging & official Foundry API release |
| **Technical Wiki & Lifecycle** | [`guides/wiki-and-release-lifecycle.md`](guides/wiki-and-release-lifecycle.md) | Exhaustive Wiki generation, interactive release gate and versioning protocol |
| **CI/CD & Scaffolding Templates** | [`templates/github/`](templates/github/) & [`scripts/scaffold_package.py`](scripts/scaffold_package.py) | Production-ready `checks.yml`, `release.yml`, `dependabot.yml` and Issue Templates |
| **Model Context Protocol (MCP)** | [`mcp/README.md`](mcp/README.md) & [`mcp/INSTALLATION.md`](mcp/INSTALLATION.md) | Native unified MCP server (`master-of-foundryvtt-mcp`), live state and reverse engineering |
| **CLI Tools & Automation** | [`guides/cli-tools.md`](guides/cli-tools.md) | Official `@foundryvtt/foundryvtt-cli` and `fvtt-world-cli` compendium packing |
| **Clean Code & Humanization** | [`guides/humanization-and-clean-code.md`](guides/humanization-and-clean-code.md) | Zero-emoji default, anti-AI tells and bilingual JSDoc/TSDoc code comments |
| **Bootstrap Prefixed UI/UX** | [`guides/bootstrap-prefixed-ui.md`](guides/bootstrap-prefixed-ui.md) | Mandatory CSS class prefixing, official 9-tone cold blue palette and approved icons |
| **AnyDice Mathematical Modeling** | [`guides/anydice-dice-mechanics.md`](guides/anydice-dice-mechanics.md) | Dice mechanics probability modeling and conversion to Foundry `Roll` engine |
| **Sockets & Client-Server RPC** | [`guides/sockets.md`](guides/sockets.md) | Native `game.socket` & `socketlib` communication |
| **Combat Tracker & Automation** | [`guides/combat.md`](guides/combat.md) | `Combat`, `Combatant`, and `CombatTracker` mechanics |
| **AI & LLM Integration** | [`guides/ai-and-llm-integration.md`](guides/ai-and-llm-integration.md) | Integrate AI, Phil's Assistant, and AI Actors workflows |
| **Development Skills Matrix** | [`guides/development-skills-matrix.md`](guides/development-skills-matrix.md) | 14 Engineering Domains & professional developer standards |
| **Famous Systems Knowledge Base** | [`systems/README.md`](systems/README.md) | Architecture for 60+ systems (D&D 5e, PF2e, WoD, SWADE, Tormenta20, YZE, GURPS) |
| **Official Systems Directory** | [foundryvtt.com/packages/systems](https://foundryvtt.com/packages/systems?page=1) | Official paginated package catalog |
| **Official Modules Directory** | [foundryvtt.com/packages/modules](https://foundryvtt.com/packages/modules?page=1) | Official paginated module catalog |
| **Official Foundry VTT Store** | [foundryvtt.store](https://www.foundryvtt.store/search?q=Savage+Worlds) | Search commercial and official content packages |
| **Knowledge Base (Official & Guides)** | [`kb/`](kb/) & [foundryvtt.com/kb](https://foundryvtt.com/kb/) | Core operations, scenes, actors, compendiums and reverse engineering |
| **SSL, HTTPS & Let's Encrypt (v14+)** | [`kb/07-ssl-and-https.md`](kb/07-ssl-and-https.md) | Native SSL in v14.369 vs Reverse Proxy setups |
| **Policies & Governance** | [`policies/`](policies/) | Limited License, AI Content Policy, Branding and Privacy Guidelines |
| **API Version Guides (v8 to v14)** | [`versions/`](versions/) | Dedicated API migration guides from v8 through v14.369 Stable |

---

### 🔍 Repository Inspection & Analysis Web Tools
For studying third-party systems and modules directly in the browser or via automated ingestion:

| Tool | URL Template | Example (Foundry D&D 5e / SWADE Tools) |
|---|---|---|
| **Gitingest** | `https://gitingest.com/{{owner}}/{{repo}}` | `https://gitingest.com/foundryvtt/dnd5e` |
| **GitDiagram** | `https://gitdiagram.com/{{owner}}/{{repo}}` | `https://gitdiagram.com/foundryvtt/dnd5e` |
| **Repomix** | `https://repomix.com/?repo={{owner}}/{{repo}}` | `https://repomix.com/?repo=lipefl/swade-tools` |
| **Uithub** | `https://uithub.com/{{owner}}/{{repo}}?maxTokens=500000` | `https://uithub.com/lipefl/swade-tools?maxTokens=500000` |
| **DeepWiki** | `https://deepwiki.com/{{owner}}/{{repo}}` | `https://deepwiki.com/lipefl/swade-tools` |
| **Star History** | `https://www.star-history.com/?type=date&repos={{owner}}/{{repo}}` | `https://www.star-history.com/?type=date&repos=foundryvtt/dnd5e` |

---

### 🚀 How to Install & Use this Skill in Your Favorite AI Agent

#### ⚡ Fast Installation via `npx skills` (Skills.sh & Agent Skills Directory)
The fastest way to install this skill directly into your AI coding assistant (Antigravity, Claude Code, Cursor, Windsurf, etc.) is via the official **`skills`** CLI:

```bash
# Install directly from GitHub into your current project:
npx skills add CharlesCorreaDev/skills-ai --skill master-of-foundryvtt

# Or install it globally for your user across all projects:
npx skills add CharlesCorreaDev/skills-ai --skill master-of-foundryvtt -g
```

#### Option 1: Install from GitHub via Agent Customizations / Skills Root
Clone or copy the `master-of-foundryvtt` folder into your agent's global or workspace skills directory:

```bash
# 1. Clone this repository (or copy the master-of-foundryvtt directory)
git clone https://github.com/CharlesCorreaDev/skills-ai.git

# 2. Link or copy to your agent's skill folder:
# For Antigravity / Gemini CLI:
# Global: ~/.gemini/config/skills/master-of-foundryvtt (or %USERPROFILE%\.gemini\config\skills\master-of-foundryvtt on Windows)
# Workspace: .agents/skills/master-of-foundryvtt

# For Claude Code:
# Global: ~/.claude/skills/master-of-foundryvtt
# Workspace: .claude/skills/master-of-foundryvtt

# For Cursor / Windsurf:
# Place inside .cursor/rules/ or reference SKILL.md in project rules (.cursorrules / .windsurfrules)
```

#### Option 2: Direct Workspace Integration
Simply drop the `master-of-foundryvtt/` folder inside your Foundry VTT module or system project root:
```text
my-foundry-system/
├── src/
├── system.json
└── .agents/
    └── skills/
        └── master-of-foundryvtt/   <-- Entire skill folder here
```

#### 💬 How to Prompt Your AI Agent
Once loaded, the AI Agent automatically detects `SKILL.md`. You can invoke it naturally or explicitly:

- **Developing a New System (v14):**
  > *"Create a new Foundry VTT v14 system using ApplicationV2 and TypeDataModel for a d20-based modern horror game with full CI/CD templates."*
- **Migrating Modules from v11/v12 to v14:**
  > *"Analyze this module's sheet code and migrate it from legacy Application to ApplicationV2 following the Master of Foundry VTT v14 standards."*
- **Finalizing and Publishing a Package:**
  > *"The module features are completed and tested. Prepare the comprehensive WIKI.md, bump the version to v1.1.0, and guide me through the release process."*
- **Connecting via MCP:**
  > *"Inspect active actors and scenes in my live local Foundry VTT server using the native master-of-foundryvtt MCP server."*

---

## 🇧🇷 Português (Brasil)

### 📌 Visão Geral e Experiência Prática
O **Master of Foundry VTT** é uma suíte completa de desenvolvimento, automação, ingestão de regras, CI/CD e arquitetura desenvolvida para desenvolvedores de sistemas, criadores de módulos e Mestres de RPG que utilizam o **Foundry Virtual Tabletop**.

> [!IMPORTANT]
> **Base Oficial e Experiência Prática Real:**  
> Todas as informações, arquiteturas, padrões de código e diretrizes contidas neste repositório são rigorosamente fundamentadas na **documentação oficial do Foundry VTT, notas oficiais de lançamento, diretrizes/políticas e referências de API**, somadas diretamente à **experiência prática acumulada no desenvolvimento ativo de módulos e sistemas para o Foundry VTT v14** (incluindo o novo paradigma `ApplicationV2`, `TypeDataModel`, arquitetura de canvas e ESM nativo).

Ela consolida a base de conhecimento oficial, artigos, termos de licença, governança de release, integrações MCP e referências de API da **Versão 8 até a Versão 14 (v14.369 Stable)**, oferecendo suporte para:

- **Automação de Releases & Publicação Oficial** ([`scripts/foundry_package_publisher.mjs`](scripts/foundry_package_publisher.mjs)): Validação pré-voo, auditoria de código, verificação de ícones HTTP 200, empacotamento zip seguro e disparo direto na API oficial de release do Foundry VTT.
- **Protocolo de Wiki Técnica Minuciosa** ([`guides/wiki-and-release-lifecycle.md`](guides/wiki-and-release-lifecycle.md)): Geração obrigatória de documentação profunda para Mestres, Jogadores, referência de APIs, hooks e esquemas DataModel.
- **Templates de CI/CD, Dependabot & Issues** ([`templates/github/`](templates/github/)): Workflows prontos de validação contínua (`checks.yml`), publicação (`release.yml`), Dependabot e issue templates.
- **Servidor MCP Nativo Oficial** ([`mcp/README.md`](mcp/README.md)): Controle unificado de atores, itens, cenas, macros, playlists, compêndios e engenharia reversa estática/remota.
- **Design de Interface Responsiva com Bootstrap Prefixado** ([`guides/bootstrap-prefixed-ui.md`](guides/bootstrap-prefixed-ui.md)): Classes prefixadas obrigatórias, paleta de 9 tons frios e ícones RPG homologados.
- **Modelagem Estatística com AnyDice** ([`guides/anydice-dice-mechanics.md`](guides/anydice-dice-mechanics.md)): Validação matemática de dados antes da conversão para fórmulas do Foundry.
- **Humanização & Código Limpo** ([`guides/humanization-and-clean-code.md`](guides/humanization-and-clean-code.md)): Protocolo zero emojis por padrão e comentários estritamente bilíngues (Português/Inglês).
- **Base Arquitetural de 60+ Sistemas de RPG** ([`systems/README.md`](systems/README.md)): SWADE, D&D 5e, PF2e, Tormenta20, Year Zero Engine, Storyteller/WoD, Call of Cthulhu e mais.

---

### 🚀 Como Instalar e Usar no seu Agente de IA Favorito

#### ⚡ Instalação Rápida via `npx skills` (Skills.sh & Diretório Agent Skills)
A maneira mais rápida de instalar esta skill diretamente no seu agente de IA (Antigravity, Claude Code, Cursor, Windsurf, etc.) é utilizando a CLI oficial do **`skills`**:

```bash
# Instalar diretamente no projeto atual:
npx skills add CharlesCorreaDev/skills-ai --skill master-of-foundryvtt

# Ou instalar globalmente para seu usuário (todos os projetos):
npx skills add CharlesCorreaDev/skills-ai --skill master-of-foundryvtt -g
```

#### Opção 1: Instalação via Diretório de Skills / Customizações
Clone o repositório ou copie a pasta `master-of-foundryvtt` para a pasta de skills do seu assistente:

```bash
# 1. Clone o repositório
git clone https://github.com/CharlesCorreaDev/skills-ai.git

# 2. Vincule ou copie a pasta master-of-foundryvtt para o diretório de skills:
# No Antigravity / Gemini CLI:
# Global: ~/.gemini/config/skills/master-of-foundryvtt (ou %USERPROFILE%\.gemini\config\skills\master-of-foundryvtt no Windows)
# Workspace local: .agents/skills/master-of-foundryvtt

# No Claude Code:
# Global: ~/.claude/skills/master-of-foundryvtt
# Workspace local: .claude/skills/master-of-foundryvtt

# No Cursor / Windsurf:
# Copie para .cursor/rules/ ou referencie o SKILL.md no seu .cursorrules ou .windsurfrules
```

#### Opção 2: Integração Direta no Repositório do seu Módulo ou Sistema
Você pode colocar a pasta `master-of-foundryvtt/` dentro da raiz do seu projeto de módulo ou sistema:
```text
meu-modulo-foundry/
├── src/
├── module.json
└── .agents/
    └── skills/
        └── master-of-foundryvtt/   <-- Pasta completa da skill aqui
```

#### 💬 Exemplos de Comandos e Prompts para o Agente
Com a skill ativa, seu agente reconhece automaticamente as diretrizes do `SKILL.md`. Experimente prompts como:

- **Desenvolvimento de Novo Sistema (v14):**
  > *"Crie a base de um novo sistema para Foundry VTT v14 utilizando ApplicationV2 e TypeDataModel para um RPG de fantasia heroica com templates de CI/CD inclusos."*
- **Finalização e Release de Módulo:**
  > *"Concluímos o desenvolvimento do módulo de combate tático. Gere a Wiki explicativa completa (WIKI.md), incremente a versão e execute o pipeline de publicação."*
- **Inspeção de Mundo em Tempo Real via MCP:**
  > *"Conecte ao meu servidor Foundry local usando o MCP nativo do master-of-foundryvtt e inspecione o status e atores ativos."*
- **Modelagem de Dados e Probabilidades:**
  > *"Modele uma mecânica de dados explosivos no AnyDice e converta em um avaliador customizado de DiceTerm para o meu sistema."*

---

## 👨‍💻 Author / Autor

**GM Charles Corrêa**  
- 🌐 **Website:** [rpg.charlescorrea.com.br](https://rpg.charlescorrea.com.br)  
- 📧 **Email:** [charlescorreaweb@gmail.com](mailto:charlescorreaweb@gmail.com)  
- 📷 **Instagram:** [@mestrecharlescorrea](https://www.instagram.com/mestrecharlescorrea)  
- 🐙 **GitHub:** [CharlesCorreaDev](https://github.com/CharlesCorreaDev)  
- ⚡ **Skills de IA By Charles Corrêa Repo:** [https://github.com/CharlesCorreaDev/skills-ai](https://github.com/CharlesCorreaDev/skills-ai)
