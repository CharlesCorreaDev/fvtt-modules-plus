#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de verificação de ambiente e atualização de dependências
para a Skill 'book-formatter'.
"""

import sys
import os
import platform
import shutil
import subprocess
import importlib.util

# Garantir saída UTF-8 em todos os sistemas operacionais e consoles
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

def get_os_info():
    system = platform.system()
    if system == "Windows":
        return "Windows", "winget / choco / pip"
    elif system == "Darwin":
        return "macOS", "brew / pip3"
    elif system == "Linux":
        return "Linux", "apt / dnf / pacman / pip3"
    return system, "pip"

def check_package(package_name, display_name=None):
    display = display_name or package_name
    spec = importlib.util.find_spec(package_name)
    is_installed = spec is not None
    if is_installed:
        print(f"  ✅ {display} está instalado.")
    else:
        print(f"  ❌ {display} NÃO está instalado.")
    return is_installed

def check_system_tool(tool_name, os_install_hints):
    current_os = platform.system()
    found = shutil.which(tool_name) is not None

    if found:
        print(f"  ✅ Ferramenta de sistema '{tool_name}' encontrada no PATH.")
        return True
    else:
        print(f"  ⚠️ Ferramenta de sistema '{tool_name}' NÃO encontrada.")
        hint = os_install_hints.get(current_os, os_install_hints.get("default", ""))
        if hint:
            print(f"     -> Sugestão de instalação ({current_os}): {hint}")
        return False

def upgrade_python_packages(packages_list):
    """Atualiza as dependências Python da skill via pip --upgrade."""
    print("\n📦 Atualizando dependências Python da skill (pip install --upgrade)...")
    cmd = [sys.executable, "-m", "pip", "install", "--upgrade"] + packages_list
    res = subprocess.run(cmd)
    if res.returncode == 0:
        print("✅ Todas as dependências Python foram atualizadas com sucesso!")
    else:
        print("⚠️ Algumas dependências falharam ao atualizar via pip.")

def main():
    os_name, mgr_info = get_os_info()
    auto_upgrade = "--upgrade" in sys.argv or "-u" in sys.argv

    print("=========================================================")
    print(f"🔍 Verificação de Ambiente & Dependências: Book Formatter")
    print(f"💻 Sistema Operacional : {os_name} ({platform.platform()})")
    print(f"🐍 Python              : {sys.version.split()[0]} ({sys.executable})")
    print("=========================================================\n")

    # 1. Checagem de versão do Python
    if sys.version_info < (3, 10):
        print("❌ ATENÇÃO: Python 3.10 ou superior é recomendado.")
        print(f"   Versão detectada: {sys.version.split()[0]}")
    else:
        print(f"✅ Versão do Python compatível ({sys.version_info.major}.{sys.version_info.minor})")

    # 2. Dependências Python Básicas & Motores de Extração
    print("\n📦 Verificando Motores de Leitura & Extração (Básicos):")
    pip_cmd = "pip" if os_name == "Windows" else "python3 -m pip"

    missing_pkgs = []
    all_python_pkgs = [
        "markitdown", "pdfminer.six", "pdfplumber", "pypdf", "pypdfium2",
        "Pillow", "pytesseract", "python-docx", "mammoth", "openpyxl",
        "pandas", "xlrd", "odfpy", "ebooklib", "beautifulsoup4", "html2text", "striprtf"
    ]

    pkgs = [
        ("markitdown", "markitdown (Motor principal leve)", f"{pip_cmd} install markitdown"),
        ("markitdown_ocr", "markitdown-ocr (OCR avançado - Opcional)", f"{pip_cmd} install markitdown-ocr"),
        ("pdfminer", "pdfminer.six (Suporte PDF)", f"{pip_cmd} install pdfminer.six"),
        ("pdfplumber", "pdfplumber (Extração de tabelas PDF)", f"{pip_cmd} install pdfplumber"),
        ("pypdf", "pypdf (Inspeção e manipulação PDF)", f"{pip_cmd} install pypdf"),
        ("pypdfium2", "pypdfium2 (Renderização de páginas PDF)", f"{pip_cmd} install pypdfium2"),
        ("PIL", "Pillow (Imagens e manipulação visual)", f"{pip_cmd} install Pillow"),
        ("pytesseract", "pytesseract (Integração Tesseract Python)", f"{pip_cmd} install pytesseract"),
        ("docx", "python-docx (Suporte Word .docx)", f"{pip_cmd} install python-docx"),
        ("mammoth", "mammoth (Fallback Word .docx)", f"{pip_cmd} install mammoth"),
        ("openpyxl", "openpyxl (Suporte Excel .xlsx)", f"{pip_cmd} install openpyxl"),
        ("pandas", "pandas (Planilhas e CSV)", f"{pip_cmd} install pandas"),
        ("xlrd", "xlrd (Suporte Excel .xls)", f"{pip_cmd} install xlrd"),
        ("odfpy", "odfpy (Suporte ODT)", f"{pip_cmd} install odfpy"),
        ("ebooklib", "ebooklib (Suporte EPUB)", f"{pip_cmd} install ebooklib"),
        ("bs4", "beautifulsoup4 (Suporte HTML)", f"{pip_cmd} install beautifulsoup4"),
        ("html2text", "html2text (Fallback HTML)", f"{pip_cmd} install html2text"),
        ("striprtf", "striprtf (Fallback RTF)", f"{pip_cmd} install striprtf"),
        ("pymupdf", "PyMuPDF (Diagramação vetorial e manipulação de fontes)", f"{pip_cmd} install pymupdf"),
        ("reportlab", "ReportLab (Motor programático de PDF)", f"{pip_cmd} install reportlab"),
        ("fpdf", "fpdf2 (Formulários e diagramação de PDFs)", f"{pip_cmd} install fpdf2"),
        ("fontTools", "fonttools (Inspeção de fontes OpenType / CFF)", f"{pip_cmd} install fonttools"),
        ("yaml", "PyYAML (Leitura e manipulação de metadados CFF / YAML)", f"{pip_cmd} install pyyaml"),
    ]

    for pkg_import, name, install_cmd in pkgs:
        if not check_package(pkg_import, name):
            if pkg_import != "markitdown_ocr":
                missing_pkgs.append(install_cmd)

    # 3. Motores de IA SOTA para PDFs de RPG Complexos
    print("\n🧠 Verificando Motores Avançados de Layout & IA (Docling, Marker, Unstructured, Nougat):")
    ai_pkgs = [
        ("docling", "Docling (DS4SD / IBM - Extração multimodal de layout e tabelas)", f"{pip_cmd} install docling"),
        ("marker", "Marker (Datalab - Conversão ultra-rápida de PDF para Markdown)", f"{pip_cmd} install marker-pdf"),
        ("unstructured", "Unstructured (Particionamento e chunking de PDFs complexos)", f"{pip_cmd} install unstructured"),
        ("nougat", "Nougat (Meta AI - Leitura visual-to-text de páginas escaneadas/fórmulas)", f"{pip_cmd} install nougat-ocr"),
    ]
    for pkg_import, name, install_cmd in ai_pkgs:
        check_package(pkg_import, name)

    # 4. Ferramentas do Sistema (OCR / PDF / Stirling-PDF / Documentos)
    print("\n🛠️ Verificando Ferramentas de Sistema & Utilitários de PDF:")

    tesseract_hints = {
        "Windows": "winget install UB-Mannheim.TesseractOCR  ou  choco install tesseract",
        "Darwin": "brew install tesseract",
        "Linux": "sudo apt-get install tesseract-ocr  (Ubuntu/Debian) | sudo dnf install tesseract (Fedora)",
        "default": "Instale o binário do Tesseract OCR para o seu sistema.",
    }

    pandoc_hints = {
        "Windows": "winget install JohnMacFarlane.Pandoc  ou  choco install pandoc",
        "Darwin": "brew install pandoc",
        "Linux": "sudo apt-get install pandoc  (Ubuntu/Debian) | sudo dnf install pandoc (Fedora)",
        "default": "Instale o binário do Pandoc para o seu sistema.",
    }

    libreoffice_hints = {
        "Windows": "winget install TheDocumentFoundation.LibreOffice  ou  choco install libreoffice",
        "Darwin": "brew install libreoffice",
        "Linux": "sudo apt-get install libreoffice  (Ubuntu/Debian) | sudo dnf install libreoffice (Fedora)",
        "default": "Instale o LibreOffice para o seu sistema.",
    }

    poppler_hints = {
        "Windows": "Instale o Poppler para Windows (pdftotext / pdftoppm / pdfimages).",
        "Darwin": "brew install poppler",
        "Linux": "sudo apt-get install poppler-utils  (Ubuntu/Debian) | sudo dnf install poppler-utils (Fedora)",
        "default": "Instale o Poppler para o seu sistema.",
    }

    stirling_hints = {
        "Windows": "Docker: docker run -d -p 8080:8080 frooodle/s-pdf:latest  ou  baixar Stirling-PDF Desktop",
        "Darwin": "Docker ou Stirling-PDF Desktop (https://github.com/Stirling-Tools/Stirling-PDF)",
        "Linux": "docker run -d -p 8080:8080 frooodle/s-pdf:latest",
        "default": "Disponível via Docker ou Desktop em https://github.com/Stirling-Tools/Stirling-PDF",
    }

    gh_hints = {
        "Windows": "winget install GitHub.cli  ou  choco install gh",
        "Darwin": "brew install gh",
        "Linux": "sudo apt install gh",
        "default": "Instale o GitHub CLI (`gh`) via gerenciador de pacotes do sistema.",
    }

    check_system_tool("tesseract", tesseract_hints)
    check_system_tool("pandoc", pandoc_hints)
    check_system_tool("soffice", libreoffice_hints)
    check_system_tool("pdftotext", poppler_hints)
    check_system_tool("stirling-pdf", stirling_hints)
    gh_installed = check_system_tool("gh", gh_hints)

    # 5. Verificação Obrigatória de Autenticação do GitHub CLI
    print("\n🔐 Verificando Autenticação do GitHub CLI:")
    if gh_installed:
        try:
            gh_auth_res = subprocess.run(["gh", "auth", "status"], capture_output=True, text=True, encoding="utf-8")
            if gh_auth_res.returncode == 0:
                print("  ✅ Conta do GitHub conectada com sucesso via `gh`!")
            else:
                print("  ⚠️ GitHub CLI está instalado, mas NÃO está autenticado.")
                print("     👉 Ação necessária: execute `gh auth login` para conectar sua conta.")
        except Exception as e:
            print(f"  ⚠️ Erro ao checar status do gh: {e}")
    else:
        print("  ❌ GitHub CLI ausente. Instale o `gh` e execute `gh auth login` para conectar sua conta.")

    # 5. Execução de Atualização se solicitado
    if auto_upgrade:
        upgrade_python_packages(all_python_pkgs)

    # 6. Resumo e Instruções
    print("\n---------------------------------------------------------")
    if missing_pkgs:
        print("⚠️ Para instalar todos os pacotes Python básicos de uma vez:")
        print(f"👉 {pip_cmd} install markitdown pdfplumber pdfminer.six pypdf pypdfium2 Pillow pytesseract python-docx mammoth openpyxl pandas xlrd odfpy ebooklib beautifulsoup4 html2text striprtf")
    else:
        print("🎉 Todas as bibliotecas Python essenciais estão instaladas e prontas!")
    print("\n💡 Dica de manutenção:")
    print(f"   Para atualizar todas as dependências da skill para a última versão:")
    print(f"   👉 python scripts/check_env.py --upgrade")
    print("---------------------------------------------------------")

if __name__ == "__main__":
    main()
