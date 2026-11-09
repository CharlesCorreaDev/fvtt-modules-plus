# Foundry VTT - Model Context Protocol (MCP) Integration Guide 🤖🔌
> *Part of the Master of Foundry VTT Suite by GM Charles Corrêa*

---

## 📌 Visão Geral & Por Que Instalar Servidores MCP para Foundry VTT?

O **Model Context Protocol (MCP)** é o padrão aberto que permite a agentes de IA (como Antigravity, Claude Code, Gemini, Copilot CLI, Hermes Agent e Ollama) conectarem-se diretamente ao ambiente de execução do Foundry Virtual Tabletop, ao sistema de arquivos de dados do usuário (`Data/`) e a instâncias ativas do servidor.

### 🚀 Capacidades Desbloqueadas pelo MCP:
1. **Inspeção de Dados em Tempo Real:** Leitura direta de atores, itens, cenas, tabelas roláveis, diários e compêndios sem necessidade de exportação manual.
2. **Execução Segura de Macros & Scripts:** Teste e validação de scripts de macros diretamente no contexto do mundo do Foundry ou em sandbox LevelDB/NeDB.
3. **Validação de DataModels & Schemas:** Verificação automática de esquemas de `system.json`, `module.json` e classes de dados (`foundry.abstract.DataModel`).
4. **Resolução Rápida de Erros & Conflitos:** Diagnóstico em tempo real inspecionando logs de console, ganchos (`Hooks`) registrados e árvores de dependência do `libWrapper`.
5. **Automação de Criação de Conteúdo:** Geração instantânea de itens de RPG, magias, NPCs e encontros estruturados diretamente nos bancos de dados do mundo ou compêndios `.db`/ClassicLevel.

> 📖 **Manual de Instalação Rápida:** Consulte o [**Manual de Instalação do MCP Nativo (`INSTALLATION.md`)**](INSTALLATION.md) para o passo a passo com exemplos práticos no Antigravity IDE, Claude Desktop, Claude Code e Cursor.

---

## 🛠️ Servidor MCP Oficial Unificado: `master-of-foundryvtt-mcp`

O **`master-of-foundryvtt-mcp`** é o servidor MCP nativo e unificado da suite. Ele incorpora todas as capacidades necessárias em um único runtime independente (Node.js nativo), **dispensando a necessidade de instalar múltiplos servidores MCP externos** (`ninjos-foundry-mcp`, `foundryvtt-mcp`, `foundry-vtt-mcp`):

| Servidor MCP | Arquitetura | Status & Capacidades Integradas |
| :--- | :--- | :--- |
| **`master-of-foundryvtt-mcp`** *(Nativo & Oficial)* | Node.js stdio (JSON-RPC 2.0) | **Servidor Único Oficial.** Gerenciamento completo de atores, itens, cenas, tabelas, macros, compêndios, journals/handouts, playlists, baralhos de cartas, verificação de ícones HTTP 200, ownership estrito para GM, inspeção de SO e Nuvem/Docker, e engenharia reversa estática e remota via Git. |
| *Módulos Externos Terceiros (`ninjos`, `laurigates`, `adambdooley`)* | Módulos e Bridges Heterogêneos | **Descontinuados/Opcionais:** Não são mais necessários. O MCP nativo da skill cobre todas as operações sem dependências externas ou quebras de conexão. |

---

## 🚨 Protocolo de Intervenção e Solicitação de Credenciais

Quando o desenvolvedor solicitar a instalação, configuração ou conexão a um servidor MCP para o Foundry VTT, **o Agente de IA DEVE seguir este checklist de segurança e permissão**:

### 1. Solicitar Permissão Prévia
O agente deve explicar detalhadamente:
- Qual servidor MCP será instalado/configurado.
- Quais dependências serão necessárias (ex: Node.js, pacotes npm, módulo auxiliar no Foundry).
- Solicitar a aprovação expressa do desenvolvedor antes de executar comandos de instalação.

