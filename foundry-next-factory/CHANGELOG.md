# Changelog - Foundry Next Factory (FNF) 🏭⚡

Todas as modificações notáveis neste pacote serão documentadas neste arquivo seguindo o padrão [Semantic Versioning (SemVer)](https://semver.org/) e o padrão obrigatório bilíngue (`PT-BR` e `EN`) em dois níveis: Técnico e Leigo.

---

## [1.0.0-beta.1] - 2026-11-09

### 🇧🇷 Português (Brasil)

#### 🎲 Para Mestres e Desenvolvedores (Visão Acessível / Leigo)
- **Lançamento Inicial**: Ferramenta completa de linha de comando (CLI) para criar módulos e sistemas modernos para Foundry VTT v14+ em segundos.
- **Três Presets Prontos**:
  - `vite-ts-appv2`: Módulos de alta velocidade com Vite 6 e TypeScript.
  - `vanilla-esm`: Módulos simples e rápidos sem etapa de build (*zero-build*).
  - `system-datamodel-v14`: Template completo para criar novos sistemas de RPG com fichas modernas.
- **Automação Pronta**: Todo novo módulo já nasce com robô do GitHub pronto para empacotar o arquivo `.zip` e publicar no Foundry.
- **Skills de IA Universais**: Instalador automático que leva conhecimento avançado de desenvolvimento de Foundry para Claude, Gemini, Cursor e Antigravity.
- **100% Multiplataforma**: Testado e compatível com Windows, Linux e macOS.

#### ⚙️ Para Engenheiros de Software (Visão Técnica)
- **CLI Scaffolder**: Implementação em Node.js ESModules (`bin/foundry-factory.mjs`) com substituição recursiva de placeholders em conteúdo e nomes de arquivos.
- **Padrões Foundry v14**:
  - Integração nativa de `ApplicationV2` e `HandlebarsApplicationMixin`.
  - Herança de `foundry.abstract.TypeDataModel` para Actor e Item sem dependência de `template.json`.
  - Isolamento de CSS via classe `.fvtt-bs` prevenindo vazamento de estilos no core HUD.
- **Automação CI/CD**: Inclusão de `.github/workflows/release.yml` baseado nos padrões da *League of Foundry Developers*.
- **Bridge Multi-Agente**: Scripts `installer.mjs` e `sync_skills.py` com detecção dinâmica de executável `python3`/`python` e propagação para `.agents/skills`, `.claude/skills`, `~/.gemini/config/skills` e `~/.cursor/skills`.

---

### 🇺🇸 English

#### 🎲 For Game Masters and Developers (Accessible View)
- **Initial Release**: Comprehensive CLI tool to scaffold modern modules and systems for Foundry VTT v14+ in seconds.
- **Three Ready-to-use Presets**:
  - `vite-ts-appv2`: Fast, typed modules with Vite 6 and TypeScript.
  - `vanilla-esm`: Zero-build ESModule setup with zero bundle overhead.
  - `system-datamodel-v14`: Full modern game system template with reactive character sheets.
- **Automated Releases**: Every generated project includes ready-to-use GitHub Actions to bundle `.zip` assets and publish releases.
- **Universal AI Skills**: Built-in installer distributing Foundry VTT development capabilities across Claude, Gemini, Cursor, and Antigravity.
- **Cross-Platform**: Verified on Windows, Linux, and macOS.

#### ⚙️ For Software Engineers (Technical View)
- **CLI Scaffolder**: Modern Node.js ESModule CLI (`bin/foundry-factory.mjs`) featuring recursive placeholder injection for file contents and dynamic filenames.
- **Foundry v14 Architecture**:
  - Native `ApplicationV2` and `HandlebarsApplicationMixin` implementation.
  - Subclasses of `foundry.abstract.TypeDataModel` for Actors and Items eliminating `template.json`.
  - Scoped CSS classes (`.fvtt-bs`) ensuring HUD and UI isolation.
- **CI/CD Automation**: Embedded `.github/workflows/release.yml` conforming to *League of Foundry Developers* guidelines.
- **Multi-Agent Bridge**: Utility scripts `installer.mjs` and `sync_skills.py` with dynamic `python3`/`python` binary detection and synchronization targeting `.agents/skills`, `.claude/skills`, `~/.gemini/config/skills`, and `~/.cursor/skills`.

