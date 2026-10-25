import { describe, expect, it } from "vitest";
import { clamp, lerp, magneticOffset, progress, staggerDelay } from "./math";

describe("tally motion math", () => {
  it("clamps values within min and max bounds", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(4, 0, 10)).toBe(4);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("interpolates linearly between start and end with clamped t", () => {
    expect(lerp(10, 30, 0)).toBe(10);
    expect(lerp(10, 30, 0.5)).toBe(20);
    expect(lerp(10, 30, 1)).toBe(30);
    expect(lerp(10, 30, 1.5)).toBe(30);
  });

  it("computes normalized progress between start and end", () => {
    expect(progress(50, 100, 300)).toBe(0);
    expect(progress(200, 100, 300)).toBe(0.5);
    expect(progress(350, 100, 300)).toBe(1);
    expect(progress(100, 100, 100)).toBe(1);
  });

  it("caps staggered delay at maxMs", () => {
    expect(staggerDelay(0, 70, 420)).toBe(0);
    expect(staggerDelay(3, 70, 420)).toBe(210);
    expect(staggerDelay(10, 70, 420)).toBe(420);
  });

  it("computes bounded magnetic pull within radius", () => {
    expect(magneticOffset(0, 10, 100)).toBe(0);
    expect(magneticOffset(50, 10, 100)).toBeCloseTo(5, 3);
    expect(magneticOffset(-150, 10, 100)).toBe(-10);
  });
});