### 2. Coleta de Informações do Ambiente (Checklist Interativo)
O agente deve solicitar ao desenvolvedor as informações necessárias que não puderem ser auto-detectadas:

1. **Caminho da Pasta de Dados do Foundry (`User Data Path`):**
   - *Windows Padrão:* `%localappdata%\FoundryVTT\Data` (ex: `C:\Users\<Usuario>\AppData\Local\FoundryVTT\Data`)
   - *Linux Padrão:* `~/.local/share/FoundryVTT/Data`
   - *macOS Padrão:* `~/Library/Application Support/FoundryVTT/Data`
2. **URL e Porta da Instância do Foundry VTT:**
   - Local: `http://localhost:30000` (ou porta customizada).
   - Remoto/Servidor: URL completa (ex: `https://meufoundry.dominio.com`).
3. **Chave de Acesso / Senha de Administrador:**
   - Chave de administração do Foundry (`adminPassword`) para gerenciar mundos/pacotes se aplicável.
4. **Mundo Alvo e Usuário (Gamemaster/Assistente):**
   - Nome do Mundo (`worldId`) ativo.
   - Nome de usuário do GM e senha de acesso (se o mundo possuir autenticação por senha).
5. **Módulo Companion no Foundry (se exigido pelo MCP):**
   - Verificar se o módulo auxiliar de integração está instalado e ativo no mundo (`Active Modules`).

---

## ⚙️ Configurações Prontas para Clientes MCP

### 1. Configuração para Antigravity IDE / Claude Desktop (`mcp_config.json`)

```json
{
  "mcpServers": {
    "master-of-foundryvtt-mcp": {
      "command": "node",
      "args": ["e:/Projetos_Docker/skills-ai/master-of-foundryvtt/mcp/foundry_mcp_server.js"],
      "env": {
        "FOUNDRY_URL": "http://localhost:30000",
        "FOUNDRY_WORLD": "<NOME_DO_MUNDO>",
        "FOUNDRY_USER": "Gamemaster",
        "FOUNDRY_PASSWORD": "<SENHA_DO_GM_SE_HOUVER>",
        "FOUNDRY_ADMIN_KEY": "<SENHA_MASTER_ADMIN>",
        "FOUNDRY_DATA_PATH": "C:/Users/<SEU_USUARIO>/AppData/Local/FoundryVTT/Data"
      }
    }
  }
}
```

### 2. Configuração Simplificada para Claude Code CLI

```bash
claude mcp add master-of-foundryvtt node e:/Projetos_Docker/skills-ai/master-of-foundryvtt/mcp/foundry_mcp_server.js
```

---

## 🛡️ Boas Práticas de Segurança e Privacidade

1. **Nunca Versionar Senhas ou Chaves:** Arquivos `.env` ou `mcp_config.json` contendo senhas e chaves de API reais **nunca devem ser commitados no Git**. Adicionar sempre ao `.gitignore`.
2. **Ambiente Local Seguro:** Recomenda-se criar um usuário com privilégios de "Trusted Player" ou "Assistant GM" para testes automatizados, reservando o usuário principal "Gamemaster" para ações críticas.
3. **Backup dos Mundos:** Sempre orientar o desenvolvedor a realizar backup da pasta `worlds/<nome-do-mundo>` antes de executar operações em lote via MCP.

---

## 🔗 Links dos Repositórios Oficiais
- **Ninjos Foundry MCP:** [https://github.com/Niclasp1501/ninjos-foundry-mcp](https://github.com/Niclasp1501/ninjos-foundry-mcp)
- **FoundryVTT MCP (laurigates):** [https://github.com/laurigates/foundryvtt-mcp](https://github.com/laurigates/foundryvtt-mcp)
- **Foundry VTT MCP (adambdooley):** [https://github.com/adambdooley/foundry-vtt-mcp](https://github.com/adambdooley/foundry-vtt-mcp)
