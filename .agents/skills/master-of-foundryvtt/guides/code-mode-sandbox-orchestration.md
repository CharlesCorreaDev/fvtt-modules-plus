# Code Mode & Sandbox Orchestration (CodeAct) ⚡📦
> *Operational Guide for Foundry VTT Development & System Automation*

---

## 🇺🇸 English

### 1. Paradigm Overview: Code-as-Action (CodeAct)
In complex Foundry VTT environments, interacting through granular, atomic JSON tool invocations causes heavy context degradation, token exhaustion, and silent failures when handling compendiums, document trees, or data models. 

**Code Mode** mandates that any operation involving data extraction, bulk document manipulation, schema audits, or game logic testing **MUST be written and executed as a real script in a sandbox environment** (Node.js or Python).

### 2. Token Efficiency via In-Memory Processing
- **Anti-Pattern (Token Waste):** Pulling hundreds of compendium entries or raw JSON world records directly into the LLM context prompt.
- **CodeAct Pattern:** Write a Node.js or Python script that loads, filters, aggregates, and transforms the documents locally inside the sandbox. Return only the synthesized final summary (`stdout`) to the model context.

### 3. Programmatic MCP Batching
When using Foundry VTT MCP servers (`master-of-foundryvtt-mcp`, `ninjos-foundry-mcp`, `foundryvtt-mcp`):
- Write scripts to communicate directly with the local Foundry REST / Socket API or MCP endpoint in a single batch loop.
- Validate pre-conditions (such as active world, version schema, and document types) programmatically before applying updates.
- Wrap all network and bridge calls with `try / catch` blocks to stream structured diagnostics to `stderr` upon failure.

### 4. Reverse Engineering (REA) & Documentation Verification
- Never guess the data model, sheet hook, or canvas method. Always verify with official documentation (`kb/`, `versions/`).
- Use REA reverse engineering tools (`rea-agents`) to inspect running or packaged modules, system schemas, and core behaviors before authoring code.

---

## 🇧🇷 Português

### 1. Visão Geral do Paradigma: Code-as-Action (CodeAct)
No desenvolvimento para Foundry VTT, interagir por meio de chamadas JSON atômicas consecutivas satura a janela de contexto de tokens e eleva a chance de alucinação ao lidar com compêndios pesados, árvores de documentos e DataModels complexos.

O **Code Mode** estabelece que qualquer operação de análise, manipulação em massa de documentos, auditoria de schemas ou validação de lógica de jogo **DEVE ser escrita e executada como um script real em sandbox** (Node.js ou Python).

### 2. Eficiência de Tokens via Processamento em Memória
- **Anti-Padrão (Desperdício de Tokens):** Despejar centenas de itens de compêndios ou arquivos brutos de mundo diretamente no prompt do LLM.
- **Padrão CodeAct:** Escrever um script em Node.js ou Python que carrega, filtra, agrega e normaliza os dados diretamente no sandbox em memória, retornando apenas a resposta sintetizada (`stdout`) para a conversa.

### 3. Operações em Lote com MCP (Batching Programático)
Ao utilizar os servidores MCP do Foundry VTT (`master-of-foundryvtt-mcp`, `ninjos-foundry-mcp`, `foundryvtt-mcp`):
- Escrever scripts que executam operações em lote diretamente no endpoint local ou via socket, reduzindo rodadas de turnos.
- Realizar checagem ativa do estado do sistema (versão ativa da API, integridade de documentos e esquemas) antes de persistir alterações.
- Tratar exceções de ponta a ponta (`try / catch` em JS ou `try / except` em Python) com logs diagnósticos em `stderr`.

### 4. Verificação de Documentação e Engenharia Reversa (REA)
- Nunca adivinhar métodos ou esquemas de dados. Consulte sempre as referências oficiais (`kb/`, `versions/`).
- Utilize as ferramentas de engenharia reversa do REA (`rea-agents`) para inspecionar sistemas, módulos empacotados ou o core do Foundry antes de implementar soluções.
