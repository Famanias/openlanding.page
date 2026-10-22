import { describe, expect, it } from "vitest";
import { clamp, lerp, progress, staggerDelay, tiltAngles, wrap } from "./math";

describe("motion math", () => {
  it("clamps into a range", () => {
    expect(clamp(-1, 0, 1)).toBe(0);
    expect(clamp(2, 0, 1)).toBe(1);
    expect(clamp(0.4, 0, 1)).toBe(0.4);
  });

  it("lerps between two values", () => {
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(0, 10, 0.25)).toBe(2.5);
    expect(lerp(10, 20, 1)).toBe(20);
  });

  it("maps a value to 0–1 progress inside a window, clamped", () => {
    expect(progress(50, 0, 100)).toBe(0.5);
    expect(progress(-20, 0, 100)).toBe(0);
    expect(progress(140, 0, 100)).toBe(1);
    expect(progress(5, 5, 5)).toBe(1);
  });

  it("caps the stagger so long lists never wait more than the cap", () => {
    expect(staggerDelay(0, 90, 600)).toBe(0);
    expect(staggerDelay(3, 90, 600)).toBe(270);
    expect(staggerDelay(20, 90, 600)).toBe(600);
  });

  it("turns a pointer position into tilt angles around the centre", () => {
    expect(tiltAngles(0.5, 0.5, 6)).toEqual({ rx: 0, ry: 0 });
    expect(tiltAngles(1, 0.5, 6)).toEqual({ rx: 0, ry: 6 });
    expect(tiltAngles(0.5, 0, 6)).toEqual({ rx: 6, ry: 0 });
    expect(tiltAngles(0, 1, 6)).toEqual({ rx: -6, ry: -6 });
  });

  it("wraps a value into [0, period)", () => {
    expect(wrap(0, 50)).toBe(0);
    expect(wrap(75, 50)).toBe(25);
    expect(wrap(-10, 50)).toBe(40);
    expect(wrap(50, 50)).toBe(0);
  });
});
