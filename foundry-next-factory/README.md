# Foundry Next Factory (FNF) 🏭⚡

> **PT-BR**: CLI de Nova Geração, Boilerplate & Scaffolder para Foundry Virtual Tabletop (v13, v14.369 Stable & v15+) com `ApplicationV2`, `TypeDataModel`, isolamento CSS e sincronização de IA.  
> **EN**: Next-Generation CLI, Boilerplate & Scaffolder for Foundry Virtual Tabletop (v13, v14.369 Stable & v15+) featuring `ApplicationV2`, `TypeDataModel`, CSS isolation, and integrated AI skills synchronization.

[![Compatibility](https://img.shields.io/badge/Foundry%20VTT-v13%20%7C%20v14%20%7C%20v15-orange.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()

---

## 🇧🇷 Português (Brasil)

### 🎯 Por que o Foundry Next Factory?
O clássico gerador `ghost-fvtt/foundry-factory` foi um grande marco, porém projetado para arquiteturas legadas do Foundry (v9/v10/v11), dependendo de bundlers antigos (Gulp/Rollup) e de `FormApplication`, que foram descontinuadas no Foundry v14+.

O **Foundry Next Factory (FNF)** foi reconstruído do zero para o desenvolvimento moderno no ecossistema Foundry VTT:
- **`ApplicationV2` Nativo & `HandlebarsApplicationMixin`**: Renderização reativa de alto desempenho, compatível com os novos padrões da v14.
- **`TypeDataModel`**: Validação estrita de esquemas de dados de Actors, Items e configurações.
- **Isolamento de CSS (`.fvtt-bs` / Namespacing)**: Previne vazamentos de estilos no HUD ou na interface principal do Foundry.
- **Presets Flexíveis**:
  - `vite-ts-appv2`: Ferramental moderno com Vite 6+, TypeScript estrito e hot reloading.
  - `vanilla-esm`: Módulo sem build (*zero-build*), direto em JavaScript ESModules.
- **Integração com Skills de IA**: Sincronização diária automatizada de ferramentas avançadas (`master-of-foundryvtt`, `bootstrap-ux-ui-plus`, `humanizer-plus`, etc.).

---

### 🚀 Instalação & Setup Rápido

Para instalar as dependências e sincronizar todas as skills de IA para o repositório:
```bash
node ./scripts/installer.mjs
```

Ou execute a sincronização a qualquer momento:
```bash
python ./scripts/sync_skills.py
```

---

### 🛠️ Como Usar o Scaffolder

#### Criar um Módulo Moderno com Vite 6 + TypeScript + ApplicationV2:
```bash
node ./bin/foundry-factory.mjs meu-super-modulo --type module --preset vite-ts-appv2 --author "Charles Corrêa"
```

#### Criar um Módulo Puro Vanilla (Zero-Build, ESModules Direto):
```bash
node ./bin/foundry-factory.mjs meu-modulo-simples --type module --preset vanilla-esm
```

---

### 🤖 Skills de IA Integradas (`.agents/skills/`)
1. **`master-of-foundryvtt`**: Especialista em arquitetura, APIs (v8 a v14.369 Stable), automações, MCP Server unificado e desenvolvimento full-stack.
2. **`bootstrap-ux-ui-plus`**: Design system com Bootstrap 5.3+ isolado para interfaces `ApplicationV2`.
3. **`humanizer-plus`**: Limpeza de artefatos de IA, desmarcação d'água e higienização de código.
4. **`mcp-builder`**: Gerador e blindador de servidores Model Context Protocol (MCP).
5. **`book-formatter`**: Diagramador, tradutor e estruturador de livros e compêndios de RPG.

Um workflow diário no GitHub Actions (`.github/workflows/daily-skills-sync.yml`) monitora e atualiza essas skills automaticamente à meia-noite.

---

## 🇺🇸 English

### 🎯 Why Foundry Next Factory?
The classic `ghost-fvtt/foundry-factory` was an incredible tool, but built for legacy Foundry versions (v9/v10/v11), relying on outdated bundlers (Gulp/Rollup) and legacy `FormApplication` classes that are now deprecated or removed in Foundry v14+.

**Foundry Next Factory (FNF)** has been engineered from the ground up for modern Foundry VTT development:
- **Native `ApplicationV2` & `HandlebarsApplicationMixin`**: High-performance reactive rendering adhering to v14 standards.
- **`TypeDataModel`**: Strict schema validation for Actors, Items, and system data.
- **CSS Isolation (`.fvtt-bs` / Namespacing)**: Prevents styling conflicts with Foundry's core UI and HUD.
- **Flexible Presets**:
  - `vite-ts-appv2`: Modern tooling powered by Vite 6+, strict TypeScript, and rapid builds.
  - `vanilla-esm`: Zero-build setup using native ESModules directly in the browser.
- **AI Skills Integration**: Built-in daily synchronization for AI development engines (`master-of-foundryvtt`, `bootstrap-ux-ui-plus`, `humanizer-plus`, etc.).

---

### 🚀 Quick Setup & Installation

To check environment dependencies and synchronize AI skills into `.agents/skills/`:
```bash
node ./scripts/installer.mjs
```

Or run synchronization standalone at any time:
```bash
python ./scripts/sync_skills.py
```

---

### 🛠️ Using the Scaffolder

#### Create a Modern Module with Vite 6 + TypeScript + ApplicationV2:
```bash
node ./bin/foundry-factory.mjs my-awesome-module --type module --preset vite-ts-appv2 --author "Charles Corrêa"
```

#### Create a Zero-Build Vanilla Module (Native ESModules):
```bash
node ./bin/foundry-factory.mjs my-simple-module --type module --preset vanilla-esm
```

---

### 🤖 Built-in AI Skills (`.agents/skills/`)
1. **`master-of-foundryvtt`**: Master of Foundry VTT architectures, APIs (v8 to v14.369 Stable), unified MCP Server, and fullstack scripting.
2. **`bootstrap-ux-ui-plus`**: Scoped modern UI/UX design system with Bootstrap 5.3+ for `ApplicationV2`.
3. **`humanizer-plus`**: AI code de-watermarking, syntax naturalization, and telemetry stripping.
4. **`mcp-builder`**: Universal Model Context Protocol (MCP) server generator and security shield.
5. **`book-formatter`**: Rulebook diagramming, translation engine, and compendium parser for tabletop RPGs.

A scheduled GitHub Actions workflow (`.github/workflows/daily-skills-sync.yml`) runs daily at midnight to keep all skills synchronized with upstream updates.
