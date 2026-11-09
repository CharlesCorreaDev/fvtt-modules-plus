#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
patch_save.py
Utilitário multiplataforma (Windows / Linux / macOS) para garantir salvamento resiliente de PDFs.
Quando o arquivo PDF de destino estiver bloqueado em um leitor/visualizador (como Acrobat,
WPS Office, navegador ou Evince), salva automaticamente em um arquivo alternativo limpo,
evitando falhas por 'Permission denied' ou bloqueio de I/O de arquivo em qualquer OS.
"""

import sys
from pathlib import Path


def safe_save_pdf(doc, target_path: Path, alt_name: str = None, garbage: int = 4, deflate: bool = True) -> Path:
    """
    Salva um documento PyMuPDF de forma segura em qualquer sistema operacional.
    
    Args:
        doc: Objeto pymupdf.Document aberto.
        target_path: Path do arquivo de destino planejado.
        alt_name: Nome alternativo em caso de arquivo travado.
        garbage: Nível de coleta de lixo do PyMuPDF (default: 4).
        deflate: Compressão de fluxos (default: True).
        
    Returns:
        Path do arquivo onde o PDF foi efetivamente salvo com sucesso.
    """
    target_path = Path(target_path)
    target_path.parent.mkdir(parents=True, exist_ok=True)
    
    try:
        doc.save(str(target_path), garbage=garbage, deflate=deflate)
        print(f"Salvo com sucesso em: {target_path}")
        return target_path
    except Exception as err:
        if alt_name is None:
            alt_name = f"{target_path.stem}-novo{target_path.suffix}"
        alt_path = target_path.parent / alt_name
        doc.save(str(alt_path), garbage=garbage, deflate=deflate)
        print(f"Aviso: O arquivo '{target_path.name}' estava travado no visualizador ({err}).")
        print(f"Salvo com sucesso no destino alternativo: {alt_path}")
        return alt_path


if __name__ == "__main__":
    print("Módulo safe_save_pdf pronto para importação universal em qualquer OS.")

