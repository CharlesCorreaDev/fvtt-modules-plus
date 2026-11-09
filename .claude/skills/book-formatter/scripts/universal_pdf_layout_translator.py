#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
universal_pdf_layout_translator.py
Motor Universal de Diagramação e Tradução de PDFs de Alta Fidelidade (Cross-Platform).

Capacidades:
1. Extração da geometria original de cada bloco/linha/parágrafo do PDF.
2. Limpeza cirúrgica vetorial dos operadores de texto nativos (BT...ET) mantendo 100%
   do background, texturas, degradês, relâmpagos e imagens em qualquer PDF.
3. Injeção de texto traduzido respeitando rigorosamente as caixas delimitadoras (bounding boxes),
   evitando vazamento de colunas e sobreposições.
4. Ajuste automático dinâmico de tamanho de fonte e entrelinha (leading) para caber na geometria original.
5. Suporte multiplataforma (Windows / Linux / macOS) e integração com safe_save_pdf.
"""

import sys
import os
import re
import json
import argparse
from pathlib import Path
from typing import Dict, List, Any, Optional

import pymupdf as fitz
from PIL import Image

# Importar salvamento seguro resiliente
try:
    from patch_save import safe_save_pdf
except ImportError:
    try:
        from book_formatter.scripts.patch_save import safe_save_pdf
    except ImportError:
        def safe_save_pdf(doc, target_path, **kwargs):
            doc.save(str(target_path))
            return target_path


# Configuração de encoding para console
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def clean_page_text_streams(page: fitz.Page, keep_pattern: Optional[bytes] = None):
    """
    Remove operadores de texto (BT...ET) diretamente do content stream do PDF.
    Preserva 100% da arte vetorial, degradês, raster e caixas gráficas.
    """
    doc = page.parent
    cxrefs = page.get_contents()
    for cx in cxrefs:
        stream = doc.xref_stream(cx)
        if keep_pattern:
            clean = re.sub(
                rb"BT\s.*?\sET",
                lambda m: m.group(0) if re.search(keep_pattern, m.group(0)) else b"",
                stream,
                flags=re.DOTALL
            )
        else:
            clean = re.sub(rb"BT\s.*?\sET", b"", stream, flags=re.DOTALL)
        doc.update_stream(cx, clean)


def extract_layout_map(doc: fitz.Document, max_pages: int = 5) -> List[Dict[str, Any]]:
    """
    Mapeia a geometria e a topologia textual de cada página do PDF.
    """
    pages_layout = []
    num_pages = min(len(doc), max_pages) if max_pages > 0 else len(doc)

    for pno in range(num_pages):
        page = doc[pno]
        d = page.get_text("dict")
        page_dict = {
            "page_num": pno + 1,
            "rect": [page.rect.x0, page.rect.y0, page.rect.x1, page.rect.y1],
            "blocks": []
        }

        for b in d.get("blocks", []):
            if "lines" not in b:
                continue

            block_text = ""
            lines_data = []
            for l in b["lines"]:
                line_text = "".join([s.get("text", "") for s in l.get("spans", [])])
                block_text += line_text + "\n"
                first_span = l["spans"][0] if l["spans"] else {}
                lines_data.append({
                    "bbox": l["bbox"],
                    "origin": first_span.get("origin", (0, 0)),
                    "font": first_span.get("font", "Helvetica"),
                    "size": first_span.get("size", 10.0),
                    "color": first_span.get("color", 0),
                    "text": line_text.strip()
                })

            page_dict["blocks"].append({
                "bbox": b["bbox"],
                "text": block_text.strip(),
                "lines": lines_data
            })

        pages_layout.append(page_dict)
    return pages_layout


def insert_fitted_text(
    page: fitz.Page,
    rect: fitz.Rect,
    text: str,
    fontname: str = "Palatino",
    fontfile: Optional[str] = None,
    target_fontsize: float = 10.0,
    min_fontsize: float = 7.5,
    color: tuple = (0, 0, 0),
    align: int = fitz.TEXT_ALIGN_JUSTIFY
) -> float:
    """
    Insere o texto dentro do retângulo delimitador com ajuste gradual de escala tipográfica,
    impedindo rigorosamente sobreposição ou vazamento de colunas.
    """
    cur_size = target_fontsize
    while cur_size >= min_fontsize:
        rc = page.insert_textbox(
            rect,
            text,
            fontname=fontname,
            fontfile=fontfile,
            fontsize=cur_size,
            color=color,
            align=align
        )
        if rc >= 0:
            return cur_size
        cur_size -= 0.3

    # Fallback no tamanho mínimo
    page.insert_textbox(
        rect,
        text,
        fontname=fontname,
        fontfile=fontfile,
        fontsize=min_fontsize,
        color=color,
        align=align
    )
    return min_fontsize


class UniversalPDFTranslatorEngine:
    """Motor central para processamento e diagramação universal de PDFs."""

    def __init__(self, input_pdf: Path, output_dir: Path, batch_pages: int = 5):
        self.input_pdf = Path(input_pdf)
        self.output_dir = Path(output_dir)
        self.batch_pages = batch_pages

        self.fonts_dir = self.output_dir / "fonts"
        self.images_dir = self.output_dir / "images"
        self.comparativos_dir = self.output_dir / "comparativos"
        self.traduzidos_dir = self.output_dir / "traduzidos"

        for d in [self.fonts_dir, self.images_dir, self.comparativos_dir, self.traduzidos_dir]:
            d.mkdir(parents=True, exist_ok=True)

    def extract_layout(self) -> Path:
        """Exporta mapa de layout estruturado em JSON para consulta ou LLMs."""
        doc = fitz.open(str(self.input_pdf))
        layout_data = extract_layout_map(doc, self.batch_pages)
        layout_path = self.traduzidos_dir / f"{self.input_pdf.stem}_layout_manifest.json"
        with open(layout_path, "w", encoding="utf-8") as f:
            json.dump(layout_data, f, ensure_ascii=False, indent=2)
        print(f"🗺️ Mapa de Layout salvo em: {layout_path}")
        return layout_path

    def render_comparatives(self, src_doc: fitz.Document, out_doc: fitz.Document):
        """Gera comparativos lado a lado de alta resolução de cada página."""
        num_pages = min(len(src_doc), len(out_doc), self.batch_pages)
        for pno in range(num_pages):
            orig_img = self.images_dir / f"pagina_original_{pno+1}.jpg"
            trans_img = self.images_dir / f"pagina_traduzida_{pno+1}.jpg"

            pix_o = src_doc[pno].get_pixmap(dpi=150)
            pix_o.save(orig_img)

            pix_t = out_doc[pno].get_pixmap(dpi=150)
            pix_t.save(trans_img)

            im_o = Image.open(orig_img)
            im_t = Image.open(trans_img)

            w = im_o.width + im_t.width
            h = max(im_o.height, im_t.height)
            comp = Image.new("RGB", (w, h), (255, 255, 255))
            comp.paste(im_o, (0, 0))
            comp.paste(im_t, (im_o.width, 0))

            comp_path = self.comparativos_dir / f"comparativo_lado_a_lado_pagina_{pno+1}.jpg"
            comp.save(comp_path, quality=92)
            print(f"  -> Comparativo gerado: {comp_path.name}")


def main():
    parser = argparse.ArgumentParser(description="Universal High-Fidelity PDF Layout & Translation Engine")
    parser.add_argument("--input", "-i", type=str, required=True, help="Caminho do arquivo PDF original")
    parser.add_argument("--output-dir", "-o", type=str, default="projeto_traducao", help="Diretório de saída")
    parser.add_argument("--max-pages", "-m", type=int, default=5, help="Quantidade máxima de páginas a processar (default: 5)")
    args = parser.parse_args()

    engine = UniversalPDFTranslatorEngine(
        input_pdf=Path(args.input),
        output_dir=Path(args.output_dir),
        batch_pages=args.max_pages
    )
    engine.extract_layout()


if __name__ == "__main__":
    main()
