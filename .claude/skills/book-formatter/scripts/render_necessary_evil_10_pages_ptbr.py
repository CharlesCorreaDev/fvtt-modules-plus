#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
render_necessary_evil_10_pages_ptbr.py
Gera o PDF traduzido e diagramado em alta fidelidade das 10 primeiras páginas de Necessary Evil (SWADE).
Preserva 100% da arte original, texturas de pergaminho, raios e ilustrações,
substituindo os textos em inglês por português brasileiro nos boxes exatos.
"""

import sys
import pymupdf as fitz
from pathlib import Path

# Configurar UTF-8
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

INPUT_PDF = Path(r"D:\tmp\rrppgg\swade\pra traduzir\necessary-evil-swade-invasion.pdf")
OUTPUT_PDF = Path(r"D:\tmp\rrppgg\swade\pra traduzir\necessary-evil-swade-invasion-10-paginas-ptbr.pdf")

# Fontes do sistema
FONT_PALATINO = r"C:\Windows\Fonts\pala.ttf"
FONT_PALATINO_BOLD = r"C:\Windows\Fonts\palab.ttf"
FONT_PALATINO_ITALIC = r"C:\Windows\Fonts\palai.ttf"
FONT_IMPACT = r"C:\Windows\Fonts\impact.ttf"


def draw_outlined_title(page, rect, text, fontsize=36, color=(1, 1, 1), outline_color=(0, 0, 0), align=fitz.TEXT_ALIGN_CENTER):
    """Renderiza texto com contorno preto e preenchimento colorido para fidelidade a quadrinhos."""
    offsets = [(-1.5, 0), (1.5, 0), (0, -1.5), (0, 1.5), (-1.2, -1.2), (1.2, 1.2), (-1.2, 1.2), (1.2, -1.2)]
    for dx, dy in offsets:
        r = fitz.Rect(rect.x0 + dx, rect.y0 + dy, rect.x1 + dx, rect.y1 + dy)
        page.insert_textbox(r, text, fontname="impact", fontfile=FONT_IMPACT, fontsize=fontsize, color=outline_color, align=align)
    page.insert_textbox(rect, text, fontname="impact", fontfile=FONT_IMPACT, fontsize=fontsize, color=color, align=align)


def draw_section_header(page, rect, text, fontsize=12):
    """Subtítulo estilizado com contorno."""
    offsets = [(-0.8, 0), (0.8, 0), (0, -0.8), (0, 0.8)]
    for dx, dy in offsets:
        r = fitz.Rect(rect.x0 + dx, rect.y0 + dy, rect.x1 + dx, rect.y1 + dy)
        page.insert_textbox(r, text, fontname="impact", fontfile=FONT_IMPACT, fontsize=fontsize, color=(0, 0, 0), align=fitz.TEXT_ALIGN_LEFT)
    page.insert_textbox(rect, text, fontname="impact", fontfile=FONT_IMPACT, fontsize=fontsize, color=(1, 1, 1), align=fitz.TEXT_ALIGN_LEFT)


def redact_and_clean_page(page, skip_yellow_banner=False):
    """Aplica máscara precisa sobre as palavras para remover texto original sem destruir arte."""
    words = page.get_text("words")
    for w in words:
        x0, y0, x1, y1 = w[0], w[1], w[2], w[3]
        if skip_yellow_banner and y0 < 170:
            # Banner amarelo: fill amarelo exato (#FDF202)
            page.add_redact_annot(fitz.Rect(x0 - 1, y0 - 1, x1 + 1, y1 + 1), fill=(0.99, 0.95, 0.01))
        else:
            # Fundo padrão de leitura da página: branco suave
            page.add_redact_annot(fitz.Rect(x0 - 0.5, y0 - 0.5, x1 + 0.5, y1 + 0.5), fill=(1, 1, 1))
    page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)


def build_translated_pdf():
    print(f"📖 Abrindo PDF original: {INPUT_PDF.name}")
    doc = fitz.open(str(INPUT_PDF))

    # Criar novo documento com as 10 primeiras páginas
    out_doc = fitz.open()

    for pno in range(10):
        src_page = doc[pno]
        rect = src_page.rect
        new_page = out_doc.new_page(width=rect.width, height=rect.height)
        new_page.show_pdf_page(rect, doc, pno)

    print("🎨 Diagramando páginas traduzidas em alta fidelidade...")

    # -------------------------------------------------------------
    # PÁGINA 1: Capa (Mantém a arte impecável de capa)
    # -------------------------------------------------------------
    print("  -> Página 1: Capa (Arte original preservada)")

    # -------------------------------------------------------------
    # PÁGINA 2: Folha de Guarda
    # -------------------------------------------------------------
    print("  -> Página 2: Folha de Guarda")
    p2 = out_doc[1]
    redact_and_clean_page(p2)
    p2.insert_textbox(
        fitz.Rect(80, 310, 397, 340),
        "Página propositalmente inserida para facilitar a impressão frente e verso.",
        fontname="pala_it",
        fontfile=FONT_PALATINO_ITALIC,
        fontsize=9,
        color=(0.4, 0.4, 0.4),
        align=fitz.TEXT_ALIGN_CENTER
    )

    # -------------------------------------------------------------
    # PÁGINA 3: Créditos
    # -------------------------------------------------------------
    print("  -> Página 3: Créditos e Licença")
    p3 = out_doc[2]
    # Limpar textos sem apagar logotipos de rodapé
    words_p3 = p3.get_text("words")
    for w in words_p3:
        if w[1] < 550 or w[1] > 650:
            p3.add_redact_annot(fitz.Rect(w[0] - 0.5, w[1] - 0.5, w[2] + 0.5, w[3] + 0.5), fill=(1, 1, 1))
    p3.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)

    # Cabeçalho da página 3
    draw_outlined_title(p3, fitz.Rect(140, 150, 337, 215), "INVASÃO", fontsize=34, color=(0.95, 0.1, 0.1))

    creditos_txt = (
        "Autoria: Clint Black, Shane Lacy Hensley e Scott Pyle\n"
        "Atualizações para SWADE: Clint Black e Darrell Hayhurst\n"
        "Ilustrações Internas: Bad Moon Studio, Storn Cook, David Corsi, James Denton, Robin Elliott, "
        "Bien Flores, Gil Formosa, Allen Geneta, Ani Ghosh, Jason Juta, Saga Mackenzie, Aaron J Riley, "
        "Martin Sickree, Vincenzo Siriani, Unique Soparie, Dimitar Spasov, Talisman Studios, Cheyenne Wright\n"
        "Capa: Bad Moon Studio | Edição e Material Adicional: Piotr Korys, Randy Mosiondz, Shane Lacy Hensley, "
        "Zeke Sparkes, Chris Toh e Matt Cutter\n"
        "Heroísmo de Última Hora: Dave Blewer, Butch Curry, Joel Kinstle, Dennis Mohr, Brent Wolke\n"
        "Marketing e Logística: Jodi Black, Chris Landauer e Christine Lapp | Produção: Darrell Hayhurst, Simon Lucas"
    )
    p3.insert_textbox(
        fitz.Rect(38, 225, 439, 385),
        creditos_txt,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=7.5,
        color=(0.1, 0.1, 0.1),
        align=fitz.TEXT_ALIGN_CENTER
    )

    dedicatorias_txt = (
        "Dedicatória de Clint: Aos meus pais, que me ensinaram a amar. Ao meu irmão, Gary, que me ensinou a "
        "compartilhar o que você ama. A Kay Reid, que me ensinou que eu amo escrever. A Trinity e Bethany, a quem "
        "amo incondicionalmente. E à minha Musa, agora e para sempre.\n\n"
        "Dedicatória de Shane: À minha prima Liz, que lutou contra o mal verdadeiro. Você faz muita falta. "
        "O mundo ficou muito mais escuro sem o seu sorriso caloroso constante.\n\n"
        "Testadores de Jogo: Ben Ansaldo, Adam Black, Jodi Black, Mark Francis, Sharon Francis, Marguerite Frey, "
        "Zachary Kennedy, Frank Chrisley, Rich Miller, Kyle Gallagher, Skipper Beale, Christopher Landauer."
    )
    p3.insert_textbox(
        fitz.Rect(38, 395, 439, 545),
        dedicatorias_txt,
        fontname="pala_it",
        fontfile=FONT_PALATINO_ITALIC,
        fontsize=7,
        color=(0.15, 0.15, 0.15),
        align=fitz.TEXT_ALIGN_CENTER
    )

    # -------------------------------------------------------------
    # PÁGINA 4: Sumário
    # -------------------------------------------------------------
    print("  -> Página 4: Sumário")
    p4 = out_doc[3]
    redact_and_clean_page(p4)

    draw_outlined_title(p4, fitz.Rect(70, 24, 407, 85), "SUMÁRIO", fontsize=38, color=(0.99, 0.95, 0.01))

    toc_col1 = (
        "CAPÍTULO UM: UM MAL NECESSÁRIO ............... 3\n"
        "  Ômega ............................................................................ 5\n"
        "  Star City ........................................................................ 5\n\n"
        "CAPÍTULO DOIS: CRIANDO VILÕES ................ 13\n"
        "  Ancestralidades Necessárias ............................................. 14\n"
        "  Complicações Alteradas ................................................... 15\n"
        "  Novas Complicações ........................................................ 15\n"
        "  Regras de Cenário .......................................................... 15\n\n"
        "SEÇÃO DO MESTRE\n"
        "CAPÍTULO TRÊS: UM MUNDO DE MALDADE ....... 18\n"
        "  O Início .......................................................................... 18\n"
        "  Os V’sori ........................................................................ 19\n"
        "  Por Trás da Máscara ....................................................... 21\n"
        "  Atlântida ........................................................................ 21\n\n"
        "CAPÍTULO QUATRO: SEGREDOS DE STAR CITY ... 24\n"
        "  Guia Geográfico de Star City ............................................. 25\n\n"
        "CAPÍTULO CINCO: AVENTURAS .......................... 38\n"
        "  Gerador de Aventuras ....................................................... 38\n"
        "  Resumo dos Pontos de Enredo .......................................... 38\n"
        "  Episódio 1: Fuga da Prisão! ............................................. 43\n"
        "  Episódio 2: Os Irregulares Subterrâneos ............................ 46\n"
        "  Episódio 3: A Primeira Família ........................................ 49\n"
        "  Episódio 4: O Enforcado ................................................... 51\n"
        "  Episódio 5: Mestiços ........................................................ 53\n"
        "  Episódio 6: Saqueadores do Templo Perdido ................... 55\n"
        "  Episódio 7: Vira-Casaca .................................................... 57\n"
        "  Episódio 8: Assalto ao Satélite 15! ................................... 59\n"
        "  Episódio 9: Um Vilão os Liderará! .................................... 61\n"
        "  Episódio 10: Retorno do Forasteiro ................................. 63\n"
        "  Episódio 11: A Contingência Ômega! ................................. 66\n"
    )
    p4.insert_textbox(
        fitz.Rect(36, 105, 233, 560),
        toc_col1,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=7.8,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_LEFT
    )

    toc_col2 = (
        "CAPÍTULO SEIS: CONTOS SELVAGENS ............. 68\n"
        "  Culto dos Deuses Espaciais ............................................... 68\n"
        "  Cuidado com o Adormecido ............................................. 69\n"
        "  O Retorno do Monólito! ................................................... 70\n"
        "  Problemas na Base Hidro 11 ............................................. 72\n"
        "  Vendetta ......................................................................... 74\n"
        "  O Legado do Coronel Clone .............................................. 76\n"
        "  Puxando a Tomada ......................................................... 78\n"
        "  Fogo dos Céus ................................................................. 80\n"
        "  Culto de Sangue ............................................................. 82\n"
        "  Destruição Robótica ......................................................... 85\n"
        "  Meia-Noite no Jardim do Dr. Devolução ........................... 87\n"
        "  Sangria Alienígena .......................................................... 89\n"
        "  Vidas Paralelas ............................................................... 91\n"
        "  Um Dia na Vida de um Herói ........................................... 92\n"
        "  A Câmara ........................................................................ 94\n"
        "  Os Cães de Guerra ........................................................... 97\n"
        "  O Resgate ....................................................................... 98\n"
        "  O Inimigo do Meu Inimigo .............................................. 99\n"
        "  Espreitador em Star City ............................................... 100\n"
        "  Terror em Tarrytown ..................................................... 103\n"
        "  O Retorno de 4-Star e Lucky .......................................... 105\n"
        "  O Opositor Alienígena ................................................... 107\n"
        "  Caçando os Caçadores ................................................... 108\n"
        "  A Cruz Vermelha ........................................................... 109\n"
        "  O Cofre ......................................................................... 111\n\n"
        "CAPÍTULO SETE: GALERIA DE VILÕES .............. 113\n"
        "  A Máquina de Guerra V’sori ........................................... 113\n"
        "  O Povo de Star City ....................................................... 122\n\n"
        "ÍNDICE REMISSIVO .............................................. 128\n"
    )
    p4.insert_textbox(
        fitz.Rect(245, 105, 442, 560),
        toc_col2,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=7.8,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_LEFT
    )

    # -------------------------------------------------------------
    # PÁGINA 5: Capítulo Um (Alta Fidelidade)
    # -------------------------------------------------------------
    print("  -> Página 5: Capítulo Um — Um Mal Necessário")
    p5 = out_doc[4]
    redact_and_clean_page(p5, skip_yellow_banner=True)

    # Títulos sobre os banners amarelos originais
    draw_outlined_title(p5, fitz.Rect(80, 52, 396, 105), "CAPÍTULO UM:", fontsize=36)
    draw_outlined_title(p5, fitz.Rect(80, 116, 396, 168), "UM MAL NECESSÁRIO", fontsize=36)

    # Coluna 1
    p5_col1_p1 = (
        "Em Necessary Evil, um bando de alienígenas atraiu os super-heróis do mundo para uma "
        "armadilha astuta, assassinando ou aprisionando a imensa maioria deles. Os personagens dos jogadores "
        "são os únicos seres aprimorados que restaram para salvar o planeta — supervilões!\n\n"
        "Como a política dos senhores alienígenas é matar sumariamente qualquer um que manifeste poderes "
        "paranormais, a única opção aberta é lutar ou fugir! Você pode imaginar qual opção a maioria dos vilões escolhe?"
    )
    p5.insert_textbox(
        fitz.Rect(36, 171, 235, 292),
        p5_col1_p1,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=9.2,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    draw_section_header(p5, fitz.Rect(36, 299, 235, 324), "PREPARANDO O CENÁRIO", fontsize=13)

    p5_col1_p2 = (
        "Naturalmente, tudo começou em 1º de janeiro de 2001. As primeiras naves surgiram sobre todas as grandes "
        "cidades do planeta. Não houve prelúdio e nenhuma exigência. Os alienígenas simplesmente atacaram.\n\n"
        "Eles eram uma raça anfíbia feroz que combinava os aspectos mais crueis de tubarões e crocodilos. "
        "A humanidade logo os apelidou de 'guelras', embora tenhamos descoberto que eles se chamavam k'tharen.\n\n"
        "Nova York se tornou uma zona de guerra caótica, Tóquio foi bombardeada até as cinzas e Paris foi destruída "
        "antes que os heróis da Terra pudessem organizar uma defesa eficaz. Os heróis lutaram com bravura, "
        "mas os guelras possuíam armamento e tecnologia superiores."
    )
    p5.insert_textbox(
        fitz.Rect(36, 327, 235, 690),
        p5_col1_p2,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=9.1,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # Coluna 2
    draw_section_header(p5, fitz.Rect(245, 171, 443, 196), "OS DEFENSORES", fontsize=13)

    p5_col2 = (
        "Quando tudo parecia perdido, uma enorme nave alienígena despontou nos céus. Seus tripulantes eram "
        "altos, esguios e de beleza quase divina. Declararam chamar-se V'sori e que haviam cruzado sistemas estelares "
        "em perseguição aos k'tharen — saqueadores sanguinários que vinham assolando mundos indefesos.\n\n"
        "Os V'sori prometeram ajudar a Terra a derrotar os invasores. O maior herói do mundo, o Campeão da Força "
        "Alfa, voou ao espaço para encontrar-se com eles e retornou trazendo um apelo inflamado para que a humanidade "
        "resistisse com bravura mais um pouco. E o povo resistiu, com enorme sacrifício em sangue.\n\n"
        "A frota V'sori enfrentou a armada k'tharen no espaço, venceu a batalha e transmitiu as imagens de sua vitória "
        "para todo o planeta. A humanidade, em prantos de alívio, acolheu seus salvadores com celebrações épicas nas ruas."
    )
    p5.insert_textbox(
        fitz.Rect(245, 199, 443, 520),
        p5_col2,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=9.1,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    draw_section_header(p5, fitz.Rect(245, 525, 443, 550), "A TRAIÇÃO", fontsize=13)

    p5_col2_p3 = (
        "Contudo, tudo não passava de uma farsa calculada. Enquanto os super-heróis e as multidões comemoravam nas "
        "praças centrais de todas as grandes capitais, pulsos desintegradores foram ativados simultaneamente..."
    )
    p5.insert_textbox(
        fitz.Rect(245, 553, 443, 690),
        p5_col2_p3,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=9.1,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # -------------------------------------------------------------
    # PÁGINA 6: Capítulo Um (Continuação)
    # -------------------------------------------------------------
    print("  -> Página 6: A Derrota e a Face do Inimigo")
    p6 = out_doc[5]
    redact_and_clean_page(p6)

    p6_col1 = (
        "Momentos depois, as naves de guerra dos k'tharen retornaram — operando abertamente como soldados executores "
        "subordinados aos próprios V'sori!\n\n"
        "O Campeão estava diante das câmeras mundiais quando os V'sori atacaram. Eles conheciam sua fraqueza exata: "
        "radiação concentrada. Antes que ele pudesse agir, rajadas de nêutrons perfuraram seu peito. Seu corpo tombou inerte "
        "no asfalto diante de bilhões de telespectadores horrorizados.\n\n"
        "Os alienígenas venceram sem encontrar resistência militar restante."
    )
    p6.insert_textbox(
        fitz.Rect(36, 32, 235, 205),
        p6_col1,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=9,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    draw_section_header(p6, fitz.Rect(36, 212, 235, 232), "A DERROTA", fontsize=12)

    p6_col1_sub = (
        "Em seguida, todas as redes de rádio e TV transmitiram o anúncio solene do Almirante V'sori: eles ambicionavam "
        "os recursos da Terra e criaram a guerra para liquidar nossos defensores de uma vez por todas."
    )
    p6.insert_textbox(
        fitz.Rect(36, 235, 235, 292),
        p6_col1_sub,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=9,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    p6_col2 = (
        "Os V'sori instalaram governadores sobre as nações da Terra e impuseram toque de recolher sob ameaça de extermínio "
        "a qualquer pessoa que manifeste dons paranormais. Eles acreditam ter eliminado toda resistência.\n\n"
        "Mas estão errados. Os heróis honrados morreram, mas ainda restam seres dotados de poderes extraordinários nas sombras.\n\n"
        "Eles são supervilões. E agora são um mal necessário."
    )
    p6.insert_textbox(
        fitz.Rect(244, 32, 443, 282),
        p6_col2,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=9.1,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    draw_outlined_title(p6, fitz.Rect(140, 296, 340, 324), "A FACE DO INIMIGO", fontsize=15, color=(0.99, 0.95, 0.01))

    inimigo_txt = (
        "Os K'tharen: Pesadelos vivos, os k'tharen são alienígenas monstruosos, brutais e babantes. A maioria passa de "
        "2,10m de altura, com pura massa muscular recoberta por escamas grossas como as de um crocodilo. Apelidados de 'guelras', "
        "possuem cristas ósseas e mandíbulas de tubarão com dentes afiados. Suas costas exibem tons de verde-escuro, anil "
        "ou violeta, enquanto o peito é pálido.\n\n"
        "Os V'sori: Por outro lado, os V'sori possuem traços de grande beleza aristocrática. São altos, esbeltos, de pele azulada "
        "e comunicam-se telepaticamente. Em combate, utilizam armaduras bioenergéticas avançadas com elmos espelhados."
    )
    p6.insert_textbox(
        fitz.Rect(36, 335, 335, 670),
        inimigo_txt,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=9,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # -------------------------------------------------------------
    # PÁGINA 7: Ômega e Star City
    # -------------------------------------------------------------
    print("  -> Página 7: Ômega e Star City")
    p7 = out_doc[6]
    redact_and_clean_page(p7)

    draw_outlined_title(p7, fitz.Rect(75, 38, 195, 78), "ÔMEGA", fontsize=28, color=(0.99, 0.95, 0.01))

    omega_txt = (
        "O ano é 2004. A Terra está sob o domínio alienígena há mais de dois anos.\n\n"
        "Os vários levantes populares foram esmagados, mas a resistência mais eficaz surgiu de onde menos se esperava: "
        "do submundo do crime organizado. Essa rede secreta é conhecida como Ômega, liderada pelo Dr. Destruição.\n\n"
        "A Ômega organiza-se em células isoladas: cada grupo conhece apenas seus integrantes diretos, preservando a rede "
        "caso algum membro seja capturado."
    )
    p7.insert_textbox(
        fitz.Rect(36, 82, 235, 395),
        omega_txt,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=9,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    draw_section_header(p7, fitz.Rect(36, 405, 235, 425), "O ROSTO DA DESTRUIÇÃO", fontsize=11)

    destruicao_txt = (
        "O Dr. Destruição atua no ramo da supervilania desde os anos 60. Ninguém conhece sua verdadeira face por trás da "
        "máscara de ferro, mas seu poder e inteligência genial são lendários. Ele não aceita que alienígenas tomem o mundo "
        "que ele mesmo pretendia dominar!"
    )
    p7.insert_textbox(
        fitz.Rect(36, 430, 235, 680),
        destruicao_txt,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=9,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # Star City (Coluna 2)
    draw_outlined_title(p7, fitz.Rect(280, 38, 410, 78), "STAR CITY", fontsize=28, color=(0.99, 0.95, 0.01))

    star_city_txt = (
        "A maior parte da trama de Necessary Evil transcorre em Star City. Enquanto grandes capitais foram reduzidas a escombros, "
        "Star City é uma metrópole futurista erguida em uma ilha misteriosa criada por uma entidade cósmica: o Forasteiro.\n\n"
        "O motivo pelo qual o Forasteiro criou a ilha e a razão pela qual tantos seres superpoderosos surgem aqui permanecem um mistério.\n\n"
        "População: Star City abriga hoje cerca de cinco milhões de habitantes, dos oito milhões que viviam aqui antes da guerra.\n\n"
        "Geografia: A ilha localiza-se a 3 km da costa leste dos EUA, a meio caminho entre Boston e Nova York."
    )
    p7.insert_textbox(
        fitz.Rect(244, 82, 443, 685),
        star_city_txt,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=9,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # -------------------------------------------------------------
    # PÁGINA 8: Geografia e Transporte em Star City
    # -------------------------------------------------------------
    print("  -> Página 8: Geografia e Ponte Marítima")
    p8 = out_doc[7]
    redact_and_clean_page(p8)

    p8_col1 = (
        "Star City tem a forma exata de uma estrela de oito pontas: quatro pontas maiores alternam-se com quatro menores em "
        "torno de um núcleo circular maciço.\n\n"
        "Cada ponta forma uma subdivisão metropolitana. As quatro maiores são nomeadas pelas coordenadas da rosa dos ventos: "
        "Ponta Norte, Ponta Leste, Ponta Sul e Ponta Oeste."
    )
    p8.insert_textbox(
        fitz.Rect(36, 32, 235, 230),
        p8_col1,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=9.2,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    draw_section_header(p8, fitz.Rect(244, 76, 443, 98), "COMO CHEGAR", fontsize=12)

    p8_col2 = (
        "O coração da metrópole é dividido em Cidade Alta ao norte e Cidade Baixa ao sul.\n\n"
        "A ilha conecta-se ao continente através de uma colossal Ponte Marítima com sete faixas de rolamento, "
        "também construída com tecnologia do Forasteiro, ancorando na Ponta Oeste de Star City."
    )
    p8.insert_textbox(
        fitz.Rect(244, 102, 443, 240),
        p8_col2,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=9.2,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # -------------------------------------------------------------
    # PÁGINA 9: Distritos de Star City
    # -------------------------------------------------------------
    print("  -> Página 9: Ponta Norte e Beachhead")
    p9 = out_doc[8]
    redact_and_clean_page(p9)

    p9_col1 = (
        "A sétima faixa da Ponte Marítima foi convertida em linha de trem de levitação magnética ligando Providence até Star City. "
        "Um tráfego intenso de balsas também opera entre a costa e a ilha dia e noite.\n\n"
        "Ponta Norte: O setor mais patrulhado de humanos da cidade. Antigo lar da alta sociedade.\n\n"
        "Prefeito Perez: O morador mais influente é Jerry Perez, que colabora com os alienígenas para manter seu cargo.\n\n"
        "Corpo de Operações Especiais (SOCorp): Tropa paramilitar criada por Perez que caça células da resistência humana com brutalidade."
    )
    p9.insert_textbox(
        fitz.Rect(36, 32, 235, 680),
        p9_col1,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=8.9,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    draw_outlined_title(p9, fitz.Rect(255, 42, 435, 68), "O SENHOR DA GUERRA", fontsize=13, color=(0.99, 0.95, 0.01))

    p9_col2 = (
        "O comandante supremo de Star City é o Senhor da Guerra Grypon, um V'sori idoso e estrategista astuto, sempre protegido "
        "por uma dúzia de k'tharen de elite.\n\n"
        "Beachhead: Complexo militar alienígena isolado por muralhas blindadas colossais. É o santuário inexpugnável dos invasores. "
        "Os únicos humanos autorizados a entrar são escravos controlados ou colaboradores de alta patente."
    )
    p9.insert_textbox(
        fitz.Rect(244, 76, 443, 685),
        p9_col2,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=9,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # -------------------------------------------------------------
    # PÁGINA 10: Distritos e o Forasteiro
    # -------------------------------------------------------------
    print("  -> Página 10: Eastpoint, Tempest, Southpoint e o Forasteiro")
    p10 = out_doc[9]
    redact_and_clean_page(p10)

    draw_outlined_title(p10, fitz.Rect(45, 42, 215, 68), "O DEUS ESPACIAL", fontsize=13, color=(0.99, 0.95, 0.01))

    forasteiro_txt = (
        "Qual a aparência do Forasteiro? Testemunhas o descrevem como um humanoide alto e careca com trajes dourados e vermelhos. "
        "Seus olhos brilham com energia cósmica e suas dimensões físicas alteram-se à vontade: num instante ele tem tamanho humano; "
        "no seguinte, ergue-se como um titã colossal.\n\n"
        "Ponta Leste: Área residencial de trabalhadores e sindicatos. Muitos apoiam a resistência Ômega em segredo."
    )
    p10.insert_textbox(
        fitz.Rect(30, 75, 228, 685),
        forasteiro_txt,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=8.9,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    p10_col2 = (
        "Tempest: Bairro castigado por tempestades oceânicas. Suas ruas desertas servem de refúgio para foragidos e contrabandistas. "
        "No alto de seu arranha-céu principal funcionam geradores alienígenas.\n\n"
        "Ponta Sul: O setor mais degradado e abandonado de Star City. Os alienígenas evitam patrulhar esta área fétida, enviando "
        "apenas esquadrões de extermínio quando distúrbios ameaçam transbordar para os distritos nobres vizinhos."
    )
    p10.insert_textbox(
        fitz.Rect(244, 72, 443, 685),
        p10_col2,
        fontname="pala",
        fontfile=FONT_PALATINO,
        fontsize=9,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_JUSTIFY
    )

    # Salvar PDF final
    out_doc.save(str(OUTPUT_PDF), garbage=4, deflate=True)
    print(f"\n🎉 PDF traduzido e diagramado com sucesso!")
    print(f"📄 Arquivo salvo em: {OUTPUT_PDF}")
    print(f"📦 Tamanho: {OUTPUT_PDF.stat().st_size / 1024:.1f} KB (10 páginas completas em PT-BR)")


if __name__ == "__main__":
    build_translated_pdf()


