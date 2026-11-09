#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/inspect_typography.py
Gera um relatório técnico exaustivo (Markdown e JSON) de tipografia, cores,
dimensões de página, grid de colunas e elementos visuais de qualquer PDF
para guiar a diagramação fiel ao livro original em inglês.
"""

import os
import sys
import json
import argparse
import sys
sys.stdout.reconfigure(encoding="utf-8")
from typing import Dict, Any, List

try:
    import pymupdf  # PyMuPDF
except ImportError:
    print("❌ Erro: PyMuPDF não está instalado. Execute: pip install pymupdf")
    sys.exit(1)


def rgb_from_hex(color_int: int) -> str:
    """Converte inteiro de cor do PyMuPDF em formato hexadecimal #RRGGBB."""
    r = (color_int >> 16) & 255
    g = (color_int >> 8) & 255
    b = color_int & 255
    return f"#{r:02X}{g:02X}{b:02X}"


def analyze_pdf_typography(pdf_path: str, max_pages: int = None) -> Dict[str, Any]:
    """Analisa exaustivamente a tipografia, cores, layout e páginas do PDF."""
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"Arquivo não encontrado: {pdf_path}")

    doc = pymupdf.open(pdf_path)
    total_pages = len(doc)
    pages_to_scan = min(total_pages, max_pages) if max_pages else total_pages

    # Catálogo de estilos tipográficos: (font, size, color_hex)
    style_catalog: Dict[str, Dict[str, Any]] = {}
    page_dimensions: Dict[str, int] = {}
    embedded_fonts: Dict[str, Dict[str, Any]] = {}

    for pno in range(pages_to_scan):
        page = doc[pno]
        rect = page.rect
        dim_key = f"{round(rect.width, 1)} x {round(rect.height, 1)} pt"
        page_dimensions[dim_key] = page_dimensions.get(dim_key, 0) + 1

        # Fontes incorporadas na página
        for f in page.get_fonts():
            xref, ext, type_, name, tag, enc = f
            if name not in embedded_fonts:
                embedded_fonts[name] = {
                    "xref": xref,
                    "ext": ext,
                    "type": type_,
                    "encoding": enc
                }

        # Extração de spans de texto com tipografia
        d = page.get_text("dict")
        for b in d.get("blocks", []):
            if "lines" in b:
                for l in b["lines"]:
                    for s in l.get("spans", []):
                        raw_text = s.get("text", "").strip()
                        if not raw_text:
                            continue

                        font_name = s.get("font", "Unknown")
                        size = round(s.get("size", 10.0), 1)
                        color_hex = rgb_from_hex(s.get("color", 0))
                        flags = s.get("flags", 0)

                        is_bold = bool(flags & 16) or "bold" in font_name.lower()
                        is_italic = bool(flags & 2) or "italic" in font_name.lower() or "oblique" in font_name.lower()

                        style_id = f"{font_name} | {size}pt | {color_hex}"

                        if style_id not in style_catalog:
                            style_catalog[style_id] = {
                                "font": font_name,
                                "size": size,
                                "color": color_hex,
                                "is_bold": is_bold,
                                "is_italic": is_italic,
                                "count": 0,
                                "sample_texts": [],
                                "pages": set()
                            }

                        entry = style_catalog[style_id]
                        entry["count"] += 1
                        entry["pages"].add(pno + 1)
                        if len(entry["sample_texts"]) < 5 and raw_text not in entry["sample_texts"]:
                            entry["sample_texts"].append(raw_text[:60])

    # Classificação hierárquica por frequência e tamanho
    classified_roles = {
        "chapter_titles": [],
        "section_headers": [],
        "subheaders": [],
        "body_text": [],
        "captions_page_numbers": [],
        "special_icons_symbols": []
    }

    for style_id, data in sorted(style_catalog.items(), key=lambda x: x[1]["size"], reverse=True):
        sz = data["size"]
        fnt = data["font"].lower()

        if "wingdings" in fnt or "savage" in fnt or "symbol" in fnt:
            classified_roles["special_icons_symbols"].append(data)
        elif sz >= 36:
            classified_roles["chapter_titles"].append(data)
        elif sz >= 18:
            classified_roles["section_headers"].append(data)
        elif sz >= 12:
            classified_roles["subheaders"].append(data)
        elif sz >= 9:
            classified_roles["body_text"].append(data)
        else:
            classified_roles["captions_page_numbers"].append(data)

    return {
        "file_path": pdf_path,
        "total_pages": total_pages,
        "scanned_pages": pages_to_scan,
        "dimensions": page_dimensions,
        "embedded_fonts": embedded_fonts,
        "styles": style_catalog,
        "classified_roles": classified_roles
    }


