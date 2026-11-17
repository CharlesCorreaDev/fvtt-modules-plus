---
name: humanizer-plus
description: Comprehensive, universal AI content humanization, provenance scrubbing, and code de-watermarking suite. Cleans any text, source code, documentation, article, script, or payload across all languages (PT-BR, EN, ES, FR, DE). Strips invisible zero-width tracking codepoints, removes AI-generated code comments, purges watermarks/metadata containers (C2PA, EXIF, AI tags), and eliminates all 26 statistical AI-isms from blader/humanizer v3.1.0. Use when humanizing text, refactoring AI-generated code to idiomatic clean code, purging watermarks, removing emojis, or reviewing PRs for synthetic tells.
---

# Humanizer Plus 🧠🛡️✨
> *The Definitive Universal AI De-Watermarking, Code Sanitization & Text Humanização Suite*  
> *Author: Charles Corrêa*  
> *Synchronized up to Upstream blader/humanizer v3.1.0 (26 Canonical Patterns)*

---

## 📌 Escopo Universal: Para Todo e Qualquer Arquivo ou Conteúdo

O **Humanizer Plus NÃO é restrito a nenhum nicho específico**. Ele foi projetado para atuar como o **humanizador e desmarcador de IA universal** para:

1. **Códigos-Fonte e Scripts (Qualquer Linguagem):**
   - JavaScript, TypeScript, Python, PHP, Go, Rust, C#, Java, Shell/Bash, SQL, HTML, CSS/SCSS.
2. **Textos em Geral e Prosa Profissional:**
   - Artigos técnicos, postagens para blogs, e-mails comerciais, documentações de software, redações acadêmicas, relatórios, resumos e apresentações.
3. **Comunicações e Respostas a Usuários:**
   - E-mails de suporte, conversas no Slack/Discord, comentários em PRs do GitHub e respostas de atendimento.
4. **Documentos e Metadados Estruturados:**
   - Markdown (`.md`), LaTeX (`.tex`), JSON, YAML, HTML, DOCX e PDF.
5. **Mídias e Contêineres:**
   - Imagens (PNG, JPG, WebP), vetores SVG e vídeos (remoção de metadados C2PA, EXIF, IPTC e tags de geradores).

---

## 🚨 Os 3 Pilares Fundamentais do Humanizer Plus

### Pilar 1: Saneamento Físico & Anti-Detecção Mecânica (Camada A)
- **Eliminação de Caracteres Invisíveis de Rastreamento (Zero-Width):**
  - Remove silenciosamente `U+200B` (ZWSP), `U+200C` (ZWNJ), `U+200D` (ZWJ), `U+FEFF` (BOM/ZWNBSP), `U+200E`/`U+200F` (marcas direcionais) e `U+2060` (word joiner) que modelos inserem para rastreamento de proveniência.
- **Normalização de Aspas & Espaços:**
  - Converte aspas curvas tipográficas (`“ ” ‘ ’`) em aspas ASCII retas (`" '`).
  - Converte espaços não-separáveis (`U+00A0`, `U+202F`) e espaços finos em espaços comuns.
- **Purga de Metadados e Comentários Ocultos:**
  - Remove comentários de injeção (`<!-- cid:... -->`, `<!-- openai:... -->`, `<!-- prompt:... -->`).
  - Limpa chaves de gerador em frontmatter (`generator: llm`, `ai_model: gpt-4`).
  - Purga metadados C2PA, EXIF e tags AIGC de imagens e mídias.

### Pilar 2: Desmarcação & Humanização de Códigos-Fonte (Clean Code)
A IA possui manias mecânicas em código que qualquer programador sênior detecta instantaneamente:
- **Corte de Comentários Didáticos Óbvios:**
  - Elimina comentários infantis linha a linha que apenas narram a sintaxe (`// Loop through items`, `// If condition is true`, `// Set variable to 0`, `// Log message to console`).
- **Eliminação de Cabeçalhos e Assinaturas de IA:**
  - Remove cabeçalhos artificiais (`// Created by AI Assistant`, `/** Generated with ChatGPT */`, `// Auto-generated script`).
- **Substituição de Nomes Enciclopédicos:**
  - Substitui variáveis com nomes de livro-texto (ex: `currentIterationItemArrayElementInstance`) por identificadores idiomáticos e naturais (`item`, `el`, `acc`).
- **Adoção de Padrões Idiomáticos:**
  - Prioriza retornos antecipados (*early returns*), encadeamento opcional (`?.`), coalescência nula (`??`) e código conciso em vez de aninhamentos piramidais de `if/else`.
- **Blindagem Factual do Código:**
  - NUNCA altera rotas de API, assinaturas públicas de funções, regras matemáticas ou a lógica de negócio do software.

### Pilar 3: Humanização Textual & Quebra de Watermarks Estatísticas (Camada B)
Incorpora **todos os 26 padrões canônicos** do WikiProject AI Cleanup e do blader/humanizer v3.1.0 (Not X but Y, Rule of Three, Overuse of Delve/Tapestry/Beacon, False Dilemmas, Rhetorical Questions, Superficial Transitions, Em-Dash Abuse).
Consulte o catálogo completo e regras de substituição em [padroes-humanizacao-26.md](references/padroes-humanizacao-26.md).





## 🔗 Protocolo de Skills Companheiras (SDD, TDD, Tokens & Rigor)
`ash
# Stack Supremo de Economia de Tokens & Otimizacao
npx skills@latest add headroomlabs-ai/headroom
npx skills@latest add rtk-ai/rtk
npx skills@latest add JuliusBrussee/caveman
npx skills@latest add dietrichgebert/ponytail

# Suite de Engenharia Rigorosa, SDD, TDD, Handoff & GodMode
npx skills@latest add noobygains/godmode
npx skills@latest add addyosmani/agent-skills --skill=spec-driven-development
npx skills@latest add mattpocock/skills --skill=grill-me
npx skills@latest add mattpocock/skills --skill=handoff
npx skills@latest add mattpocock/skills --skill=tdd
npx skills@latest add aihero-dev/skills-code-review
npx skills@latest add multica-ai/andrej-karpathy-skills
npx skills@latest add cloudflare/security-audit-skill
npx skills@latest add NVIDIA/auto-ontology
`

---

## 📚 Referências de Engenharia
- [Metodologias SDD, Handoff, Grill-Me & TDD](references/sdd-handoff-grillme-tdd.md): Especificação rigorosa, alinhamento, TDD e handoff.
