# Changelog - Master of Foundry VTT 🎲⚡

All notable changes to the `master-of-foundryvtt` skill will be documented in this file.  
*Todas as alterações notáveis na skill `master-of-foundryvtt` serão documentadas neste arquivo.*

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.19.0-beta] - 2026-11-09

### Added / Adicionado
- **Foundry Next Factory (FNF) como Scaffolder Oficial Mandatório:**
  - Integração do motor [Foundry Next Factory](https://github.com/CharlesCorreaDev/fvtt-modules-plus/tree/main/foundry-next-factory) (`CharlesCorreaDev/fvtt-modules-plus/foundry-next-factory`) para criação de novos módulos e sistemas do zero para Foundry VTT v13, v14.369 Stable e v15+.
  - Suporte completo aos presets `vite-ts-appv2` (Vite 6+, TypeScript estrito, `ApplicationV2` e `TypeDataModel`) e `vanilla-esm` (Zero-build, ESModules direto).

---

## [0.18.0-beta] - 2026-11-09

### Added / Adicionado
- **Instalação e Deploy do Foundry VTT em Nuvens e VPS (cloud-deployment-guide.md):** Guia mestre cobrindo Oracle Cloud (Always Free Tier - ARM Ampere 24GB), AWS (EC2), Google Cloud (GCP via github.com/google/skills), Microsoft Azure e Hostinger VPS (KVM Ubuntu), incluindo SSL automático via Caddy e UFW.
- **Auditoria Adversarial Cloudflare & Anti-Alucinação NVIDIA:** Diretrizes obrigatórias de segurança via cloudflare/security-audit-skill e blindagem contra números/modificadores inexistentes com NVIDIA/auto-ontology.

---

## [0.17.0-beta] - 2026-11-09

### Added / Adicionado
- **Prioridade Absoluta do PDF Oxide (`pdf-oxide-guide.md`):**
  - Integração do `pdf-oxide` (Node.js via N-API / Python) em **1º Lugar Obrigatório** para ingestão de PDFs de regras, aventuras, monstros, magias e itens em compêndios do Foundry VTT sem travar o event loop e com extração em ~0.8ms.
- **Motion Design para Sheets e Interfaces de Módulos (Claude-Motion):**
  - Adoção das diretrizes de `whaleyxbt/claude-motion` para animações táteis fluidas em janelas ApplicationV2, lançadores de dados e HUD.
- **Tríade Canônica: Impeccable Design, Systematic Debugging & Trail of Bits Security:**
  - Padrões visuais Impeccable contra poluição de fichas e compêndios.
  - Depuração sistemática em 4 etapas para isolar conflitos de hooks e módulos.
  - Segurança Trail of Bits para sanitização de dados e proteção de macros.

---

## [0.16.0-beta] - 2026-10-28

### Added / Adicionado
- **Perfilador de Hardware (CPU, RAM e GPU/VRAM) & Governador Adaptativo Anti-Travamento (`scripts/hardware_governor.py` e `scripts/hardware_governor.mjs`):**
  - Detecção automática do processador (`modelo da CPU` e `núcleos lógicos`), memória física (`RAM Total`, `RAM Livre` e `% em uso`) e placa de vídeo (`modelo da GPU`, `VRAM Total`, `VRAM Livre` e identificação de **GPU integrada com RAM compartilhada** vs **GPU dedicada** via `nvidia-smi`, Registro do Windows 64-bit `HardwareInformation.qwMemorySize` e `lspci`).
  - Redução automática de prioridade do processo no SO (`BELOW_NORMAL_PRIORITY_CLASS` / `0x00004000` no Windows e `os.nice(10)` no Linux/macOS) para garantir que a máquina operante nunca trave.
  - Cálculo de orçamento seguro de execução (`max_workers`, `ffmpeg_threads`, `sharp_concurrency`, `batch_size`, `batch_delay_ms`, `node_max_old_space_size_mb`) e reserva adicional de segurança de `4.0 GB` de RAM quando a GPU é integrada.
  - Orçamento de VRAM para o Canvas WebGL/PixiJS do Foundry VTT (`foundry_vram_canvas_budget`), determinando a resolução máxima segura de cenas (`4096x4096`, `8192x8192` ou `16384x16384`), limite de tiles animados WebM simultâneos e qualidade WebP ideal.
  - Guardião de memória em tempo real (`guard_memory_pressure` / `sleepAndGuardMemory`) com coleta de lixo (`gc.collect()`) e pausa automática caso o uso de RAM atinja `>= 85%`.
- **Integração nos Scripts e Servidor MCP (`scripts/check_env.py`, `scripts/convert_media.js`, `mcp/foundry_mcp_server.js` e `mcp/foundry_mcp_server.py`):**
  - Nova ferramenta MCP `inspect_hardware_budget` e inclusão automática do `hardware_budget` em `inspect_foundry_environment`.
  - Limitação dinâmica de `sharp.concurrency(safeThreads)` e `ffmpeg -threads <safeThreads>` com pausas anti-congelamento em `scripts/convert_media.js`.
- **Mandato Obrigatório 24 (`SKILL.md`):**
  - Diretrizes bilíngues (EN e PT-BR) exigindo a verificação de CPU, RAM e VRAM antes de tarefas pesadas e o cumprimento estrito dos limites calculados.

---

## [0.15.0-beta] - 2026-10-27

### Added / Adicionado
- **Diagnóstico & Resiliência na Foundry Package Release API (`guides/publishing-packages.md`):**
  - Adicionado protocolo de captura explícita de status HTTP e corpo da resposta para chamadas à Package Release API do Foundry VTT.
  - Proibição de uso de `curl -s` desacompanhado de validação de HTTP code em pipelines de CI/CD para evitar falhas silenciosas (exit code 0 em HTTP 400/401/429).
  - Alerta explícito (`::warning::`) para secrets de tokens (`FOUNDRY_RELEASE_TOKEN_*` ou `FOUNDRY_API_TOKEN`) ausentes, evitando skips silenciosos nos workflows.
  - Exemplo prático de automação com `curl -w "\nHTTP_STATUS:%{http_code}" -s -S` e verificação no runner.
  - Documentação sobre tratamento de rate-limit (HTTP 429 - 60s) e erros de validação de dados/manifesto (HTTP 400).
- **Templates de CI/CD Atualizados (`templates/github/workflows/release.yml`):**
  - Tratamento resiliente de secrets com suporte a `FOUNDRY_RELEASE_TOKEN` e `FOUNDRY_API_TOKEN`.
  - Exibição de avisos estruturados e abortagem controlada com logs detalhados de erros de API.

---

## [0.14.0-beta] - 2026-10-27

### Added / Adicionado
- **Mandato Obrigatório 22: Protocolo Interativo de Release, Versionamento & Publicação (`SKILL.md`):**
  - Gatilho automático ao concluir e aprovar o desenvolvimento de qualquer módulo ou sistema do Foundry VTT.
  - O Agente agora obrigatoriamente questiona o desenvolvedor sobre: (1) geração de nova versão semântica (Patch, Minor ou Major); (2) criação de commit, tag Git e publicação de release com assets (`module.zip`/`system.zip`); (3) disparo da atualização para o diretório oficial do Foundry VTT via API de Release com `FOUNDRY_API_TOKEN`.
- **Mandato Obrigatório 23: Protocolo de Wiki Técnica & Documentação Minuciosa (`SKILL.md`):**
  - Exigência inegociável de criação ou atualização da Wiki do pacote (`WIKI.md` ou pasta `wiki/`), cobrindo guia completo para Mestres e Jogadores, referência minuciosa de APIs, namespaces e métodos (com tipos JSDoc e macros de exemplo), catálogo de hooks customizados e tratados, arquitetura de DataModels (`TypeDataModel`) e troubleshooting.
- **Novo Guia Técnico Dedicado (`guides/wiki-and-release-lifecycle.md`):**
  - Manual estruturado sobre padronização de Wikis explicativas e fluxo de aprovação e publicação de pacotes Foundry VTT.

---

## [0.13.0-beta] - 2026-10-26

### Added / Adicionado
- **Mandato Obrigatório 14 Atualizado: Protocolo Zero Emojis & Alinhamento blader/humanizer (`SKILL.md`):**
  - Remoção obrigatória e total de emojis por padrão em todos os textos, códigos, documentações e diários do Foundry VTT gerados, eliminando um dos principais gatilhos sintéticos de detecção de IA. O uso de emojis torna-se estritamente restrito a pedidos explícitos do usuário.
  - Alinhamento mandatório e contínuo com os 26 padrões canônicos da especificação [blader/humanizer](https://github.com/blader/humanizer) e da skill [`humanizer-plus`](../humanizer-plus) em qualquer entrega de código ou narrativa.
  - Atualização dos scripts [`scripts/sanitize_content.js`](scripts/sanitize_content.js) e [`scripts/sanitize_content.py`](scripts/sanitize_content.py) com regex Unicode abrangente e remoção de emojis por padrão (com flag opcional `--keep-emojis`).
- **Ferramenta Nativa de Publicação & Auditoria (`scripts/foundry_package_publisher.mjs`):**
  - Script autônomo completo para validação prévia de código (anti-alucinações de IA), conferência de arquivos obrigatórios (`VERSION` no formato `1.0.0.0`, `README.md`, `CHANGELOG.md`), validação via Foundry CLI, empacotamento seguro em `.zip` e disparo direto na API oficial (`https://foundryvtt.com/_api/packages/release_version/`).
  - Suporte a notificações instantâneas por E-mail (via Resend/SendGrid) e SMS (via Twilio) pós-publicação.
- **Manual de Publicação e Marketplace Atualizado (`guides/publishing-packages.md`):**
  - Distinção clara entre o formulário comunitário (`NEW PACKAGE SUBMISSION`) e o formulário de pacotes aprovados (`EDIT PACKAGE FORM`).
  - Guia completo de conformidade legal, AI Content Policy, regras de precificação da loja oficial ([fvtt.store](https://fvtt.store/)) e processo para se tornar um Fornecedor de Conteúdo (Content Provider) com a MetaMorphic Digital Studio.
  - Regra de ouro absoluta de segurança: proibição de credenciais no código e obrigatoriedade de uso do GitHub Secrets.

---

## [0.12.0-beta] - 2026-10-25

### Added / Adicionado
- **Servidor MCP Nativo Oficial Unificado (`master-of-foundryvtt-mcp`):**
  - Servidor MCP completo em Node.js sem dependências externas, unificando todo o controle de Foundry VTT e dispensando módulos MCP terceiros (`ninjos`, `laurigates`, `adambdooley`).
  - Novas ferramentas implementadas: `reverse_engineer_target` (suporte a código do core, sistemas, módulos locais e repositórios remotos git desinstalados) e `inspect_live_foundry_state` (checagem de status em tempo real via `/api/status`).
  - Suporte a detecção de Sistema Operacional (Windows, Linux, macOS) e topologia de hospedagem (Local, Nuvem, The Forge, Molten, Docker Containers, e Hostinger VPS com 20% OFF).
  - Gate estrito de verificação de ícones HTTP 200 com fallback automático para SVGs do core e exclusividade de permissões do GM (`ownership: { default: 0 }`).
- **Mandato Obrigatório 18 (Verificação e Revisão Sistemática):**
  - Diretiva de testar, compilar (`node -c`) e revisar todo e qualquer código, ficha, script ou schema antes da entrega.
- **Mandato Obrigatório 19 & Guia de UI/UX Responsiva com Bootstrap Prefixado (`guides/bootstrap-prefixed-ui.md`):**
  - Obrigação de prefixar todas as classes do Bootstrap com o ID do sistema/módulo (ex: `.yze-btn-primary`, `.yze-card`) para evitar colisão com o DOM do Foundry VTT.
  - Paleta padrão oficial de 9 tons frios/azuis profundos (`#F3F6FA` até `#091633`) e gate de customização para paletas de 3 cores + 3 destaques.
  - Catálogo de bibliotecas de ícones aprovadas: **Game-Icons.net**, **RPG Awesome**, **Font Awesome**, **Bootstrap Icons** e **Get Social Font**.
- **Mandato Obrigatório 20 & Guia de Modelagem AnyDice (`guides/anydice-dice-mechanics.md`):**
  - Modelagem estatística e validação matemática de probabilidades de dados e balanceamento de regras com AnyDice antes da conversão para fórmulas `Roll` do Foundry.
- **Mandato de Comentários Bilíngues de Código (Inglês e Português):**
  - Regra em `guides/humanization-and-clean-code.md` e `guides/fullstack-foundry-dev.md` exigindo que qualquer comentário de código necessário seja escrito simultaneamente em Inglês e Português.

---

## [0.11.0-beta] - 2026-10-25

### Added / Adicionado
- **Mandato Obrigatório 14: Humanização de Conteúdo, Código Limpo & Anti-Detecção de IA (`SKILL.md`):**
  - **Camada A (Saneamento Determinístico):** Purga de caracteres zero-width (`U+200B`, `U+FEFF`, `U+200C`, etc.), substituição de aspas tipográficas curvas por aspas retas ASCII em código/JSON e eliminação de metadados de ferramentas geradoras em arquivos de manifesto.
  - **Camada B (Código Limpo & Macros Idiomáticas):** Padrões comunitários concisos de JavaScript (*early returns*, encadeamento opcional `?.`, ausência de comentários óbvios linha a linha e remoção de cabeçalhos de IA).
  - **Camada C (Narrativa & Anti-Slop de RPG):** Eliminação de clichês e vícios de modelos de linguagem (aberturas infladas, oposições binárias forçadas e tríades simétricas de adjetivos) em diários, itens e fichas, injetando tom natural de mestre e detalhes concretos.
- **Guia Técnico de Humanização (`guides/humanization-and-clean-code.md`):**
  - Guia de referência com exemplos práticos "Antes vs Depois" de macros e diários, tabela de substituições de vícios de linguagem e instruções para purga de metadados em mídias.
- **Script Utilitário de Saneamento (`scripts/sanitize_content.py`):**
  - Script em Python para inspeção e remoção em lote de caracteres invisíveis, aspas tipográficas e cabeçalhos de IA em arquivos do Foundry VTT (`.js`, `.mjs`, `.json`, `.md`, `.hbs`).
- **Base de Conhecimento Especializada Savage Worlds (SWADE):**
  - Integração do ecossistema oficial da **Pinnacle Entertainment Group (PEGinc)** ([`peginc.com`](https://peginc.com/), loja oficial, cenários como Deadlands, Necessary Evil e Savage Rifts, VTT products, One Sheets gratuitas, ACES e SWAG), acervo de artigos e guias táticos/regras do Mestre Charles Corrêa (`rpg.charlescorrea.com.br`), prompts de IA para Savage Worlds (`RPGPlus`), acervo editorial da Odyssey Publicações (`odysseypub.com.br`) e podcast oficial em [`systems/07-generic-and-rules-light.md`](systems/07-generic-and-rules-light.md#savage-worlds-swade).
- **Base de Dados e Ferramentas D&D 5e (SRD API, 5eTools & Suíte Plutonium):**
  - Inclusão da **D&D 5e SRD API** ([`docs.dnd5eapi.co`](https://docs.dnd5eapi.co/introduction)), ecossistema **5eTools** ([`5e.tools`](https://5e.tools), [`2014.5e.tools`](https://2014.5e.tools/), repositórios `5etools-src`, `5etools-img`) e a suíte completa **Plutonium / TheGiddyLimit** ([`plutonium-next`](https://github.com/TheGiddyLimit/plutonium-next), [`plutonium-addon-automation`](https://github.com/TheGiddyLimit/plutonium-addon-automation), [`plutonium-scenes`](https://github.com/TheGiddyLimit/plutonium-scenes), [`homebrew`](https://github.com/TheGiddyLimit/homebrew), [`unearthed-arcana`](https://github.com/TheGiddyLimit/unearthed-arcana)) em [`systems/01-d20-and-fantasy.md`](systems/01-d20-and-fantasy.md#1-dungeons--dragons-5th-edition-dnd5e).
- **Bases de Regras e SRDs de Pathfinder 2e (PF2e):**
  - Inclusão do **Archives of Nethys** ([`2e.aonprd.com`](https://2e.aonprd.com/)), **PF2 SRD PT-BR** ([`pf2srd.com.br`](https://pf2srd.com.br/)) e **d20PFSRD** ([`pf2.d20pfsrd.com`](https://pf2.d20pfsrd.com/)) em [`systems/01-d20-and-fantasy.md`](systems/01-d20-and-fantasy.md#2-pathfinder-2nd-edition-pf2e).
- **Base de Conhecimento Year Zero Engine (YZE) & Portfólio Free League:**
  - Inclusão do **SRD Oficial YZE** ([`YZE-Standard-Reference-Document.pdf`](https://freeleaguepublishing.com/wp-content/uploads/2023/11/YZE-Standard-Reference-Document.pdf)), artigo da Odyssey Publicações, hubs de VTT e catálogo completo de jogos (Alien, Blade Runner, Vaesen, Twilight: 2000, Forbidden Lands, Coriolis, Mutant, The Walking Dead, Tales from the Loop, Electric State, The One Ring, Symbaroum, Pirate Borg, Outgunned, Dragonbane, Mörk Borg, Cy_Borg) em [`systems/04-year-zero-engine.md`](systems/04-year-zero-engine.md).
- **Base de Dados, SRD Oficial & Homebrew Kit de Daggerheart:**
  - Inclusão do **Daggerheart SRD Oficial** ([`daggerheart.com/srd/`](https://www.daggerheart.com/srd/)), portal oficial, downloads de fichas, licença comunitária **DPCGL 2.0** e o **Homebrew Kit Oficial v1.0** em [`systems/01-d20-and-fantasy.md`](systems/01-d20-and-fantasy.md#3-daggerheart-daggerheart).
- **Mandatos de Ingestão no `SKILL.md`:** Diretriz 4 atualizada em inglês e português para consulta obrigatória destas bases especializadas de SWADE, D&D 5e / Plutonium, Pathfinder 2e, YZE / Free League e Daggerheart.

---

## [0.10.0-beta] - 2026-10-24

### Added / Adicionado
- **Protocolo Obrigatório 13: Code Mode & Sandbox Orchestration (CodeAct):**
  - Implementado o paradigma estrito de Code-as-Action: tarefas de desenvolvimento, manipulação de compêndios, cálculos mecânicos e consumo de dados devem priorizar a execução de scripts reais no sandbox (Node.js/Python), reduzindo drasticamente o consumo de tokens na janela de contexto através de filtragem em memória.
  - Testabilidade antes da entrega (validação sintática de macros, funções e patches antes de fornecer a resposta).
  - Execução programática e em lote com servidores MCP (`master-of-foundryvtt-mcp`, `ninjos-foundry-mcp`, etc.).
  - Mandato explícito de sempre consultar a documentação oficial (`kb/`, `versions/`) e acionar ferramentas de REA (`rea-agents`) para inspeção de esquemas e código em engenharia reversa.
- **Guia Operacional Dedicado (`guides/code-mode-sandbox-orchestration.md`):**
  - Documentação bilíngue completa com diretrizes, anti-padrões e boas práticas de orquestração de scripts sandbox no Foundry VTT.
- **Auto-Atualizador Semanal & Alerta Autônomo ao Desenvolvedor (Mandato 12 & `scripts/check_skill_updates.py`):**
  - Script autônomo para verificação periódica de atualizações da skill.
  - Diretriz mandatória no Mandato 12 para checar semanalmente por novas versões da skill e, em caso de versão divergente/mais recente, comunicar o desenvolvedor e executar a atualização automaticamente com preservação de memórias (`memory/`).

---

## [0.9.0-beta] - 2026-10-23

### Added / Adicionado
- **Arquivo `VERSION` e Mandato 12 de Versionamento Semântico:**
  - Adicionado arquivo `VERSION` dedicado (`0.9.0-beta`) e mandato obrigatório para o Agente ler o arquivo, alertar o desenvolvedor sobre a versão ativa e seguir rigorosamente o SemVer nas atualizações.
- **Detecção de Instalação Existente e Alerta de Sobrescrita Consciente (Mandato 11):**
  - Protocolo para verificar se a skill já está presente no projeto local ou globalmente (`~/.gemini/config/skills/`, `~/.claude/skills/`, `~/.agents/skills/`), emitindo alerta transparente antes de atualizar/reinstalar e preservando memórias locais (`memory/`).
- **Motores de Regras do Tio Nitro (`systems/07-generic-and-rules-light.md`):**
  - Ingestão completa das mecânicas, regras e arquitetura de dados dos sistemas de Nitro: **3d6World**, **2d6World**, **Pocket 2d6World**, **2d10Solo** e **2d6Solo**.
- **Compêndio de 60 Engines de RPG para Engenharia Reversa (`kb/09-rpg-engines-and-mechanics.md`):**
  - Guia aprofundado com matriz técnica cobrindo 60 motores de RPG (resolução de dados, esquemas de dados, hooks e padrões de implementação no Foundry VTT).
- **Engenharia Reversa Completa do Core v14.369 (`kb/08-core-reverse-engineering-v14.md`):**
  - Mapeamento detalhado dos pacotes internos do Foundry v14 (`@foundryvtt/foundryvtt`, `@foundryvtt/commons`, ESM, DataModels, ApplicationV2).
- **Suporte a Engenharia Reversa com REA (`guides/reverse-engineering.md`):**
  - Integração com `rea-agents` (REA MCP/CLI), setup de ambiente automatizado (`scripts/setup_dev_env.py`) e diretório de memórias locais persistentes (`memory/learnings.md`).
- **Hierarquia e Protocolo de Ícones Padrão (Mandato 9):**
  - Prioridade mandatória para ícones core do Foundry (`icons/...`), ícones dedicados de sistemas e fallback seguro para SVGs padrão (`icons/svg/...`).
- **Guia de Armadilhas Automáticas e Gatilhos (`guides/automated-traps-and-triggers.md`):**
  - Documentação bilíngue de automação com Sequencer, Monk's Active Tile Triggers (MATT), JB2A e Item Piles.
- **Mandato 8 de Esclarecimento Interativo e Escopo Transparente:**
  - Portão obrigatório de perguntas antes de criar qualquer documento ou cena, prevenindo alucinações de dados incompletos.
- **Expansão do Servidor MCP Nativo (`master-of-foundryvtt-mcp`):**
  - Ferramentas nativas para `create_scene` (com geração de paredes e iluminação), `create_combat`, `create_playlist`, `create_deck` e `create_compendium_pack`.
  - Persistência direta em mundos ativos via sessão GM autenticada.
  - Script auxiliar `generate_macro.py` para injeção pública em lote via macros.
- **Expansão do Catálogo de RPG para +100 Sistemas:**
  - Mapeamento detalhado de sistemas famosos e de nicho em `systems/` com protocolo de descoberta dinâmica paginada no diretório oficial e busca na Loja Oficial do Foundry VTT.
- **Guias Técnicos Especializados:**
  - Documentação de WebSockets, Combat Tracker, Active Effects v14 e linhagem D&D 3.5e/dnd35e.
  - Suporte à CLI oficial `@foundryvtt/foundryvtt-cli` e `fvtt-world-cli` (`guides/cli-tools.md`).

### Changed / Alterado
- **Remoção de Travas de Engenharia Reversa:** Atualização das diretrizes para encorajar análise e inspeção de código e APIs do core e de sistemas para maior precisão no desenvolvimento.
- **Atribuição Oficial nos MCPs:** Flags e metadados padronizados para *"Master of Foundry VTT MCP by Mestre Charles Corrêa - rpg.charlescorrea.com.br"*.
- **Compatibilidade v12–v14 em Tabelas:** Atualizado o tipo de resultado de `RollTable` no MCP para formato string `text` em conformidade com o DataModel moderno.
- **Simetria Bilíngue:** Seções em inglês e português do `SKILL.md` e `systems/README.md` equalizadas de forma 100% espelhada.

---

## [0.8.0-beta] - 2026-09-09

### Added / Adicionado
- **Servidor MCP Nativo e Pontes Externas:**
  - Suporte e templates para `ninjos-foundry-mcp`, `foundryvtt-mcp` e `adambdooley/foundry-vtt-mcp`.
  - Manual de instalação do servidor MCP nativo (`mcp/INSTALLATION.md`).
- **Base de Conhecimento Operacional (`kb/`):**
  - Capítulos 01 a 06 cobrindo Hospedagem, Iluminação/Visão, Atores/Tokens, Rolagens, WebRTC e Compêndios.
- **Guias da API do Foundry v8 a v14:**
  - Documentação estruturada por versão e rotina mensal de atualização (`scripts/update_foundry_docs.py`).
- **Suporte Inicial para mais de 60 Sistemas de RPG:**
  - Organização por categorias em `systems/` cobrindo D20, Storyteller, Horror, YZE, Sci-Fi e Narrativos.

---

## [0.1.0-beta] - 2026-09-09

### Added / Adicionado
- Criação inicial da skill `master-of-foundryvtt` por GM Charles Corrêa.
- Mandatos 1 a 6 estabelecendo version gate, conformidade de licenças, protocolo MCP e recuperação autônoma de erros.
