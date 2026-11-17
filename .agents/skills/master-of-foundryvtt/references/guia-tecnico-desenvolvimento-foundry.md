## 🛠️ Documentação Técnica de Desenvolvimento para Foundry VTT  
**Versão do Documento:** 1.0 (Focado em v12, v13, v14+ e Compatibilidade Futura)  
**Público-Alvo:** Desenvolvedores de Módulos, Sistemas, Tradutores e Agentes de IA/API.  
**Autor:** Charles Corrêa (Padronização de Boas Práticas)

### 1. Introdução e Propósito
Esta documentação estabelece os padrões ouro para o desenvolvimento de pacotes (módulos, sistemas, traduções e mundos) no Foundry Virtual Tabletop. O foco principal é a **compatibilidade futura (*forward compatibility*)**, garantindo que o código funcione nas versões mais recentes (v12, v13, v14+) e evitando o uso de APIs obsoletas (*deprecated*) que foram removidas em migrações recentes (ex: transição de v10 para v12+).

### 2. Ambiente de Desenvolvimento e Setup Inicial (Boas Práticas)
Para evitar erros comuns, corrupção de dados e perda de produtividade, o ambiente deve ser configurado rigorosamente:

#### 2.1. Ferramentas Essenciais
1. **Node.js (LTS)**: Necessário para executar ferramentas de build, linting e o CLI oficial.
2. **Git**: Controle de versão obrigatório. Use branches para funcionalidades (`feat/`, `fix/`, `chore/`).
3. **VS Code** com as seguintes extensões:
   - *ESLint* e *Prettier* (para padronização de código).
   - *Foundry VTT Snippets* (atalhos para Hooks, Documents, etc.).
   - *Handlebars* (para sintaxe de templates).
4. **TypeScript**: Altamente recomendado. Instale `@league-of-foundry-developers/foundry-vtt-types` como dependência de desenvolvimento. Isso permite que sua IDE sinalize APIs obsoletas *antes* da execução.

#### 2.2. Foundry VTT CLI Oficial (`@foundryvtt/foundryvtt-cli`) — Instalação Obrigatória no Desenvolvimento
**Sim, o CLI oficial deve ser instalado em todo ambiente de desenvolvimento profissional de módulos e sistemas.**
Ele é a ferramenta mantida diretamente pela equipe do Foundry Gaming para resolver os principais gargalos de versionamento (Git) e publicação:

* **Por que é indispensável:**
  1. **Compêndios Amigáveis ao Git (`unpack` / `pack`):** O Foundry armazena compêndios em bancos binários `ClassicLevel`/`LevelDB`, que geram conflitos massivos no Git. O CLI desempacota esses bancos em arquivos YAML/JSON legíveis linha a linha, e os recompila para binário antes do teste ou release.
  2. **Validação de Manifestos (`validate`):** Valida os esquemas do `module.json` ou `system.json` contra as regras oficiais do Foundry VTT antes de subir alterações.
  3. **Automação de Build e Releases (`release`):** Cria os pacotes `.zip` e atualiza URLs de download de forma automatizada para GitHub Releases ou CI/CD.

* **Comandos de Instalação e Configuração:**
  ```bash
  # Instalação global via npm (recomendado para desenvolvimento contínuo):
  npm install -g @foundryvtt/foundryvtt-cli

  # Ou execução pontual sem instalar globalmente via npx:
  npx @foundryvtt/foundryvtt-cli --help

  # Configurar o caminho da sua pasta Data do Foundry (executar uma única vez):
  fvtt configure set dataPath "C:/Users/<SeuUsuario>/AppData/Local/FoundryVTT/Data"

  # Para automação complementar de testes/mundos, instale também:
  npm install -g fvtt-world-cli
  ```

* **Fluxo de Trabalho Obrigatório com Compêndios:**
  ```bash
  fvtt package workon "meu-modulo" --type Module   # Define o pacote ativo
  fvtt package unpack "meu-modulo"                 # Extrai compêndios binários para YAML (para commitar no Git)
  fvtt package pack "meu-modulo"                   # Compila YAML para binário ClassicLevel (para rodar no Foundry)
  fvtt package validate "meu-modulo"               # Audita integridade do manifesto
  ```
> 📖 Para guia completo e avançado de comandos, consulte [guides/cli-tools.md](guides/cli-tools.md).

