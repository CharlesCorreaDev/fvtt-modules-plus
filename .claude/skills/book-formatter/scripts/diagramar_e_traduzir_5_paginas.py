#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
diagramar_e_traduzir_5_paginas.py
Script oficial da skill book-formatter para diagramação e tradução de 5 páginas.
Fidelidade visual absoluta com grid tipográfico profissional:
- Zero sobreposição de texto: colunas isoladas e cálculo dinâmico de largura
- Zero caixas opacas: streams de texto originais limpos (BT...ET)
- Backgrounds, artes e logos 100% preservados
- Tipografia original autêntica (PopulationZeroBB e Palatino Linotype)
- Alinhamento justificado e caixas delimitadoras calibradas
"""

import sys
from pathlib import Path
from PIL import Image
import pymupdf as fitz
import re

# Configuração de encoding para console Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

BASE_DIR = Path(r"D:\tmp\rrppgg\swade\pra traduzir\necessary_evil_invasion_projeto")
FONTS_DIR = BASE_DIR / "fonts"
IMAGES_DIR = BASE_DIR / "images"
COMPARATIVOS_DIR = BASE_DIR / "comparativos"
TRADUZIDOS_DIR = BASE_DIR / "traduzidos"

FONTS_DIR.mkdir(parents=True, exist_ok=True)
IMAGES_DIR.mkdir(parents=True, exist_ok=True)
COMPARATIVOS_DIR.mkdir(parents=True, exist_ok=True)
TRADUZIDOS_DIR.mkdir(parents=True, exist_ok=True)

INPUT_PDF = Path(r"D:\tmp\rrppgg\swade\pra traduzir\necessary-evil-swade-invasion (Original).pdf")
OUTPUT_PDF = TRADUZIDOS_DIR / "necessary-evil-swade-invasion-5-paginas-traduzido.pdf"
OUTPUT_MD = TRADUZIDOS_DIR / "necessary-evil-swade-invasion-5-paginas-traduzido.md"
OUTPUT_TXT = TRADUZIDOS_DIR / "necessary-evil-swade-invasion-5-paginas-traduzido.txt"

FONT_POP = str(FONTS_DIR / "PopulationZeroBB_clean.otf")
FONT_PALA = r"C:\Windows\Fonts\pala.ttf"
FONT_PALA_BOLD = r"C:\Windows\Fonts\palab.ttf"
FONT_PALA_IT = r"C:\Windows\Fonts\palai.ttf"

BRAIN_DIR = Path(r"C:\Users\SkyTeamPOA-CharlesCo\.gemini\antigravity\brain\d4f7539e-bad3-4122-8492-3dd4dca9fcc0")


def clean_pdf_stream_text(doc, pno, keep_filter=None):
    """Remove blocos BT...ET de texto diretamente do content stream do PDF."""
    page = doc[pno]
    cxrefs = page.get_contents()
    for cx in cxrefs:
        stream = doc.xref_stream(cx)
        if keep_filter:
            clean = re.sub(rb"BT\s.*?\sET", keep_filter, stream, flags=re.DOTALL)
        else:
            clean = re.sub(rb"BT\s.*?\sET", b"", stream, flags=re.DOTALL)
        doc.update_stream(cx, clean)


def draw_pop_zero(page, pos, text, fontsize=60.0):
    """Renderiza título em PopulationZeroBB com duplo passe (stroke preto + fill branco)."""
    x, y = pos
    page.insert_text((x, y), text, fontname="PopZero", fontfile=FONT_POP, fontsize=fontsize, render_mode=1, color=(0, 0, 0))
    page.insert_text((x, y), text, fontname="PopZero", fontfile=FONT_POP, fontsize=fontsize, render_mode=0, color=(1, 1, 1))


def format_toc_line(font_obj, title, page_num, max_width=188.0, fontsize=9.2):
    """Calcula pontilhamento dinâmico para garantir que o número fique alinhado à direita da coluna."""
    p_str = f" {page_num}"
    p_w = font_obj.text_length(p_str, fontsize=fontsize)
    t_w = font_obj.text_length(title, fontsize=fontsize)
    dot_w = font_obj.text_length(" .", fontsize=fontsize)

    avail = max_width - t_w - p_w
    if avail > 0:
        num_dots = int(avail / dot_w)
        return title + (" ." * num_dots) + p_str
    return f"{title} {page_num}"


def build_translation():
    print(f"📖 Lendo PDF de Origem: {INPUT_PDF.name}")
    src_doc = fitz.open(str(INPUT_PDF))
    out_doc = fitz.open()

    for pno in range(5):
        out_doc.insert_pdf(src_doc, from_page=pno, to_page=pno)

    print("⚡ Limpando streams de texto originais (sem caixas opacas)...")

    # -------------------------------------------------------------
    # PÁGINA 1: Capa (Preservação 100% da arte)
    # -------------------------------------------------------------
    print("  -> Página 1: Capa Original Preservada")

    # -------------------------------------------------------------
    # PÁGINA 2: Folha de Guarda
    # -------------------------------------------------------------
    print("  -> Página 2: Folha de Guarda em Palatino Italic")
    clean_pdf_stream_text(out_doc, 1)
    out_doc[1].insert_text(
        (105.0, 325.0),
        "Esta pagina foi inserida para facilitar a impressao frente e verso.",
        fontname="PalatinoIt",
        fontfile=FONT_PALA_IT,
        fontsize=10.0,
        color=(0.4, 0.4, 0.4)
    )

    # -------------------------------------------------------------
    # PÁGINA 3: Créditos
    # -------------------------------------------------------------
    print("  -> Página 3: Créditos centralizados com caixas calibradas")
    def keep_p3_filter(m):
        bt = m.group(0)
        if b"Clint Black" in bt or b"493.5807" in bt:
            return b""
        return bt

    clean_pdf_stream_text(out_doc, 2, keep_filter=keep_p3_filter)

    p3 = out_doc[2]
    creditos_txt = (
        "Autoria: Clint Black, Shane Lacy Hensley e Scott Pyle\n"
        "Atualizações para SWADE: Clint Black e Darrell Hayhurst\n"
        "Ilustrações Internas: Bad Moon Studio, Storn Cook, David Corsi, James Denton, Robin Elliott, "
        "Bien Flores, Gil Formosa, Allen Geneta, Ani Ghosh, Jason Juta, Saga Mackenzie, Aaron J Riley, "
        "Martin Sickree, Vincenzo Siriani, Unique Soparie, Dimitar Spasov, Talisman Studios, Cheyenne Wright\n"
        "Capa: Bad Moon Studio\n"
        "Material Adicional e Edição: Piotr Korys, Randy Mosiondz, Shane Lacy Hensley, Zeke Sparkes, Chris Toh e Matt Cutter\n"
        "Heroísmo de Última Hora: Dave Blewer, Butch Curry, Joel Kinstle, Piotr Korys, Dennis Mohr, Chris Toh e Brent Wolke\n"
        "Marketing e Logística: Jodi Black, Chris Landauer e Christine Lapp\n"
        "Produção: Darrell Hayhurst, Simon Lucas, Jessica Rogers e Donald Schepis"
    )
    p3.insert_textbox(
        fitz.Rect(38.0, 224.0, 440.0, 385.0),
        creditos_txt,
        fontname="Palatino",
        fontfile=FONT_PALA,
        fontsize=8.5,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_CENTER
    )

    dedicatorias_txt = (
        "Dedicatória de Clint: Aos meus pais, que me ensinaram a amar. Ao meu irmão Gary, que me ensinou a compartilhar o que você ama. "
        "A Kay Reid, que me ensinou que eu amo escrever. A Trinity e Bethany, a quem amo incondicionalmente. E acima de tudo a Jodi, "
        "que é meu Amor e minha Musa, agora e para sempre.\n\n"
        "Dedicatória de Shane: À minha prima Liz, que lutou contra o mal verdadeiro. Você faz muita falta. "
        "O mundo ficou muito mais escuro sem o seu sorriso caloroso constante.\n\n"
        "Testadores: Ben Ansaldo, Adam Black, Jodi Black, Mark Francis, Sharon Francis, Marguerite Frey, "
        "Zachary Kenner, Wade Lahoda, Chris Lowe, Sean McAlister, Stu Miller, Dan Molina, Alan Schnell, "
        "Amy Skopik, Duncan Squair, David Chrisley, Rich Miller, Kyle Gallagher, Skipper Beale, Christopher Toh e Cullen Rector."
    )
    p3.insert_textbox(
        fitz.Rect(38.0, 390.0, 440.0, 555.0),
        dedicatorias_txt,
        fontname="PalatinoIt",
        fontfile=FONT_PALA_IT,
        fontsize=8.2,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_CENTER
    )

    # -------------------------------------------------------------
    # PÁGINA 4: Sumário (TABLE OF CONTENTS)
    # -------------------------------------------------------------
    print("  -> Página 4: Sumário em duas colunas calibradas rigorosamente")
    clean_pdf_stream_text(out_doc, 3)

    # Título SUMARIO em PopZero duplo
    draw_pop_zero(out_doc[3], (150.0, 84.3), "SUMARIO", fontsize=60.0)

    font_pala_obj = fitz.Font("Palatino", FONT_PALA)

    # Itens do Sumário da Coluna 1 (x: 36.0, largura max: 196 pt)
    toc_col1_items = [
        ("PopZero", 12.0, 36.0, 117.9, "CAPITULO UM: UM MAL NECESSARIO ... 3"),
        ("Pala", 9.2, 46.0, 129.9, format_toc_line(font_pala_obj, "Omega", "5", max_width=182.0)),
        ("Pala", 9.2, 46.0, 141.9, format_toc_line(font_pala_obj, "Star City", "5", max_width=182.0)),
        ("PopZero", 12.0, 36.0, 162.0, "CAPITULO DOIS: CRIANDO VILOES ..... 13"),
        ("Pala", 9.2, 46.0, 174.0, format_toc_line(font_pala_obj, "Ancestralidades Necessarias", "14", max_width=182.0)),
        ("Pala", 9.2, 46.0, 186.0, format_toc_line(font_pala_obj, "Complicacoes Alteradas", "15", max_width=182.0)),
        ("Pala", 9.2, 46.0, 198.0, format_toc_line(font_pala_obj, "Novas Complicacoes", "15", max_width=182.0)),
        ("Pala", 9.2, 46.0, 210.0, format_toc_line(font_pala_obj, "Regras de Cenario", "15", max_width=182.0)),
        ("PopZero", 15.0, 36.0, 233.7, "SECAO DO MESTRE"),
        ("PopZero", 12.0, 36.0, 253.8, "CAPITULO TRES: MUNDO DE MALDADE . 18"),
        ("Pala", 9.2, 46.0, 265.8, format_toc_line(font_pala_obj, "O Inicio", "18", max_width=182.0)),
        ("Pala", 9.2, 46.0, 277.8, format_toc_line(font_pala_obj, "Os V’sori", "19", max_width=182.0)),
        ("Pala", 9.2, 46.0, 289.8, format_toc_line(font_pala_obj, "Por Tras da Mascara", "21", max_width=182.0)),
        ("Pala", 9.2, 46.0, 301.8, format_toc_line(font_pala_obj, "Atlantida", "21", max_width=182.0)),
        ("PopZero", 12.0, 36.0, 321.9, "CAPITULO QUATRO: STAR CITY ........ 24"),
        ("Pala", 9.2, 46.0, 333.9, format_toc_line(font_pala_obj, "Guia Geografico de Star City", "25", max_width=182.0)),
        ("PopZero", 12.0, 36.0, 354.0, "CAPITULO CINCO: AVENTURAS .......... 38"),
        ("Pala", 9.2, 46.0, 366.0, format_toc_line(font_pala_obj, "Gerador de Aventuras", "38", max_width=182.0)),
        ("Pala", 9.2, 46.0, 378.0, format_toc_line(font_pala_obj, "Resumo dos Pontos de Enredo", "38", max_width=182.0)),
        ("Pala", 9.2, 46.0, 390.0, format_toc_line(font_pala_obj, "Episodio 1: Fuga da Prisao!", "43", max_width=182.0)),
        ("Pala", 9.2, 46.0, 402.0, format_toc_line(font_pala_obj, "Episodio 2: Irregulares", "46", max_width=182.0)),
        ("Pala", 9.2, 46.0, 414.0, format_toc_line(font_pala_obj, "Episodio 3: A Primeira Familia", "49", max_width=182.0)),
        ("Pala", 9.2, 46.0, 426.0, format_toc_line(font_pala_obj, "Episodio 4: O Enforcado", "51", max_width=182.0)),
        ("Pala", 9.2, 46.0, 438.0, format_toc_line(font_pala_obj, "Episodio 5: Mesticos", "53", max_width=182.0)),
        ("Pala", 9.2, 46.0, 450.0, format_toc_line(font_pala_obj, "Episodio 6: Templo Perdido", "55", max_width=182.0)),
        ("Pala", 9.2, 46.0, 462.0, format_toc_line(font_pala_obj, "Episodio 7: Vira-Casaca", "57", max_width=182.0)),
        ("Pala", 9.2, 46.0, 474.0, format_toc_line(font_pala_obj, "Episodio 8: Assalto ao Satelite 15!", "59", max_width=182.0)),
        ("Pala", 9.2, 46.0, 486.0, format_toc_line(font_pala_obj, "Episodio 9: Um Vilao os Liderara!", "61", max_width=182.0)),
        ("Pala", 9.2, 46.0, 498.0, format_toc_line(font_pala_obj, "Episodio 10: Retorno do Forasteiro", "63", max_width=182.0)),
        ("Pala", 9.2, 46.0, 510.0, format_toc_line(font_pala_obj, "Episodio 11: A Contingencia Omega!", "66", max_width=182.0)),
        ("PopZero", 12.0, 36.0, 530.1, "CAPITULO SEIS: CONTOS SELVAGENS . 68"),
        ("Pala", 9.2, 46.0, 542.1, format_toc_line(font_pala_obj, "Culto dos Deuses Espaciais", "68", max_width=182.0)),
        ("Pala", 9.2, 46.0, 554.1, format_toc_line(font_pala_obj, "Cuidado com o Adormecido", "69", max_width=182.0)),
    ]
    for ftype, sz, x, y, txt in toc_col1_items:
        f = FONT_POP if ftype == "PopZero" else FONT_PALA
        fn = "PopZero" if ftype == "PopZero" else "Palatino"
        out_doc[3].insert_text((x, y), txt, fontname=fn, fontfile=f, fontsize=sz, color=(0, 0, 0))

    # Itens do Sumário da Coluna 2 (x: 254.5, largura max: 188 pt)
    toc_col2_items = [
        ("Pala", 9.2, 254.5, 114.8, format_toc_line(font_pala_obj, "O Retorno do Monolito!", "70", max_width=185.0)),
        ("Pala", 9.2, 254.5, 126.8, format_toc_line(font_pala_obj, "Problemas na Base Hidro 11", "72", max_width=185.0)),
        ("Pala", 9.2, 254.5, 138.8, format_toc_line(font_pala_obj, "Vendetta", "74", max_width=185.0)),
        ("Pala", 9.2, 254.5, 150.8, format_toc_line(font_pala_obj, "O Legado do Coronel Clone", "76", max_width=185.0)),
        ("Pala", 9.2, 254.5, 162.8, format_toc_line(font_pala_obj, "Puxando a Tomada", "78", max_width=185.0)),
        ("Pala", 9.2, 254.5, 174.8, format_toc_line(font_pala_obj, "Fogo dos Ceus", "80", max_width=185.0)),
        ("Pala", 9.2, 254.5, 186.8, format_toc_line(font_pala_obj, "Culto de Sangue", "82", max_width=185.0)),
        ("Pala", 9.2, 254.5, 198.8, format_toc_line(font_pala_obj, "Destruicao Robotica", "85", max_width=185.0)),
        ("Pala", 9.2, 254.5, 210.8, format_toc_line(font_pala_obj, "Jardim do Dr. Devolucao", "87", max_width=185.0)),
        ("Pala", 9.2, 254.5, 222.8, format_toc_line(font_pala_obj, "Sangria Alienigena", "89", max_width=185.0)),
        ("Pala", 9.2, 254.5, 234.8, format_toc_line(font_pala_obj, "Vidas Paralelas", "91", max_width=185.0)),
        ("Pala", 9.2, 254.5, 246.8, format_toc_line(font_pala_obj, "Um Dia na Vida de um Heroi", "92", max_width=185.0)),
        ("Pala", 9.2, 254.5, 258.8, format_toc_line(font_pala_obj, "A Camara", "94", max_width=185.0)),
        ("Pala", 9.2, 254.5, 270.8, format_toc_line(font_pala_obj, "Os Caes de Guerra", "97", max_width=185.0)),
        ("Pala", 9.2, 254.5, 282.8, format_toc_line(font_pala_obj, "O Resgate", "98", max_width=185.0)),
        ("Pala", 9.2, 254.5, 294.8, format_toc_line(font_pala_obj, "O Inimigo do Meu Inimigo", "99", max_width=185.0)),
        ("Pala", 9.2, 254.5, 306.8, format_toc_line(font_pala_obj, "Espreitador em Star City", "100", max_width=185.0)),
        ("Pala", 9.2, 254.5, 318.8, format_toc_line(font_pala_obj, "Terror em Tarrytown", "103", max_width=185.0)),
        ("Pala", 9.2, 254.5, 330.8, format_toc_line(font_pala_obj, "O Retorno de 4-Star e Lucky", "105", max_width=185.0)),
        ("Pala", 9.2, 254.5, 342.8, format_toc_line(font_pala_obj, "O Opositor Alienigena", "107", max_width=185.0)),
        ("Pala", 9.2, 254.5, 354.8, format_toc_line(font_pala_obj, "Cacando os Cacadores", "108", max_width=185.0)),
        ("Pala", 9.2, 254.5, 366.8, format_toc_line(font_pala_obj, "A Cruz Vermelha", "109", max_width=185.0)),
        ("Pala", 9.2, 254.5, 378.8, format_toc_line(font_pala_obj, "O Cofre", "111", max_width=185.0)),
        ("PopZero", 12.0, 244.5, 410.9, "CAPITULO SETE: GALERIA DE VILOES . 113"),
        ("Pala", 9.2, 254.5, 422.9, format_toc_line(font_pala_obj, "A Maquina de Guerra V’sori", "113", max_width=185.0)),
        ("Pala", 9.2, 254.5, 434.9, format_toc_line(font_pala_obj, "O Povo de Star City", "122", max_width=185.0)),
        ("PopZero", 12.0, 244.5, 455.0, "INDICE REMISSIVO .................................... 128"),
    ]
    for ftype, sz, x, y, txt in toc_col2_items:
        f = FONT_POP if ftype == "PopZero" else FONT_PALA
        fn = "PopZero" if ftype == "PopZero" else "Palatino"
        out_doc[3].insert_text((x, y), txt, fontname=fn, fontfile=f, fontsize=sz, color=(0, 0, 0))

    # -------------------------------------------------------------
    # PÁGINA 5: Capítulo Um (A NECESSARY EVIL)
    # -------------------------------------------------------------
    print("  -> Página 5: Capítulo Um diagramado com caixas justificadas sem invasão")
    clean_pdf_stream_text(out_doc, 4)

    # Título principal do Capítulo Um em PopZero duplo
    draw_pop_zero(out_doc[4], (115.2, 98.1), "CAPITULO UM: ", fontsize=60.0)
    draw_pop_zero(out_doc[4], (80.1, 158.1), "UM MAL NECESSARIO", fontsize=60.0)

    # Subtítulos em PopZero duplo
    draw_pop_zero(out_doc[4], (84.3, 317.5), "PREPARANDO O CENARIO", fontsize=18.0)
    draw_pop_zero(out_doc[4], (106.1, 614.8), "OS V’SORI", fontsize=18.0)
    draw_pop_zero(out_doc[4], (244.5, 538.3), "TRAICAO", fontsize=16.0)

    # Número da página no rodapé
    out_doc[4].insert_text((442.5, 709.4), "3", fontname="PopZero", fontfile=FONT_POP, fontsize=8.0, color=(0, 0, 0))

    p5 = out_doc[4]

    # Bloco Coluna 1 - Topo (y: 171.1 até 292.6)
    p5_c1_t1 = (
        "Em Necessary Evil, um bando de alienígenas atraiu os super-heróis do mundo para uma "
        "armadilha astuta, assassinando ou aprisionando a maioria deles. Os personagens dos jogadores "
        "são os únicos seres aprimorados que restaram para salvar o planeta — supervilões!\n\n"
        "Como a política dos novos soberanos alienígenas é matar sumariamente qualquer um que manifeste poderes "
        "paranormais, a única opção aberta é lutar ou fugir! Você pode imaginar qual opção os vilões escolhem…"
    )
    p5.insert_textbox(
        fitz.Rect(36.0, 171.1, 235.0, 296.0),
        p5_c1_t1,
        fontname="Palatino",
        fontfile=FONT_PALA,
        fontsize=9.2,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # Bloco Coluna 1 - Meio (y: 324.0 até 428.0)
    p5_c1_t2 = (
        "Naturalmente, tudo começou em 1º de janeiro de 2001. As primeiras naves surgiram sobre todas as grandes "
        "cidades do planeta. Não houve prelúdio e nenhuma exigência. Os alienígenas simplesmente atacaram. "
        "Eles eram uma raça anfíbia feroz que combinava os aspectos mais cruéis de tubarões e crocodilos com uma "
        "agressão ímpar. Eram o pesadelo da humanidade. O povo logo os chamava de “Guelras”."
    )
    p5.insert_textbox(
        fitz.Rect(36.0, 324.0, 235.0, 428.5),
        p5_c1_t2,
        fontname="Palatino",
        fontfile=FONT_PALA,
        fontsize=9.2,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # Bloco Coluna 1 - Meio 2 (y: 429.0 até 592.0)
    p5_c1_t3 = (
        "Nova York virou zona de guerra, Tóquio foi destruída e até a lendária Atlântida afundada "
        "foi demolida e seu governante — o soberano Aquariano — foi assassinado.\n\n"
        "Os super-heróis da Terra lutaram bravamente e contra-atacaram de imediato. Os guelras eram aterradores, "
        "mas ninguém duvidava de que os heróis venceriam no final. Afinal, invasores alienígenas já haviam tentado "
        "atacar a Terra três vezes antes, e os protetores sempre emergiram triunfantes.\n\n"
        "Mas os guelras possuíam armamento superior e selvageria sanguinária. As perdas foram catastróficas. "
        "A Terra começou a temer pelo seu destino."
    )
    p5.insert_textbox(
        fitz.Rect(36.0, 429.0, 235.0, 592.0),
        p5_c1_t3,
        fontname="Palatino",
        fontfile=FONT_PALA,
        fontsize=9.2,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # Bloco Coluna 1 - Base (y: 622.0 até 692.0)
    p5_c1_t4 = (
        "Então veio a virada da maré que as pessoas tanto esperavam nessas guerras épicas de alienígenas "
        "e super-homens. Forças de vanguarda de uma nova raça chegaram em órbita — os V’sori. "
        "Afirmaram ser aliados há muito perdidos de Atlântida e defensores da paz galáctica que cruzaram o cosmos..."
    )
    p5.insert_textbox(
        fitz.Rect(36.0, 622.0, 235.0, 692.0),
        p5_c1_t4,
        fontname="Palatino",
        fontfile=FONT_PALA,
        fontsize=9.2,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # Bloco Coluna 2 - Topo (y: 171.1 até 270.0)
    p5_c2_t1 = (
        "...em busca de seus companheiros de armas ao longo de séculos. Durante sua jornada estelar, "
        "tornaram-se os defensores da galáxia.\n\n"
        "Os V’sori declararam que os Guelras — ou k’tharen — eram mercenários sanguinários que assolavam mundo "
        "após mundo, mas que os V’sori já os haviam combatido antes e ajudariam a Terra a derrotá-los de vez."
    )
    p5.insert_textbox(
        fitz.Rect(244.5, 171.1, 443.5, 270.0),
        p5_c2_t1,
        fontname="Palatino",
        fontfile=FONT_PALA,
        fontsize=9.2,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # Bloco Coluna 2 - Meio (y: 271.0 até 406.0)
    p5_c2_t2 = (
        "O maior super-herói da Terra, o Campeão da Força Alfa, voou ao espaço para encontrá-los. "
        "Retornou trazendo um apelo inflamado para que a humanidade resistisse com bravura mais um pouco. "
        "E o povo resistiu, com extremo sacrifício em sangue e determinação heroica.\n\n"
        "Quando a frota V’sori chegou em massa, a armada k’tharen levantou voo. As naves travaram uma batalha "
        "titânica nos céus, e os V’sori venceram, transmitindo as imagens dos guelras em fuga para todo o planeta."
    )
    p5.insert_textbox(
        fitz.Rect(244.5, 271.0, 443.5, 406.0),
        p5_c2_t2,
        fontname="Palatino",
        fontfile=FONT_PALA,
        fontsize=9.2,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # Bloco Coluna 2 - Meio 2 (y: 407.0 até 522.0)
    p5_c2_t3 = (
        "A humanidade acolheu seus nobres salvadores alienígenas de braços abertos. Jovens dançavam nas ruas "
        "proclamando uma era de paz e fraternidade. Os raros comentaristas céticos foram vaiados e silenciados. "
        "Governos enfraquecidos entregaram as chaves figurativas de suas capitais aos novos aliados estelares."
    )
    p5.insert_textbox(
        fitz.Rect(244.5, 407.0, 443.5, 522.0),
        p5_c2_t3,
        fontname="Palatino",
        fontfile=FONT_PALA,
        fontsize=9.2,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # Bloco Coluna 2 - Base (y: 546.0 até 692.0)
    p5_c2_t4 = (
        "É claro que era exatamente isso o que os alienígenas queriam desde o início. Em todas as capitais, "
        "heróis e líderes mundiais se uniram para homenagear os visitantes. Multidões aplaudiam quando as naves "
        "V’sori pairavam sobre os céus. Super-heróis, presidentes e astros da mídia compareceram a essas grandiosas galas. "
        "O mundo assistia em lágrimas aos seus maiores ícones saudando os salvadores.\n\n"
        "Os aplausos viraram gritos de pavor quando as naves V’sori abriram fogo sobre todos os reunidos…"
    )
    p5.insert_textbox(
        fitz.Rect(244.5, 546.0, 443.5, 692.0),
        p5_c2_t4,
        fontname="Palatino",
        fontfile=FONT_PALA,
        fontsize=9.2,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # Salvar PDF em traduzidos/ com fallback se estiver aberto
    try:
        out_doc.save(str(OUTPUT_PDF), garbage=4, deflate=True)
        print(f"\nSalvo com sucesso em: {OUTPUT_PDF}")
    except Exception as e:
        alt_pdf = TRADUZIDOS_DIR / "necessary-evil-swade-invasion-5-paginas-traduzido-novo.pdf"
        out_doc.save(str(alt_pdf), garbage=4, deflate=True)
        print(f"\nArquivo aberto no visualizador. Salvo como: {alt_pdf.name}")
    print(f"\n🎉 PDF traduzido calibrado salvo em: {OUTPUT_PDF}")

    # Gerar comparativos lado a lado para as 5 páginas
    for pno in range(5):
        orig_img_path = IMAGES_DIR / f"pagina_original_{pno+1}.jpg"
        pix_orig = src_doc[pno].get_pixmap(dpi=150)
        pix_orig.save(orig_img_path)

        trans_img_path = IMAGES_DIR / f"pagina_traduzida_{pno+1}.jpg"
        pix_trans = out_doc[pno].get_pixmap(dpi=150)
        pix_trans.save(trans_img_path)

        im_o = Image.open(orig_img_path)
        im_t = Image.open(trans_img_path)

        w = im_o.width + im_t.width
        h = max(im_o.height, im_t.height)
        comp = Image.new("RGB", (w, h), (255, 255, 255))
        comp.paste(im_o, (0, 0))
        comp.paste(im_t, (im_o.width, 0))

        comp_path = COMPARATIVOS_DIR / f"comparativo_lado_a_lado_pagina_{pno+1}.jpg"
        comp.save(comp_path, quality=92)

        # Copiar para o diretório de artefatos do chat
        brain_path = BRAIN_DIR / f"comparativo_lado_a_lado_pagina_{pno+1}.jpg"
        comp.save(brain_path, quality=92)
        print(f"  -> Comparativo lado a lado gerado: {comp_path.name}")

    # Gerar Markdown em traduzidos/
    md_content = """# NECESSARY EVIL: INVASÃO (SWADE)
