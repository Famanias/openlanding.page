import { describe, expect, it } from "vitest";
import { clamp, damp, lerp, progress, smoothstep, staggerDelay, tiltAngles, wrap } from "./math";

describe("kinetic motion math", () => {
  it("clamps into range", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(4, 0, 10)).toBe(4);
  });

  it("lerps between values", () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 1)).toBe(20);
  });

  it("calculates smoothstep interpolation", () => {
    expect(smoothstep(0, 1, 0)).toBe(0);
    expect(smoothstep(0, 1, 1)).toBe(1);
    expect(smoothstep(0, 1, 0.5)).toBe(0.5);
  });

  it("calculates exponential damp factor", () => {
    expect(damp(10, 0)).toBe(0);
    expect(damp(10, 0.1)).toBeCloseTo(0.632, 2);
  });

  it("maps value to progress", () => {
    expect(progress(50, 0, 100)).toBe(0.5);
    expect(progress(150, 0, 100)).toBe(1);
    expect(progress(-10, 0, 100)).toBe(0);
  });

  it("caps stagger delay", () => {
    expect(staggerDelay(0, 60, 400)).toBe(0);
    expect(staggerDelay(3, 60, 400)).toBe(180);
    expect(staggerDelay(10, 60, 400)).toBe(400);
  });

  it("computes tilt angles", () => {
    expect(tiltAngles(0.5, 0.5, 8)).toEqual({ rx: 0, ry: 0 });
    expect(tiltAngles(1, 0.5, 8)).toEqual({ rx: 0, ry: 8 });
  });

  it("wraps value into period", () => {
    expect(wrap(120, 100)).toBe(20);
    expect(wrap(-10, 100)).toBe(90);
  });
});
