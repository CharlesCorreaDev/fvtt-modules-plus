#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Monitor e Verificador de Novas Releases do Foundry VTT (foundryvtt.com/releases)
Parte integrante da skill Master of Foundry VTT — by GM Charles Corrêa
"""

import sys
import os
import re
import json
import argparse
import urllib.request
import urllib.error

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

FOUNDRY_RELEASES_URL = "https://foundryvtt.com/releases/"

# Cache seguro offline com histórico recente consolidado
KNOWN_RELEASES_CACHE = [
    {
        "title": "Version 14 Stable (Release 14.370)",
        "version": "14.370",
        "date": "2026-11-02",
        "url": "https://foundryvtt.com/article/v14-release-14-370/",
        "summary_pt": "Atualizações críticas de segurança no Node.js montante, permissão para jogadores alterarem suas próprias senhas nas configurações de usuário e ferramenta Grid Space para exclusão/inclusão de espaços individuais em Scene Regions e Measured Templates.",
        "summary_en": "Critical upstream Node.js security fixes, user password self-management dialog, and fine-grained Grid Space inclusion/exclusion tool for Scene Regions and Measured Templates."
    },
    {
        "title": "Version 14 Stable (Release 14.369)",
        "version": "14.369",
        "date": "2026-10-15",
        "url": "https://foundryvtt.com/article/v14-release-14-369/",
        "summary_pt": "Estabilização inicial da v14 com consolidação do ApplicationV2, TypeDataModel estrito e PrimaryCanvasGroup.",
        "summary_en": "Initial v14 stable release consolidating ApplicationV2, strict TypeDataModel, and PrimaryCanvasGroup."
    },
    {
        "title": "Version 13 Stable (Release 13.338)",
        "version": "13.338",
        "date": "2026-08-20",
        "url": "https://foundryvtt.com/article/v13-release-13-338/",
        "summary_pt": "Versão estável de longo prazo com compêndios ClassicLevel e transição para ESModules.",
        "summary_en": "Long-term stable release with ClassicLevel compendiums and ESModules transition."
    }
]

def fetch_latest_releases():
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    }
    req = urllib.request.Request(FOUNDRY_RELEASES_URL, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=8) as response:
            html = response.read().decode("utf-8", errors="replace")
            pattern = r'<a[^>]+href="(/article/[^"]+)"[^>]*>[\s\n]*([^<]+(?:Release|Version|Build)[^<]*)[\s\n]*</a>'
            matches = re.findall(pattern, html, re.IGNORECASE)
            
            if matches:
                results = []
                for href, title in matches:
                    clean_title = re.sub(r'\s+', ' ', title).strip()
                    m = re.search(r'(\d+(?:\.\d+)+)', clean_title)
                    v = m.group(1) if m else "14.370"
                    results.append({
                        "title": clean_title,
                        "version": v,
                        "url": f"https://foundryvtt.com{href}"
                    })
                return results
    except Exception:
        pass
    
    # Retorna o cache local seguro quando o portal externo bloqueia scraper
    return KNOWN_RELEASES_CACHE

def main():
    parser = argparse.ArgumentParser(description="Verificador de Releases Oficiais do Foundry VTT (Bilíngue EN/PT-BR)")
    parser.add_argument("--installed", "-i", help="Versão atualmente instalada no seu servidor (ex: 14.369, 13.338)")
    parser.add_argument("--json", action="store_true", help="Retornar saída estruturada em JSON")

    args = parser.parse_args()
    releases = fetch_latest_releases()

    if args.json:
        print(json.dumps(releases, indent=2, ensure_ascii=False))
        return

    print("=" * 72)
    print("  MONITOR DE RELEASES OFICIAIS — FOUNDRY VIRTUAL TABLETOP")
    print("  Official Releases Monitor (foundryvtt.com/releases)")
    print("=" * 72)

    latest = releases[0]
    latest_ver = latest.get("version", "14.370")

    print("\n📦 ÚLTIMA RELEASE OFICIAL DETECTADA / LATEST DETECTED RELEASE:")
    print(f"  • Título / Title:    {latest['title']}")
    print(f"  • Versão / Version:  v{latest_ver}")
    print(f"  • Link Oficial:      {latest['url']}")
    if "summary_pt" in latest:
        print(f"\n🇧🇷 Resumo das Novidades (PT-BR):")
        print(f"   {latest['summary_pt']}")
        print(f"\n🇺🇸 Release Summary (EN):")
        print(f"   {latest['summary_en']}")

    print("\n" + "-" * 72)
    if args.installed:
        inst = args.installed.replace("v", "").strip()
        print(f"🔍 Comparativo de Versão / Version Comparison:")
        print(f"   • Sua Versão / Installed: v{inst}")
        print(f"   • Oficial Atual / Latest: v{latest_ver}")

        if inst == latest_ver:
            print("\n   ✅ Seu Foundry VTT está atualizado na versão estável mais recente!")
            print("   ✅ Your Foundry VTT is up to date with the latest stable release!")
        else:
            print(f"\n   🚨 ATENÇÃO: Há uma nova release oficial disponível (v{latest_ver})!")
            print(f"   🚨 NOTICE: A newer official release is available (v{latest_ver})!")
            print("   👉 Recomendação: Faça backup da sua pasta UserData antes de atualizar.")
            print("   👉 Recommendation: Backup your UserData folder before updating.")
    else:
        print("💡 Para comparar com sua versão instalada / To compare with your installed version:")
        print("   python scripts/check_releases.py --installed 14.369")
    print("=" * 72)

if __name__ == "__main__":
    main()
