import { describe, expect, it } from "vitest";
import { calculateParallaxOffset } from "./parallaxMath";

describe("parallaxMath logic", () => {
  it("returns 0 when scroll is at top (scrollY = 0)", () => {
    expect(calculateParallaxOffset(0)).toBe(0);
  });

  it("returns 0 for negative overscroll", () => {
    expect(calculateParallaxOffset(-50)).toBe(0);
  });

  it("calculates smooth proportional offset based on scrollY", () => {
    // 200 * 0.22 = 44
    expect(calculateParallaxOffset(200, 110, 0.22)).toBe(44);
  });

  it("clamps precisely at maxOffset (default 110)", () => {
    // 1000 * 0.22 = 220 -> clamped to 110
    expect(calculateParallaxOffset(1000, 110, 0.22)).toBe(110);
  });
});
