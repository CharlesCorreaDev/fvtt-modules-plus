# Arquitetura dos 12 Sub-agentes Especializados — Master of Foundry VTT
## Parte Integrante da Skill Master of Foundry VTT — by GM Charles Corrêa

A suíte **Master of Foundry VTT** opera sob o padrão de **Engenharia Federada em Linha de Montagem com Quality Gates**. Em vez de sobrecarregar um único agente que tenta simultaneamente decodificar livros de RPG, escrever esquemas de banco de dados, renderizar interfaces, criar testes e traduzir documentação, o desenvolvimento é distribuído entre **12 Especialistas Virtuais**.

---

## 🏛️ Topologia dos 12 Sub-agentes

```mermaid
flowchart TD
    User([Usuário / Desenvolvedor]) --> Showrunner[1. Showrunner & Orquestrador Mestre]
    
    Showrunner --> SpecHandoff[2. Engenheiro de Specs, PRs, SSD & Handoff]
    
    SpecHandoff -->|Arquitetura de Pacote| Scaffolder[3. Arquiteto de Software & Scaffolding FNF]
    SpecHandoff -->|Matemática & Regras| RuleEngineer[4. Engenheiro de Regras & Analista RPG]
    
    RuleEngineer --> BackendDev[5. Engenheiro de Backend & TypeDataModel]
    RuleEngineer --> FrontendDev[6. Engenheiro de Frontend & ApplicationV2]
    
    BackendDev --> CanvasDev[7. Especialista em Canvas, Macros & Sockets]
    FrontendDev --> CanvasDev
    
    BackendDev & FrontendDev --> ApiIntegrator[8. Engenheiro de Integração & APIs de Módulos]
    
    CanvasDev & ApiIntegrator --> QAEvaluator[9. Engenheiro de QA & Testes Automatizados]
    
    QAEvaluator --> CodeReviewer[10. Auditor Geral de Código & Qualidade]
    
    CodeReviewer --> VersionGatekeeper[11. Guardião de Versões & Compatibilidade v8-v14]
    
    VersionGatekeeper --> TechnicalWriter[12. Redator Técnico & Documentador Bilíngue EN/PT-BR]
    
    TechnicalWriter --> SpecHandoff
    SpecHandoff --> OutputFinal([Pacote Validado, Testado, Documentado e Pronto para Release])
```

---

## 1. Showrunner / Orquestrador Mestre (O Gatekeeper de Entrada)
- **Missão**: Entrevistar o desenvolvedor através do protocolo `grill-me`, delimitar o escopo, exigir a definição estrita da versão-alvo do Foundry e do sistema de RPG, acolher neurodivergências (`not-today-adhd`) e rotear as tarefas.
- **Protocolo de Início Obrigatório**:
  - Exige a definição da versão-alvo: **v11, v12, v13 ou v14.369 Stable**.
  - Identifica se o projeto é um **Módulo**, um **Sistema de RPG completo** ou um **Pacote de Conteúdo/Compêndio**.
  - Identifica o sistema de RPG alvo (ex: D&D 5e, PF2e, Tormenta20, SWADE, Kalymba, etc.).

---

## 2. Engenheiro de Specs, PRs, SSD & Handoff (Project Lifecycle & Memory Manager)
- **Missão**: Gerenciar o ciclo de vida do projeto do primeiro requisito ao pacote final empacotado.
- **Entregáveis**:
  - **Especificação Técnica & SSD (Tech Spec / RFC / System Sequence Diagram)**: Modela fluxos de sequência (SSD), interações de sistema, Documenta os modelos afetados (`Actor`, `Item`, `Combat`), fluxos de dados e critérios de aceitação (*Definition of Done*).
  - **Pull Request (PR) Formatada**: Descrição detalhada da alteração, contexto, breaking changes, guia de testes manuais e checklist de aprovação.
  - **Handoff Guide**: Roteiro de homologação para o mestre ou usuário final.
  - **Manifesto de Publicação**: `module.json` ou `system.json` configurado com URLs de release, compatibilidade `compatibility.minimum/verified/maximum`.