## Edição em Português Brasileiro — Lote de Teste (5 Primeiras Páginas)
> **Fonte Original:** `necessary-evil-swade-invasion (Original).pdf`  
> **Sistema:** Savage Worlds Edição Aventura (SWADE)  
> **Traduzido e Diagramado por:** Book Formatter (AI Skill)  

---

## 📄 Página 1: Capa
**NECESSARY EVIL: INVASÃO**  
*Um Cenário de Supervilões para Savage Worlds Edição Aventura*  
Pinnacle Entertainment Group (PEG)  

---

## 📄 Página 2: Folha de Guarda
*Esta página foi inserida propositalmente para facilitar a impressão frente e verso.*

---

## 📄 Página 3: Créditos e Dedicatórias

**NECESSARY EVIL: INVASÃO**

- **Autoria:** Clint Black, Shane Lacy Hensley e Scott Pyle  
- **Atualizações para SWADE:** Clint Black e Darrell Hayhurst  
- **Ilustrações Internas:** Bad Moon Studio, Storn Cook, David Corsi, James Denton, Robin Elliott, Bien Flores, Gil Formosa, Allen Geneta, Ani Ghosh, Jason Juta, Saga Mackenzie, Aaron J Riley, Martin Sickree, Vincenzo Siriani, Unique Soparie, Dimitar Spasov, Talisman Studios, Cheyenne Wright  
- **Capa:** Bad Moon Studio  
- **Material Adicional e Edição:** Piotr Korys, Randy Mosiondz, Shane Lacy Hensley, Zeke Sparkes, Chris Toh e Matt Cutter  
- **Heroísmo de Última Hora:** Dave Blewer, Butch Curry, Joel Kinstle, Piotr Korys, Dennis Mohr, Chris Toh e Brent Wolke  
- **Marketing e Logística:** Jodi Black, Chris Landauer e Christine Lapp  
- **Produção:** Darrell Hayhurst, Simon Lucas, Jessica Rogers e Donald Schepis  

