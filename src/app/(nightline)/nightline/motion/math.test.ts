import { describe, expect, it } from "vitest";
import { clamp, lerp, progressFromRange, stagger } from "./math";

describe("nightline motion maths", () => {
  it("clamps and interpolates values", () => {
    expect(clamp(12, 0, 10)).toBe(10);
    expect(lerp(0, 100, 0.25)).toBe(25);
    expect(progressFromRange(150, 100, 300)).toBe(0.25);
  });

  it("keeps staggered delays bounded", () => {
    expect(stagger(3, 80, 600)).toBe(240);
    expect(stagger(20, 80, 600)).toBe(600);
  });
});
