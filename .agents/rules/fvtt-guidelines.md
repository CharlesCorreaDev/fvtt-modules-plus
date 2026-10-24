# Diretrizes Operacionais do Workspace (.agents/rules/fvtt-guidelines.md)

Este documento dita as normas de trabalho para o ecossistema `fvtt-modules-plus` voltado ao Foundry VTT v14.

## 1. Gestão de Repositório e Sincronização
- Repositório Remoto: `https://github.com/CharlesCorreaDev/fvtt-modules-plus.git`
- Manter branch principal sincronizada e validar tags semânticas antes de disparar releases.
- Monitorar issues e alertar o Mestre Charles Corrêa sobre demandas e bugs críticos.

## 2. Padrão Obrigatório Bilíngue & Dois Níveis (Commits, Tags e Releases)
Sempre redigir mensagens de commits, anotações de tags (`git tag -a`) e notas de GitHub Releases estruturadas com:
- `[PT-BR]`
  - Técnico: Alterações de baixo nível (hooks, APIs, schemas, data models v14, migrações).
  - Leigo / Acessível: O que o usuário/mestre sentirá na prática (funcionalidade visível na mesa ou correção de bug).
- `[EN]`
  - Technical: Low-level explanations for developers.
  - Non-technical / Accessible: Plain-language explanation for Foundry VTT game masters and players.

## 3. Publicação Oficial no Foundry VTT (v14)
- Manifestos `module.json` / `system.json` devem:
  - Definir `compatibility.minimum`, `compatibility.verified` (v14).
  - Ter URLs públicas de `manifest` e `download` apontando para a release no GitHub.
  - Respeitar diretrizes de licença aberta (MIT / GPL / Foundry Limited License).
  - Evitar chamadas depreciadas de APIs das versões anteriores.
  - Adicionar dados de autoria e parcerias em `authors` (incluindo links de redes sociais e comunidade Salinha via `flags`).

## 4. Estrutura Central vs. Individual de Pacotes
- **Raiz do QG**: `README.md` central e `CHANGELOG.md` central consolidando todo o repositório.
- **Diretório de cada Pacote (`modules/<nome>`, `systems/<nome>`, `macros/<nome>`)**:
  - `README.md` específico com documentação, instruções e exemplos.
  - `CHANGELOG.md` próprio com histórico detalhado bilíngue (Técnico e Leigo).
  - `VERSION`: Arquivo de texto simples contendo a versão semântica aprovada.
  - **Importante**: Atualizações e publicações só são efetuadas com a aprovação explícita do desenvolvedor (Mestre Charles Corrêa).

## 5. Macros e Ferramentas
- Macros devem ser compatíveis com a arquitetura assíncrona do Foundry v14 (`canvas`, `game.actors`, `fromUuid`, etc.).
- Sempre incluir documentação de cabeçalho explicativa em cada script/macro.

## 6. Execução Obrigatória em Code Mode / Code-as-Action (CodeAct)
- Todas as operações operacionais, diagnósticos, migrações de dados, validação de manifestos e automações de release devem ser conduzidas emitindo e executando código/scripts executáveis.
- O agente utiliza o ciclo fechado de execução: escreve código $\rightarrow$ executa $\rightarrow$ inspeciona saídas $\rightarrow$ corrige se necessário.
