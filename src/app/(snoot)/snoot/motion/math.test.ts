import { describe, expect, it } from "vitest";
import { clamp, damp, easeOutQuint, jitter, lerp, progress, round, staggerDelay, wag } from "./math";

describe("snoot motion maths", () => {
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

  it("maps a value to clamped progress through a range, treating a zero-length range as a step", () => {
    expect(progress(50, 0, 200)).toBe(0.25);
    expect(progress(-10, 0, 200)).toBe(0);
    expect(progress(500, 0, 200)).toBe(1);
    expect(progress(4, 5, 5)).toBe(0);
    expect(progress(5, 5, 5)).toBe(1);
  });

  it("staggers children and caps the total wait", () => {
    expect(staggerDelay(0)).toBe(0);
    expect(staggerDelay(3)).toBe(210);
    expect(staggerDelay(40)).toBe(600);
    expect(staggerDelay(-1)).toBe(0);
  });

  it("jitters delays deterministically within a small organic range", () => {
    const values = Array.from({ length: 20 }, (_, i) => jitter(i));
    for (const v of values) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(60);
    }
    expect(jitter(3)).toBe(jitter(3));
    expect(new Set(values).size).toBeGreaterThan(10);
    expect(jitter(2, 120)).toBeLessThan(120);
  });

  it("wags: a damped swing that starts at rest, overshoots both ways and settles", () => {
    expect(wag(0)).toBe(0);
    const samples = Array.from({ length: 60 }, (_, i) => wag(i * 0.02));
    expect(Math.max(...samples)).toBeGreaterThan(8);
    expect(Math.min(...samples)).toBeLessThan(-4);
    expect(Math.abs(wag(3))).toBeLessThan(0.5);
    expect(Math.abs(wag(0.1, 20))).toBeLessThanOrEqual(20);
  });

  it("damps toward the target independent of frame rate", () => {
    const oneStep = damp(0, 100, 8, 1 / 30);
    const twoSteps = damp(damp(0, 100, 8, 1 / 60), 100, 8, 1 / 60);
    expect(oneStep).toBeCloseTo(twoSteps, 6);
    expect(oneStep).toBeGreaterThan(0);
    expect(oneStep).toBeLessThan(100);
  });

  it("eases out with fixed end points", () => {
    expect(easeOutQuint(0)).toBe(0);
    expect(easeOutQuint(1)).toBe(1);
    expect(easeOutQuint(2)).toBe(1);
    expect(easeOutQuint(0.5)).toBeGreaterThan(0.9);
  });

  it("rounds for compact custom properties", () => {
    expect(round(0.123456)).toBe(0.123);
    expect(round(12.3456, 1)).toBe(12.3);
  });
});
