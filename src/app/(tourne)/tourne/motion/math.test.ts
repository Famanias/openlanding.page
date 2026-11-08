import { describe, expect, it } from "vitest";
import { clamp, easeInOutCubic, easeOutQuint, lerp, progress, sectionProgress, staggerDelay, tiltAngles } from "./math";

describe("motion math", () => {
  it("clamps and lerps", () => {
    expect(clamp(5, 0, 1)).toBe(1);
    expect(clamp(-5, 0, 1)).toBe(0);
    expect(lerp(10, 20, 0.5)).toBe(15);
  });

  it("maps a value to progress and tolerates empty ranges", () => {
    expect(progress(50, 0, 100)).toBe(0.5);
    expect(progress(-10, 0, 100)).toBe(0);
    expect(progress(200, 0, 100)).toBe(1);
    expect(progress(5, 10, 10)).toBe(0);
    expect(progress(10, 10, 10)).toBe(1);
  });

  it("computes section progress from real offsets", () => {
    expect(sectionProgress(1000, 1000, 3000, 1000)).toBe(0);
    expect(sectionProgress(2000, 1000, 3000, 1000)).toBe(0.5);
    expect(sectionProgress(9999, 1000, 3000, 1000)).toBe(1);
    expect(sectionProgress(0, 1000, 500, 1000)).toBe(0);
  });

  it("caps stagger delays", () => {
    expect(staggerDelay(2, 70)).toBe(140);
    expect(staggerDelay(100, 70)).toBe(600);
    expect(staggerDelay(-3, 70)).toBe(0);
  });

  it("maps pointer to tilt", () => {
    const centre = tiltAngles(0.5, 0.5, 6);
    expect(Math.abs(centre.rotateX)).toBe(0);
    expect(Math.abs(centre.rotateY)).toBe(0);
    expect(tiltAngles(1, 0, 6)).toEqual({ rotateX: 6, rotateY: 6 });
    expect(tiltAngles(9, -9, 6)).toEqual({ rotateX: 6, rotateY: 6 });
  });

  it("eases between 0 and 1", () => {
    expect(easeOutQuint(0)).toBe(0);
    expect(easeOutQuint(1)).toBe(1);
    expect(easeInOutCubic(0.5)).toBe(0.5);
  });
});
