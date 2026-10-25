import { describe, expect, it } from "vitest";
import { clamp, lerp, progress, staggerDelay, tiltAngles } from "./math";

describe("nulo motion maths", () => {
  it("clamps and interpolates values", () => {
    expect(clamp(-1, 0, 1)).toBe(0);
    expect(clamp(2, 0, 1)).toBe(1);
    expect(lerp(10, 20, 0.25)).toBe(12.5);
  });

  it("calculates bounded progress and capped cascades", () => {
    expect(progress(50, 0, 100)).toBe(0.5);
    expect(progress(-1, 0, 100)).toBe(0);
    expect(progress(101, 0, 100)).toBe(1);
    expect(staggerDelay(10, 80, 360)).toBe(360);
  });

  it("turns a pointer position into a stable tilt", () => {
    expect(tiltAngles(0, 0, 6)).toEqual({ rx: 6, ry: -6 });
    expect(tiltAngles(0.5, 0.5, 6)).toEqual({ rx: 0, ry: 0 });
    expect(tiltAngles(2, -1, 6)).toEqual({ rx: 6, ry: 6 });
  });
});
