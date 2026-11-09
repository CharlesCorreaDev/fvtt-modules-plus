import { test, describe } from "node:test";
import assert from "node:assert";
import { RaiseCalculator } from "./raise-calculator.mjs";

describe("RaiseCalculator (SWADE Rules)", () => {
  test("deve identificar falha quando total < TN", () => {
    const res = RaiseCalculator.calculate(3, 4);
    assert.strictEqual(res.isSuccess, false);
    assert.strictEqual(res.raises, 0);
    assert.strictEqual(res.margin, -1);
  });

  test("deve identificar sucesso simples quando total == TN", () => {
    const res = RaiseCalculator.calculate(4, 4);
    assert.strictEqual(res.isSuccess, true);
    assert.strictEqual(res.raises, 0);
    assert.strictEqual(res.margin, 0);
  });

  test("deve identificar sucesso simples quando margem < 4", () => {
    const res = RaiseCalculator.calculate(7, 4);
    assert.strictEqual(res.isSuccess, true);
    assert.strictEqual(res.raises, 0);
    assert.strictEqual(res.margin, 3);
  });

  test("deve identificar 1 Elevação a partir de TN + 4", () => {
    const res = RaiseCalculator.calculate(8, 4);
    assert.strictEqual(res.isSuccess, true);
    assert.strictEqual(res.raises, 1);
    assert.strictEqual(res.margin, 4);
  });

  test("deve identificar 2 Elevações a partir de TN + 8", () => {
    const res = RaiseCalculator.calculate(12, 4);
    assert.strictEqual(res.isSuccess, true);
    assert.strictEqual(res.raises, 2);
    assert.strictEqual(res.margin, 8);
  });

  test("deve tratar Falha Crítica explicitada", () => {
    const res = RaiseCalculator.calculate(2, 4, { isCriticalFailure: true });
    assert.strictEqual(res.isCriticalFailure, true);
    assert.strictEqual(res.isSuccess, false);
    assert.strictEqual(res.raises, 0);
  });
});