#### 2.3. Configuração Crítica de Antivírus
**Problema:** O Foundry VTT grava arquivos `db.json` com frequência. Antivírus com varredura em tempo real podem bloquear esses arquivos, causando erros `EBUSY`, `EPERM` ou corrupção silenciosa de dados.  
**Solução:** Adicione exclusões permanentes no seu antivírus (Windows Defender, etc.) para:
- A pasta de instalação do Foundry VTT.
- A pasta de `Data` do Foundry (onde ficam os mundos e módulos).
- Sua pasta de workspace de desenvolvimento local.

#### 2.4. Agentes de IA e MCP (Model Context Protocol)
Para que agentes de IA ou ferramentas de codificação assistida gerem código compatível, inclua um arquivo `CLAUDE.md` ou `.cursorrules` na raiz do repositório com as seguintes regras:
> "Este é um projeto Foundry VTT. Use a API mais recente (v14+ somente). NÃO use `document.data.data` (use `document.system`). NÃO use jQuery em `activateListeners` (use DOM puro e o sistema de `actions` do ApplicationV2). Sempre prefixe flags e classes CSS com o ID do pacote."

### 3. Arquitetura de Pacotes e Manifesto

#### 3.1. Estrutura do `module.json` / `system.json`
O manifesto deve declarar explicitamente a compatibilidade para evitar carregamento em versões incompatíveis:
```json
{
  "id": "meu-modulo-incrivel",
  "title": "Meu Módulo Incrível",
  "version": "1.0.0",
  "compatibility": {
    "minimum": "12",
    "verified": "13",
    "maximum": "14"
  },
  "esmodules": ["scripts/main.js"],
  "styles": ["styles/meu-modulo.css"],
  "languages": [
    {
      "lang": "pt-BR",
      "name": "Português (Brasil)",
      "path": "lang/pt-BR.json"
    }
  ]
}
```
⚠️ **Atenção:** O caminho `path` deve ser relativo à raiz do pacote (ex: `lang/pt-BR.json`). O formato antigo `modules/meu-modulo/lang/pt-BR.json` foi **descontinuado e gera erro** em versões recentes.

#### 3.2. Namespacing (Prevenção de Conflitos)
- **Flags:** Sempre use o escopo do seu pacote: `actor.setFlag("meu-modulo-incrivel", "chave", valor)`.
- **CSS:** Prefixe todas as classes e IDs. Ex: `.meu-modulo-incrivel .sheet-body` em vez de `.sheet-body`.

### 4. Guias de Desenvolvimento por Categoria (v12 → v13/v14+)

#### 4.1. Traduções e Internacionalização (i18n)
- Use `game.i18n.localize("MEU_MODULO.Chave")` ou `game.i18n.format("MEU_MODULO.Chave", { data: valor })`.
- Nunca codifique textos fixos em inglês/português no código JavaScript. Centralize tudo em `lang/en.json` e `lang/pt-BR.json`.

#### 4.2. Documents (Actors, Items, NPCs, Inimigos)
A mudança mais crítica das versões antigas (v9/v10) para as atuais:
- **Obsoleto (v10-):** `actor.data.data.forca` ou `item.data.data.dano`.
- **Atual (v11+):** `actor.system.forca` ou `item.system.dano`.
- **Atualização de Dados:** Para modificar dados localmente antes de salvar, use `document.updateSource({ system: { forca: 15 } })` em vez do antigo `document.data.update()`.

#### 4.3. Fichas de Personagem (Sheets) e ApplicationV2
O Foundry está migrando de `Application` (v1) para `ApplicationV2`. Se você está atualizando um módulo, planeje a conversão:
- **Construtor:** Agora aceita um único objeto de opções: `constructor(options) { super(options); }`.
- **Eventos:** O método `activateListeners(html)` (que recebia objetos jQuery) está sendo substituído por um sistema de `actions` no construtor, e o parâmetro `html` agora é um **Elemento DOM puro**, não um objeto jQuery.
  ```javascript
  // Padrão v13+ (ApplicationV2)
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      tag: "form", // OBRIGATÓRIO para formulários
      actions: {
        "click .botao-salvar": this.onSaveClick.bind(this)
      }
    });
  }
  ```
- **Editor de Texto:** O helper `{{editor}}` do Handlebars foi atualizado para suportar o editor ProseMirror. Use `{{editor:context}}` ou as novas diretivas conforme a documentação da API v13+.

