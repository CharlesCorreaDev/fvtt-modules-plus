# Base de Conhecimento: Engines, Motores e Mecânicas de RPG 🎲🧠
> **Compêndio Técnico de Game Design & Arquiteturas de Regras para Foundry VTT**  
> *Autor: GM Charles Corrêa & Antigravity Agent*

---

## 📌 Visão Geral & Propósito
Este guia cataloga dezenas de **motores de regras (engines)** conceituados do RPG mundial. Seu propósito é servir como o alicerce teórico e técnico supremo para:
1. **Engenharia Reversa de Sistemas:** Identificar rapidamente qual é o paradigma matemático e ficcional de um sistema ao analisar seu repositório ou código-fonte.
2. **Criação de Novos Sistemas do Zero no Foundry VTT:** Orientar sobre qual estrutura de dados (`TypeDataModel`), pipeline de rolagem (`Roll` / `DiceTerm`), e interface (`ApplicationV2`) melhor atendem à mecânica desejada.
3. **Sugestões Inteligentes de Game Design:** Recomendar ao desenvolvedor ou mestre mecânicas testadas e aprovadas para atingir o clima pretendido (horror, ação frenética, sobrevivência, tática em grid, drama narrativo ou solo).

---

## 🛠️ Matriz de Motores e Regras

