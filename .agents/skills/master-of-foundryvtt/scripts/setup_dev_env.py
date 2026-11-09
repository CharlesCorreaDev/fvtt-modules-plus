#!/usr/bin/env python3
"""Master of Foundry VTT - one-shot dev environment bootstrap.

Installs/configures (with confirmation, or --yes):
  1. REA (Reverse Engineer Anything)  -> npm: rea-agents  (github.com/morluto/rea)
  2. Foundry CLI + fvtt-world-cli     -> npm: @foundryvtt/foundryvtt-cli, fvtt-world-cli
  3. Third-party Foundry MCPs         -> cloned to ~/.master-of-foundryvtt/mcp-servers
  4. Native MCP (this skill)          -> prints config snippet
  5. Memory folder                    -> ensures memory/ exists

Usage:
  python setup_dev_env.py [--yes] [--skip rea,cli,mcp] [--data-path PATH]
The REA agent registration (`npx rea-agents setup`) is interactive and is
launched last; it backs up existing agent configs itself.
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent.parent
MCP_HOME = Path.home() / ".master-of-foundryvtt" / "mcp-servers"
THIRD_PARTY_MCPS = {
    "ninjos-foundry-mcp": "https://github.com/Niclasp1501/ninjos-foundry-mcp",
    "foundryvtt-mcp": "https://github.com/laurigates/foundryvtt-mcp",
    "foundry-vtt-mcp": "https://github.com/adambdooley/foundry-vtt-mcp",
}
IS_WIN = os.name == "nt"


def run(cmd, cwd=None):
    print(f"  $ {' '.join(cmd)}")
    try:
        return subprocess.run(cmd, cwd=cwd, shell=IS_WIN).returncode == 0
    except FileNotFoundError:
        return False


def confirm(msg, yes):
    if yes:
        return True
    return input(f"{msg} [y/N] ").strip().lower() in ("y", "yes", "s", "sim")


NOTICE = """
=== Master of Foundry VTT: componentes necessarios / required components ===
Para a skill funcionar na totalidade, serao instalados/configurados:
  - Node.js + npm, Git, Python 3.8+ (pre-requisitos)
  - REA (rea-agents): engenharia reversa do Foundry, sistemas e modulos
  - @foundryvtt/foundryvtt-cli e fvtt-world-cli
  - MCPs: ninjos-foundry-mcp, foundryvtt-mcp, foundry-vtt-mcp e o nativo master-of-foundryvtt
  - (Opcional, sob pedido) Ghidra/Hopper/IDA para binarios nativos
