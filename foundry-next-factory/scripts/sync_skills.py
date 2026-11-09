#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Skills Syncer & Daily Auto-Updater
=================================
[PT-BR] Sincroniza e monitora diariamente o ecossistema de skills para o repositório fvtt-modules-plus:
        - master-of-foundryvtt
        - book-formatter
        - humanizer-plus
        - bootstrap-ux-ui-plus
        - mcp-builder

        Copia ou atualiza em .agents/skills/ e verifica datas e versões automaticamente.

[EN]    Synchronizes and daily monitors the AI skills ecosystem for the fvtt-modules-plus repository:
        - master-of-foundryvtt
        - book-formatter
        - humanizer-plus
        - bootstrap-ux-ui-plus
        - mcp-builder

        Copies or updates into .agents/skills/ and tracks timestamps and semantic versions.

@author Mestre Charles Corrêa <contato@charlescorrea.com.br>
@license MIT
"""

import os
import sys
import shutil
import time
from pathlib import Path
from datetime import datetime

# Lista de skills obrigatórias para o ecossistema / List of required skills
REQUIRED_SKILLS = [
    "master-of-foundryvtt",
    "book-formatter",
    "humanizer-plus",
    "bootstrap-ux-ui-plus",
    "mcp-builder"
]

def find_skills_source_dir():
    """
    [PT-BR] Localiza a pasta fonte das skills (prioriza local ou global do usuário no OS).
    [EN] Locates the skills source directory (prioritizes local workspace or user OS global path).
    """
    current_script = Path(__file__).resolve()
    repo_root = current_script.parent.parent.parent  # fvtt-modules-plus

    # 1. Caminho relativo multiplataforma (pasta paralela 'Skills' ou repositório pai)
    #    Cross-platform relative path (sibling 'Skills' directory or parent repo)
    candidate_1 = repo_root.parent / "Skills"
    if candidate_1.exists():
        return candidate_1
    
    # 2. Caminho global do Gemini / Antigravity (independente de OS: Windows, macOS, Linux)
    #    Global Antigravity / Gemini skills path (~/.gemini/config/skills)
    candidate_2 = Path.home() / ".gemini" / "config" / "skills"
    if candidate_2.exists():
        return candidate_2

    # 3. Fallback: subpasta de skills interna caso já exista
    #    Fallback: internal skills folder if already populated
    candidate_3 = repo_root / ".agents" / "skills"
    if candidate_3.exists():
        return candidate_3

    return None

def sync_skills():
    """
    [PT-BR] Executa a sincronização e registra o log diário em .sync_log.json.
    [EN] Runs synchronization and saves daily execution log into .sync_log.json.
    """
    src_dir = find_skills_source_dir()
    if not src_dir:
        print("❌ [PT-BR] Diretório fonte de skills não encontrado! / [EN] Skills source directory not found!")
        sys.exit(1)

    # Destino em .agents/skills/ na raiz do repositório / Destination at repo root
    current_script = Path(__file__).resolve()
    repo_root = current_script.parent.parent.parent  # fvtt-modules-plus
    target_agents_skills = repo_root / ".agents" / "skills"
    target_agents_skills.mkdir(parents=True, exist_ok=True)

    print(f"🎯 [PT-BR] Sincronizando de / [EN] Syncing from: {src_dir}")
    print(f"📂 [PT-BR] Destino / [EN] Destination: {target_agents_skills}\n")

    report = []

    for skill_name in REQUIRED_SKILLS:
        skill_src = src_dir / skill_name
        skill_dest = target_agents_skills / skill_name

        if not skill_src.exists():
            print(f"⚠️ [PT-BR] Skill não encontrada na fonte / [EN] Skill not found at source: {skill_name}")
            continue

        # Ler versão se existir / Read version if available
        version = "unknown"
        v_file = skill_src / "VERSION"
        if v_file.exists():
            try:
                version = v_file.read_text(encoding="utf-8").strip()
            except Exception:
                pass

        # Realizar cópia / sincronização / Perform file sync
        try:
            if skill_dest.exists():
                shutil.rmtree(skill_dest)
            shutil.copytree(skill_src, skill_dest)
            print(f"✅ [OK] {skill_name:<25} (v{version}) [PT-BR] sincronizada / [EN] synced.")
            report.append({"name": skill_name, "version": version, "status": "synced"})
        except Exception as e:
            print(f"❌ [PT-BR] Erro ao sincronizar / [EN] Error syncing {skill_name}: {e}")
            report.append({"name": skill_name, "version": version, "status": f"error: {e}"})

    # Gravar log de sincronização diária / Save daily audit log
    log_file = target_agents_skills / ".sync_log.json"
    import json
    log_data = {
        "last_sync": datetime.now().isoformat(),
        "source": str(src_dir),
        "skills": report
    }
    with open(log_file, "w", encoding="utf-8") as f:
        json.dump(log_data, f, indent=2, ensure_ascii=False)

    print(f"\n🎉 [PT-BR] Sincronização concluída! Log salvo em: {log_file}")
    print(f"   [EN]    Sync completed! Log saved to: {log_file}")

if __name__ == "__main__":
    sync_skills()
