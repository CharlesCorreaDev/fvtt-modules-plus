#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de conversão de documentos para TXT / Markdown multiplataforma (Windows, Linux, macOS)
usando Microsoft MarkItDown — motor principal da Skill 'book-formatter'.
Integrado com a skill 'humanizer-plus' para purga automática de marcas d'água de IA,
caracteres invisíveis (ZWSP, BOM) e vícios de escrita robótica de LLMs.
"""

import sys
import os
import subprocess
from pathlib import Path
from markitdown import MarkItDown

# Garantir UTF-8 nas saídas de console (Windows, Linux, macOS)
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')


def run_humanizer_sanitize(file_path: Path):
    """Executa a higienização do humanizer-plus para remover marcas d'água de IA."""
    # Localizar scripts/sanitize.js relativo à raiz do repositório
    current_dir = Path(__file__).resolve().parent
    repo_root = current_dir.parent.parent
    humanizer_script = repo_root / "humanizer-plus" / "scripts" / "sanitize.js"

    if humanizer_script.exists():
        try:
            print(f"🧠 [Humanizer Plus] Higienizando marcas de IA em: {file_path.name}")
            subprocess.run(
                ["node", str(humanizer_script), str(file_path)],
                check=True,
                capture_output=True,
                text=True,
                encoding="utf-8"
            )
            print(f"✨ [Humanizer Plus] Texto desmarcado e humanizado com sucesso!")
        except Exception as e:
            print(f"⚠️ [Humanizer Plus] Aviso: Não foi possível executar sanitize.js ({e})")
    else:
        # Fallback Python básico se Node.js ou sanitize.js não estiver disponível
        try:
            content = file_path.read_text(encoding="utf-8")
            # Purga de ZWSP, ZWNJ, BOM e aspas curvas
            cleaned = content.replace("\ufeff", "").replace("\u200b", "").replace("\u200c", "").replace("\u200d", "")
            cleaned = cleaned.replace("“", '"').replace("”", '"').replace("‘", "'").replace("’", "'")
            if cleaned != content:
                file_path.write_text(cleaned, encoding="utf-8", newline="\n")
                print(f"✨ [Humanizer Fallback] Caracteres invisíveis e aspas sanitizados!")
        except Exception as e:
            pass


def dehyphenate_text(text: str) -> str:
    """Reconecta palavras partidas por quebra de linha ou coluna em documentos e PDFs."""
    import re
    # Caso 1: Palavra hifenizada com continuação em minúscula
    text = re.sub(r'([a-zA-Z\u00C0-\u017F]{2,})[-–—]\s*\n+\s*([a-z\u00E0-\u017F]+)', r'\1\2', text)

    # Caso 2: Segunda parte iniciando com maiúscula em palavras quebradas no meio do parágrafo
    prefixes = {'sul', 'norte', 'pré', 'pre', 'pós', 'pos', 'recém', 'recem', 'super', 'anti', 'auto', 'sub', 'macro', 'micro'}
    def merge_capitalized_hyphen(m):
        p1, p2 = m.group(1), m.group(2)
        if p1.lower() in prefixes:
            return f"{p1}-{p2}"
        return f"{p1}{p2.lower()}"

    text = re.sub(r'([a-zA-Z\u00C0-\u017F]{2,})[-–—]\s*\n+\s*([A-Z\u00C0-\u017F][a-z\u00E0-\u017F]{2,})', merge_capitalized_hyphen, text)
    return text


def deduplicate_text_lines(text: str) -> str:
    """Elimina linhas consecutivas repetidas geradas por efeitos gráficos
    de drop-shadow e contorno duplo em PDFs."""
    lines = text.splitlines()
    deduped = []
    for line in lines:
        stripped = line.strip()
        if stripped and deduped and deduped[-1].strip() == stripped:
            continue
        deduped.append(line)
    return "\n".join(deduped)


def convert_document(input_path: str, output_base_path: str = None) -> bool:
    input_file = Path(input_path).resolve()

    if not input_file.exists():
        print(f"❌ Erro: Arquivo não encontrado: '{input_file}'")
        return False

    print(f"🔄 Convertendo documento: '{input_file.name}' ({input_file.parent})")

    try:
        md = MarkItDown()
        result = md.convert(str(input_file))
        markdown_content = result.text_content if hasattr(result, 'text_content') else getattr(result, 'markdown', str(result))

        # Deduplicar linhas repetidas por efeitos de camada de sombra/contorno
        markdown_content = deduplicate_text_lines(markdown_content)

        # Desfazer hifenização quebrada em quebras de linha/coluna
        markdown_content = dehyphenate_text(markdown_content)

        # Salvar Markdown e TXT
        if output_base_path:
            base = Path(output_base_path).resolve()
            base.parent.mkdir(parents=True, exist_ok=True)
            md_file = base.with_suffix('.md')
            md_file.write_text(markdown_content, encoding='utf-8', newline='\n')
            txt_file = base.with_suffix('.txt')
            txt_file.write_text(markdown_content, encoding='utf-8', newline='\n')

            # Higienizar com humanizer-plus
            run_humanizer_sanitize(md_file)
            run_humanizer_sanitize(txt_file)

            print(f"✅ Conversão e humanização concluídas com sucesso!")
            print(f"📄 Arquivos limpos salvos em: {md_file} e {txt_file}")
        else:
            print("\n--- Conteúdo Markdown Gerado ---")
            print(markdown_content)
            print("--------------------------------")

        return True
    except Exception as e:
        print(f"❌ Erro durante a conversão: {e}")
        print("💡 Dica: Execute 'python scripts/check_env.py' para diagnosticar dependências ausentes.")
        return False


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python convert_to_txt_md.py <caminho_do_arquivo> [caminho_de_saida_base]")
        sys.exit(1)

    in_arg = sys.argv[1]
    out_arg = sys.argv[2] if len(sys.argv) > 2 else None

    success = convert_document(in_arg, out_arg)
    sys.exit(0 if success else 1)
