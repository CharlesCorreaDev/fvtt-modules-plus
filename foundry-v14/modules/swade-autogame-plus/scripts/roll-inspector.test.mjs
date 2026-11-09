import { test, describe } from "node:test";
import assert from "node:assert";
import { RollInspector } from "./roll-inspector.mjs";
import { RollModifiersEngine, SWADE_MODIFIER_CATALOG } from "./roll-modifiers-modal.mjs";

describe("RollInspector (Dice Breakdown & Aces Detection)", () => {
  test("deve detectar dados que tiraram o valor máximo (hasMaxFace)", () => {
    const mockRoll = {
      total: 8,
      formula: "1d8",
      dice: [
        {
          faces: 8,
          total: 8,
          results: [{ result: 8, active: true }],
        },
      ],
    };

    const inspected = RollInspector.inspect(mockRoll);
    assert.strictEqual(inspected.diceBreakdown.length, 1);
    assert.strictEqual(inspected.diceBreakdown[0].hasMaxFace, true);
    assert.strictEqual(inspected.diceBreakdown[0].explosionCount, 0);
  });

  test("deve detectar explosões consecutivas (Áses)", () => {
    // Um d6 que tirou 6, explodiu e tirou 6 de novo, e depois tirou 2 (Total = 14)
    const mockRoll = {
      total: 14,
      formula: "1d6x",
      dice: [
        {
          faces: 6,
          total: 14,
          results: [
            { result: 6, active: true },
            { result: 6, active: true },
            { result: 2, active: true },
          ],
        },
      ],
    };

    const inspected = RollInspector.inspect(mockRoll);
    assert.strictEqual(inspected.diceBreakdown[0].explosionCount, 2);
    assert.strictEqual(inspected.diceBreakdown[0].hasMaxFace, true);
  });

  test("deve identificar e separar o Dado Selvagem (Wild Die)", () => {
    const mockRoll = {
      total: 9,
      formula: "1d8x + 1d6x",
      dice: [
        {
          faces: 8,
          total: 4,
          results: [{ result: 4, active: true }],
        },
        {
          faces: 6,
          total: 9,
          flavor: "Wild Die",
          results: [
            { result: 6, active: true },
            { result: 3, active: true },
          ],
        },
      ],
    };

    const inspected = RollInspector.inspect(mockRoll);
    assert.strictEqual(inspected.diceBreakdown.length, 1);
    assert.strictEqual(inspected.wildDieInfo !== null, true);
    assert.strictEqual(inspected.wildDieInfo.faces, 6);
    assert.strictEqual(inspected.wildDieInfo.explosionCount, 1);
    assert.strictEqual(inspected.wildDieInfo.hasMaxFace, true);
  });

  test("deve identificar o Dado Selvagem do SWADE v14 em PT-BR ('Dado Selvagem' / denomination 'dw')", () => {
    const mockRoll = {
      total: 4,
      formula: "{1d6x, 1dw6x}kh",
      dice: [
        {
          faces: 6,
          total: 4,
          flavor: "Agilidade",
          results: [{ result: 4, active: true }],
        },
        {
          faces: 6,
          total: 2,
          denomination: "dw",
          options: { flavor: "Dado Selvagem" },
          results: [{ result: 2, active: true }],
        },
      ],
    };

    const inspected = RollInspector.inspect(mockRoll);
    assert.strictEqual(inspected.diceBreakdown.length, 1);
    assert.strictEqual(inspected.diceBreakdown[0].flavor, "Agilidade");
    assert.strictEqual(inspected.wildDieInfo !== null, true);
    assert.strictEqual(inspected.wildDieInfo.total, 2);
    assert.strictEqual(inspected.wildDieInfo.isWild, true);
  });
});

describe("RollModifiersEngine (Detecção Automática da Ficha & Catálogo SWADE)", () => {
  test("deve possuir as 4 categorias completas de modificadores de regra do SWADE", () => {
    assert.strictEqual(Array.isArray(SWADE_MODIFIER_CATALOG), true);
    assert.strictEqual(SWADE_MODIFIER_CATALOG.length, 4);
  });

  test("deve detectar automaticamente Ferimentos, Fadiga, Distraído e Vantagem relevante na ficha", () => {
    const mockActor = {
      id: "actor-1",
      system: {
        wounds: { value: 2, ignored: 0 },
        fatigue: { value: 1, ignored: 0 },
        status: { isDistracted: true },
      },
      items: [
        { type: "edge", name: "Acrobata" },
      ],
    };

    const mockRoll = {
      total: 5,
      formula: "{1d6x, 1dw6x}kh - 3",
    };

    const result = RollModifiersEngine.buildInitialModifiers({
      actor: mockActor,
      roll: mockRoll,
      cleanTraitName: "Atletismo",
      isDamage: false,
      isArcane: false,
      hasWeaponOrPowerDamage: false,
    });

    const ids = result.modifiers.map((m) => m.id);
    assert.strictEqual(ids.includes("sheet-wounds-3"), true);
    assert.strictEqual(ids.includes("cond-distracted"), true);
    assert.strictEqual(ids.includes("edge-acrobata"), true);

    const activeDistracted = result.modifiers.find((m) => m.id === "cond-distracted");
    assert.strictEqual(activeDistracted.activeClass, "active-negative");
  });
});
