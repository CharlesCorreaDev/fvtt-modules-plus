# Guia Completo: Publicação e Distribuição de Módulos e Sistemas no Foundry VTT 🚀📦
> *Manual Definitivo: Conformidade de Licenças, Políticas de IA, Revisão & Humanização de Código, Validação com CLI Oficial, CI/CD com Actions e Automação de Releases*  
> *Master of Foundry VTT by GM Charles Corrêa*

---

## 📌 Visão Geral do Ciclo de Publicação

Para que qualquer mestre ou jogador instale seu pacote diretamente pela interface do Foundry VTT ou pelo **Diretório Oficial de Pacotes ([foundryvtt.com/packages](https://foundryvtt.com/packages/))**, o desenvolvimento segue um fluxo rigoroso de qualidade, humanização e conformidade:

```
1. Coleta de Metadados do Autor & Arquivos Obrigatórios (VERSION, README, CHANGELOG)
                         │
                         ▼
2. Manifesto & Estrutura do Pacote (`module.json` / `system.json`)
                         │
                         ▼
3. Conformidade Legal & Políticas de IA (Limited License & AI Content Policy)
                         │
                         ▼
4. 🔍 REVISÃO & HUMANIZAÇÃO RIGOROSA DE CÓDIGO (Anti-Alucinação, Bilinguismo PT/EN)
                         │
                         ▼
5. 🛡️ AUDITORIA DE RECURSOS (Ícones HTTP 200, Validação de Idiomas i18n)
                         │
                         ▼
6. 🛠️ VALIDAÇÃO TÉCNICA OBRIGATÓRIA COM `@foundryvtt/foundryvtt-cli`
                         │
                         ▼
7. CI/CD & Automação de Releases (GitHub Actions / fvtt-autopublish)
                         │
                         ▼
8. Submissão no Portal Oficial (Formulário completo de metadados)
                         │
                         ▼
9. Atualizações Contínuas e Versionamento Automático
```

---

## 👤 1. Coleta Prévia de Dados do Desenvolvedor e Autor

Antes de gerar ou finalizar o manifesto do pacote, **deve ser solicitado ativamente ao usuário** o fornecimento dos seus dados oficiais. Esses campos garantem atribuição clara, suporte da comunidade e conformidade no diretório:

### 📋 Campos a Solicitar ao Desenvolvedor/Autor:
- **Nome Completo ou Razão Social** (`name`)
- **E-mail de Contato / Suporte** (`email`)
- **Nome de Usuário Discord** (`discord` - ex: `charlescorrea` ou tag da comunidade Foundry)
- **URL do GitHub / GitLab** (`url` - ex: `https://github.com/CharlesCorreaDev`)
- **URL do Instagram / Redes Sociais / Portfolio** (ex: `https://instagram.com/...` ou website pessoal)
- **URL de Financiamento Coletivo / Doação** (Patreon, Ko-fi, Apoia.se, se aplicável)

---

## 📁 2. Arquivos Obrigatórios em Todo Módulo

Todo módulo gerado ou submetido **DEVE conter na raiz** impreterivelmente estes 3 arquivos estruturais:

1. **`VERSION`**: Arquivo de texto puro contendo unicamente a string da versão semântica atual (ex: `1.0.0.0`).
2. **`README.md`**: Apresentação visual rica do módulo, com resumo do propósito, prints/GIFs de demonstração, comandos, compatibilidade (v11/v12/v13) e instruções de instalação.
3. **`CHANGELOG.md`**: Histórico detalhado de mudanças por versão seguindo o padrão *Keep a Changelog* (`Added`, `Changed`, `Fixed`, `Removed`).

> ℹ️ **Arquivos Opcionais / Sob Demanda**:
> Manuais adicionais (ex: `INTEGRATION.md`, `MANUAL_DE_INSTRUCOES.md`, guias de API) **só devem ser criados se o usuário solicitar explicitamente**. Não sobrecarregue a raiz do pacote sem necessidade.

---

## ⚖️ 3. Requisitos Legais, Licença e Política de IA (Obrigatórios)

Todas as novas submissões e versões de pacotes **devem cumprir rigorosamente** as diretrizes oficiais do Foundry VTT:
- 📜 **Limited License for Package Development**: [foundryvtt.com/article/license/](https://foundryvtt.com/article/license/)
- 🤖 **AI Content Policy**: [foundryvtt.com/article/ai-policy/](https://foundryvtt.com/article/ai-policy/)
- 📦 **Front-End Package Management**: [foundryvtt.com/article/front-end-package-management/](https://foundryvtt.com/article/front-end-package-management/)

### 🛡️ Regras Fundamentais da Política de IA:
1. **Regra Geral**: O Foundry Gaming LLC **não permite** o uso de ferramentas de IA generativa para criar arte visual, áudio, texto narrativo ou outros conteúdos protegidos por direitos autorais destinados a pacotes no diretório público, a menos que autorizado explicitamente (ex: *Content Provider Agreement*).
2. **Código de Programação**: O uso de assistentes de IA para geração/auxílio de código (TypeScript/JavaScript/CSS) é permitido, desde que o código final seja mantido, testado, revisado e de autoria responsável do desenvolvedor.
3. **Explicação de Uso de IA (`AI Content Explanation`)**:
   - Se o seu pacote não estiver em conformidade estrita ou se utilizar IA sob uma autorização prévia (ou acordos especiais de distribuição), **é mandatório preencher a justificativa técnica** explicando detalhadamente como a IA foi empregada e quais componentes voltados ao usuário foram criados dessa forma.

---

## 🔍 4. Revisão, Humanização e Eliminação de Alucinações de IA

Antes de qualquer compilação ou submissão, pacotes gerados ou auxiliados por IA **devem passar por uma revisão e humanização cirúrgica**. A moderação do Foundry VTT rejeita código sintético descuidado.

### 🌐 Regra de Bilinguismo nos Comentários de Código:
- **Sempre que houver necessidade de comentar código**, o comentário **DEVE ser bilíngue (Português e Inglês)** no formato JSDoc/TSDoc ou linha dupla:
  ```javascript
  /**
   * Registra as configurações do módulo no Foundry VTT.
   * Registers the module settings in Foundry VTT.
   * 
   * @param {string} key - A chave única de configuração / The unique setting key.
   */
  ```

### 📋 Checklist de Humanização e Expurgamento de Sintéticos:

| Aspecto | O que Auditar | Como Resolver / Padrão Foundry |
| :--- | :--- | :--- |
| **Jargões & "Magias" de IA** | Termos artificiais como *"pipeline neural"*, *"processamento estocástico"*, comentários óbvios tipo `// loop de elementos`, ou classes com "Manager", "Engine", "Orchestrator" inventados | Remover comentários supérfluos; adotar nomenclatura de RPG limpa (`CombatTurnHandler`, `LightingController`, etc.). |
| **APIs Alucinadas de IA** | Chamadas inexistentes como `game.actors.getActor(...)`, `token.updateAttributes(...)`, `game.canvas.tokens.findByName(...)` | Usar a API canônica do Foundry: `game.actors.get(id)`, `document.update({ "system.attr": val })`, `canvas.tokens.placeables.find(...)`. |
| **Compatibilidade de Versão (v11 / v12 / v13)** | Código acessando `actor.data.data` (legado) em vez de `actor.system` | Adotar modelo canônico atual: `actor.system`, `item.system` e `ApplicationV2` / hooks modernos. |
| **Nomes Naturais vs Genéricos** | Variáveis genéricas como `data1`, `tempObj`, `res`, `outputVar` | Utilizar nomenclatura expressiva e idiomática: `actorDocument`, `activeEffectConfig`, `combatantToken`. |
| **Gestão Segura de Hooks** | Hooks registrados sem namespace ou executando operações pesadas de forma síncrona | Sempre usar prefixos seguros: `Hooks.on("ready", async () => { ... })` e verificar autoridade de GM (`game.user.isGM`). |
| **Tratamento de Exceções & Feedback** | `console.log` poluindo o console do mestre | Usar `ui.notifications.warn(...)`, `ui.notifications.error(...)` e log encapsulado: `console.debug("MEU-MODULO \|", ...)`. |

---

## 🎨 5. Auditoria Rigorosa de Ativos, Ícones e Idiomas (`i18n`)

Antes da validação do CLI, audite os recursos estáticos e as traduções do pacote:

### 🖼️ Checagem de Ícones e Imagens (Validação HTTP 200):
- **Caminhos Locais Válidos**: Verifique se todos os ícones apontados em macros, itens, compêndios ou botões existem fisicamente no repositório (ex: `assets/icons/torch.svg`).
- **Resolução de URLs Externas**: Se o pacote apontar para ícones ou texturas web remotas, faça um teste de requisição: **elas DEVEM retornar `HTTP 200 OK`**. Links quebrados (`404`) ou que exigem autenticação quebram a renderização do Foundry e barram a submissão.
- **Formato Otimizado**: Prefira `.svg` ou `.webp` leves em vez de `.png`/`.jpg` pesados.

### 🌐 Auditoria Rigorosa de Idiomas (`languages`):
- Se o pacote fornecer suporte a idiomas extras, confira no manifesto se a chave está declarada corretamente:
  ```json
  "languages": [
    {
      "lang": "en",
      "name": "English",
      "path": "lang/en.json"
    },
    {
      "lang": "pt-BR",
      "name": "Português (Brasil)",
      "path": "lang/pt-BR.json"
    }
  ]
  ```
- **Conferência de Integridade**:
  - Garanta que `lang/en.json` e `lang/pt-BR.json` sejam JSONs válidos.
  - As chaves de tradução devem ser espelhadas (sem chaves faltando entre os idiomas).
  - Nunca deixe textos visíveis ao usuário chumbados no código JavaScript ou templates HTML (`Handlebars`); use sempre `{{localize "MODULO.Chave"}}` ou `game.i18n.localize("MODULO.Chave")`.

---

## 🛠️ 6. Validação Técnica Obrigatória com `@foundryvtt/foundryvtt-cli`

**Nunca publique sem validar localmente!** O Foundry VTT disponibiliza o CLI oficial `@foundryvtt/foundryvtt-cli` para checar schemas, empacotar compêndios e detectar erros antes de qualquer commit:

```bash
# Instalação do CLI oficial (se ainda não instalado globalmente)
npm install -g @foundryvtt/foundryvtt-cli

# 1. Configurar o ambiente apontando para a sua instalação do Foundry (Data Path)
fvtt configure set "dataPath" "C:/Users/<SEU_USUARIO>/AppData/Local/FoundryVTT/Data"

# 2. Validar estritamente o manifesto (checa versionamento, compatibilidade e schemas)
fvtt package validate "meu-modulo-incrivel"

# 3. Empacotar compêndios se utilizar bancos ClassicLevel / LevelDB / YAML
fvtt package pack "meu-modulo-incrivel"

# 4. Simular o release localmente para inspecionar o .zip gerado
fvtt package release "meu-modulo-incrivel"
```

> 💡 **Critério de Aceite Inegociável**: Se `fvtt package validate` retornar **qualquer Warning ou Error**, o problema DEVE ser sanado antes da criação da tag Git ou do envio ao portal.

---

## 📄 7. Estrutura Canônica do Manifesto (`module.json` / `system.json`)

Exemplo de manifesto preenchido com dados completos do autor e suporte a múltiplos idiomas:

```json
{
  "id": "meu-modulo-incrivel",
  "title": "Meu Módulo Incrível",
  "description": "Adiciona automações táticas e interface moderna para Foundry VTT.",
  "version": "1.0.0",
  "compatibility": {
    "minimum": "12",
    "verified": "12.331",
    "maximum": "13"
  },
  "relationships": {
    "systems": [
      {
        "id": "dnd5e",
        "type": "system",
        "manifest": "https://github.com/foundryvtt/dnd5e/releases/latest/download/system.json",
        "compatibility": {
          "minimum": "3.0.0"
        }
      }
    ],
    "requires": [
      {
        "id": "lib-wrapper",
        "type": "module"
      }
    ]
  },
  "authors": [
    {
      "name": "Charles Corrêa",
      "email": "contato@charlescorrea.dev",
      "url": "https://github.com/CharlesCorreaDev",
      "discord": "charlescorrea",
      "flags": {
        "instagram": "https://instagram.com/charlescorrea.dev"
      }
    }
  ],
  "languages": [
    {
      "lang": "en",
      "name": "English",
      "path": "lang/en.json"
    },
    {
      "lang": "pt-BR",
      "name": "Português (Brasil)",
      "path": "lang/pt-BR.json"
    }
  ],
  "esmodules": ["scripts/main.mjs"],
  "styles": ["styles/module.css"],
  
  "url": "https://github.com/CharlesCorreaDev/meu-modulo-incrivel",
  "manifest": "https://github.com/CharlesCorreaDev/meu-modulo-incrivel/releases/latest/download/module.json",
  "download": "https://github.com/CharlesCorreaDev/meu-modulo-incrivel/releases/download/v1.0.0/module.zip",
  "readme": "https://raw.githubusercontent.com/CharlesCorreaDev/meu-modulo-incrivel/main/README.md",
  "changelog": "https://raw.githubusercontent.com/CharlesCorreaDev/meu-modulo-incrivel/main/CHANGELOG.md",
  "license": "MIT"
}
```

---

## 📦 8. Estrutura do Arquivo `.zip` de Distribuição

Evite o erro clássico que corrompe instalações: **o interior do `.zip` DEVE conter como pasta raiz o ID do pacote!**

```
module.zip (ou meu-modulo-incrivel.zip)
└── meu-modulo-incrivel/         <--- [OBRIGATÓRIO: Diretório raiz com o ID exato]
    ├── VERSION                  <--- Arquivo com versão pura (ex: 1.0.0.0)
    ├── README.md                <--- Documentação principal do pacote
    ├── CHANGELOG.md             <--- Histórico de mudanças da versão
    ├── module.json
    ├── scripts/
    │   └── main.mjs
    ├── styles/
    │   └── module.css
    ├── lang/
    │   ├── en.json
    │   └── pt-BR.json
    ├── assets/
    │   └── icons/
    └── packs/                   <--- Compêndios ClassicLevel ou NeDB
```

---

## 🤖 9. Automação de CI/CD e Publicação com Ferramenta Nativa vs. Actions

### 🏆 Nossa Solução Nativa: `foundry_package_publisher.mjs`
Criamos uma ferramenta tudo-em-um dentro do ecossistema Master of Foundry VTT (`scripts/foundry_package_publisher.mjs`) que unifica tudo o que as 3 actions externas faziam isoladamente, com as nossas camadas extras de segurança:

```bash
# Modo Auditoria Pré-Voo & Validação Técnica (Gera ZIP seguro com pasta raiz correta)
node scripts/foundry_package_publisher.mjs

# Modo Publicação Oficial na API do Foundry VTT (dispara release direto)
export FOUNDRY_API_TOKEN="seu-token-de-release-gerado-no-painel"
node scripts/foundry_package_publisher.mjs --publish
```

#### O que o nosso script faz em 1 único comando:
1. **Auditoria de Arquivos Obrigatórios**: Garante a presença e conteúdo de `VERSION`, `README.md` e `CHANGELOG.md`.
2. **Auditoria do Manifesto & Autores**: Checa compatibilidade e campos de desenvolvedor (Discord, GitHub, redes).
3. **Checagem de Idiomas (`i18n`)**: Valida a sintaxe de todos os arquivos em `lang/`.
4. **Anti-Alucinação & Humanização**: Detecta métodos fictícios de IA e padrões obsoletos (`.data.data`).
5. **Validação com Foundry CLI**: Executa `fvtt package validate` automaticamente.
6. **Empacotamento Seguro**: Cria o `.zip` encapsulando a raiz sob o ID do pacote (`/${id}/`).
7. **Disparo na API Oficial**: Envia `POST` para `https://foundryvtt.com/_api/packages/release_version/` com autenticação por token de release.
8. **Notificação Instantânea por E-mail (SMTP/API) e SMS (SMS Legal / Twilio)**: Assim que a API do Foundry confirma a publicação com sucesso, dispara e-mail (via servidor **SMTP** do seu domínio ou Resend/SendGrid) e SMS no celular do desenvolvedor (prioritariamente via **SMS Legal / smsgateway.com.br** ou Twilio).

> 🔐 **REGRA DE OURO DE SEGURANÇA ABSOLUTA:**
> **NUNCA armazene NENHUMA variável de credencial, chave de API ou segredo diretamente no código-fonte, scripts, manifestos ou arquivos commitados no repositório Git!**
> Códigos commitados no GitHub/GitLab são públicos ou acessíveis por terceiros. Qualquer vazamento expõe sua conta do Foundry, seus créditos de SMS e sua infraestrutura de e-mail.
> 
> **Todas as variáveis sensíveis DEVEM ser cadastradas exclusivamente como [GitHub Secrets](https://docs.github.com/actions/security-guides/encrypted-secrets) no repositório:**
> 👉 `Configurações do Repositório -> Secrets and variables -> Actions -> Repository secrets`

#### 📋 Tabela de Segredos que Devem Estar no GitHub Secrets:

| Nome do Segredo no GitHub | Finalidade / Provedor | Exemplo de Conteúdo Seguro |
| :--- | :--- | :--- |
| `FOUNDRY_API_TOKEN` | Token oficial de release gerado no painel `foundryvtt.com` | `fvt_live_98a7sd8f7a9s8df7` |
| **`SMTP_HOST`** | Servidor de e-mail SMTP (Hostinger, cPanel, Gmail, etc.) | `smtp.seudominio.com.br` |
| **`SMTP_USER`** | Usuário / E-mail de autenticação SMTP | `notificacoes@seudominio.com.br` |
| **`SMTP_PASS`** | Senha do e-mail SMTP | `sua_senha_smtp_forte` |
| **`SMTP_PORT`** | Porta do SMTP (`465` para SSL ou `587` para STARTTLS) | `465` ou `587` |
| `NOTIFY_EMAIL` | E-mail de destino do desenvolvedor | `charles@seudominio.com.br` |
| **`SMSLEGAL_TOKEN`** | Token da API brasileira **SMS Legal** ([smslegal.com.br](http://smslegal.com.br/) / [smsgateway.com.br](https://smsgateway.com.br/)) | `3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `NOTIFY_PHONE` | Celular do desenvolvedor com DDI+DDD (ex: Brasil `5511...`) | `5511999999999` |
| `TWILIO_ACCOUNT_SID` *(Opcional)* | Account SID da Twilio (fallback internacional) | `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `TWILIO_AUTH_TOKEN` *(Opcional)* | Token secreto de autenticação Twilio | `auth_token_secreto_aqui` |
| `TWILIO_PHONE_FROM` *(Opcional)* | Número remetente Twilio | `+12025550199` |

#### Como Executar Localmente sem Gravar no Código:
Ao rodar na sua máquina local, declare as variáveis **apenas na memória da sessão do terminal** (elas desaparecem ao fechar o terminal e nunca são salvas em arquivos):
```bash
# Na sessão ativa do seu shell (Linux/macOS bash/zsh):
export FOUNDRY_API_TOKEN="token_da_sessao"
export SMTP_HOST="smtp.meudominio.com.br"
export SMTP_PORT="465"
export SMTP_USER="notificacoes@meudominio.com.br"
export SMTP_PASS="senha_da_sessao"
export NOTIFY_EMAIL="meu_email@privado.com"
export SMSLEGAL_TOKEN="token_sms_legal_aqui"
export NOTIFY_PHONE="5511999999999"
node scripts/foundry_package_publisher.mjs --publish

# No Windows PowerShell (apenas durante a sessão do terminal):
$env:FOUNDRY_API_TOKEN="token_da_sessao"
$env:SMTP_HOST="smtp.meudominio.com.br"
$env:SMTP_PORT="465"
$env:SMTP_USER="notificacoes@meudominio.com.br"
$env:SMTP_PASS="senha_da_sessao"
$env:NOTIFY_EMAIL="meu_email@privado.com"
$env:SMSLEGAL_TOKEN="token_sms_legal_aqui"
$env:NOTIFY_PHONE="5511999999999"
node scripts/foundry_package_publisher.mjs --publish
```

---

### B. Workflow Seguro de Release via GitHub Actions (`.github/workflows/release.yml`):

Utilize o `scripts/foundry_package_publisher.mjs` diretamente na sua pipeline de CI/CD, consumindo com total segurança as variáveis armazenadas no **GitHub Secrets**:

```yaml
name: Release Package

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      # 1. Instala dependências do empacotador (archiver, etc.)
      - name: Install Dependencies
        run: npm install

      # 2. Executa a auditoria, Foundry CLI, empacotamento e publicação oficial com Secrets
      - name: Audit, Package & Publish to Foundry VTT
        env:
          FOUNDRY_API_TOKEN: ${{ secrets.FOUNDRY_API_TOKEN }}
          # E-mail via Servidor SMTP Próprio
          SMTP_HOST: ${{ secrets.SMTP_HOST }}
          SMTP_PORT: ${{ secrets.SMTP_PORT }}
          SMTP_USER: ${{ secrets.SMTP_USER }}
          SMTP_PASS: ${{ secrets.SMTP_PASS }}
          NOTIFY_EMAIL: ${{ secrets.NOTIFY_EMAIL }}
          # SMS Nacional Brasileiro via SMS Legal (http://smslegal.com.br)
          SMSLEGAL_TOKEN: ${{ secrets.SMSLEGAL_TOKEN }}
          NOTIFY_PHONE: ${{ secrets.NOTIFY_PHONE }}
        run: |
          node scripts/foundry_package_publisher.mjs --publish

      # 3. Criar a Release oficial no GitHub anexando os assets auditados
      - name: Create GitHub Release
        id: create_release
        uses: softprops/action-gh-release@v2
        with:
          files: |
            module.json
            *.zip
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

### 🛡️ Boas Práticas e Tratamento de Erros na Foundry Package Release API

Ao integrar a Package Release API (`https://foundryvtt.com/_api/packages/release_version/`) em seus workflows do GitHub Actions ou scripts:

1. **Nunca use `curl -s` isolado (Armadilha do Exit Code 0)**:
   - O argumento `-s` silencia o output e oculta erros de transporte e aplicação. Se a API recusar a requisição (status 400 por payload inválido ou URL inacessível, 401 por token ausente ou inválido, ou 429 por rate limit de 60s), o `curl` ainda finaliza com exit code 0 no runner, mascarando a falha e dando a falsa impressão de release bem-sucedida.
   - Use sempre `-s -S -w "\nHTTP_STATUS:%{http_code}"` capturando a resposta e o código de status HTTP retornado pelo servidor:
     ```bash
     RESPONSE=$(curl -w "\nHTTP_STATUS:%{http_code}" -s -S -X POST "https://foundryvtt.com/_api/packages/release_version/" \
       -H "Content-Type: application/json" \
       -H "Authorization: ${{ secrets.FOUNDRY_RELEASE_TOKEN }}" \
       -d '{
         "id": "meu-modulo-id",
         "dry-run": false,
         "release": {
           "version": "1.0.0.1",
           "manifest": "https://raw.githubusercontent.com/usuario/meu-modulo/v1.0.0.1/module.json",
           "notes": "https://github.com/usuario/meu-modulo/releases/tag/v1.0.0.1",
           "compatibility": {
             "minimum": "11",
             "verified": "12"
           }
         }
       }')

     echo "Resposta da API do Foundry VTT:"
     echo "$RESPONSE"

     HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)

     if [ "$HTTP_STATUS" -ne 200 ]; then
       echo "::error::Falha ao publicar versão na API do Foundry VTT (HTTP $HTTP_STATUS)"
       exit 1
     fi
     ```
   - Em scripts **Node.js**, utilize validação estrita do `res.statusCode >= 200 && res.statusCode < 300` com `process.exit(1)` caso a resposta não seja de sucesso.

2. **Tratamento de Segredo/Token Ausente (Alerta Visível em vez de Skip Silencioso)**:
   - Se a variável de token (`FOUNDRY_RELEASE_TOKEN` ou `FOUNDRY_API_TOKEN`) não estiver cadastrada nos Secrets do repositório, o step não deve ser ignorado sem aviso.
   - Emita um alerta visível nos logs do workflow (`echo "::warning::Token FOUNDRY_RELEASE_TOKEN não configurado..."`) para orientar o desenvolvedor sobre o motivo do skip, ou configure o step para falhar caso a publicação no diretório seja mandatória.

3. **Formato Obrigatório do Payload JSON**:
   ```json
   {
     "id": "seu-modulo-id",
     "dry-run": false,
     "release": {
       "version": "1.0.0.1",
       "manifest": "https://.../module.json",
       "notes": "https://github.com/.../releases/tag/v1.0.0.1",
       "compatibility": {
         "minimum": "10",
         "verified": "14"
       }
     }
   }
   ```
   - O header de autorização deve ser `Authorization: fvttp_...` (o prefixo `fvttp_` faz parte do token gerado no painel do pacote).
   - O `manifest` deve ser uma URL pública e acessível (retornando HTTP 200). A API do Foundry valida o manifesto antes de aceitar a versão. Se o manifesto retornar 404 ou formato inválido, a API responderá com HTTP 400.
   - O campo `notes` aceita URL direta da release do GitHub ou do CHANGELOG.
   - Especificação oficial completa disponível em: [foundryvtt.com/article/package-release-api/](https://foundryvtt.com/article/package-release-api/).

4. **Rate Limiting (HTTP 429)**:
   - A API do Foundry possui limitação de 1 release a cada 60 segundos por pacote.
   - Se disparar releases consecutivas rapidamente, o servidor responderá com `429 Too Many Requests` e o header `Retry-After`. Em automações, aguarde o tempo indicado antes de tentar nova chamada.

---

### 📦 Alternativas Externas da Comunidade (Para Referência Histórica):
- 🛠️ **[Varriount/fvtt-autopublish](https://github.com/Varriount/fvtt-autopublish)**: Publica na API do Foundry VTT via GitHub Actions.
- 📦 **[fvtt-release-packager](https://github.com/marketplace/actions/fvtt-release-packager)**: Constrói o zip no formato correto de pastas.
- 🚀 **[ghost-fvtt/foundry-publish](https://github.com/ghost-fvtt/foundry-publish)**: Action simplificada.

---

## 🌐 10. Telas Oficiais no `foundryvtt.com`: Nova Submissão vs. Painel de Criador

No ecossistema do Foundry VTT existem duas interfaces com propósitos distintos:

---

### A. Tela de Submissão Inicial de Pacote Comunitário (`NEW PACKAGE SUBMISSION`)
👉 **URL oficial logada:** **[https://foundryvtt.com/packages/submit](https://foundryvtt.com/packages/submit)**  
*(Esta é a tela para cadastrar seu módulo ou sistema pela PRIMEIRA VEZ no diretório)*:

| Campo na Tela | O Que Preencher | Regras Inegociáveis |
| :--- | :--- | :--- |
| **Package Type:** | `module`, `system` ou `world` | Selecione o tipo correspondente do pacote. |
| **Package ID:** | O ID técnico único (ex: `metamoedas-by-thorunn`) | Palavras em minúsculas separadas por hífen. **DEVE SER IDÊNTICO** ao campo `"id"` do `module.json`. |
| **Package Title:** | Título legível para humanos | Nome com espaços e acentos (ex: `Guia de Metamoedas by Thorunn`). **DEVE SER IDÊNTICO** ao campo `"title"` do manifesto. |
| **Package URL:** | URL da página/repositório | Link público no GitHub/GitLab (ex: `https://github.com/SeuUsuario/seu-modulo`) ou página de venda para compras externas. |
| **Discord Username:** | Seu usuário no Discord (ex: `charlescorrea` ou `Usuario#0000`) | O Foundry concede o cargo oficial **`Developer`** no servidor Discord oficial do Foundry VTT assim que o módulo é aprovado! |
| **Description:** | Descrição rica do pacote | Editor Rich Text / HTML para formatar apresentação, comandos, tabelas e créditos de Autoria e Desenvolvimento. |
| **Generative AI Content Declaration:** | Declaração de Uso de IA | Caso tenha utilizado IA para código/linting, explique detalhadamente que o conteúdo de regras e lore é humano e a IA foi usada estritamente como suporte técnico (sem arte/textos gerados por IA). |
| **Checkboxes de Termos:** | 3 Confirmações Legais Obrigatórias | 1. Termos da *Limited License Agreement for Package Development*.<br>2. Confirmação de que o conteúdo não infringe direitos autorais de terceiros.<br>3. Conformidade estrita com a *AI Content Policy*. |
| **Botão de Envio:** | `SUBMIT PACKAGE` | Dispara a submissão para revisão da equipe do Foundry VTT (geralmente avaliada em 24h a 48h). |

---

### B. Tela de Gestão de Pacote Já Aprovado (`EDIT PACKAGE FORM`)
Após o pacote ser aprovado pela equipe do Foundry VTT, ele ganha uma página de edição onde você pode gerenciar metadados avançados:
- **`Package Tags`**: Categorias do diretório (ex: `Dice Rolling`, `Content Packs`, `Tools and Controls`, `Contains Zero AI`).
- **`AI Content Explanation`**: Revisão da declaração de uso de IA.
- **`Package Release Token`**: Chave de API única gerada logo acima de *Save Package*. **Salve-a imediatamente no GitHub Secrets como `FOUNDRY_API_TOKEN`** para automação de CI/CD!
- **`Package Versions Table`**: Tabela no rodapé onde cada release (`v1.0.0.0`, etc.) fica registrada com links diretos de `Manifest URL` e `Notes URL`.

---

### 💰 C. Como Vender no Marketplace Oficial (Tornar-se um Fornecedor de Conteúdo Premium)

Se em vez de um pacote comunitário aberto você desejar vender um produto protegido por DRM no **Marketplace Oficial** ([fvtt.store](https://fvtt.store/) / `foundryvtt.store`):

#### 📋 Requisitos para ser Fornecedor de Conteúdo (Content Provider):
1. **Conta Oficial no Foundry VTT**: Cadastro verificado em [foundryvtt.com](https://foundryvtt.com/).
2. **Contrato de Conteúdo Premium**: Ler e concordar com o [Foundry VTT Publisher Handbook](https://foundryvtt.com/article/publisher-handbook).
3. **Capacidade Jurídica**: Ter permissão legal para assinar contrato comercial como Pessoa Física (nome próprio) ou Pessoa Jurídica (empresa/CNPJ) e vender legalmente em sua localização.
4. **Contrato com a MetaMorphic Digital Studio**:
   - A operação comercial da loja é gerida em parceria com a **MetaMorphic Digital Studio**.
   - Se atender aos requisitos anteriores, envie um e-mail formal em inglês para:  
     📧 **[foundry-marketplace@metamorphic-digital.com](mailto:foundry-marketplace@metamorphic-digital.com)**
5. **Após a Liberação**:
   - O aviso *"You do not have permission to upload packages via the Creator Portal"* desaparecerá.
   - Sua conta no Marketplace será associada automaticamente à sua conta Foundry VTT via Single Sign-On (SSO).

---

#### 🏪 Regras de Negócio, Operação e FAQ Oficial do Marketplace:

| Tópico / Regra | O que Diz o Regulamento Oficial do Marketplace ([fvtt.store/faq](https://www.foundryvtt.store/faq)) |
| :--- | :--- |
| **Operação da Conta** | Ao fazer login no Marketplace com as credenciais do Foundry VTT, sua conta importa automaticamente as descrições dos pacotes Foundry VTT Premium existentes. Você pode editar vídeos promocionais, imagens em diferentes resoluções, tags de gênero (*Ficção Científica*, *Terror*) e tipo de sistema (*PF2e*, *SWADE*, *D&D5e*). |
| **Aprovação Manual** | Cada submissão para a loja passa por **aprovação manual (24h a 48h)** para garantir a correta configuração dos itens antes de ir a público (podendo ser selecionado para vitrines "NOVOS" ou campanhas promocionais). |
| **Entrega ao Cliente (Sem Chaves!)** | Os clientes compram logados com a conta Foundry VTT. O módulo é **adicionado instantaneamente à conta do cliente** sem necessidade de digitar chaves manuais de licença. |
| **Atualização do Módulo** | **Zero trabalho extra no Marketplace!** Os pacotes são baixados da página de pacotes do `foundryvtt.com`. A loja apenas desbloqueia o direito de acesso na conta do usuário; as atualizações continuam vindo do seu manifesto/GitHub normalmente. |
| **Venda de Módulos Não-Premium?** | **NÃO.** Qualquer produto vendido DEVE ser um pacote Premium oficial. Exceção única: módulos gratuitos introdutórios ou *Quickstart Guides* para sistemas existentes (mediante aprovação). |
| **Venda de PDFs / Bundles de PDF?** | **PROIBIDO.** A plataforma não permite venda ou distribuição de PDFs de forma alguma. O conteúdo deve estar 100% convertido e estruturado dentro do módulo Foundry (compêndios/diários/cenas). |
| **Integração com Patreon?** | O Marketplace **NÃO oferece suporte a assinaturas ou integração com Patreon**. Apenas compras únicas são suportadas. |
| **Política Estrita de Preços** | • **Piso Mínimo Absoluto:** **US$ 2,99 / € 2,99** (o sistema não aceita valores inferiores).<br>• **Preço Mínimo Recomendado:** **US$ 4,99 / € 4,99** (devido a taxas de processamento, câmbio e IVA/imposto europeu retido de até 50%).<br>• A loja reserva o direito de recusar pacotes abaixo de $4.99 para evitar inundação de produtos de baixo valor.<br>• Produtos menores devem ser agrupados (*bundles*) em um pacote premium de maior valor.<br>• **NÃO É PERMITIDO ANUNCIAR PRODUTOS PREMIUM GRATUITAMENTE NA LOJA.** |
| **Páginas de Criador e Vitrines** | Cada produto possui página própria dedicada. Criadores com histórico comprovado e alto volume de vendas podem solicitar artes de fundo personalizadas para sua página de criador. |
| **Limite de Módulos por Semana** | Não há cota máxima por semana, mas cada pacote deve ser um Foundry Premium Package homologado e cada submissão passa pela fila de aprovação de 24h a 48h. |

---

### 🌐 D. Como Vender Fora do Foundry e Modelos Avançados de Comercialização

Se você deseja comercializar pacotes, sistemas, aventuras ou módulos premium além do **Marketplace Oficial (`fvtt.store`)**, existem estratégias consolidadas na comunidade internacional e brasileira:

---

#### 1. Modelo Oficial por Parceria / DRM (DriveThruRPG & Patreon Link):
Mesmo vendendo fora da loja do Foundry, você pode ter seu pacote protegido oficialmente pelo sistema de **Premium Content** do Foundry VTT:
- **DriveThruRPG / OneBookShelf:** Ao estabelecer um *Content Provider Agreement* com o Foundry Gaming LLC, o DriveThruRPG gera automaticamente uma **Chave de Conteúdo Oficial (Content Key)** para cada comprador. O comprador entra em `foundryvtt.com/purchased-content`, ativa a chave e o módulo aparece desbloqueado direto dentro do Foundry VTT dele, recebendo atualizações com 1 clique!
- **Patreon Oficial:** O Foundry VTT possui integração nativa com o Patreon. O criador associa suas assinaturas ao Foundry. Enquanto o apoiador mantiver a assinatura ativa, o Foundry VTT libera o módulo e entrega as atualizações nativamente na aba de pacotes do aplicativo.

---

#### 2. Modelo Semi-Privado via Servidor de Licenças / Proxy (Gumroad / Hotmart / Eduzz / Loja Própria):
Se você vende no seu site, Gumroad, Hotmart, Kiwify ou Eduzz e **não possui contrato de Premium Content** com o Foundry, o Foundry VTT permite que o usuário instale módulos através de uma **URL de Manifesto Autenticada**:
- **O Desafio:** Se a URL do manifesto for pública no GitHub, qualquer pessoa pode baixar o `.zip` sem pagar.
- **A Solução Arquitetural (Autenticação por Query String / Token / Webhook):**
  1. O cliente compra no seu site (ou na plataforma de checkout) e via Webhook é gerada uma licença única (ex: `TOKEN_CLIENTE_ABC123`).
  2. O link de instalação no Foundry VTT dele é fornecido assim:  
     `https://api.seudominio.com.br/fvtt/meu-modulo/manifest.json?license=TOKEN_CLIENTE_ABC123`
  3. No seu servidor, ao receber a requisição:
     - O servidor valida se o token é válido, ativo e se o cliente não está com pagamento cancelado.
     - Retorna o JSON do manifesto onde a propriedade `"download"` também contém o token temporário ou de sessão:  
       `"download": "https://api.seudominio.com.br/fvtt/meu-modulo/download.zip?license=TOKEN_CLIENTE_ABC123"`
  4. **Como o cliente atualiza?**  
     O Foundry VTT salva a URL completa que o usuário usou na instalação (incluindo o `?license=...`). Quando você sobe uma versão nova no seu servidor, o Foundry do cliente consulta a URL automaticamente, detecta a nova versão e baixa o `.zip` atualizado sem o usuário precisar fazer nada manual!
  5. Módulos famosos da comunidade como *The Forge Bazaar*, *Moulinette* e *JB2A Patreon* utilizam proxies autenticados semelhantes.

---

#### 3. Modelo Freemium (Módulo Base Gratuito + Pacotes de Expansão Comerciais):
Uma das estratégias de maior sucesso na comunidade do Foundry VTT:
- **Camada Gratuita no Diretório Oficial:**
  - O sistema de regras básico ou módulo utilitário fica 100% gratuito e disponível no diretório oficial do Foundry VTT. Isso atrai centenas ou milhares de mestres e gera alta autoridade.
- **Camadas Comerciais Pagas (Compêndios de Expansão / Add-ons):**
  - Bestiários completos com centenas de monstros ilustrados.
  - Grimórios de magias com efeitos de partículas e animações Sequencer/JB2A.
  - Mapas de batalha com paredes, iluminação dinâmica e sons ambientes pré-configurados.
  - Aventuras prontas (*Adventure Modules*) prontas para jogar com 1 clique.
- **Vantagem:** O pacote principal cumpre todas as regras do diretório público e as expansões são vendidas no Gumroad, DriveThruRPG ou Patreon.

---

#### 4. Modelo de Assinatura Contínua (Patreon / Apoia.se / Substack):
Indicado para criadores contínuos de conteúdo (cartógrafos, criadores de monstros, tokens animados e aventuras episódicas):
- O mestre paga uma mensalidade (ex: R$ 15 a R$ 50/mês ou US$ 5 a US$ 15/mês).
- Distribuição via **Moulinette Cloud** (serviço integrado ao Foundry que sincroniza conteúdo do Patreon direto na aba do jogo) ou link direto autenticado.
- Cada mês é entregue um novo pacote temático pronto para importar.

---

#### 5. Modelo Crowdfunding / Financiamento Coletivo (Catarse / Kickstarter):
Para grandes lançamentos de sistemas completos, campanhas ou conversões oficiais:
- O módulo ou sistema do Foundry VTT é oferecido como **Recompensa / Add-on Oficial** da campanha.
- Ao término da arrecadação, os apoiadores recebem chaves do DriveThruRPG ou links autenticados de instalação.

---

#### 6. Modelo Manual (Download Direto de Arquivo .ZIP):
- O cliente compra no Gumroad, Itch.io ou DriveThru e faz o download manual de um arquivo `module.zip` ou `system.zip`.
- Ele descompacta na pasta `Data/modules/` ou `Data/systems/` do seu Foundry VTT.
- **Atualização:** Requer envio de e-mail ou aviso manual para que o usuário baixe a nova versão na plataforma de compra e substitua a pasta.

---


## 🔄 11. Ciclo de Atualizações Futuras

Depois que o pacote for aprovado e inserido no diretório oficial:
1. Atualize o arquivo `VERSION`, o manifesto `module.json` e registre as mudanças no `CHANGELOG.md`.
2. Gere a nova tag correspondente no Git (`git tag v1.1.0 && git push --tags`).
3. O workflow do GitHub Actions valida via CLI, compila o `.zip`, publica a release e notifica a API do Foundry VTT.
4. Os mestres em todo o mundo receberão a notificação de atualização em suas instalações!
