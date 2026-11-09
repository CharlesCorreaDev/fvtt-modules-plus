# Book Formatter / Diagramador de Livros 📕➡️📄

> **Book Formatting & RPG Book Diagramming**  
> *Formatação de Livros e Diagramação de Livros de RPG*

---

## 🇺🇸 English

### 📌 Overview

**Book Formatter** is an AI agent toolchain designed to install any required document-reading tools and to format and diagram books, delivering:

- A **TXT** file with the texts,
- A **Markdown** file,
- A **PDF** duly diagrammed and formatted.

Its core use case is **RPG books** — especially vintage materials from the **World of Darkness** (e.g., *Vampire: The Masquerade*) — where the final goal is a Portuguese translation with the layout of the original as faithful as possible (same images, columns, fonts, titles, indents, paragraphs, and page count).

The methodology follows a strict pipeline: **Analyze → Extract → Translate → Review → Diagram → Audit**, using code-mode tools and multimodal AI to produce DOCX, Markdown, and PDF.

### 🎯 Mandatory Pre-Execution Protocol: Code Mode, Grill-Me, Karpathy & AI Hero Code Review
All tasks must strictly follow the core engineering protocol before making any modifications:
1. **Mandatory Companion Skills Installation:**
   - **`grill-me`** (`https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me`): Deep interactive interview to lock requirements and author intent.
   - **`andrej-karpathy-skills`** (`https://github.com/multica-ai/andrej-karpathy-skills`): Pragmatic engineering guidelines (no assumptions, minimal code, surgical changes).
   - **`skills-code-review`** (`https://www.aihero.dev/skills-code-review`): Rigorous automated code review and quality validation before delivery.
   ```bash
   # User / Project Level
   npx skills@latest add mattpocock/skills --skill=grill-me
   npx skills@latest add multica-ai/andrej-karpathy-skills
   npx skills@latest add aihero-dev/skills-code-review
   ```
2. **Author Alignment via `grill-me`:** Interrogate the author regarding the exact RPG system, sample batch (5–10 pages), established terms, and original fonts.
3. **Andrej Karpathy Discipline:** Don't assume, don't hide confusion, make surgical modifications, keep code minimal and verify goals.
4. **AI Hero Code Review & Verification:** Always review, lint, and run syntax checks on any generated code or scripts before delivery.
5. **Code Mode & Phased Execution:** Execute all layout, text extraction, and bounding-box measurements deterministically via code tools and scripts, never in a single blind pass.

### 📜 Strict RPG Book Translator & Layout Rules
1. **Total Translation Fidelity:** Translate 100% of the text. Never summarize, adapt, simplify, omit, or invent text. Keep all mechanics and rules intact.
2. **Original Page Canvas Preservation:** The original page serves as the direct canvas. Never recreate blank pages from scratch; original illustrations, borders, frames, and ornaments remain intact.
3. **Numerical Inviolability:** Dice formulas (`1d8`), modifiers (`+2`), DCs, prerequisites, action economy, and mechanics are unchangeable.
4. **Pre-Delivery Quality Control:** Side-by-side verification paragraph-by-paragraph against the original source.
5. **Faithful Delivery Format:** Deliver pages matching the exact dimensions, aspect ratio, and art of the original work.

### 🔄 The 8 Workflow Phases

1. **ANALYZE THE ORIGINAL PDF** — Technical report on pages, margins, columns, spacing, indents, alignments, headers/footers, images, ornaments, borders, and fonts.
2. **DISCOVER AND UTILIZE CORRECT FONTS** — Identify fonts, sizes, and variations; locate typographically compatible alternatives if unavailable.
3. **EXTRACT TEXT BEFORE TRANSLATING** — Extract text respecting column reading order, paragraphs, lists, tables, and character sheets; generate editable DOCX.
4. **TEACH THE AI RPG VOCABULARY** — Compile a bilingual glossary, enforce consistent terminology, present alternatives for divergences.
5. **TRANSLATE IN SMALL BATCHES** — ~10–20 pages or one chapter per batch; preserve everything without summaries or adaptations.
6. **VERIFY TRANSLATION BEFORE DIAGRAMMING** — Page-by-page, paragraph-by-paragraph comparison; report checked and corrected items.
7. **START DIAGRAMMING!** — Use original PDF as absolute layout reference and translated DOCX as content source; reproduce layout faithfully (test 5–10 pages first).
8. **DEMAND A FINAL AUDIT** — Visual and structural comparison per page; resolve issues before final delivery.

