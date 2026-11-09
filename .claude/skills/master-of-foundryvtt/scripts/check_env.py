#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Environment & Hardware Verifier (CPU, RAM, GPU & VRAM) for Master of Foundry VTT.
Verificador de ambiente e hardware (CPU, RAM, GPU e VRAM) para a Skill Master of Foundry VTT.
"""
import os
import shutil
import sys
from pathlib import Path

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

sys.path.insert(0, str(Path(__file__).resolve().parent))
from hardware_governor import calculate_safe_budget


def check_foundry_data_paths():
    found_paths = []

    if sys.platform == "win32":
        local_app = os.environ.get("LOCALAPPDATA", "")
        if local_app:
            p = Path(local_app) / "FoundryVTT" / "Data"
            if p.exists():
                found_paths.append(str(p))
    elif sys.platform == "darwin":
        p = Path.home() / "Library" / "Application Support" / "FoundryVTT" / "Data"
        if p.exists():
            found_paths.append(str(p))
    else:
        p = Path.home() / ".local" / "share" / "FoundryVTT" / "Data"
        if p.exists():
            found_paths.append(str(p))

    custom_env = os.environ.get("FOUNDRY_DATA_PATH") or os.environ.get("FOUNDRY_VTT_DATA")
    if custom_env and Path(custom_env).exists() and custom_env not in found_paths:
        found_paths.append(custom_env)

    return found_paths


def main():
    budget = calculate_safe_budget()
    c = budget["cpu"]
    r = budget["ram"]
    g = budget["primary_gpu"]
    lim = budget["limits"]
    wgl = budget["foundry_vram_canvas_budget"]

    print("=================================================================")
    print("DIAGNOSTICO DE AMBIENTE & HARDWARE: MASTER OF FOUNDRY VTT")
    print("=================================================================\n")

    print("1. Hardware da Maquina Operante & Orcamento Anti-Travamento:")
    print(f"   - Processador (CPU) : {c['model']} ({c['logical_cores']} nucleos logicos)")
    print(f"   - Memoria RAM       : {r['available_gb']} GB livres de {r['total_gb']} GB ({r['used_percent']}% em uso)")
    print(
        f"   - GPU / VRAM        : {g['name']} | {g['vram_total_mb']} MB VRAM "
        f"({'Integrada / Compartilhada' if g['is_integrated'] else 'Dedicada'})"
    )
    print(f"   - Perfil de Uso     : {lim['profile_tier']}")
    print(
        f"   - Limites Seguros   : {lim['max_workers']} worker(s) | "
        f"FFmpeg threads: {lim['ffmpeg_threads']} | Lote: {lim['batch_size']} | Pausa: {lim['batch_delay_ms']}ms"
    )
    print(
        f"   - Orcamento WebGL   : Mapas ate {wgl['max_recommended_map_resolution_px']} px | "
        f"Ate {wgl['max_concurrent_webm_animated_tiles']} tiles WebM simultaneos\n"
    )

    print("2. Runtimes & Ferramentas de Desenvolvimento:")
    print(f"   - Python: {sys.version.split()[0]} ({sys.executable})")

    node = shutil.which("node")
    npx = shutil.which("npx")
    git = shutil.which("git")
    gh = shutil.which("gh")
    print(f"   - Node.js    : {'Encontrado (' + node + ')' if node else 'Nao encontrado no PATH'}")
    print(f"   - NPX        : {'Encontrado (' + npx + ')' if npx else 'Nao encontrado no PATH'}")
    print(f"   - Git        : {'Encontrado (' + git + ')' if git else 'Nao encontrado no PATH'}")
    print(f"   - GitHub CLI : {'Encontrado (' + gh + ')' if gh else 'Nao encontrado no PATH (winget install GitHub.cli / brew install gh)'}")
    if gh:
        import subprocess
        try:
            gh_res = subprocess.run(["gh", "auth", "status"], capture_output=True, text=True, encoding="utf-8")
            if gh_res.returncode == 0:
                print("   - GitHub Auth: Conectado e autenticado.")
            else:
                print("   - GitHub Auth: Nao autenticado -> Execute `gh auth login` para conectar sua conta.")
        except Exception:
            pass

    print("\n3. Deteccao de Pastas de Dados do Foundry VTT:")
    data_paths = check_foundry_data_paths()
    if data_paths:
        for path in data_paths:
            print(f"   - Pasta de Dados Detectada: {path}")
            modules_dir = Path(path) / "modules"
            systems_dir = Path(path) / "systems"
            worlds_dir = Path(path) / "worlds"
            print(f"     |-- Modulos : {'Existe' if modules_dir.exists() else 'Nao encontrada'}")
            print(f"     |-- Sistemas: {'Existe' if systems_dir.exists() else 'Nao encontrada'}")
            print(f"     +-- Mundos  : {'Existe' if worlds_dir.exists() else 'Nao encontrada'}")
    else:
        print("   - Nenhuma pasta padrao de dados do Foundry VTT encontrada localmente.")
        print("     (Se estiver em caminho customizado, Docker ou nuvem, informe FOUNDRY_DATA_PATH ou URL).")

    print("\n4. Ferramentas de Linha de Comando (CLI):")
    fvtt_cli = shutil.which("fvtt")
    world_cli = shutil.which("fvtt-world-cli")
    print(f"   - @foundryvtt/foundryvtt-cli: {'Encontrado (' + fvtt_cli + ')' if fvtt_cli else 'Disponivel via npx @foundryvtt/foundryvtt-cli'}")
    print(f"   - fvtt-world-cli            : {'Encontrado (' + world_cli + ')' if world_cli else 'Disponivel via npx fvtt-world-cli'}")

    print("\n5. Servidor MCP Nativo Oficial:")
    print("   - master-of-foundryvtt-mcp (mcp/foundry_mcp_server.js): Pronto para execucao unificada.")
    print("\nDiagnostico concluido com sucesso.")


if __name__ == "__main__":
    main()
