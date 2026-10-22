import { describe, it, expect } from "vitest";
import { clamp, lerp, calculateProgress, staggerDelay } from "./math";

describe("loophouse motion maths", () => {
  it("clamps values between min and max bounds", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("lerps linearly between two points", () => {
    expect(lerp(0, 100, 0)).toBe(0);
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(0, 100, 1)).toBe(100);
    expect(lerp(0, 100, 1.5)).toBe(100); // clamped
    expect(lerp(10, 20, 0.25)).toBe(12.5);
  });

  it("calculates clamped scroll progress safely", () => {
    expect(calculateProgress(50, 0, 100)).toBe(0.5);
    expect(calculateProgress(-10, 0, 100)).toBe(0);
    expect(calculateProgress(150, 0, 100)).toBe(1);
    expect(calculateProgress(50, 100, 100)).toBe(0); // edge case: division by zero
  });

  it("calculates stagger delays capped at maximum", () => {
    expect(staggerDelay(0, 100, 50, 500)).toBe(100);
    expect(staggerDelay(2, 100, 50, 500)).toBe(200);
    expect(staggerDelay(15, 100, 50, 500)).toBe(500); // capped at maxMs
  });
});