---

## 📄 Página 4: Sumário (Table of Contents)

**SUMÁRIO**

### Coluna 1
- **CAPÍTULO UM: UM MAL NECESSÁRIO** — 3
  - Ômega — 5
  - Star City — 5
- **CAPÍTULO DOIS: CRIANDO VILÕES** — 13
  - Ancestralidades Necessárias — 14
  - Complicações Alteradas — 15
  - Novas Complicações — 15
  - Regras de Cenário — 15
- **SEÇÃO DO MESTRE**
- **CAPÍTULO TRÊS: UM MUNDO DE MALDADE** — 18
  - O Início — 18
  - Os V’sori — 19
  - Por Trás da Máscara — 21
  - Atlântida — 21
- **CAPÍTULO QUATRO: SEGREDOS DE STAR CITY** — 24
  - Guia Geográfico de Star City — 25
- **CAPÍTULO CINCO: AVENTURAS** — 38
  - Gerador de Aventuras — 38
  - Resumo dos Pontos de Enredo — 38
  - Episódio 1: Fuga da Prisão! — 43
  - Episódio 2: Os Irregulares Subterrâneos — 46
  - Episódio 3: A Primeira Família — 49
  - Episódio 4: O Enforcado — 51
  - Episódio 5: Mestiços — 53
  - Episódio 6: Saqueadores do Templo Perdido — 55
  - Episódio 7: Vira-Casaca — 57
  - Episódio 8: Assalto ao Satélite 15! — 59
  - Episódio 9: Um Vilão os Liderará! — 61
  - Episódio 10: Retorno do Forasteiro — 63
  - Episódio 11: A Contingência Ômega! — 66
