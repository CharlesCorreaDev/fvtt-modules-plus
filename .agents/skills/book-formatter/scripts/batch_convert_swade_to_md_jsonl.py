#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
batch_convert_to_md_jsonl.py
Motor Universal de Conversão de PDFs para Markdown Estruturado, TXT e Datasets JSONL (RAG / Treinamento).

Capacidades:
1. Suporta arquivo individual OU diretório inteiro contendo múltiplos PDFs.
2. Deduplicação inteligente de sombras e camadas de contorno gráfico de PDFs.
3. Des-hifenização automática de palavras partidas por translineação de coluna/página.
4. Preservação de colunas duplas e ordenação natural de leitura.
5. Geração de Chunks JSONL para RAG (bancos vetoriais) e datasets de treinamento.
6. Higienização automática via humanizer-plus para expurgar marcas d'água de IA e caracteres invisíveis.
7. Gera manifesto consolidado JSON com estatísticas de processamento.
"""

import os
import sys
import json
import re
import time
import argparse
import subprocess
from pathlib import Path

# Forçar UTF-8 no Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

try:
    import pymupdf  # PyMuPDF ultra-rápido
except ImportError:
    print("❌ Erro: PyMuPDF não encontrado. Instale com: pip install pymupdf")
    sys.exit(1)


# Lista padrão pré-configurada para retrocompatibilidade com SWADE caso nenhum caminho seja passado
DEFAULT_SWADE_SOURCE = Path(r"D:\tmp\rrppgg\swade")
DEFAULT_SWADE_OUTPUT = Path(r"D:\tmp\rrppgg\swade\converted_swade_ai")

SWADE_PRESETS = {
    "Savage Worlds - Criador de Mundos.pdf": ("swade_criador_de_mundos", "Savage Worlds: Criador de Mundos", "SWADE"),
    "Savage Worlds - Interface Zero 2.0 (PTBR).pdf": ("swade_interface_zero_2", "Savage Worlds: Interface Zero 2.0 (Cyberpunk)", "SWADE"),
    "Savage Worlds - Vermilium.pdf": ("swade_vermilium", "Savage Worlds: Vermilium (Dark Fantasy / Weird West)", "SWADE"),
    "Sprawlrunners (v0.1_23.02.27).pdf": ("swade_sprawlrunners", "Savage Worlds: Sprawlrunners (Cyberpunk Fantasy)", "SWADE"),
    "SWADE - Compêndio de Fantasia (v0.3.1_26.06.16).pdf": ("swade_compendio_fantasia", "SWADE: Compêndio de Fantasia", "SWADE"),
    "SWADE - Compêndio de Ficção Científica (v0.3f_26.06.16).pdf": ("swade_compendio_ficcao_cientifica", "SWADE: Compêndio de Ficção Científica", "SWADE"),
    "SWADE - Compêndio de Horror (v0.3.1_26.06.16).pdf": ("swade_compendio_horror", "SWADE: Compêndio de Horror", "SWADE"),
    "SWADE - Compêndio de Supers (v0.3_26.06.15).pdf": ("swade_compendio_supers", "SWADE: Compêndio de Superpoderes", "SWADE"),
    "SWADE - Edição Revisada (v3_26.06.16).pdf": ("swade_edicao_revisada", "SWADE: Edição Aventura Revisada (Regras Básicas)", "SWADE"),
    "necessary-evil-swade-invasion.pdf": ("swade_necessary_evil_invasion", "Necessary Evil: Invasion (SWADE)", "SWADE"),
}


def slugify_name(name: str) -> str:
    """Gera um identificador limpo a partir do nome do arquivo."""
    stem = Path(name).stem
    stem = re.sub(r'[\(\)\[\]_.]+', ' ', stem)
    stem = re.sub(r'[^\w\s-]', '', stem).strip().lower()
    slug = re.sub(r'[-\s]+', '_', stem)
    return slug or "documento"


def run_humanizer_sanitize(file_path: Path):
    """Executa a higienização do humanizer-plus para remover marcas d'água de IA."""
    current_dir = Path(__file__).resolve().parent
    repo_root = current_dir.parent.parent
    humanizer_script = repo_root / "humanizer-plus" / "scripts" / "sanitize.js"

    if humanizer_script.exists():
        try:
            subprocess.run(
                ["node", str(humanizer_script), str(file_path)],
                check=True,
                capture_output=True,
                text=True,
                encoding="utf-8"
            )
        except Exception:
            pass


