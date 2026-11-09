#!/usr/bin/env python3
"""
Foundry VTT Module & System Scaffolder
======================================
Part of the Master of Foundry VTT Suite by GM Charles Corrêa.

Generates complete, production-ready directory scaffolds for Foundry VTT
systems and modules following v12 & v14 modern ApplicationV2 / TypeDataModel standards.
"""

import os
import sys
import json
import argparse

def create_module_scaffold(target_dir: str, package_id: str, title: str, author: str = "Author"):
    base_path = os.path.join(target_dir, package_id)
    os.makedirs(os.path.join(base_path, "scripts"), exist_ok=True)
    os.makedirs(os.path.join(base_path, "templates"), exist_ok=True)
    os.makedirs(os.path.join(base_path, "styles"), exist_ok=True)
    os.makedirs(os.path.join(base_path, "lang"), exist_ok=True)

    # module.json
    manifest = {
        "id": package_id,
        "title": title,
        "description": f"Custom production-ready module for Foundry VTT: {title}.",
        "version": "1.0.0",
        "compatibility": {
            "minimum": "12",
            "verified": "14"
        },
        "authors": [
            {
                "name": author
            }
        ],
        "esmodules": [
            f"scripts/{package_id}.mjs"
        ],
        "styles": [
            f"styles/{package_id}.css"
        ],
        "languages": [
            {
                "lang": "en",
                "name": "English",
                "path": "lang/en.json"
            },
            {
                "lang": "pt-BR",
                "name": "Português (Brasil)",
                "path": "lang/pt-BR.json"
            }
        ],
        "url": f"https://github.com/{author}/{package_id}",
        "manifest": f"https://github.com/{author}/{package_id}/releases/latest/download/module.json",
        "download": f"https://github.com/{author}/{package_id}/releases/latest/download/{package_id}.zip"
    }

    with open(os.path.join(base_path, "module.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    # scripts/module.mjs
    entrypoint = f"""// Module Entrypoint: {title}
const MODULE_ID = "{package_id}";

Hooks.once("init", async () => {{
  console.log(`[${{MODULE_ID}}] Initializing ${{MODULE_ID}} v1.0.0`);
  
  // Register settings safely
  game.settings.register(MODULE_ID, "enableFeature", {{
    name: `${{MODULE_ID}}.settings.enableFeature.name`,
    hint: `${{MODULE_ID}}.settings.enableFeature.hint`,
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  }});
}});

Hooks.once("ready", async () => {{
  console.log(`[${{MODULE_ID}}] System & World Ready. Loaded for user:`, game.user.name);
}});
"""
    with open(os.path.join(base_path, "scripts", f"{package_id}.mjs"), "w", encoding="utf-8") as f:
        f.write(entrypoint)

    # lang/en.json
    en_lang = {
        package_id: {
            "title": title,
            "settings": {
                "enableFeature": {
                    "name": "Enable Core Features",
                    "hint": "Toggle the primary automated features of this module."
                }
            }
        }
    }
    with open(os.path.join(base_path, "lang", "en.json"), "w", encoding="utf-8") as f:
        json.dump(en_lang, f, indent=2, ensure_ascii=False)

    # lang/pt-BR.json
    pt_lang = {
        package_id: {
            "title": title,
            "settings": {
                "enableFeature": {
                    "name": "Habilitar Recursos Centrais",
                    "hint": "Ativa ou desativa as funcionalidades automatizadas principais deste módulo."
                }
            }
        }
    }
    with open(os.path.join(base_path, "lang", "pt-BR.json"), "w", encoding="utf-8") as f:
        json.dump(pt_lang, f, indent=2, ensure_ascii=False)

    # styles/module.css
    with open(os.path.join(base_path, "styles", f"{package_id}.css"), "w", encoding="utf-8") as f:
        f.write(f"/* CSS Styles for {title} */\n.{package_id} {{\n  box-sizing: border-box;\n}}\n")

    # Mandatory VERSION, README.md, CHANGELOG.md and WIKI.md
    with open(os.path.join(base_path, "VERSION"), "w", encoding="utf-8") as f:
        f.write("1.0.0.0\n")

    with open(os.path.join(base_path, "README.md"), "w", encoding="utf-8") as f:
        f.write(f"# {title}\n\nProduction-ready package for Foundry Virtual Tabletop.\n")

    with open(os.path.join(base_path, "CHANGELOG.md"), "w", encoding="utf-8") as f:
        f.write(f"# Changelog - {title}\n\n## [1.0.0.0] - Initial Release\n- Added initial release and structure.\n")

    with open(os.path.join(base_path, "WIKI.md"), "w", encoding="utf-8") as f:
        f.write(f"""# Wiki Oficial: {title}

## 1. Visão Geral e Propósito
{title} é um pacote para Foundry Virtual Tabletop projetado para oferecer automação robusta e interface amigável.

## 2. Guia do Mestre
- Ative o módulo nas configurações do mundo.
- Ajuste as opções em Configurações de Módulos.

## 3. Guia dos Jogadores
- Acesse as fichas e recursos autorizados pelo Mestre.

## 4. Referência de APIs e Métodos
- Acesso à API global via `game.modules.get('{package_id}')?.api`.

## 5. Hooks e Eventos
- O pacote registra ganchos nos ciclos `init` e `ready`.

## 6. Solução de Problemas
- Relate problemas no repositório através das Issue Templates.
""")

    # Scaffolding GitHub Actions CI/CD, Dependabot & Issue Templates
    workflows_dir = os.path.join(base_path, ".github", "workflows")
    issue_dir = os.path.join(base_path, ".github", "ISSUE_TEMPLATE")
    os.makedirs(workflows_dir, exist_ok=True)
    os.makedirs(issue_dir, exist_ok=True)

    # 1. checks.yml
    checks_content = """name: CI Quality & Validation Checks

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Validate Manifest JSON
        run: |
          node -e "JSON.parse(fs.readFileSync('module.json', 'utf8'))"
          node -e "findFiles = (dir) => fs.readdirSync(dir).forEach(f => { const p = path.join(dir, f); if(fs.statSync(p).isDirectory()) findFiles(p); else if(p.endsWith('.json')) JSON.parse(fs.readFileSync(p, 'utf8')); }); findFiles('lang');"
      - name: Validate Script Syntax
        run: |
          node -c scripts/*.mjs
"""
    with open(os.path.join(workflows_dir, "checks.yml"), "w", encoding="utf-8") as f:
        f.write(checks_content)

    # 2. release.yml
    release_content = """name: Release to GitHub & Foundry VTT

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install Archiver
        run: npm install archiver
      - name: Package Zip
        run: |
          node -e "
          const fs = require('fs');
          const path = require('path');
          const archiver = require('archiver');
          const manifest = JSON.parse(fs.readFileSync('module.json', 'utf8'));
          const output = fs.createWriteStream(manifest.id + '.zip');
          const archive = archiver('zip', { zlib: { level: 9 } });
          output.on('close', () => console.log('Created ' + manifest.id + '.zip'));
          archive.pipe(output);
          const ignored = new Set(['.git', '.github', 'node_modules', manifest.id + '.zip']);
          for (const item of fs.readdirSync('.')) {
            if (ignored.has(item)) continue;
            const s = fs.statSync(item);
            if (s.isDirectory()) archive.directory(item, path.join(manifest.id, item));
            else archive.file(item, { name: path.join(manifest.id, item) });
          }
          archive.finalize();
          "
      - name: Publish to Foundry VTT API
        env:
          FOUNDRY_API_TOKEN: ${{ secrets.FOUNDRY_API_TOKEN }}
        run: |
          if [ -n "$FOUNDRY_API_TOKEN" ]; then
            node -e "
            const fs = require('fs');
            const https = require('https');
            const m = JSON.parse(fs.readFileSync('module.json', 'utf8'));
            const payload = JSON.stringify({
              id: m.id,
              'dry-run': false,
              release: {
                version: m.version,
                manifest: m.manifest,
                notes: m.changelog || '',
                compatibility: m.compatibility
              }
            });
            const req = https.request('https://foundryvtt.com/_api/packages/release_version/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.FOUNDRY_API_TOKEN,
                'Content-Length': Buffer.byteLength(payload)
              }
            }, (res) => {
              console.log('Foundry API Status:', res.statusCode);
            });
            req.write(payload);
            req.end();
            "
          fi
      - name: GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          files: |
            module.json
            *.zip
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
"""
    with open(os.path.join(workflows_dir, "release.yml"), "w", encoding="utf-8") as f:
        f.write(release_content)

    # 3. dependabot.yml
    dependabot_content = """version: 2
updates:
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "monthly"
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
"""
    with open(os.path.join(base_path, ".github", "dependabot.yml"), "w", encoding="utf-8") as f:
        f.write(dependabot_content)

    # 4. Bug.md & Feature.md
    with open(os.path.join(issue_dir, "Bug.md"), "w", encoding="utf-8") as f:
        f.write("""---
name: Bug Report
about: Create a report to help us solve a problem.
title: "[BUG] "
labels: ["bug"]
---
## Description
<!-- Bug details -->
## Environment
- Foundry VTT Version:
- Active System:
## Steps to Reproduce
1.
## Console Logs (F12)
```text
```
""")

    with open(os.path.join(issue_dir, "Feature.md"), "w", encoding="utf-8") as f:
        f.write("""---
name: Feature Request
about: Suggest an idea or new mechanic for this package.
title: "[FEATURE] "
labels: ["enhancement"]
---
## Summary
<!-- Feature idea -->
## Use Case
<!-- Problem it solves -->
## Proposed Solution
<!-- Implementation details -->
""")

    print(f"Scaffold successfully generated at: {base_path} with complete CI/CD, Dependabot & Wiki templates.")

def main():
    parser = argparse.ArgumentParser(description="Foundry VTT Scaffolder CLI")
    parser.add_argument("--id", required=True, help="Package ID (e.g. my-custom-module)")
    parser.add_argument("--title", required=True, help="Human readable title (e.g. My Custom Module)")
    parser.add_argument("--dest", default=".", help="Destination directory (defaults to current directory)")
    parser.add_argument("--author", default="Developer", help="Author name")
    args = parser.parse_args()

    create_module_scaffold(args.dest, args.id, args.title, args.author)

if __name__ == "__main__":
    main()
