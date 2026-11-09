# Changelog - Book Formatter / Diagramador de Livros

All notable changes to the `book-formatter` skill will be documented in this file.  
*Todas as alterações notáveis na skill `book-formatter` serão documentadas neste arquivo.*

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.14.0-beta] - 2026-11-03

### Added / Adicionado
- **Motor Universal de Tradução e Diagramação de PDFs (`universal_pdf_layout_translator.py`):**
  - Motor cross-platform (Windows, Linux, macOS) para diagramação de qualquer arquivo PDF mantendo fidelidade absoluta ao layout original.
  - Extração de mapa de geometria e topologia de blocos em JSON (`extract_layout_map`).
  - Função de inserção com auto-fit (`insert_fitted_text`) que ajusta tamanho e entrelinha sem invadir colunas vizinhas.
- **Salvamento Resiliente e Multiplataforma (`patch_save.py`):**
  - Utilitário em Python universal `safe_save_pdf(doc, target_path)` com tratamento de bloqueio por visualizadores externos (fallback sem erro de I/O).

### Fixed / Corrigido
- **Eliminação de Sobreposições e Desformatação em Colunas:**
  - Calibração do grid de duas colunas, evitando invasão da coluna adjacente.
  - Implementação de pontilhamento dinâmico (`format_toc_line`) no Sumário (TOC) mantendo a numeração estritamente alinhada à margem direita.
  - Alinhamento justificado nativo em blocos de texto corrido.
- **Modernização de API e Limpeza Vetorial:**
  - Migração completa de `import fitz` para o padrão moderno `import pymupdf as fitz`.
  - Remoção vetorial de operadores de texto (`BT...ET`), garantindo 100% de preservação de relâmpagos, degradês e fundos sem máscaras opacas.

---

## [0.13.0-beta] - 2026-11-03

### Added / Adicionado
- **Segmentação de Regras para IA, RAG e Servidores MCP:**
  - Adicionado script [`scripts/export_rules_for_ai.py`](scripts/export_rules_for_ai.py) para quebrar o livro em fragmentos atômicos estruturados.
  - Gera dataset de chunks para RAG/embeddings (`<sistema>_rag_chunks.jsonl`).
  - Gera dataset de fine-tuning (`<sistema>_training_dataset.jsonl`) no formato padrão de instrução (system/user/assistant).
  - Gera arquivos modulares em `categories/` (`combat.md`, `spells.md`, `classes.md`, etc.) para integração em ferramentas de Servidores MCP.
- **Comunicação de Novos Glossários Formalizada via GitHub Issue:**
  - A notificação de criação de novos glossários de sistemas de RPG e a submissão para contribuição oficial devem ser formalizadas via GitHub Issue (`gh issue create --repo CharlesCorreaDev/skills-ai`).
- **Manutenção e Atualização Contínua de Dependências:**
  - Suporte ao argumento `--upgrade` em [`scripts/check_env.py`](scripts/check_env.py) para manter todas as bibliotecas de IA e leitura de documentos na última versão estável via `pip install --upgrade`.

---

## [0.12.0-beta] - 2026-11-03

### Added / Adicionado
- **Aprendizado Contínuo & Criação Automática de Glossários:**
  - Extração e compilação automática de regras, mecânicas, termos de combate, magias e cenário ao ler livros de novos sistemas de RPG.
  - Salvamento automático em memória e na pasta [`glossarys/`](glossarys/) com nomenclatura padronizada (`glossary-<sistema>.md`).
  - Alerta ao usuário informando a criação do glossário e oferecendo envio ao repositório oficial (`CharlesCorreaDev/skills-ai`) para inclusão na próxima versão.
- **Monitor de Versão e Atualização Automática:**
  - Adicionado script [`scripts/check_update.py`](scripts/check_update.py) para comparar versão instalada e versão remota no GitHub.
  - Suporte ao argumento `--upgrade` para atualização automática sem intervenção manual via Git pull.

---

## [0.11.0-beta] - 2026-11-03

