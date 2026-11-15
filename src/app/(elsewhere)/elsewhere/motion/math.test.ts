import { describe, expect, it } from "vitest";
import { clamp, damp, easeInOutCubic, easeOutQuint, lerp, progress, round, staggerDelay } from "./math";

describe("elsewhere motion maths", () => {
  it("clamps to 0..1 by default and to a custom range", () => {
    expect(clamp(-2)).toBe(0);
    expect(clamp(0.4)).toBe(0.4);
    expect(clamp(3)).toBe(1);
    expect(clamp(12, 0, 10)).toBe(10);
  });

  it("interpolates linearly", () => {
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 0.5)).toBe(15);
    expect(lerp(10, 20, 1)).toBe(20);
  });

  it("maps a value to clamped progress through a range", () => {
    expect(progress(50, 0, 200)).toBe(0.25);
    expect(progress(-10, 0, 200)).toBe(0);
    expect(progress(500, 0, 200)).toBe(1);
  });

  it("treats a zero-length range as a step", () => {
    expect(progress(4, 5, 5)).toBe(0);
    expect(progress(5, 5, 5)).toBe(1);
  });

  it("eases with fixed end points", () => {
    for (const ease of [easeOutQuint, easeInOutCubic]) {
      expect(ease(0)).toBe(0);
      expect(ease(1)).toBe(1);
      expect(ease(2)).toBe(1);
    }
    expect(easeOutQuint(0.5)).toBeGreaterThan(0.9);
    expect(easeInOutCubic(0.5)).toBe(0.5);
    expect(easeInOutCubic(0.25)).toBeLessThan(0.25);
  });

  it("staggers children and caps the total wait", () => {
    expect(staggerDelay(0)).toBe(0);
    expect(staggerDelay(3)).toBe(240);
    expect(staggerDelay(40)).toBe(640);
    expect(staggerDelay(-1)).toBe(0);
  });

  it("damps toward the target without overshooting, independent of frame rate", () => {
    const oneStep = damp(0, 100, 8, 1 / 30);
    const twoSteps = damp(damp(0, 100, 8, 1 / 60), 100, 8, 1 / 60);
    expect(oneStep).toBeCloseTo(twoSteps, 6);
    expect(oneStep).toBeGreaterThan(0);
    expect(oneStep).toBeLessThan(100);
  });

  it("rounds for compact custom properties", () => {
    expect(round(0.123456)).toBe(0.123);
    expect(round(12.3456, 1)).toBe(12.3);
  });
});
