# Foundry VTT AI Integration & LLM Modules Directory 🧠🎲
> *Guia Completo de Integração de Inteligência Artificial, LLMs e Geradores de Conteúdo para Foundry Virtual Tabletop*
> *Master of Foundry VTT by GM Charles Corrêa*

---

## 📌 Visão Geral da IA no Ecossistema Foundry VTT

A comunidade do Foundry VTT desenvolveu diversos módulos e ecossistemas para integrar modelos de linguagem de grande porte (LLMs como OpenAI GPT-4o, Anthropic Claude, Google Gemini, Ollama local e OpenRouter) diretamente no ambiente da mesa virtual.

Essas soluções cobrem:
1. **Assistentes de Mestre (GM Assistants):** Geração de descrições de salas, ganchos narrativos, diálogos de NPCs e regras em tempo real.
2. **Atores e NPCs Autônomos:** Personagens que respondem aos jogadores no chat simulando personalidades, memórias e sotaques.
3. **Geradores de Itens e Fichas:** Criação estruturada de magias, armas, monstros e tabelas compatíveis com as versões v11, v12, v13 e v14.

---

## 🛠️ Principais Módulos de IA Oficiais & Comunitários

### 1. Integrate AI Ecosystem (SirNiloc)
O ecossistema mais modular e consolidado de IA no Foundry VTT, mantido por **SirNiloc**.
- **Módulo Principal:**
  - **Pacote Foundry:** [`integrate-ai`](https://foundryvtt.com/packages/integrate-ai)
  - **Repositório:** [https://github.com/SirNiloc/integrate-ai](https://github.com/SirNiloc/integrate-ai)
  - **Arquitetura:** Atua como o núcleo provedor de conexões API (OpenAI, Anthropic Claude, OpenRouter, modelos locais compatíveis com API OpenAI como Ollama/LM Studio). Fornece uma API JavaScript unificada para que outros módulos e macros consultem LLMs sem precisar gerenciar chaves e conexões separadas.
- **Módulos Complementares da Suíte:**
  - **Gimme a Hook:** [`integrate-ai-gimme-a-hook`](https://github.com/SirNiloc/integrate-ai-gimme-a-hook/) — Gera ganchos de aventura, rumores em tabernas, reviravoltas dramáticas e sementes de missões diretamente na barra lateral de chat ou em diários.
  - **Gimme a Name:** [`integrate-ai-gimme-a-name`](https://github.com/SirNiloc/integrate-ai-gimme-a-name) — Gerador contextual inteligente de nomes de fantasia, vilarejos, naves espaciais e organizações com base na cultura e no cenário do mundo ativo.

### 2. Phil's AI Assistant (Phil's Modules)
- **Pacote Foundry:** [`phils-ai-assistant`](https://foundryvtt.com/packages/phils-ai-assistant)
- **Repositório:** [https://github.com/PhilsModules/phils-ai-assistant](https://github.com/PhilsModules/phils-ai-assistant)
- **Arquitetura & Especificidades:**
  - Interface dedicada integrada à barra lateral do Foundry para consulta e geração assistida por IA.
  - Integração com provedores de IA para responder dúvidas do mestre sobre regras, gerar descrições sensoriais de cenas, criar encontros balanceados e gerar notas de diário estruturadas.
  - Configuração de personas personalizadas para o narrador ou assistente.

### 3. AI Actors & NPCs Autônomos (rachsg7)
- **Repositório:** [https://github.com/rachsg7/ai-actors](https://github.com/rachsg7/ai-actors)
- **Arquitetura & Especificidades:**
  - Permite atribuir cérebros de IA e perfis de personalidade a atores e tokens específicos do Foundry VTT.
  - Quando um jogador sussurra ou fala perto do token de um NPC no chat, o módulo aciona o LLM com o histórico da conversa e a ficha do ator como contexto do sistema (System Prompt), respondendo diretamente como o personagem.
  - Suporte a gatilhos de visão e memória local de interações por cena.

### 4. Cibola 8 (cibola8)
- **Pacote Foundry:** [`cibola8`](https://foundryvtt.com/packages/cibola8)
- **Arquitetura & Especificidades:**
  - Ferramenta avançada para enriquecimento narrativo e suporte à condução de campanhas de ficção científica e aventura.
  - Integração com recursos procedurais e automações para mestres.

### 5. ChatGPT Item Generator for Foundry VTT (f3rr311)
- **Repositório:** [https://github.com/f3rr311/ChatGPT-Item-Gen-for-Foundry-VTT](https://github.com/f3rr311/ChatGPT-Item-Gen-for-Foundry-VTT)
- **Arquitetura & Especificidades:**
  - Ferramenta e prompts estruturados em JSON para gerar itens mágicos, armas, armaduras e equipamentos diretamente no formato de importação de documentos de Item do Foundry VTT (`ItemData` / `TypeDataModel`).
  - Garante que a saída do modelo respeite os campos obrigatórios do Foundry (`name`, `type`, `system.description.value`, `system.price`, `system.weight`, etc.) evitando que o JSON quebre ao ser importado no mundo.

---

## 🔒 Boas Práticas & Segurança no Uso de IA no Foundry VTT

1. **Gestão de Chaves de API (Segurança Crítica):**
   - Nunca compartilhe telas ou transmita sua mesa com as configurações do módulo de IA abertas, pois a chave de API da OpenAI/Anthropic/Gemini pode ser exposta.
   - Configure as chaves nas opções de configurações com permissão restrita a Gamemasters (`gmOnly: true`).
2. **Uso de Modelos Locais Gratuitos (Zero Custo & Privacidade Total):**
   - Para mestres que não desejam pagar por tokens de API em nuvem ou que preferem manter seus cenários privados, módulos como o `integrate-ai` suportam endpoints locais via **Ollama** (`http://localhost:11434/v1`) ou **LM Studio** (`http://localhost:1234/v1`).
   - Recomenda-se modelos otimizados para RPG e narrativa, como `llama3.1:8b`, `mistral:7b` ou `qwen2.5:7b`.
3. **Compatibilidade com Versões do Foundry (v11, v12, v13, v14):**
   - Ao gerar itens ou atores via IA para versões modernas (v12+ e v14+), exija que a saída utilize a estrutura moderna de `TypeDataModel` e não os antigos formatos legados pré-v10.
