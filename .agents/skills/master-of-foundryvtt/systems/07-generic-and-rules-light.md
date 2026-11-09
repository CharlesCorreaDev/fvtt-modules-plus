# Sistemas Genéricos, Regras Customizadas e Nacionais para Foundry VTT 🌐🛠️
> *Base de Conhecimento — Master of Foundry VTT by GM Charles Corrêa*

---

## 1. GURPS 4th Edition (gurps / GURPS 4e Game Aid)
- **Repositório:** [https://github.com/crnormand/gurps](https://github.com/crnormand/gurps)
- **Arquitetura & Especificidades:**
  - Sistema universal detalhado com rolagens 3d6 Roll-Under (<= Nível Efetivo).
  - Importador direto de fichas geradas no GCS (GURPS Character Sheet) e GCA (GURPS Character Assistant).
  - Suporte completo a cálculo de manobras de combate tático, penalidades por localização de acerto, choque por ferimento, recuo (Rcl) de armas de fogo e regras de fadiga.
- **Armadilhas Comuns:**
  - Não edite valores derivados de atributos ou vantagens manualmente na ficha sem verificar se o arquivo XML/JSON do GCS foi reimportado, pois a reimportação sobrescreverá dados manuais soltos.

---

## 2. Savage Worlds Adventure Edition (swade & swade pt-br)
- **Repositórios e Módulos Oficiais:**
  - Sistema Pinnacle Oficial: [https://gitlab.com/peginc/swade](https://gitlab.com/peginc/swade)
  - FVTT Brasil Tradução & Módulos: [https://gitlab.com/fvtt-brasil/swade](https://gitlab.com/fvtt-brasil/swade)
- **Arquitetura & Mecânicas no Foundry VTT:**
  - Motor baseado em Tipos de Dados (d4 a d12) com dados que Explodem (*Aces* / `x`).
  - Rolagem de Carta Selvagem (Wild Die 1d6) mantendo o maior resultado contra o Número Alvo (TN padrão 4). Cada 4 pontos acima do TN gera uma Ampliação (*Raise*).
  - Suporte nativo a Baralho de Iniciativa de Ação (Action Cards deck com Jokers).
  - O cálculo de iniciativa usa baralhos de cartas e não dados. Ao disparar combate programaticamente, utilize os métodos da API do SWADE (`combat.startCombat()` ou `combat.dealCards()`).

### 📚 Base de Conhecimento Especializada, Artigos & Cenários Savage Worlds

Sempre que o usuário ou mestre de RPG discutir, planejar ou criar campanhas, aventuras, regras da casa ou materiais para **Savage Worlds (SWADE)**, o Agente **DEVE CONSULTAR E UTILIZAR** este acervo de referências para capturar a intenção exata:

#### 1. Artigos & Guias do Mestre Charles Corrêa (`rpg.charlescorrea.com.br`):
- **Barganha Profana (Pacto com o Diabo no SWADE):** [Barganha Profana: Como Usar a Regra de Pacto com o Diabo em Savage Worlds](https://rpg.charlescorrea.com.br/dicas/dicas-para-mestres-de-rpg/barganha-profana-como-usar-a-regra-de-pacto-com-o-diabo-em-sua-mesa-de-savage-worlds-swade/)
- **Assistente de IA para Savage Worlds:** [Crie seu Próprio Assistente de IA para RPG — Prepare Campanhas de Savage Worlds em Minutos](https://rpg.charlescorrea.com.br/inteligencia-artificial-ia/crie-seu-proprio-assistente-de-ia-para-rpg-prepare-campanhas-de-savage-worlds-em-minutos/)
- **Conversões de Sistemas para SWADE:** [Categoria de Conversões de Sistemas](https://rpg.charlescorrea.com.br/category/rpg-role-playing-game/conversoes-de-sistemas/)
- **Cenários Selvagens Brasileiros e Internacionais:** [Cenários Selvagens](https://rpg.charlescorrea.com.br/category/rpg-role-playing-game/sistemas-de-rpg/savage-worlds-swade-rpg/cenarios-selvagens/)
- **Artigos Gerais de Savage Worlds:** [Categoria Savage Worlds SWADE](https://rpg.charlescorrea.com.br/category/rpg-role-playing-game/sistemas-de-rpg/savage-worlds-swade-rpg/)
- **Criação de Mapas com IA para Foundry VTT:** [O Fim do Bloqueio Criativo: Como Gerar Mapas de RPG Perfeitos com IA](https://rpg.charlescorrea.com.br/artificial-intelligence-ai/o-fim-do-bloqueio-criativo-como-gerar-mapas-de-rpg-perfeitos-com-inteligencia-artificial/)
- **Criação de Personagens com IA:** [Como Criar Personagens de RPG Incríveis com IA — Guia Completo e Ferramentas Gratuitas](https://rpg.charlescorrea.com.br/rpg-role-playing-game/como-criar-personagens-de-rpg-incriveis-com-inteligencia-artificial-guia-completo-e-ferramentas-gratuitas/)
- **Ilustrações de Personagens & Ética Artística:** [Criando Imagens para Personagens de RPG de Mesa: A Importância dos Ilustradores e Alternativas com IA](https://rpg.charlescorrea.com.br/mestre-charles-correa/criando-imagens-para-personagens-de-rpg-de-mesa-a-importancia-dos-ilustradores-e-alternativas-com-inteligencia-artificial/)
- **Podcast de RPG e Mesa:** [Podcast Oficial de RPG no YouTube](https://www.youtube.com/watch?v=QTEfG9OAoqA&list=PLO5WKaIldeokeCX7w4WOl3f1ea5bGqexe)

#### 2. Prompts de Assistentes de IA para Savage Worlds (Repositório `CharlesCorreaDev/RPGPlus`):
- **Assistente Mestre Savage Worlds:** [Assistente.md](https://raw.githubusercontent.com/CharlesCorreaDev/RPGPlus/refs/heads/main/Assistente%20de%20IA%20para%20Savage%20Worlds/Assistente.md) — Persona e diretrizes mecânicas avançadas para preparação de campanhas, PNJs, encontros e regras de ambientação no SWADE.
- **Assistente IA Mestre Cartógrafo:** [Assistente IA - Mestre Cartógrafo.md](https://raw.githubusercontent.com/CharlesCorreaDev/RPGPlus/refs/heads/main/Assistente%20de%20IA%20para%20Savage%20Worlds/Assistente%20IA%20-%20Mestre%20Cart%C3%B3grafo.md) — Criação de descrições sensoriais de mapas, pontos de interesse, iluminação dinâmica e escala de grid (100px/quadrado) para o Canvas do Foundry VTT.

#### 3. Editora Odyssey & Acervo de Cenários e Materiais de Apoio (`odysseypub.com.br`):
- **Cenário A Arte da Guerra (Nova Era):** [A Arte da Guerra — Guia Inicial](https://odysseypub.com.br/a-arte-da-guerra-nova-era-guia-inicial/)
- **Cenário A Cidade do Sol a Vapor:** [A Cidade do Sol a Vapor (Steampunk / Fantasia Científica)](https://odysseypub.com.br/category/savage-worlds/a-cidade-do-sol-a-vapor/)
- **Cenário Wiseguys:** [Wiseguys (Máfia, Crime e Anos 90 em Savage Worlds)](https://odysseypub.com.br/category/savage-worlds/wiseguys/)
- **Cenário Crystal Heart:** [Crystal Heart (Pedras no lugar do coração)](https://odysseypub.com.br/crystal-heart/)
- **Saga of the Goblin Horde:** [Saga of the Goblin Horde (Goblins heróis e comédia ácida)](https://odysseypub.com.br/saga-of-the-goblin-horde/)
- **Fanmades, Suplementos e Regras em Português:** [Fanmades em Português Odyssey](https://odysseypub.com.br/fanmades-em-portugues/)
- **OddCell / Arquivos Especiais:** [Pesquisa OddCell Odyssey](https://odysseypub.com.br/?s=oddcell)
- **Cenários e Colunas Periódicas:**
  - [Categoria Cenários Odyssey](https://odysseypub.com.br/category/cenarios/)
  - [Colunas & Artigos Técnicos Odyssey](https://odysseypub.com.br/category/colunas/)
  - [Material de Apoio Oficial Odyssey](https://odysseypub.com.br/category/material-de-apoio/)
  - [Contos & Narrativas Selvagens](https://odysseypub.com.br/category/savage-worlds/contos/)
  - [Jakub SWAG (Savage Worlds Adventurer's Guild)](https://odysseypub.com.br/category/savage-worlds/jakub-swag/)
  - [Hub Geral Savage Worlds Odyssey](https://odysseypub.com.br/category/savage-worlds/)

#### 4. Pinnacle Entertainment Group (PEGinc) — Editora Oficial & Ecossistema Global:
- **Portais Institucionais & Sobre a Editora:**
  - Site Oficial PEGinc: [https://peginc.com/](https://peginc.com/)
  - Sobre a Pinnacle Entertainment Group: [https://peginc.com/about/](https://peginc.com/about/) e [https://shop.peginc.com/pages/about](https://shop.peginc.com/pages/about)
  - Contato e Suporte Oficial: `info@peginc.com`
  - Portal Comunitário Savage Universe: [https://savageuniverse.com/](https://savageuniverse.com/)
  - Fórum Oficial da Comunidade: [https://www.pegforum.com/](https://www.pegforum.com/)
  - Perguntas Frequentes (FAQ): [https://shop.peginc.com/pages/faq](https://shop.peginc.com/pages/faq)
- **Cenários Selvagens Oficiais (*Savage Settings*):**
  - Catálogo Geral de Cenários: [https://peginc.com/savage-settings/](https://peginc.com/savage-settings/) e [https://shop.peginc.com/pages/all-settings](https://shop.peginc.com/pages/all-settings)
  - **Deadlands: The Weird West:** [https://shop.peginc.com/collections/deadlands-the-weird-west](https://shop.peginc.com/collections/deadlands-the-weird-west)
  - **Necessary Evil:** [https://shop.peginc.com/collections/necessary-evil](https://shop.peginc.com/collections/necessary-evil)
  - **Rifts for Savage Worlds (Savage Rifts):** [https://shop.peginc.com/collections/savage-rifts](https://shop.peginc.com/collections/savage-rifts)
  - Linha Savage Worlds Adventure Edition (SWADE): [https://shop.peginc.com/collections/savage-worlds-adventure-edition](https://shop.peginc.com/collections/savage-worlds-adventure-edition)
- **Produtos Oficiais para VTT & Suporte Digital:**
  - Módulos e Produtos VTT Oficiais: [https://peginc.com/savage-settings/vtt-products/](https://peginc.com/savage-settings/vtt-products/)
  - Aventuras Rápidas Gratuitas (One Sheets): [https://peginc.com/product-category/product-type/free-downloads/one-sheets/](https://peginc.com/product-category/product-type/free-downloads/one-sheets/)
  - Ficção Oficial & Wendigo Tales: [https://peginc.com/product-category/product-type/fiction/wendigo-tales-fiction/](https://peginc.com/product-category/product-type/fiction/wendigo-tales-fiction/)
- **Licenciamento Aberto, Criadores & SWAG:**
  - Diretrizes Gerais de Licenciamento: [https://peginc.com/licensing/](https://peginc.com/licensing/) e [https://shop.peginc.com/pages/licensing](https://shop.peginc.com/pages/licensing)
  - Licenciados Oficiais Aprovados (ACES): [https://shop.peginc.com/pages/aces-approved-licensees](https://shop.peginc.com/pages/aces-approved-licensees)
  - Programa SWAG (Savage Worlds Adventurer's Guild): [https://peginc.com/swag-savage-worlds-adventurers-guild/](https://peginc.com/swag-savage-worlds-adventurers-guild/) e [https://shop.peginc.com/pages/adventurers-guild](https://shop.peginc.com/pages/adventurers-guild)
  - Escrevendo para a Pinnacle & Trabalhando Conosco: [https://peginc.com/about/writing-for-pinnacle/](https://peginc.com/about/writing-for-pinnacle/) e [https://shop.peginc.com/pages/working-with-pinnacle](https://shop.peginc.com/pages/working-with-pinnacle)
  - Traduções Internacionais & Parceiros: [https://peginc.com/savage-worlds-translations/](https://peginc.com/savage-worlds-translations/) e [https://shop.peginc.com/collections/translations](https://shop.peginc.com/collections/translations)
- **Loja Oficial PEGinc & Coleções Digitais:**
  - Loja Oficial: [https://shop.peginc.com/](https://shop.peginc.com/)
  - Todas as Coleções: [https://shop.peginc.com/collections](https://shop.peginc.com/collections)

---

## 3. Custom System Builder & Simple Worldbuilding
- **Repositórios:**
  - Custom System Builder (CSB): [https://gitlab.com/custom-system-builder/custom-system-builder](https://gitlab.com/custom-system-builder/custom-system-builder)
  - Simple Worldbuilding (Oficial Foundry): [https://github.com/foundryvtt/worldbuilding](https://github.com/foundryvtt/worldbuilding)
- **Arquitetura & Especificidades:**
  - **CSB:** Permite criar fichas completas, fórmulas matemáticas e botões de rolagem com interface visual drag-and-drop sem programar código JavaScript.
  - **Simple Worldbuilding:** Sistema template oficial do Foundry para criação rápida de mundos e prototipação de atributos chave-valor simples.

---

## 4. Sistemas Nacionais Brasileiros: 3D&T e ABEA
- **Repositórios:**
  - 3D&T Alpha: [https://github.com/ederfialho/tresdetalpha](https://github.com/ederfialho/tresdetalpha)
  - 3D&T Victory / Vitória: [https://github.com/mclemente/fvtt-tresdetv](https://github.com/mclemente/fvtt-tresdetv)
  - A Bandeira do Elefante e da Arara (ABEA): [https://github.com/rafarvns/abea-foundryvtt-system](https://github.com/rafarvns/abea-foundryvtt-system)
- **Especificidades:**
  - **3D&T Alpha:** 1d6 + Características (F, H, R, A, PdF) com Críticos (resultado 6 dobrando o valor da característica).
  - **3D&T Victory:** Sistema moderno com dados de 6 faces (2d6 ou 3d6 com vantagens) comparados a Dificuldades fixas e testes de perícia com poderes.
  - **ABEA:** Baseado em dados de três cores (3d6) com regras históricas e mágicas inspiradas no folclore e período colonial brasileiro.

---

## 5. The Witcher TRPG (TheWitcherTRPG & Deathmarch)
- **Repositórios:**
  - Sistema Oficial: [https://github.com/witchertrpg-foundryvtt/TheWitcherTRPG](https://github.com/witchertrpg-foundryvtt/TheWitcherTRPG)
  - Deathmarch Witcher TRPG: [https://github.com/papajarv/Deathmarch-Witcher-TRPG](https://github.com/papajarv/Deathmarch-Witcher-TRPG)
- **Especificidades:**
  - 1d10 Explodindo em 10 e Subtraindo em 1 + Estatística + Perícia.
  - Tabelas de ferimentos críticos graves, membros decepados, alquimia e resistência à toxicidade por poções/mutagênicos.

---

## 6. Shadow of the Demon Lord & Shadow of the Weird Wizard
- **Repositórios:**
  - Shadow of the Demon Lord: [https://github.com/Xacus/demonlord](https://github.com/Xacus/demonlord)
  - Shadow of the Weird Wizard: [https://github.com/Savantford/foundry-weirdwizard](https://github.com/Savantford/foundry-weirdwizard)
- **Especificidades:**
  - Motor 1d20 + Dádivas e Maldições (*Boons and Banes* em dados d6 que se cancelam 1 a 1, mantendo o maior d6 resultante).
  - Dano por Loucura, Corrupção e caminhos de afinidade mágica (Tradições).

---

## 7. Ars Magica 5ª Edição (arm5e) & The One Ring 2e (tor2e)
- **Repositórios:**
  - Ars Magica 5E: [https://github.com/Xzotl42/arm5e](https://github.com/Xzotl42/arm5e)
  - The One Ring 2E: [https://gitlab.com/herve.darritchon/foundryvtt-tor2e](https://gitlab.com/herve.darritchon/foundryvtt-tor2e)
- **Especificidades:**
  - **Ars Magica:** Sistema hermético de magia verbal baseado em Verbo + Substantivo (Técnica + Forma) com dados de Estresse e cálculo de Vis mágica.
  - **The One Ring 2E:** Dado de Proeza (d12 com a Runa de Gandalf e o Olho de Sauron) somado a Dados de Sucesso (d6 com símbolos Tengwar de maestria).

---

## 8. TinyD6 (foundry-tinyd6)
- **Repositório:** [https://gitlab.com/architech99/foundry-tinyd6](https://gitlab.com/architech99/foundry-tinyd6)
- **Especificidades:**
  - Sistema minimalista (Tiny Dungeon, Tiny Frontiers, Tiny Wastelands): rolar 2d6 padrão (3d6 com Vantagem, 1d6 com Desvantagem). Qualquer `5` ou `6` representa um Sucesso completo.

---

## 9. Basic RolePlaying (BRP / brp)
- **Pacote Foundry:** [https://foundryvtt.com/packages/brp](https://foundryvtt.com/packages/brp)
- **Repositório:** [https://github.com/cragstone/BRP](https://github.com/cragstone/BRP)
- **Arquitetura & Especificidades:**
  - O motor d100 clássico universal da Chaosium (base de RuneQuest, Stormbringer e Call of Cthulhu).
  - Testes percentuais Roll-Under, níveis de sucesso (Crítico, Especial, Sucesso, Falha, Desastre), tabelas de armas e categorias de poderes (Magia, Mutações, Psionismo, Superpoderes).

---

## 10. Tagmar & Tagmar 3.0 Oficial (tagmar & tagmar3er-oficial)
- **Pacotes Foundry:**
  - Tagmar 3.0 Oficial: [https://foundryvtt.com/packages/tagmar3er-oficial](https://foundryvtt.com/packages/tagmar3er-oficial)
  - Tagmar: [https://foundryvtt.com/packages/tagmar](https://foundryvtt.com/packages/tagmar)
- **Repositórios:**
  - Tagmar 3.0 Oficial: [https://github.com/piratabarba-blip/tagmar3er-oficial](https://github.com/piratabarba-blip/tagmar3er-oficial)
  - Tagmar: [https://github.com/marcoswalker/tagmar](https://github.com/marcoswalker/tagmar)
- **Arquitetura & Especificidades:**
  - Primeiro RPG brasileiro (1991 / Projeto Tagmar 3.0 Open Source).
  - Utiliza a clássica **Tabela de Resolução** baseada em d20 colorido (Resultados: Branco/Falha Crítica, Amarelo/Falha, Verde/Sucesso Normal, Azul/Sucesso Bom, Cinza/Sucesso Decisivo). Fórmulas automatizadas calculando colunas de dificuldade.

---

## 11. Warhammer Fantasy Roleplay 4th Edition (wfrp4e)
- **Pacote Foundry:** [https://foundryvtt.com/packages/wfrp4e](https://foundryvtt.com/packages/wfrp4e)
- **Repositório Oficial:** [https://github.com/moo-man/WFRP4e-FoundryVTT](https://github.com/moo-man/WFRP4e-FoundryVTT)
- **Arquitetura & Especificidades:**
  - Um dos sistemas com automação mais avançada e profunda no Foundry VTT (mantido por Moo Man).
  - Testes d100 opostos com cálculo automático de Níveis de Sucesso (SL / Success Levels), cálculo de **Vantagem (Advantage)** que acumula em combate, tabelas de Ferimentos Críticos com desmembramentos, Mutações do Caos e Corrupção.

---

## 12. Zweihänder Grim & Perilous RPG (zweihander & zweihander-reforged-wogd)
- **Pacotes Foundry:**
  - Zweihänder: [https://foundryvtt.com/packages/zweihander](https://foundryvtt.com/packages/zweihander)
  - Zweihänder Reforged: [https://foundryvtt.com/packages/zweihander-reforged-wogd](https://foundryvtt.com/packages/zweihander-reforged-wogd)
- **Repositórios:**
  - Zweihänder Core: [https://github.com/fh-fvtt/zweihander](https://github.com/fh-fvtt/zweihander)
  - Zweihänder Reforged: [https://github.com/Jared-Nielsen/gamecodex-vtt-releases/releases/latest/download/zweihander-reforged-wogd.json](https://github.com/Jared-Nielsen/gamecodex-vtt-releases/releases/latest/download/zweihander-reforged-wogd.json)
- **Arquitetura & Especificidades:**
  - Fantasia sombria grimdark d100.
  - Mecânicas de Dados de Fúria (Fury Dice), Perigo (Peril Threshold), Dano Físico e Insanidade / Corrupção moral.

---

## 13. Legend of the Five Rings 4th & 5th Edition (l5r4 & l5r5e)
- **Pacotes Foundry:**
  - L5R 4th Edition: [https://foundryvtt.com/packages/l5r4](https://foundryvtt.com/packages/l5r4)
  - L5R 5th Edition: [https://foundryvtt.com/packages/l5r5e](https://foundryvtt.com/packages/l5r5e)
- **Repositórios:**
  - L5R 4E: [https://gitlab.com/team-l5r4/l5r4](https://gitlab.com/team-l5r4/l5r4)
  - L5R 5E: [https://gitlab.com/teaml5r/l5r5e](https://gitlab.com/teaml5r/l5r5e)
- **Arquitetura & Especificidades:**
  - **4ª Edição:** Sistema tradicional Roll & Keep em d10 (ex: rolar 6 dados e guardar os 3 melhores `6k3`), com dados que explodem em 10.
  - **5ª Edição (FFG):** Dados Customizados de Anéis (d6) e Perícias (d12) com símbolos proprietários: Sucessos, Oportunidades e Discórdia/Conflito (Strife), acumulando tensão até o personagem ter um Compromisso de Honra (*Unmasking*).

---

## 14. Mutants & Masterminds 3rd Edition (mutants-and-masterminds-3e)
- **Pacote Foundry:** [https://foundryvtt.com/packages/mutants-and-masterminds-3e](https://foundryvtt.com/packages/mutants-and-masterminds-3e)
- **Repositório:** [https://github.com/Zakarik/foundry-mm3](https://github.com/Zakarik/foundry-mm3)
- **Arquitetura & Especificidades:**
  - Sistema de super-heróis em d20 sem pontos de vida (*Damage Save / Toughness Check*).
  - Cada falha no teste de Resistência acumula penalidades progressivas de -1 contra novos testes ou condições de Atordoado (*Dazed*), Cambaleante (*Staggered*) e Incapacitado.

---

## 15. Cypher System (cyphersystem)
- **Pacote Foundry:** [https://foundryvtt.com/packages/cyphersystem](https://foundryvtt.com/packages/cyphersystem)
- **Repositório:** [https://github.com/mrkwnzl/cyphersystem-foundryvtt](https://github.com/mrkwnzl/cyphersystem-foundryvtt)
- **Jogos Suportados:** Numenera, The Strange, Cypher System Core Rulebook, Old Gods of Appalachia.
- **Arquitetura & Especificidades:**
  - Nível de Dificuldade de 1 a 10 multiplicado por 3 (Target Number de 3 a 30).
  - Gastos dos Pools de Atributos (Might, Speed, Intellect) para aplicar Esforço (*Effort*) e reduzir a dificuldade antes da rolagem 1d20. Gestão de Cifras (Cyphers) de uso único e Intrusões do Mestre (GM Intrusions).

---

## 16. Symbaroum (symbaroum)
- **Pacote Foundry:** [https://foundryvtt.com/packages/symbaroum](https://foundryvtt.com/packages/symbaroum)
- **Repositório:** [https://github.com/pwatson100/symbaroum](https://github.com/pwatson100/symbaroum)
- **Arquitetura & Especificidades:**
  - Fantasia sombria da Free League com rolagens 1d20 Roll-Under feitas exclusivamente pelos jogadores (o Mestre nunca rola dados; testes são modificados pelos atributos dos inimigos).
  - Mecânica implacável de **Corrupção Temporária e Permanente** ao lançar rituais ou usar itens profanados.

---

## 17. Warhammer Age of Sigmar: Soulbound (age-of-sigmar-soulbound)
- **Pacote Foundry:** [https://foundryvtt.com/packages/age-of-sigmar-soulbound](https://foundryvtt.com/packages/age-of-sigmar-soulbound)
- **Repositório Oficial:** [https://github.com/moo-man/AoS-Soulbound-FoundryVTT](https://github.com/moo-man/AoS-Soulbound-FoundryVTT)
- **Arquitetura & Especificidades:**
  - Pool de d6s contra Dificuldade com foco em combate heroico contra hordas.
  - Gerenciamento de Alma Vinculada (Soulbound), Foco, Mettler e Doom que afeta todo o reino.

---

## 18. ICRPG Core & Master Edition (icrpg & icrpgme)
- **Pacotes Foundry:**
  - ICRPG Master Edition: [https://foundryvtt.com/packages/icrpgme](https://foundryvtt.com/packages/icrpgme)
  - ICRPG Original: [https://foundryvtt.com/packages/icrpg](https://foundryvtt.com/packages/icrpg)
- **Repositórios:**
  - Master Edition: [https://github.com/ClipplerBlood/icrpgme](https://github.com/ClipplerBlood/icrpgme)
  - Original: [https://github.com/jessev14/FoundryVTT-ICRPG](https://github.com/jessev14/FoundryVTT-ICRPG)
- **Arquitetura & Especificidades:**
  - Sistema de Runehammer (Hankerin Ferinale).
  - **Dificuldade Global de Sala (Room Target):** Toda rolagem da cena é testada contra o mesmo Target DC (modificável por Fácil [-3] ou Difícil [+3]).
  - **Sistema de Esforço (Effort):** Tarefas, monstros e obstáculos possuem pontos de esforço roláveis (Basic d4, Weapons d6, Guns d8, Magic d10, Ultimate d12).

---

## 19. EZD6 (ezd6)
- **Pacote Foundry:** [https://foundryvtt.com/packages/ezd6](https://foundryvtt.com/packages/ezd6)
- **Repositório:** [https://github.com/drl2/ezd6-fvtt](https://github.com/drl2/ezd6-fvtt)
- **Arquitetura & Especificidades:**
  - Sistema rápido e intuitivo criado por DM Scotty baseado em rolagens de d6 contra Target Number 3 (ou dados com Boon/Bane). Suporte a dados milagrosos e Karma.

---

## 20. True D6 (trued6)
- **Pacote Foundry:** [https://foundryvtt.com/packages/trued6](https://foundryvtt.com/packages/trued6)
- **Repositório:** [https://github.com/Cussa/fvtt-true-d6](https://github.com/Cussa/fvtt-true-d6)
- **Arquitetura & Especificidades:**
  - Motor nacional focado na flexibilidade de dados d6 com combate ágil e cálculo direto de acertos e ferimentos.

---

## 21. Cordel RPG (cordelrpg)
- **Pacote Foundry:** [https://foundryvtt.com/packages/cordelrpg](https://foundryvtt.com/packages/cordelrpg)
- **Repositório:** [https://github.com/coppolaop/CordelRPG](https://github.com/coppolaop/CordelRPG)
- **Arquitetura & Especificidades:**
  - RPG nacional com temáticas de literatura de cordel, xilogravuras e sertão fantástico brasileiro com rolagens temáticas e fichas ilustradas no estilo xilográfico.

---

## 22. Universal Tabletop System (universal-tabletop-system)
- **Pacote Foundry:** [https://foundryvtt.com/packages/universal-tabletop-system](https://foundryvtt.com/packages/universal-tabletop-system)
- **Repositório:** [https://github.com/MetaMorphic-Digital/universal-tabletop-system](https://github.com/MetaMorphic-Digital/universal-tabletop-system)
- **Arquitetura & Especificidades:**
  - Framework sandbox genérico para prototipação e construção rápida de regras independentes sem código.

---

## 23. 7th Sea 2nd Edition (svnsea2e)
- **Pacote Foundry:** [https://foundryvtt.com/packages/svnsea2e](https://foundryvtt.com/packages/svnsea2e)
- **Repositório:** [https://github.com/Detailing-the-Realm/svnsea2e/](https://github.com/Detailing-the-Realm/svnsea2e/)
- **Arquitetura & Especificidades:**
  - RPG de capa e espada da John Wick Presents / Chaosium.
  - Pool de d10 somados em conjuntos de 10 (chamados de **Aumentos / Raises**), que os heróis gastam para realizar proezas e evitar consequências durante as sequências de ação dramáticas.

---

## 24. Cortex Prime (cortexprime)
- **Pacote Foundry:** [https://foundryvtt.com/packages/cortexprime](https://foundryvtt.com/packages/cortexprime)
- **Repositório:** [https://github.com/Secular12/cortexprime](https://github.com/Secular12/cortexprime)
- **Arquitetura & Especificidades:**
  - Kit de ferramentas modular de dados poliédricos (d4 a d12).
  - Montagem de pool de dados a partir de traços (Atributos, Distinções, Habilidades), rolando todos e escolhendo 2 para o **Total** e 1 para o **Dado de Efeito (Effect Die)**. 1s geram Complicações/Oportunidades para o Narrador.

---

## 25. Mausritter (mausritter)
- **Pacote Foundry:** [https://foundryvtt.com/packages/mausritter](https://foundryvtt.com/packages/mausritter)
- **Repositório:** [https://github.com/Futil/foundry-mausritter](https://github.com/Futil/foundry-mausritter)
- **Arquitetura & Especificidades:**
  - RPG Into the Odd de bravos ratos exploradores (Losing Games).
  - **Inventário em Grid Visual:** Fichas de personagem com slots em grade onde itens, feitiços e condições são representados como cartões com formatos físicos (armas ocupam 2 mãos, condições ocupam espaço de mochila).

---

## 26. TRPG / Tormenta RPG Clássico (trpg)
- **Pacote Foundry:** [https://foundryvtt.com/packages/trpg](https://foundryvtt.com/packages/trpg)
- **Repositório:** [https://github.com/mclemente/fvtt-trpg](https://github.com/mclemente/fvtt-trpg)
- **Arquitetura & Especificidades:**
  - A edição clássica d20 de Tormenta RPG (sistema OGL 3.5 com regras consolidadas da Jambô Editora).

---

## 27. Shinobi no Sho & Shinobi no Sho Revamp (shinobinosho & shinobi-no-sho-revamp)
- **Pacotes Foundry:**
  - Shinobi no Sho: [https://foundryvtt.com/packages/shinobinosho](https://foundryvtt.com/packages/shinobinosho)
  - Shinobi no Sho Revamp: [https://foundryvtt.com/packages/shinobi-no-sho-revamp](https://foundryvtt.com/packages/shinobi-no-sho-revamp)
- **Repositórios:**
  - Shinobi no Sho: [https://github.com/SouOWendel/shinobi-no-sho](https://github.com/SouOWendel/shinobi-no-sho)
  - Shinobi no Sho Revamp: [https://github.com/NelaTrex/shinobi-no-sho-revamp](https://github.com/NelaTrex/shinobi-no-sho-revamp)
- **Arquitetura & Especificidades:**
  - Sistemas dedicados a RPG ninja e anime tático com suporte a Jutsus, consumo de Chakra e combates rápidos.

---

## 28. Ronin (ronin-foundryvtt)
- **Pacote Foundry:** [https://foundryvtt.com/packages/ronin-foundryvtt](https://foundryvtt.com/packages/ronin-foundryvtt)
- **Repositório:** [https://github.com/andrewschetera/ronin-foundryvtt](https://github.com/andrewschetera/ronin-foundryvtt)
- **Arquitetura & Especificidades:**
  - RPG de combate solitário e cooperativo com samurais e ronins errantes no Japão feudal mítico.

---

## 29. Project FU / Fabula Ultima (projectfu)
- **Pacote Foundry:** [https://foundryvtt.com/packages/projectfu](https://foundryvtt.com/packages/projectfu)
- **Repositório:** [https://github.com/League-of-Fabulous-Developers/FoundryVTT-Fabula-Ultima](https://github.com/League-of-Fabulous-Developers/FoundryVTT-Fabula-Ultima)
- **Arquitetura & Especificidades:**
  - RPG inspirado em JRPGs clássicos (Need Games / Emanuele Galletto).
  - Rolagens de **2 atributos em dados escalonados** (ex: d8 + d10). Crítico quando ambos os dados caem no mesmo número (6+) e Fumble quando ambos caem em 1. O dado de High Roll (HR) determina o cálculo de dano e eficácia de magias.
  - Relógios de progresso (Clocks), Pontos Fabula e Pontos Ultima.

---

## 30. Goblin Slayer TTRPG (gs)
- **Pacote Foundry:** [https://foundryvtt.com/packages/gs](https://foundryvtt.com/packages/gs)
- **Repositório:** [https://github.com/Rostaen/goblin-slayer-ttrpg](https://github.com/Rostaen/goblin-slayer-ttrpg)
- **Arquitetura & Especificidades:**
  - RPG oficial japonês baseado na franquia Goblin Slayer (Group SNE / Kumo Kagyu).
  - Testes baseados em 2d6 + Habilidade + Perícia contra Dificuldade com críticos em 12 e desastres em 2.

---

## 31. Sword World 2.5 (sw25)
- **Pacote Foundry:** [https://foundryvtt.com/packages/sw25](https://foundryvtt.com/packages/sw25)
- **Repositório:** [https://github.com/jeannjeann/sw25-fvtt](https://github.com/jeannjeann/sw25-fvtt)
- **Arquitetura & Especificidades:**
  - O RPG de fantasia mais influente e popular do Japão (Group SNE), ambientado no mundo de Raxia.
  - Baseado no motor 2d6 com Tabela de Avaliação de Poder (*Power Table* / *Rating Table*) para determinar dano de armas e feitiços.
  - Sistema de classes escalonadas de aventureiro, magias de diversas tradições (Feiticeiro, Conjurador, Sacerdote, Magitech), dados de crescimento de atributos e combate em áreas simplificadas.

---

## 32. Shinobigami (shinobigami)
- **Pacote Foundry:** [https://foundryvtt.com/packages/shinobigami](https://foundryvtt.com/packages/shinobigami)
- **Repositório:** [https://github.com/ksx0330/FVTT-Shinobigami-System](https://github.com/ksx0330/FVTT-Shinobigami-System)
- **Arquitetura & Especificidades:**
  - O cultuado RPG japonês da série Saikoro Fiction (Bouken企画 / Adventure Planning Service) focado em drama ninja e intriga secreta.
  - Foco na matriz de Perícias (*Skill Matrix* com distância em saltos na tabela determinando o modificador de dificuldade ao usar perícias não treinadas).
  - Gestão de Segredos (*Secrets / Himitsu*), Laços emocionais (*Emotional Bonds*) e Ciclos de Cenas estruturados em Fases (Introdução, Meio, Clímax e Desfecho).

---

## 33. Wilderfeast (wilderfeast)
- **Pacote Foundry:** [https://foundryvtt.com/packages/wilderfeast](https://foundryvtt.com/packages/wilderfeast)
- **Repositório:** [https://github.com/Khaali-dev/wilderfeast](https://github.com/Khaali-dev/wilderfeast)
- **Arquitetura & Especificidades:**
  - RPG pós-pós-apocalíptico de caçadores gastronômicos de monstros (KC Shi / Horrible Guild).
  - Sistema de dados de Estilo e Ação (d8s e d6s) com dados de Técnica.
  - Mecânicas de Caçada e Culinária: os personagens absorvem traços e poderes dos monstros gigantes (monstros-ingredientes) após cozinhá-los e compartilharem refeições em banquete comunitário.

---

## 34. Mythic RPG / Mythic Game Master Emulator (mythic)
- **Pacote Foundry:** [https://foundryvtt.com/packages/mythic](https://foundryvtt.com/packages/mythic)
- **Repositório:** [https://github.com/AugmenTab/mythic](https://github.com/AugmenTab/mythic)
- **Arquitetura & Especificidades:**
  - Sistema universal e motor solo / emulador de mestre criado por Tana Pigeon (Word Mill Games).
  - Utiliza a lendária **Tabela de Destino (Fate Chart)** com cálculo percentual 1d100 cruzando Odds (Probabilidade) e o Fator de Caos (Chaos Factor de 1 a 9).
  - Níveis de resposta automatizados: *Exceptional Yes*, *Yes*, *No*, *Exceptional No* e Eventos Aleatórios (*Random Events*) baseados em Ação e Tema.

---

## 35. HERO System 6th Edition (fvtt-hero-system-6)
- **Repositório:** [https://www.uberwald.me/gitea/public/fvtt-hero-system-6](https://www.uberwald.me/gitea/public/fvtt-hero-system-6)
- **Arquitetura & Especificidades:**
  - O consagrado sistema genérico e de super-heróis em 3d6 (Champions / Hero Games).
  - Construção minuciosa baseada em pontos de personagem (Character Points) com poderes, modificadores de vantagens e desvantagens, cálculo de OCV/DCV e escala de tempo em segmentos de velocidade (*Speed Chart* de 1 a 12 fases).


