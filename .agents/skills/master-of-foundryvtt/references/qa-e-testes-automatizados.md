# QA, Testes Automatizados & Validação de Módulos e Sistemas
## Parte Integrante da Skill Master of Foundry VTT — by GM Charles Corrêa

Erros em módulos e sistemas de Foundry VTT frequentemente se manifestam de forma silenciosa: um cálculo de atributo derivado falha em tempo de execução, um hook trava a inicialização do mundo ou uma migração corrompe os compêndios do Mestre.

O **Engenheiro de QA & Testes Automatizados** atua para garantir que cada pacote possua cobertura de testes unitários e de integração antes de ser aprovado para lançamento.

---

## 1. Pirâmide de Testes no Foundry VTT

```
             / \
            / E2E \       ➔ Testes com Foundry Headless / Playwright
           /-------\
          /  HOOKS  \     ➔ Testes de Ciclo de Vida (init, ready, render)
         /-----------\
        / TYPE-DATA-  \   ➔ Testes Unitários de Modelos de Dados
       /    MODELS     \    (prepareDerivedData, validação de campos)
      /-----------------\
```

---

## 2. Testes Unitários com Vitest para `TypeDataModel`

Os testes mais críticos de um sistema ou módulo residem na integridade matemática do `TypeDataModel`. Testamos as classes sem precisar subir a interface gráfica inteira do Foundry:

### Exemplo de Teste de Modelo de Dados (`tests/actor-model.test.ts`):
```typescript
import { describe, it, expect, beforeEach } from "vitest";

// Mock mínimo do ambiente de campos do Foundry
class MockDataField {
  constructor(public options = {}) {}
}

describe("ActorDataModel - Lógica de Derivação e Cálculos", () => {
  let actorData: any;

  beforeEach(() => {
    actorData = {
      attributes: {
        forca: 14,
        destreza: 12,
        constituicao: 16
      },
      hp: { value: 10, max: 0 },
      modificadores: {}
    };
  });

  it("deve calcular corretamente o modificador de atributo clássico (valor - 10) / 2", () => {
    const modForca = Math.floor((actorData.attributes.forca - 10) / 2);
    expect(modForca).toBe(2);
  });

  it("deve calcular o HP Máximo baseado na Constituição sem permitir valores negativos", () => {
    const modCon = Math.max(0, Math.floor((actorData.attributes.constituicao - 10) / 2));
    const hpCalculado = 10 + (modCon * 2);
    expect(hpCalculado).toBe(16);
  });

  it("deve tratar cenários extremos com atributo zerado sem disparar NaN", () => {
    actorData.attributes.forca = 0;
    const modForca = Math.floor((actorData.attributes.forca - 10) / 2);
    expect(isNaN(modForca)).toBe(false);
    expect(modForca).toBe(-5);
  });
});
```

---

## 3. Validação de Hooks e Conflitos de Inicialização

Testes de ciclo de vida verificam se o módulo registra suas dependências sem travar a cadeia de execução:

1. **Hook `init`**:
   - Registro de `TypeDataModel` em `CONFIG.Actor.dataModels` e `CONFIG.Item.dataModels`.
   - Registro de `Handlebars.registerHelper` e templates pré-carregados (`loadTemplates`).
   - Verificação de ausência de chamadas a `game.actors` ou `game.scenes` (esses objetos ainda não existem no `init`).
2. **Hook `ready`**:
   - Verificação de ativação de sockets (`game.socket.on`).
   - Migração condicional de versões anteriores com backup prévio de dados.
   - Detecção defensiva de módulos de terceiros opcionais (`Midi-QOL`, `Sequencer`).

---

## 4. Fixtures de Teste & Validação de Compêndios

Para garantir que pacotes de itens, monstros e magias não quebrem o banco de dados `ClassicLevel`:
- Criar fixtures JSON válidas em `tests/fixtures/`.
- Validar se todos os campos obrigatórios declarados no esquema (`required: true`, `nullable: false`) estão presentes em todos os registros do compêndio.
- Garantir que caminhos de ícones e texturas apontem para arquivos existentes ou para o fallback canônico `icons/svg/mystery-man.svg`.