#### 4.4. Handouts, Mapas (Scenes) e Tabelas (RollTables)
- Todos são `Document`s. Use `game.scenes`, `game.journal`, `game.tables`.
- Para adicionar dados personalizados a uma Cena ou Tabela, use **Flags**. Não tente injetar campos diretamente no objeto raiz do documento, pois o schema do Foundry os rejeitará.
- **Macros:** Ao criar macros que interagem com esses documentos, sempre verifique se o documento existe: `const cena = game.scenes.get(id); if (!cena) return;`.

#### 4.5. Compêndios (Packs)
- Não edite arquivos `.db` manualmente. Use o Foundry VTT CLI:
  ```bash
  fvtt package pack --input packs/meu-compendio --output packs/meu-compendio.db
  ```
- Para acessar dados de um compêndio via código:
  ```javascript
  const pack = game.packs.get("meu-modulo.itens-especiais");
  const index = await pack.getIndex();
  const itemData = await pack.getDocument(index.find(i => i.name === "Espada Mágica")._id);
  ```

#### 4.6. Sistemas Próprios e Migração de Dados
Se você mantém um Game System, é obrigatório implementar um script de migração no `init` ou `ready`:
```javascript
Hooks.once("ready", async () => {
  if (game.user.isGM) {
    const currentSchemaVersion = game.settings.get("meu-sistema", "schemaVersion");
    if (currentSchemaVersion < 2) {
      await migrateWorld();
      game.settings.set("meu-sistema", "schemaVersion", 2);
    }
  }
});
```
A função `migrateWorld` deve iterar sobre `game.actors` e `game.items`, atualizando estruturas de dados antigas para o novo schema (ex: mover dados de `data.data` para `system`).

#### 4.7. Macros e Hooks
- Use `Hooks.on("createActor", (actor, options, userId) => { ... })` para reagir a eventos.
- Para sobrescrever funcionalidades do núcleo ou de outros módulos, **NÃO** sobrescreva métodos diretamente (monkey-patching). Use a biblioteca **libWrapper** (padrão da comunidade) para garantir compatibilidade entre múltiplos módulos que modificam o mesmo método.

### 5. Estratégias de Compatibilidade e Atualização (v10 → v14)
1. **Auditoria de Depreciação:** Execute o Foundry em modo de desenvolvimento e monitore o Console do Navegador (F12). Qualquer aviso `@deprecated` deve ser tratado imediatamente.
2. **Verificação de Versão:** Use a função nativa `isNewerVersion(game.version, "12.0")` para executar código condicional apenas em versões que suportam novos recursos.
3. **Remoção de jQuery:** Comece a refatorar `$(html).find(".classe")` para `html.querySelector(".classe")`. O jQuery será gradualmente removido do núcleo do Foundry.
4. **Testes Automatizados:** Considere usar o `foundry-vtt-types` para compilar seu projeto TypeScript. Se o compilador passar, há uma chance muito maior de o código estar livre de erros de API obsoleta.

### 6. Checklist de Revisão Pré-Lançamento
- [ ] O `module.json` / `system.json` possui os campos `compatibility.minimum` e `compatibility.verified` atualizados?
- [ ] Todas as referências a `document.data.data` foram substituídas por `document.system`?
- [ ] As classes CSS e IDs possuem prefixo único do pacote?
- [ ] As chaves de tradução estão centralizadas nos arquivos `lang/` e não hardcodadas?
- [ ] O antivírus possui exclusões para a pasta de desenvolvimento e `Data` do Foundry?
- [ ] O código foi testado na versão "Testing" ou "Stable" mais recente do Foundry VTT?
- [ ] O arquivo `CLAUDE.md` / `.cursorrules` está presente para orientar agentes de IA?

### 7. Recursos e Links de Referência Oficiais
Mantenha estes links salvos como referência primária. A documentação da API é a fonte da verdade:

