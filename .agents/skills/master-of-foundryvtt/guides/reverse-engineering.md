# Reverse Engineering Foundry VTT, Systems & Modules (REA & Reversa) 🔬

Tools and Frameworks for Reverse Engineering & Spec Extraction:

| Tool / Framework | Source | Purpose |
|---|---|---|
| **REA** (`rea-agents`) | https://github.com/morluto/rea (MCP + CLI, MIT) | Inspects binaries, JS/Electron apps (ASAR), .NET assemblies, websites; returns evidence + limitations. Runs locally. |
| **rea-engenharia-reversa** | https://github.com/inematds/rea-engenharia-reversa | Portuguese guide/reference for REA (third-party docs, not code). |
| **Reversa** (por Sandeco) | [sandeco.github.io/reversa/pt/](https://sandeco.github.io/reversa/pt/) & [github.com/sandeco/reversa](https://github.com/sandeco/reversa) | Framework de engenharia reversa de código legado para Spec-Driven Development (SDD) com agentes de IA. Extrai contratos operacionais, PRD, especificações executáveis e documentação viva interativa (`_reversa_docs`). |

Install REA: `npm i -g rea-agents` then `npx rea-agents setup` (choose agent, approve changes, restart agent).  
Install / Bootstrap Reversa: `npx reversa install` na raiz do projeto ou repositório a ser dissecado.  
Static JS analysis needs no Ghidra/Hopper/IDA; native analysis does (optional, ask user).

---

## 🧭 Metodologias de Engenharia Reversa

### 1. REA (`rea-agents`) — Inspeção Estrutural Byte-a-Byte & AST
O REA foca na extração direta de evidências do código: símbolos exportados, chamadas de API, grafos de chamadas, árvores de sintaxe abstrata (AST) e superfícies de ataque/fronteiras.
- **Foundry core** (`<install>/resources/app` – `client/`, `common/`, `public/`): `rea analyze-javascript-application "<path>" --json`. Use para confirmar assinaturas reais de API, hooks, esquemas de DataModel e avisos de depreciação da versão exata do usuário.
- **Sistemas/Módulos Locais**: inspecione a pasta compactada ou minificada com REA ou via MCP tool `reverse_engineer_target`.

### 2. Reversa (Sandeco) — Spec-Driven Reverse Engineering (SDD)
O **Reversa** ([sandeco.github.io/reversa/pt/](https://sandeco.github.io/reversa/pt/)) complementa a análise estática transformando código legado sem documentação em **especificações acionáveis para agentes de IA**:
- **Quando usar:**
  - Sistemas ou módulos legados legados do Foundry VTT (v8, v9, v10, v11) construídos sem DataModels, cheios de código monolítico ou "vibe coding", que precisam ser migrados para a arquitetura moderna (v14: `ApplicationV2`, `TypeDataModel`, ESM).
  - Mapeamento de regras obscuras em sistemas complexos (ex: cálculos de iniciativa, tabelas de modificadores, migrações de dados).
- **Comandos & Fluxos do Reversa:**
  - `npx reversa install`: Inicializa o framework na raiz do módulo ou sistema.
  - `/reversa`: Descobre e especifica todo o sistema legado existente, gerando contratos claros e requisitos.
  - `/reversa-autonomous`: Executa a engenharia reversa de ponta a ponta sem interrupções manuais.
  - `/reversa-forward`: Guia a reconstrução ou refatoração estruturada da especificação gerada para o código novo funcionalidade por funcionalidade.
  - `/reversa-debugger`: Mapeia defeitos e divergências de volta às especificações do sistema.
  - `_reversa_docs/`: Diretório gerado contendo documentação viva, mapas conceituais e glossários para humanos e IAs.

---

## Targets & how
- **Foundry core** (`<install>/resources/app` – `client/`, `common/`, `public/`): `rea analyze-javascript-application "<path>" --json`. Use to confirm real API signatures, hooks, DataModel schemas, deprecations of the user's exact version.
- **Installed Systems/Modules**: prefer source (git) via Gitingest/Repomix/DeepWiki (SKILL.md §8). If only a packaged/minified copy exists (`Data/systems/<id>`, `Data/modules/<id>`), run REA on that folder, or apply Reversa (`npx reversa install` / `/reversa`) to produce formal SDD specifications.
- **Uninstalled Remote Systems/Modules (JB2A, Sequencer, Item Piles, Automated Animations, etc.)**:
  - Quando a tarefa solicitar integração com módulos ou sistemas de terceiros não instalados:
    1. Clone temporariamente via MCP `reverse_engineer_target` com `target_type='git_repo'` ou `git clone --depth 1 <repo_url>`.
    2. Analise a estrutura de arquivos e diretórios de assets (ex: onde o JB2A guarda `.webm`/`.webp`, convenções de caminhos).
    3. Mapeie as chamadas de API públicas expostas no escopo global (ex: `Sequencer.Effect()`, `Hooks.on('ready')`, `game.modules.get(...)`).
    4. Caso o módulo tenha lógica complexa, use o fluxo Reversa para catalogar contratos e interfaces públicas antes de iniciar a codificação.
    5. Implemente o módulo de integração ou automações consumindo os métodos e caminhos reais mapeados.

## Mandatory workflow (every reverse-engineering / create / adjust / recreate task)
1. **Recall**: read `memory/learnings.md` (+ `memory/<system-or-module>.md` if present).
2. **Scope**: version gate + clarification gate (SKILL.md §1, §8).
3. **Analyze**: REA on the target(s) + Reversa specification discovery (`/reversa` / `_reversa_docs`); capture evidence (file, symbol, hook, schema, specification).
4. **Design**: reuse the target's real data paths (`system.*`), hooks, CSS prefixes, flags based on the extracted SDD contracts.
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
