import { describe, expect, test } from "vitest";
import { calculateScrollProgress } from "./progress";

describe("calculateScrollProgress", () => {
  const windowHeight = 800;
  const sectionHeight = 2400; // travel = 1600

  test("returns 0 before the section enters or right at the top", () => {
    expect(calculateScrollProgress(100, sectionHeight, windowHeight)).toBe(0);
    expect(calculateScrollProgress(0, sectionHeight, windowHeight)).toBe(0);
  });

  test("calculates normalized progress mid-scroll", () => {
    // -rectTop = 800, travel = 1600 -> progress = 0.5
    expect(calculateScrollProgress(-800, sectionHeight, windowHeight)).toBe(0.5);
    // -rectTop = 400, travel = 1600 -> progress = 0.25
    expect(calculateScrollProgress(-400, sectionHeight, windowHeight)).toBe(0.25);
  });

  test("returns 1 when scrolled to or past the end of the pinned section", () => {
    expect(calculateScrollProgress(-1600, sectionHeight, windowHeight)).toBe(1);
    expect(calculateScrollProgress(-2000, sectionHeight, windowHeight)).toBe(1);
  });

  test("returns 0 if section is shorter than or equal to the viewport", () => {
    expect(calculateScrollProgress(-100, 800, windowHeight)).toBe(0);
    expect(calculateScrollProgress(-100, 600, windowHeight)).toBe(0);
  });
});
