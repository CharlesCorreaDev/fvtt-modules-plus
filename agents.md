# Diretrizes do Agente & QG Foundry VTT v14 (fvtt-modules-plus)

## 📌 Visão Geral do Projeto
- **Nome do Projeto / QG**: `fvtt-modules-plus`
- **Repositório GitHub**: [https://github.com/CharlesCorreaDev/fvtt-modules-plus.git](https://github.com/CharlesCorreaDev/fvtt-modules-plus.git)
- **Autor / Desenvolvedor Principal**: Mestre Charles Corrêa (`CharlesCorreaDev`)
- **Plataforma Alvo**: Foundry VTT v14
- **Objetivo**: QG (Quartel General) para desenvolvimento, documentação, manutenção, empacotamento, versionamento e publicação de módulos, sistemas e macros para Foundry Virtual Tabletop (v14).

---

## 🎯 Atribuições & Papel do Agente
1. **Auxílio Integral na Documentação**:
   - Manutenção de `README.md`, `CHANGELOG.md`, documentação de arquitetura, guias de instalação, compatibilidade e guias de uso.
2. **Ciclo de Vida & Publicação no Foundry VTT**:
   - Auxiliar na publicação e homologação oficial/autorizada de módulos e sistemas junto ao Foundry VTT Hub/Package Directory (cumprindo manifestos `module.json` / `system.json`, licenças, URLs e regras oficiais).
   - Validação prévia de compatibilidade: `compatibility.minimum`, `compatibility.verified` (v14).
3. **Macros para Foundry VTT**:
   - Criação, teste, organização e documentação de macros (JavaScript/Chat) para Foundry VTT v14.
4. **README, CHANGELOG e VERSION Individuais vs Centrais**:
   - **Central**: `README.md` e `CHANGELOG.md` na raiz com visão geral de todo o QG, redes sociais, convite da Salinha e índice de pacotes.
   - **Por Pacote (módulo, sistema ou macros)**:
     - Cada pasta de módulo, sistema ou macro terá seu próprio `README.md`, seu próprio `CHANGELOG.md` e um arquivo `VERSION` dedicado contendo a versão semântica aprovada.
     - Nenhuma publicação ou atualização de versão pode ocorrer sem a autorização explícita do desenvolvedor (Mestre Charles Corrêa).
5. **Versionamento Semântico (SemVer)**:
   - Aplicação rigorosa de regras `MAJOR.MINOR.PATCH` (ex: `1.0.0`):
     - `MAJOR`: Quebra de compatibilidade ou mudanças estruturais que afetam compatibilidade de mundos/v14.
     - `MINOR`: Novas features, novos hooks, macros ou adições retrocompatíveis.
     - `PATCH`: Correções de bugs, pequenas correções visuais e ajustes de compatibilidade.
6. **Tags e Releases no GitHub**:
   - Criação de tags semânticas (ex: `v1.0.0` ou `<package>-vX.Y.Z`).
   - Geração de notas de release detalhadas e pacotes `.zip` de manifesto de download (ex: `manifest.json` apontando para release asset).
7. **Gestão de Parcerias e Co-autoria**:
   - Suporte e crédito a parceiros de desenvolvimento nos manifestos (`authors`), `README.md` e notas de lançamento.
8. **Gestão de Issues & Alertas**:
   - Leitura periódica e triagem de issues do repositório GitHub.
   - Alertar ativamente o usuário sobre bugs críticos, pedidos de funcionalidades ou incompatibilidades relatadas pela comunidade.

---

## 🌐 Identidade Oficial, Comunidade e Redes do Mestre Charles Corrêa
- **Blog Oficial**: `https://rpg.charlescorrea.com.br`
- **GitHub**: `https://github.com/CharlesCorreaDev`
- **Instagram**: `https://www.instagram.com/mestrecharlescorrea`




- **Comunidade Salinha**: `https://salinha.live/?c=6BMDF9#g=qrhshrw76y7m`
- **Comunidade WhatsApp**: `https://chat.whatsapp.com/FSr7xgejDqoHkfrrA5GxXj`
- *Nota para Manifestos Foundry (`module.json` / `system.json`)*:
  - Campos suportados nativamente pelo Foundry v14 para redes e links: `url` (site principal/repositório), `manifest`, `download`, `readme`, `changelog`, `bugs` (issues), e no objeto de cada autor em `authors`:
    ```json
    "authors": [
      {
        "name": "Mestre Charles Corrêa",
        "url": "https://rpg.charlescorrea.com.br",
        "email": "contato@charlescorrea.com.br",
        "discord": "charlescorrea",
        "flags": {
          "github": "https://github.com/CharlesCorreaDev",
          "salinha": "https://salinha.live/?c=6BMDF9#g=qrhshrw76y7m",
          "youtube": "https://www.youtube.com/@mestrecharlescorrea",
          "instagram": "https://www.instagram.com/mestrecharlescorrea"
        }
      }
    ]
    ```



---

## ⚡ Paradigma de Execução Obrigatório: Code Mode / Code-as-Action (CodeAct)

O agente deve operar **obrigatoriamente** sob o paradigma **Code Mode / Code-as-Action (CodeAct)**:
1. **Ação via Código Executável**:
   - Em vez de realizar tarefas complexas, transformações de dados ou análises através de múltiplos passos manuais ou respostas meramente textuais, o agente deve gerar e executar blocos de código/scripts (PowerShell, Node.js, Python, Git scripts, manipulação direta de AST ou dados de compêndios) para interagir com o ambiente e validar hipóteses.
2. **Ciclo de Feedback em Loop Fechado**:
   - Executar código $\rightarrow$ Observar stdout/stderr $\rightarrow$ Ajustar dinamicamente $\rightarrow$ Confirmar a resolução do problema.
3. **Automação e Rigor**:
   - Para manipulação em massa de manifestos (`module.json`), migrações de esquemas de dados do Foundry VTT v14, empacotamento de releases (`.zip`), validações de sintaxe de macros e checagens de integridade, deve-se sempre priorizar scripts automatizados e testados.
4. **Inspeção e Validação**:
   - Códigos devem ser auto-contidos, seguros, idempotentes e apresentar logs claros de execução.

---

## 📝 Padrão Obrigatório Bilíngue & Dois Níveis (Commits, Tags e Releases)

Todo **Commit**, **Tag anotada** e **GitHub Release** deve seguir obrigatoriamente o formato bilíngue (`PT-BR` e `EN`) e estruturado em dois níveis de profundidade: **Técnico** e **Leigo (Acessível)**. Isso garante clareza total tanto para desenvolvedores quanto para mestres e jogadores da comunidade Foundry VTT.

### 1. Estrutura de Commits:
```text
<tipo>(<escopo>): <resumo curto em inglês ou português>

[PT-BR]
- Técnico: <descrição técnica detalhada das alterações, métodos, hooks ou arquivos>
- Leigo: <explicação simples, amigável e direta sobre o que mudou ou foi corrigido para quem joga ou mestra>

[EN]
- Technical: <detailed technical explanation of changes, methods, hooks, or files>
- Non-technical: <simple and accessible description of what was added or fixed for users>
```

### 2. Estrutura de Tags Anotadas (`git tag -a vX.Y.Z -m "..."`):
As tags anotadas devem conter a mensagem bilíngue resumida para consulta rápida via `git tag -n` ou `git show`:
```text
Release vX.Y.Z - <Título / Title>

[PT-BR]
- Técnico: <resumo das quebras de compatibilidade, migrations ou novos endpoints/APIs>
- Leigo: <resumo dos principais recursos e melhorias para a mesa de jogo>

[EN]
- Technical: <summary of breaking changes, migrations, or new APIs>
- Non-technical: <summary of major features and game table enhancements>
```

### 3. Estrutura de Releases no GitHub & Changelogs:
Ao redigir o corpo da Release no GitHub e atualizar o `CHANGELOG.md`:
```markdown
# Release vX.Y.Z

## 🇧🇷 Português (Brasil)
### 🎲 Para Mestres e Jogadores (Visão Acessível)
- Explicação clara de cada novidade, visual ou facilidade de uso na mesa.
- Correções perceptíveis durante as sessões de jogo.

### ⚙️ Para Desenvolvedores (Visão Técnica)
- Métodos atualizados, hooks deprecados/adicionados no Foundry v14.
- Alterações em `module.json` / `system.json`, flags, schemas de dados e compêndios.

---

## 🇺🇸 English
### 🎲 For Game Masters and Players (Accessible View)
- Clear explanation of new features, UX improvements, and session tools.
- Fixes noticed during game sessions.

### ⚙️ For Developers (Technical View)
- Updated methods, deprecated/new Foundry v14 hooks.
- Changes to `module.json` / `system.json`, flags, data schemas, and compendiums.
```

---

## 🛠️ MCPs e Skills Recomendados & Em Uso
- **`ninjos-foundry-mcp`**: Já disponível para manipulação de documentos, cenas, atores, macros, compêndios e testes no Foundry VTT.
- **`issues` / GitHub CLI**: Integração para leitura e triagem de issues do GitHub.
- **`playwright` / Browser MCP**: Testes de interface e validação visual de janelas e HUD no Foundry VTT.

*(Caso sejam necessárias ferramentas extras como sincronização remota automatizada ou validação estrita de esquemas de manifestos do Foundry v14, serão notificadas ao usuário).*
