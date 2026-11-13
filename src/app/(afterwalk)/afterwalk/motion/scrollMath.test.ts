import { describe, expect, it } from "vitest";
import { heroProgress } from "./scrollMath";

describe("hero handoff progress", () => {
  it("tracks the stable document position and clamps before and after the hero", () => {
    expect(heroProgress(0, 80, 800)).toBe(0);
    expect(heroProgress(480, 80, 800)).toBe(0.5);
    expect(heroProgress(880, 80, 800)).toBe(1);
    expect(heroProgress(1600, 80, 800)).toBe(1);
  });

  it("does not produce invalid values for missing measurements", () => {
    expect(heroProgress(Number.NaN, 80, 800)).toBe(0);
    expect(heroProgress(200, 80, 0)).toBe(0);
    expect(heroProgress(200, Number.NaN, 800)).toBe(0);
  });
});
