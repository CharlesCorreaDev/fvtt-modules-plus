# Sistemas Narrativos, PbtA e Forged in the Dark para Foundry VTT 🎭🎲
> *Base de Conhecimento — Master of Foundry VTT by GM Charles Corrêa*

---

## 1. Blades in the Dark (blades-in-the-dark-fvtt & foundryvtt-blades-in-the-dark)
- **Repositórios:**
  - GMonlineua: [https://github.com/GMonlineua/blades-in-the-dark-fvtt](https://github.com/GMonlineua/blades-in-the-dark-fvtt)
  - Dez384: [https://github.com/Dez384/foundryvtt-blades-in-the-dark](https://github.com/Dez384/foundryvtt-blades-in-the-dark)
- **Arquitetura & Especificidades:**
  - Sistema de pool de d6 pegando o maior resultado: `6` (Sucesso Pleno), `4-5` (Sucesso Parcial com Consequência), `1-3` (Falha com Consequência), Múltiplos `6` (Crítico).
  - Gestão nativa de **Relógios de Progresso (Clocks)** de 4, 6 ou 8 segmentos, Fichas de Bando (Crew Sheets), Estresse, Traumas e Carga (Loadout).
- **Armadilhas Comuns:**
  - Não tente vincular rolagens de ação a classes de dificuldade numéricas fixas; a escala é sempre determinada pela **Posição** (Controlada, Arriscada, Desesperada) e **Efeito** (Nenhum, Reduzido, Padrão, Grande).

---

## 2. Powered by the Apocalypse Genérico & Dungeon World (pbta & dungeonworld)
- **Pacotes Foundry:**
  - PbtA Genérico: [https://foundryvtt.com/packages/pbta](https://foundryvtt.com/packages/pbta)
  - Dungeon World Oficial: [https://foundryvtt.com/packages/dungeonworld](https://foundryvtt.com/packages/dungeonworld)
- **Repositórios Oficiais:**
  - PbtA Core: [https://github.com/asacolips-projects/pbta](https://github.com/asacolips-projects/pbta)
  - Dungeon World: [https://github.com/asacolips-projects/dungeonworld](https://github.com/asacolips-projects/dungeonworld)
- **Jogos Suportados via Configuração:** Dungeon World, Monster of the Week, Apocalypse World, Masks, Avatar Legends, Urban Shadows, etc.
- **Arquitetura & Especificidades:**
  - Motor altamente configurável em JSON/TOML para definir estatísticas, movimentos básicos, avanços e Playbooks.
  - Rolagem padrão 2d6 + Atributo: 10+ (Sucesso Forte), 7-9 (Sucesso Fraco), 6- (Falha/Miss).
  - Dungeon World possui fichas dedicadas com classes de fantasia clássica, dano por classe de personagem e gestão de vínculos (*Bonds*).
- **Armadilhas Comuns:**
  - Ao criar um sistema baseado em PbtA, declare a estrutura em `game.pbta` ou na chave de configuração do mundo para evitar sobrescrever a matriz de estatísticas padrão.

---

## 3. City of Mist (city-of-mist)
- **Repositório:** [https://github.com/taragnor/city-of-mist](https://github.com/taragnor/city-of-mist)
- **Arquitetura & Especificidades:**
  - Motor narrativo baseado em Tags (Poderes vs Fraquezas) e Statuses em vez de atributos numéricos fixos.
  - Rolagem 2d6 + número de Power Tags ativas - número de Weakness Tags/Status.
  - Gerenciamento do conflito de identidade: Logos (Identidade Mundana) vs Mythos (Lenda/Poder Místico).

---

## 4. Fate Core / Accelerated / Condensed (fate-core-official)
- **Repositório Oficial:** [https://github.com/Sk1mble/fate-core-official](https://github.com/Sk1mble/fate-core-official)
- **Arquitetura & Especificidades:**
  - Utiliza 4 Dados Fudge/Fate (`4dF`, gerando valores de -4 a +4) somados ao valor de Perícia/Abordagem.
  - Gestão de Pontos de Destino (Fate Points), Aspectos, Façanhas (Stunts) e Estresse/Consequências.

---

## 5. Perigos & Princesas / Perils & Princesses (perilsandprincesses)
- **Repositório:** [https://github.com/helloshyann/perilsandprincesses](https://github.com/helloshyann/perilsandprincesses)
- **Arquitetura & Especificidades:**
  - RPG de fantasia de contos de fadas e aventura (*Perigos & Princesas*) com mecânicas narrativas de presentes mágicos (Gifts), coragem, determinação e fichas estilizadas para princesas heroínas.

---

## 6. Crônicas RPG (cronicasrpg)
- **Pacote Foundry:** [https://foundryvtt.com/packages/cronicasrpg](https://foundryvtt.com/packages/cronicasrpg)
- **Repositório:** [https://github.com/coppolaop/cronicasrpg](https://github.com/coppolaop/cronicasrpg)
- **Arquitetura & Especificidades:**
  - Sistema narrativo brasileiro criado por Pedro Coppola para contação de histórias com mecânicas leves e focadas em conflitos dramáticos.
  - Fichas estilizadas, foco em aspectos descritivos de personagens, recursos dramáticos e rolagens ágeis.

---

## 7. The Witch Is Dead (TheWitchIsDead)
- **Repositório:** [https://github.com/SaikoMdfk/TheWitchIsDead](https://github.com/SaikoMdfk/TheWitchIsDead)
- **Arquitetura & Especificidades:**
  - RPG minimalista e cômico/trágico de uma página de Grant Howitt, onde os jogadores interpretam familiares animais buscando vingança pelo assassinato de sua bruxa.
  - Testes baseados em 1d10 contra o valor de um dos quatro traços dos animais: Raposa, Rato, Lebre, Coruja, etc.
  - Ficha de personagem simplificada com rolagem direta de feitiços caóticos e instintos animais.

