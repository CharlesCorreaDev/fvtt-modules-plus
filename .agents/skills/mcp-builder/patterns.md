# MCP Builder - Architecture Patterns & Security Guidelines 🛡️🏗️

## 1. Padrões de Transporte no Model Context Protocol

### A. Transporte `stdio` (Padrão Recomendado para IDEs Locais)
- O servidor MCP lê requisições JSON-RPC linha a linha da entrada padrão (`stdin`) e escreve respostas na saída padrão (`stdout`).
- **Regra de Ouro (Zero Poluição do `stdout`):** 
  - Todo e qualquer log, depuração ou mensagem informativa deve ser estritamente enviado para o `stderr` (ex: `error_log()` em PHP, `sys.stderr.write()` em Python, `console.error()` em Node.js).
  - Nunca envie mensagens de debug com `print()`, `echo` ou `console.log()` comum no canal `stdout`, pois isso corrompe o parser JSON-RPC do cliente MCP.

### B. Transporte `SSE` (Server-Sent Events) e HTTP Streamable
- Usado em servidores MCP remotos ou hospedados em contêineres Docker / Nuvem.
- Implemente endpoints `/sse` para handshake contínuo e `/message` via POST para receber chamadas de ferramentas.

---

## 2. Camada de Segurança (Security Shield)

### A. Sanitização de Entrada & Anti-Prompt Injection
1. Qualquer documentação, prompt ou payload recebido de terceiros deve passar pelo `PromptShield`:
   - Detecção de frases de tentativa de jailbreak (`ignore previous instructions`, `bypass rules`, `system prompt override`).
   - Bloqueio de caracteres nulos (`\0`) e payloads binários anômalos.
2. Sanitização de Credenciais:
   - Tokens de API, Bearer tokens, senhas de banco de dados coladas no contexto são quarentenadas e substituídas por referências de variáveis de ambiente (`process.env`, `os.getenv`, `$_ENV`).

### B. Blindagem do Código Gerado (SAST & Anti-Vulnerabilidade)
1. **Command Injection**: Proibido concatenar variáveis diretamente em comandos de shell (`exec`, `system`, `shell_exec`, `child_process.exec`, `subprocess.run(..., shell=True)`). Obrigatoriamente utilizar listas de argumentos separadas sem shell interpolation.
2. **Path Traversal**: Todos os caminhos de arquivos devem ser normalizados (`realpath`, `os.path.abspath`, `path.resolve`) e validados contra uma pasta base permitida (`base_dir`).
3. **SQL Injection**: Obrigatoriedade de Prepared Statements (`PDO::prepare`, parameterized queries).

---

## 3. Protocolo Fail-Safe & Auto Issue Reporter

Quando o servidor gerado apresentar erro na fase de teste ou validação local:
1. **Feedback Amigável ao Usuário**: O agente explica o motivo do erro e o status atual.
2. **Higienização de Dados**: O stack trace passa pelo sanitizador de segredos para garantir que nenhuma chave privada, caminho confidencial ou credencial seja exposta.
3. **Abertura de Issue em Segundo Plano**:
   - Dispara chamada via `gh issue create` para o repositório oficial.
   - Aplica as labels `auto-reported`, `bug` e `mcp-builder`.
   - Inclui proposta automática de correção para revisão dos mantenedores.