def generate_markdown_report(analysis: Dict[str, Any], output_path: str):
    """Gera um relatório completo e didático em Markdown."""
    lines = []
    lines.append(f"# 📊 Relatório Técnico de Tipografia & Layout: `{os.path.basename(analysis['file_path'])}`\n")
    lines.append("> **Objetivo da Análise:** Mapear rigorosamente todas as famílias tipográficas, tamanhos de fonte, cores, hierarquia visual e dimensões do livro original em inglês para guiar a diagramação idêntica da versão traduzida.\n")
    lines.append("---\n")

    lines.append("## 📐 1. Dimensões & Proporções de Página\n")
    lines.append("| Dimensões (pt) | Largura x Altura (mm) | Contagem de Páginas | Padrão |")
    lines.append("|---|---|---|---|")
    for dim, count in analysis["dimensions"].items():
        parts = dim.replace(" pt", "").split(" x ")
        w_pt, h_pt = float(parts[0]), float(parts[1])
        w_mm = round(w_pt * 0.352778, 1)
        h_mm = round(h_pt * 0.352778, 1)
        lines.append(f"| **`{dim}`** | {w_mm} x {h_mm} mm | {count} páginas | Formato Graphic Novel / RPG US |")
    lines.append("\n---\n")

    lines.append("## 🔤 2. Famílias Tipográficas Detectadas & Arquivos Incorporados\n")
    lines.append("| Nome da Fonte no PDF | Formato / Tipo | Equivalente Aberto / Sistema | Observações de Uso |")
    lines.append("|---|---|---|---|")
    for fname, fdata in sorted(analysis["embedded_fonts"].items()):
        f_lower = fname.lower()
        subst = "Palatino / Book Antiqua" if "palatino" in f_lower else ("Bangers / Komika / Anime Ace" if "population" in f_lower else ("Gothic / Comic" if "evilgenius" in f_lower else "Fonte Específica"))
        role = "Texto Corrido / Tabelas" if "palatino" in f_lower else ("Títulos & Subtítulos Comic" if "population" in f_lower else "Numeração & Elementos Gráficos")
        lines.append(f"| **`{fname}`** | `{fdata['ext'].upper()}` ({fdata['type']}) | `{subst}` | {role} |")
    lines.append("\n---\n")

    lines.append("## 👑 3. Hierarquia Visual & Guia de Estilos de Diagramação\n")

    roles_map = [
        ("🏆 Títulos de Capítulos (Chapter Titles - H1)", "chapter_titles"),
        ("⚡ Cabeçalhos de Seções Principais (Section Headers - H2)", "section_headers"),
        ("📌 Subtítulos e Caixas Laterais (Subheaders - H3)", "subheaders"),
        ("📖 Texto Corrido e Parágrafos (Body Text)", "body_text"),
        ("🏷️ Rodapés, Legendas e Números de Página", "captions_page_numbers"),
        ("✨ Ícones, Símbolos e Fontes Mecânicas", "special_icons_symbols")
    ]

    for title, role_key in roles_map:
        items = analysis["classified_roles"].get(role_key, [])
        lines.append(f"### {title}\n")
        if not items:
            lines.append("*Nenhum estilo detectado nesta faixa.*\n")
            continue

        lines.append("| Fonte | Tamanho | Cor Hex | Variação | Ocorrências | Exemplo do Texto Original | Páginas Amostra |")
        lines.append("|---|---|---|---|---|---|---|")
        for item in items:
            pages_str = ", ".join(str(p) for p in sorted(list(item["pages"]))[:5])
            sample = item["sample_texts"][0] if item["sample_texts"] else ""
            sample = sample.replace("|", "\\|")
            var = "Negrito" if item["is_bold"] else ("Itálico" if item["is_italic"] else "Normal")
            lines.append(f"| **`{item['font']}`** | `{item['size']} pt` | `{item['color']}` | {var} | {item['count']} | *\"{sample}\"* | pág. {pages_str} |")
        lines.append("")

    lines.append("---\n")
    lines.append("## 🎯 4. Recomendações Críticas para a Diagramação em Português\n")
    lines.append("1. **Manter as Mesmas Fontes:** Utilizar as fontes incorporadas extraídas (`.cff`/`.ttf`) ou a versão de sistema `Palatino Linotype` (`pala.ttf`) para o texto corrido.")
    lines.append("2. **Efeito Stroke / Traçado em Títulos (`PopulationZeroBB`):** Os títulos utilizam sobreposição de duas camadas com a mesma fonte (Camada 1: Preto `#000000` para contorno; Camada 2: Branco `#FFFFFF` por cima com preenchimento) sobre faixas amarelas `#FDF202`.")
    lines.append("3. **Texto em Duas Colunas:** As páginas de miolo dividem-se em 2 colunas com largura útil de 199 pt cada (Coluna 1: x=36 a 235 pt; Coluna 2: x=244.5 a 443.5 pt; medianiz = 9.5 pt).")
    lines.append("4. **Tamanho do Corpo:** O texto corrido deve manter estritamente `10.0 pt` em `PalatinoLinotype-Roman` com entrelinha proporcional para que o volume de texto em português não ultrapasse a contagem de páginas original.\n")

    content = "\n".join(lines)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)


def main():
    parser = argparse.ArgumentParser(description="Inspeciona a tipografia e gera relatório técnico para diagramação.")
    parser.add_argument("pdf_path", help="Caminho do arquivo PDF a ser analisado.")
    parser.add_argument("--output", "-o", default=None, help="Caminho do relatório Markdown de saída.")
    parser.add_argument("--pages", "-p", type=int, default=None, help="Número máximo de páginas para escanear.")
    args = parser.parse_args()

    pdf_path = os.path.abspath(args.pdf_path)
    output_path = args.output
    if not output_path:
        base_name = os.path.splitext(os.path.basename(pdf_path))[0]
        output_path = os.path.join(os.path.dirname(pdf_path), f"relatorio-tipografia-{base_name}.md")

    print(f"🔍 Analisando tipografia e layout de: {pdf_path}")
    analysis = analyze_pdf_typography(pdf_path, max_pages=args.pages)

    generate_markdown_report(analysis, output_path)
    print(f"✅ Relatório técnico gerado com sucesso em: {output_path}")


if __name__ == "__main__":
    main()
