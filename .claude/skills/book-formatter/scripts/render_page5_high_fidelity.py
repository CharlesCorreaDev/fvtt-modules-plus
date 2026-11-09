import os
import sys
import pymupdf

sys.stdout.reconfigure(encoding="utf-8")

pdf_in = "D:/tmp/rrppgg/swade/necessary-evil-swade-invasion.pdf"
doc = pymupdf.open(pdf_in)
out_doc = pymupdf.open()
out_doc.insert_pdf(doc, from_page=4, to_page=4)
page = out_doc[0]

popzero = "D:/tmp/rrppgg/swade/extracted_fonts/QLLGUS+PopulationZeroBB.cff"
pala = "C:/Windows/Fonts/pala.ttf"
palab = "C:/Windows/Fonts/palab.ttf"
palai = "C:/Windows/Fonts/palai.ttf"

# Redact existing English text
d = page.get_text("dict")
for b in d["blocks"]:
    if "lines" in b:
        for l in b["lines"]:
            for s in l["spans"]:
                txt = s["text"].strip()
                if not txt:
                    continue
                bbox = pymupdf.Rect(s["bbox"])
                if bbox.y0 > 165:
                    page.add_redact_annot(bbox, fill=(1.0, 1.0, 1.0))
                elif "CHAPTER" in txt.upper() or "NECESSARY" in txt.upper():
                    page.add_redact_annot(bbox, fill=(0.99, 0.95, 0.01))

page.apply_redactions()

# 1. Main Titles in PopulationZeroBB with black contour stroke
# Line 1: CAPÍTULO UM:
for dx, dy in [(-1.5,0), (1.5,0), (0,-1.5), (0,1.5), (-1,-1), (1,1), (-1,1), (1,-1)]:
    page.insert_text(pymupdf.Point(115+dx, 98+dy), "CAPÍTULO UM:", fontname="popzero", fontfile=popzero, fontsize=60, color=(0,0,0))
page.insert_text(pymupdf.Point(115, 98), "CAPÍTULO UM:", fontname="popzero", fontfile=popzero, fontsize=60, color=(1,1,1))

# Line 2: UM MAL NECESSÁRIO
for dx, dy in [(-1.5,0), (1.5,0), (0,-1.5), (0,1.5), (-1,-1), (1,1), (-1,1), (1,-1)]:
    page.insert_text(pymupdf.Point(82+dx, 158+dy), "UM MAL NECESSÁRIO", fontname="popzero", fontfile=popzero, fontsize=48, color=(0,0,0))
page.insert_text(pymupdf.Point(82, 158), "UM MAL NECESSÁRIO", fontname="popzero", fontfile=popzero, fontsize=48, color=(1,1,1))

# 2. Section Headers in PopulationZeroBB (H2)
# SETTING THE STAGE -> PREPARANDO O CENÁRIO
for dx, dy in [(-0.8,0), (0.8,0), (0,-0.8), (0,0.8)]:
    page.insert_text(pymupdf.Point(54+dx, 317+dy), "PREPARANDO O CENÁRIO", fontname="popzero", fontfile=popzero, fontsize=17, color=(0,0,0))
page.insert_text(pymupdf.Point(54, 317), "PREPARANDO O CENÁRIO", fontname="popzero", fontfile=popzero, fontsize=17, color=(1,1,1))

# THE V’SORI -> OS V’SORI
for dx, dy in [(-0.8,0), (0.8,0), (0,-0.8), (0,0.8)]:
    page.insert_text(pymupdf.Point(100+dx, 613+dy), "OS V’SORI", fontname="popzero", fontfile=popzero, fontsize=17, color=(0,0,0))
page.insert_text(pymupdf.Point(100, 613), "OS V’SORI", fontname="popzero", fontfile=popzero, fontsize=17, color=(1,1,1))

# TREACHERY -> TRAIÇÃO
for dx, dy in [(-0.8,0), (0.8,0), (0,-0.8), (0,0.8)]:
    page.insert_text(pymupdf.Point(315+dx, 538+dy), "TRAIÇÃO", fontname="popzero", fontfile=popzero, fontsize=16, color=(0,0,0))
page.insert_text(pymupdf.Point(315, 538), "TRAIÇÃO", fontname="popzero", fontfile=popzero, fontsize=16, color=(1,1,1))

# 3. Text in Palatino Linotype 10pt with clean flow
col1_p1 = (
    "Em Necessary Evil, um bando de alienígenas atraiu os super-heróis do mundo para uma armadilha astuta, "
    "assassinando ou aprisionando a grande maioria deles. Os personagens dos jogadores são os únicos seres "
    "aprimorados que restaram para salvar o planeta — supervilões!\n\n"
    "Como a política dos senhores alienígenas é matar qualquer um que manifeste poderes paranormais, "
    "a única opção aberta para tais indivíduos é lutar ou fugir! Você pode imaginar qual opção a maioria dos vilões escolhe…"
)
page.insert_textbox(pymupdf.Rect(36, 171, 235, 298), col1_p1, fontname="pala", fontfile=pala, fontsize=10, color=(0,0,0), align=pymupdf.TEXT_ALIGN_JUSTIFY)