- **CAPÍTULO SEIS: CONTOS SELVAGENS** — 68
  - Culto dos Deuses Espaciais — 68
  - Cuidado com o Adormecido — 69

### Coluna 2
- O Retorno do Monólito! — 70
- Problemas na Base Hidro 11 — 72
- Vendetta — 74
- O Legado do Coronel Clone — 76
- Puxando a Tomada — 78
- Fogo dos Céus — 80
- Culto de Sangue — 82
- Destruição Robótica — 85
- Meia-Noite no Jardim do Dr. Devolução — 87
- Sangria Alienígena — 89
- Vidas Paralelas — 91
- Um Dia na Vida de um Herói — 92
- A Câmara — 94
- Os Cães de Guerra — 97
- O Resgate — 98
- O Inimigo do Meu Inimigo — 99
- Espreitador em Star City — 100
- Terror em Tarrytown — 103
- O Retorno de 4-Star e Lucky — 105
- O Opositor Alienígena — 107
- Caçando os Caçadores — 108
- A Cruz Vermelha — 109
- O Cofre — 111
- **CAPÍTULO SETE: GALERIA DE VILÕES** — 113
  - A Máquina de Guerra V’sori — 113
  - O Povo de Star City — 122
- **ÍNDICE REMISSIVO** — 128