Ao autorizar, o agente pode instalar e configurar tudo como julgar melhor
para o desenvolvimento Foundry. Credenciais e caminhos serao perguntados.
"""


def authorize(yes):
    print(NOTICE)
    if yes:
        return True
    return confirm("Autoriza a instalacao e configuracao de tudo acima?", False)


MIN_VERSIONS = {"node": (18, 0), "npm": (9, 0), "git": (2, 30), "python": (3, 8)}


def parse_version(text):
    import re
    m = re.search(r"(\d+)\.(\d+)(?:\.(\d+))?", text or "")
    return tuple(int(x) for x in m.groups(default="0")) if m else None


def tool_version(tool):
    if tool == "python":  # the interpreter running this script, even if not on PATH
        return sys.version_info[:3], sys.executable
    path = shutil.which(tool)
    if not path:
        return None, None
    try:
        out = subprocess.run([path, "--version"], capture_output=True, text=True,
                             shell=IS_WIN, timeout=20)
        return parse_version(out.stdout + out.stderr), path
    except Exception:
        return None, path


PKG_IDS = {  # tool -> (winget id, brew formula, apt package)
    "node": ("OpenJS.NodeJS.LTS", "node", "nodejs"),
    "npm": ("OpenJS.NodeJS.LTS", "node", "npm"),
    "git": ("Git.Git", "git", "git"),
    "python": ("Python.Python.3.12", "python", "python3"),
}


def install_or_upgrade(tool):
    winget, brew, apt = PKG_IDS[tool]
    if IS_WIN and shutil.which("winget"):
        return run(["winget", "install", "-e", "--id", winget, "--accept-package-agreements",
                    "--accept-source-agreements"]) or run(["winget", "upgrade", "-e", "--id", winget])
    if shutil.which("brew"):
        return run(["brew", "install", brew]) or run(["brew", "upgrade", brew])
    if shutil.which("apt-get"):
        return run(["sudo", "apt-get", "install", "-y", apt])
    print(f"  ! No package manager found. Install {tool} manually.")
    return False


def step_prereqs():
    """Detect versions; for missing/outdated tools ask the dev before installing/upgrading."""
    problems = []
    for tool, minimum in MIN_VERSIONS.items():
        ver, path = tool_version(tool)
        want = ".".join(map(str, minimum))
        if ver is None:
            print(f"  MISSING  {tool} (need >= {want})")
            problems.append(tool)
        elif tuple(ver[:2]) < minimum:
            print(f"  OUTDATED {tool} {'.'.join(map(str, ver))} < {want} ({path})")
            problems.append(tool)
        else:
            print(f"  OK       {tool} {'.'.join(map(str, ver))} >= {want} ({path})")
    if not problems:
        return True
    # Always ask explicitly, even with --yes: this changes system-wide software.
    if not confirm(f"Autoriza instalar/atualizar agora: {', '.join(problems)}?", False):
        print("  Sem autorizacao: instale/atualize manualmente e rode novamente.")
        return False
    done = set()
    for tool in problems:
        key = PKG_IDS[tool][0]
        if key not in done:
            install_or_upgrade(tool)
            done.add(key)
    print("  Instalacao/atualizacao concluida. REINICIE o terminal (PATH) e rode o script novamente.")
    return False


def step_cli(yes):
    if not confirm("Install @foundryvtt/foundryvtt-cli + fvtt-world-cli globally?", yes):
        return
    run(["npm", "install", "-g", "@foundryvtt/foundryvtt-cli", "fvtt-world-cli"])


def step_rea(yes):
    if not confirm("Install REA (rea-agents) globally via npm?", yes):
        return
    if run(["npm", "install", "-g", "rea-agents"]):
        print("  Next: run `npx rea-agents setup` to register REA MCP in your agent(s).")
    # Optional engines (Ghidra/Hopper/IDA) are NOT installed automatically: need approval/licence.


def step_mcps(yes):
    if not confirm(f"Clone third-party Foundry MCP servers into {MCP_HOME}?", yes):
        return
    MCP_HOME.mkdir(parents=True, exist_ok=True)
    for name, url in THIRD_PARTY_MCPS.items():
        dest = MCP_HOME / name
        if dest.exists():
            print(f"  = {name} already present (git pull)")
            run(["git", "pull", "--ff-only"], cwd=dest)
        elif not run(["git", "clone", "--depth", "1", url, str(dest)]):
            print(f"  ! failed to clone {name}")
            continue
        if (dest / "package.json").exists():
            run(["npm", "install"], cwd=dest)
            pkg = json.loads((dest / "package.json").read_text(encoding="utf-8"))
            if "build" in pkg.get("scripts", {}):
                run(["npm", "run", "build"], cwd=dest)


def step_native_mcp(data_path):
    server = (SKILL_DIR / "mcp" / "foundry_mcp_server.js").as_posix()
    snippet = {"mcpServers": {"master-of-foundryvtt": {
        "command": "node", "args": [server],
        "env": {"FOUNDRY_URL": "http://localhost:30000",
                "FOUNDRY_DATA_PATH": data_path or "<ASK_USER>",
                "FOUNDRY_ADMIN_KEY": "<ASK_USER>"}}}}
    print("  Add to your MCP config (ask the user for credentials, never guess):")
    print(json.dumps(snippet, indent=2))


HOME = Path.home()
GLOBAL_SKILL_DIRS = [HOME / ".gemini" / "config" / "skills", HOME / ".claude" / "skills"]
GLOBAL_MCP_CONFIGS = [HOME / ".gemini" / "config" / "mcp_config.json",
                      HOME / ".gemini" / "antigravity-ide" / "mcp_config.json",
                      HOME / ".gemini" / "antigravity" / "mcp_config.json"]


def link_dir(link, target):
    """Symlink/junction `link` -> `target` (no admin needed for junctions on Windows)."""
    if IS_WIN:
        return subprocess.run(f'mklink /J "{link}" "{target}"', shell=True,
                              capture_output=True).returncode == 0
    os.symlink(target, link)
    return True


def step_global_skill():
    """Make this skill available globally (all projects) in each agent's global skills dir."""
    for base in GLOBAL_SKILL_DIRS:
        if not base.parent.exists():
            continue  # agent not installed
        base.mkdir(parents=True, exist_ok=True)
        dest = base / SKILL_DIR.name
        
        # Check if already installed
        if dest.exists() or dest.is_symlink():
            print(f"\n[AVISO DE ATUALIZACAO] A skill '{SKILL_DIR.name}' ja existia em {dest}.")
            print("  -> Atualizando e sobrescrevendo com os novos recursos, bases de conhecimento e correcoes.")
            
            if dest.resolve() == SKILL_DIR.resolve() and dest.is_symlink():
                print(f"  = Link simbolico/juncao ja aponta para a versao atual: {dest}")
                continue
            
            if not dest.is_symlink():
                backup = HOME / ".master-of-foundryvtt" / "backups" / f"{base.parent.name}-{dest.name}"
                backup.parent.mkdir(parents=True, exist_ok=True)
                if backup.exists():
                    shutil.rmtree(backup, ignore_errors=True)
                shutil.move(str(dest), str(backup))
                print(f"  -> Backup seguro da versao anterior criado em: {backup}")
            else:
                dest.unlink()
        else:
            print(f"\n[NOVA INSTALACAO] Instalando skill '{SKILL_DIR.name}' em {dest}...")

        ok = link_dir(dest, SKILL_DIR)
        print(f"  {'Vinculado com sucesso' if ok else 'FALHA ao criar vinculo'} {dest} -> {SKILL_DIR}")
        if not ok:
            shutil.copytree(SKILL_DIR, dest)
            print("  -> Copiado como pasta fisica independente (atualizacao completa).")



