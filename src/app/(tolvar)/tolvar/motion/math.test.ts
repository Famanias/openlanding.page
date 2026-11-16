import { describe, expect, it } from "vitest";
import { clamp, easeOutQuart, lerp, magnetOffset, progress, round, staggerDelay } from "./math";

describe("tolvar motion maths", () => {
  it("clamps to 0..1 by default and to a custom range", () => {
    expect(clamp(-2)).toBe(0);
    expect(clamp(0.4)).toBe(0.4);
    expect(clamp(9)).toBe(1);
    expect(clamp(15, 10, 12)).toBe(12);
  });

  it("interpolates linearly", () => {
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 0.5)).toBe(15);
    expect(lerp(10, 20, 1)).toBe(20);
  });

  it("maps a value to clamped progress through a range", () => {
    expect(progress(50, 0, 200)).toBe(0.25);
    expect(progress(-10, 0, 200)).toBe(0);
    expect(progress(900, 0, 200)).toBe(1);
  });

  it("treats a zero-length range as done once reached", () => {
    expect(progress(5, 5, 5)).toBe(1);
    expect(progress(4, 5, 5)).toBe(0);
  });

  it("eases out without overshooting", () => {
    expect(easeOutQuart(0)).toBe(0);
    expect(easeOutQuart(1)).toBe(1);
    expect(easeOutQuart(0.5)).toBeGreaterThan(0.9);
    expect(easeOutQuart(2)).toBe(1);
  });

  it("staggers by index and caps the total wait", () => {
    expect(staggerDelay(0)).toBe(0);
    expect(staggerDelay(3)).toBe(180);
    expect(staggerDelay(40)).toBe(540);
    expect(staggerDelay(-2)).toBe(0);
  });

  it("rounds for short custom property values", () => {
    expect(round(0.123456)).toBe(0.123);
    expect(round(2.5, 0)).toBe(3);
  });

  it("pulls a magnetic button toward the pointer, never past its cap", () => {
    expect(magnetOffset(110, 100)).toBe(3);
    expect(magnetOffset(90, 100)).toBe(-3);
    expect(magnetOffset(400, 100)).toBe(12);
    expect(magnetOffset(-400, 100)).toBe(-12);
  });
});
