import { describe, expect, it } from "vitest";
import { nextReelOffset } from "./reelMath";

describe("postcard reel navigation", () => {
  it("moves by one card and stops at either end", () => {
    expect(nextReelOffset(0, 300, 700, 1)).toBe(-300);
    expect(nextReelOffset(-300, 300, 700, 1)).toBe(-600);
    expect(nextReelOffset(-600, 300, 700, 1)).toBe(-700);
    expect(nextReelOffset(-700, 300, 700, -1)).toBe(-400);
    expect(nextReelOffset(-100, 300, 700, -1)).toBe(0);
  });

  it("stays still when the pictures fit or the measurements are invalid", () => {
    expect(nextReelOffset(0, 300, 0, 1)).toBe(0);
    expect(nextReelOffset(Number.NaN, 300, 0, 1)).toBe(0);
    expect(nextReelOffset(-100, Number.NaN, 600, 1)).toBe(-100);
    expect(nextReelOffset(-900, 300, 600, -1)).toBe(-300);
  });
});
