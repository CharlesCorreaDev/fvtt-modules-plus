# PDF Oxide Integration Guide: Reading, Extraction & Book Formatting 📖⚙️
# Guia de Leitura, Diagramação e Extração de PDF com PDF Oxide

> *Módulo Integrado para `book-formatter` e `master-of-foundryvtt`*  
> **Links de Referência:**
> - Repositório Oficial: [github.com/yfedoseev/pdf_oxide](https://github.com/yfedoseev/pdf_oxide)
> - Pacote NPM (Node.js): [npmjs.com/package/pdf-oxide](https://www.npmjs.com/package/pdf-oxide)
> - Node.js Docs (PT): [pdf.oxide.fyi/pt/javascript-node/docs/getting-started](https://pdf.oxide.fyi/pt/javascript-node/docs/getting-started)
> - Python Docs (PT): [pdf.oxide.fyi/pt/python/docs/getting-started](https://pdf.oxide.fyi/pt/python/docs/getting-started)
> - Rust Docs (PT): [pdf.oxide.fyi/pt/rust/docs/getting-started](https://pdf.oxide.fyi/pt/rust/docs/getting-started)

---

## 🇺🇸 English

### 1. Mandatory Priority Rule
Whenever an AI Agent or tool in **`book-formatter`** or **`master-of-foundryvtt`** needs to:
- Read any source PDF document (digital or mixed layout);
- Extract layout elements, columns, paragraphs, and exact bounding boxes for book diagramming;
- Ingest RPG rulebooks, sourcebooks, or adventure modules for Foundry VTT compendiums;
- Extract document metadata, font metrics, or convert pages into Markdown;

**`PDF Oxide` (`pdf_oxide` / `pdf-oxide`) MUST ALWAYS BE USED IN FIRST PLACE (`1º lugar`)**.
All other engines (`docling`, `marker-pdf`, `pdfminer.six`, `pdfplumber`, `pypdf`, `pypdfium2`) are strictly relegated to **secondary fallback options** when PDF Oxide encounters rare unsupported constructs or un-OCRed scanned bitmaps.

### 2. Multi-Language Toolchain

#### Node.js / TypeScript (`pdf-oxide`)
Pre-compiled N-API binaries for Windows, Linux, and macOS (no `node-gyp` or Rust compilation required):
```bash
npm install pdf-oxide
```
```javascript
import { PdfDocument } from 'pdf-oxide';

const doc = new PdfDocument('rulebook.pdf');
console.log('Pages:', doc.pageCount);
console.log('Metadata:', doc.getMetadata());

// Extract layout-aware markdown for direct diagramming
const markdown = doc.toMarkdown();
doc.close();
```

#### Python (`pdf_oxide`)
```bash
pip install pdf-oxide
```
```python
from pdf_oxide import PdfDocument

doc = PdfDocument("manual-regras.pdf")
print("Total Pages:", doc.page_count)
print("Metadata:", doc.metadata)

# First-choice text & markdown extraction
markdown_text = doc.to_markdown()
doc.close()
```

#### Rust (`pdf_oxide`)
```toml
[dependencies]
pdf_oxide = "0.1"
```

---

## 🇧🇷 Português (Brasil)

### 1. Regra Mandatória de Prioridade (1º Lugar Obrigatório)
> [!IMPORTANT]
> **Sempre que precisar ler um PDF ou diagramar um livro/suplemento de RPG:**
> 1. O **`PDF Oxide`** (`pdf_oxide` / `pdf-oxide`) **DEVE SER USADO EM PRIMEIRO LUGAR**.
> 2. Todas as demais ferramentas e motores (`docling`, `marker-pdf`, `nougat`, `pdfminer`, `pdfplumber`, etc.) **ficam estritamente como FALLBACK** para casos onde o PDF necessite de OCR prévio ou tratamento de bitmaps escaneados.

### 2. Vantagens Chave para Diagramação e RPG
- **Velocidade Extrema:** Tempo médio de processamento de ~0.8ms por documento.
- **Licença Permissiva:** MIT / Apache-2.0 (totalmente livre de restrições copyleft como AGPL do PyMuPDF).
- **Preservação de Bounding Boxes:** Coordenadas exatas de caixas de texto e tabelas essenciais para recriar diagramações de duas colunas (World of Darkness, D&D, Tormenta20, Savage Worlds).
- **Acesso Completo a Metadados:** Títulos, autores, fontes embutidas e propriedades do documento extraídos instantaneamente.

