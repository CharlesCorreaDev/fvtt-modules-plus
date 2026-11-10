#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de segmentação e extração de regras de livros de RPG para IA, RAG e MCP.
Converte textos/PDFs de sistemas de RPG em arquivos atômicos estruturados
(JSONL / Markdown fragmentado por tópicos) para alimentar bancos vetoriais,
fine-tuning de modelos e servidores de contexto MCP.
"""

import sys
import os
import re
import json
from pathlib import Path

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

CATEGORIES = [
    ("combat", r"(combate|iniciativa|ataque|dano|defesa|armadura|cobertura|cr[íi]tico|manobras)"),
    ("spells", r"(magia|feiti[çc]o|conjura[çc][ãa]o|c[íi]rculo|componente|grim[óo]rio|disciplina|poderes)"),
    ("classes", r"(classe|arqu[ée]tipo|trilha|profiss[ãa]o|especializa[çc][ãa]o|habilidade de classe)"),
    ("character_creation", r"(cria[çc][ãa]o de personagem|atributos|ra[çc]as|ancestralidade|per[íi]cias|antecedentes)"),
    ("feats", r"(talentos|vantagens|edges|feats|dota[çc][õo]es|habilidades especiais)"),
    ("items_equipment", r"(equipamentos|armas|itens m[áa]gicos|armaduras|pre[çc]os|custos|ve[íi]culos)"),
    ("monsters_bestiary", r"(besti[áa]rio|monstros|criaturas|amea[çc]as|estat[íi]sticas|ficha de monstro)"),
    ("conditions_hazards", r"(condi[çc][õo]es|estados|venenos|doen[çc]as|fogo|queda|asfixia|sanidade)"),
    ("general_rules", r"(regras gerais|testes|dificuldade|cd|dc|modificadores|sucesso|falha)"),
]

def clean_text(text: str) -> str:
    return re.sub(r"\n{3,}", "\n\n", text).strip()

def chunk_markdown_by_headers(md_text: str):
    """Divide um arquivo Markdown em seções lógicas baseadas em cabeçalhos H1/H2/H3."""
    sections = []
    lines = md_text.splitlines()
    curr_title = "Introdução / Visão Geral"
    curr_level = 1
    curr_lines = []

    header_pattern = re.compile(r"^(#{1,3})\s+(.+)$")

    for line in lines:
        m = header_pattern.match(line)
        if m:
            if curr_lines:
                content = clean_text("\n".join(curr_lines))
                if content:
                    sections.append({
                        "title": curr_title,
                        "level": curr_level,
                        "content": content
                    })
            curr_level = len(m.group(1))
            curr_title = m.group(2).strip()
            curr_lines = [line]
        else:
            curr_lines.append(line)

    if curr_lines:
        content = clean_text("\n".join(curr_lines))
        if content:
            sections.append({
                "title": curr_title,
                "level": curr_level,
                "content": content
            })

    return sections

def classify_section(title: str, content: str) -> str:
    """Classifica a seção em uma categoria de regras de RPG."""
    sample = (title + " " + content[:400]).lower()
    for cat_name, pattern in CATEGORIES:
        if re.search(pattern, sample):
            return cat_name
    return "general_rules"


def run_humanizer_sanitize(file_path: Path):
    """Higieniza JSONL e Markdown gerados para expurgar vicios de IA."""
    current_dir = Path(__file__).resolve().parent
    repo_root = current_dir.parent.parent
    humanizer_script = repo_root / "humanizer-plus" / "scripts" / "sanitize.js"
    if humanizer_script.exists():
        try:
            import subprocess
            subprocess.run(["node", str(humanizer_script), str(file_path)], check=True, capture_output=True)
        except Exception:
            pass

def export_rules_for_ai(input_file: Path, output_dir: Path, system_name: str = "rpg_system"):
    """
    Gera arquivos segmentados em:
    1. output_dir / <system_name>_rag_chunks.jsonl (para ingestão em bancos vetoriais)
    2. output_dir / <system_name>_training_dataset.jsonl (pares instrução/resposta para fine-tuning)
    3. output_dir / categories / <category>.md (arquivos de regras isolados para MCP servers)
    """
    output_dir.mkdir(parents=True, exist_ok=True)
    cats_dir = output_dir / "categories"
    cats_dir.mkdir(parents=True, exist_ok=True)

    text = input_file.read_text(encoding="utf-8", errors="replace")
    sections = chunk_markdown_by_headers(text)

    rag_chunks = []
    tuning_examples = []
    categorized_content = {}

    for idx, sec in enumerate(sections):
        cat = classify_section(sec["title"], sec["content"])
        chunk_id = f"{system_name}_{cat}_{idx:04d}"

        # 1. RAG Chunk format
        rag_item = {
            "id": chunk_id,
            "system": system_name,
            "category": cat,
            "title": sec["title"],
            "text": sec["content"],
            "metadata": {
                "source": input_file.name,
                "length": len(sec["content"]),
                "tokens_approx": len(sec["content"]) // 4
            }
        }
        rag_chunks.append(rag_item)

        # 2. Fine-tuning instruction format
        tuning_item = {
            "messages": [
                {"role": "system", "content": f"Você é o oráculo e árbitro oficial de regras do sistema de RPG {system_name}."},
                {"role": "user", "content": f"Como funciona a regra sobre '{sec['title']}' em {system_name}?"},
                {"role": "assistant", "content": sec["content"]}
            ]
        }
        tuning_examples.append(tuning_item)

        # 3. Categorized markdown
        if cat not in categorized_content:
            categorized_content[cat] = []
        categorized_content[cat].append(f"## {sec['title']}\n\n{sec['content']}\n")

    # Salva arquivos
    rag_file = output_dir / f"{system_name}_rag_chunks.jsonl"
    with rag_file.open("w", encoding="utf-8") as f:
        for item in rag_chunks:
            f.write(json.dumps(item, ensure_ascii=False) + "\n")

    tuning_file = output_dir / f"{system_name}_training_dataset.jsonl"
    with tuning_file.open("w", encoding="utf-8") as f:
        for item in tuning_examples:
            f.write(json.dumps(item, ensure_ascii=False) + "\n")

    for cat, blocks in categorized_content.items():
        cat_file = cats_dir / f"{cat}.md"
        cat_file.write_text(f"# {system_name.upper()} - {cat.replace('_', ' ').title()}\n\n" + "\n---\n\n".join(blocks), encoding="utf-8")

    manifest = {
        "system": system_name,
        "source_file": input_file.name,
        "total_chunks": len(rag_chunks),
        "categories_generated": list(categorized_content.keys()),
        "rag_jsonl": rag_file.name,
        "training_jsonl": tuning_file.name,
        "categories_dir": "categories/"
    }
    (output_dir / "manifest_ai.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")

    # Sanitização com humanizer-plus para remover marcas de IA
    run_humanizer_sanitize(rag_file)
    run_humanizer_sanitize(tuning_file)
    for cat_f in (output_dir / "categories").glob("*.md"):
        run_humanizer_sanitize(cat_f)

    print(f"✅ Segmentação para IA e RAG concluída com sucesso:")
    print(f"   📂 Diretório: {output_dir}")
    print(f"   🧩 Chunks RAG (JSONL): {rag_file.name} ({len(rag_chunks)} fragmentos)")
    print(f"   🎯 Treinamento (JSONL): {tuning_file.name} ({len(tuning_examples)} exemplos)")
    print(f"   📚 Categorias MCP isoladas: {len(categorized_content)} arquivos em categories/")
    return manifest

def main():
    if len(sys.argv) < 3:
        print("Uso: python export_rules_for_ai.py <arquivo_livro.md_ou_txt> <diretorio_saida> [nome_do_sistema]")
        sys.exit(1)

    input_file = Path(sys.argv[1]).resolve()
    output_dir = Path(sys.argv[2]).resolve()
    system_name = sys.argv[3] if len(sys.argv) > 3 else input_file.stem

    if not input_file.exists():
        print(f"❌ Arquivo não encontrado: {input_file}")
        sys.exit(1)

    export_rules_for_ai(input_file, output_dir, system_name=system_name)

if __name__ == "__main__":
    main()

