# 📜 CHANGELOG - Guia de Metamoedas by Thorunn

Todas as alterações deste módulo estão documentadas neste arquivo com suporte bilíngue e em dois níveis de leitura.

---

## [1.0.0.2] - 2026-10-27

### 🇧🇷 Português (Brasil)
#### 🎲 Para Mestres e Jogadores (Leigo / Acessível)
- **Autorização Oficial Anexada**: Inclusão formal da autorização por escrito concedida pela autora original Gabrieli Rizzo (Mestra Thorunn) para a adaptação das regras ao Foundry VTT.
- **Transparência e Conformidade**: Atualização do `README.md` com menção expressa de respeito às políticas de propriedade intelectual e licenças oficiais.

#### ⚙️ Para Desenvolvedores (Técnico)
- **Documentação de Propriedade Intelectual**: Adicionado PDF comprobatório em `docs/Adaptação do Guia de Metamoedas para módulo do Foundry VTT _ Autorização.pdf`.
- **Manifest e Distribuição**: Atualizada versão do manifest para `1.0.0.2` e endpoint de download associado à release do GitHub.

---

### 🇺🇸 English
#### 🎲 For Game Masters and Players (Accessible View)
- **Official Authorization Document**: Formal inclusion of the written authorization granted by original author Gabrieli Rizzo (Mistress Thorunn) for adapting rules into Foundry VTT.
- **Transparency & IP Compliance**: Updated `README.md` with explicit attribution conforming to Foundry VTT intellectual property policies and licenses.

#### ⚙️ For Developers (Technical View)
- **Legal & Compliance Documentation**: Added formal authorization PDF under `docs/Adaptação do Guia de Metamoedas para módulo do Foundry VTT _ Autorização.pdf`.
- **Manifest & Distribution**: Bumped module version to `1.0.0.2` and updated GitHub release download asset URL.

---

## [1.0.0.1] - 2026-10-25

### 🇧🇷 Português (Brasil)
#### 🎲 Para Mestres e Jogadores (Leigo / Acessível)
- **Comunicação Humanizada**: Revisão completa do `README.md` e da apresentação do módulo com foco na atmosfera autêntica de mesa de RPG e na Regra de Ouro da Mestra Thorunn.
- **Descrição na Vitrine**: Descrição em `README.html` otimizada para leitura leve e dinâmica na lista de módulos do Foundry VTT.

#### ⚙️ Para Desenvolvedores (Técnico)
- **Automação de CI/CD**: Ajuste na secret de autorização (`FOUNDRY_RELEASE_TOKEN_METAMOEDAS`) no workflow de publicação automática do GitHub Actions.
- **Compatibilidade do Pacote**: Conformidade estrita com o limite de 600 caracteres para resumos HTML exigido pela Package Release API.

---

### 🇺🇸 English
#### 🎲 For Game Masters and Players (Accessible View)
- **Natural Voice & Tone**: Complete revision of `README.md` focusing on the authentic tabletop gaming spirit and Mistress Thorunn's Golden Rule.
- **Package Directory Description**: Streamlined `README.html` designed for crisp viewing in the Foundry VTT module browser.

#### ⚙️ For Developers (Technical View)
- **CI/CD Pipeline**: Fixed authorization secret (`FOUNDRY_RELEASE_TOKEN_METAMOEDAS`) in the automated GitHub Actions publishing workflow.
- **Package Compliance**: Enforced strict adherence to the 600-character HTML description limit for the Foundry Package Release API.

---

## [1.0.0] - 2026-10-24

### 🇧🇷 Português (Brasil)
#### 🎲 Para Mestres e Jogadores (Leigo / Acessível)
- Lançamento inicial do Guia de Metamoedas para Foundry VTT.
- Permite gerenciar a economia de punições, maldições e recompensas metagame criadas pela Mestra Thorunn.
- Interface visual intuitiva integrada ao canvas e fichas de personagens.
- Efeitos sonoros customizados e suporte a múltiplos idiomas (Português, Inglês e Espanhol).

#### ⚙️ Para Desenvolvedores (Técnico)
- Arquitetura nativa em ES Modules (`src/index.js`) compatível com Foundry VTT v12, v13 e verificado para v14.
- Suporte a i18n localizado em `lang/pt-BR.json`, `lang/en.json` e `lang/es.json`.
- Estilização isolada via `styles/metamoedas.css`.
- Manifest padronizado em `module.json` com links e metadados de autoria compartilhada (Thorunn & Charles Corrêa).

---

### 🇺🇸 English
#### 🎲 For Game Masters and Players (Accessible View)
- Initial release of the Metamoedas Guide for Foundry VTT.
- Manage the metagame economy of penalties, curses, and rewards created by GM Thorunn.
- Intuitive user interface directly integrated into the canvas and character sheets.
- Custom sound effects and multi-language support (Portuguese, English, and Spanish).

#### ⚙️ For Developers (Technical View)
- Clean ES Modules architecture (`src/index.js`) compatible with Foundry VTT v12, v13 and verified for v14.
- Full localization files in `lang/pt-BR.json`, `lang/en.json`, and `lang/es.json`.
- CSS scoping via `styles/metamoedas.css`.
- Standardized `module.json` manifest with shared author metadata (Thorunn & Charles Corrêa).