def dehyphenate_text(text: str) -> str:
    """Reconecta palavras quebradas por translineação de final de linha ou borda de coluna em PDFs.
    Ex: 'aumen-\n\ntam' -> 'aumentam'
        'po-\npularidade' -> 'popularidade'
        'Com-\nplicações' -> 'Complicações'
    """
    text = re.sub(r'([a-zA-Z\u00C0-\u017F]{2,})[-–—]\s*\n+\s*([a-z\u00E0-\u017F]+)', r'\1\2', text)

    prefixes = {'sul', 'norte', 'pré', 'pre', 'pós', 'pos', 'recém', 'recem', 'super', 'anti', 'auto', 'sub', 'macro', 'micro'}
    def merge_capitalized_hyphen(m):
        p1, p2 = m.group(1), m.group(2)
        if p1.lower() in prefixes:
            return f"{p1}-{p2}"
        return f"{p1}{p2.lower()}"

    text = re.sub(r'([a-zA-Z\u00C0-\u017F]{2,})[-–—]\s*\n+\s*([A-Z\u00C0-\u017F][a-z\u00E0-\u017F]{2,})', merge_capitalized_hyphen, text)
    return text


def sanitize_text(text: str) -> str:
    """Higieniza caracteres Unicode invisíveis, BOM, aspas curvas e une palavras hifenizadas."""
    cleaned = text.replace("\ufeff", "").replace("\u200b", "").replace("\u200c", "").replace("\u200d", "")
    cleaned = cleaned.replace("“", '"').replace("”", '"').replace("‘", "'").replace("’", "'")
    cleaned = dehyphenate_text(cleaned)
    cleaned = re.sub(r"\n{3,}", "\n\n", cleaned)
    return cleaned


def extract_pdf_to_markdown(pdf_path: Path, title: str, system_name: str = "Geral", max_pages: int = None) -> str:
    """Extrai o texto preservando títulos, colunas e numeração de páginas,
    eliminando duplicações provenientes de drop-shadows e contornos gráficos."""
    doc = pymupdf.open(str(pdf_path))
    total_pages = len(doc)
    pages_to_process = min(total_pages, max_pages) if max_pages else total_pages

    md_lines = [
        f"# {title}\n",
        f"> **Fonte:** `{pdf_path.name}` ({pages_to_process} de {total_pages} páginas)",
        f"> **Classificação:** {system_name}",
        f"> **Extraído e Estruturado por:** Book Formatter (AI Skill)\n",
        "---\n"
    ]

    for pno in range(pages_to_process):
        page = doc[pno]
        page_num = pno + 1
        blocks = page.get_text("blocks")

        # Filtrar blocos de texto reais (tipo 0)
        text_blocks = [b for b in blocks if b[6] == 0 and b[4].strip()]
        if not text_blocks:
            continue

        md_lines.append(f"\n## 📄 Página {page_num}\n")

        # Deduplicar linhas repetidas por camadas de efeito (sombra/contorno)
        cleaned_blocks = []
        for b in text_blocks:
            x0, y0, x1, y1, text, bno, btype = b
            lines = text.splitlines()
            deduped_lines = []
            for l in lines:
                s = l.strip()
                if not s:
                    continue
                if deduped_lines and deduped_lines[-1] == s:
                    continue
                deduped_lines.append(s)

            if deduped_lines:
                clean_text = "\n".join(deduped_lines)
                cleaned_blocks.append((x0, y0, x1, y1, clean_text))

        # Filtrar blocos duplicados sobrepostos (mesma área ±3pt)
        deduped_page_blocks = []
        for b in cleaned_blocks:
            x0, y0, x1, y1, text = b
            is_dup = False
            for prev in deduped_page_blocks:
                px0, py0, px1, py1, ptext = prev
                if ptext == text and abs(py0 - y0) < 3.0 and abs(px0 - x0) < 3.0:
                    is_dup = True
                    break
            if not is_dup:
                deduped_page_blocks.append(b)

        # Classificar blocos de duas colunas se a página for dividida ao meio
        col1 = []
        col2 = []
        full_width = []

        page_width = page.rect.width
        mid_point = page_width / 2.0

        for b in deduped_page_blocks:
            x0, y0, x1, y1, text = b

            if (x1 - x0) > (page_width * 0.65) or y0 < 100:
                full_width.append((y0, text))
            elif x1 <= mid_point + 20:
                col1.append((y0, text))
            else:
                col2.append((y0, text))

        for _, text in sorted(full_width, key=lambda x: x[0]):
            md_lines.append(f"{text}\n")

        for _, text in sorted(col1, key=lambda x: x[0]):
            md_lines.append(f"{text}\n")

        for _, text in sorted(col2, key=lambda x: x[0]):
            md_lines.append(f"{text}\n")

    full_md = "\n".join(md_lines)
    return sanitize_text(full_md)


