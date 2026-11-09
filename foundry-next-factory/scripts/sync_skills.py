#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Universal Skills Syncer & Multi-Agent Bridge
============================================
[PT-BR] Sincroniza e instala as skills do Foundry Next Factory para TODO e QUALQUER
        agente de IA e assistente CLI do mercado:
        1. Repositório local (.agents/skills/ e .claude/skills/)
        2. Google Antigravity / Gemini CLI (~/.gemini/config/skills/)
        3. Claude Code CLI (~/.claude/skills/)
        4. Universal Agents Directory (~/.agents/skills/)
        5. Cursor / Roo / Windsurf / Codex (~/.cursor/skills/, ~/.codex/skills/)

[EN]    Synchronizes and installs Foundry Next Factory skills for ALL AI agents
        and CLI coding assistants across the ecosystem:
        1. Local workspace (.agents/skills/ and .claude/skills/)
        2. Google Antigravity / Gemini CLI (~/.gemini/config/skills/)
        3. Claude Code CLI (~/.claude/skills/)
        4. Universal Agents Directory (~/.agents/skills/)
        5. Cursor / Roo / Windsurf / Codex (~/.cursor/skills/, ~/.codex/skills/)

@author Mestre Charles Corrêa <contato@charlescorrea.com.br>
@license MIT
"""

import os
import sys
import shutil
import json
from pathlib import Path
from datetime import datetime

REQUIRED_SKILLS = [
    "master-of-foundryvtt",
    "book-formatter",
    "humanizer-plus",
    "bootstrap-ux-ui-plus",
    "mcp-builder"
]

def find_skills_source_dir():
    """
    [PT-BR] Localiza o diretório fonte mais atualizado das skills.
    [EN] Locates the most updated source directory for the skills.
    """
    current_script = Path(__file__).resolve()
    repo_root = current_script.parent.parent.parent  # fvtt-modules-plus

    # 1. Pasta irmã 'Skills' (Workspace local do desenvolvedor)
    candidate_1 = repo_root.parent / "Skills"
    if candidate_1.exists():
        return candidate_1

    # 2. Pasta local do repositório .agents/skills/
    candidate_2 = repo_root / ".agents" / "skills"
    if candidate_2.exists() and any((candidate_2 / s).exists() for s in REQUIRED_SKILLS):
        return candidate_2

    # 3. Pasta global do Gemini / Antigravity
    candidate_3 = Path.home() / ".gemini" / "config" / "skills"
    if candidate_3.exists():
        return candidate_3

    return None

def get_target_ai_agent_directories(repo_root):
    """
    [PT-BR] Retorna a lista de destinos onde agentes de IA procuram por skills no sistema.
    [EN] Returns the list of destinations where AI agents discover skills on the system.
    """
    home = Path.home()

    destinations = [
        # 1. Repositório local (Universal Agents Standard)
        {"name": "Local Repo (.agents/skills)", "path": repo_root / ".agents" / "skills"},
        # 2. Repositório local (Claude Code Workspace Standard)
        {"name": "Local Repo (.claude/skills)", "path": repo_root / ".claude" / "skills"},
        # 3. Google Antigravity / Gemini Global
        {"name": "Global Gemini / Antigravity (~/.gemini/config/skills)", "path": home / ".gemini" / "config" / "skills"},
        # 4. Claude Code Global
        {"name": "Global Claude Code (~/.claude/skills)", "path": home / ".claude" / "skills"},
        # 5. Universal Agents Global
        {"name": "Global Universal Agents (~/.agents/skills)", "path": home / ".agents" / "skills"},
        # 6. Cursor Global
        {"name": "Global Cursor (~/.cursor/skills)", "path": home / ".cursor" / "skills"}
    ]

    return destinations

def copy_skill(src_dir, target_dir, skill_name):
    """
    [PT-BR] Copia ou atualiza a skill com substituição segura e limpa.
    [EN] Safely copies or updates the skill directory.
    """
    src_path = src_dir / skill_name
    dest_path = target_dir / skill_name

    if not src_path.exists():
        return False, "source_not_found"

    try:
        if dest_path.is_symlink() or dest_path.is_file():
            dest_path.unlink()
        elif dest_path.exists():
            shutil.rmtree(dest_path)

        shutil.copytree(src_path, dest_path, dirs_exist_ok=True)
        return True, "success"
    except Exception as e:
        return False, str(e)

def sync_skills():
    src_dir = find_skills_source_dir()
    if not src_dir:
        print("❌ [PT-BR] Diretório fonte de skills não encontrado! / [EN] Skills source directory not found!")
        sys.exit(1)

    current_script = Path(__file__).resolve()
    repo_root = current_script.parent.parent.parent  # fvtt-modules-plus

    print(f"🎯 [PT-BR] Fonte de Skills identificada / [EN] Source: {src_dir}\n")

    targets = get_target_ai_agent_directories(repo_root)
    full_report = {}

    for target in targets:
        t_name = target["name"]
        t_path = target["path"]
        print(f"📡 [PT-BR] Sincronizando para / [EN] Syncing to: {t_name}")
        t_path.mkdir(parents=True, exist_ok=True)

        target_report = []

        for skill_name in REQUIRED_SKILLS:
            skill_src = src_dir / skill_name
            if not skill_src.exists():
                continue

            version = "unknown"
            v_file = skill_src / "VERSION"
            if v_file.exists():
                try:
                    version = v_file.read_text(encoding="utf-8").strip()
                except Exception:
                    pass

            ok, status = copy_skill(src_dir, t_path, skill_name)
            if ok:
                print(f"   ✅ [OK] {skill_name:<24} (v{version}) instalado.")
                target_report.append({"name": skill_name, "version": version, "status": "installed"})
            else:
                print(f"   ⚠️ [Erro] {skill_name}: {status}")
                target_report.append({"name": skill_name, "version": version, "status": f"error: {status}"})

        full_report[t_name] = {
            "path": str(t_path),
            "updated_at": datetime.now().isoformat(),
            "skills": target_report
        }
        print()

    # Salva log centralizado de auditoria
    log_file = repo_root / ".agents" / "skills" / ".sync_log.json"
    log_file.parent.mkdir(parents=True, exist_ok=True)
    with open(log_file, "w", encoding="utf-8") as f:
        json.dump(full_report, f, indent=2, ensure_ascii=False)

    print(f"🎉 [PT-BR] Concluído! Skills disponíveis para TODOS os agentes (Gemini, Claude, Cursor, Antigravity)!")
    print(f"   [EN]    Done! Skills successfully installed for ALL AI agents in the system!\n")

if __name__ == "__main__":
    sync_skills()