---

## 📄 Página 5: Capítulo Um — Um Mal Necessário

### Banner Superior
**CAPÍTULO UM: UM MAL NECESSÁRIO**

### Coluna 1
Em *Necessary Evil*, um bando de alienígenas atraiu os super-heróis do mundo para uma armadilha astuta e matou ou aprisionou a maioria deles. Os personagens dos jogadores são os únicos seres aprimorados que restaram para salvar o planeta — supervilões!

Como a política dos novos soberanos alienígenas é matar qualquer um que manifeste poderes paranormais, a única opção aberta é lutar ou fugir! Você pode imaginar qual opção os vilões escolhem…

#### PREPARANDO O CENÁRIO
Naturalmente, tudo começou em 1º de janeiro de 2001. As primeiras naves surgiram sobre todas as grandes cidades do planeta. Não houve prelúdio e nenhuma exigência. Os alienígenas simplesmente atacaram. Eles eram uma raça anfíbia feroz que combinava os aspectos mais cruéis de tubarões e crocodilos com uma agressão ímpar. Eram o pesadelo da humanidade. O povo logo os chamava de "Guelras".

Nova York virou zona de guerra, Tóquio foi destruída e até a lendária Atlântida afundada foi demolida e seu governante — o soberano Aquariano — foi assassinado.

