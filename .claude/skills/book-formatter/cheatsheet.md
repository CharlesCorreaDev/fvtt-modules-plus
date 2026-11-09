# Cheatsheet / Guia Rápido - Book Formatter

## 📄 Suporte de Formatos e Artefatos de Entrega

| Etapa | Entrada | Saída |
|---|---|---|
| **Leitura** | `.pdf` (digital / OCR) | `.txt` / `.md` / `.docx` |
| **Leitura** | `.txt` / `.md` | `.txt` / `.md` |
| **Leitura** | `.docx` / `.doc` / `.doc` | `.txt` / `.md` / `.docx` |
| **Leitura** | `.csv` / `.tsv` / `.xlsx` / `.xls` | `.md` / `.txt` |
| **Leitura** | `.html` / `.htm` / `.epub` | `.md` / `.txt` |
| **Diagramação** | PDF original + DOCX traduzido | **`.pdf`** (diagramado) + **`.md`** + **`.txt`** |

## 🧰 Comandos de Ferramentas

```bash
# Verificar ambiente
python scripts/check_env.py

# Converter documento para TXT / Markdown
python scripts/convert_to_txt_md.py "caminho/do/documento.pdf" "saida"

# Instalar dependências Python
pip install markitdown markitdown-ocr pdfminer.six pdfplumber pypdf pypdfium2 Pillow pytesseract \
            python-docx mammoth openpyxl pandas xlrd odfpy ebooklib beautifulsoup4 html2text striprtf
```

## 🔄 Fluxo de Diagramação (8 Fases) — Prompts Essenciais para a IA

| Fase | Prompt Essencial (resumo) |
|---|---|
| **1. Analisar PDF** | "Analise integralmente este PDF antes de qualquer alteração. Identifique páginas, margens, colunas, recuos, fontes, imagens, ornamentos, molduras." |
| **2. Fontes** | "Identifique todas as fontes... Se indisponível, informe o nome e procure alternativa compatível." |
| **3. Extrair Texto** | "Extraia todo o texto respeitando ordem de colunas, parágrafos, listas, tabelas e fichas. Gere DOCX editável." |
| **4. Glossário RPG** | "Estude a terminologia oficial brasileira... Monte glossário bilíngue e use consistentemente." |
| **5. Traduzir** | "Traduza integralmente as páginas físicas X a Y... Preserve todo o conteúdo... Sem resumos/adaptações." |
| **6. Verificar Tradução** | "Compare DOCX traduzido com PDF original página a página e parágrafo por parágrafo. Corrija problemas. Apresente relatório." |
| **7. Diagramar** | "Use PDF original como referência absoluta de diagramação e DOCX traduzido como fonte do conteúdo. Reproduza layout... Trabalhe em lotes pequenos (5–10 páginas de teste)." |
| **8. Auditar** | "Compare visual e estruturalmente cada página... Corrija problemas antes de entregar o PDF." |

## 🛡️ Protocolos

- **Versionamento:** `VERSION` → `CHANGELOG.md` → tag `book-formatter-v<versao>`.
- **Recuperação:** diagnosticar causa raiz → auto-correção → portão de permissão → relatório & validação.
- **Issues:** `gh issue create --repo CharlesCorreaDev/skills-ai --title "[book-formatter] <Issue Title>" --body "<Bilingual EN/PT-BR>"`.

## 📖 Glossário

Consulte [`glossarys/glossary.md`](glossarys/glossary.md) para o dicionário de termos de RPG e gamers.

## 🛸 Glossário Sci-Fi & Subgêneros

Consulte [`glossarys/glossary-scifi.md`](glossarys/glossary-scifi.md) para o dicionário de Ficção Científica, Ciberpunk, Space Opera, Militar, Science Fantasy e Psionics.

## 😱 Glossário de Terror & Horror

Consulte [`glossarys/glossary-horror.md`](glossarys/glossary-horror.md) para o dicionário de Terror Cósmico, Lovecraft, Survival Horror, Gothic Horror e Psicologia do Medo.

## ⚔️ Glossário Savage Worlds & Year Zero

Consulte [`glossarys/glossary-savage-worlds.md`](glossarys/glossary-savage-worlds.md) para o dicionário de **Savage Worlds Adventure Edition (SWADE)** e [`glossarys/glossary-year-zero.md`](glossarys/glossary-year-zero.md) para o dicionário do **Year Zero Engine (YZE)**.

## 📝 Criação de Formulários e Fichas de RPG (PDF Preenchível)

- **Trigger:** usuário pedir para criar/desenhar/gerar fichas ou formulários de RPG como PDF preenchível.
- **Toolchain:** `fpdf2`, `reportlab`, `pdfcpu`, `pypdf`, `pdfplumber`; alternativas LibreOffice/Word (UNO/COM/mail merge).
- **Fluxo:** blueprint → gerar PDF preenchível → entregar PDF (`.pdf`) + versão achatada (opcional).

## 🌑 Glossário do Mundo das Trevas (WoD)

Consulte [`glossarys/glossary-world-of-darkness.md`](glossarys/glossary-world-of-darkness.md) para o glossário exclusivo do **Mundo das Trevas**, cobrindo **todas as suas franquias** (Vampire, Werewolf, Mage, Wraith, Changeling, Hunter, Demon, Orpheus, Geist e Mummy).

## 🧙 Glossário Pathfinder 2e (PF2e)

Consulte [`glossarys/glossary-pathfinder-2e.md`](glossarys/glossary-pathfinder-2e.md) para o dicionário de **Pathfinder 2ª Edição (PF2e)** (Classes, Feats/Dotações, Salvamentos, Ações, Condições, Mecânicas).
