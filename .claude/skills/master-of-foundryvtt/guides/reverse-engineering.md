# Reverse Engineering Foundry VTT, Systems & Modules (REA) 🔬

Tools (installed by `scripts/setup_dev_env.py`):

| Tool | Source | Purpose |
|---|---|---|
| **REA** (`rea-agents`) | https://github.com/morluto/rea (MCP + CLI, MIT) | Inspects binaries, JS/Electron apps (ASAR), .NET assemblies, websites; returns evidence + limitations. Runs locally. |
| **rea-engenharia-reversa** | https://github.com/inematds/rea-engenharia-reversa | Portuguese guide/reference for REA (third-party docs, not code). |

Install: `npm i -g rea-agents` then `npx rea-agents setup` (choose agent, approve changes, restart agent).
Static JS analysis needs no Ghidra/Hopper/IDA; native analysis does (optional, ask user).

## Targets & how
- **Foundry core** (`<install>/resources/app` – `client/`, `common/`, `public/`): `rea analyze-javascript-application "<path>" --json`. Use to confirm real API signatures, hooks, DataModel schemas, deprecations of the user's exact version.
- **Installed Systems/Modules**: prefer source (git) via Gitingest/Repomix/DeepWiki (SKILL.md §8). If only a packaged/minified copy exists (`Data/systems/<id>`, `Data/modules/<id>`), run REA on that folder or use MCP `reverse_engineer_target`.
- **Uninstalled Remote Systems/Modules (JB2A, Sequencer, Item Piles, Automated Animations, etc.)**:
  - Quando a tarefa solicitar integração com módulos ou sistemas de terceiros não instalados:
    1. Clone temporariamente via MCP `reverse_engineer_target` com `target_type='git_repo'` ou `git clone --depth 1 <repo_url>`.
    2. Analise a estrutura de arquivos e diretórios de assets (ex: onde o JB2A guarda `.webm`/`.webp`, convenções de caminhos).
    3. Mapeie as chamadas de API públicas expostas no escopo global (ex: `Sequencer.Effect()`, `Hooks.on('ready')`, `game.modules.get(...)`).
    4. Implemente o módulo de integração ou armadilhas consumindo os métodos e caminhos reais mapeados.

## Mandatory workflow (every reverse-engineering / create / adjust / recreate task)
1. **Recall**: read `memory/learnings.md` (+ `memory/<system-or-module>.md` if present).
2. **Scope**: version gate + clarification gate (SKILL.md §1, §8).
3. **Analyze**: REA on the target(s); capture evidence (file, symbol, hook, schema).
4. **Design**: reuse the target's real data paths (`system.*`), hooks, CSS prefixes, flags.
5. **Build** with ApplicationV2/TypeDataModel (v14+), then **validate** (`fvtt package validate`, `validate_manifest` MCP tool, console free of deprecations).
6. **Save memory** (below) before finishing. Do this even if the task failed.

## Memory protocol
Folder: `memory/` in this skill.
- `learnings.md`: index + cross-cutting rules (append-only, dated, deduplicate).
- `<target-id>.md` (e.g. `dnd5e.md`, `swade.md`, `core-v14.md`): per target.

Entry template:
```
### YYYY-MM-DD — <task: reverse|create-module|create-system|adjust|recreate> — <target> (Foundry vX)
- Findings: real APIs/paths/hooks/schemas discovered (with file refs)
- Pitfalls: errors hit + root cause + fix
- Patterns: reusable snippets/approach
- Open questions / next improvements
```
Rules: store facts verified by evidence, not guesses; no secrets/credentials/licensed content; if a memory entry is later proven wrong, fix it and note the date. After saving, if a learning generalizes, promote it into the relevant `guides/` or `systems/` file.
