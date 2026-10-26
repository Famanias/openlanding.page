import { describe, expect, it } from "vitest";
import { canopyRadius, explodeOffset, runnerPosition } from "./runtime";

describe("wagasa runtime maths", () => {
  it("keeps open state monotonic and bounded", () => {
    expect(runnerPosition(0)).toBeCloseTo(0.12);
    expect(runnerPosition(1)).toBeCloseTo(0.74);
    expect(canopyRadius(0)).toBeLessThan(canopyRadius(0.5));
    expect(canopyRadius(0.5)).toBeLessThan(canopyRadius(1));
  });
  it("makes explode offsets pure and repeatable", () => {
    expect(explodeOffset(0.5, "canopy")).toBe(explodeOffset(0.5, "canopy"));
    expect(explodeOffset(0, "runner")).toBe(0);
    expect(explodeOffset(1, "handle")).toBeLessThan(0);
  });
});
