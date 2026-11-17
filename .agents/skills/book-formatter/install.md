# Guia de Instalação e Configuração / Installation & Setup Guide
# Book Formatter 📖📐

> **PT-BR**: Manual completo, minucioso e passo a passo para instalar e utilizar esta skill no seu assistente de IA favorito (Claude, ChatGPT, Gemini, OpenCode, Codex, Qwen, DeepSeek, NVIDIA, Ollama, Cursor, Antigravity, Copilot, etc.).  
> **EN**: Comprehensive, step-by-step setup guide to install and run this skill across your favorite AI agents and tools.

---

## 📋 Sumário / Table of Contents
1. [O que é esta Skill? / What is this Skill?](#1-o-que-é-esta-skill--what-is-this-skill)
2. [Instalação Rápida em 1 Minuto (CLI Oficial) / Quick 1-Minute Install](#2-instalação-rápida-em-1-minuto-cli-oficial--quick-1-minute-install)
3. [Instalação por Plataforma / Setup by AI Platform](#3-instalação-por-plataforma--setup-by-ai-platform)
   - [A. Claude Code / Claude Desktop / Claude.ai](#a-claude-code--claude-desktop--claudeai)
   - [B. Google Antigravity & Gemini CLI](#b-google-antigravity--gemini-cli)
   - [C. OpenAI Codex & ChatGPT (Custom GPTs)](#c-openai-codex--chatgpt-custom-gpts)
   - [D. Cursor IDE & Windsurf Editor](#d-cursor-ide--windsurf-editor)
   - [E. OpenCode, Open Interpreter & Hermes Agent](#e-opencode-open-interpreter--hermes-agent)
   - [F. Modelos Locais via Ollama, Qwen, DeepSeek & NVIDIA NIM](#f-modelos-locais-via-ollama-qwen-deepseek--nvidia-nim)
   - [G. GitHub Copilot CLI & VS Code](#g-github-copilot-cli--vs-code)
4. [Instalação das Skills Companheiras (Obrigatórias) / Companion Skills Setup](#4-instalação-das-skills-companheiras-obrigatórias--companion-skills-setup)
5. [Como Testar se Funcionou / Verification & Hello World](#5-como-testar-se-funcionou--verification--hello-world)
6. [Resolução de Problemas / FAQ & Troubleshooting](#6-resolução-de-problemas--faq--troubleshooting)

---

## 1. O que é esta Skill? / What is this Skill?

- **PT-BR**: Suíte de diagramação e formatação profissional de livros e manuais de RPG (PDF, Markdown, ePUB, InDesign/Typst).  
  Uma skill funciona como uma *extensão de memória e super-poderes* para o cérebro da Inteligência Artificial. Quando instalada, o agente passa a seguir métodos comprovados, arquitetura rigorosa, controle de qualidade e prevenção de alucinações.
- **EN**: Professional book formatting, layout diagramming, and RPG manual typesetting suite (PDF, Markdown, ePUB, InDesign/Typst).  
  A skill acts as an *extended memory and capability pack* for the AI agent. Once loaded, the agent strictly enforces proven methodologies, architecture rigor, quality gates, and anti-hallucination guardrails.

---

## 2. Instalação Rápida em 1 Minuto (CLI Oficial) / Quick 1-Minute Install

Se você já utiliza os gerenciadores de skills padrão da comunidade (`skills CLI` ou `npx skills`), abra o seu terminal (Prompt de Comando, PowerShell ou Terminal Linux/macOS) na pasta do seu projeto e execute:

```bash
# Instalação direta a partir do repositório
npx skills@latest add CharlesCorreaDev/skills-ai --skill=book-formatter
```

Ou copie a pasta `book-formatter` diretamente para a pasta `.agents/skills/book-formatter` ou `.gemini/config/skills/book-formatter` do seu workspace.

---

## 3. Instalação por Plataforma / Setup by AI Platform

### A. Claude Code / Claude Desktop / Claude.ai
#### Claude Code (Terminal CLI)
1. Certifique-se de estar na raiz do seu projeto.
2. Execute o comando de adição:
   ```bash
   npx skills@latest add CharlesCorreaDev/skills-ai --skill=book-formatter
   ```
3. O Claude Code reconhecerá automaticamente o arquivo `SKILL.md` e os arquivos da pasta `references/`.

#### Claude Desktop & Claude.ai (Web)
1. Abra o **Claude.ai** ou o aplicativo **Claude Desktop**.
2. Vá em **Settings (Configurações)** > **Projects (Projetos)**.
3. Crie um novo Projeto ou abra seu projeto existente.
4. Na aba **Project Knowledge (Conhecimento do Projeto)**:
   - Faça o upload do arquivo `SKILL.md`.
   - Faça o upload dos arquivos da pasta `references/` (ex: `sdd-handoff-grillme-tdd.md` e arquiteturas correspondentes).
5. No campo **Custom Instructions (Instruções Personalizadas)**, adicione:
   > *Siga rigorosamente as instruções e os subagentes descritos na skill `book-formatter` incluída no conhecimento deste projeto.*

---

### B. Google Antigravity & Gemini CLI
#### Google Antigravity (IDE / Agente)
1. Copie a pasta inteira `book-formatter` para a pasta de skills do seu projeto:
   - Caminho local do workspace: `.agents/skills/book-formatter`
   - Ou para nível global: `~/.gemini/config/skills/book-formatter` (Linux/Mac) ou `%USERPROFILE%\.gemini\config\skills\book-formatter` (Windows).
2. O Antigravity detecta o arquivo `SKILL.md` automaticamente na próxima instrução enviada.

#### Gemini CLI
1. Execute:
   ```bash
   gemini skill install https://github.com/CharlesCorreaDev/skills-ai.git --path book-formatter
   ```

---

### C. OpenAI Codex & ChatGPT (Custom GPTs)
#### ChatGPT Plus / Team / Enterprise (Web GPTs)
1. Acesse o **ChatGPT** > **Explore GPTs** > **Create a GPT**.
2. Na aba **Configure**:
   - **Name**: `Book Formatter 📖📐`
   - **Instructions**: Cole o conteúdo de `SKILL.md`.
   - **Knowledge**: Clique em *Upload files* e envie todos os arquivos `.md` presentes na pasta `references/`.
   - **Capabilities**: Deixe ativados *Code Interpreter* e *Web Browsing*.
3. Salve como *Only me* (Privado) ou compartilhe com sua equipe.

#### OpenAI Codex / Assistants API
1. Ao instanciar o Assistant via Dashboard ou código Python, defina `instructions` lendo o conteúdo de `SKILL.md` e anexe a pasta `references/` como vector store no Retrieval.

---

### D. Cursor IDE & Windsurf Editor
#### Cursor IDE
1. Na raiz do seu projeto, crie ou edite o arquivo `.cursorrules`:
   - Copie as regras essenciais de `SKILL.md` para o seu `.cursorrules`.
2. Alternativamente, crie a pasta `.cursor/rules/`:
   - Salve um arquivo chamado `book-formatter.mdc` apontando para o conteúdo de `SKILL.md`.

#### Windsurf Editor (Codeium)
1. Abra a pasta do seu projeto no Windsurf.
2. Crie ou edite o arquivo `.windsurfrules` na raiz do projeto.
3. Cole as diretrizes e regras rápidas (Fast Gates) de `SKILL.md`.

---

### E. OpenCode, Open Interpreter & Hermes Agent
#### OpenCode & Hermes Agent
1. Instale utilizando o repositório Git:
   ```bash
   opencode skill install https://github.com/CharlesCorreaDev/skills-ai --name book-formatter
   ```
2. Ou adicione o caminho local no seu arquivo de configuração `opencode.json` ou `hermes.yaml`:
   ```json
   {
     "skills_path": "./.agents/skills/book-formatter"
   }
   ```

#### Open Interpreter
1. Inicie o Open Interpreter passando o System Message:
   ```bash
   interpreter --custom_instructions "$(cat book-formatter/SKILL.md)"
   ```

---

### F. Modelos Locais via Ollama, Qwen, DeepSeek & NVIDIA NIM
Você pode rodar esta skill 100% offline e com privacidade total usando modelos open-source como **Qwen 2.5 Coder**, **DeepSeek R1 / V3**, **Llama 3.3** ou microserviços **NVIDIA NIM**.

#### Via Ollama (Modelfile Personalizado)
1. Abra o terminal na pasta `book-formatter`.
2. Crie um arquivo chamado `Modelfile` com o seguinte conteúdo:
   ```dockerfile
   FROM qwen2.5-coder:32b
   # Ou use: FROM deepseek-r1:14b / FROM llama3.3
   
   PARAMETER temperature 0.2
   PARAMETER top_p 0.95
   
   SYSTEM """
   $(cat SKILL.md)
   """
   ```
3. Crie o seu modelo personalizado no Ollama:
   ```bash
   ollama create book-formatter -f ./Modelfile
   ```
4. Execute o modelo com a skill ativada nativamente:
   ```bash
   ollama run book-formatter
   ```

#### Via DeepSeek (DeepSeek Chat / Coder API) & NVIDIA NIM
1. Carregue o conteúdo do `SKILL.md` no parâmetro `system_prompt` da requisição da API:
   ```python
   from openai import OpenAI

   client = OpenAI(
       base_url="https://api.deepseek.com",  # ou endpoint NVIDIA NIM
       api_key="SUA_CHAVE_AQUI"
   )

   with open("book-formatter/SKILL.md", "r", encoding="utf-8") as f:
       system_instructions = f.read()

   response = client.chat.completions.create(
       model="deepseek-coder",
       messages=[
           {"role": "system", "content": system_instructions},
           {"role": "user", "content": "Iniciar projeto com a skill book-formatter"}
       ]
   )
   print(response.choices[0].message.content)
   ```

---

### G. GitHub Copilot CLI & VS Code
1. No VS Code, instale a extensão **GitHub Copilot Chat**.
2. Na raiz do repositório, certifique-se de que o arquivo `.github/copilot-instructions.md` exista.
3. Adicione uma instrução referenciando a skill:
   ```markdown
   Consulte sempre as diretrizes e subagentes definidos em `book-formatter/SKILL.md` antes de propor código ou arquitetura.
   ```

---

## 4. Instalação das Skills Companheiras (Obrigatórias) / Companion Skills Setup

Para extrair 100% de performance, máxima economia de tokens (60% a 95%) e garantir rigor técnico de engenharia sem alucinações, instale o pacote de ferramentas companheiras:

```bash
# 1. Stack de Economia Extrema de Tokens & Minimalismo (Obrigatório)
npx skills@latest add headroomlabs-ai/headroom
npx skills@latest add rtk-ai/rtk
npx skills@latest add JuliusBrussee/caveman
npx skills@latest add dietrichgebert/ponytail

# 2. Engenharia Rigorosa, SDD, TDD & GodMode
npx skills@latest add noobygains/godmode
npx skills@latest add addyosmani/agent-skills --skill=spec-driven-development
npx skills@latest add mattpocock/skills --skill=grill-me
npx skills@latest add mattpocock/skills --skill=handoff
npx skills@latest add mattpocock/skills --skill=tdd

# 3. Qualidade, Governança & Auditoria de Segurança
npx skills@latest add aihero-dev/skills-code-review
npx skills@latest add multica-ai/andrej-karpathy-skills
npx skills@latest add cloudflare/security-audit-skill
npx skills@latest add NVIDIA/auto-ontology
```

---

## 5. Como Testar se Funcionou / Verification & Hello World

Abra uma conversa com o seu agente de IA configurado e envie uma das mensagens abaixo para verificar a ativação imediata:

> **Mensagem de Teste (PT-BR)**:  
> *"Olá! Confirme que você carregou a skill `book-formatter`. Quais são os seus subagentes e qual o primeiro passo que devemos dar?"*

> **Test Prompt (EN)**:  
> *"Hello! Please confirm that the `book-formatter` skill is loaded. List your specialized subagents and outline our first action item."*

**Resposta Esperada**:  
O agente deve se apresentar com a identidade da skill, enumerar os subagentes especializados correspondentes e acionar as perguntas iniciais de escopo ou os portões rápidos (Fast Gates).

---

## 6. Resolução de Problemas / FAQ & Troubleshooting

### ❓ "O agente não está seguindo as regras da skill. O que fazer?"
- **Causa**: O contexto pode estar sobrecarregado ou as instruções não foram inseridas no `system prompt` / `Project Knowledge`.
- **Solução**: Inicie um novo chat (chat limpo). Mencione explicitamente no primeiro comando: *"Carregue a skill `book-formatter` e siga o arquivo SKILL.md"*.

### ❓ "A resposta está muito longa e gastando muitos tokens!"
- **Solução**: Certifique-se de ter instalado as skills companheiras `caveman`, `rtk`, `headroom` e `ponytail`. Basta digitar `/caveman` ou instruir: *"Ative o modo Caveman + Ponytail para respostas concisas e código enxuto"*.

### ❓ "Posso usar a skill sem conexão com a internet?"
- **Sim!** A skill é composta exclusivamente de arquivos Markdown (`SKILL.md` e `references/*.md`). Se você utilizar Ollama com Qwen, DeepSeek ou Llama local, tudo funcionará 100% offline em sua máquina.

---
*Mantido por GM Charles Corrêa e comunidade Skills AI. Licença MIT.*
