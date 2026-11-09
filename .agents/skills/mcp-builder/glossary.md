# Glossário Técnico - Model Context Protocol & MCP Builder 📖

| Termo | Definição no Ecossistema MCP |
| :--- | :--- |
| **Model Context Protocol (MCP)** | Padrão aberto criado para permitir que modelos de IA e agentes conectem-se a fontes de dados externas, APIs locais/remotas e ferramentas de execução com segurança. |
| **MCP Host / Cliente** | A aplicação ou agente de IA que consome os servidores MCP (ex: Antigravity IDE, Claude Desktop, Cursor, Copilot). |
| **MCP Server** | O programa que expõe recursos, prompts e ferramentas (*tools*) para o cliente MCP via protocolo JSON-RPC 2.0. |
| **Transport (`stdio`)** | Comunicação via entrada e saída padrão de processo (`stdin`/`stdout`), ideal para execuções locais sem necessidade de portas de rede abertas. |
| **Transport (`SSE`)** | Server-Sent Events sobre HTTP, utilizado para comunicação unidirecional contínua de eventos com POST reverso para chamadas. |
| **JSON-RPC 2.0** | Protocolo de chamada de procedimento remoto sem estado e codificado em JSON, base das mensagens MCP. |
| **Input Schema** | Especificação JSON Schema (Draft 7) que dita rigorosamente os tipos, formatos e obrigatoriedades dos argumentos que a IA pode passar para uma ferramenta. |
| **Prompt Injection** | Tentativa maliciosa em que o usuário ou texto de entrada insere comandos com o objetivo de burlar as diretrizes do sistema do agente ou forçar execuções perigosas. |
| **Security Shield** | Camada de inspeção transversal que filtra inputs (anti-injeção e segredos) e outputs (análise estática SAST contra vulnerabilidades). |
| **Fail-Safe** | Mecanismo de tolerância a falhas que comunica o usuário de forma transparente e aciona abertura automática de issue no GitHub para catalogar o problema. |