def generate_jsonl_chunks(markdown_content: str, system_name: str, book_title: str, chunk_size: int = 400):
    """Gera chunks estruturados em JSONL para bancos vetoriais (RAG) e fine-tuning."""
    lines = markdown_content.splitlines()
    chunks = []
    tuning_dataset = []

    current_chunk = []
    current_tokens = 0
    chunk_index = 1
    current_section = book_title

    for line in lines:
        if line.startswith("# ") or line.startswith("## ") or line.startswith("### "):
            current_section = line.strip("# ").strip()

        words = line.split()
        current_tokens += len(words)
        current_chunk.append(line)

        if current_tokens >= chunk_size:
            chunk_body = "\n".join(current_chunk).strip()
            if chunk_body:
                chunk_id = f"{system_name}_chunk_{chunk_index:04d}"
                chunks.append({
                    "id": chunk_id,
                    "book": book_title,
                    "section": current_section,
                    "token_count": current_tokens,
                    "text": chunk_body
                })

                tuning_dataset.append({
                    "messages": [
                        {
                            "role": "system",
                            "content": f"Você é um especialista e assistente inteligente no documento '{book_title}'."
                        },
                        {
                            "role": "user",
                            "content": f"Explique o conteúdo e regras da seção '{current_section}' de '{book_title}'."
                        },
                        {
                            "role": "assistant",
                            "content": chunk_body
                        }
                    ]
                })

                chunk_index += 1

            current_chunk = []
            current_tokens = 0

    if current_chunk:
        chunk_body = "\n".join(current_chunk).strip()
        if chunk_body:
            chunk_id = f"{system_name}_chunk_{chunk_index:04d}"
            chunks.append({
                "id": chunk_id,
                "book": book_title,
                "section": current_section,
                "token_count": current_tokens,
                "text": chunk_body
            })

            tuning_dataset.append({
                "messages": [
                    {
                        "role": "system",
                        "content": f"Você é um especialista e assistente inteligente no documento '{book_title}'."
                    },
                    {
                        "role": "user",
                        "content": f"Explique o conteúdo e regras da seção '{current_section}' de '{book_title}'."
                    },
                    {
                        "role": "assistant",
                        "content": chunk_body
                    }
                ]
            })

    return chunks, tuning_dataset


def convert_pdf_file(pdf_path: Path, output_dir: Path, title: str = None, system_name: str = None, chunk_size: int = 400, max_pages: int = None) -> dict:
    """Converte um arquivo PDF individual para .md, .txt e datasets .jsonl."""
    output_dir.mkdir(parents=True, exist_ok=True)

    if not title or not system_name:
        if pdf_path.name in SWADE_PRESETS:
            preset_sys, preset_title, _ = SWADE_PRESETS[pdf_path.name]
            system_name = system_name or preset_sys
            title = title or preset_title
        else:
            system_name = system_name or slugify_name(pdf_path.name)
            title = title or pdf_path.stem.replace("_", " ").title()

    book_start = time.time()
    file_size_mb = pdf_path.stat().st_size / 1024 / 1024

    md_text = extract_pdf_to_markdown(pdf_path, title, system_name=system_name, max_pages=max_pages)
    md_file = output_dir / f"{system_name}.md"
    txt_file = output_dir / f"{system_name}.txt"
    md_file.write_text(md_text, encoding="utf-8", newline="\n")
    txt_file.write_text(md_text, encoding="utf-8", newline="\n")

    run_humanizer_sanitize(md_file)
    run_humanizer_sanitize(txt_file)

    rag_chunks, tuning_data = generate_jsonl_chunks(md_text, system_name, title, chunk_size=chunk_size)
    rag_file = output_dir / f"{system_name}_rag_chunks.jsonl"
    tuning_file = output_dir / f"{system_name}_training_dataset.jsonl"

    with open(rag_file, "w", encoding="utf-8") as f:
        for c in rag_chunks:
            f.write(json.dumps(c, ensure_ascii=False) + "\n")

    with open(tuning_file, "w", encoding="utf-8") as f:
        for t in tuning_data:
            f.write(json.dumps(t, ensure_ascii=False) + "\n")

    elapsed = time.time() - book_start
    print(f"    ✅ Concluído em {elapsed:.1f}s | MD: {md_file.stat().st_size / 1024:.1f} KB | Chunks RAG: {len(rag_chunks)} | Exemplos IA: {len(tuning_data)}")

    return {
        "title": title,
        "filename": pdf_path.name,
        "system_name": system_name,
        "md_file": md_file.name,
        "txt_file": txt_file.name,
        "rag_jsonl": rag_file.name,
        "tuning_jsonl": tuning_file.name,
        "chunks_count": len(rag_chunks),
        "tuning_count": len(tuning_data),
        "md_size_kb": round(md_file.stat().st_size / 1024, 1),
        "file_size_mb": round(file_size_mb, 1)
    }