def third_party_entries():
    """Detect runnable built entrypoints of cloned MCP servers."""
    found = {}
    for name in THIRD_PARTY_MCPS:
        d = MCP_HOME / name
        pj = d / "package.json"
        if not pj.exists():
            continue
        pkg = json.loads(pj.read_text(encoding="utf-8"))
        bins = pkg.get("bin")
        entry = (next(iter(bins.values())) if isinstance(bins, dict) else bins) or pkg.get("main")
        if entry and (d / entry).exists():
            found[name] = {"command": "node", "args": [(d / entry).as_posix()], "env": {}}
    return found


def step_global_mcps(data_path):
    """Merge MCP servers into every global mcp_config.json (with .bak backup)."""
    servers = {"master-of-foundryvtt": {
        "command": "node", "args": [(SKILL_DIR / "mcp" / "foundry_mcp_server.js").as_posix()],
        "env": {"FOUNDRY_URL": "http://localhost:30000", "FOUNDRY_DATA_PATH": data_path}}}
    servers.update(third_party_entries())
    for cfg in GLOBAL_MCP_CONFIGS:
        if not cfg.exists():
            continue
        shutil.copy2(cfg, cfg.with_suffix(".json.bak"))
        data = json.loads(cfg.read_text(encoding="utf-8") or "{}")
        cur = data.setdefault("mcpServers", {})
        for k, v in servers.items():
            cur.setdefault(k, v)  # never overwrite user-edited entries
        cfg.write_text(json.dumps(data, indent=2), encoding="utf-8")
        print(f"  registered {', '.join(servers)} in {cfg}")
    print("  Fill FOUNDRY_ADMIN_KEY / world credentials (ask the dev). REA: run `npx rea-agents setup`.")



def step_memory():
    mem = SKILL_DIR / "memory"
    mem.mkdir(exist_ok=True)
    (mem / "learnings.md").touch(exist_ok=True)
    print(f"  memory ready: {mem}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--yes", action="store_true", help="skip confirmations")
    ap.add_argument("--skip", default="", help="comma list: rea,cli,mcp")
    ap.add_argument("--data-path", default="")
    a = ap.parse_args()
    skip = {s.strip() for s in a.skip.split(",") if s.strip()}

    if not authorize(a.yes):
        sys.exit("Instalacao nao autorizada. A skill seguira com recursos limitados.")
    a.yes = True  # single authorization covers every step below

    print("[1/6] Prerequisites")
    if not step_prereqs():
        sys.exit("Install the missing prerequisites and rerun.")
    if "cli" not in skip:
        print("[2/6] Foundry CLI"); step_cli(a.yes)
    if "rea" not in skip:
        print("[3/6] REA reverse engineering"); step_rea(a.yes)
    if "mcp" not in skip:
        print("[4/6] Third-party MCPs"); step_mcps(a.yes)
    print("[5/6] Native MCP"); step_native_mcp(a.data_path)
    print("[6/7] Memory"); step_memory()
    print("[7/7] Global activation (skill + MCPs for all projects)")
    step_global_skill()
    step_global_mcps(a.data_path)
    print("\nDone. Restart your agent so the global skill and MCP servers are loaded.")


if __name__ == "__main__":
    main()
