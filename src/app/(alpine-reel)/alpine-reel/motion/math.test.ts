import { describe, expect, it } from "vitest";
import { clamp, lerp, stagger } from "./math";

describe("alpine reel motion math", () => {
  it("clamps values", () => {
    expect(clamp(-2, 0, 1)).toBe(0);
    expect(clamp(2, 0, 1)).toBe(1);
    expect(clamp(0.4, 0, 1)).toBe(0.4);
  });

  it("lerps by a stable amount", () => {
    expect(lerp(0, 100, 0.22)).toBeCloseTo(22);
  });

  it("creates a readable reveal stagger", () => {
    expect(stagger(0)).toBeCloseTo(0.28);
    expect(stagger(3)).toBeCloseTo(0.49);
  });
});
