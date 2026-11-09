#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de verificação de versão e atualização automática da Skill 'book-formatter'.
Compara a versão local instalada com a versão publicada no repositório remoto
(https://github.com/CharlesCorreaDev/skills-ai) e oferece atualização automática.
"""

import sys
import os
import subprocess
from pathlib import Path
import urllib.request
import re

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

REPO_RAW_VERSION_URL = "https://raw.githubusercontent.com/CharlesCorreaDev/skills-ai/main/book-formatter/VERSION"
SKILL_DIR = Path(__file__).resolve().parent.parent
LOCAL_VERSION_FILE = SKILL_DIR / "VERSION"

def parse_semver(ver_str: str):
    """Extrai tupla numérica de versão ignorando sufixos como -beta."""
    clean = ver_str.strip().lstrip("v")
    m = re.match(r"^(\d+)\.(\d+)\.(\d+)", clean)
    if m:
        return tuple(int(x) for x in m.groups()), clean
    return (0, 0, 0), clean

def get_local_version() -> str:
    if LOCAL_VERSION_FILE.exists():
        return LOCAL_VERSION_FILE.read_text(encoding="utf-8").strip()
    return "0.0.0"

def get_remote_version() -> str | None:
    try:
        req = urllib.request.Request(
            REPO_RAW_VERSION_URL,
            headers={"User-Agent": "book-formatter-update-checker/1.0"}
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            if resp.status == 200:
                return resp.read().decode("utf-8").strip()
    except Exception as e:
        return None
    return None

def update_skill() -> bool:
    """Executa atualização automática puxando as alterações via Git."""
    print("\n🔄 Iniciando atualização automática via Git...")
    try:
        repo_root = SKILL_DIR.parent
        res = subprocess.run(
            ["git", "-C", str(repo_root), "pull", "origin", "main"],
            capture_output=True, text=True, encoding="utf-8"
        )
        if res.returncode == 0:
            print("✅ Atualização concluída com sucesso:")
            print(res.stdout.strip())
            new_ver = get_local_version()
            print(f"🎉 book-formatter agora está na versão: {new_ver}")
            return True
        else:
            print(f"❌ Falha ao atualizar via git pull: {res.stderr.strip()}")
            return False
    except Exception as e:
        print(f"❌ Erro ao executar atualização: {e}")
        return False

def check_updates(auto_upgrade=False) -> dict:
    local_ver = get_local_version()
    remote_ver = get_remote_version()

    local_tuple, local_clean = parse_semver(local_ver)
    status = {
        "local": local_ver,
        "remote": remote_ver,
        "update_available": False,
        "updated": False
    }

    print("=========================================================")
    print("📢 Monitor de Versão da Skill: Book Formatter")
    print(f"   Versão Local Instalada : v{local_ver}")

    if not remote_ver:
        print("   Versão Remota (GitHub) : ⚠️ Não foi possível consultar o repositório remoto.")
        print("=========================================================")
        return status

    remote_tuple, remote_clean = parse_semver(remote_ver)
    print(f"   Versão Remota Publicada: v{remote_ver}")
    print("=========================================================")

    if remote_tuple > local_tuple or (remote_tuple == local_tuple and "-beta" not in remote_ver and "-beta" in local_ver):
        status["update_available"] = True
        print(f"\n🚀 NOVA VERSÃO DISPONÍVEL! (v{local_ver} -> v{remote_ver})")
        print("   O repositório oficial possui melhorias, novos glossários ou correções.")

        if auto_upgrade:
            status["updated"] = update_skill()
        else:
            print("\n💡 Para atualizar automaticamente execute:")
            print(f"   python \"{Path(__file__).resolve()}\" --upgrade")
    else:
        print(f"\n✅ A skill já está atualizada na versão mais recente (v{local_ver}).")

    return status

def main():
    auto_upgrade = "--upgrade" in sys.argv or "-u" in sys.argv
    check_updates(auto_upgrade=auto_upgrade)

if __name__ == "__main__":
    main()