### 1. Match System (CMON / Ubisoft)
- **Descrição:** Motor proprietário desenvolvido pela CMON (design por Francesco Nepitello e Marco Maggi) sob licença da Ubisoft para o *Assassin's Creed Roleplaying Game*. Traduz o fluxo de parkour, furtividade e combate cinematográfico da franquia para a mesa, emulando sincronização no Animus e memórias ancestrais.
- **Mecânicas:** Dados personalizados de 6 faces (Dados do Animus / *Animus Dice*), com símbolos de sucesso, complicação e sincronização. O teste baseia-se em casar (*match*) os símbolos rolados com as exigências da carta de ação ou desafio. A mecânica central é o **Nível de Sincronização (Sync Level)**: falhas ou precipitações desestabilizam a conexão com a memória genética, aplicando anomalias ou ejetando o operador.
- **Site Oficial:** [cmon.com](https://cmon.com/product/assassin-s-creed-roleplaying-game)
- **Jogos Derivados:** *Assassin's Creed Roleplaying Game* (livro básico e memórias como *Brotherhood*, *Renaissance*, *Valhalla*).
- **Implementação no Foundry:** `DiceSoNice` com faces SVG personalizadas; `TypeDataModel` rastreando `syncLevel` no Actor e cartas/ações representadas por `Item` de tipo `actionCard`.

---

### 2. Cepheus Light / Mork Borg Engine (OMSR - Art-Punk D20)
- **Descrição:** Criado por Pelle Nilsson e Johan Nohr (Ockult Örtmästare Games / Free League) com *Mörk Borg* (2020). Precursor do movimento Art-Punk RPG: d20 minimalista, design cru e apocalipse inevitável.
- **Mecânicas:** Resolução básica `1d20 + Habilidade` contra Dificuldade Padrão (DR 12). **O Mestre nunca rola dados em combate**: jogadores rolam seus ataques contra o DR do monstro e rolam defesas para evitar dano inimigo. Pergaminhos mágicos arriscam catástrofes demoníacas em rolagens de 1. **O Calendário de Ruína (Miseries)**: a cada alvorecer, rola-se dado de contagem regressiva; em 1, uma Profecia de Destruição se cumpre; na sétima profecia, o mundo acaba e os personagens são destruídos.
- **Site Oficial:** [morkborg.com](https://morkborg.com)
- **Jogos Derivados:** *Mörk Borg*, *CY_BORG*, *Pirate Borg*, *Vast Grimm*, *Castaway*.
- **Implementação no Foundry:** Roll helpers com `rollAttack` e `rollDefense` calculados no lado do ator do jogador; automação de Miseries via `RollTable` ou macro diária que avança o contador mundial.

---

### 3. Dread System (Jenga Tower Engine)
- **Descrição:** Criado por Epidiah Ravachol e Nat Barmore para *Dread* (2005, The Impossible Dream). Rompe com dados, moedas ou cartas em prol de um elemento físico tridimensional de equilíbrio.
- **Mecânicas:** Resolução de conflitos de alto risco puxando blocos de madeira de uma torre de Jenga e colocando-os no topo. Puxar sem derrubar = Sucesso. Recusar-se a puxar = Falha automática sem morte. Se a torre cair = Personagem removido imediatamente (morto, capturado ou enlouquecido). Tensão psicológica pura.
- **Site Oficial:** [tiltingatwindmills.net](https://tiltingatwindmills.net)
- **Jogos Derivados:** *Dread: First Book of Pandemonium*, *Star Crossed* (tensão relacional e romance trágico).
- **Implementação no Foundry:** Widget interativo em `ApplicationV2` com canvas 3D (Three.js) ou modelo probabilístico de risco acumulado (`towerStability` percentual que reduz a cada ação até desabar).

---

### 4. Cepheus / Sword & Backpack 2d6 (World of Dungeons Engine)
- **Descrição:** Destilação minimalista por John Harper (*World of Dungeons*) baseada no PbtA, mas descartando movimentos e playbooks extensos para criar uma engine de 1 página ultra-rápida.
- **Mecânicas:** `2d6 + Atributo` (-1 a +3): `10+` (Sucesso completo), `7–9` (Sucesso parcial/custo), `6-` (Falha com perigo direto narrado). Inventário por capacidade numérica simples e dano fixo/monodado.
- **Site Oficial:** [onesevendesign.com](https://onesevendesign.com)
- **Jogos Derivados:** *World of Dungeons*, *Offworlders*, *Ghost Lines*, *Streets of Marienburg*.
- **Implementação no Foundry:** `Roll("2d6 + @attr")` avaliando as faixas fixas (10+, 7-9, 6-) diretamente em chat card formatado com classes CSS contextuais.

---

### 5. Unisystem (Classic & Cinematic)
- **Descrição:** Desenvolvido por C.J. Carella para a Eden Studios no final dos anos 1990 com *WitchCraft* e *All Flesh Must Be Eaten*. Divide-se entre o *Classic* (sobrevivência e cálculos rigorosos de balística) e o *Cinematic* (acelerado, pontos de drama).
- **Mecânicas:** `1d10 + Atributo + Perícia +/- Modificadores` contra limiar 9. Cada 2 ou 3 pontos acima de 9 concede um Grau de Sucesso (*Success Level*), que multiplica o dano. Dado explosivo no 10 (`1d10 - 5` somado sucessivamente); falha com penalidade no 1.
- **Site Oficial:** [edenstudios.net](https://edenstudios.net)
- **Jogos Derivados:** *All Flesh Must Be Eaten* (AFMBE), *WitchCraft*, *Buffy the Vampire Slayer*, *Angel RPG*, *Army of Darkness*, *Conspiracy X 2.0*.
- **Implementação no Foundry:** Termo de rolagem customizado `Die` que implementa explosão no 10 com decréscimo de 5 (`10x>10`), calculando a tabela de `successLevels` na derived data.

---

### 6. Shadowrun System (Catalyst Dice Pool)
- **Descrição:** Criado pela FASA Corporation (1989) e mantido pela Catalyst Game Labs. Projetado para cyberpunk distópico com fantasia urbana, implantes cibernéticos, matriz e magia hermética.
- **Mecânicas:** Grandes reservas de d6 (`Atributo + Perícia`), frequentemente de 12 a 20+ dados. Cada 5 ou 6 conta como um Acerto (*Hit*). Total de sucessos confronta um Limiar (*Threshold*). **Regra do Glitch**: se mais da metade dos dados rolarem 1, ocorre um *Glitch* (falha mecânica, pane cibernética), mesmo que a tarefa tenha sido um sucesso. Se houver Glitch sem nenhum sucesso, é um *Critical Glitch*.
- **Site Oficial:** [shadowruntabletop.com](https://shadowruntabletop.com)
- **Jogos Derivados:** *Shadowrun* (1ª a 6ª edição), *Shadowrun: Anarchy*.
- **Implementação no Foundry:** `Roll("Xd6cs>=5")` estendido com contador de faces 1 para acionar visualmente o banner de Glitch / Critical Glitch no template de chat.

---

### 7. Year Zero Mini / Step Engine (Dragonbane / Drakar och Demoner)
- **Descrição:** Resgate histórico das origens do RPG sueco *Drakar och Demoner* (1982) modernizado pela Free League em *Dragonbane* (2023). Tática clássica europeia com fluidez nórdica moderna.
- **Mecânicas:** `1d20 roll-under` contra o Nível de Habilidade (1 a 18). Rolar 1 é o *Dragon* (Acerto Crítico formidável com efeitos táticos extras); rolar 20 é o *Demon* (Desastre com tabela de perigo imediato). Iniciativa com cartas numeradas de 1 a 10. **Ações reativas**: esquivas e bloqueios consomem a ação do personagem na rodada.
- **Site Oficial:** [freeleaguepublishing.com](https://freeleaguepublishing.com/games/dragonbane)
- **Jogos Derivados:** *Dragonbane*, *Drakar och Demoner*.
- **Implementação no Foundry:** `CONFIG.Combat.initiative.formula = "1d10"`; ficha gerenciando flag `hasActedThisRound` e avaliação automática de Dragon/Demon em `d20 <= @skill`.

---

### 8. Match System (RetrôPunk Publicações)
- **Descrição:** Desenvolvido no Brasil por G. M. Salles (RetrôPunk) com *Terra Devastada* e sua *Edição Apocalipse*. Foco em sobrevivência visceral, pressão psicológica e desgaste irreversível.
- **Mecânicas:** Reserva de d6 baseada nas Características descritivas do personagem. Resultados pares geram sucessos. Traço definidor: **Marcas de Condição**: traumas, ferimentos ou infecção convertem características positivas em fardos mecânicos permanentes até a quebra ou transformação em zumbi.
- **Site Oficial:** [retropunk.com.br](https://retropunk.com.br)
- **Jogos Derivados:** *Terra Devastada*, *Terra Devastada: Edição Apocalipse*, Match System SRD.
- **Implementação no Foundry:** Ficha em `ApplicationV2` com lista dinâmica de Características que alternam entre estado *Ativo* e *Condição Corrompida*; contador de dados pares (`d6 % 2 === 0`).

---

### 9. Solo10 System
- **Descrição:** Motor aberto de bolso criado no Brasil por Marcelo Paschoalin (Secular Trenzados). Projetado para alta modularidade, sessões solo ou tradicionais com condução veloz.
- **Mecânicas:** Resolução em `1d10 roll-under` contra um dos quatro atributos (Físico, Destreza, Mente, Presença). 1 natural = Sucesso Crítico; 10 natural = Falha Crítica / Complicação. Sem listas longas de perícias: resolve-se via Especializações que concedem bônus na margem.
- **Site Oficial:** [seculartrenzados.com.br](https://seculartrenzados.com.br)
- **Jogos Derivados:** *Solo10 SRD*, *Cães de Guerra*, *Fronteira das Estrelas*, *Trevas Antigas*.
- **Implementação no Foundry:** `TypeDataModel` ultraleve com 4 campos inteiros; método `rollCheck(attr)` simples comparando `Roll("1d10") <= attr.value`.

---

### 10. Sparks / Usage Die Engine (The Black Hack / Cthulhu Hack)
- **Descrição:** Criado por David Black (*The Black Hack*) e Paul Baldowski (*Cthulhu Hack*). Revolucionou o controle de inventário e desgaste no movimento OSR através do **Dado de Uso (Usage Die - Ud)**.
- **Mecânicas:** Resolução d20 roll-under para ações. Gerenciamento de tochas, balas, rações e sanidade por degraus de dados: `Ud10 -> Ud8 -> Ud6 -> Ud4`. Sempre que um recurso é exigido, rola-se o dado de uso; ao tirar 1 ou 2, o dado decai para o degrau inferior. Rolar 1 ou 2 num d4 esgota o recurso por completo.
- **Site Oficial:** [justcrunch.com](https://justcrunch.com)
- **Jogos Derivados:** *The Black Hack*, *Cthulhu Hack*, *The Rad Hack*, *Fleaux!*.
- **Implementação no Foundry:** Item de tipo `consumable` com campo `usageDie` (`choices: ["d10", "d8", "d6", "d4", "depleted"]`). Ao clicar em consumir, dispara rolagem e atualiza o item via `document.update()`.

---

### 11. Agon Engine (Paragon System)
- **Descrição:** Criado por John Harper e Sean Nittner (Evil Hat Productions) para *Agon 2e*. Dedicado a sagas mitológicas épicas inspiradas em Homero (Ilíada/Odisseia).
- **Mecânicas:** Substitui combate convencional por **Concursos Épicos (Contests)**. Heróis combinam dois dados: o Dado de Domínio (ex: d8) + Dado de Nome Divino (d6 a d12). A soma confronta a rolagem de Oposição do narrador. O maior total do grupo é coroado *The Best* (O Mais Destemido), ganha Glória e narra o clímax.
- **Site Oficial:** [agon-rpg.com](https://agon-rpg.com)
- **Jogos Derivados:** *Agon*, *Chamber*, *StormFighters*, Paragon System Playset.
- **Implementação no Foundry:** App especial de Concurso em `ApplicationV2` que coleta as rolagens de todos os atores selecionados e classifica automaticamente o vencedor para receber o prêmio de Glória.

---

### 12. MasterxMaster (Trophy Engine)
- **Descrição:** Desenhado por Jesse Ross e Jason Cordova (*Trophy Dark* e *Trophy Gold*, The Gauntlet). Horror psicológico medieval em florestas amaldiçoadas onde a perdição é quase certa.
- **Mecânicas:** Reserva composta por Dados Claros (*Light Dice*) e Dados Escuros (*Dark Dice*). O maior resultado dita o sucesso (6 = Total, 4-5 = Parcial, 1-3 = Falha). Se o maior dado escuro superar o maior dado claro, a mente sofre uma fissura e a **Trilha de Ruína (Ruin Tracker)** sobe. Em Ruína 6, o personagem é consumido e vira antagonista.
- **Site Oficial:** [trophyrpg.com](https://trophyrpg.com)
- **Jogos Derivados:** *Trophy Dark*, *Trophy Gold*, *Cthulhu Dark*.
- **Implementação no Foundry:** Rolador de dados com estilização bicromática (`Xd6[light] + Yd6[dark]`); listener pós-rolagem que incrementa automaticamente a barra de Ruína do ator.

---

### 13. Panic Engine (Mothership)
- **Descrição:** Criado por Sean McCoy (Tuesday Knight Games). Ficção científica de horror claustrofóbico e isolamento espacial (*Alien*, *Event Horizon*).
- **Mecânicas:** `d100 roll-under` contra Atributos e Saves. Falhar sob estresse ou testemunhar horrores acumula **Pontos de Estresse (Stress)**. Em falhas de salvaguarda com estresse, faz-se o **Panic Check**: `1d20` contra o Estresse atual; se o d20 for igual ou menor ao estresse, consulta-se a Tabela de Pânico (paranoia, choque, disparos involuntários).
- **Site Oficial:** [tuesdayknightgames.com](https://www.tuesdayknightgames.com/mothership)
- **Jogos Derivados:** *Mothership Sci-Fi Horror RPG*, *Dead Planet*, *A Pound of Flesh*, *Gradient Descent*.
- **Implementação no Foundry:** Hook em falha de Save que checa `stress > 0` e oferece botão interativo de rolagem de pânico ligado à `RollTable` de pânico do compêndio.

---

### 14. Strike! / Tactical Grid & Narrative Fiction
- **Descrição:** Desenvolvido por Jim McGarva. Ponte entre liberdade narrativa leve e o combate tático de posicionamento em grid altamente balanceado inspirado no D&D 4e, sem fichas inflacionadas.
- **Mecânicas:** Fora de combate: tabela de `1d6` (1 = Falha Dura, 2 = Falha com Prata, 3 = Sucesso com Custo, 4-5 = Pleno, 6 = Crítico). No grid tático: personagem dividido em Classe Tática (combate/grid) e Origem Narrativa. Sem HP infinito: tabela universal de ferimentos e condições.
- **Site Oficial:** [strikerpg.com](https://strikerpg.com)
- **Jogos Derivados:** *Strike! Core Rulebook*.
- **Implementação no Foundry:** Ficha em abas dividindo Classe Tática e Origem; grid de medição em hex/quadrado com condições pré-programadas em `CONFIG.statusEffects`.

---

### 15. LUMEN System
- **Descrição:** Criado por Spencer Campbell (Gila RPGs) com *LIGHT*. Emula o ritmo frenético de videogames de ação *Looter-Shooter* (*Destiny*, *Warframe*, *Outriders*).
- **Mecânicas:** Reserva de d6 retendo o maior dado (6 = Total, 4-5 = Custo, 1-3 = Falha). **Drop Instantâneo de Recursos**: inimigos abatidos derrubam no mesmo instante fichas de Saúde, Munição e Energia no chão. Personagens atropelam esses drops e recarregam poderes no mesmo turno.
- **Site Oficial:** [gilarpgs.itch.io/lumen](https://gilarpgs.itch.io/lumen)
- **Jogos Derivados:** *LIGHT*, *NOVA*, *APOSTLE*, *Slayers*.
- **Implementação no Foundry:** Macro de morte do token que invoca `canvas.scene.createEmbeddedDocuments("Tile", ...)` ou `Token` de drop que recupera recursos ao ter outro token colidindo na mesma coordenada (via `RegionBehavior`).

---

### 16. Burning Wheel Engine
- **Descrição:** Obra seminal de Luke Crane (2002). Sistema denso e granular onde o conflito gravita em torno das escolhas morais, prioridades e conflitos internos dos personagens.
- **Mecânicas:** Reserva de d6 com sucesso em 4, 5 e 6. Núcleo: **Crenças (Beliefs), Instintos (Instincts) e Traços (Traits)** que geram pontos de *Artha* (Fate, Persona, Deeds). Disputas verbais táticas estruturadas (*Duel of Wits*) e combate em script fechado (*Fight!*). Avanço baseado em falhar em tarefas difíceis e acertar tarefas de rotina.
- **Site Oficial:** [burningwheel.com](https://www.burningwheel.com)
- **Jogos Derivados:** *The Burning Wheel*, *Mouse Guard*, *Torchbearer*.
- **Implementação no Foundry:** Interface de script simultâneo onde ambos os participantes escolhem secretamente 3 manobras antes da revelação no chat; tracker de aprendizado por perícia.

---

### 17. Step Die System (Earthdawn)
- **Descrição:** Criado por Greg Gorden e Robin D. Laws para a FASA (1993). Converte o valor numérico puro de atributos em combinações escalonadas de múltiplos dados poliédricos.
- **Mecânicas:** Cada característica mapeia para um *Step Number* associado a uma tabela fixa (Passo 14 = `d12 + d4`; Passo 20 = `2d10`). **Explosão Universal (Karma/Explosion)** em todos os dados na face máxima. Margens acima da defesa geram *Extra Successes*.
- **Site Oficial:** [fasagames.com](https://fasagames.com/earthdawn)
- **Jogos Derivados:** *Earthdawn* (1ª a 4ª edição), *Demonworld*.
- **Implementação no Foundry:** Tabela estática de mapeamento `STEP_TABLE[step] = "1d12x + 1d4x"`, disparada via `Roll` customizado.

---

### 18. Breathless System
- **Descrição:** Criado por René-Pier Deshaies (Fari RPGs) para *Breathless* (2022). Tensão de esgotamento contínuo em apocalipses de sobrevivência.
- **Mecânicas:** Escada de dados degradáveis. Perícias começam em dados altos (d10 ou d8). Ao testar: 5+ é Sucesso, 3-4 Custo, 1-2 Falha. **Após rolar, o dado da perícia degrada imediatamente um degrau** (d10 -> d8 -> d6 -> d4). Recuperar dados exige declarar "Recuperar o Fôlego" (*Catch your Breath*), momento em que o mestre introduz perigo imediato.
- **Site Oficial:** [fari.games](https://fari.games/en/srds/breathless)
- **Jogos Derivados:** *Breathless*, *Stoneburner*, *Nomadic*, *Fallen*.
- **Implementação no Foundry:** Ficha em `ApplicationV2` com botões de perícia que, após cada rolagem bem-sucedida, atualizam o `TypeDataModel` reduzindo a escala do dado no documento.

---

### 19. Cepheus Engine / Classic 2d6 Traveller
- **Descrição:** Nascido em 1977 com *Traveller* (Marc Miller / GDW), consolidado sob licença aberta (OGL) pelo *Cepheus Engine*. O ápice da ficção científica hard e exploração espacial comercial.
- **Mecânicas:** `2d6 + Bônus de Perícia + Modificador de Atributo` contra Dificuldade 8+. Célebre por carreiras procedimentais pré-jogo em ciclos de 4 anos com risco de acidentes, serviço militar e aposentadoria compulsória.
- **Site Oficial:** [mongoosepublishing.com](https://www.mongoosepublishing.com) e [cepheusengine.info](https://cepheusengine.info)
- **Jogos Derivados:** *Traveller* (Classic, Mongoose 1e/2e), *Cepheus Engine Core*, *Cepheus Deluxe*, *Hostile*, *The Sword of Cepheus*.
- **Implementação no Foundry:** Sistema de criação de personagens procedural guiado por wizard em `ApplicationV2`, rodando tabelas de carreiras em compêndio.

---

### 20. Belonging Outside Belonging (No Dice, No Masters)
- **Descrição:** Desenvolvido por Avery Alder (*Monsterhearts*) e Benjamin Rosenbaum (*Dream Askew* / *Dream Apart*). Narrativas colaborativas sem mestre e sem dados sobre comunidades marginalizadas.
- **Mecânicas:** Economia pura de fichas (*Tokens*). **Movimentos Fracos** (falhar, expor fraqueza) rendem 1 Token; **Movimentos Regulares** avançam a cena de graça; **Movimentos Fortes** (feitos heroicos) custam 1 Token. Jogadores dividem personagens e elementos de cenário.
- **Site Oficial:** [buriedwithoutceremony.com](https://buriedwithoutceremony.com)
- **Jogos Derivados:** *Dream Askew*, *Dream Apart*, *Wanderhome*, *Flotsam*, *Sleepaway*.
- **Implementação no Foundry:** Ficha com contador simples de Tokens e chat cards com botões para despachar movimentos sem rolagem mecânica.

---

### 21. Push System
- **Descrição:** Motor minimalista open source do designer brasileiro Cezar Capacle (Capacle Games). Projetado para RPGs solo, cooperativos ou tradicionais centrados em risco vs recompensa.
- **Mecânicas:** Rola-se `1d6`. Se o resultado for insuficiente, o jogador pode **Forçar (Push)** adicionando mais dados d6 à jogada. Porém, se a soma ultrapassar o teto seguro (geralmente 7), ocorre o colapso mecânico (*Laser-Feel Break*), com as piores consequências possíveis.
- **Site Oficial:** [capacle.itch.io/push-srd](https://capacle.itch.io/push-srd)
- **Jogos Derivados:** *Push SRD*, *Nomads*, *Weird Horizons*, *Scrappers*.
- **Implementação no Foundry:** Diálogo interativo que permite clicar em "Push" adicionando novos `1d6` até o jogador parar ou ultrapassar o teto de 7, notificando o colapso.

---

### 22. TinyD6 System
- **Descrição:** Criado por Alan Bahr (Gallant Knight Games) com *Tiny Dungeon*. Expoente dos micro-RPGs com alta acessibilidade.
- **Mecânicas:** Reserva fixa básica de `2d6`. Qualquer 5 ou 6 é um sucesso. Com Vantagem: rola `3d6`. Com Desvantagem: rola `1d6`. Personagens definidos por traços descritivos em vez de perícias longas.
- **Site Oficial:** [gallantknightgames.com](https://gallantknightgames.com)
- **Jogos Derivados:** *Tiny Dungeon 2e*, *Tiny Wastelands*, *Tiny Frontiers*, *Tiny Cthulhu*, *Tiny Supers*.
- **Implementação no Foundry:** `Roll("2d6cs>=5")`, `Roll("3d6cs>=5")` ou `Roll("1d6cs>=5")` em um clique na ficha.

---

### 23. Silhouette System
- **Descrição:** Desenvolvido pela Dream Pod 9 para *Heavy Gear* e *Jovian Chronicles*. Unificou combates táticos de mechas gigantes, tanques e infantaria na mesma escala matemática.
- **Mecânicas:** Reserva de d6 pela perícia, retendo apenas o maior dado e somando atributo. Cada 6 adicional na mesma rolagem adiciona +1 ao total (ex: 6, 6, 4 = total 7). A margem de sucesso multiplica o dano de armas contra o limiar de blindagem, aplicando danos estruturais (*Light*, *Heavy*, *Overkill*).
- **Site Oficial:** [dp9.com](https://www.dp9.com)
- **Jogos Derivados:** *Heavy Gear*, *Jovian Chronicles*, *Tribe 8*, *Gear Krieg*.
- **Implementação no Foundry:** Avaliador de dados especial que soma +1 por cada face 6 extra no pool.

---

### 24. Resistance System
- **Descrição:** Criado pela Rowan, Rook and Decard (*Spire: The City Must Fall*, *Heart: The City Beneath*). Foco em rebelião, horror existencial e desgaste inevitável.
- **Mecânicas:** Reserva de d10 retendo o maior dado. O desgaste do protagonista é medido em Trilhas de Estresse (*Blood*, *Mind*, *Silver*, *Shadow*, *Reputation*). Cada dano exige um **Fallout Test**: rola-se `1d10` contra o estresse total acumulado; se o d10 for menor que o estresse, aplica-se uma consequência traumática permanente (*Fallout*).
- **Site Oficial:** [rowanrookanddecard.com](https://rowanrookanddecard.com)
- **Jogos Derivados:** *Spire*, *Heart: The City Beneath*, Resistance System SRD.
- **Implementação no Foundry:** Barra de estresse com gatilho automático pós-dano executando o teste de Fallout contra compêndio de sequelas.

---

### 25. Ubiquity System
- **Descrição:** Desenvolvido por Jeff Combos (Exile Game Studio) para *Hollow Earth Expedition*. Aventuras pulp aceleradas sem pausas para cálculos complexos.
- **Mecânicas:** Qualquer conjunto de dados é tratado como binário (par = sucesso, ímpar = falha). Reserva = Atributo + Perícia. Pontos de Estilo (*Style Points*) e opção de **Aproveitamento Médio (Taking the Average)**: aceitar metade da reserva como sucessos automáticos sem rolar dados.
- **Site Oficial:** [exilegames.com](https://exilegames.com)
- **Jogos Derivados:** *Hollow Earth Expedition*, *Desolation*, *Leagues of Adventure*, *Space: 1889*.
- **Implementação no Foundry:** `Roll("Xd2cs=2")` ou conversão de faces pares em acertos, com toggle "Take Average" na ficha.

---

### 26. HERO System
- **Descrição:** Criado por Steve Peterson e George MacDonald em *Champions* (1981). O ápice da simulação universal ponto a ponto para super-heróis e alta precisão tática.
- **Mecânicas:** `3d6 roll-under` contra `9 + (Característica/5)`. Princípio de Efeitos Mecânicos Universais: compra-se um efeito base e adicionam-se Modificadores (Vantagens e Limitações) para definir o poder ficcional. Sistema de segmentos de iniciativa (*Speed Chart* com 12 segmentos por rodada).
- **Site Oficial:** [herogames.com](https://www.herogames.com)
- **Jogos Derivados:** *Champions*, *HERO System Core*, *Fantasy Hero*, *Star Hero*.
- **Implementação no Foundry:** Tracker de combate avançado que avança pelo relógio de 12 segmentos disparando apenas combatentes com a velocidade ativa no segmento atual.

---

### 27. ORE (One-Roll Engine)
- **Descrição:** Desenvolvido por Greg Stolze (*Godlike*, *Wild Talents*, *Reign*). Condensa iniciativa, acerto, dano e localização em um único lance de dados.
- **Mecânicas:** Reserva de d10 procurando conjuntos iguais (ex: três 7s = conjunto `3x7`). Avaliado por duas dimensões: **Largura (Width)**: número de dados iguais (determina iniciativa e dano); **Altura (Height)**: valor numérico da face (determina localização anatômica do golpe e qualidade do sucesso).
- **Site Oficial:** [arcdream.com](https://arcdream.com) e [gregstolze.com](https://gregstolze.com)
- **Jogos Derivados:** *Godlike*, *Wild Talents*, *Reign*, *Monsters and Other Childish Things*, *Nemesis*.
- **Implementação no Foundry:** Formatador de chat que agrupa os dados rolados por pares/trincas exibindo caixas visuais com a Largura (Width) e Altura (Height) mapeadas para o boneco anatômico.

---

### 28. Palladium Megaversal System
- **Descrição:** Desenvolvido por Kevin Siembieda (*Rifts*, *Palladium RPG*). Famoso por escalas de poder cósmico e disparidades colossais de dano.
- **Mecânicas:** Perícias em `d100 roll-under`; combate em `1d20 + bônus` contra esquivas/bloqueios. Divisão de dano entre **SDC** (dano corporal convencional) e **MDC** (*Mega-Damage Capacity*): 1 ponto MDC = 100 pontos SDC. Armas MDC vaporizam alvos comuns instantaneamente.
- **Site Oficial:** [palladiumbooks.com](https://palladiumbooks.com)
- **Jogos Derivados:** *Rifts*, *Palladium Fantasy*, *Heroes Unlimited*, *Robotech RPG*, *TMNT*.
- **Implementação no Foundry:** `TypeDataModel` com campos independentes para SDC, HP e MDC, aplicando a conversão de dano `1 MDC = 100 SDC` automaticamente no método de cálculo de dano.

---

### 29. Interlock / Fuzion System
- **Descrição:** Criado por Mike Pondsmith (R. Talsorian Games) para *Cyberpunk 2020*, modernizado em *The Witcher* e *Cyberpunk RED*.
- **Mecânicas:** `1d10 + Estatística + Perícia` contra Dificuldade-Alvo (DV). 10 natural explode somando; 1 natural explode subtraindo. Alta letalidade com o subsistema *Friday Night Firefight* (FNFF): armaduras ablativas, cobertura física e danos críticos específicos em órgãos.
- **Site Oficial:** [rtalsoriangames.com](https://rtalsoriangames.com)
- **Jogos Derivados:** *Cyberpunk 2020*, *Cyberpunk RED*, *The Witcher RPG*, *Mekton Zeta*.
- **Implementação no Foundry:** `Roll("1d10x10 - 1d10x1")` customizado com cálculo de ablação de SP (Stopping Power) da armadura no documento do Ator.

---

### 30. Genesys / Narrative Dice System
- **Descrição:** Desenvolvido por Jay Little para a Fantasy Flight Games (*Warhammer Fantasy 3e*, linha *Star Wars RPG*, hoje EDGE Studio).
- **Mecânicas:** Dados proprietários com símbolos narrativos calculados em dois eixos independentes: **Eixo de Realização** (Sucesso vs Falha) e **Eixo de Consequência** (Vantagem vs Ameaça), mais Triunfos e Desastres. Permite *Sucesso com Ameaça* ou *Falha com Vantagem*.
- **Site Oficial:** [edge-studio.net](https://edge-studio.net)
- **Jogos Derivados:** *Star Wars RPG* (Edge, Age, Force), *Genesys Core*, *Shadow of the Beanstalk*, *Realms of Terrinoth*.
- **Implementação no Foundry:** Tipos de dados customizados (`DiceTerm`) que cancelam símbolos opostos e geram mensagens no chat com ícones vetoriais de sucessos/ameaças.

---

### 31. Cortex Prime
- **Descrição:** Kit de ferramentas modular criado por Cam Banks (Margaret Weis Productions / Fandom). Focado em drama, narrativa e traços conceituais.
- **Mecânicas:** Montagem de reserva com múltiplos dados poliédricos distintos baseados na cena: Atributo + Distinção + Habilidade + Recurso. Rola-se o conjunto: soma-se os dois maiores dados contra a oposição e escolhe-se um terceiro como o **Dado de Efeito** (seu tamanho d4-d12 dita a potência). Qualquer resultado 1 é um *Hitch* (complicação ou ponto de trama).
- **Site Oficial:** [cortexrpg.com](https://cortexrpg.com)
- **Jogos Derivados:** *Marvel Heroic Roleplaying*, *Smallville*, *Leverage*, *Tales of Xadia*, *Firefly*.
- **Implementação no Foundry:** Pool builder interativo onde o jogador clica nas características da ficha para montar a bandeja de dados antes de rolar.

---

### 32. GURPS (Generic Universal RolePlaying System)
- **Descrição:** Criado por Steve Jackson (1986). Padrão-ouro da simulação universal modular ponto a ponto.
- **Mecânicas:** `3d6 roll-under` contra o nível efetivo da perícia. Curva de sino perfeita (médias previsíveis em 10-11, extremos raros). Criação inteiramente por pontos sem classes ou níveis; dano anatômico rigoroso e balística detalhada.
- **Site Oficial:** [sjgames.com/gurps](https://www.sjgames.com/gurps)
- **Jogos Derivados:** *GURPS 4e*, *Dungeon Fantasy RPG*, *Transhuman Space*.
- **Implementação no Foundry:** Módulo `gurps` no Foundry com integração profunda de fórmulas de colisão, choque, penalidades de alcance e localização corporal.

---

### 33. Savage Worlds (SWADE Engine)
- **Descrição:** Criado por Shane Lacy Hensley (Pinnacle Entertainment Group). Filosofia *Fast! Furious! Fun!*: combate tático com miniaturas e baixíssima carga de manutenção para o mestre.
- **Mecânicas:** Características escalonadas em tipos de dados (d4 a d12). Número-alvo fixo 4. Protagonistas (*Wild Cards*) rolam o dado do traço junto com um **Dado Selvagem (1d6)** e escolhem o melhor. Dados explodem indefinidamente (*Aces*). A cada 4 pontos acima obtém-se uma **Ampliação (Raise)**. Dano aplica *Shaken* e *Wounds*; fichas de *Bennies* e iniciativa por baralho de cartas de poker com coringas.
- **Site Oficial:** [peginc.com](https://peginc.com)
- **Jogos Derivados:** *Deadlands*, *Rippers*, *East Texas University*, *Interface Zero*, *Savage Pathfinder*.
- **Implementação no Foundry:** Mapeamento nativo de `Roll("1d8x + 1d6x")` retendo o maior valor (`kh`); baralho de cartas em `CONFIG.Combat.initiative.formula = "1d54"`.

---

### 34. D6 System (OpenD6)
- **Descrição:** Desenvolvido por Greg Costikyan (West End Games) em *Ghostbusters* e *Star Wars RPG* (1987). Rápido, modular e exclusivamente baseado em d6.
- **Mecânicas:** Pilha aditiva de d6 (`3D+1`, `4D`) somados contra dificuldade. **Dado Selvagem (Wild Die)**: um dos dados explode no 6 ou gera complicações graves no 1.
- **Site Oficial:** [opend6project.org](http://opend6project.org)
- **Jogos Derivados:** *Star Wars RPG (WEG)*, *OpenD6* (Space, Fantasy, Adventure), *Mini Six*.
- **Implementação no Foundry:** `Roll("3d6 + 1d6x")` somando e checando resultado crítico no dado selvagem.

---

### 35. d20 System
- **Descrição:** Projetado por Jonathan Tweet, Monte Cook e Skip Williams (Wizards of the Coast, D&D 3e). Base da Open Game License (OGL) e do RPG tático moderno com classes e níveis.
- **Mecânicas:** `1d20 + Atributo + Bônus` contra CD ou CA. Progressão vertical por XP, HP por dados de vida, talentos e magias por círculos. Combate em turnos e grid tático.
- **Site Oficial:** [dnd.wizards.com](https://dnd.wizards.com)
- **Jogos Derivados:** *D&D* (3.0, 3.5, 5e), *Pathfinder* (1e/2e), *Tormenta20*, *Starfinder*, *Shadow of the Demon Lord*.
- **Implementação no Foundry:** O padrão mais utilizado e documentado no core do Foundry (`dnd5e`, `pf2e`, `tormenta20`).

---

### 36. Cypher System
- **Descrição:** Motor universal desenhado por Monte Cook (*Numenera*, *The Strange*). Carga de trabalho do mestre transferida quase que inteiramente para os jogadores.
- **Mecânicas:** `1d20`. O mestre nunca rola dados: apenas define o Nível do desafio (1 a 10), cuja Dificuldade é o nível x 3. Jogadores aplicam Esforço (*Effort*, consumindo reservas de Might, Speed, Intellect) para baixar o nível da tarefa antes de rolar. Presença constante de Cifras (*Cyphers*): itens de uso único voláteis.
- **Site Oficial:** [cypher-system.com](https://cypher-system.com)
- **Jogos Derivados:** *Numenera*, *The Strange*, *Cypher System Rulebook*, *Old Gods of Appalachia*.
- **Implementação no Foundry:** Ficha calculando pools de atributos decrescentes com custo de Effort embutido antes do lance de dados.

---

### 37. 2d20 System (Modiphius)
- **Descrição:** Desenvolvido por Jay Little para a Modiphius Entertainment (*Mutant Chronicles*, *Conan*, *Dune*, *Fallout*).
- **Mecânicas:** `2d20 roll-under` contra `Atributo + Perícia`. Sucessos extras geram *Momentum* (recurso coletivo); falhas e compras de dados adicionais alimentam a reserva de *Ameaça/Caos (Threat)* do narrador.
- **Site Oficial:** [modiphius.net](https://modiphius.net/pages/2d20)
- **Jogos Derivados:** *Conan*, *Star Trek Adventures*, *Dune*, *Fallout RPG*, *Achtung! Cthulhu*.
- **Implementação no Foundry:** `Roll("2d20cs<=@target")` com widget na interface sincronizando pools globais de Momentum e Threat.

---

### 38. Storyteller / Storypath System
- **Descrição:** Concebido por Mark Rein-Hagen (White Wolf) com *Vampiro: A Máscara* (1991). Foco em drama pessoal, horror pessoal e moralidade.
- **Mecânicas:** Pilha de d10 (`Atributo + Habilidade`). Cada dado igual ou superior ao limiar (historicamente 7 ou 8) é um sucesso. Rastreamento de Humanidade, Força de Vontade e Fome/Paradoxo.
- **Site Oficial:** [worldofdarkness.com](https://worldofdarkness.com)
- **Jogos Derivados:** *Vampiro*, *Lobisomem*, *Mago*, *Scion*, *Trinity Continuum*, *Exalted*.
- **Implementação no Foundry:** Mecânica de Dados de Fome (Hunger Dice) que substituem dados comuns e acionam falhas e sucessos bestiais no chat.

---

### 39. Fate Core / Fudge System
- **Descrição:** Desenvolvido por Rob Donoghue e Fred Hicks (Evil Hat Productions). Motor focado em aspectos literários e ficção cinematográfica.
- **Mecânicas:** `4dF` (dados especiais com +, - e nulo, somando entre -4 e +4) + Perícia contra dificuldade. Espinha dorsal: **Aspectos** (frases conceituais) manipulados pela economia de **Pontos de Destino (Fate Points)** para invocar ou aceitar complicações (*Compel*).
- **Site Oficial:** [fate-srd.com](https://fate-srd.com)
- **Jogos Derivados:** *Fate Core*, *Fate Acelerado*, *Spirit of the Century*, *The Dresden Files*.
- **Implementação no Foundry:** Suporte nativo ao termo `4df` no motor de dados (`Roll("4df + @skill")`).

---

### 40. GUMSHOE System
- **Descrição:** Projetado por Robin D. Laws para a Pelgrane Press. Focado em mistério e investigação sem risco de travar por testes de percepção falhos.
- **Mecânicas:** Se o personagem tem a perícia correta e busca no lugar certo, **a pista essencial é entregue automaticamente sem dados**. Gastos de pontos de reserva oferecem benefícios adicionais. Tarefas gerais rolam `1d6` somando gastos da reserva contra dificuldade oculta.
- **Site Oficial:** [pelgranepress.com](https://pelgranepress.com/gumshoe)
- **Jogos Derivados:** *Trail of Cthulhu*, *Night's Black Agents*, *Fall of Delta Green*, *Esoterrorists*.
- **Implementação no Foundry:** Ficha com contadores de piscina de perícias investigativas (que diminuem ao gastar) e rolador de habilidades gerais em 1d6.

---

### 41. Year Zero Engine (YZE Clássico)
- **Descrição:** Desenvolvido pela Free League (*Mutant: Year Zero*, *Alien RPG*, *Forbidden Lands*). Sobrevivência e tensão contínua.
- **Mecânicas:** Reserva de d6 (`Atributo + Perícia + Item`). Apenas o 6 é sucesso. Pode-se **Forçar a Rolagem (Push)** rerrolando dados que não caíram em 6 ou 1, mas resultados 1 geram dano, estresse, pânico ou quebra de itens.
- **Site Oficial:** [freeleaguepublishing.com](https://freeleaguepublishing.com/powered-by-year-zero)
- **Jogos Derivados:** *Mutant: Year Zero*, *Forbidden Lands*, *Alien RPG*, *Vaesen*, *Blade Runner*.
- **Implementação no Foundry:** Botão de Push no card de chat que filtra os dados mantendo 6s e 1s e re-rolando o restante.

---

### 42. Forged in the Dark (FitD)
- **Descrição:** Criado por John Harper (*Blades in the Dark*). Operações de alto risco sem planejamento prévio demorado.
- **Mecânicas:** Reserva de d6 retendo o maior dado (6 = Total, 4-5 = Parcial, 1-3 = Falha). Uso de **Flashbacks** pagos com Estresse, **Relógios de Progresso (Clocks)** e ficha de Bando/Equipe com evolução coletiva.
- **Site Oficial:** [bladesinthedark.com](https://bladesinthedark.com/forged-dark)
- **Jogos Derivados:** *Blades in the Dark*, *Scum and Villainy*, *Band of Blades*, *CBR+PNK*.
- **Implementação no Foundry:** Elementos visuais em canvas e ficha para desenhar Clocks circulares de 4, 6 ou 8 segmentos avançados com um clique.

---

### 43. Powered by the Apocalypse (PbtA)
- **Descrição:** Criado por Vincent e Meguey Baker (*Apocalypse World*). Ficção em primeiro lugar e conversa contínua.
- **Mecânicas:** `2d6 + Modificador` contra a tabela clássica: `10+` (Total), `7–9` (Custo), `6-` (Movimento duro do mestre). Movimentos e Playbooks temáticos. O mestre nunca rola dados.
- **Site Oficial:** [apocalypse-world.com](http://apocalypse-world.com)
- **Jogos Derivados:** *Dungeon World*, *Monsterhearts*, *Masks*, *City of Mist*, *Avatar Legends*.
- **Implementação no Foundry:** Fichas baseadas em playbooks modulares e automação de disparos de Moves no chat.

---

### 44. Basic Roleplaying (BRP / d100)
- **Descrição:** Desenvolvido pela Chaosium (*RuneQuest*, *Call of Cthulhu*). O mais influente motor percentual da história.
- **Mecânicas:** `d100 roll-under` contra a perícia percentual. Sucessos Críticos, Bom, Regular, Falha e Desastre. Avanço orgânico sem níveis: testar com sucesso dá direito a testes de melhoria pós-sessão.
- **Site Oficial:** [chaosium.com](https://www.chaosium.com/basic-roleplaying)
- **Jogos Derivados:** *Call of Cthulhu*, *RuneQuest*, *Delta Green*, *Mythras*.
- **Implementação no Foundry:** Comparador de faixas percentuais automáticas (Extremo = 1/5 da perícia, Bom = 1/2 da perícia).

---

### 45. Fiasco Playset Engine
- **Descrição:** Desenvolvido por Jason Morningstar (Bully Pulpit Games). Planos criminosos que dão desastrosamente errado em sessões únicas sem mestre e sem preparação.
- **Mecânicas:** Reserva de d6 brancos e pretos em dois atos divididos pela **Virada (The Tilt)**. Cada cena estabelece ou decide o desfecho reivindicando um dado. Epílogo (*The Aftermath*) define o desfecho do personagem numa tabela final.
- **Site Oficial:** [bullypulpitgames.com](https://bullypulpitgames.com/games/fiasco)
- **Jogos Derivados:** *Fiasco Classic*, *Fiasco Card-Based Edition*.
- **Implementação no Foundry:** Mesa virtual interativa com as cartas e dados do Playset dispostos em cena sem necessidade de ficha tradicional.

---

### 46. Year Zero Twilight / Step Variant (T2K / Blade Runner)
- **Descrição:** Variação técnica da Free League com dados escalonados poliédricos em emparelhamento duplo.
- **Mecânicas:** Emparelha dois dados poliédricos (Atributo + Perícia: A=d12, B=d10, C=d8, D=d6). Resultados de 6 a 9 contam como 1 Sucesso; 10+ conta como 2 Sucessos. Simulação militar balística rigorosa com munições e recuo.
- **Site Oficial:** [freeleaguepublishing.com](https://freeleaguepublishing.com)
- **Jogos Derivados:** *Twilight: 2000 4e*, *Blade Runner RPG*.
- **Implementação no Foundry:** Parser de pares de dados poliédricos contando sucessos em faixas `6-9` (1) e `>=10` (2).

---

### 47. Open Legend RPG
- **Descrição:** Motor universal aberto criado por Ed Turner e Forrest Heck. Efeitos mecânicos modulares sem listas rígidas de magias.
- **Mecânicas:** `1d20 + Dados de Atributo` (escala 1 a 9 que adiciona dados de d6 a múltiplos d10). **Explosão Universal de todos os dados rolados**.
- **Site Oficial:** [openlegendrpg.com](https://openlegendrpg.com)
- **Jogos Derivados:** *Open Legend Core Rules*, *Amaurea's Dawn*.
- **Implementação no Foundry:** `Roll("1d20x + 2d8x")` com suporte completo a explosão em cascata.

---

### 48. Through the Breach / Fate Deck Engine
- **Descrição:** Criado pela Wyrd Games com base em *Malifaux*. Substitui dados por um baralho de cartas de 54 cartas.
- **Mecânicas:** Resolução virando a carta do topo do *Fate Deck* somada ao Atributo + Perícia. Mecânica de **Trapacear o Destino (Cheat Fate)**: o jogador pode trocar a carta virada por uma da sua mão privada (*Control Hand*). Naipes ativam Gatilhos (*Triggers*).
- **Site Oficial:** [wyrd-games.net](https://www.wyrd-games.net/through-the-breach)
- **Jogos Derivados:** *Through the Breach*, expansões de *Malifaux*.
- **Implementação no Foundry:** Uso do subsistema de Documentos `Cards` e `Card` com interfaces privadas de mão para cada jogador.

---

### 49. West End Games MasterBook / Torg Engine
- **Descrição:** Criado pela WEG nos anos 90 (*Torg*), modernizado em *Torg Eternity*. Cruza múltiplos gêneros simultaneamente.
- **Mecânicas:** `1d20 + Cartas de Drama`. O d20 é convertido na Tabela Universal de Efeitos em bônus/penalidade. Uso de baralhos dinâmicos (*Drama Deck*) para iniciativa e intervenções narrativas.
- **Site Oficial:** [ulisses-us.com](https://ulisses-us.com/games/torg)
- **Jogos Derivados:** *Torg*, *Torg Eternity*, *MasterBook*.
- **Implementação no Foundry:** Tabela de conversão matricial de resultados de d20 associada a um deque de combate.

---

### 50. Mayfair Exponential System (MEGS)
- **Descrição:** Desenvolvido para o célebre *DC Heroes RPG* (1985). Permite Batman e Superman na mesma equipe através de uma **Escala Logarítmica Exponencial** (cada +1 dobra a capacidade).
- **Mecânicas:** `2d10` contra oposição cruzados na Matriz de Ação (*Action Table*), gerando *Column Shifts*. Duplas de dados explodem (exceto 1-1).
- **Site Oficial:** Preservado pela comunidade em [writeups.org](https://www.writeups.org)
- **Jogos Derivados:** *DC Heroes RPG*, *Blood of Heroes*.
- **Implementação no Foundry:** Matriz de resolução bidimensional comparando o atributo ativo com a resistência do alvo.

---

### 51. Risus: The Anything RPG
- **Descrição:** Criado por S. John Ross (Cumberland Games). Pai dos RPGs de clichês ficcionais.
- **Mecânicas:** Personagens definidos por Clichês numerados em d6 (ex: *Detetive Noir [3]*). Conflitos drenam dados do clichê do perdedor. **Regra do Clichê Inapropriado**: justificar narrativamente o uso de um clichê absurdo em combate drena o triplo de dados do oponente por humilhação.
- **Site Oficial:** [cumberlandgames.com](https://www.cumberlandgames.com/risus.htm)
- **Jogos Derivados:** *Risus*, *Risus Companion*.
- **Implementação no Foundry:** Lista simples de itens `cliche` com contador de dados que decrementa conforme o dano.

---

### 52. FASERIP System (Marvel Super Heroes TSR)
- **Descrição:** Clássico absoluto da TSR (1984) por Jeff Grubb. Emulação perfeita de quadrinhos.
- **Mecânicas:** Atributos formam FASERIP em Patentes de Poder (*Typical*, *Remarkable*, *Amazing*, etc.). `1d100` cruzado com a *Universal Battle Matrix* gerando resultados em cores (Branco, Verde, Amarelo, Vermelho). Pontos de Karma para manipular a rolagem.
- **Site Oficial:** [faserip.com](http://www.faserip.com) e [classicmarvelforever.com](https://classicmarvelforever.com)
- **Jogos Derivados:** *Marvel Super Heroes*, *FASERIP SRD*, *Astonishing Super Heroes*.
- **Implementação no Foundry:** Card de chat com layout gráfico idêntico à tabela colorida original, destacando a cor atingida.

---

### 53. Year Zero Action Points Engine (The Walking Dead Universe)
- **Descrição:** Variação tática do YZE para combate desesperado em tempo real contra mortos-vivos.
- **Mecânicas:** 3 Pontos de Ação (AP) por rodada gastos para agir ou guardados para Ações Reativas fora do turno. Nível de Ameaça coletivo que atrai a horda se houver ruído, levando à tabela de mordidas fatais.
- **Site Oficial:** [freeleaguepublishing.com](https://freeleaguepublishing.com)
- **Jogos Derivados:** *The Walking Dead Universe RPG*.
- **Implementação no Foundry:** Rastreador de AP na barra de combate e medidor de ruído mundial.

---

### 54. Modiphius 2d20 Momentum Minimalist (Dishonored / Star Trek 2e)
- **Descrição:** Versão refinada e rápida do 2d20 focada em narrativa cinematográfica e furtividade.
- **Mecânicas:** `2d20 roll-under` contra `Estilo + Princípio`. Sem HP granular: utiliza Trilhas de Estresse e Condições duradouras. Falhas alimentam o Caos do ambiente.
- **Site Oficial:** [modiphius.net](https://modiphius.net)
- **Jogos Derivados:** *Dishonored RPG*, *Star Trek Adventures 2e*, *Dune: Fall of the Imperium*.
- **Implementação no Foundry:** Ficha simplificada sem listas de armas complexas, com rastreador global de Caos.

---

### 55. WaRP System (Over the Edge)
- **Descrição:** Criado por Jonathan Tweet e Robin D. Laws (1992, Atlas Games). Rompeu pioneiramente com atributos fixos em prol de traços livres.
- **Mecânicas:** 1 Traço Central + 2 Secundários + 1 Defeito, cada um com dados d6. **Dado de Advertência (Warning Die)** de cor diferente que gera eventos bizarros ou sobrenaturais na cena ao rolar um número específico.
- **Site Oficial:** [atlas-games.com/warp](https://www.atlas-games.com/warp)
- **Jogos Derivados:** *Over the Edge* (1e/2e), WaRP System OGL.
- **Implementação no Foundry:** Rolagem de dados destacando o dado de advertência com cor especial.

---

### 56. Amber Diceless Roleplaying Engine
- **Descrição:** Concebido por Erick Wujcik (1991). O pai dos sistemas sem dados (*diceless*).
- **Mecânicas:** Leilão de atributos na criação. Resolução por comparação determinística: o rank mais alto sempre vence, a menos que o lado mais fraco altere o contexto ficcional com astúcia, terreno ou magia oculta.
- **Site Oficial:** Preservado pela comunidade; sucessor moderno *Lords of Gossamer & Shadow* em [ritepublishing.com](http://www.ritepublishing.com)
- **Jogos Derivados:** *Amber Diceless RPG*, *Lords of Gossamer & Shadow*.
- **Implementação no Foundry:** Ficha comparativa para o narrador sem rolador de dados, apenas tabelas de ranks relativos.

---

### 57. Year Zero Modernized Step (Coriolis: The Great Dark)
- **Descrição:** A mais recente evolução do YZE para exploração espacial sombria e ruínas perdidas.
- **Mecânicas:** Dados escalonados contra Limiares de Tensão. Economia de *Hope* (dos jogadores) vs *Darkness/Blight* (acumulada pelo mestre para despertar anomalias e horrores).
- **Site Oficial:** [freeleaguepublishing.com](https://freeleaguepublishing.com)
- **Jogos Derivados:** *Coriolis: The Great Dark*.
- **Implementação no Foundry:** Widget de recursos mundiais de Hope e Darkness compartilhado na tela.

---

### 58. Ironforged / Ironsworn Engine
- **Descrição:** Criado por Shawn Tomkin. O padrão-ouro mundial para RPG Solo, Cooperativo sem Mestre e Tradicional.
- **Mecânicas:** `1d6 (Ação) + Atributo` contra `2d10 (Desafio)`. **Strong Hit** (supera ambos os d10); **Weak Hit** (supera apenas um d10, com custo); **Miss** (menor ou igual a ambos). Se os dois d10 forem iguais (Match), ocorre uma reviravolta dramática com tabelas de oráculo.
- **Site Oficial:** [ironswornrpg.com](https://www.ironswornrpg.com)
- **Jogos Derivados:** *Ironsworn*, *Starforged*, *Sundered Isles*, *Elegy*.
- **Implementação no Foundry:** Integração total de oráculos procedimentais, rastreador de progresso e rolador de Ação vs Desafio com destaque de Match no chat.

---

### 59. Cepheus Deluxe / 2d6 Modern SRD
- **Descrição:** Refinamento da Stella Gamer Publishing sobre o Cepheus 2d6 clássico para acomodar múltiplos gêneros.
- **Mecânicas:** `2d6 + Bônus` contra 8+. Vantagem (3d6 descarta menor) e Desvantagem (3d6 descarta maior). Dano ataca diretamente Força, Destreza e Resistência; zerar os três causa morte clínica.
- **Site Oficial:** [stellagamer.com](https://stellagamer.com)
- **Jogos Derivados:** *Cepheus Deluxe*, *Rider*, *Sword of Cepheus*, *Hostile*.
- **Implementação no Foundry:** Vantagem/desvantagem com `3d6dh1` e `3d6kl1` e barra de atributos com cálculo de dano direto.

---

### 60. Outgunned / Director's Cut System
- **Descrição:** Criado por Two Little Mice (*Household*, *Outgunned*). Emulação cinematográfica pura de filmes de ação e assalto (*John Wick*, *Die Hard*).
- **Mecânicas:** Reserva de d6 por Atributo + Perícia. **Busca por combinações de números iguais**: Par Simples (Básico), Trinca (Crítico), Quadra (Extremo), Quina (Jackpot). **Mecânica do Gambito (Tudo ou Nada)**: trancar dados iguais e rerrolar os restantes para subir de nível; se não sair nenhum par novo, perde-se tudo e colapsa em desastre.
- **Site Oficial:** [twolittlemice.net/outgunned](https://twolittlemice.net/outgunned)
- **Jogos Derivados:** *Outgunned*, *Outgunned: World Tour*, *Household*.
- **Implementação no Foundry:** Card interativo no chat com botões para trancar dados e arriscar o Gambito, avaliando automaticamente pares, trincas e desastres.

---

### 61. 3d6World (Newton Nitro / NitroGames)
- **Descrição:** Sistema de RPG genérico, modular, dinâmico e flexível criado pelo Prof. Newton "Tio Nitro" Rocha (2026), distribuído sob licença livre Creative Commons Attribution 4.0 International (CC-BY 4.0). Projetado para alta customização modular, oferecendo uma curva de sino equilibrada com 3d6 e velocidade tático-narrativa.
- **Mecânicas:**
  - **Mecânica Central (Roll-Under com Curva Normal):** Rola-se `3d6` contra `Atributo + Perícia + Modificador de Dificuldade` (atributos variam de 1 a 10). Se o resultado nos dados for menor ou igual ao Valor Alvo, a ação é um sucesso.
  - **Margens Críticas:** Rolagens naturais de **3 ou 4** resultam em **Sucesso Crítico**. Rolagens naturais de **17 ou 18** resultam em **Falha Crítica (Desastre)**.
  - **O Dado do Destino (Fate Die):** Ao obter um sucesso regular (5 a 16), o jogador rola um dado de 6 faces adicional (ou designa um dos dados do 3d6 como Dado do Destino com cor diferente):
    - **1 a 3 no Dado do Destino:** *Sucesso Parcial* (o objetivo é atingido, mas acompanhado de complicação ficcional, custo ou dilema).
    - **4 a 6 no Dado do Destino:** *Sucesso Total* (o objetivo é atingido plenamente, sem reveses adicionais).
    - *Regra de Ouro:* O Dado do Destino **nunca anula um sucesso**, ele apenas adiciona nuance e dinâmica narrativa imediata.
  - **Economia de Sorte (Jogadores) e Azar (Mestre):**
    - Quando um jogador obtém um **Sucesso Parcial**, ele ganha **1 Ponto de Sorte** (Lucky Point), que pode ser gasto para Flashbacks narrativos, mitigar dano, ativar façanhas ou adicionar dados de bônus.
    - Quando um jogador obtém um **Sucesso Total**, o Mestre ganha **1 Ponto de Azar** (Doom/Misfortune Point), utilizado para intensificar perigos, introduzir reforços inimigos ou ativar complicações ambientais no momento dramático ideal.
  - **Modos de Resolução de Conflito:**
    - *Conflito Narrativo:* Resolução rápida e abstrata para perseguições, debates ou combates cinematográficos com poucas rolagens.
    - *Combate Tático-Convencional:* Resolução por rodadas, iniciativa, ações principais, reações defensivas e *Trilhas de Pressão/Dano* (Pressure Tracks) que substituem contabilidade excessiva de pontos de vida por condições e exaustão.
- **Site Oficial:** [3d6world no Nitroblog](https://newtonrocha.wordpress.com/3d6world-sistema-generico-e-modular-de-rpg/)
- **Jogos Derivados:** Cenários modulares NitroGames, campanhas multi-gênero (fantasia sombria, sci-fi, investigação contemporânea).
- **Implementação no Foundry VTT:**
  - `Roll Engine`: Rolagem customizada `new Roll("3d6").evaluate()` avaliando limites de sucesso contra `actor.system.attributes[attr].value + actor.system.skills[skill].value`. Se sucesso, dispara ou avalia o `fateDie` (`1d6`) exibindo no ChatMessage cards ricos com badges de "Sucesso Total", "Sucesso Parcial" e "Crítico".
  - `Resource Tracker`: Variáveis de sessão `luck` (no Actor) e `doom` (em `game.settings` ou Actor de Mestre/World Tracker) integradas a botões de clique na interface de cena ou no header da ficha.

---

### 62. 2d6World (Newton Nitro / NitroGames)
- **Descrição:** Motor narrativista e ágil concebido por Newton Nitro como a evolução contemporânea das regras do *NitroDungeon* (Segunda Edição). Inspirado na cartilha Powered by the Apocalypse (PbtA) e no clássico *Dungeon World*, mas reconstruído com sabor visceral, foco em agilidade na mesa, playbooks modulares e alta personalização.
- **Mecânicas:**
  - **Distribuição Tripartite de Sucesso (2d6 + Modificador):**
    - **10+:** *Sucesso Pleno* (o personagem alcança o objetivo com maestria e pode escolher efeitos adicionais).
    - **7–9:** *Sucesso Parcial ou com Custo* (o objetivo é atingido, mas com complicação, recurso gasto, perigo iminente ou retaliação).
    - **6 ou menos:** *Falha Dramática / Movimento do Mestre* (o Mestre faz um Movimento Duro ou Suave para alterar o estado ficcional, e o jogador marca 1 Ponto de Experiência/Aprendizado).
  - **Estrutura de Movimentos (Moves):** Ações categorizadas em *Movimentos Básicos*, *Movimentos de Combate* e *Movimentos Especiais de Arquétipo*. A ficção sempre lidera a mecânica ("para fazer, você precisa narrar o que faz").
  - **Playbooks de Gênero Customizáveis:** Arquétipos que combinam Atributos (Força, Agilidade, Vigor, Mente, Espírito), Vínculos entre personagens, Equipamentos com tags narrativas e Habilidades Especiais desbloqueáveis por avanço.
  - **Dano Ficcional e Condições:** Substituição de HP inflacionado por dano baseado em dados de classe e Tags (Penetrante, Devastador, Furtivo), aplicando condições debilitantes que impactam rolagens subsequentes.
- **Site Oficial:** [2d6world no Nitroblog](https://newtonrocha.wordpress.com/2d6world/)
- **Jogos Derivados:** *NitroDungeon 2ª Edição*, *Legião: A Era da Desolação (Adaptação 2d6World)*, *CyberDungeon 20XX*.
- **Implementação no Foundry VTT:**
  - `Item Type DataModel`: Itens do tipo `move` com gatilhos (`trigger`), tipo de movimento (`basic`, `class`, `special`) e fórmulas vinculadas a atributos dinâmicos.
  - `Chat Cards PbtA`: Exibição instantânea do resultado com cores temáticas (Verde 10+, Amarelo 7-9, Vermelho 6-) e botões de opções de escolha embutidos diretamente na mensagem do chat para escolhas do jogador em sucessos 7-9 ou 10+.

---

### 63. Pocket 2d6World (Newton Nitro / NitroGames)
- **Descrição:** Variante ultra-minimalista, portátil e micro-narrativista do 2d6World, projetada por Newton Nitro para one-shots imediatas, convenções, jogos improvisados e campanhas minimalistas de preparação zero (*zero-prep*).
- **Mecânicas:**
  - **Ficha em Meia Página / Cartão:** Personagens definidos por apenas 3 ou 4 Atributos principais (ex: Físico, Raciocínio, Vontade) com modificadores que variam tipicamente entre `-1` e `+3`, acrescidos de 1 Façanha/Especialidade e 3 Itens Marcantes.
  - **Resolução Rápida 2d6:** Mantém o gradiente `10+` (Sucesso), `7-9` (Custo), `6-` (Reviravolta/Problema), eliminando tabelas de consulta pesadas em favor do bom senso ficcional e do consenso da mesa.
  - **Trilha de Resistência Minimalista:** 3 a 5 Caixas de Dano/Stress. Cada ferimento absorvido marca uma caixa; quando todas estão marcadas, o personagem cai inconsciente, é retirado de cena ou sofre uma debilidade permanente.
  - **Regra de Conversão Instantânea:** Permite rodar qualquer aventura tradicional de D&D, OSR ou PbtA convertendo desafios em dificuldades de teste direto no ato.
- **Site Oficial:** [Pocket 2d6World no Nitroblog](https://newtonrocha.wordpress.com/pocket-2d6world-sistema-de-regras-de-rpg-minimalista-narrativista-e-customizavel/)
- **Jogos Derivados:** Micro-cenários de bolso, *Pocket NitroDungeon*, one-shots de eventos escolares e oficinas de RPG.
- **Implementação no Foundry VTT:**
  - `Sheet Ultra-Compacta em ApplicationV2`: Ficha de Ator responsiva com altura reduzida (formato cartão de bolso), checkboxes reativos para as caixas de estresse e macro de 1-clique para qualquer rolagem de atributo.

---

### 64. Sistema 2d10Solo (Newton Nitro / NitroGames)
- **Descrição:** Motor pioneiro e versátil de regras customizáveis para jogos de RPG sem Mestre (Solo RPG) ou cooperativos sem mestre, criado por Newton Nitro. Focado na filosofia do "Jogador-Mestre" e na narrativa emergente instantânea ("A História Acontece Agora").
- **Mecânicas:**
  - **Oráculo Probabilístico 2d10 (Sim / Não com Nuances):**
    - Perguntas fechadas formuladas à ficção são resolvidas rolando `2d10` (gerando resultados de 2 a 20) contra probabilidades escalonadas (Improvável, 50/50, Provável, Quase Certo).
    - **Leitura dos Dois d10:**
      - **Sim, e...** (Sucesso espetacular com bônus).
      - **Sim.** (Confirmação padrão).
      - **Sim, mas...** (Confirmação com complicação ou custo).
      - **Não, mas...** (Negação aliviada por um detalhe favorável).
      - **Não.** (Negação padrão).
      - **Não, e além disso...** (Negação com agravamento grave ou perigo novo).
  - **Oráculo de Dados Iguais (Duplos / Match):** Se ambos os dados caírem no mesmo valor (ex: `3 e 3`, `7 e 7`), uma **Reviravolta Inesperada (Plot Twist)** é disparada imediatamente, consultando a Tabela de Foco de Evento.
  - **Tabelas Geradoras de Estímulo Semântico (Verbo + Substantivo):** Matrizes percentuais ou 2d10 para gerar faíscas de criatividade imediata quando a cena precisa de descrição sensorial, intenção de NPC, pistas ou desfechos de mistério.
  - **Geradores de NPCs e Complicações:** Tabelas de arquétipos, motivações e reações imediatas (Hostil, Neutro, Curioso, Amigável, Enganador).
- **Site Oficial:** [2d10Solo no Nitroblog](https://newtonrocha.wordpress.com/sistema-2d10solo-2d10solo-regras-customizaveis-para-jogos-de-rpg-sem-mestre-download-gratuito-nitrogames-rpgsolo-sistemaderpg/)
- **Jogos Derivados:** Ferramenta padrão para campanhas solo em múltiplos sistemas (*Old-School Essentials*, *Tormenta20*, *Call of Cthulhu*, *Vampiro: A Máscara*).
- **Implementação no Foundry VTT:**
  - `Journal / RollTable Automation`: Pacote de compêndio de `RollTable` com a tabela mestre de probabilidades 2d10 e tabelas semânticas (Verbos/Substantivos).
  - `Macro Oracular`: Macro com diálogo pop-up que pergunta "Qual a probabilidade?" (Muito Improvável até Quase Certo), rola `2d10`, detecta duplos automaticamente e publica no chat a resposta interpretada com botão para sortear reviravolta se houver empate.

---

### 65. Sistema 2d6Solo (Newton Nitro / NitroGames)
- **Descrição:** Adaptação e condensação minimalista do motor 2d10Solo calibrada exclusivamente para o uso de dados de seis faces (`2d6`). Ideal para ser utilizado em conjunto com o *Pocket 2d6World*, *Traveller*, jogos PbtA ou qualquer sistema que opere nativamente com d6s.
- **Mecânicas:**
  - **Oráculo Central 2d6:**
    - Pergunta formulada -> Ajusta-se o modificador de probabilidade (+1, 0, -1, etc.).
    - **10+:** *Sim, e...*
    - **8–9:** *Sim.*
    - **7:** *Sim, mas...* (ponto de inflexão dramática neutro/equilibrado).
    - **5–6:** *Não, mas...*
    - **3–4:** *Não.*
    - **2:** *Não, e além disso...*
  - **Gatilho de Empate (Duplos no 2d6):** Qualquer resultado com dados gêmeos (1-1, 2-2, 3-3, 4-4, 5-5, 6-6) ativa o *Oráculo de Evento Aleatório*, introduzindo novos personagens, mudanças repentinas de clima, ou revelações sobre a cena atual.
  - **Tabelas D66 / 2d6 para Ação e Tema:** Lista condensada de 36 verbos e 36 temas/substantivos lidos combinando o primeiro dado como dezena e o segundo como unidade (D66) para direcionamento temático instantâneo.
- **Site Oficial:** [2d6Solo no Nitroblog](https://newtonrocha.wordpress.com/2d6solo/)
- **Jogos Derivados:** Campanhas solo de *Pocket 2d6World*, sessões de bolso em viagens, aventuras coop sem mestre.
- **Implementação no Foundry VTT:**
  - `Compendium Pack de RollTables D66`: Tabelas configuradas no Foundry para consulta de 1d6*10 + 1d6.
  - `HUD Flutuante de Oráculo`: Widget em tela que permite ao jogador solo clicar na probabilidade e receber a interpretação sem abrir janelas extras.

