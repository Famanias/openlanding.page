import { describe, expect, it } from "vitest";
import { clamp, damp, invLerp, lerp, smoothstep } from "./math";

describe("motion math", () => {
  it("clamps to the unit range by default", () => {
    expect(clamp(1.4)).toBe(1);
    expect(clamp(-2)).toBe(0);
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("interpolates and inverts", () => {
    expect(lerp(10, 20, 0.25)).toBe(12.5);
    expect(invLerp(10, 20, 15)).toBe(0.5);
    expect(invLerp(10, 20, 25)).toBe(1);
    expect(invLerp(10, 20, 0)).toBe(0);
  });

  it("smoothsteps between edges", () => {
    expect(smoothstep(0, 1, -1)).toBe(0);
    expect(smoothstep(0, 1, 0.5)).toBe(0.5);
    expect(smoothstep(0, 1, 2)).toBe(1);
  });

  it("damps toward a target independent of frame rate", () => {
    expect(damp(0, 1, 4, 10)).toBeCloseTo(1, 5);
    expect(damp(0, 1, 4, 1 / 60)).toBeGreaterThan(0);
    const oneStep = damp(0, 1, 4, 0.2);
    let twoSteps = damp(0, 1, 4, 0.1);
    twoSteps = damp(twoSteps, 1, 4, 0.1);
    expect(twoSteps).toBeCloseTo(oneStep, 10);
  });
});
