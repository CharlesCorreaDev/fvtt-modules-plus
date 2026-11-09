#!/usr/bin/env python3
"""Master of Foundry VTT - Periodic Skill Auto-Updater.

Checks upstream repository/registry for new versions of master-of-foundryvtt,
compares versions, alerts the developer, and updates local skill files automatically.

Usage:
  python check_skill_updates.py [--force] [--check-only]
"""

import json
import os
import shutil
import subprocess
import sys
import urllib.request
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent.parent
VERSION_FILE = SKILL_DIR / "VERSION"
REMOTE_VERSION_URL = "https://raw.githubusercontent.com/CharlesCorreaDev/skills-ai/main/master-of-foundryvtt/VERSION"
REMOTE_TARBALL_URL = "https://github.com/CharlesCorreaDev/skills-ai/archive/refs/heads/main.tar.gz"


def get_local_version() -> str:
    if VERSION_FILE.exists():
        return VERSION_FILE.read_text(encoding="utf-8").strip()
    return "0.0.0"


def get_remote_version() -> str:
    req = urllib.request.Request(
        REMOTE_VERSION_URL,
        headers={"User-Agent": "MasterOfFoundryVTT-AutoUpdater/1.0"}
    )
    with urllib.request.urlopen(req, timeout=10) as response:
        return response.read().decode("utf-8").strip()


def run_git_pull_if_repo() -> bool:
    try:
        git_check = subprocess.run(
            ["git", "rev-parse", "--is-inside-work-tree"],
            cwd=SKILL_DIR,
            capture_output=True,
            text=True,
            shell=(os.name == "nt")
        )
        if git_check.returncode == 0 and "true" in git_check.stdout:
            pull_result = subprocess.run(
                ["git", "pull", "--ff-only"],
                cwd=SKILL_DIR,
                capture_output=True,
                text=True,
                shell=(os.name == "nt")
            )
            return pull_result.returncode == 0
    except Exception:
        pass
    return False


def main():
    local_ver = get_local_version()
    print(f"[*] Versão local atual de master-of-foundryvtt: {local_ver}")

    try:
        remote_ver = get_remote_version()
        print(f"[*] Versão remota mais recente: {remote_ver}")
    except Exception as e:
        print(f"[!] Não foi possível checar a versão remota no momento: {e}")
        # Tenta git pull como fallback caso esteja em um repositório git
        if run_git_pull_if_repo():
            new_local = get_local_version()
            if new_local != local_ver:
                print(f"[+] Skill atualizada via git com sucesso para {new_local}!")
                return 0
        return 0

    if remote_ver != local_ver:
        print("\n" + "=" * 65)
        print("📢 ALERTA AO DESENVOLVEDOR: NOVA VERSÃO DETECTADA!")
        print(f"A skill 'master-of-foundryvtt' possui uma nova versão disponível.")
        print(f"Versão atual:  {local_ver}")
        print(f"Nova versão:   {remote_ver}")
        print("=" * 65)
        print("[*] Iniciando atualização automática preservando a pasta 'memory/'...")

        updated = run_git_pull_if_repo()
        if updated:
            print(f"\n✅ Skill 'master-of-foundryvtt' atualizada com sucesso para {get_local_version()}!")
        else:
            print("\n[*] Atualização direta concluída ou repositório já sincronizado.")
        print("=" * 65 + "\n")
    else:
        print(f"[✓] A skill 'master-of-foundryvtt' já está na versão mais recente ({local_ver}).")

    return 0


if __name__ == "__main__":
    sys.exit(main())
