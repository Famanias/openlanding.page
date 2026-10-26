import { describe, expect, it } from "vitest";
import { clamp, easeInCubic, easeOutBack, easeOutCubic, lerp, range, smoothing, stagger } from "./math";

describe("motion math", () => {
  it("clamps into a range", () => {
    expect(clamp(-1)).toBe(0);
    expect(clamp(2)).toBe(1);
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("interpolates", () => {
    expect(lerp(0, 10, 0.25)).toBe(2.5);
    expect(lerp(4, 4, 0.9)).toBe(4);
  });

  it("maps a slice of progress to 0..1", () => {
    expect(range(0.5, 0.4, 0.6)).toBeCloseTo(0.5);
    expect(range(0.1, 0.4, 0.6)).toBe(0);
    expect(range(0.9, 0.4, 0.6)).toBe(1);
    expect(range(0.5, 0.5, 0.5)).toBe(1);
  });

  it("staggers and caps the total delay", () => {
    expect(stagger(0, 70)).toBe(0);
    expect(stagger(3, 70)).toBe(210);
    expect(stagger(20, 70, 600)).toBe(600);
  });

  it("eases from 0 to 1, and the back ease overshoots before landing", () => {
    for (const ease of [easeInCubic, easeOutCubic, easeOutBack]) {
      expect(ease(0)).toBeCloseTo(0);
      expect(ease(1)).toBeCloseTo(1);
    }
    expect(Math.max(...[0.6, 0.7, 0.8].map((t) => easeOutBack(t)))).toBeGreaterThan(1);
    expect(easeInCubic(0.5)).toBeLessThan(easeOutCubic(0.5));
  });

  it("smooths the same over one long frame as over many short ones", () => {
    const one = smoothing(0.1, 0.3);
    let left = 1;
    for (let i = 0; i < 10; i++) left *= 1 - smoothing(0.01, 0.3);
    expect(1 - left).toBeCloseTo(one, 6);
  });
});
