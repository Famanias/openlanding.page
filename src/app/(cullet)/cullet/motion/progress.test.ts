import { describe, expect, it } from "vitest";
import { activeSection, enterProgress, pinProgress, scrollForStep, stepAt } from "./progress";

describe("scene progress", () => {
  it("pins between the top meeting the top and the bottom meeting the bottom", () => {
    expect(pinProgress(1000, 1000, 3000, 1000)).toBe(0);
    expect(pinProgress(2000, 1000, 3000, 1000)).toBeCloseTo(0.5);
    expect(pinProgress(3000, 1000, 3000, 1000)).toBe(1);
    expect(pinProgress(500, 1000, 3000, 1000)).toBe(0);
  });

  it("treats a scene no taller than the screen as a switch", () => {
    expect(pinProgress(999, 1000, 800, 1000)).toBe(0);
    expect(pinProgress(1000, 1000, 800, 1000)).toBe(1);
  });

  it("measures entry from the bottom edge to the top edge", () => {
    expect(enterProgress(0, 1000, 1000)).toBe(0);
    expect(enterProgress(500, 1000, 1000)).toBeCloseTo(0.5);
    expect(enterProgress(5000, 1000, 1000)).toBe(1);
  });

  it("gives each step an equal slice and keeps the end on the last", () => {
    expect(stepAt(0, 5)).toBe(0);
    expect(stepAt(0.19, 5)).toBe(0);
    expect(stepAt(0.2, 5)).toBe(1);
    expect(stepAt(0.99, 5)).toBe(4);
    expect(stepAt(1, 5)).toBe(4);
    expect(stepAt(0.5, 1)).toBe(0);
  });

  it("scrolls to the middle of a step, and the step there is that step", () => {
    const top = 2000, height = 6000, vh = 1000;
    for (let i = 0; i < 5; i++) {
      const y = scrollForStep(i, 5, top, height, vh);
      expect(stepAt(pinProgress(y, top, height, vh), 5)).toBe(i);
    }
    expect(scrollForStep(9, 5, top, height, vh)).toBe(scrollForStep(4, 5, top, height, vh));
  });

  it("finds the section under the probe line", () => {
    const sections = [{ id: "a", top: 0 }, { id: "b", top: 1000 }, { id: "c", top: 2500 }];
    expect(activeSection(sections, 0, 1000)).toBe("a");
    expect(activeSection(sections, 700, 1000)).toBe("b");
    expect(activeSection(sections, 2200, 1000)).toBe("c");
    expect(activeSection([{ id: "x", top: 900 }], 0, 1000)).toBeNull();
  });
});