* **Documentação Oficial da API:**
  - [API Documentation (Geral)](https://foundryvtt.com/api/)
  - [API v14 (Futuro/Prototype)](https://foundryvtt.com/api/v14) *(Verificar disponibilidade)*
  - [API v13](https://foundryvtt.com/api/v13)
  - [API v12](https://foundryvtt.com/api/v12)
  - [API v11](https://foundryvtt.com/api/v11)
  - [API v10](https://foundryvtt.com/api/v10)

* **Guias de Migração e Desenvolvimento:**
  - [Introdução ao Desenvolvimento](https://foundryvtt.com/article/intro-development/)
  - [Introdução ao Desenvolvimento de Módulos](https://foundryvtt.com/article/module-development/)
  - [Introdução ao Desenvolvimento de Sistemas](https://foundryvtt.com/article/system-development/)
  - [Guias de Migração da API (v10, v11, v12)](https://foundryvtt.com/article/migration/)
  - [Guia de Conversão para ApplicationV2](https://foundryvtt.wiki/en/development/guides/applicationV2-conversion-guide)

* **Wiki da Comunidade e Ferramentas:**
  - [Foundry VTT Community Wiki (Home)](https://foundryvtt.wiki/en/home)
  - [Guia de Desenvolvimento da API](https://foundryvtt.wiki/en/development/api)
  - [League of Extraordinary Foundry VTT Developers](https://foundryvtt.wiki/en/league) (Mantenedores dos tipos TypeScript)
  - [Guia de Contribuição para Idiomas](https://foundryvtt.wiki/en/languages)
  - [Diretrizes de Contribuição da Wiki](https://foundryvtt.wiki/en/wiki-contribution-guidelines)
  - [Guias de Migração do Core (v8, v9, v10)](https://foundryvtt.wiki/en/migrations)

* **Ferramentas de CLI e Comunidade:**
  - [foundryvtt-cli (Oficial)](https://github.com/foundryvtt/foundryvtt-cli)
  - [fvtt-world-cli (Comunitário)](https://github.com/DroiD16/fvtt-world-cli)
  - [Pacotes com Suporte a Idiomas](https://foundryvtt.wiki/en/community/packages-with-language-support)
  - [Sistemas de Jogo da Comunidade](https://foundryvtt.wiki/en/community/game-systems)

### 8. Extração de Dados de Repositórios e Engenharia Reversa
Esta seção descreve como usar ferramentas web para **extrair informações estruturais** (arquivos, pastas, esquemas e diagramas) de repositórios de sistemas ou módulos do Foundry VTT (sejam do GitHub, GitLab ou outros), facilitando o estudo e o desenvolvimento de novos pacotes.

#### 8.1. Ferramentas Web de Apoio
- **gitingest.com**: Converte o repositório inteiro em contexto de texto limpo para IA e visualiza árvore de pastas, arquivos e estatísticas.
- **gitdiagram.com**: Gera diagramas de arquitetura, fluxos e visualização da árvore de arquivos e diretórios.
- **repomix.com**: Empacota o repositório em arquivo único para ingestão direta por IAs.
- **uithub.com**: Extração de arquivos de repositório em formato token-friendly.
- **github.githistory.xyz**: Navegador visual do histórico de commits e evolução de arquivos específicos (ex: `README.md`, `system.json`).
- **deepwiki.com**: Documentação profunda e insights gerados para repositórios.
- **star-history.com**: Histórico de relevância e adoção de projetos comunitários.
- **download-directory.github.io**: Baixa subdiretórios específicos de repositórios sem clonar o projeto inteiro.
- **codesandbox.io**: Criação de ambiente interativo de sandbox direto de repositórios.
- **markdownviewer.org / markmap-editor**: Visualização e mapas mentais de documentação Markdown.

#### 8.2. Templates de URL Dinâmicos por Repositório Alvo
Ao trabalhar com qualquer repositório, adapte as URLs substituindo `{{owner}}` e `{{repo}}` (ex.: `peginc/swade`, `foundryvtt/dnd5e` ou `lipefl/swade-tools`):

| Ferramenta | Template de URL | Exemplo de Aplicação |
| :--- | :--- | :--- |
| **Gitingest** | `https://gitingest.com/{{owner}}/{{repo}}` | `https://gitingest.com/peginc/swade` |
| **GitDiagram** | `https://gitdiagram.com/{{owner}}/{{repo}}` | `https://gitdiagram.com/foundryvtt/dnd5e` |
| **Repomix** | `https://repomix.com/?repo={{owner}}/{{repo}}&format=markdown&showLineNumbers=true&outputParsable=true` | `https://repomix.com/?repo=lipefl/swade-tools&format=markdown&showLineNumbers=true&outputParsable=true` |
| **Uithub** | `https://uithub.com/{{owner}}/{{repo}}?maxTokens=500000` | `https://uithub.com/lipefl/swade-tools?maxTokens=500000` |
| **GitHistory** | `https://github.githistory.xyz/{{owner}}/{{repo}}/blob/main/README.md` | `https://github.githistory.xyz/lipefl/swade-tools/blob/main/README.md` |
| **DeepWiki** | `https://deepwiki.com/{{owner}}/{{repo}}` | `https://deepwiki.com/lipefl/swade-tools` |
| **Star History** | `https://www.star-history.com/?type=date&repos={{owner}}/{{repo}}` | `https://www.star-history.com/?type=date&repos=foundryvtt/dnd5e` |
| **Download Subdir** | `https://download-directory.github.io/?url=https://github.com/{{owner}}/{{repo}}` | `https://download-directory.github.io/?url=https://github.com/lipefl/swade-tools` |
| **CodeSandbox** | `https://codesandbox.io/p/sandbox/github/{{owner}}/{{repo}}` | `https://codesandbox.io/p/sandbox/github/foundryvtt/dnd5e` |
| **Markmap** | `https://markdownviewer.org/markmap-editor?url=https://raw.githubusercontent.com/{{owner}}/{{repo}}/main/README.md` | `https://markdownviewer.org/markmap-editor?url=https://raw.githubusercontent.com/foundryvtt/dnd5e/main/README.md` |

#### 8.3. Fluxo de Estudo para Novos Módulos ou Sistemas
1. **Identificar o repositório base**: Localize o repositório público do sistema ou módulo no GitHub/GitLab (ex: `peginc/swade` ou `foundryvtt/dnd5e`).
2. **Construir as URLs**: Monte os links usando a tabela acima.
3. **Extrair estrutura e arquivos**: Use o Gitingest / Repomix para absorver a arquitetura (`system.json`/`module.json`, `templates/`, `module/`).
4. **Mapear diagramas de dependências**: Abra o GitDiagram para entender como os arquivos JavaScript/TypeScript se conectam.
5. **Estudar DataModels e Schemas**: Inspecione as classes `TypeDataModel` e `ApplicationV2` usadas no repositório.
6. **Desenvolver com precisão**: Use as descobertas para criar novos módulos com total compatibilidade com o sistema-alvo.

### 9. Arquivo Morto, Migrações Legadas e Ferramentas do Ecossistema
Caso precise dar manutenção em códigos abandonados ou buscar referências e ferramentas da comunidade:

* **Documentação Legada (Pré-v10):**
  - [API v9](https://foundryvtt.com/api/v9) | [API v8](https://foundryvtt.com/api/v8) | [API v7](https://foundryvtt.com/api/v7)
  - [Guia de Migração Core v9](https://foundryvtt.wiki/en/migrations/foundry-core-v9)
  - [Guia de Migração Core 0.8.x](https://foundryvtt.wiki/en/migrations/foundry-core-0_8_x)

* **Diretórios e Recursos Comunitários:**
  - [Community Tools (Ferramentas)](https://foundryvtt.wiki/en/community/Community-Tools)
  - [Defunct Modules (Módulos Abandonados)](https://foundryvtt.wiki/en/community/defunct-modules) - Excelente para checar o que *não* usar ou adotar para refatoração.
  - [Community Adventures](https://foundryvtt.wiki/en/community/Community-Adventures)
  - [Community Media](https://foundryvtt.wiki/en/community/Community-Media)
  - [Community Translations](https://foundryvtt.wiki/en/community/Community-Translations)
  - [Unlisted Game Systems](https://foundryvtt.wiki/en/community/unlisted-game-systems)
  - [Package Changelog](https://foundryvtt.wiki/en/community/package-changelog)

* **Segurança e Proteção para Agentes de IA:**
  - [Hol-Guard](https://github.com/hashgraph-online/hol-guard/) - Antivírus de código aberto para Agentes de IA (bloqueio de ferramentas de risco, acesso a segredos, injeção de prompt, pacotes maliciosos, servidores MCP e plugins em tempo de execução).

**Nota Final para Agentes de IA:** Ao gerar código para este projeto, priorize sempre a sintaxe das versões v14+ exclusivamente. Se uma dúvida sobre depreciação surgir, consulte a documentação da API v14+ antes de sugerir qualquer solução legada. A estabilidade e a longevidade do pacote dependem dessa disciplina.

---

