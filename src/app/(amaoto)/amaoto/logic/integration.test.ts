import { it, expect } from "vitest";
import { worldStageRect } from "../scene/staging";
import { progressForAssembly } from "../scene/makingSequence";
import { getChapterStateAtProgress } from "./chapters";
import {
  applyKeyboardStep,
  createInspect,
  toggleKeyboardEngage,
} from "./inspect";
it("keeps the inverse Making scrub aligned with the single story progress", () => {
  for (let i = 0; i <= 100; i++) {
    const amount = i / 100,
      p = progressForAssembly(amount);
    expect(getChapterStateAtProgress(p).benchAssembly).toBeCloseTo(amount, 5);
    expect(getChapterStateAtProgress(p).activeChapterIndex).toBe(4);
  }
});
it("keeps virtual object slots continuous and contained through every seam", () => {
  for (const [w, h] of [
    [1440, 900],
    [390, 844],
    [820, 1180],
    [375, 667],
    [844, 390],
  ]) {
    let before = worldStageRect(0, w, h);
    for (let i = 0; i <= 2000; i++) {
      const slot = worldStageRect(i / 2000, w, h);
      expect(slot.left).toBeGreaterThanOrEqual(-0.01);
      expect(slot.top).toBeGreaterThanOrEqual(0);
      expect(slot.left + slot.width).toBeLessThanOrEqual(w + 0.01);
      expect(slot.top + slot.height).toBeLessThanOrEqual(h + 0.01);
      expect(Math.abs(slot.left - before.left)).toBeLessThan(w * 0.04);
      before = slot;
    }
  }
});
it("reserves the inspector index above navigation and gives landscape its own stage", () => {
  for (const [w, h] of [
    [1024, 768],
    [1440, 900],
  ]) {
    const rect = worldStageRect(0.18, w, h);
    expect(rect.top + rect.height).toBeLessThanOrEqual(h - 250);
  }
  const landscape = worldStageRect(0, 844, 390);
  expect(landscape.left).toBeGreaterThan(422);
  expect(landscape.height).toBeGreaterThan(150);
});
it("makes keyboard trackball steps discrete without pointer inertia", () => {
  const s = applyKeyboardStep(toggleKeyboardEngage(createInspect(), "1"), 1, 0);
  expect(s.velocity).toEqual([0, 0, 0]);
  expect(s.rotation[1]).toBeGreaterThan(0);
});