def main():
    parser = argparse.ArgumentParser(
        description="Conversor Universal de PDFs para Markdown, TXT e Datasets JSONL (RAG / Treinamento de IA)."
    )
    parser.add_argument(
        "input",
        nargs="?",
        default=None,
        help="Caminho do arquivo PDF ou diretório contendo PDFs. Se omitido, processa a pasta padrão de SWADE."
    )
    parser.add_argument(
        "--output-dir", "-o",
        default=None,
        help="Diretório de saída para os arquivos gerados (.md, .txt, .jsonl, manifesto)."
    )
    parser.add_argument(
        "--chunk-size", "-c",
        type=int,
        default=400,
        help="Quantidade de palavras/tokens por chunk RAG em JSONL (padrão: 400)."
    )
    parser.add_argument(
        "--max-pages", "-p",
        type=int,
        default=None,
        help="Limite máximo de páginas a processar por PDF (opcional, útil para prévias e testes)."
    )
    parser.add_argument(
        "--title", "-t",
        default=None,
        help="Título do documento (aplicável para conversão de arquivo único)."
    )

    args = parser.parse_args()

    if args.input is None:
        source_path = DEFAULT_SWADE_SOURCE
        output_dir = Path(args.output_dir) if args.output_dir else DEFAULT_SWADE_OUTPUT
    else:
        source_path = Path(args.input).resolve()
        if args.output_dir:
            output_dir = Path(args.output_dir).resolve()
        else:
            output_dir = source_path if source_path.is_dir() else source_path.parent / "converted_ai_outputs"

    if not source_path.exists():
        print(f"❌ Erro: Caminho de entrada não encontrado: '{source_path}'")
        sys.exit(1)

    output_dir.mkdir(parents=True, exist_ok=True)

    if source_path.is_file():
        if source_path.suffix.lower() != ".pdf":
            print(f"❌ Erro: O arquivo '{source_path.name}' não é um PDF.")
            sys.exit(1)
        pdf_list = [source_path]
    else:
        # Diretório: coletar todos os PDFs
        pdf_list = sorted(list(source_path.glob("*.pdf")) + list(source_path.glob("*/*.pdf")))
        if not pdf_list:
            print(f"⚠️ Nenhum arquivo PDF encontrado em: '{source_path}'")
            sys.exit(0)

    print(f"🚀 Iniciando processamento universal de {len(pdf_list)} documento(s) PDF:")
    print(f"📂 Origem: {source_path}")
    print(f"📂 Destino: {output_dir}\n")

    total_start = time.time()
    summary_records = []

    for idx, pdf_path in enumerate(pdf_list, 1):
        print(f"[{idx}/{len(pdf_list)}] 📖 Processando: {pdf_path.name} ({pdf_path.stat().st_size / 1024 / 1024:.1f} MB)...")
        record = convert_pdf_file(
            pdf_path=pdf_path,
            output_dir=output_dir,
            title=args.title if len(pdf_list) == 1 else None,
            chunk_size=args.chunk_size,
            max_pages=args.max_pages
        )
        summary_records.append(record)

    manifest_file = output_dir / "manifest_converted_library.json"
    manifest_data = {
        "generator": "Book Formatter Universal PDF-to-Markdown/JSONL Engine",
        "generated_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "total_documents_converted": len(summary_records),
        "documents": summary_records
    }
    manifest_file.write_text(json.dumps(manifest_data, indent=2, ensure_ascii=False), encoding="utf-8")

    total_time = time.time() - total_start
    print(f"\n🎉 Todos os {len(summary_records)} documentos foram convertidos com sucesso em {total_time:.1f}s!")
    print(f"📄 Manifesto consolidado salvo em: {manifest_file}")


if __name__ == "__main__":
    main()
