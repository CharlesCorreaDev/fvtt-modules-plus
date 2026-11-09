# Sistemas Storyteller e Mundo das Trevas para Foundry VTT 🩸🦇
> *Base de Conhecimento — Master of Foundry VTT by GM Charles Corrêa*

---

## 1. World of Darkness 20th Anniversary (Foundry_WoD20)
- **Repositório:** [https://github.com/JohanFalt/Foundry_WoD20](https://github.com/JohanFalt/Foundry_WoD20)
- **Jogos Cobertos:** Vampiro: A Máscara 20 Anos, Lobisomem: O Apocalipse 20 Anos, Mago: A Ascensão 20 Anos, Changeling 20 Anos, Wraith 20 Anos.
- **Arquitetura & Especificidades:**
  - Sistema de pool de d10 com Dificuldade variável (Target Number padrão 6) e mecânica de cancelamento de sucessos por '1' (botches).
  - Suporta fichas com seletores de esferas, disciplinas, dons, formas de lobisomem e condições de dano (Contusão, Letal, Agravado).
- **Armadilhas Comuns:**
  - O cálculo de falhas críticas (Botch) requer atenção à regra de cancelamento: se não houver sucessos e houver pelo menos um resultado 1, é gerado um Botch.
  - A gestão de parada de dados modificada temporariamente (por ferimentos ou bônus) é calculada na caixa de diálogo de rolagem.

---

## 2. Vampire: The Masquerade 5th Edition (foundry-V5 & wod5e)
- **Repositórios:**
  - foundry-V5: [https://github.com/Rayji96/foundry-V5](https://github.com/Rayji96/foundry-V5)
  - wod5e: [https://github.com/WoD5E-Developers/wod5e](https://github.com/WoD5E-Developers/wod5e)
  - wod6e / Experimental: [https://github.com/WoD5E-Developers/wod6e](https://github.com/WoD5E-Developers/wod6e)
  - Changeling 5E: [https://github.com/WoD5E-Developers/changeling-5e](https://github.com/WoD5E-Developers/changeling-5e)
- **Arquitetura & Especificidades:**
  - Motor de dados de Fome (Hunger Dice) para Vampiro, Fúria (Rage Dice) para Lobisomem e Tensão para Caçador.
  - Rolagens avaliam sucessos em 6-10, com 10s duplos gerando Críticos. Dados de fome em 10 geram *Messy Critical* e em 1 geram *Bestial Failure*.
- **Armadilhas Comuns:**
  - As tags de dados (`hunger`, `regular`, `rage`) exigem tipagem especial de `Die` ou `DiceTerm` customizado para renderizar as faces estilizadas no chat.

---

## 3. KULT: Divinity Lost (FoundryVTT-k4lt)
- **Repositório:** [https://github.com/YanKlInnomme/FoundryVTT-k4lt](https://github.com/YanKlInnomme/FoundryVTT-k4lt)
- **Arquitetura & Especificidades:**
  - Baseado no motor Powered by the Apocalypse adaptado para terror psicológico (2d10 + modificador de atributo).
  - Resultados: 15+ (Sucesso Completo), 10-14 (Sucesso com Consequência), 9- (Falha / Movimento do Mestre).
- **Armadilhas Comuns:**
  - O cálculo de estabilidade mental, ferimentos sérios/críticos e desvantagens impacta diretamente as rolagens contínuas de movimentos de fuga e confronto.
