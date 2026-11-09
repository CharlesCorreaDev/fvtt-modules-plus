import { test, describe } from "node:test";
import assert from "node:assert";
import { CompanionRulesEngine } from "./companion-rules-engine.mjs";
import {
  isSuperPowerType,
  getActorSuperPowers,
  calculateActorSuperPowerSummary,
  extractSuperPowerMetadata,
} from "./super-power-item.mjs";

describe("CompanionRulesEngine & SuperPowerItem (Fantasy, Sci-Fi, Horror, Supers & SWPF)", () => {
  test("Super Força (SPC) deve calcular capacidade de carga em Libras e Quilogramas (Métrico)", () => {
    const imperial = CompanionRulesEngine.calculateSuperStrengthLoad({
      sides: 12,
      modifier: 6,
      isMetric: false,
    });
    const metric = CompanionRulesEngine.calculateSuperStrengthLoad({
      sides: 12,
      modifier: 6,
      isMetric: true,
    });

    assert.strictEqual(imperial.loadLimit, 4000);
    assert.strictEqual(imperial.maxWeight, 16000);
    assert.strictEqual(metric.loadLimit, 2000);
    assert.strictEqual(metric.maxWeight, 8000);
    assert.strictEqual(metric.label, "d12+6");
  });

  test("Tabela de Medo (Horror Companion) deve mapear todas as faixas de 1 a 22+", () => {
    const adrenaline = CompanionRulesEngine.resolveFearTableEntry(2);
    assert.strictEqual(adrenaline.effectKey, "adrenaline");
    assert.strictEqual(adrenaline.grantJoker, true);

    const shaken = CompanionRulesEngine.resolveFearTableEntry(11);
    assert.strictEqual(shaken.statusToApply, "shaken");

    const minorPsy = CompanionRulesEngine.resolveFearTableEntry(19);
    assert.strictEqual(minorPsy.psychosisSeverity, "minor");

    const majorPsy = CompanionRulesEngine.resolveFearTableEntry(20);
    assert.strictEqual(majorPsy.psychosisSeverity, "major");

    const snap = CompanionRulesEngine.resolveFearTableEntry(23);
    assert.strictEqual(snap.triggerTotalSnap, true);
  });

  test("Interferência de Armadura (Pathfinder SWPF) deve detectar Mago/Feiticeiro com armadura equipada", () => {
    const wizardWithArmor = {
      items: [
        { type: "edge", name: "Mago (Wizard)" },
        { type: "armor", name: "Cota de Malha", system: { equipped: true, equipStatus: 3 } },
      ],
    };
    const res = CompanionRulesEngine.checkSwpfArmorInterference(wizardWithArmor);
    assert.strictEqual(res.hasInterference, true);
    assert.strictEqual(res.penalty, -4);

    const fighterWithArmor = {
      items: [
        { type: "edge", name: "Guerreiro" },
        { type: "armor", name: "Cota de Malha", system: { equipped: true, equipStatus: 3 } },
      ],
    };
    const resFighter = CompanionRulesEngine.checkSwpfArmorInterference(fighterWithArmor);
    assert.strictEqual(resFighter.hasInterference, false);
    assert.strictEqual(resFighter.penalty, 0);
  });

  test("SuperPowerItem deve reconhecer tanto swade-supers-companion.superPower quanto swade-autogame-plus.superPower", () => {
    assert.strictEqual(isSuperPowerType("swade-supers-companion.superPower"), true);
    assert.strictEqual(isSuperPowerType("swade-autogame-plus.superPower"), true);
    assert.strictEqual(isSuperPowerType("power"), false);
    assert.strictEqual(isSuperPowerType("weapon"), false);
  });

  test("SuperPowerItem deve extrair metadados, modificadores e calcular Custo Total de PSP e Nível de Poder (I a V)", () => {
    const mockActor = {
      items: [
        {
          id: "sp1",
          name: "Ataque à Distância",
          type: "swade-supers-companion.superPower",
          system: {
            level: 3,
            build: { cost: 12 },
            range: "12/24/48",
            duration: "Instantâneo",
            damage: "4d6",
            ap: 4,
            trapping: "Raios Laser Oculares",
          },
          effects: [
            { name: "Penetração de Armadura +4", type: "modifier", disabled: false, system: { cost: 2 } },
            { name: "Arma Pesada", type: "modifier", disabled: false, system: { cost: 1 } },
          ],
        },
        {
          id: "sp2",
          name: "Supervelocidade",
          type: "swade-autogame-plus.superPower",
          system: {
            level: 2,
            build: { cost: 18 },
            range: "Pessoal",
            duration: "Permanente",
            trapping: "Aura de Relâmpagos",
          },
          effects: [],
        },
      ],
    };

    const powers = getActorSuperPowers(mockActor);
    assert.strictEqual(powers.length, 2);

    const summary = calculateActorSuperPowerSummary(mockActor);
    assert.strictEqual(summary.costTotal, 30);
    assert.strictEqual(summary.calculatedLevel, "II");

    const meta = extractSuperPowerMetadata(powers[0]);
    assert.strictEqual(meta.level, 3);
    assert.strictEqual(meta.buildCost, 12);
    assert.strictEqual(meta.damage, "4d6");
    assert.strictEqual(meta.ap, 4);
    assert.strictEqual(meta.trapping, "Raios Laser Oculares");
    assert.strictEqual(meta.modifiers.length, 2);
    assert.strictEqual(meta.modifiers[0].name, "Penetração de Armadura +4");
  });
});