### 🧰 Installation

```bash
# Verify environment and GitHub CLI connection
python scripts/check_env.py

# Install reading and document toolchain
pip install markitdown markitdown-ocr pdfminer.six pdfplumber pypdf pypdfium2 Pillow pytesseract \
            python-docx mammoth openpyxl pandas xlrd odfpy ebooklib beautifulsoup4 html2text striprtf

# SOTA AI Engines for complex RPG PDFs
pip install docling marker-pdf unstructured nougat-ocr
```

### 🧠 SOTA Layout Engines & Utilities (Docling, Marker, Stirling-PDF, Nougat)
For RPG books with dense layouts (multi-column text flow, monster/spell statblocks, and sidebars), the skill integrates:
- **Docling (IBM/DS4SD):** Multimodal layout analysis and table reconstruction via `TableFormer`.
- **Marker (Datalab):** Ultra-fast PDF-to-Markdown extraction preserving formulas, headers, and clean tables.
- **Unstructured:** Intelligent document partitioning for batch translation.
- **Nougat (Meta AI):** Neural visual-to-text OCR for vintage scans and gothic fonts.
- **Stirling-PDF:** Swiss-army knife for chapter splitting, native DPI image extraction, and PDF repair.
- **Nano-PDF & PDFtoGPT:** Surgical visual editing preserving backgrounds and anti-hallucination RAG auditing.

### 🛠️ Usage

```bash
# Check environment & update dependencies
python scripts/check_env.py
python scripts/check_env.py --upgrade

# Check for skill updates (and optionally auto-upgrade via Git)
python scripts/check_update.py
python scripts/check_update.py --upgrade

# Inspect and generate exhaustive typography and color report
python scripts/inspect_typography.py "path/to/document.pdf"

# Convert document to TXT / Markdown
python scripts/convert_to_txt_md.py "path/to/document.pdf" "output_dir"

# Segment rulebook into atomic rules for AI, RAG & MCP
python scripts/export_rules_for_ai.py "path/to/translated_book.md" "output_rag_dir" "system_name"
```

### 🧠 Rule Segmentation for AI, RAG and MCP
The skill automatically generates:
- `<system>_rag_chunks.jsonl` with structured metadata for vector databases (ChromaDB, Pinecone, FAISS).
- `<system>_training_dataset.jsonl` for fine-tuning LLM models.
- `categories/<topic>.md` for serving modular rules on demand via MCP Servers.

### 📖 Continuous Learning & Automatic RPG Glossary Generation
Whenever an RPG system book is processed:
1. The agent compiles mechanical terms, spells, attributes, and lore vocabulary.
2. Saves to memory and disk in `glossarys/glossary-<system>.md`.
3. Communication with the user and contribution to the developer are **formally submitted via GitHub Issue** (`gh issue create --repo CharlesCorreaDev/skills-ai`).

### 🔄 Version Monitor and Dependency Maintenance
- `python scripts/check_update.py --upgrade`: Upgrades the skill and glossaries to the latest GitHub version.
- `python scripts/check_env.py --upgrade`: Keeps all Python AI and PDF packages up to date.

### 📖 RPG & Gamers Glossary
The skill includes the **RPG & Gamers Glossary** (`glossarys/glossary.md`) along with specialized glossaries for Sci-Fi, Horror, Savage Worlds, Year Zero, World of Darkness, and Pathfinder 2e.

---

## 🇧🇷 Português (Brasil)

### 📌 Visão Geral

O **Book Formatter** (Diagramador de Livros) é uma suíte de ferramentas para Agentes de IA que instala qualquer ferramenta necessária para leitura de documentos (PDF com ou sem OCR, TXT, DOCX, DOC, CSV/TSV, XLSX/XLS, HTML, EPUB, imagens com OCR) e executa a diagramação de livros, entregando:

- Um arquivo **`.txt`** com os textos,
- Um arquivo **`.md`** (Markdown),
- Um **`.pdf`** devidamente diagramado/formatado.

O caso de uso principal é **livros de RPG** — especialmente materiais clássicos do **Mundo das Trevas** (ex.: *Vampiro: A Máscara / A Idade das Trevas*) — onde o objetivo final é uma tradução em português com a diagramação do original o mais fiel possível (mesmas imagens, colunas, fontes, títulos, recuos, parágrafos e contagem de páginas).

