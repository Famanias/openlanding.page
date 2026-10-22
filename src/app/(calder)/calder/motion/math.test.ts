import { describe, expect, it } from "vitest";
import { clamp, lerp, progress, staggerDelay, tiltAngles } from "./math";

describe("motion maths", () => {
  it("clamps into range", () => {
    expect(clamp(5, 0, 1)).toBe(1);
    expect(clamp(-2, 0, 1)).toBe(0);
    expect(clamp(0.4, 0, 1)).toBe(0.4);
  });

  it("lerps between two values", () => {
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 0.5)).toBe(15);
    expect(lerp(10, 20, 1)).toBe(20);
  });

  it("maps a value inside a window to 0–1", () => {
    expect(progress(50, 0, 100)).toBe(0.5);
    expect(progress(-10, 0, 100)).toBe(0);
    expect(progress(400, 0, 100)).toBe(1);
  });

  it("treats a zero-width window as done once reached", () => {
    expect(progress(10, 20, 20)).toBe(0);
    expect(progress(20, 20, 20)).toBe(1);
  });

  it("caps a cascade's delay", () => {
    expect(staggerDelay(2, 70, 600)).toBe(140);
    expect(staggerDelay(40, 70, 600)).toBe(600);
  });

  it("tilts toward the pointer and never returns -0", () => {
    expect(tiltAngles(0.5, 0.5, 6)).toEqual({ rx: 0, ry: 0 });
    expect(tiltAngles(1, 0, 6)).toEqual({ rx: 6, ry: 6 });
    expect(tiltAngles(9, -9, 6)).toEqual({ rx: 6, ry: 6 });
  });
});