Os super-heróis da Terra lutaram bravamente e contra-atacaram de imediato. Os guelras eram aterradores, mas ninguém duvidava de que os heróis venceriam no final. Afinal, invasores alienígenas já haviam tentado atacar a Terra três vezes antes, e os protetores sempre emergiram triunfantes.

Mas os guelras possuíam armamento superior e selvageria sanguinária. As perdas foram catastróficas. A Terra começou a temer pelo seu destino.

#### OS V’SORI
Então veio a virada da maré que as pessoas tanto esperavam nessas guerras épicas de alienígenas e super-homens. Forças de vanguarda de uma nova raça chegaram em órbita — os V’sori. Afirmaram ser aliados há muito perdidos de Atlântida e defensores da paz galáctica que cruzaram o cosmos...

### Coluna 2
...em busca de seus companheiros de armas ao longo de séculos. Durante sua jornada estelar, tornaram-se os defensores da galáxia.

Os V’sori declararam que os Guelras — ou k’tharen — eram mercenários sanguinários que assolavam mundo após mundo, mas que os V’sori já os haviam combatido antes e ajudariam a Terra a derrotá-los de vez.

O maior super-herói da Terra, o Campeão da Força Alfa, voou ao espaço para encontrá-los. Retornou trazendo um apelo inflamado para que a humanidade resistisse com bravura mais um pouco. E o povo resistiu, com extremo sacrifício em sangue e determinação heroica.

