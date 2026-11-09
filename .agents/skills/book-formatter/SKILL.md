---
name: book-formatter
description: "Book formatting and RPG book diagramming suite for AI agents. Installs any required document-reading toolchain (PDF with or without OCR, TXT, DOCX, DOC, CSV/TSV, XLSX/XLS, HTML, EPUB, images OCR) and orchestrates book diagramming delivering a TXT with the texts, a Markdown and a duly diagrammed PDF preserving the original layout. Built for paid AI workflows (ChatGPT + Adobe WORK plugin) to analyze, extract, translate in small batches, review and diagram RPG books (World of Darkness, Vampire: The Masquerade) with faithful typography, columns, margins, fonts, images, borders and ornaments. Use when the user wants to format, translate or diagram an RPG book into Portuguese via AI with TXT, Markdown and PDF deliverables via Antigravity, Claude Code, Copilot CLI, Hermes Agent, Orca, Gemini, Kilo, NVIDIA, or Ollama."
---

# Book Formatter / Diagramador de Livros 📕➡️📄

> *by GM Charles Corrêa*
> **Current Status:** Beta (v0.8.0-beta)

---

## 🇺🇸 English

### 📌 Overview & Mental Model

**Book Formatter** (also known as **Book Diagrammer**) is a cross-platform (Windows, Linux, macOS) AI-agent skill for **book formatting and RPG book diagramming**.

Its mission is to install every necessary tool to read documents (PDF with or without OCR, plain text, Word, spreadsheets and other formats) and to orchestrate the full transformation of a source book into delivered artifacts:

