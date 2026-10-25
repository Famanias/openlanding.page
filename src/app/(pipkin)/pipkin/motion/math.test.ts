import { describe, it, expect } from "vitest";
import { clamp, lerp, progress, smoothstep, staggerDelay, easeOutExpo, tiltAngles, sectionProgress, dwell, nearestStop } from "./math";

describe("pipkin motion maths", () => {
  it("clamps and lerps", () => {
    expect(clamp(5, 0, 1)).toBe(1);
    expect(clamp(-2, 0, 1)).toBe(0);
    expect(lerp(10, 20, 0.25)).toBe(12.5);
  });

  it("maps a value between two bounds in either direction", () => {
    expect(progress(50, 0, 100)).toBe(0.5);
    expect(progress(150, 0, 100)).toBe(1);
    expect(progress(75, 100, 0)).toBe(0.25);
    expect(progress(3, 4, 4)).toBe(0);
  });

  it("smoothsteps with flat ends", () => {
    expect(smoothstep(0)).toBe(0);
    expect(smoothstep(1)).toBe(1);
    expect(smoothstep(0.5)).toBe(0.5);
    expect(smoothstep(0.1)).toBeLessThan(0.1);
  });

  it("caps total stagger delay", () => {
    expect(staggerDelay(2, 70, 600)).toBe(140);
    expect(staggerDelay(40, 70, 600)).toBe(600);
  });

  it("eases a count-up to exactly 1", () => {
    expect(easeOutExpo(0)).toBeCloseTo(0, 2);
    expect(easeOutExpo(1)).toBe(1);
    expect(easeOutExpo(0.5)).toBeGreaterThan(0.9);
  });

  it("tilts towards the pointer within the limit", () => {
    expect(tiltAngles(0.5, 0.5, 6)).toEqual({ rx: 0, ry: 0 });
    expect(tiltAngles(1, 0, 6)).toEqual({ rx: 6, ry: 6 });
    expect(tiltAngles(9, -9, 6)).toEqual({ rx: 6, ry: 6 });
  });

  it("measures progress through a pinned section", () => {
    // section starts at 1000px, is 3000px tall, viewport is 1000px: scrubbing runs 1000 -> 3000
    expect(sectionProgress(900, 1000, 3000, 1000)).toBe(0);
    expect(sectionProgress(2000, 1000, 3000, 1000)).toBe(0.5);
    expect(sectionProgress(5000, 1000, 3000, 1000)).toBe(1);
    expect(sectionProgress(1500, 1000, 800, 1000)).toBe(0);
  });

  it("lingers on stops", () => {
    expect(dwell(0, 5)).toBe(0);
    expect(dwell(1, 5)).toBe(4);
    expect(dwell(0.5, 5)).toBeCloseTo(2, 5);
    // a quarter of the way through the first segment the eased value is still near the stop
    expect(dwell(0.0625, 5)).toBeLessThan(0.25);
    expect(dwell(0.3, 1)).toBe(0);
  });

  it("finds the nearest stop", () => {
    expect(nearestStop(0.4, 5)).toBe(0);
    expect(nearestStop(0.6, 5)).toBe(1);
    expect(nearestStop(9, 5)).toBe(4);
    expect(nearestStop(-3, 5)).toBe(0);
  });
});