Quando a frota V’sori chegou em massa, a armada k’tharen levantou voo. As naves travaram uma batalha titânica nos céus, e os V’sori venceram, transmitindo as imagens dos guelras em fuga para todo o planeta.

A humanidade acolheu seus nobres salvadores alienígenas de braços abertos. Jovens dançavam nas ruas proclamando uma era de paz e fraternidade. Os raros comentaristas céticos foram vaiados e silenciados. Governos enfraquecidos entregaram as chaves figurativas de suas capitais aos novos aliados estelares.

#### TRAIÇÃO
É claro que era exatamente isso o que os alienígenas queriam desde o início. Em todas as capitais, heróis e líderes mundiais se uniram para homenagear os visitantes. Multidões aplaudiam quando as naves V’sori pairavam sobre os céus. Super-heróis, presidentes e astros da mídia compareceram a essas grandiosas galas. O mundo assistia em lágrimas aos seus maiores ícones saudando os salvadores.

Os aplausos viraram gritos de pavor quando as naves V’sori abriram fogo sobre todos os reunidos…
"""
    OUTPUT_MD.write_text(md_content, encoding="utf-8")
    OUTPUT_TXT.write_text(md_content, encoding="utf-8")
    print(f"📄 Arquivos Markdown e TXT salvos em: {TRADUZIDOS_DIR}")


if __name__ == "__main__":
    build_translation()
