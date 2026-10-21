import { describe, it, expect } from "vitest";
import { calculateScrollProgress } from "./progress";

describe("calculateScrollProgress", () => {
  it("is 0 before the section is reached", () => {
    expect(calculateScrollProgress(200, 3000, 900)).toBe(0);
  });

  it("is 0 when the section top hits the viewport top", () => {
    expect(calculateScrollProgress(0, 3000, 900)).toBe(0);
  });

  it("is 1 when the section bottom hits the viewport bottom", () => {
    expect(calculateScrollProgress(900 - 3000, 3000, 900)).toBe(1);
  });

  it("is linear in between", () => {
    const mid = calculateScrollProgress((900 - 3000) / 2, 3000, 900);
    expect(mid).toBeCloseTo(0.5, 5);
  });

  it("clamps past the end", () => {
    expect(calculateScrollProgress(-5000, 3000, 900)).toBe(1);
  });

  it("returns 0 when the section cannot pin", () => {
    expect(calculateScrollProgress(-100, 500, 900)).toBe(0);
  });
});