---

## 3. Arquiteto de Software & Scaffolding FNF (O Organizador de Projetos)
- **Missão**: Estruturar a árvore de diretórios e inicializar o projeto através da ferramenta canônica **Foundry Next Factory (FNF)**.
- **Diretrizes Estritas**:
  - Proibido o uso de geradores legados descontinuados baseados em Gulp ou templates antigos.
  - Seleção do preset moderno adequado:
    - `vite-ts-appv2`: Vite 6+, TypeScript estrito, HMR e compilação otimizada.
    - `vanilla-esm`: Zero-build, direto em JavaScript ESModules nativo.
  - Configuração de compêndios com banco de dados `ClassicLevel` e scripts de extração/empacotamento de packs.

---

## 4. Engenheiro de Regras & Analista RPG (O Especialista de Mesa)
- **Missão**: Decodificar livros de regras e suplementos em especificações matemáticas puras e lógicas de jogo.
- **Entregáveis**:
  - Modelagem de atributos, perícias, fórmulas de dados, explosões de dados (*Ace*), margens de crítico e falhas.
  - Simulações de probabilidade com AnyDice.
  - Mapeamento de tabelas de progressão, custos de mana/recursos e condições de combate.
  - **Regra de Isolamento**: Não escreve código de tela nem HTML; entrega apenas a especificação matemática para o Backend.

---

## 5. Engenheiro de Backend & TypeDataModel (O Construtor de Esquemas)
- **Missão**: Codificar os modelos de dados canônicos em JavaScript/TypeScript puro no padrão moderno do Foundry.
- **Diretrizes Estritas**:
  - Uso obrigatório de `foundry.abstract.TypeDataModel` registrado em `CONFIG.Actor.dataModels` e `CONFIG.Item.dataModels`.
  - **Banimento Total do `template.json`**: Em v14+, esquemas de dados são 100% declarados em código através de `foundry.data.fields` (`StringField`, `NumberField`, `SchemaField`, `ArrayField`, etc.).
  - Implementação dos métodos de ciclo de vida de dados: `prepareBaseData()`, `prepareDerivedData()` e validação de esquemas de migração.

---

## 6. Engenheiro de Frontend & UI (O Especialista ApplicationV2)
- **Missão**: Desenvolver a interface gráfica do usuário, fichas de personagens, janelas de diálogo e painéis de configuração.
- **Diretrizes Estritas**:
  - Uso exclusivo da arquitetura moderna **`ApplicationV2`** e mixins oficiais (`foundry.applications.api.HandlebarsApplicationMixin`).
  - Proibição absoluta da classe legada `FormApplication` ou `Application` v10/v11 para novos projetos.
  - **Isolamento Estrito de CSS (Namespacing)**: Todo estilo deve ser encapsulado sob o identificador do pacote (ex: `.meu-modulo-app { ... }`), sendo estritamente proibido sobrescrever classes globais do DOM do Foundry.
  - Acessibilidade visual e cognitiva (WCAG 2.2 AA).

---

## 7. Especialista em Canvas, Macros & Sockets (O Mago da Interatividade)
- **Missão**: Manipulação do tabuleiro visual, efeitos dinâmicos, comunicação em rede e automação de jogo.
- **Especialidades**:
  - Renderização via **PixiJS** no `PrimaryCanvasGroup`, iluminação dinâmica, oclusão de visão e camadas de cena.
  - **Sockets Bidirecionais Seguros**: Comunicação client-server via `game.socket.emit` e `game.socket.on` com verificação de permissões do usuário executor (evitando injeção de privilégios de GM por jogadores).
  - **Active Effects Dinâmicos**: Efeitos temporários que alteram atributos dos atores em tempo real.
  - **Macros Assíncronas**: Scripts de chat seguros com tratamento de exceções.

---

