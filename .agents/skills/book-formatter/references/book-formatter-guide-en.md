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
| **PDF (Digital)** | `.pdf` | **`pdf_oxide`** (`pdf-oxide`) | `docling`, `marker-pdf`, `markitdown`, `pdfminer.six` | `pdf-oxide` (pip/npm), `docling`, `marker-pdf`, `markitdown`, `pypdf`, `pypdfium2` |
| **PDF (Scanned / Complex Layout)** | `.pdf` | **`pdf_oxide`** / `docling` | `nougat`, `marker-pdf`, `markitdown_ocr` | `pdf-oxide`, `docling`, `nougat-ocr`, `marker-pdf`, `tesseract-ocr`, `Pillow` |
| **PDF (Manipulation & Sanitization)** | `.pdf` | **`pdf_oxide`** / `stirling-pdf` | `pypdf`, `pdfcpu`, `pdftoppm` | `pdf-oxide`, `stirling-pdf`, `pypdf`, `pdfplumber`, `poppler-utils` |
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

- **Impeccable Design Standard (Paul Bakaus):** Strict anti-slop visual guidelines for book diagramming, eliminating clashing fonts, bad margins, unnatural line breaks, or cluttered ornament stacking.
- **Systematic Debugging Protocol:** Scientific isolation of PDF extraction exceptions, font encoding errors, and OCR failures via minimal reproducible test cases without random parameter guessing.
- **Trail of Bits Security Standards:** Sanitization of uploaded PDFs, external assets, and automated script pipelines against malicious payload injection.
- Detailed reference in [impeccable-debugging-security-trinity.md](../docs-for-skill/impeccable-debugging-security-trinity.md).

0. **[PDF Oxide](https://github.com/yfedoseev/pdf_oxide) (`pdf_oxide` / `pdf-oxide`) ⭐ (MANDATÓRIO EM 1º LUGAR):**
   - *Core specialty:* Motor ultrarrápido em Rust com bindings nativos para Python, Node.js e Rust. Extração de texto em ~0.8ms, conversão para Markdown, extração de metadados, caixas delimitadoras (bounding boxes) e licença permissiva MIT/Apache-2.0. **Sempre utilizado como primeira opção antes de qualquer outra ferramenta.**
   - *Docs:* [Python](https://pdf.oxide.fyi/pt/python/docs/getting-started) • [Node.js](https://pdf.oxide.fyi/pt/javascript-node/docs/getting-started) • [Rust](https://pdf.oxide.fyi/pt/rust/docs/getting-started) • [NPM](https://www.npmjs.com/package/pdf-oxide)
   - *Install:* `pip install pdf-oxide` ou `npm install pdf-oxide`
   - *Guia:* [pdf-oxide-guide.md](pdf-oxide-guide.md)

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
- **andrej-karpathy-skills** (https://github.com/multica-ai/andrej-karpathy-skills): Pragmatic engineering discipline against hallucinations, scope creep, and over-engineering.
- **grill-me** (https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me): Structured alignment interrogation to drill down into project requirements and eliminate ambiguities.
- **skills-code-review** (https://www.aihero.dev/skills-code-review): Automated code review, quality gating, and rigorous pre-delivery validation.
- **modern-web-guidance** (https://github.com/GoogleChrome/modern-web-guidance): Padrões de tipografia web, hifenação, quebra equilibrada de linhas (improve-text-layout-and-legibility), dimensionamento fluido (fluid-scaling) e layout de páginas para livros digitais e manuais exportados em HTML, PWA e EPUB.

`ash
# Add companion skills to local project / global environment:
npx skills@latest add multica-ai/andrej-karpathy-skills
npx skills@latest add mattpocock/skills --skill=grill-me
npx skills@latest add aihero-dev/skills-code-review
npx skills@latest add noobygains/godmode
npx modern-web-guidance@latest install
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