### 🎯 Protocolo Obrigatório Pré-Execução: Code Mode, Grill-Me, Karpathy & AI Hero Code Review
Antes de qualquer alteração, extração ou diagramação:
1. **Instalação Obrigatória das Skills:** Instalar e usar globalmente e no projeto:
   - **`grill-me`** (`https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me`): Interrogação profunda para alinhamento com o autor.
   - **`andrej-karpathy-skills`** (`https://github.com/multica-ai/andrej-karpathy-skills`): Princípios de engenharia pragmática, código mínimo e sem suposições.
   - **`skills-code-review`** (`https://www.aihero.dev/skills-code-review`): Revisão de código automatizada rigorosa e controle de qualidade.
   ```bash
   npx skills@latest add mattpocock/skills --skill=grill-me
   npx skills@latest add multica-ai/andrej-karpathy-skills
   npx skills@latest add aihero-dev/skills-code-review
   ```
2. **Entrevista Obrigatória com Grill-Me:** Interrogar o autor sobre sistema de RPG, lote inicial de teste (5-10 páginas), termos consagrados e fontes.
3. **Protocolo Andrej Karpathy:** Não assumir nada, mudanças cirúrgicas, manter o código mínimo e simples, definir metas e verificar.
4. **Revisão de Código AI Hero:** Sempre revisar, compilar e testar códigos e scripts gerados antes da entrega final.
5. **Code Mode & Etapas:** Executar toda tarefa em Code Mode por etapas determinísticas, nunca em um único passo cego.

### 📜 Regras Rigorosas do Tradutor & Diagramador de RPG
A skill segue 5 mandamentos obrigatórios de tradução e diagramação profissional de RPG:
1. **Fidelidade Integral:** Tradução completa de 100% dos textos; proibido resumir, simplificar, omitir ou inventar dados.
2. **Preservação da Página Original:** A página original serve como base direta. Não recriar páginas do zero; ilustrações, bordas, molduras e ornamentos permanecem intactos.
3. **Inviolabilidade Numérica de Regras:** Fórmulas de dados (`1d8`), modificadores (`+2`), requisitos, ações e CDs são intocáveis.
4. **Controle de Qualidade Pré-Entrega:** Checklist visual e estrutural parágrafo por parágrafo contra o original.
5. **Formato de Entrega Fiel:** Entrega de páginas preservando dimensões, proporção e arte original.

### 🔄 Os 8 Fluxos de Trabalho

1. **FAÇA A IA ANALISAR O PDF ORIGINAL** — Relatório técnico sobre páginas, margens, colunas, espaçamentos, recuos, cabeçalhos/rodapés, imagens, ornamentos, molduras e fontes.
2. **DESCUBRA E UTILIZE AS FONTES CORRETAS** — Identificar fontes, tamanhos e variações; mapear alternativas tipograficamente compatíveis se ausentes.
3. **EXTRAIA O TEXTO ANTES DE TRADUZIR** — Extrair texto respeitando a ordem correta de leitura das colunas, parágrafos, listas, tabelas e fichas; gerar DOCX editável.
4. **ENSINE A IA SOBRE O VOCABULÁRIO DO RPG** — Montar glossário bilíngue, manter consistência terminológica, apresentar alternativas em divergências.
5. **TRADUZA EM PEQUENOS LOTES** — ~10 a 20 páginas ou um capítulo por lote; preservar tudo sem resumos ou adaptações.
6. **VERIFIQUE A TRADUÇÃO ANTES DE DIAGRAMAR** — Comparação página por página e parágrafo por parágrafo; emitir relatório do que foi checado/corrigido.
7. **AGORA SIM, COMECE A DIAGRAMAÇÃO!** — Utilizar o PDF original como referência absoluta e o DOCX traduzido como fonte; reproduzir layout fielmente (iniciar com lote de teste de 5-10 páginas).
8. **EXIJA UMA AUDITORIA FINAL** — Comparação visual e estrutural por página; corrigir problemas antes da entrega final.

### 🧰 Instalação

```bash
# Verificar ambiente e conexão com GitHub CLI
python scripts/check_env.py

# Instalar dependências de leitura e documentos
pip install markitdown markitdown-ocr pdfminer.six pdfplumber pypdf pypdfium2 Pillow pytesseract \
            python-docx mammoth openpyxl pandas xlrd odfpy ebooklib beautifulsoup4 html2text striprtf

# Motores SOTA de IA para PDFs complexos de RPG:
pip install docling marker-pdf unstructured nougat-ocr
```