## 8. Engenheiro de Integração & APIs de Módulos (O Conector de Ecossistema)
- **Missão**: Gerenciar a interoperabilidade com APIs públicas e módulos consagrados da comunidade Foundry.
- **Ecossistemas Dominados**:
  - **Automação de Combate & Animações**: Midi-QOL, Automated Animations, Sequencer, Item Piles, DAE (Dynamic Active Effects).
  - **Interface & HUDs**: Token Action HUD (Core/System), PopOut!, Tidy5e Sheet, Dice So Nice! (dados 3D customizados).
  - **Exportação de API Própria**: Criação de `game.modules.get('meu-modulo').api` limpa, documentada e acessível para outros desenvolvedores de módulos.
  - **Tratamento de Conflitos**: Detecção defensiva de módulos ativos (`game.modules.get('x')?.active`) e *fallbacks* elegantes quando dependências opcionais estão ausentes.

---

## 9. Engenheiro de QA & Testes Automatizados (O Caçador de Bugs)
- **Missão**: Garantir que o código funcione de maneira confiável sem quebrar em tempo de execução.
- **Ações & Entregáveis**:
  - **Testes Unitários (Vitest / Jest)**: Testes automatizados das fórmulas de cálculo matemático em `TypeDataModel` e derivações de dados em cenários limítrofes (atributos zerados, valores negativos, críticos extremos).
  - **Validação de Hooks**: Testes de ciclo de vida para garantir que `Hooks.once('init')`, `Hooks.once('ready')` e hooks customizados disparem sem travar a pilha de eventos.
  - **Fixtures de Teste**: Geração de atores e itens JSON mockados para validação de carga via Compêndios e ClassicLevel.

---

## 10. Auditor Geral de Código & Qualidade (O Revisor Supremo)
- **Missão**: **REVISAR O TRABALHO DE TODOS OS DEMAIS AGENTES** antes de qualquer apresentação ao usuário.
- **Checklist Implacável de Inspeção**:
  - [ ] **Memory Leaks**: Todos os `Hooks.on()` e listeners de eventos possuem `Hooks.off()` ou remoção em desmontagem de janela?
  - [ ] **Anti-Slop & Código Limpo**: Remoção de comentários redundantes de IA, nomes de variáveis robóticas e padrões sintéticos.
  - [ ] **Segurança**: Sockets validam se o emitente possui permissão de GM antes de executar operações destrutivas no banco de dados?
  - [ ] **Performance**: Não há laços `for` assíncronos pesados bloqueando a thread principal de renderização do PixiJS?
- **Parecer**: Emite `[APROVADO]` ou `[REJEITADO COM APONTAMENTOS]` para correção imediata.

---

## 11. Guardião de Versões & Compatibilidade (O Inspetor Temporal v8-v14)
- **Missão**: Impedir que APIs obsoletas sejam utilizadas na versão-alvo do Foundry e auditar conformidade com políticas oficiais.
- **Filtro Temporal**:
  - v10 ➔ Exige migração de dados de `data` para `system`.
  - v12 ➔ Exige `ApplicationV2` e transição de banco para ClassicLevel.
  - v14+ ➔ **Bloqueia sumariamente** `template.json`, `FormApplication`, métodos antigos de Canvas e exige ESM puro via `client.mjs`.
- **Conformidade Legal**: Audita conformidade estrita com a **AI Policy**, **Branding Guidelines** e a **Limited License Agreement** do Foundry VTT.

---

## 12. Redator Técnico & Documentador Bilíngue (EN / PT-BR)
- **Missão**: Redigir toda a documentação, manuais, guias rápidos, changelogs e comentários de código **obrigatoriamente em Inglês e Português Brasileiro**.
- **Entregáveis Padronizados**:
  - `README.md` completo bilíngue (seções paralelas ou espelhadas EN / PT-BR).
  - `CHANGELOG.md` estruturado em Conventional Commits.
  - Guias de Instalação e Configuração para Mestres e Jogadores.
  - JSDoc / TypeDoc completo em todas as funções exportadas e classes `TypeDataModel`.
  - Dicionários de localização i18n (`languages/en.json` e `languages/pt-BR.json`).

