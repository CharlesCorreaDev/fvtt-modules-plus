# Guia de Modelagem Estatística e Probabilidades de Dados com AnyDice 🎲

O **AnyDice** ([anydice.com](https://anydice.com/)) é o padrão de referência para análise de probabilidades, balanceamento matemático e design de mecânicas de rolagem em RPGs de mesa e no Foundry VTT.

---

## 1. Documentação e Links Oficiais
- **Editor Online & Simulador:** [anydice.com](https://anydice.com/)
- **Documentação Oficial:** [anydice.com/docs/](https://anydice.com/docs/)
- **Biblioteca de Funções Built-in:** [anydice.com/docs/function-library/](https://anydice.com/docs/function-library/)
- **Artigos e Tutoriais Matemáticos:** [anydice.com/articles/](https://anydice.com/articles/)
- **Exemplo de Programa Complexo:** [anydice.com/program/2a6ba](https://anydice.com/program/2a6ba)

---

## 2. Princípios de Modelagem de Dados

### 2.1 Relação AnyDice ➔ Fórmula do Foundry VTT (`Roll`)
No Foundry VTT, toda rolagem é instanciada por `new Roll("formula").evaluate()`. O AnyDice permite validar matematicamente se a fórmula é justa, punitiva ou balanceada antes de codificar.

| Sistema de RPG | Mecânica | Exemplo AnyDice | Fórmula Foundry VTT |
|---|---|---|---|
| **D20 (D&D / PF2e / T20)** | Rolar 1d20 + bônus | `output 1d20 + 5` | `1d20 + 5` |
| **Vantagem / Desvantagem** | Maior / menor de 2d20 | `output [highest 1 of 2d20]` | `2d20kh` / `2d20kl` |
| **Year Zero Engine (YZE)** | Pool de D6 contando 6s | `output [count 6 in 6d6]` | `6d6cs>=6` |
| **Savage Worlds (Explosão)**| Dados explodem no valor máximo | `output [explode d8]` | `1d8x` |
| **World of Darkness (D10 Pool)**| Sucessos 8+, falhas no 1 | `output [count {8..10} in 5d10]` | `5d10cs>=8` |
| **GURPS / 3d6 Bell Curve**| 3d6 menor ou igual a perícia | `output 3d6 <= 13` | `3d6` |

---

## 3. Funções AnyDice Essenciais para Desenvolvimento de Mecânicas

### Contagem de Sucessos em Pools (Year Zero Engine & Storyteller):
```anydice
\ Contar sucessos em Year Zero Engine \
function: yze POOL:s {
  result: [count 6 in POOL]
}

output [yze 5d6] named "5 Dados Base"
output [yze 8d6] named "8 Dados (Atributo + Perícia + Equipamento)"
```

### Rolagem Pressionada / "Push the Roll" (Year Zero Engine):
```anydice
\ Simulação de Push: rerolar dados que não deram 1 nem 6 \
function: push POOL:s {
  SUCS: [count 6 in POOL]
  ONES: [count 1 in POOL]
  REROLL: [count {2..5} in POOL]
  NEW_SUCS: [count 6 in REROLL d6]
  result: SUCS + NEW_SUCS
}

output [push 6d6] named "6d6 Pressionado (Push)"
```

### Explosão com Limite (Evitar loops infinitos):
```anydice
\ Dado que explode até no máximo 3 vezes \
function: explode DIE:d limit LIMIT:n {
  if LIMIT <= 0 { result: DIE }
  if DIE = [maximum of DIE] {
    result: DIE + [explode DIE limit LIMIT - 1]
  }
  result: DIE
}

output [explode d8 limit 3] named "d8 Explodindo até 3x"
```

---

## 4. Como Integrar o AnyDice nas Tarefas do Agente
Quando o usuário pedir para criar um novo sistema de regras, balancear armas, calcular margem de dano ou criar tabelas de probabilidades:
1. **Modelar no AnyDice:** Escreva o script de probabilidade usando a sintaxe AnyDice para validar as curvas (distribuição normal, chance de sucesso percentual, média e desvio padrão).
2. **Apresentar a Análise:** Mostre ao mestre/usuário a probabilidade real de sucesso e falha crítica.
3. **Traduzir para Foundry VTT:** Converta a lógica validada para a classe `Roll` ou funções de rolagem personalizadas no Foundry (`Roll.create(...)` e `DiceTerm`).
