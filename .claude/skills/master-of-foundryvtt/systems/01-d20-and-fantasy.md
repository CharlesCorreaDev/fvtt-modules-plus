# Sistemas de Fantasia Heroica, D20 e Duality Dice para Foundry VTT ⚔️🧙‍♂️
> *Base de Conhecimento — Master of Foundry VTT by GM Charles Corrêa*

---

## 1. Dungeons & Dragons 5th Edition (dnd5e)
- **Repositórios & Fontes Oficiais:**
  - Sistema Oficial: [https://github.com/foundryvtt/dnd5e](https://github.com/foundryvtt/dnd5e)
  - Módulo de Tradução PT-BR (FVTT Brasil): [https://gitlab.com/fvtt-brasil/dnd5e/-/tree/master](https://gitlab.com/fvtt-brasil/dnd5e/-/tree/master)
- **APIs de Consulta & Base de Dados Aberta (SRD):**
  - **D&D 5e SRD API (REST / GraphQL):** [https://docs.dnd5eapi.co/introduction](https://docs.dnd5eapi.co/introduction)
    - Base de dados estruturada para consultas rápidas de magias, monstros, classes, subclasses, condições, itens e equipamentos baseados no SRD 5.1 oficial.
    - Útil para scripts de importação, autocomplete, busca em tempo real e verificação de regras oficiais SRD.
- **Ecossistema 5eTools (Consulta de Regras, Imagens e Importadores para Foundry):**
  - **Portais Web:**
    - 5eTools (Versão Atual / 2024 & Expansões): [https://5e.tools](https://5e.tools)
    - 5eTools 2014 (Regras Clássicas 5e): [https://2014.5e.tools/](https://2014.5e.tools/) e [http://2014.5e.tools](http://2014.5e.tools)
    - Download & Utilitários: [https://get.5e.tools/](https://get.5e.tools/)
  - **Repositórios de Código-Fonte & Imagens (5etools-mirror-3):**
    - Repositório Principal de Dados & Código: [https://github.com/5etools-mirror-3/5etools-src/](https://github.com/5etools-mirror-3/5etools-src/)
    - Releases Oficiais: [https://github.com/5etools-mirror-3/5etools-src/releases](https://github.com/5etools-mirror-3/5etools-src/releases)
    - Guia de Contribuição: [https://github.com/5etools-mirror-3/5etools-src/blob/main/CONTRIBUTING.md](https://github.com/5etools-mirror-3/5etools-src/blob/main/CONTRIBUTING.md)
    - Repositório de Regras Clássicas 2014: [https://github.com/5etools-mirror-3/5etools-2014-src/](https://github.com/5etools-mirror-3/5etools-2014-src/)
    - Repositório de Imagens, Tokens e Artes: [https://github.com/5etools-mirror-3/5etools-img](https://github.com/5etools-mirror-3/5etools-img)
  - **Guias de Instalação, Integração & Importadores no Foundry VTT:**
    - Guia de Instalação e Configuração: [https://wiki.tercept.net/en/5eTools/InstallGuide](https://wiki.tercept.net/en/5eTools/InstallGuide)
    - Módulos de Importação para Foundry (ex.: Plutonium / 5eTools Importer): permitem importar monstros com tokens prontos, magias com efeitos configurados, classes, raças, itens e aventuras inteiras direto do schema JSON do 5eTools para o Foundry VTT.
- **Ecossistema Plutonium & Repositórios TheGiddyLimit (Integração Total com Foundry VTT):**
  - **Página Oficial do Plutonium:** [https://2014.5e.tools/plutonium.html](https://2014.5e.tools/plutonium.html)
  - **Wiki & Documentação Oficial:** [https://wiki.tercept.net/en/Plutonium](https://wiki.tercept.net/en/Plutonium)
  - **Módulos & Pacotes do Plutonium:**
    - **Plutonium Next (Módulo Foundry VTT):** [https://github.com/TheGiddyLimit/plutonium-next](https://github.com/TheGiddyLimit/plutonium-next)
      - O módulo principal para Foundry VTT que provê interface completa de busca e importação direta de conteúdo 5eTools para compêndios e mundos.
    - **Plutonium Addon Automation:** [https://github.com/TheGiddyLimit/plutonium-addon-automation](https://github.com/TheGiddyLimit/plutonium-addon-automation)
      - Addon complementar para automação integrada de magias, ataques, efeitos e itens importados via Plutonium (usando Midi-QOL/DAE quando configurado).
    - **Plutonium Scenes:** [https://github.com/TheGiddyLimit/plutonium-scenes](https://github.com/TheGiddyLimit/plutonium-scenes)
      - Pacotes e utilitários de cenas pré-configuradas (com iluminação, paredes e grids ajustados).
    - **Plutonium Utils:** [https://github.com/TheGiddyLimit/plutonium-utils](https://github.com/TheGiddyLimit/plutonium-utils)
      - Scripts utilitários, conversores de dados e ferramentas auxiliares de manutenção do Plutonium.
  - **Repositórios de Conteúdo Adicional & Homebrew:**
    - **Homebrew 5eTools:** [https://github.com/TheGiddyLimit/homebrew](https://github.com/TheGiddyLimit/homebrew)
      - Repositório oficial comunitário de conteúdos caseiros (Homebrew) formatados no schema do 5eTools para importação no Foundry VTT.
    - **Unearthed Arcana:** [https://github.com/TheGiddyLimit/unearthed-arcana](https://github.com/TheGiddyLimit/unearthed-arcana)
      - Repositório com todo o material oficial de playtest (Unearthed Arcana) mantido e formatado para consulta e importação.
- **Arquitetura & Especificidades:**
  - Utiliza arquitetura orientada a `TypeDataModel` (v3.0+) e `Activity` system para itens e magias.
  - Implementa pipelines ricos de `dnd5e.preRollAbilityTest`, `dnd5e.rollAttack`, `dnd5e.rollDamage` e `dnd5e.useItem`.
  - Altamente extensível via `CONFIG.DND5E`.
- **Armadilhas Comuns:**
  - A partir da versão 3.0+, métodos legados como `item.roll()` foram refatorados para o sistema de Activities (`item.system.activities`). Tentar disparar consumo direto de spell slots pelo método antigo causará erro.
  - Modificações em dados de atores devem usar `system.abilities.<hab>.value` e não schemas antigos da v1/v2.
  - Ao importar dados do 5eTools ou da API D&D 5e para o Foundry v3.0+, certifique-se de compatibilizar o schema para o modelo de `activities` e converter imagens para `.webp`.

---

## 2. Pathfinder 2nd Edition (pf2e)
- **Repositório Oficial do Sistema:** [https://github.com/foundryvtt/pf2e](https://github.com/foundryvtt/pf2e)
- **Bases de Regras, SRDs & Portais Oficiais de Consulta:**
  - **Archives of Nethys (AoN) — Referência Oficial Licenciada da Paizo:** [https://2e.aonprd.com/](https://2e.aonprd.com/)
    - Fonte primária oficial e irrestrita de todas as regras, arquétipos, ancestralidades, magias, itens, monstros, perícias e erratas (inclusive Remaster Core).
    - Essencial para conferência da nomenclatura oficial em inglês e IDs de regras correspondentes aos compêndios do sistema no Foundry VTT.
  - **PF2 SRD PT-BR (Base Traduzida em Português):** [https://pf2srd.com.br/](https://pf2srd.com.br/)
    - Portal em português brasileiro com regras, magias, classes, itens e monstros traduzidos no padrão da comunidade brasileira e de módulos de tradução (ex: Módulo de Tradução PT-BR da New Order / FVTT Brasil).
    - Essencial para garantir tradução coerente de termos de regras ao criar campanhas, diários ou fichas em português.
  - **PF2 d20PFSRD:** [https://pf2.d20pfsrd.com/](https://pf2.d20pfsrd.com/)
    - Base de dados aberta e de busca rápida com tabelas, índices de consulta ágil e resumos de regras abertas sob a OGL / ORC License.
- **Arquitetura & Especificidades:**
  - Considerado o sistema com maior grau de automação e fidelidade no Foundry VTT.
  - Utiliza **Rule Elements (REs)** extensivos armazenados nos dados dos itens em vez de Active Effects tradicionais.
  - Código estritamente em TypeScript com compilação rígida.
- **Armadilhas Comuns:**
  - **Não utilize Active Effects tradicionais** para alterar atributos como AC, Saves ou Ataques. Use Rule Elements (`FlatModifier`, `RollOption`, `AdjustModifier`).
  - O pipeline de cálculo estatístico de atores é recalculado deterministicamente através do `ActorPF2e#prepareDerivedData` e `RuleElements`.
  - Ao criar itens, magias ou efeitos customizados, consulte sempre os Rule Elements oficiais nos compêndios nativos do sistema (`pf2e.spells-srd`, `pf2e.actionspf2e`, `pf2e.equipment-srd`), conferindo o texto de regra no Archives of Nethys ou no PF2 SRD PT-BR.

---

## 3. Daggerheart (daggerheart)
- **Repositório Oficial Foundry:** [https://github.com/Foundryborne/daggerheart](https://github.com/Foundryborne/daggerheart)
- **Bases de Regras Oficiais, SRDs & Portais Web:**
  - **Daggerheart SRD Oficial:** [https://www.daggerheart.com/srd/](https://www.daggerheart.com/srd/) e [https://daggerheart.com/srd](https://daggerheart.com/srd)
    - Especificação aberta oficial com todas as regras de personagens, classes, cartas de domínio, adversários, combate e mecânicas da Darrington Press.
  - **Portal Oficial Daggerheart:** [https://www.daggerheart.com/](https://www.daggerheart.com/)
  - **Downloads Oficiais:** [https://www.daggerheart.com/downloads/](https://www.daggerheart.com/downloads/)
  - **Perguntas Frequentes (FAQ):** [https://www.daggerheart.com/faq/](https://www.daggerheart.com/faq/)
  - **Portais Comunitários & SRDs Espelhados:**
    - Daggerheart SRD Community: [https://daggerheartsrd.com/](https://daggerheartsrd.com/)
    - Daggerheart.org Portal: [https://daggerheart.org/](https://daggerheart.org/)
- **Licenciamento Aberto, Kits para Criadores & Homebrew:**
  - **Licença de Conteúdo Comunitário Darrington Press (DPCGL):** [https://darringtonpress.com/license/](https://darringtonpress.com/license/)
  - **Diretrizes Oficiais DPCGL 2.0 (PDF):** [https://darringtonpress.com/wp-content/uploads/2026/08/DPCGL_2.0_AUG_26_2026.pdf](https://darringtonpress.com/wp-content/uploads/2026/08/DPCGL_2.0_AUG_26_2026.pdf)
  - **Logotipos Oficiais para Conteúdo Comunitário (ZIP):** [Darrington Press Community Content Logos](https://darringtonpress.com/wp-content/uploads/2025/05/Darrington-Press-Community-Content-Logos.zip)
  - **Daggerheart Homebrew Kit Portal:** [https://www.daggerheart.com/homebrewkit/](https://www.daggerheart.com/homebrewkit/)
  - **Homebrew Kit Oficial v1.0 (PDF):** [https://www.daggerheart.com/wp-content/uploads/2025/07/Daggerheart-Homebrew-Kit-v1.0-July-31-2025.pdf](https://www.daggerheart.com/wp-content/uploads/2025/07/Daggerheart-Homebrew-Kit-v1.0-July-31-2025.pdf)
- **Arquitetura & Mecânica Central (Duality Dice System):**
  - Desenvolvido pela Darrington Press (Critical Role / Spenser Starke).
  - **Não é PbtA**, mas um sistema de fantasia heroica com motor de **2d12 Duality Dice**:
    - **1 Dado da Esperança (*Hope Die*)** + **1 Dado do Medo (*Fear Die*)**.
    - O total (Hope + Fear + Modificador) determina o sucesso contra a Dificuldade (Difficulty / Target DC).
    - O dado individual mais alto determina o resultado narrativo:
      - **Sucesso com Esperança (*Success with Hope*):** Sucesso no teste e o jogador ganha 1 Ponto de Esperança (*Hope*).
      - **Sucesso com Medo (*Success with Fear*):** Sucesso no teste, mas o Mestre ganha 1 Ponto de Medo (*Fear*) ou ocorre uma complicação.
      - **Falha com Esperança (*Failure with Hope*):** Falha no teste, mas o jogador ganha 1 Ponto de Esperança.
      - **Falha com Medo (*Failure with Fear*):** Falha no teste e o Mestre ganha 1 Ponto de Medo ou faz um movimento de Mestre forte.
      - **Acerto Crítico (*Critical Success*):** Quando ambos os dados d12 caem no mesmo número (pares), gerando sucesso automático crítico e recuperando Esperança/Stress.
  - Utiliza arquitetura de Cartas de Domínio (*Domain Cards*), Slots de Armadura e Fichas de Personagem divididas em Classes/Subclasses.
  - Ao criar itens, cartas de domínio ou monstros caseiros, siga as diretrizes matemáticas do **Homebrew Kit Oficial** para preservar o equilíbrio de dano, custos de Esperança e limiares de Ferimento (*Damage Thresholds*).

---

## 4. Tormenta 20 (Tormenta20)
- **Repositório:** [https://gitlab.com/vizael/Tormenta20](https://gitlab.com/vizael/Tormenta20)
- **Arquitetura & Especificidades:**
  - Desenvolvido especificamente para as regras de Tormenta 20 (Editora Jambô).
  - Suporta cálculo automático de PV, PM, Defesa, Bônus de Treinamento e Perícias.
  - Fórmulas de rolagens com integração direta a macros de poderes e magias.
- **Armadilhas Comuns:**
  - Gerenciamento de PM temporários e custos de aprimoramento de magias possuem lógica customizada de diálogo. Ao disparar rolagens via macro, chame as funções do sistema registradas em `game.tormenta20` para manter consistência no consumo de recursos.

---

## 5. Old Dragon 2ª Edição (olddragon2e-foundryvtt)
- **Repositório:** [https://github.com/olddragoneditora/olddragon2e-foundryvtt](https://github.com/olddragoneditora/olddragon2e-foundryvtt)
- **Arquitetura & Especificidades:**
  - Sistema brasileiro Old School (Buró Jogos / Moostache).
  - Focado em agilidade, fichas clássicas e regras OSR (testes de Atributo sob o valor, Jogadas de Proteção, BA/BD).
- **Armadilhas Comuns:**
  - Mecânica de rolagem D20 Roll-Under (rolar abaixo do valor do atributo para sucesso) em testes de atributos e Roll-Over em Jogadas de Proteção/Ataque.

---

## 6. D&D 3.5e (D35E / dnd35e)
- **Repositórios:**
  - Sistema Oficial da Comunidade (Dragonshorn Studios / Antoni Sobkowicz): [https://gitlab.com/dragonshorn/D35E](https://gitlab.com/dragonshorn/D35E)
  - Manutenção Comunitária (Chapel Studios / RevJake): [https://github.com/Dragonshorn-Studios/dnd35e](https://github.com/Dragonshorn-Studios/dnd35e)
- **Arquitetura & Especificidades:**
  - Sistema completo para Dungeons & Dragons 3.5 com suporte a cálculo detalhado de BAB, modificadores de tamanho, resistências e tabelas de progressão de classe clássicas.
  - Implementa pipelines extensos de bônus cumulativos e condicionais em magias e perícias.
- **Armadilhas Comuns:**
  - Complexidade alta de bônus acumulativos (*Stacking Rules*: Enhancement, Morale, Luck, Insight, Competence). O sistema possui motor próprio para filtrar bônus não cumulativos. Não tente aplicar bônus brutos sem verificar as chaves de stacking.

---

## 7. Draw Steel (MCDM RPG)
- **Repositório:** [https://github.com/MetaMorphic-Digital/draw-steel](https://github.com/MetaMorphic-Digital/draw-steel)
- **Arquitetura & Especificidades:**
  - Sistema tático heroico projetado pela MCDM (Matt Colville).
  - Não utiliza jogadas de acerto tradicionais (ataques sempre causam efeito/dano em tiers 1, 2 ou 3 baseados no Power Roll 2d10).
- **Armadilhas Comuns:**
  - Sistema de dados de características e Heroic Resources (Victories, Stamina, Malice) segue ciclo de combate específico por rodada.

---

## 8. Advanced Roleplay System (Rolemaster / ARS)
- **Repositório:** [https://gitlab.com/foundryprojects/systems/advanced-roleplay-system](https://gitlab.com/foundryprojects/systems/advanced-roleplay-system)
- **Arquitetura & Especificidades:**
  - Sistema modular com suporte a tabelas críticas complexas, d100 open-ended (rolagens abertas) e cálculos percentuais detalhados.

---

## 9. Level Up: Advanced 5th Edition (a5e)
- **Pacote Foundry:** [https://foundryvtt.com/packages/a5e](https://foundryvtt.com/packages/a5e)
- **Repositório Oficial:** [https://github.com/Pjb518/FoundryVTT-Level-Up-Official](https://github.com/Pjb518/FoundryVTT-Level-Up-Official)
- **Arquitetura & Especificidades:**
  - Evolução tática profunda do 5E pela EN Publishing com manobras de combate (*Combat Traditions*), perícias de exploração, refúgios e conjuração flexível.
  - Implementa ficheiro próprio e automação de fadiga, estresse e recursos de classe customizados.

---

## 10. Old-School Essentials (ose)
- **Pacote Foundry:** [https://foundryvtt.com/packages/ose](https://foundryvtt.com/packages/ose)
- **Repositório Oficial:** [https://github.com/NecroticGnome/ose-foundry-core](https://github.com/NecroticGnome/ose-foundry-core)
- **Arquitetura & Especificidades:**
  - Implementação oficial da Necrotic Gnome (regras B/X clássicas).
  - Cálculo de THAC0 e Classe de Armadura Ascendente (AAC) comutável, Jogadas de Proteção por categoria OSR e taxas de exploração por dungeon turn.

---

## 11. Swords & Wizardry (swords-wizardry)
- **Pacote Foundry:** [https://foundryvtt.com/packages/swords-wizardry](https://foundryvtt.com/packages/swords-wizardry)
- **Repositório:** [https://github.com/vonkow/swords-wizardry](https://github.com/vonkow/swords-wizardry)
- **Arquitetura & Especificidades:**
  - Clássico retroclone OD&D (Frog God Games / Mythmere Games).
  - Foco em simplicidade estrita, rolagem de proteção única (Single Saving Throw) com modificadores de classe e compatibilidade com módulos OSR.

---

## 12. 13th Age (archmage)
- **Pacote Foundry:** [https://foundryvtt.com/packages/archmage](https://foundryvtt.com/packages/archmage)
- **Repositório:** [https://github.com/asacolips-projects/13th-age](https://github.com/asacolips-projects/13th-age)
- **Arquitetura & Especificidades:**
  - Sistema d20 cinemático da Pelgrane Press (Rob Heinsoo e Jonathan Tweet).
  - Mecânica central do **Dado de Escalação (Escalation Die)** que concede bônus de ataque acumulativo aos heróis a cada rodada de combate e dispara poderes condicionais naturais em rolagens pares/ímpares (Natural Even/Odd rolls).

---

## 13. DC20 RPG (dc20rpg)
- **Pacote Foundry:** [https://foundryvtt.com/packages/dc20rpg](https://foundryvtt.com/packages/dc20rpg)
- **Repositório:** [https://github.com/pazindorb/dc20rpg](https://github.com/pazindorb/dc20rpg)
- **Arquitetura & Especificidades:**
  - Sistema de fantasia moderna com economia de **4 Pontos de Ação (AP)** por turno, rolagens d20 dinâmicas e margem de sucesso (*Heavy Hits* a cada 5 pontos acima do DC).
  - Automação de slots de vigor, mana e reações táticas.

---

## 14. Shadowdark RPG (shadowdark)
- **Pacote Foundry:** [https://foundryvtt.com/packages/shadowdark](https://foundryvtt.com/packages/shadowdark)
- **Repositório:** [https://github.com/Muttley/foundryvtt-shadowdark](https://github.com/Muttley/foundryvtt-shadowdark)
- **Arquitetura & Especificidades:**
  - RPG de fantasia sombria da The Arcane Library (Kelsey Dionne).
  - **Temporizador Real de Tocha (Real-Time Torch Timer)** de 60 minutos integrado diretamente à interface do Foundry VTT, gerenciamento de inventário baseado em slots e conjuração arriscada sem spell slots (d20 spellcasting check onde falha causa perda ou desastre místico).

---

## 15. Nimble 5e (nimble)
- **Pacote Foundry:** [https://foundryvtt.com/packages/nimble](https://foundryvtt.com/packages/nimble)
- **Repositório:** [https://github.com/Nimble-Co/FoundryVTT-Nimble](https://github.com/Nimble-Co/FoundryVTT-Nimble)
- **Arquitetura & Especificidades:**
  - Modificação simplificada e tática de combate acelerado para d20/5E sem rolagem de ataque separada (jogadas de dano simultâneas com armadura atuando como redução de dano).

---

## 16. Skyfall RPG & Fastplay (skyfall & skyfall-fastplay)
- **Pacotes Foundry:**
  - Skyfall RPG: [https://foundryvtt.com/packages/skyfall](https://foundryvtt.com/packages/skyfall)
  - Skyfall Fastplay: [https://foundryvtt.com/packages/skyfall-fastplay](https://foundryvtt.com/packages/skyfall-fastplay)
- **Repositórios:**
  - Skyfall Core: [https://github.com/Capycat-Games/skyfall-fvtt](https://github.com/Capycat-Games/skyfall-fvtt)
  - Skyfall Fastplay: [https://github.com/Capycat-Games/skyfall-fastplay](https://github.com/Capycat-Games/skyfall-fastplay)
- **Arquitetura & Especificidades:**
  - Sistema de fantasia trágica brasileira criado pela Capycat Games / Mestre Pedrok.
  - Mecânicas de Pontos de Ação, Dados de Sombra (*Shadow Dice*), Catarse, Maldições e Fichas integradas em arquitetura moderna de `TypeDataModel`.

---

## 17. Beyond the Wall and Other Adventures (beyond-the-wall)
- **Pacote Foundry:** [https://foundryvtt.com/packages/beyond-the-wall](https://foundryvtt.com/packages/beyond-the-wall)
- **Repositório:** [https://github.com/mclemente/fvtt-beyond-the-wall](https://github.com/mclemente/fvtt-beyond-the-wall)
- **Arquitetura & Especificidades:**
  - OSR focado em contos de fadas, juventude heróica e criação colaborativa de aldeias através de Playbooks de personagem.
  - Testes de atributos Roll-Under d20, magias cantrip/ritualísticas e gerenciamento de magias por nível.

---

## 18. Mini D20 (mini-d20)
- **Pacote Foundry:** [https://foundryvtt.com/packages/mini-d20](https://foundryvtt.com/packages/mini-d20)
- **Repositório:** [https://github.com/Choaca/mini-d20](https://github.com/Choaca/mini-d20)
- **Arquitetura & Especificidades:**
  - Implementação minimalista de regras D20 com fichas ultra-leves e customização direta de atributos.

