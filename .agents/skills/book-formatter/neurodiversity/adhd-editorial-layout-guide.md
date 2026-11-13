# Diagramação Editorial Acessível para TDAH, Neurodiversidade & Autismo 📖⚡

> **Fontes & Referências Acadêmicas Integradas:**  
> - Estudo UEL / Revista Projética: *"Design para impulsionar a criação de aplicativos para TDAH"* (Almeida, Portugal & Guimarães, 2024).  
> - Fast Company Brasil: *"O segredo do bom design: pensar em quem tem TDAH"*.  
> - Homem Máquina / Brasil UX Design: *"Design para neurodiversidade: TDAH, autismo e acessibilidade cognitiva"*.  
> - Lídia Oliver / Medium: *"Dicas de UX para usuários com TDAH"*.  
> - Comunidade Reddit (`r/UXDesign`): *"Being a UX designer with ADHD"*.  
> - DIO: *"Terapia comportamental e design para déficit de atenção"*.

---

## 🧠 1. Por que Livros e Manuais Tradicionais Falham com Leitores com TDAH?

Manuais técnicos, livros de regras de RPG (D&D, Vampire: The Masquerade, Savage Worlds) e apostilas acadêmicas tradicionais foram desenhados sob o paradigma do século XIX:
1. **Colunas Intermináveis de Texto Denso:** Provocam "cegueira de linha", fazendo os olhos pularem linhas ou se perderem na volta da margem esquerda.
2. **Falta de Âncoras Visuais:** Sem palavras em negrito estruturante, o leitor precisa reler o mesmo parágrafo 3 ou 4 vezes para reter a mecânica ou conceito.
3. **Sobrecarga de Detalhes Periféricos:** Ilustrações decorativas que cortam o fluxo do texto no meio de uma frase quebram o hiperfoco.
4. **Fadiga de Memória de Trabalho:** Se a explicação de uma regra na página 42 depende de lembrar uma tabela da página 12 sem referência direta, o jogador/estudante abandona o livro.

---

## 📐 2. Diretrizes de Diagramação Editorial Neuroinclusiva

Ao diagramar, traduzir ou formatar livros em PDF, Markdown ou TXT no `book-formatter`:

### 🔹 1. Bionic Reading Pattern (Leitura Guiada por Âncoras)
- Destaque em **negrito as primeiras sílabas ou termos-chave de ação** em regras cruciais, tabelas e resumos de capítulos.
- Permite que o cérebro neurodivergente faça varredura dinâmica e compreenda o sentido da página em fração de segundos.

### 🔹 2. Layout em Coluna Dupla Otimizada (Comprimento de Linha Seguro)
- O comprimento ideal de linha para evitar fadiga ocular e dispersão é de **45 a 65 caracteres por linha** (nunca ultrapassar 75 caracteres).
- Em páginas A4 ou Carta, utilize **duas colunas balanceadas** com calha (*gutter*) generosa de pelo menos 18pt a 24pt, impedindo que as linhas se misturem visualmente.

### 🔹 3. "Caixas de Respiro" (Callout Boxes & Chunking Atômico)
- Isole regras complexas, exemplos práticos e resumos executivos em **Callout Boxes** com fundo suave e borda esquerda sólida:
  ```markdown
  > 🎯 **TL;DR / Regra Rápida:** [1 frase com o resumo da mecânica].
  > - **Gatilho:** Quando o personagem rolar dados.
  > - **Efeito:** Se tirar 4 ou mais, sucesso garantido.
  ```

### 🔹 4. Tipografia Amigável para Neurodivergência
- Utilize fontes com abertura ampla de glifos e diferenciação nítida de caracteres (conforme documentado na skill: `Atkinson Hyperlegible`, `Lexend` ou `Google Sans`).
- Espaçamento entrelinhas (*leading*) generoso: mínimo de **1.4x a 1.6x** do tamanho da fonte.

### 🔹 5. Hierarquia Visual Inequívoca
- Títulos com contraste acentuado de peso.
- Nunca separe um título do seu parágrafo inicial entre duas páginas (proibição rigorosa de *órfãs e viúvas*).
- Tabelas com linhas zebradas suaves (`#F8F9FA`) e bordas nítidas para os olhos não se perderem horizontalmente.

---

## 📋 3. Checklist de Validação do `book-formatter` para Neurodiversidade

Antes de exportar o PDF final diagramado ou o Markdown:
1. ✅ **Escaneabilidade:** O leitor consegue identificar os 3 pontos mais importantes da página em menos de 5 segundos?
2. ✅ **Comprimento de Linha:** Nenhuma linha de texto excede 75 caracteres?
3. ✅ **Contraste de Fundo:** O fundo das caixas de texto possui contraste superior a 7:1 contra a tipografia?
4. ✅ **Navegação Não-Linear:** Há sumário com links internos clicáveis e cabeçalhos persistentes no topo de cada página indicando em qual capítulo o leitor está?

