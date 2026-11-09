# Sistemas de Investigação e Horror Cósmico para Foundry VTT 🐙🔍
> *Base de Conhecimento — Master of Foundry VTT by GM Charles Corrêa*

---

## 1. Call of Cthulhu 7th Edition (CoC7-FoundryVTT)
- **Repositório:** [https://github.com/Miskatonic-Investigative-Society/CoC7-FoundryVTT](https://github.com/Miskatonic-Investigative-Society/CoC7-FoundryVTT)
- **Arquitetura & Especificidades:**
  - Sistema de percentil D100 com cálculo automático de Sucesso Regular (<= Valor), Bom/Hard (<= Valor / 2), Extremo (<= Valor / 5), Crítico (01) e Desastre/Fumble (96-100 ou 100).
  - Suporte completo a Dados de Bônus e Penalidade (dados de dezena adicionais) e gasto de Sorte (Luck) para alterar resultados de testes.
  - Testes de Sanidade (Sanity Check) e perda de sanidade automatizada.
- **Armadilhas Comuns:**
  - O cálculo de gasto de Sorte não pode ser aplicado em testes de Sorte, Sanidade ou Falhas Críticas.
  - O sistema implementa janelas de diálogo com suporte a forçar o teste (*Pushing the Roll*).

---

## 2. Delta Green (delta-green-foundry-vtt-system)
- **Repositório:** [https://github.com/deltagreen-foundryvtt/delta-green-foundry-vtt-system](https://github.com/deltagreen-foundryvtt/delta-green-foundry-vtt-system)
- **Arquitetura & Especificidades:**
  - Sistema moderno de investigação e conspiração cósmica (D100 Roll-Under).
  - Mecânicas de Laços (Bonds), Motivações, Pontos de Ruptura (Breaking Points) e Letalidade (Lethality Rating com d100 onde números iguais geram acertos críticos ou mortes instantâneas).
- **Armadilhas Comuns:**
  - Testes de letalidade (`Lethality %`) possuem dois modos: se o resultado for menor ou igual à porcentagem, o alvo é eliminado; caso contrário, os dois dados d10 são somados como dano comum.

---

## 3. GUMSHOE System (gumshoe-fvtt)
- **Repositório:** [https://github.com/lumphammer/gumshoe-fvtt](https://github.com/lumphammer/gumshoe-fvtt)
- **Jogos Cobertos:** Rastros de Cthulhu, Ashen Stars, Night's Black Agents, Esoterrorists, Fall of DELTA GREEN.
- **Arquitetura & Especificidades:**
  - Diferenciação estrita entre **Habilidades Investigativas** (que nunca falham quando gastas) e **Habilidades Gerais** (testadas com 1d6 + pontos gastos contra Dificuldade 4 padrão).
- **Armadilhas Comuns:**
  - A gestão do pool de pontos e recuperação por cena é central. Não trate habilidades investigativas como rolagens de probabilidade.

---

## 4. Cthulhu Dark (FoundryVTT-CthulhuDark)
- **Repositório:** [https://github.com/philote/FoundryVTT-CthulhuDark](https://github.com/philote/FoundryVTT-CthulhuDark)
- **Arquitetura & Especificidades:**
  - Sistema minimalista de terror com d6: 1 dado humano, 1 dado de ocupação e 1 dado do Insight/Insanidade.
  - Se o dado do Insight for o maior resultado, a sanidade/Insight do investigador aumenta.
- **Armadilhas Comuns:**
  - Ao atingir Insight 6, o personagem enlouquece permanentemente e é retirado do jogo.

---

## 5. Arkham Horror RPG (arkham-horror-rpg-fvtt)
- **Pacote Foundry:** [https://foundryvtt.com/packages/arkham-horror-rpg-fvtt](https://foundryvtt.com/packages/arkham-horror-rpg-fvtt)
- **Repositório:** [https://github.com/MrTheBino/arkham-horror-rpg-fvtt](https://github.com/MrTheBino/arkham-horror-rpg-fvtt)
- **Arquitetura & Especificidades:**
  - Sistema da Edge Studio / Fantasy Flight Games baseado no sistema Dynamic Pool System com dados de 6 faces estilizados.

---

## 6. Ordem Paranormal RPG (ordemparanormal2 & ordem-paranormal-2e)
- **Pacotes Foundry:**
  - Ordem Paranormal 2: [https://foundryvtt.com/packages/ordemparanormal2](https://foundryvtt.com/packages/ordemparanormal2)
  - Ordem Paranormal 2e FVTT: [https://foundryvtt.com/packages/ordem-paranormal-2e](https://foundryvtt.com/packages/ordem-paranormal-2e)
- **Repositórios:**
  - Antonio Monteiro: [https://github.com/antoniohbmonteiro/ordemparanormal2](https://github.com/antoniohbmonteiro/ordemparanormal2)
  - SergioSJS: [https://github.com/SergioSJS/ordem-paranormal-2e-fvtt](https://github.com/SergioSJS/ordem-paranormal-2e-fvtt)
- **Arquitetura & Especificidades:**
  - Sistema brasileiro de investigação paranormal e terror criado por Cellbit / Jambô Editora.
  - Rolagem baseada em pool de d20 (quantidade de dados igual ao Atributo, escolhendo o maior valor) somado à Perícia. Margem de ameaça para Acertos Críticos e dano multiplicado.
  - Gerenciamento detalhado de Pontos de Vida (PV), Pontos de Esforço (PE), Sanidade (SAN), Nex (% de Exposição Paranormal) e Rituais com elementos do Outro Lado (Sangue, Morte, Conhecimento, Energia, Medo).

---

## 7. Casos Insólitos (casos-insolitos)
- **Pacote Foundry:** [https://foundryvtt.com/packages/casos-insolitos](https://foundryvtt.com/packages/casos-insolitos)
- **Repositório:** [https://github.com/douglasbaiense/casos-insolitos-foundry](https://github.com/douglasbaiense/casos-insolitos-foundry)
- **Arquitetura & Especificidades:**
  - RPG nacional de investigação sobrenatural e mistério urbano.
  - Fichas estilizadas para casos misteriosos com mecânicas de pistas, dedução investigativa e gestão de trauma psicológico.