col1_p2 = (
    "Naturalmente, tudo começou em 1º de janeiro de 2001. As primeiras naves surgiram sobre todas as grandes cidades "
    "do planeta. Não houve prelúdio nem exigências. Os alienígenas simplesmente atacaram. Eram uma raça anfíbia "
    "que combinava os aspectos mais brutais de tubarões e crocodilos com uma agressividade inigualável. "
    "Eram a matéria dos pesadelos para a maioria das pessoas. A população os apelidou de “Guelras”.\n\n"
    "Nova York virou zona de guerra, Tóquio ardeu em chamas e até a submersa Atlântida foi reduzida a escombros "
    "e seu regente — o lendário Aquariano — foi morto.\n\n"
    "Os super-heróis da Terra revidaram de imediato. Os Guelras eram aterrorizantes, mas ninguém duvidava de que os "
    "heróis venceriam no final. Afinal, alienígenas já haviam tentado invadir a Terra três vezes antes, e os defensores "
    "do planeta sempre triunfaram.\n\n"
    "Mas os invasores possuíam tecnologia avançada e selvagem sede de sangue, de modo que as perdas foram pesadíssimas. "
    "A Terra começou a se preocupar."
)
page.insert_textbox(pymupdf.Rect(36, 325, 235, 595), col1_p2, fontname="pala", fontfile=pala, fontsize=9.8, color=(0,0,0), align=pymupdf.TEXT_ALIGN_JUSTIFY)

col1_p3 = (
    "Então ocorreu a virada de maré que a humanidade aprendeu a esperar nessas guerras épicas de alienígenas "
    "e super-humanos. Tropas de vanguarda de outra raça alienígena chegaram à órbita da Terra — os v’sori. "
    "Afirmavam ser os aliados há muito perdidos de Atlântida, que estiveram procurando por seus"
)
page.insert_textbox(pymupdf.Rect(36, 620, 235, 692), col1_p3, fontname="pala", fontfile=pala, fontsize=9.8, color=(0,0,0), align=pymupdf.TEXT_ALIGN_JUSTIFY)

# Column 2
col2_p1 = (
    "irmãos de armas desaparecidos por centenas de anos. Durante essa busca, haviam crescido para se tornar os defensores da galáxia.\n\n"
    "Os v’sori afirmaram que os Guelras — ou k’tharen, como chamavam a si mesmos — eram mercenários sanguinários que "
    "devastavam mundo após mundo, mas que os v’sori já haviam lutado contra eles e ajudariam a Terra contra eles agora.\n\n"
    "O maior super-herói do planeta, Campeão da Força Alfa, voou ao espaço para encontrá-los. Ele retornou mais tarde "
    "e fez um discurso comovente que pedia para a humanidade resistir apenas mais um pouco. O povo resistiu, embora "
    "o custo final em sangue tenha sido estarrecedor.\n\n"
    "Quando os v’sori chegaram, a frota k’tharen ergueu-se para lutar contra eles. As naves alienígenas travaram uma batalha "
    "colossal no espaço, mas os v’sori venceram e até transmitiram as imagens dos Guelras em fuga para a Terra.\n\n"
    "A humanidade ovacionou seus salvadores e recebeu os protetores alienígenas de braços abertos. Jovens ansiosos dançavam "
    "nas ruas, proclamando uma era de paz e amor. Jornalistas menos confiantes foram vaiados e ridicularizados na imprensa "
    "nacional. E alguns governos dispostos à subserviência chegaram a oferecer as chaves figurativas de suas nações aos alienígenas."
)
page.insert_textbox(pymupdf.Rect(244.5, 171, 443.5, 520), col2_p1, fontname="pala", fontfile=pala, fontsize=9.8, color=(0,0,0), align=pymupdf.TEXT_ALIGN_JUSTIFY)

col2_p2 = (
    "É claro que era exatamente isso o que os alienígenas planejavam desde o início. Em todas as grandes cidades, "
    "heróis e líderes mundiais uniram-se para homenagear os alienígenas. As multidões aplaudiam quando as naves v’sori "
    "surgiam nos céus. Cada super-herói, parceiro mirim, presidente e até astros dos esportes, cinema e música compareceram "
    "a essas recepções suntuosas. O povo da Terra vibrava enquanto assistia seus heróis cumprimentarem os salvadores alienígenas nos noticiários.\n\n"
    "Os aplausos transformaram-se em gritos de desespero quando as naves v’sori abriram fogo sobre a multidão"
)
page.insert_textbox(pymupdf.Rect(244.5, 546, 443.5, 692), col2_p2, fontname="pala", fontfile=pala, fontsize=9.8, color=(0,0,0), align=pymupdf.TEXT_ALIGN_JUSTIFY)

out_file = "D:/tmp/rrppgg/swade/necessary-evil-swade-invasion-pagina5-alta-fidelidade.pdf"
out_doc.save(out_file)
print("Saved alta fidelidade to:", out_file)

pix = page.get_pixmap(dpi=150)
img_preview = "D:/tmp/rrppgg/swade/preview_page5_alta_fidelidade.jpg"
pix.save(img_preview)
print("Saved preview image to:", img_preview)

