#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
batch_convert_to_md_jsonl.py
Motor Universal de Conversão de PDFs para Markdown Estruturado, TXT e Datasets JSONL (RAG / Treinamento).
"""

import sys
from pathlib import Path

# Adicionar pasta scripts ao sys.path para import local
scripts_dir = Path(__file__).resolve().parent
if str(scripts_dir) not in sys.path:
    sys.path.insert(0, str(scripts_dir))

from batch_convert_swade_to_md_jsonl import (
    main,
    generate_jsonl_chunks,
    extract_pdf_to_markdown,
    convert_pdf_file,
    dehyphenate_text,
    sanitize_text,
)

if __name__ == "__main__":
    main()
