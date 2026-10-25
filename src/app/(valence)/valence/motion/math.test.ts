import { describe, expect, it } from "vitest";
import { clamp, lerp, progress, staggerDelayMs, tiltAngles } from "./math";

describe("valence motion math", () => {
  it("clamps numbers to a closed interval", () => {
    expect(clamp(-5, 0, 1)).toBe(0);
    expect(clamp(0.45, 0, 1)).toBe(0.45);
    expect(clamp(9, 0, 1)).toBe(1);
  });

  it("interpolates linearly between endpoints", () => {
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 0.5)).toBe(15);
    expect(lerp(10, 20, 1)).toBe(20);
  });

  it("normalizes progress across arbitrary ranges and guards zero span", () => {
    expect(progress(100, 100, 300)).toBe(0);
    expect(progress(200, 100, 300)).toBe(0.5);
    expect(progress(350, 100, 300)).toBe(1);
    expect(progress(50, 100, 100)).toBe(0);
  });

  it("caps total stagger delay at the configured ceiling", () => {
    expect(staggerDelayMs(0, 70, 600)).toBe(0);
    expect(staggerDelayMs(3, 70, 600)).toBe(210);
    expect(staggerDelayMs(15, 70, 600)).toBe(600);
  });

  it("computes bounded card tilt angles from normalized pointer coordinates", () => {
    expect(tiltAngles(0.5, 0.5, 4)).toEqual({ rx: 0, ry: 0 });
    expect(tiltAngles(1, 0, 4)).toEqual({ rx: 4, ry: 4 });
    expect(tiltAngles(0, 1, 4)).toEqual({ rx: -4, ry: -4 });
  });
});