### Added / Adicionado
- **Integração de Motores SOTA de IA e Utilitários de PDF:**
  - *Docling (IBM / DS4SD):* Motor primário avançado de análise multimodal de layout e extração de tabelas com `TableFormer` para colunas complexas de RPG.
  - *Marker (Datalab):* Extração de alta velocidade de PDF para Markdown preservando fórmulas e tabelas.
  - *Unstructured:* Particionamento inteligente e chunking de documentos para tradução em pequenos lotes.
  - *Nougat (Meta AI):* OCR neural visual-to-text para scans antigos, fontes góticas e trechos danificados.
  - *Stirling-PDF:* Suíte de pré-processamento, divisão/mesclagem, extração de imagens nativas e reparo de PDFs.
  - *Nano-PDF:* Edição cirúrgica em linguagem natural preservando camadas visuais da página original.
  - *PDFtoGPT & AI-powered-PDF-agent:* Metodologia de auditoria RAG anti-alucinação para confrontar e blindar mecânicas de regras.
  - Atualização do script [`check_env.py`](scripts/check_env.py) com verificação de dependências SOTA de IA e utilitários.

---

## [0.10.0-beta] - 2026-11-03

### Added / Adicionado
- **Protocolo Obrigatório Pré-Execução: Code Mode, Grill-Me & Andrej Karpathy Skills:**
  - *Code Mode Permanente:* Execução obrigatória por etapas e via ferramentas de código/scripts determinísticos, proibindo passos únicos cegos.
  - *Instalação e Uso Obrigatório de Skills de Alinhamento:* Integração formal de [`mattpocock/skills/productivity/grill-me`](https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me) e [`multica-ai/andrej-karpathy-skills`](https://github.com/multica-ai/andrej-karpathy-skills).
  - *Entrevista Inicial com Grill-Me:* Questionamento e interrogação obrigatória do usuário/autor antes de qualquer extração ou mudança de layout, travando regras, fontes e amostras de teste (5-10 páginas).
  - *Diretrizes de Andrej Karpathy:* Aplicação dos 4 princípios fundamentais (Don't assume, Keep it simple, Surgical changes, Define & verify goals) a todo o pipeline de diagramação de livros de RPG.

---

## [0.9.0-beta] - 2026-11-03

### Added / Adicionado
- **Diretrizes Rigorosas do Tradutor Profissional de Livros de RPG:** Adicionadas regras essenciais de tradução e diagramação junto ao autor:
  - *Fidelidade Absoluta da Tradução:* tradução integral de 100% dos textos sem resumos, omissões ou simplificações.
  - *Preservação da Página Original:* utilização da página original como base direta, mantendo intactas ilustrações, bordas, molduras, texturas e ornamentos (sem recriação de páginas em branco do zero).
  - *Tradução Rígida de Regras e Mecânicas:* proteção estrita a valores numéricos, dados, fórmulas de dano (`1d8`), modificadores (`+2`), tipos de ação, salvamentos e condições.
  - *Checklist de Controle de Qualidade Pré-Entrega:* conferência lado a lado, verificação de sobreposição de elementos visuais e alerta formal de trechos ilegíveis sem adivinhação.
  - *Formato de Entrega Fiel:* entrega visual e tecnicamente fiel ao livro original em português brasileiro.

---

## [0.8.0-beta] - 2026-10-29

### Added / Adicionado
- **Sétimo Dicionário da Skill (`book-formatter`):** Adicionado [`glossary-pathfinder-2e.md`](glossarys/glossary-pathfinder-2e.md) com glossário de **Pathfinder 2ª Edição (PF2e)** (Classes, Feats/Dotações, Salvamentos, Ações, Condições, Mecânicas), com fontes (`pf2srd.com.br`, `2e.aonprd.com`, `pf2.d20pfsrd.com`).

---

## [0.7.0-beta] - 2026-10-29

### Added / Adicionado
- **Nova Capacidade da Skill (`book-formatter`):** Criação de **Formulários e Fichas de RPG em PDF preenchíveis** — geração de fichas (character sheets) como PDF editável com campos de formulário (texto, números, checkboxes), com toolchain (`fpdf2`, `reportlab`, `pdfcpu`, `pypdf`, `pdfplumber`) e alternativas (LibreOffice/Word via UNO/COM/mail merge).

---

## [0.6.0-beta] - 2026-10-29

### Added / Adicionado
- **Sexto Dicionário da Skill (`book-formatter`):** Adicionado [`glossary-world-of-darkness.md`](glossarys/glossary-world-of-darkness.md) com glossário exclusivo do **Mundo das Trevas (World of Darkness)**, cobrindo **todas as suas franquias** (Vampire, Werewolf, Mage, Wraith, Changeling, Hunter, Demon, Orpheus, Geist e Mummy).

---

## [0.5.0-beta] - 2026-10-29

### Added / Adicionado
- **Quinto Dicionário da Skill (`book-formatter`):** Adicionado [`glossary-year-zero.md`](glossarys/glossary-year-zero.md) com termos do **Year Zero Engine (YZE)** (Forbidden Lands, Vaesen, Alien, Blade Runner, Twilight 2000, Mutant, The Walking Dead, Tales from the Loop, Electric State, Coriolis, Mutant: Year Zero, Dragonbane, Mörk Borg, Cy_Borg, The One Ring, Symbaroum, Pirate Borg, Outgunned, Death in Space, Mothership, Starforged).

---

## [0.4.0-beta] - 2026-10-29

### Added / Adicionado
- **Quarto Dicionário da Skill (`book-formatter`):** Adicionado [`glossary-savage-worlds.md`](glossarys/glossary-savage-worlds.md) com termos do **Savage Worlds Adventure Edition (SWADE)** (conceitos, traits, perícias, combate, edges e cenários).

---

## [0.3.0-beta] - 2026-10-29

### Added / Adicionado
- **Terceiro Dicionário da Skill (`book-formatter`):** Adicionado [`glossary-horror.md`](glossarys/glossary-horror.md) com termos de Terror Cósmico, Cthulhu Mythos, Survival Horror, Gothic Horror, Psionics e mecânicas de sanidade/terror.

---

## [0.2.0-beta] - 2026-10-29

### Added / Adicionado
- **Segundo Dicionário da Skill (`book-formatter`):** Adicionado [`glossary-scifi.md`](glossarys/glossary-scifi.md) com termos de Ficção Científica, Ciberpunk, Space Opera, Militar, Science Fantasy e Psionics, ampliando o dicionário de RPG e gamers da skill.

---

## [0.1.0-beta] - 2026-10-29

### Added / Adicionado
- **Initial Release of the `book-formatter` skill (Beta):**
  - **Book Formatting & RPG Book Diagramming Suite:** installs any required document-reading toolchain (PDF with or without OCR, TXT, DOCX, DOC, CSV/TSV, XLSX/XLS, HTML, EPUB, images OCR) and orchestrates book diagramming delivering a TXT with the texts, a Markdown and a duly diagramed PDF.
  - **Supported Format Matrix & Extraction Engines:** digital/scanned PDF, plain text, markdown, CSV/TSV, Word (current/legacy), Excel (current/legacy), LibreOffice, Rich Text, Web/E-book.
  - **Tool Installation Protocol:** Python packages (`markitdown`, `markitdown-ocr`, `pdfminer.six`, `pdfplumber`, `pypdf`, `pypdfium2`, `Pillow`, `pytesseract`, `python-docx`, `mammoth`, `openpyxl`, `pandas`, `xlrd`, `odfpy`, `ebooklib`, `beautifulsoup4`, `html2text`, `striprtf`), system binaries (`tesseract`, `pandoc`, `libreoffice`, `poppler`) and OCR language packs.
  - **Delivery Artifacts & Naming Convention:** original, extraction, translation and diagramation outputs in TXT/Markdown/PDF.
  - **8-Phase Book Diagramming Workflow:** Analyze PDF → Discover/Use Fonts → Extract Text → Teach RPG Vocabulary → Translate in Small Batches → Verify Translation → Diagram → Final Audit (based on the paid AI methodology for RPG book translation/diagraming).
  - **`scripts/check_env.py`:** multi-platform environment checker.
  - **`scripts/convert_to_txt_md.py`:** document-to-TXT/Markdown converter.
  - **RPG & Gamers Glossary:** initial term dictionary for the skill (`glossarys/glossary.md`) sourced from community RPG/gamer glossaries.

---