1. **`.txt`** — delivered file with the texts (extracted + translated).
2. **`.md`** — delivered Markdown version of the texts.
3. **`.pdf`** — delivered PDF, duly **diagramed**/**formatted**, faithful to the original layout.

The flagship use case is **RPG books** (especially old materials from the **World of Darkness**, such as *Vampire: The Masquerade*), where the final goal is a Portuguese translation with the diagramming of the original as faithful as possible: same images, columns, fonts, titles, indents, paragraphs and page count.

> **Critical insight:** There is no magic command that does everything perfectly. The secret is to split the work into stages and demand checks. If in doubt, ask the AI directly: *"What do I need to do to run such command?"*

### 📚 Supported Format Matrix & Extraction Engines

| Format | Extensions | Primary Engine | Fallback Engine | Dependencies / Binaries |
|---|---|---|---|---|
| **PDF (Digital)** | `.pdf` | `docling` / `markitdown` | `marker-pdf`, `pdfminer.six`, `pdfplumber` | `docling`, `marker-pdf`, `markitdown`, `pdfminer.six`, `pdfplumber`, `pypdf`, `pypdfium2` |
| **PDF (Scanned / Complex Layout)** | `.pdf` | `docling` / `nougat` | `marker-pdf`, `markitdown_ocr` | `docling`, `nougat-ocr`, `marker-pdf`, `unstructured`, `tesseract-ocr`, `Pillow`, `pypdfium2` |
| **PDF (Manipulation & Sanitization)** | `.pdf` | `stirling-pdf` / `pypdf` | `pdfcpu` / `pdftoppm` | `stirling-pdf`, `pypdf`, `pdfplumber`, `poppler-utils` |
| **Plain Text** | `.txt` | built-in / `markitdown` | - | - |
| **Markdown** | `.md` | `marker-pdf` / `docling` | `markitdown` | `marker-pdf`, `docling`, `markitdown` |
| **CSV / TSV** | `.csv`, `.tsv` | `markitdown` / `pandas` | - | `markitdown`, `pandas` |
| **Microsoft Word** | `.docx` | `docling` / `python-docx` | `pandoc` / `mammoth` | `docling`, `markitdown`, `python-docx`, `mammoth` |
| **Legacy Word** | `.doc` | `pandoc` / LibreOffice CLI | `antiword` / `catdoc` | `pandoc`, `soffice` (LibreOffice) |
| **Microsoft Excel** | `.xlsx` | `docling` / `openpyxl` | `pandas` | `docling`, `markitdown`, `openpyxl`, `pandas` |
| **Legacy Excel** | `.xls` | `markitdown` / `pandas` / `xlrd` | LibreOffice CLI | `markitdown`, `pandas`, `xlrd` |
| **LibreOffice Writer** | `.odt` | `pandoc` | `odfpy` / `soffice` CLI | `pandoc`, `odfpy`, `soffice` |
| **LibreOffice Calc** | `.ods` | `pandas` (`odf` engine) | `soffice` CLI | `pandas`, `odfpy` |
| **Rich Text** | `.rtf` | `pandoc` / `striprtf` | `soffice` CLI | `pandoc`, `striprtf` |
| **Web Pages / E-books** | `.html`, `.htm`, `.epub` | `docling` / `markitdown` | `pandoc` / `ebooklib` | `docling`, `markitdown`, `pandoc`, `ebooklib` |

### 🧠 SOTA AI Engines & PDF Utilities Matrix

For high-complexity RPG book layouts (multi-column text flow, medieval borders, statblocks, spell tables, background watermarks), the skill supports and orchestrates specialized state-of-the-art tools:

1. **[Docling](https://github.com/docling-project/docling) (DS4SD / IBM):**
   - *Core specialty:* SOTA multimodal layout analysis and table reconstruction via `TableFormer`. Parses multi-column RPG text flow without mixing column lines.
   - *Install:* `pip install docling`
2. **[Marker](https://github.com/datalab-to/marker) (Datalab):**
   - *Core specialty:* Ultra-fast PDF-to-Markdown extraction with native formula support, table parsing, header level detection and artifact cleaning.
   - *Install:* `pip install marker-pdf`
3. **[Unstructured](https://github.com/Unstructured-IO/unstructured):**
   - *Core specialty:* Granular layout chunking preserving metadata (titles, tables, sidebars, narratives) for phased batch translation.
   - *Install:* `pip install unstructured`
4. **[Nougat](https://github.com/facebookresearch/nougat) (Meta AI):**
   - *Core specialty:* Visual-to-text neural OCR for scanned vintage RPG books, gothic fonts, formulas and damaged documents without traditional character segmentation.
   - *Install:* `pip install nougat-ocr`
5. **[Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF):**
   - *Core specialty:* Swiss-army knife for PDF pre-processing: OCR, page split/merge, image extraction at native DPI, PDF repair, flattening and page re-ordering.
   - *Usage:* Docker (`docker run -d -p 8080:8080 frooodle/s-pdf:latest`) or Stirling-PDF Desktop.
6. **[Nano-PDF](https://github.com/gavrielc/Nano-PDF):**
   - *Core specialty:* Natural language visual PDF editing using Poppler rendering and vision models to modify pages without destroying underlying artwork.
7. **[PDFtoGPT](https://github.com/ferrarimarlon/PDFtoGPT) & [AI-powered-PDF-agent](https://github.com/pyr0mind/AI-powered-PDF-agent-project):**
   - *Core specialty:* Anti-hallucination RAG auditing to cross-reference translated mechanical values (dice, AC, bonuses) against the source book.

### 🛠️ Tool Installation Protocol (Install Any Tool Needed)

Whenever a required tool is missing, the AI agent MUST follow this protocol:

1. **Diagnose** the missing dependency (Python package or system binary) and self-correct iteratively.
2. **Permission Gate:** if the fix requires installing system binaries (`tesseract`, `pandoc`, `libreoffice`, `poppler`), global packages or API keys, the agent MUST explain the situation clearly and request explicit operator authorization before proceeding.
3. **Report & Verify:** after approval, state exactly what was installed/configured and immediately run an end-to-end test or ask the operator for sample inputs.

**Recommended installation commands:**

```bash
# Python dependencies (all reading engines)
pip install markitdown markitdown-ocr pdfminer.six pdfplumber pypdf pypdfium2 Pillow pytesseract \
            python-docx mammoth openpyxl pandas xlrd odfpy ebooklib beautifulsoup4 html2text striprtf

# Optional but recommended system binaries
# Tesseract OCR:      winget install UB-Mannheim.TesseractOCR | choco install tesseract
#                     brew install tesseract | sudo apt-get install tesseract-ocr
# Pandoc:              winget install JohnMacFarlane.Pandoc | choco install pandoc
#                     brew install pandoc | sudo apt-get install pandoc
# LibreOffice:         winget install TheDocumentFoundation.LibreOffice | choco install libreoffice
#                     brew install libreoffice | sudo apt-get install libreoffice
# Poppler (PDF):       brew install poppler | sudo apt-get install poppler-utils
```

3. **OCR language packs:** install Tesseract language packs for the source language(s), e.g. `eng`, `por`, `deu`, `fra` (or instruct the operator to install them).

### 🧪 Protocolo de Testes e Amostragem: Lotes Padrão de 5 Páginas

> 📌 **REGRA DE OURO PARA TESTES DE DIAGRAMAÇÃO E TRADUÇÃO:**  
> Em qualquer rodada de teste, validação tipográfica, amostragem visual ou prototipagem de novos livros e cenários:
> 1. **Tamanho do Lote de Teste:** O lote de teste deve conter rigorosamente **5 páginas** (`--max-pages 5`).
> 2. **Validação Lado a Lado Obrigatória:** Todo teste de 5 páginas deve gerar um **comparativo lado a lado** (Original em Inglês à esquerda vs Traduzido em Português à direita) das páginas mais densas ou com cabeçalhos complexos.
> 3. **Fidelidade Total de Tipografia:** Preservar a grade de entrelinhas (*leading* exato em pt) e as fontes originais embutidas extraídas do PDF (ex: `PopulationZeroBB`, `Palatino Linotype`).
> 4. **Aprovação em Fases:** Somente após o usuário validar e aprovar o lote de 5 páginas é que a diagramação do lote estendido ou do livro completo é iniciada.

### 📤 Delivery Artifacts & Naming Convention

| Artifact | Format | Purpose |
|---|---|---|
| **Original source** | `.pdf` | Absolute layout reference (never modified). |
| **Extraction** | `.txt` / `.md` / `.docx` | Raw text organized by physical page. |
| **Translation** | `.txt` / `.md` / `.docx` | Brazilian Portuguese translation (small batches). |
| **Diagramation** | `.txt` / `.md` / `.pdf` | Delivered outputs: texts, Markdown and diagramed PDF. |

Suggested naming pattern: `<book>_<version>_<status>.txt`, `<book>_<version>_traduzido.txt`, `<book>_<version>_diagramado.md`, `<book>_<version>_diagramado.pdf`.

### 🎯 Mandatory Pre-Execution Protocol: Code Mode, Grill-Me, Karpathy, AI Hero & Humanizer Plus

> 🚨 **UNBREAKABLE GOLDEN RULE & AI-DE-WATERMARKING:**  
> RPG book diagramming, translation, and formatting must **NEVER** be performed in a single blind step or driven by hasty assumptions.  
> The agent MUST operate **strictly in stages**, always using **Code Mode**, and sanitize all generated texts, Markdown, TXT, and JSONL chunks using the companion **`humanizer-plus`** skill (`humanizer-plus/scripts/sanitize.js`) to permanently purge robotic AI habits, ZWSP/BOM watermarks, and LLM slop.

> 🚨 **UNBREAKABLE GOLDEN RULE:**  
> RPG book diagramming, translation, and formatting must **NEVER** be performed in a single blind step or driven by hasty assumptions.  
> The agent MUST operate **strictly in stages**, always using **Code Mode** (code tools, programmatic inspection, deterministic scripts, and direct file manipulation), and rigorously follow the **ndrej-karpathy-skills** protocol combined with an interrogation interview via **grill-me** and code review via **skills-code-review** before making or finalizing any changes.

#### 1. Mandatory Skills Installation & Global/Local Availability
Every task must ensure that the companion skill trinity is installed and accessible both **globally** (~/.gemini/config/skills/, ~/.claude/skills/) and in the **user's local project** (.agents/skills/, .claude/skills/):
- **ndrej-karpathy-skills** (https://github.com/multica-ai/andrej-karpathy-skills): Pragmatic engineering discipline against hallucinations, scope creep, and over-engineering.
- **grill-me** (https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me): Structured alignment interrogation to drill down into project requirements and eliminate ambiguities.
- **skills-code-review** (https://www.aihero.dev/skills-code-review): Automated code review, quality gating, and rigorous pre-delivery validation.

`ash
# Add companion skills to local project / global environment:
npx skills@latest add multica-ai/andrej-karpathy-skills
npx skills@latest add mattpocock/skills --skill=grill-me
npx skills@latest add aihero-dev/skills-code-review
`

#### 2. The 4 Karpathy Principles for Book Formatting
1. **Don't Assume. Don't Hide Confusion:** Ask upfront instead of guessing margins, fonts, or ambiguous terms.
2. **Keep it Simple (Minimum Code):** Use clean, concise, deterministic scripts.
3. **Make Surgical Changes:** Only modify what is strictly required, preserving surrounding page assets.
4. **Define and Verify Goals:** Define clear criteria (e.g., page count, DPI, text flow) and verify at each stage.

#### 3. Structured Author Interview via `grill-me`
Before executing extractions or generating output documents, grill the user/author:
- System and edition specifics (e.g., D&D 3.5 vs 5e, PF2e, WoD V20, SWADE).
- Validation batch size (mandatory initial sample: 5–10 pages).
- Terminology exceptions and proper names policies.
- Availability of original fonts.

#### 4. Step-by-Step Code Mode Execution
Always execute via scripted tools (Python, PyMuPDF, ReportLab, fpdf2, MarkItDown) following the phased workflow.

---

### 📜 Professional RPG Book Translator & Layout Rules

> **Operational Profile:** You are a **professional translator and book diagrammer specializing in tabletop RPG books**, with deep practical knowledge of systems such as *D&D 3.5 / 4e / 5e, Pathfinder 1e / 2e, Shadowrun, World of Darkness / Storyteller, Savage Worlds, Year Zero Engine*, and others.  
> **Mission:** Completely translate and diagram pages from English to Brazilian Portuguese, strictly adhering to the following rules:

1. **Translation Fidelity:** Translate every single piece of text. Never summarize, adapt, simplify, omit, or invent text. Keep rules, mechanics, requirements, and effects 100% intact. Use official Brazilian Portuguese terms consistently.
2. **Preserve Original Page Visuals:** Use the original page itself as the base canvas. Do not create a blank page from scratch. Keep all art, borders, ornaments, page numbers, and tables visually intact. Replace only the English text blocks in their exact positions and hierarchy.
3. **Strict Rules & Mechanics Protection:** Never alter numerical values, dice formulas (`1d8` stays `1d8`), bonuses (`+2` stays `+2`), action economy, DC/saving throws, or conditions.
4. **Pre-Delivery Quality Control:** Compare side-by-side with the original; ensure no paragraph is missing, verify formulas and numbers, check layer bounds to prevent text from overlapping illustrations, and flag any unreadable snippet instead of guessing.
5. **Delivery Standard:** Deliver the translated page preserving dimensions, resolution, and visual integrity, resulting in a technically accurate and visually faithful RPG book page.

---

### 🔄 Book Diagramming Workflow (Mandatory 8 Phases)

The workflow follows the **Analyze → Extract → Translate → Review → Diagram → Audit** pipeline. Never skip stages.

#### Phase 1 — ANALYZE THE ORIGINAL PDF WITH AI & GENERATE TYPOGRAPHY REPORT
> 🔬 **MANDATORY AUTOMATED TYPOGRAPHY & LAYOUT AUDIT:**  
> The agent MUST run `scripts/inspect_typography.py` to extract every embedded font (`.cff`/`.ttf`), exact point sizes, hex colors, page dimensions, and double-stroke outlines before diagramming. It outputs a comprehensive Markdown report (`relatorio-tipografia-<book>.md`) to ensure 100% faithful replication of headers, body fonts, and margins.
> ```bash
> python scripts/inspect_typography.py "path/to/source_book.pdf"
> ```

**Command to be used with the AI (paid version with file access, e.g., ChatGPT WORK / Claude / Gemini paid):**
> "Analyze fully this PDF before making any alteration. Identify the number of pages, paper size, margins, amount and width of columns, spacing, paragraph indents, text alignments, footers, headers, images, ornaments, borders and fonts used. Identify font sizes for body, titles and subtitles. Verify which excerpts use bold, italic or other typographic variations. Present a technical report so the Portuguese diagramming can reproduce the original layout. The AI can inspect internal PDF properties and analyze visually. Depending on the file, it is possible to identify the exact fonts used."

**Agent mandate:** The AI MUST present the technical report before any diagramming begins.

#### Phase 2 — DISCOVER AND UTILIZE THE CORRECT FONTS
**Command:**
> "Identify all fonts used in the PDF, including names, sizes and variations. Verify whether they are embedded in the file and whether they can be used directly in the diagramming. If any font is unavailable, inform its name and seek a typographically compatible alternative. Do not substitute fonts without first consulting me. If the font is not available, you may provide it directly in chat. Just look it up on the internet by the name it gave you — usually fonts are found on free sites. You may also request creation of original-like characters or a custom typographic solution when the tool allows. Do not assume the AI can automatically recreate an identical functional font."

#### Phase 3 — EXTRACT TEXT BEFORE TRANSLATING
**Command:**
> "Extract all text from the original PDF, respecting the correct reading order of columns, paragraphs, titles, lists, tables and character sheets. Do not summarize, omit or invent words. When finding texts embedded in images, gothic fonts or excerpts that cannot be extracted automatically, examine the page visually and transcribe the content. Organize the result by physical page of the original and generate an editable DOCX."

#### Phase 4 — TEACH THE AI THE RPG VOCABULARY
**Command:**
> "Study the official terminology used in the Brazilian RPG editions you have. Identify the established translations for clans, Disciplines, Attributes, Abilities, Backgrounds, Virtues, rules, powers and other concepts. Build a bilingual glossary and use those terms consistently during the whole translation. When there is divergence between Brazilian editions, present the alternatives for my decision. Do not translate proper names or specific terms arbitrarily. Note: providing reference books does not mean the AI will memorize everything perfectly. Ask it to consult the glossary at each new batch."

#### Phase 5 — TRANSLATE IN SMALL BATCHES
**Command:**
> "Translate fully the physical pages X to Y of the original PDF to Brazilian Portuguese. Preserve all content, including titles, subtitles, quotes, dialogues, character sheets, notes, tables and rules. Do not make summaries or free adaptations. The translation should be natural in Portuguese but faithful to the original. Preserve paragraph organization and do not create artificial breaks. Use the RPG glossary previously established. When finished, generate a DOCX with the translation and check whether there is any omission. When all batches are finished, ask to merge them into a single document."

#### Phase 6 — VERIFY TRANSLATION BEFORE DIAGRAMMING
**Command:**
> "Compare the translated DOCX with the original PDF, page by page and paragraph by paragraph. Identify missing, duplicated, mis-translated or out-of-sequence excerpts. Pay special attention to character sheets, numeric values, rules and paragraph continuity between pages and columns. Correct the identified problems without altering approved text. Present a report indicating what was checked, what was corrected and what still needs human review."

#### Phase 7 — NOW START DIAGRAMMING!
**Command:**
> "Use the original PDF as the absolute layout reference and the translated DOCX as the source of the translated content. Reproduce the paper size, margins, columns, spacing, fonts, indents, alignments, titles, subtitles, footers, images, borders and ornaments of the original. Preserve the total page count of the book. The text should flow naturally inside the columns, respecting the paragraph structure. Do not stretch or compress fonts to force fit. Do not overlay new texts on old ones nor rasterize pages. Preserve all original images and make the text flow around them in the same locations. When fitting difficulty is caused by language length differences, adjust the typographic composition carefully without suppressing content. Work in small batches and generate a PDF for my approval before continuing. The ideal is to start with five to ten test pages. Once the result is good, approve the pattern and ask to apply it to the remaining pages."

#### Phase 8 — DEMAND A FINAL AUDIT
**Final audit command:**
> "Compare visually and structurally each Portuguese page with its original counterpart. Check whether: all text was preserved; paragraphs are correctly separated and aligned; fonts and sizes are adequate; titles occupy the corresponding positions; columns have the correct flow; there are no overlapping or cut texts; no image or ornament disappeared; footers and page numbers are correct; the page count matches. Correct problems before delivering."

### 📝 RPG Form Creation & Fillable PDF Forms (New Capability)

**Book Formatter** can now also **create RPG forms and character sheets as fillable PDFs** when the operator requests it (e.g., character sheets for *Savage Worlds*, *Vampire: The Masquerade*, *D&D*, *Year Zero*, etc.).

**Trigger:** Whenever the user asks to create, design, or generate RPG character sheets / forms as editable fillable PDFs.

**Fillable PDF toolchain:**
- Python libraries: `fpdf2`, `reportlab` or `pdfcpu` for programmatic generation of fillable PDFs with form fields; `pypdf` / `pdfplumber` for inspecting existing fields.
- Alternative: LibreOffice / Microsoft Word (via UNO / COM / mail merge) or any PDF editor supporting AcroForm fields.

**Creation workflow:**
1. Receive the sheet blueprint (fields: attributes, skills, health, resources, etc.).
2. Generate the fillable PDF with appropriate field types (text, numbers, checkboxes).
3. Deliver the fillable PDF (`.pdf`) and, optionally, a flattened version.

**Deliverables:** fillable PDF (`.pdf`) with form fields (editable).

### ⚠️ Important Tips (from the original methodology)

- **Use an AI that can work directly with files** and produce DOCX and PDF. A paid subscription alone does not guarantee these functions.
- **Always save** the original PDF, the translated DOCX and the approved versions.
- **Ask for audit reports**, not only answers saying that everything is fine.
- **Never accept** a document as complete just because it has the same number of pages. Always ask for a final audit (“do a final audit of this file to check if it is equal to the original”).
- **Do visual conferences**, especially on two-column pages, images and character sheets. Open produced files and inspect whether there is no text overlapping images, especially when the original page had skewed text (“texto torto”) or text written sideways.
- Translation and diagramming for study or personal use generally helps the AI understand that it may do the requested task.
- Ultimately it is possible to use AI to perform good translation and diagramming of old RPG books, including complex layouts. But the result depends on file quality, available tools and, mainly, the ability to guide and check the work.
- **The biggest error is asking for everything at once.** The best result comes from: analyze, extract, translate, review, diagram and audit — in that order.

### 📖 RPG & Gamers Glossary

The skill ships with a **glossary of RPG and gamer terms** (`glossarys/glossary.md`) assembled from community sources (DarkAgerPG, Oscavaleiros e Sonses, OrcnRoll, MesaQuest, Wikipedia, GameBlast, WikiRPG, Reddit, CentralRP, GamingRoom, DungeonGeek21, Blogskylab, CNA, Medium, Kabum, etc.).

Consult it during **Phase 4 (RPG vocabulary teaching)** to keep translations consistent (e.g., *Embrace, Sire, Celerity, Potence, Blood Pool* in *Vampire: The Masquerade*).

> **Domain Dictionaries:** The skill also ships with [`glossarys/glossary-scifi.md`](glossarys/glossary-scifi.md) (Science Fiction, Cyberpunk, Space Opera, Military Sci-Fi, Science Fantasy and Psionics), [`glossarys/glossary-horror.md`](glossarys/glossary-horror.md) (Cosmic Horror, Lovecraftian Mythos, Survival Horror and Gothic Horror), [`glossarys/glossary-savage-worlds.md`](glossarys/glossary-savage-worlds.md) / [`glossarys/glossary-year-zero.md`](glossarys/glossary-year-zero.md) (Savage Worlds Adventure Edition and Year Zero Engine), [`glossarys/glossary-world-of-darkness.md`](glossarys/glossary-world-of-darkness.md) (World of Darkness — all franchises) and [`glossarys/glossary-pathfinder-2e.md`](glossarys/glossary-pathfinder-2e.md) (Pathfinder 2nd Edition / PF2e).

> **Upcoming:** other dictionaries for the skill will be created soon (generic horror, specific RPG systems, etc.).

### 📖 Continuous Learning & Automatic RPG Glossary Generation
Whenever processing an RPG system book (e.g., Tormenta20, D&D 5e, Call of Cthulhu, Cyberpunk RED, GURPS):
1. **Compile Mechanics:** Extract core terms (Attributes, Skills, Feats, Spells, Classes, Conditions, Combat Rules, Setting Lingo).
2. **Save to Memory & Disk:** Save the bilingual glossary under [`glossarys/glossary-<system>.md`](glossarys/) and keep it in working memory.
3. **Mandatory Communication & Submission via GitHub Issue:** Notify the user that the glossary was generated and formally submit it via GitHub Issue (`gh issue create --repo CharlesCorreaDev/skills-ai`) so the developer can review and include it in the next official skill version.

---

### 🧠 Rules Segmentation for AI, RAG & MCP Servers (New Capability)
The skill can split RPG rulebooks into atomic, machine-readable datasets for:
- **Vector Databases & RAG:** ChromaDB, Pinecone, FAISS, Qdrant.
- **MCP Servers (Model Context Protocol):** Serving segmented RPG rules on-demand without context window exhaustion.
- **Fine-Tuning:** Instruction/response datasets in JSONL format.

**Script:** [`scripts/export_rules_for_ai.py`](scripts/export_rules_for_ai.py)
```bash
python scripts/export_rules_for_ai.py "path/to/rulebook.md" "output_rag_dir" "system_name"
```
**Outputs:** `<system>_rag_chunks.jsonl`, `<system>_training_dataset.jsonl`, `categories/<rule_category>.md`, and `manifest_ai.json`.

---

### 🔄 Version Monitoring & Automatic Skill & Dependency Updates
The skill monitors its local version ([`VERSION`](VERSION)) against the latest release published on GitHub, and keeps all Python packages updated:
- **Skill Version Monitor:** [`scripts/check_update.py`](scripts/check_update.py)
  - Checks remote version at `https://raw.githubusercontent.com/CharlesCorreaDev/skills-ai/main/book-formatter/VERSION`.
  - Alerts user and supports `--upgrade` to pull updates via Git.
- **Dependency Upgrades:** [`scripts/check_env.py`](scripts/check_env.py)
  - Run `python scripts/check_env.py --upgrade` to ensure SOTA AI and PDF libraries (`docling`, `marker-pdf`, `pypdf`, `pdfplumber`, `markitdown`) are at the latest stable version.

---

### 🛡️ Mandatory Protocols

- **Semantic Versioning:** read [`VERSION`](VERSION); bump on changes; register in [`CHANGELOG.md`](CHANGELOG.md); tag releases as `book-formatter-v<version>`.
- **Autonomous Error Recovery & Permission Protocol:** self-diagnose failures; request permission for system binaries; report & verify after approval.

### 🚨 Proactive Developer Feedback & Autonomous GitHub Issue Protocol

Whenever the AI agent detects a bug, missing tool, absent script or improvement opportunity:

1. **Communicate** the situation to the user.
2. **Generate a bilingual report** (English + Portuguese).
3. **Submit a GitHub issue** via CLI:

```bash
gh issue create --repo CharlesCorreaDev/skills-ai --title "[book-formatter] <Issue Title>" --body "<Bilingual text in English and Portuguese>"
```

---

## 🇧🇷 Português (Brasil)

### 📌 Visão Geral & Modelo Mental

A skill **Book Formatter** (Diagramador de Livros) é uma suíte multiplataforma (Windows, Linux, macOS) para **formatação de livros e diagramação de livros de RPG** para Agentes de IA.

Sua missão é instalar todas as ferramentas necessárias para ler documentos (PDF com ou sem OCR, texto puro, Word, planilhas e outros formatos) e orquestrar a transformação completa de um livro-fonte em artefatos entregáveis:

1. **`.txt`** — arquivo entregável com os textos (extração + tradução).
2. **`.md`** — versão Markdown dos textos.
3. **`.pdf`** — PDF devidamente diagramado/formatado, fiel ao original.

O caso de uso principal é **livros de RPG** (especialmente materiais antigos do **Mundo das Trevas**, como *Vampiro: A Idade das Trevas*), onde o objetivo final é uma tradução em português com a diagramação do original o mais fiel possível: mesmos imagens, colunas, fontes, títulos, recuos, parágrafos e número de páginas.

> **Ponto crítico:** não existe comando mágico que faça tudo perfeitamente. O segredo é dividir o trabalho em etapas e exigir verificações.

### 📚 Matriz de Formatos Suportados & Motores de Extração

| Formato | Extensões | Motor Principal | Mecanismo de Fallback | Pacotes Python / Ferramentas |
|---|---|---|---|---|
| **PDF (Digital)** | `.pdf` | `docling` / `markitdown` | `marker-pdf`, `pdfminer.six`, `pdfplumber` | `docling`, `marker-pdf`, `markitdown`, `pdfminer.six`, `pdfplumber`, `pypdf`, `pypdfium2` |
| **PDF (Escaneado / Layout Complexo)** | `.pdf` | `docling` / `nougat` | `marker-pdf`, `markitdown_ocr` | `docling`, `nougat-ocr`, `marker-pdf`, `unstructured`, `tesseract-ocr`, `Pillow`, `pypdfium2` |
| **PDF (Manipulação & Limpeza)** | `.pdf` | `stirling-pdf` / `pypdf` | `pdfcpu` / `pdftoppm` | `stirling-pdf`, `pypdf`, `pdfplumber`, `poppler-utils` |
| **Texto Puro** | `.txt` | nativo / `markitdown` | - | - |
| **Markdown** | `.md` | `marker-pdf` / `docling` | `markitdown` | `marker-pdf`, `docling`, `markitdown` |
| **CSV / TSV** | `.csv`, `.tsv` | `markitdown` / `pandas` | - | `markitdown`, `pandas` |
| **Microsoft Word** | `.docx` | `docling` / `python-docx` | `pandoc` / `mammoth` | `docling`, `markitdown`, `python-docx`, `mammoth` |
| **Word Legado** | `.doc` | `pandoc` / LibreOffice CLI | `antiword` / `catdoc` | `pandoc`, `soffice` |
| **Microsoft Excel** | `.xlsx` | `docling` / `openpyxl` | `pandas` | `docling`, `markitdown`, `openpyxl`, `pandas` |
| **Excel Legado** | `.xls` | `markitdown` / `pandas` / `xlrd` | LibreOffice CLI | `markitdown`, `pandas`, `xlrd` |
| **LibreOffice** | `.odt`, `.ods` | `pandoc` | `odfpy` / `soffice` | `pandoc`, `odfpy`, `soffice` |
| **Texto Rico** | `.rtf` | `pandoc` / `striprtf` | `soffice` CLI | `pandoc`, `striprtf` |
| **Web / E-books** | `.html`, `.htm`, `.epub` | `docling` / `markitdown` | `pandoc` / `ebooklib` | `docling`, `markitdown`, `pandoc`, `ebooklib` |

### 🧠 Motores de IA SOTA & Utilitários Especialistas para RPG

Para layouts de livros de RPG de alta complexidade (fluxo de texto em duas/três colunas, molduras góticas, statblocks de monstros, tabelas de magias, caixas laterais e ilustrações vazadas), a skill incorpora e orquestra ferramentas de ponta:

1. **[Docling](https://github.com/docling-project/docling) (DS4SD / IBM):**
   - *Especialidade:* Líder mundial em análise multimodal de layout e reconstrução de tabelas com `TableFormer`. Entende a ordem natural de leitura em colunas sem misturar o texto.
   - *Instalação:* `pip install docling`
2. **[Marker](https://github.com/datalab-to/marker) (Datalab):**
   - *Especialidade:* Conversão de altíssima fidelidade de PDF para Markdown, preservando fórmulas, blocos de títulos, tabelas e removendo ruídos de cabeçalhos/rodapés.
   - *Instalação:* `pip install marker-pdf`
3. **[Unstructured](https://github.com/Unstructured-IO/unstructured):**
   - *Especialidade:* Particionamento granular de documentos preservando metadados de estrutura para a tradução cirúrgica em lotes (Fase 5).
   - *Instalação:* `pip install unstructured`
4. **[Nougat](https://github.com/facebookresearch/nougat) (Meta AI):**
   - *Especialidade:* Leitura visual-to-text neural para livros de RPG escaneados antigos, fontes góticas ou trechos danificados sem depender de segmentação OCR tradicional.
   - *Instalação:* `pip install nougat-ocr`
5. **[Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF):**
   - *Especialidade:* O canivete suíço definitivo de PDF (local/Docker/desktop): OCR, divisão por capítulos, mesclagem, extração de artes em resolução nativa e reparo de PDFs corrompidos.
   - *Uso:* Docker (`docker run -d -p 8080:8080 frooodle/s-pdf:latest`) ou Stirling-PDF Desktop.
6. **[Nano-PDF](https://github.com/gavrielc/Nano-PDF):**
   - *Especialidade:* Edição cirúrgica de PDFs via linguagem natural, combinando visão computacional (Poppler/Gemini) e preservação visual de elementos gráficos.
7. **[PDFtoGPT](https://github.com/ferrarimarlon/PDFtoGPT) & [AI-powered-PDF-agent](https://github.com/pyr0mind/AI-powered-PDF-agent-project):**
   - *Especialidade:* Auditoria RAG anti-alucinação comparando parágrafo a parágrafo o texto original e o traduzido para blindar mecânicas de RPG (dados, bônus, CDs, salvamentos).

### 🛠️ Protocolo de Instalação de Ferramentas (Instalar Qualquer Ferramenta Necessária)

Sempre que uma ferramenta faltar, o Agente de IA DEVE:

1. **Diagnosticar** a dependência ausente (pacote Python ou binário de sistema) e se auto-corrigir iterativamente.
2. **Portão de Permissão:** se a correção exigir binários de sistema (`tesseract`, `pandoc`, `libreoffice`, `poppler`), instalar pacotes globais ou configurar chaves de API, o agente DEVE explicar a situação e solicitar autorização explícita do operador.
3. **Relatório & Validação:** após aprovação, informar o que foi instalado/configurado e executar imediatamente um teste de ponta a ponta.

**Comandos recomendados:**

```bash
pip install markitdown markitdown-ocr pdfminer.six pdfplumber pypdf pypdfium2 Pillow pytesseract \
            python-docx mammoth openpyxl pandas xlrd odfpy ebooklib beautifulsoup4 html2text striprtf

# Binários de sistema (exemplos):
# Tesseract OCR: winget install UB-Mannheim.TesseractOCR | choco install tesseract
# Pandoc:        winget install JohnMacFarlane.Pandoc | choco install pandoc
# LibreOffice:   winget install TheDocumentFoundation.LibreOffice | choco install libreoffice
# Poppler:       sudo apt-get install poppler-utils | brew install poppler
```

### 📤 Artefatos de Entrega & Convenção de Nomenclatura

| Artefato | Formato | Finalidade |
|---|---|---|
| **Original** | `.pdf` | Referência absoluta de diagramação (nunca modificado). |
| **Extração** | `.txt` / `.md` / `.docx` | Texto organizado por página física. |
| **Tradução** | `.txt` / `.md` / `.docx` | Tradução para o português brasileiro (lotes pequenos). |
| **Diagramação** | `.txt` / `.md` / `.pdf` | Entregas: textos, Markdown e PDF diagramado. |

Convenção sugerida: `<livro>_<versao>_<status>.txt`, `<livro>_<versao>_traduzido.txt`, `<livro>_<versao>_diagramado.md`, `<livro>_<versao>_diagramado.pdf`.

### 🎯 Protocolo Obrigatório Pré-Execução: Code Mode, Grill-Me, Karpathy, AI Hero & Humanizer Plus

> 🚨 **REGRA DE OURO INVIOLÁVEL & DESMARCAÇÃO DE IA:**  
> A diagramação, tradução e formatação de livros de RPG **NUNCA** devem ser executadas em um único passo cego ou com suposições precipitadas.  
> O agente DEVE operar **obrigatoriamente por etapas** em **Code Mode**, e higienizar todo o texto extraído, Markdown, TXT e datasets JSONL através da skill integrada **`humanizer-plus`** (`humanizer-plus/scripts/sanitize.js`) para expurgar vícios narrativos de IA, caracteres Unicode invisíveis (ZWSP, BOM), citações artificiais e slop robótico de LLMs.

> 🚨 **REGRA DE OURO INVIOLÁVEL:**  
> A diagramação, tradução e formatação de livros de RPG **NUNCA** devem ser executadas em um único passo cego ou com suposições precipitadas.  
> O agente DEVE operar **obrigatoriamente por etapas**, usando sempre o **Code Mode** (ferramentas de código, inspeção programática, scripts determinísticos e manipulação direta de arquivos), e seguir rigorosamente antes de qualquer alteração o protocolo de **ndrej-karpathy-skills** combinado com **grill-me** e validação contínua via **skills-code-review**.

#### 1. Instalação Obrigatória das Skills e Disponibilidade Global / Local
Antes de iniciar qualquer trabalho, o agente deve garantir a presença das skills essenciais disponíveis **globalmente** (~/.gemini/config/skills/, ~/.claude/skills/) e no **projeto do usuário** (.agents/skills/, .claude/skills/):
- **ndrej-karpathy-skills** (https://github.com/multica-ai/andrej-karpathy-skills): Princípios rígidos de engenharia de software, código mínimo e ausência de suposições cegas.
- **grill-me** (https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me): Interrogação estruturada para alinhar requisitos, limites, escopo e escolhas antes de executar.
- **skills-code-review** (https://www.aihero.dev/skills-code-review): Revisão automatizada de código e validação rigorosa pré-entrega.

`ash
# Como instalar ou integrar no ambiente do agente (ex.: Claude Code / Antigravity / Cursor):
npx skills@latest add multica-ai/andrej-karpathy-skills
npx skills@latest add mattpocock/skills --skill=grill-me
npx skills@latest add aihero-dev/skills-code-review
`

#### 2. Protocolo Andrej Karpathy (4 Princípios Operacionais)
Ao planejar e implementar qualquer código, script ou ajuste de diagramação:
1. **Don't Assume. Don't Hide Confusion (Não Assuma, Não Esconda Dúvidas):** Nunca adivinhe diagramação, parâmetros de corte, margens, fontes ausentes ou termos ambíguos. Traga as dúvidas à tona abertamente.
2. **Keep it Simple / Minimum Code (Mantenha Simples / Menor Código Possível):** Use a solução mais direta e limpa para extrair, converter ou montar o PDF/DOCX. Evite arquiteturas convolutas ou over-engineering.
3. **Make Surgical Changes (Mudanças Cirúrgicas):** Altere apenas os blocos e linhas estritamente necessários. Preserve a integridade de todo o restante do layout original.
4. **Define and Verify Goals (Defina Metas Claras e Verifique):** Cada etapa só é concluída após conferência e auditoria de critérios mensuráveis (número de páginas, fluxo de colunas, integridade visual).

#### 3. Entrevista e Interrogação Obrigatória com `grill-me`
Antes de qualquer mudança no repositório, extração em massa ou geração de diagramação:
- O agente deve assumir a postura do **`grill-me`**: entrevistar o usuário/autor com perguntas afiadas sobre o escopo e regras:
  - *"Qual é o sistema exato de RPG e edição (D&D 3.5, PF2e, WoD V20, SWADE, etc.)?"*
  - *"Qual o lote inicial de páginas para validação (recomendado: 5 a 10 páginas)?"*
  - *"Quais diretrizes específicas para nomes próprios, termos de cenário ou magias que o autor deseja manter em inglês ou traduzir?"*
  - *"As fontes originais foram identificadas ou devem ser mapeadas previamente?"*
- **Objetivo:** Travar todas as decisões de design, layout e terminologia **antes** de gastar processamento ou gerar arquivos com defeito.

#### 4. Execução Estritamente em Code Mode e por Etapas
- **Code Mode Permanente:** Toda extração de coordenadas de caixas de texto, inspeção de fontes, medição de DPI e montagem tipográfica deve ser feita via scripts de código (Python/PyMuPDF/ReportLab/fpdf2/pdfplumber/MarkItDown), nunca por 'achismo' visual aproximado.
- **Progressão por Etapas Obrigatória:**
  1. *Fase 0: Grill-Me & Karpathy Alignment* (Entrevista de alinhamento com o autor).
  2. *Fase 1: Análise técnica do PDF original (dimensões, grid, colunas, fontes).*
  3. *Fase 2: Identificação e resolução de fontes.*
  4. *Fase 3: Extração cirúrgica de textos e tabelas.*
  5. *Fase 4: Fixação do vocabulário oficial e glossários.*
  6. *Fase 5: Tradução integral em pequenos lotes (10-20 páginas).*
  7. *Fase 6: Verificação e reconciliação DOCX vs Original.*
  8. *Fase 7: Diagramação em Code Mode sobre a página base (amostra de 5-10 páginas primeiro).*
  9. *Fase 8: Auditoria final visual e estrutural.*

---

### 📜 Diretrizes Rigorosas do Tradutor Profissional de Livros de RPG

> **Perfil Operacional:** Você é um **tradutor e diagramador profissional especializado em livros de RPG de mesa**, com profundo domínio prático de sistemas clássicos e modernos (*Dungeons & Dragons 3.5 / 4e / 5e, Pathfinder 1e / 2e, Shadowrun, World of Darkness / Storyteller, Savage Worlds, Year Zero Engine* e outros).  
> **Missão:** Traduzir integralmente e diagramar as páginas do inglês para o português brasileiro, seguindo estritamente as regras de ouro abaixo:

#### 1. Fidelidade Absoluta da Tradução
- **Tradução Integral:** Traduza absolutamente todo o texto presente na página.
- **Sem Omissões:** Não resuma, adapte, simplifique ou omita informações sob hipótese alguma.
- **Mecânicas Intactas:** Preserve integralmente as regras, mecânicas, descrições, requisitos, valores e efeitos.
- **Sem Alucinações:** Não invente informações para preencher trechos ausentes ou ilegíveis.
- **Precisão Técnica:** Respeite o significado técnico de cada termo dentro do sistema de RPG específico.
- **Terminologia Oficial:** Utilize a terminologia oficial consagrada em português brasileiro (consulte sempre os glossários da skill).
- **Consistência Terminológica:** Mantenha a padronização dos termos técnicos rigorosamente ao longo de todas as páginas do livro.

#### 2. Preservação Visual e Estrutural da Página Original (Regra Fundamental)
*Esta é uma das instruções mais críticas de todo o fluxo:*
- **A Própria Página como Base:** Utilize a própria página original como base direta da diagramação.
- **Proibido Recriar do Zero:** Não crie uma página nova em branco do zero nem substitua a página original por uma versão refeita.
- **Elementos Visuais Intactos:** Não altere ilustrações, imagens, texturas de fundo, bordas, molduras, ornamentos, símbolos, números de página ou elementos decorativos.
- **Grid e Layout:** Preserve a disposição original das colunas, caixas de texto (*sidebars*), títulos, subtítulos, parágrafos e tabelas.
- **Substituição Seletiva:** Substitua exclusivamente os textos em inglês pelos respectivos textos traduzidos para português.
- **Alinhamento e Hierarquia:** Posicione os textos traduzidos exatamente nos mesmos espaços ocupados pelos textos originais, respeitando o alinhamento e a hierarquia visual.
- **Estilo Tipográfico Fiel:** Mantenha o estilo tipográfico (família de fontes, pesos, kerning, entrelinha) o mais idêntico possível ao original.

#### 3. Tradução Rígida de Regras e Mecânicas
Atenção minuciosa e proteção matemática aos seguintes elementos:
- Nomes de habilidades, talentos (*feats*), poderes, disciplinas, magias (*spells*) e propriedades.
- Pré-requisitos (*prerequisites*).
- Níveis de conjurador (*caster levels*).
- Custos de criação e recursos (*creation costs*, pontos de magia/sangue/mana).
- Tipos de ação (*standard action, move, swift, reaction, free*).
- Alcance (*range*), duração (*duration*) e área de efeito (*area of effect*).
- Testes de resistência (*saving throws / resistências*).
- Modificadores, bônus e penalidades numéricas.
- Dados de dano e multiplicadores (*damage dice & multipliers*).
- Categorias de armas, armaduras e equipamentos.

> ⚠️ **Inviolabilidade Numérica:** Não altere nenhum valor numérico, fórmula, dado ou condição mecânica.  
> *Exemplo:* `1d8` continua sendo rigorosamente `1d8`. Um bônus de `+2` continua sendo `+2`.

#### 4. Checklist de Controle de Qualidade (Pré-Entrega)
Antes de finalizar e entregar qualquer página:
1. **Conferência de Texto:** Conferir se absolutamente todos os blocos de texto foram traduzidos.
2. **Comparação Direta:** Comparar a tradução lado a lado com a página original.
3. **Checagem de Lacunas:** Verificar se nenhum parágrafo, rodapé ou nota lateral foi omitido.
4. **Auditoria Numérica:** Conferir minunciosamente números, dados, fórmulas, tabelas e requisitos.
5. **Revisão Linguística:** Corrigir desvios gramaticais e adequar termos técnicos ao padrão do RPG.
6. **Integridade de Camadas:** Verificar se o texto traduzido não está sobrepondo imagens, bordas ou ornamentos.
7. **Legibilidade:** Certificar-se de que a página final continua 100% nítida e legível.
8. **Alerta de Ilegibilidade:** Se algum trecho original estiver ilegível ou cortado, **não adivinhe**. Aponte expressamente qual trecho não pôde ser identificado.

#### 5. Formato e Filosofia de Entrega
- Entregue a página traduzida mantendo as dimensões, resolução e proporção exatas da página original.
- Nunca entregue apenas texto solto ou uma página inteiramente recriada em branco desprovida das artes.
- Não remova ou altere o conteúdo visual que não precisa de tradução.
- **REGRA FUNDAMENTAL:** A página original deve permanecer visualmente intacta, com exceção dos textos em inglês, que devem ser substituídos por suas traduções em português brasileiro, obtendo um produto final tecnicamente impecável e indistinguível do material oficial.

---

### 🔄 Fluxo de Diagramação de Livros (Fases Obrigatórias — 8 Fases)

1. **FAÇA A IA ANALISAR O PDF ORIGINAL & GERAR RELATÓRIO DE TIPOGRAFIA (OBRIGATÓRIO)**
   - 🔬 **Auditoria Automatizada de Tipografia e Layout:** O agente DEVE obrigatoriamente executar o script `scripts/inspect_typography.py` para extrair todas as fontes incorporadas (`.cff`/`.ttf`), tamanhos exatos em pontos, códigos de cor hexadecimais, dimensões de página e contornos de títulos com dupla camada antes de diagramar.
   - Gera um relatório técnico estruturado (`relatorio-tipografia-<livro>.md`) para blindar a diagramação contra caixas opacas ou fontes genéricas:
     ```bash
     python scripts/inspect_typography.py "caminho/do/livro_original.pdf"
     ```

   - Analise integralmente o PDF antes de qualquer alteração. Identifique número de páginas, tamanho das folhas, margens, quantidade e largura das colunas, espaçamentos, recuos de parágrafo, alinhamento, rodapés, cabeçalhos, imagens, ornamentos, molduras e fontes.
   - Identifique também o tamanho das fontes do corpo, dos títulos e dos subtítulos. Verifique quais trechos usam negrito, itálico ou outras variações tipográficas.
   - Apresente um relatório técnico para que a diagramação em português possa reproduzir o layout original.

2. **DESCUBRA E UTILIZE AS FONTES CORRETAS**
   - Identifique todas as fontes utilizadas, incluindo nomes, tamanhos e variações.
   - Verifique se estão incorporadas ao arquivo e se podem ser utilizadas na diagramação. Caso alguma esteja indisponível, informe o nome e procure uma alternativa tipograficamente compatível.
   - Não substitua fontes sem antes consultar. Se a fonte não estiver disponível, você poderá fornecê-la diretamente no chat; basta procurar na internet pelo nome que geralmente são encontradas em sites gratuitos.

3. **EXTRAIA O TEXTO ANTES DE TRADUZIR**
   - Extraia todo o texto do PDF original, respeitando a ordem correta de leitura das colunas, parágrafos, títulos, listas, tabelas e fichas de personagem.
   - Não resuma, não omita, não invente palavras. Para textos em imagens, fontes góticas ou trechos não extraíveis, examine visualmente a página e transcreva o conteúdo.
   - Organize o resultado por página física e gere um DOCX editável.

4. **ENSENE A IA SOBRE O VOCABULÁRIO DO RPG**
   - Estude a terminologia oficial utilizada nas edições brasileiras do RPG. Identifique traduções estabelecidas para clãs, Disciplinas, Atributos, Habilidades, Antecedentes, Virtudes, regras, poderes e demais conceitos.
   - Monte um glossário bilíngue e utilize esses termos de maneira consistente durante toda a tradução. Quando houver divergência, apresente as alternativas para a decisão do operador.
   - **Dicionários de domínio:** consulte os dicionários complementares da skill conforme o domínio do livro — `glossarys/glossary-scifi.md` (Ficção Científica/Ciberpunk/Space Opera/Psionics), `glossarys/glossary-horror.md` (Terror/Cthulhu/Cosmic Horror), `glossarys/glossary-savage-worlds.md` e `glossarys/glossary-year-zero.md` (Savage Worlds Adventure Edition / Year Zero Engine), `glossarys/glossary-world-of-darkness.md` (Mundo das Trevas / World of Darkness) e `glossarys/glossary-pathfinder-2e.md` (Pathfinder 2ª Edição / PF2e).

5. **TRADUZA EM PEQUENOS LOTES**
   - Trabalhe com aproximadamente 10 a 20 páginas por vez (ou um capítulo por vez).
   - Use: "Traduza integralmente as páginas físicas X a Y do PDF original para português brasileiro. Preserve todo o conteúdo... Utilize o glossário..."

6. **VERIFIQUE A TRADUÇÃO ANTES DE DIAGRAMAR**
   - Compare o DOCX traduzido com o PDF original, página por página e parágrafo por parágrafo.
   - Identifique trechos faltantes, duplicados, traduzidos incorretamente ou fora de sequência. Corrija sem alterar o texto aprovado.

7. **AGORA SIM, COMECE A DIAGRAMAÇÃO!**
   - Utilize o PDF original como referência absoluta de diagramação e o DOCX português como fonte do conteúdo traduzido.
   - Reproduza tamanho das páginas, margens, colunas, espaçamento, fontes, recuos, alinhamentos, títulos, subtítulos, rodapés, imagens, molduras e ornamentos do original.

8. **EXIJA UMA AUDITORIA FINAL**
   - Compare visual e estruturalmente cada página em português com a equivalente do original. Corrija problemas antes de entregar o PDF.

### 📝 Criação de Formulários e Fichas de RPG (Nova Capacidade)

**Book Formatter** pode agora também **criar formulários e fichas de RPG em PDF preenchíveis** quando solicitado pelo operador (ex.: fichas para *Savage Worlds*, *Vampiro: The Masquerade*, *D&D*, *Year Zero*, etc.).

**Trigger:** Sempre que o usuário pedir para criar, desenhar ou gerar fichas/formulários de RPG como PDFs editáveis preenchíveis.

**Toolchain para geração de PDF preenchível:**
- Bibliotecas Python: `fpdf2`, `reportlab` ou `pdfcpu` para geração programática de PDF preenchível com campos de formulário; `pypdf` / `pdfplumber` para inspecionar campos existentes.
- Alternativa: LibreOffice / Microsoft Word (via UNO / COM / mail merge) ou qualquer editor de PDF que suporte campos AcroForm.

**Fluxo de criação:**
1. Receber o blueprint do formulário (campos: atributos, perícias, HP, recursos, etc.).
2. Gerar o PDF preenchível com os tipos de campo adequados (texto, números, checkboxes).
3. Entregar o PDF preenchível (`.pdf`) e, opcionalmente, uma versão achatada.

**Artefatos de entrega:** PDF preenchível (`.pdf`) com campos de formulário (editáveis).

### 📖 Aprendizado Contínuo & Criação Automática de Glossários de RPG

> 💡 **DIRETRIZ DE ENRIQUECIMENTO AUTOMÁTICO DO SISTEMA:**  
> Sempre que o agente ler e processar um livro de um sistema de RPG (ex.: Tormenta20, D&D 5e, Call of Cthulhu, Cyberpunk RED, GURPS, etc.):
> 1. **Extrair e Compilar o Vocabulário:** Mapear termos mecânicos essenciais (Atributos, Perícias, Feats/Talentos, Magias, Classes, Condições, Regras de Combate e Termos de Cenário).
> 2. **Salvar em Memória e em Disco:** Criar e salvar o glossário bilíngue em arquivo na pasta [`glossarys/`](glossarys/) (ex.: `glossarys/glossary-<sistema>.md`), além de mantê-lo ativo em memória durante a sessão.
> 3. **Comunicação e Envio Obrigatório via GitHub Issue:**  
>    A comunicação da criação do glossário e sua submissão para contribuição **deve ser formalizada via GitHub Issue** no repositório oficial (`CharlesCorreaDev/skills-ai`). O agente deve comunicar o usuário e, mediante confirmação, submeter a issue bilíngue contendo os termos compilados:
>    ```bash
>    gh issue create --repo CharlesCorreaDev/skills-ai --title "[book-formatter] Novo Glossário de RPG: <Sistema>" --body "### 📖 Novo Glossário Extraído - <Sistema>
> 
> Um novo livro do sistema de RPG **<Sistema>** foi processado pelo `book-formatter`. O vocabulário oficial foi compilado e salvo localmente em `glossarys/glossary-<sistema>.md`.
> 
> Solicita-se a incorporação deste glossário na próxima versão oficial da skill para aprimorar a interpretação e padronização da comunidade.
> 
> ---
> 
> ### 📖 New Extracted Glossary - <System>
> A new book for the RPG system **<System>** was processed by `book-formatter`. The official vocabulary has been compiled and saved locally. Requesting integration into the next release."
>    ```

---

### 🧠 Segmentação de Regras para IA, RAG e Servidores MCP (Nova Capacidade)

A skill possui a capacidade de **fragmentar e segmentar o livro processado em arquivos de regras atômicos e especializados**, ideais para:
- **Bancos Vetoriais & RAG:** Ingestão direta em ChromaDB, Pinecone, FAISS, Qdrant e Milvus.
- **Servidores de Contexto MCP (Model Context Protocol):** Disponibilização de regras sob demanda para agentes de IA sem poluir a janela de contexto.
- **Fine-Tuning & Treinamento:** Pares de instrução/resposta estruturados em JSONL para especialização de LLMs no sistema de RPG.

**Script oficial:** [`scripts/export_rules_for_ai.py`](scripts/export_rules_for_ai.py)

**Execução:**
```bash
python scripts/export_rules_for_ai.py "caminho/do/livro_traduzido.md" "saida_rag" "nome_sistema"
```

**Artefatos gerados na pasta de saída:**
1. `<sistema>_rag_chunks.jsonl` — fragmentos com metadados estruturados (título, categoria, contagem de tokens aproximada) prontos para embeddings.
2. `<sistema>_training_dataset.jsonl` — dataset formatado no padrão OpenAI/Claude (system/user/assistant) para fine-tuning.
3. `categories/` — arquivos Markdown isolados por tópicos (`combat.md`, `spells.md`, `classes.md`, `monsters_bestiary.md`, `conditions_hazards.md`, etc.) para uso em ferramentas e recursos MCP.
4. `manifest_ai.json` — manifesto da extração.

---

### 🔄 Monitor de Versão e Atualização Automática da Skill

A skill conta com monitoramento ativo entre a versão local instalada ([`VERSION`](VERSION)) e a versão publicada no repositório remoto oficial, além de manter suas dependências sempre atualizadas:

- **Monitor de Versão da Skill:** [`scripts/check_update.py`](scripts/check_update.py)
  - Verifica atualizações no GitHub (`https://raw.githubusercontent.com/CharlesCorreaDev/skills-ai/main/book-formatter/VERSION`).
  - Alerta o usuário proativamente caso uma nova versão esteja disponível.
  - Atualização automática com:
    ```bash
    python scripts/check_update.py --upgrade
    ```
- **Manutenção e Atualização de Dependências:** [`scripts/check_env.py`](scripts/check_env.py)
  - Sempre que for necessário manter as bibliotecas de leitura, IA e PDF na versão mais recente, o agente executa:
    ```bash
    python scripts/check_env.py --upgrade
    ```
  - Isso garante que pacotes como `docling`, `marker-pdf`, `pypdf`, `pdfplumber`, `markitdown` e ferramentas de OCR estejam sempre com correções e desempenho atualizados.

---

### 🛡️ Protocolos Obrigatórios

- **Versionamento Semântico:** consultar [`VERSION`](VERSION); incrementar conforme [SemVer](https://semver.org/spec/v2.0.0.html); registrar em [`CHANGELOG.md`](CHANGELOG.md); tag `book-formatter-v<versao>`.
- **Auto-Correção e Recuperação de Erros:** diagnosticar causa raiz e tentar auto-correção; portão de permissão para instalações extras; relatório de configuração e validação após aprovação.

### 🚨 Protocolo de Feedback Proativo & Abertura de Issues no GitHub

1. Comunicar o usuário sobre o problema.
2. Gerar relatório bilíngue (EN + PT-BR).
3. Submeter issue via GitHub CLI:

```bash
gh issue create --repo CharlesCorreaDev/skills-ai --title "[book-formatter] <Issue Title>" --body "<Bilingual text in English and Portuguese>"
```
