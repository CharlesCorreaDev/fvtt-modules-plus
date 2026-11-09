import { test, describe } from "node:test";
import assert from "node:assert";
import { DamageCalculator } from "./damage-calculator.mjs";

describe("DamageCalculator (SWADE Core & Companion Rules)", () => {
  test("dano menor que a Resistência não deve causar efeito", () => {
    const res = DamageCalculator.calculate({
      damage: 6,
      toughness: 7,
      armor: 2,
      ap: 0,
    });
    assert.strictEqual(res.isShakenInflicted, false);
    assert.strictEqual(res.woundsInflicted, 0);
  });

  test("dano igual ou maior que a Resistência sem elevação deve causar Abalado", () => {
    const res = DamageCalculator.calculate({
      damage: 7,
      toughness: 7,
      armor: 2,
      ap: 0,
      isAlreadyShaken: false,
    });
    assert.strictEqual(res.isShakenInflicted, true);
    assert.strictEqual(res.woundsInflicted, 0);
  });

  test("alvo já Abalado deve receber 1 Ferimento ao receber outro Abalado simples", () => {
    const res = DamageCalculator.calculate({
      damage: 7,
      toughness: 7,
      armor: 2,
      ap: 0,
      isAlreadyShaken: true,
    });
    assert.strictEqual(res.isShakenInflicted, true);
    assert.strictEqual(res.woundsInflicted, 1);
  });

  test("dano com 1 Elevação (Resistência + 4) deve causar Abalado e 1 Ferimento", () => {
    const res = DamageCalculator.calculate({
      damage: 11,
      toughness: 7,
      armor: 2,
      ap: 0,
    });
    assert.strictEqual(res.isShakenInflicted, true);
    assert.strictEqual(res.woundsInflicted, 1);
  });

  test("dano com 2 Elevações (Resistência + 8) deve causar 2 Ferimentos", () => {
    const res = DamageCalculator.calculate({
      damage: 15,
      toughness: 7,
      armor: 2,
      ap: 0,
    });
    assert.strictEqual(res.isShakenInflicted, true);
    assert.strictEqual(res.woundsInflicted, 2);
  });

  test("Penetração de Armadura (AP) deve reduzir a Armadura efetiva mas não o Vigor base", () => {
    const res = DamageCalculator.calculate({
      damage: 6,
      toughness: 8,
      armor: 2,
      ap: 4,
    });
    assert.strictEqual(res.effectiveArmor, 0);
    assert.strictEqual(res.effectiveToughness, 6);
    assert.strictEqual(res.isShakenInflicted, true);
  });

  test("Arma não Pesada deve ser completamente ignorada contra Armadura Pesada", () => {
    const res = DamageCalculator.calculate({
      damage: 30,
      toughness: 10,
      armor: 4,
      hasHeavyArmor: true,
      isHeavyWeapon: false,
    });
    assert.strictEqual(res.isIgnoredHeavyArmor, true);
    assert.strictEqual(res.isShakenInflicted, false);
    assert.strictEqual(res.woundsInflicted, 0);
  });

  test("Arma Pesada deve causar dano normal contra Armadura Pesada", () => {
    const res = DamageCalculator.calculate({
      damage: 14,
      toughness: 10,
      armor: 4,
      hasHeavyArmor: true,
      isHeavyWeapon: true,
    });
    assert.strictEqual(res.isIgnoredHeavyArmor, false);
    assert.strictEqual(res.isShakenInflicted, true);
    assert.strictEqual(res.woundsInflicted, 1);
  });

  test("Limite de Ferimentos (Wound Cap) deve limitar o dano a no máximo 4 Ferimentos", () => {
    const res = DamageCalculator.calculate({
      damage: 45,
      toughness: 8,
      armor: 0,
      woundCap: true,
    });
    assert.strictEqual(res.woundsInflicted, 4);
  });

  test("Traição (Fantasy Companion) deve bloquear Absorção quando atacado com Finalização (The Drop)", () => {
    const res = DamageCalculator.calculate({
      damage: 18,
      toughness: 8,
      ruleBetrayal: true,
      isTheDrop: true,
    });
    assert.strictEqual(res.canSoak, false);
  });

  test("Metal Pesado (Sci-Fi Companion) deve calcular Classes I-VII e ajustar Ferimentos", () => {
    const wClass = DamageCalculator.calculateWeaponHeavyMetalClass({
      averageDamage: 28,
      ap: 6,
      isHeavyWeapon: true,
    });
    const vClass = DamageCalculator.calculateVehicleHeavyMetalClass(22);
    assert.strictEqual(wClass.classRoman, "III"); // 34 -> III
    assert.strictEqual(vClass.classRoman, "II"); // 22 -> II

    const res = DamageCalculator.calculate({
      damage: 26,
      toughness: 22,
      weaponClass: wClass.classRoman,
      targetClass: vClass.classRoman,
    });
    // 26 vs 22 = 1 elevação (1 Ferimento) + (III - II = +1) = 2 Ferimentos
    assert.strictEqual(res.heavyMetalModifier, 1);
    assert.strictEqual(res.woundsInflicted, 2);
  });

  test("Projeção / Knockback (Super Powers Companion) deve calcular dados de projeção por Escala", () => {
    // Alvo Grande (Size +4 -> Limiar 30), recebendo 42 de dano -> 2d6 quadros
    const res = DamageCalculator.calculate({
      damage: 42,
      toughness: 14,
      enableKnockback: true,
      targetSize: 4,
    });
    assert.strictEqual(res.knockback.triggered, true);
    assert.strictEqual(res.knockback.threshold, 30);
    assert.strictEqual(res.knockback.diceCount, 2);
    assert.strictEqual(res.knockback.formula, "2d6");
  });

  test("Qualidade PEM (Sci-Fi Companion) deve desativar eletrônicos e reduzir 1 Ferimento", () => {
    const res = DamageCalculator.calculate({
      damage: 16,
      toughness: 8,
      isEmp: true,
    });
    // 16 vs 8 = 2 elevações (2 Ferimentos) - 1 (PEM) = 1 Ferimento
    assert.strictEqual(res.electronicsDisabled, true);
    assert.strictEqual(res.woundsInflicted, 1);
  });

  test("Marcas de Vício (Horror Companion) devem somar +2 de dano por marca", () => {
    const res = DamageCalculator.calculate({
      damage: 7,
      toughness: 11,
      viceMarks: 2, // +4 de dano -> total 11 -> causa Abalado!
    });
    assert.strictEqual(res.damageDealt, 11);
    assert.strictEqual(res.isShakenInflicted, true);
  });
});
