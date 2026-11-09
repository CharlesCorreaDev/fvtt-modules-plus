# Manual de Instalação e Uso do Servidor MCP Nativo 🚀🔌
> **Master of Foundry VTT Custom MCP Server (`master-of-foundryvtt-mcp`)**  
> *Autônomo, nativo, com zero dependências externas (requer apenas Python 3.8+)*  
> *Autor: GM Charles Corrêa*

---

## 📌 Visão Geral & Diferenciais

O `master-of-foundryvtt-mcp` foi desenvolvido sob medida para a skill **Master of Foundry VTT** para garantir total autonomia do desenvolvedor e de agentes de IA (Antigravity IDE, Claude Desktop, Claude Code CLI, Cursor, Windsurf, Hermes Agent), **sem depender de pacotes npm externos de terceiros ou serviços fora do ar**.

Ele está disponível em duas versões equivalentes com zero dependências externas:
- **`mcp/foundry_mcp_server.js` (Recomendado - Node.js nativo):** Roda diretamente com o runtime do Node.js já presente no seu ambiente.
- **`mcp/foundry_mcp_server.py` (Python nativo):** Roda diretamente em ambientes com Python 3.8+.

### 🛠️ Ferramentas Nativas Disponíveis no Servidor:
1. **`inspect_foundry_environment`:** Detecta e inspeciona automaticamente a pasta de dados do Foundry (`User Data Path`), listando mundos, sistemas instalados e amostra de módulos ativos.
2. **`query_official_systems`:** Constrói consultas paginadas e URLs oficiais para o diretório de sistemas (`https://foundryvtt.com/packages/systems?page=N`).
3. **`query_official_modules`:** Constrói consultas paginadas para o catálogo de módulos da comunidade (`https://foundryvtt.com/packages/modules?page=N`).
4. **`query_foundry_store`:** Constrói links de busca oficiais na Loja do Foundry (`https://www.foundryvtt.store/search?q=<QUERY>`) para localização de suplementos e regras licenciadas.
5. **`validate_manifest`:** Realiza auditoria estática rigorosa de conformidade de arquivos `system.json` ou `module.json` para as versões v10 a v14.
6. **`generate_foundry_boilerplate`:** Gera código pronto para produção de `ApplicationV2` (Handlebars), `TypeDataModel` (esquema forte) ou RPC via `socketlib`.

---

## ⚙️ Passo a Passo de Instalação nos Clientes MCP

### 1. Pré-Requisitos
- Ter o **Node.js** (v18+) instalado (versão recomendada `node --version`) **OU** **Python 3.8+**.
- Não é necessário rodar `npm install` nem `pip install` (zero dependências externas!).

---

### 2. Configuração no Antigravity IDE / Claude Desktop

Abra o seu arquivo de configuração MCP:
- **No Antigravity IDE / Claude Desktop (Windows):** `%APPDATA%\Claude\claude_desktop_config.json` ou `mcp_config.json` do seu espaço de trabalho.
- **No Linux/macOS:** `~/.config/Claude/claude_desktop_config.json`

Adicione o servidor sob a chave `mcpServers`, informando opcionalmente as credenciais do seu mundo e a chave de administrador:

```json
{
  "mcpServers": {
    "master-of-foundryvtt": {
      "command": "node",
      "args": [
        "e:/Projetos_Docker/skills-ai/master-of-foundryvtt/mcp/foundry_mcp_server.js"
      ],
      "env": {
        "FOUNDRY_URL": "http://localhost:30000",
        "FOUNDRY_WORLD": "<NOME_DO_MUNDO_EX_dnd5e-campaign>",
        "FOUNDRY_USER": "Gamemaster",
        "FOUNDRY_PASSWORD": "<SENHA_DO_GM_SE_HOUVER>",
        "FOUNDRY_ADMIN_KEY": "<SENHA_MASTER_ADMIN_DO_FOUNDRY>",
        "FOUNDRY_DATA_PATH": "C:/Users/<SEU_USUARIO>/AppData/Local/FoundryVTT/Data"
      }
    }
  }
}
```

#### 🔑 O que cada credencial permite ao Agente fazer:
- **`FOUNDRY_USER` & `FOUNDRY_PASSWORD` (Acesso GM ao Mundo):** Permite ao agente atuar com permissões de Mestre para criar e preencher fichas completas de **Atores (PCs, NPCs, monstros)**, forjar **Itens/Magias/Armas**, publicar **Diários/Handouts** e criar **Tabelas Roláveis** e **Macros**.
- **`FOUNDRY_ADMIN_KEY` (Chave Master de Administração):** Permite ao agente gerenciar pacotes, instalar e ativar sistemas/módulos, criar backups e gerenciar mundos na tela de Setup do Foundry VTT.
- **`FOUNDRY_DATA_PATH` (Acesso Direto ao Disco):** Permite leitura e escrita direta em bancos de dados `.db` / ClassicLevel e compêndios locais.

*(Se preferir usar Python, basta trocar `"command": "python"` e o arquivo para `foundry_mcp_server.py`).*

> **Dica para Windows:** Utilize barras normais `/` no caminho do arquivo para evitar problemas de escape de caracteres com `\`.

---

### 3. Configuração no Claude Code CLI

Para registrar o servidor diretamente no terminal do **Claude Code**, execute:

```bash
claude mcp add master-of-foundryvtt node "e:/Projetos_Docker/skills-ai/master-of-foundryvtt/mcp/foundry_mcp_server.js"
```

Para verificar se o servidor foi carregado com sucesso:
```bash
claude mcp list
```

---

### 4. Configuração no Cursor / Windsurf

Nas configurações de **MCP / Extensions**:
- **Name:** `master-of-foundryvtt`
- **Type:** `command` (stdio)
- **Command:** `node e:/Projetos_Docker/skills-ai/master-of-foundryvtt/mcp/foundry_mcp_server.js`

---

## 🧪 Como Testar o Servidor Manualmente via Linha de Comando

Você pode validar a inicialização do servidor diretamente no PowerShell ou terminal executando o comando de handshake do protocolo MCP:

```powershell
python "e:\Projetos_Docker\skills-ai\master-of-foundryvtt\mcp\foundry_mcp_server.py"
```

Em seguida, cole o JSON de inicialização:
```json
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{}}}
```

O servidor responderá imediatamente confirmando o nome `master-of-foundryvtt-mcp` e suas capacidades:
```json
{"jsonrpc": "2.0", "id": 1, "result": {"protocolVersion": "2024-11-05", "capabilities": {"tools": {}}, "serverInfo": {"name": "master-of-foundryvtt-mcp", "version": "1.0.0"}}}
```

Para listar as ferramentas disponíveis, cole:
```json
{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}
```

---

## 🔒 Boas Práticas e Segurança

1. **Permissões de Leitura:** O servidor acessa a pasta de dados do Foundry apenas para leitura e diagnóstico quando solicitado explicitamente.
2. **Sem Exposição de Portas de Rede:** A comunicação acontece estritamente via descritores padrão (`stdin`/`stdout`), não abrindo nenhuma porta de rede pública nem necessitando de firewall.
