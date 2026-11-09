#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Consultor de versões do Foundry VTT.
"""
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

VERSIONS = {
    '14': 'v14: Bleeding-edge canvas & performance enhancements.',
    '13': 'v13: Next-gen system capabilities and UI controls.',
    '12': 'v12: ApplicationV2, HandlebarsApplicationMixin, modern ESM architecture.',
    '11': 'v11: TypeDataModel consolidation, LevelDB compendiums.',
    '10': 'v10: foundry.data.fields, schema-based DataModels.',
    '9':  'v9: Canvas rendering overhaul, keybinding system.',
    '8':  'v8: Document architecture rewrite (0.8.x promise-based CRUD).'
}

def main():
    if len(sys.argv) < 2:
        print('Uso: python version_advisor.py <numero_da_versao>')
        print('Versões disponíveis:', ', '.join(VERSIONS.keys()))
        return
    ver = sys.argv[1].replace('v', '').strip()
    if ver in VERSIONS:
        print(f'🎲 Foundry VTT Versão {ver}:')
        print('  ', VERSIONS[ver])
    else:
        print(f'❌ Versão {ver} não reconhecida. Escolha entre: {list(VERSIONS.keys())}')

if __name__ == '__main__':
    main()
