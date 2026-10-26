import { describe, expect, it } from "vitest";
import { clamp01, lerp, sectionProgress, stagger } from "./math";

describe("lucentra motion math", () => {
  it("clamps values and interpolates", () => {
    expect(clamp01(-1)).toBe(0);
    expect(clamp01(1.2)).toBe(1);
    expect(lerp(10, 20, 0.25)).toBe(12.5);
  });

  it("maps a real section offset to progress", () => {
    expect(sectionProgress(100, 100, 1000, 500)).toBe(0);
    expect(sectionProgress(350, 100, 1000, 500)).toBeCloseTo(0.5);
    expect(sectionProgress(2000, 100, 1000, 500)).toBe(1);
  });

  it("returns a bounded stagger delay", () => {
    expect(stagger(0, 70)).toBe(0);
    expect(stagger(4, 70)).toBe(280);
    expect(stagger(20, 70, 600)).toBe(600);
  });
});
