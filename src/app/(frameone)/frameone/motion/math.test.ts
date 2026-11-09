import { describe, expect, it } from "vitest";
import { clamp, pinProgress } from "./math";

describe("scroll motion boundaries", () => {
  it("clamps progress before and after the active scene", () => {
    expect(clamp(-2)).toBe(0);
    expect(clamp(2)).toBe(1);
    expect(pinProgress(500, 100, 1000, 400)).toBeCloseTo(2 / 3);
    expect(pinProgress(0, 100, 1000, 400)).toBe(0);
    expect(pinProgress(1000, 100, 1000, 400)).toBe(1);
  });

  it("does not divide by zero for a scene shorter than the viewport", () => {
    expect(pinProgress(100, 0, 400, 400)).toBe(0);
  });
});
