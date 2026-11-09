import os
import sys
import pymupdf

sys.stdout.reconfigure(encoding="utf-8")

pdf_path = "D:/tmp/rrppgg/swade/necessary-evil-swade-invasion.pdf"
doc = pymupdf.open(pdf_path)
out_doc = pymupdf.open()

# Insert pages 4, 5, 6 (1-based: 5, 6, 7)
for pno in [4, 5, 6]:
    out_doc.insert_pdf(doc, from_page=pno, to_page=pno)

# Work on Page 0 (Original page 5)
page = out_doc[0]
blocks = page.get_text("blocks")

for b in blocks:
    if b[6] == 0:
        rect = pymupdf.Rect(b[0], b[1], b[2], b[3])
        page.add_redact_annot(rect, fill=(0.96, 0.95, 0.91))

page.apply_redactions()

# Insert translated title
page.insert_textbox(
    pymupdf.Rect(80, 50, 400, 150),
    "CAPÍTULO UM:\nUM MAL NECESSÁRIO",
    fontsize=22,
    fontname="helv",
    color=(0.15, 0.1, 0.1),
    align=pymupdf.TEXT_ALIGN_CENTER
)

# Left column
col1_text = (
    "Em Necessary Evil, um bando de alienígenas atraiu os super-heróis do mundo para uma armadilha astuta, "
    "assassinando ou aprisionando a grande maioria deles. Os personagens dos jogadores são os únicos seres "
    "aprimorados que restaram para salvar o planeta — supervilões!\n\n"
    "Como a política dos senhores alienígenas é matar qualquer um que manifeste poderes paranormais, "
    "a única opção aberta é lutar ou fugir! Você pode imaginar qual opção a maioria dos vilões escolhe…\n\n"
    "PREPARANDO O CENÁRIO\n\n"
    "Naturalmente, tudo começou em 1º de janeiro de 2001. As primeiras naves surgiram sobre todas as grandes cidades "
    "do planeta. Não houve prelúdio nem exigências. Os alienígenas simplesmente atacaram. Eram uma raça anfíbia "
    "que combinava os aspectos mais brutais de tubarões e crocodilos com uma agressividade inigualável. "
    "A população os apelidou de 'Guelras' (Fins).\n\n"
    "Nova York transformou-se em zona de guerra, Tóquio ardeu em chamas e até a submersa Atlântida foi reduzida a escombros, "
    "com seu lendário regente Aquariano morto.\n\n"
    "Os super-heróis da Terra revidaram de imediato. Mas os invasores possuíam tecnologia avançada e ferocidade selvagem; "
    "as perdas foram pesadíssimas. A Terra começou a se desesperar.\n\n"
    "OS V'SORI\n\n"
    "Então ocorreu a virada de maré esperada nessas guerras épicas. Forças de vanguarda de outra raça alienígena "
    "chegaram à órbita: os V'sori. Afirmavam ser aliados antigos de Atlântida buscando seus irmãos perdidos."
)

page.insert_textbox(
    pymupdf.Rect(36, 171, 235, 690),
    col1_text,
    fontsize=8.5,
    fontname="times-roman",
    color=(0.1, 0.1, 0.1)
)

# Right column
col2_text = (
    "Durante essa busca secular, os V'sori haviam se tornado os defensores da galáxia. Declararam que os Guelras — "
    "ou k'tharen — eram mercenários saqueadores, e que os V'sori ajudariam a Terra contra eles.\n\n"
    "O maior herói do mundo, Campeão da Força Alfa, voou ao espaço sideral para encontrá-los e pediu que a humanidade "
    "resistisse mais um pouco. O povo resistiu, com grande custo em sangue.\n\n"
    "A frota V'sori combateu os k'tharen no espaço, venceu e transmitiu as imagens da vitória para a Terra. "
    "A humanidade ovacionou seus salvadores de braços abertos em clima de festa e paz.\n\n"
    "TRAIÇÃO\n\n"
    "Era exatamente o que os alienígenas queriam. Em todas as metrópoles, heróis, presidentes e celebridades reuniram-se "
    "em grandes galas para homenageá-los diante das câmeras de transmissão mundial.\n\n"
    "Os aplausos viraram gritos de pavor quando as naves V'sori abriram fogo sobre as multidões reunidas, e as belonaves "
    "k'tharen retornaram — revelando-se vassalas servis dos próprios V'sori!"
)

page.insert_textbox(
    pymupdf.Rect(244.5, 171, 444, 690),
    col2_text,
    fontsize=8.5,
    fontname="times-roman",
    color=(0.1, 0.1, 0.1)
)

# Save
out_pdf_path = "D:/tmp/rrppgg/swade/necessary-evil-swade-invasion-amostra-ptbr.pdf"
out_doc.save(out_pdf_path)
print("Diagrammed PDF saved to:", out_pdf_path)