### 🧠 Motores Avançados de Layout & Utilitários (Docling, Marker, Stirling-PDF, Nougat)
Para livros de RPG com diagramações densas (colunas múltiplas, tabelas de monstros/magias e caixas laterais), a skill integra:
- **Docling (IBM/DS4SD):** Análise multimodal de layout e reconstrução de tabelas com `TableFormer`.
- **Marker (Datalab):** Extração ultrarrápida para Markdown preservando fórmulas e cabeçalhos.
- **Unstructured:** Particionamento inteligente de documentos para tradução em lotes.
- **Nougat (Meta AI):** OCR neural visual-to-text para scans antigos e fontes góticas.
- **Stirling-PDF:** Canivete suíço para dividir capítulos, extrair imagens em alta resolução e reparar PDFs.
- **Nano-PDF & PDFtoGPT:** Edição cirúrgica preservando background e auditoria RAG anti-alucinação.

### 🛠️ Modos de Uso

```bash
# Verificar ambiente e atualizar dependências
python scripts/check_env.py
python scripts/check_env.py --upgrade

# Verificar atualizações da skill (e opcionalmente atualizar via Git)
python scripts/check_update.py
python scripts/check_update.py --upgrade

# Inspecionar tipografia, cores e fontes originais (relatório técnico)
python scripts/inspect_typography.py "caminho/do/documento.pdf"

# Converter documento para TXT / Markdown
python scripts/convert_to_txt_md.py "caminho/do/documento.pdf" "saida"

# Segmentar livro de regras para IA, RAG e MCP
python scripts/export_rules_for_ai.py "caminho/do/livro_traduzido.md" "saida_rag" "nome_sistema"
```

### 🧠 Segmentação de Regras para IA, RAG e MCP
A skill gera automaticamente:
- `<sistema>_rag_chunks.jsonl` com metadados estruturados para bancos vetoriais (ChromaDB, Pinecone, FAISS).
- `<sistema>_training_dataset.jsonl` para fine-tuning de modelos LLM.
- `categories/<topico>.md` para servir regras modulares sob demanda via Servidores MCP.

### 📖 Aprendizado Contínuo & Criação Automática de Glossários
Sempre que um livro de RPG for processado:
1. O agente compila termos de regras, magias, atributos e cenários.
2. Salva em memória e no diretório `glossarys/glossary-<sistema>.md`.
3. A comunicação ao usuário e o envio da contribuição ao desenvolvedor são **formalizados obrigatoriamente via GitHub Issue** (`gh issue create --repo CharlesCorreaDev/skills-ai`).

### 🔄 Monitor de Versão e Manutenção de Dependências
- `python scripts/check_update.py --upgrade`: atualiza a skill e glossários para a versão mais recente do GitHub.
- `python scripts/check_env.py --upgrade`: mantém todos os pacotes Python de IA e PDF na última versão estável.

### 📖 Dicionários de RPG e Gamers
A skill conta com o **Dicionário de Termos de RPG e Gamers** (`glossarys/glossary.md`) e coleções temáticas em `glossarys/` (Sci-Fi, Terror, Savage Worlds, Year Zero, Mundo das Trevas e Pathfinder 2e).

---

## 📁 Structure / Estrutura

- [SKILL.md](SKILL.md) — Main skill definition, workflows, protocols.
- [README.md](README.md) — This file.
- [cheatsheet.md](cheatsheet.md) — Quick reference of formats, commands and phase prompts.
- [glossarys/glossary.md](glossarys/glossary.md) — RPG & Gamers terminology dictionary.
- [glossarys/glossary-scifi.md](glossarys/glossary-scifi.md) — Science Fiction, Cyberpunk & Space Opera dictionary.
- [glossarys/glossary-horror.md](glossarys/glossary-horror.md) — Cosmic Horror & Lovecraftian dictionary.
- [glossarys/glossary-savage-worlds.md](glossarys/glossary-savage-worlds.md) — Savage Worlds (SWADE) dictionary.
- [glossarys/glossary-year-zero.md](glossarys/glossary-year-zero.md) — Year Zero Engine (YZE) dictionary.
- [glossarys/glossary-world-of-darkness.md](glossarys/glossary-world-of-darkness.md) — World of Darkness (all franchises) dictionary.
- [glossarys/glossary-pathfinder-2e.md](glossarys/glossary-pathfinder-2e.md) — Pathfinder 2nd Edition (PF2e) dictionary.
- [VERSION](VERSION) — Semantic version.
- [CHANGELOG.md](CHANGELOG.md) — Release history.
- [scripts/](scripts/) — Environment checker, updater, converters, and AI rule segmentation scripts.
