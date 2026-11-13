import { describe, expect, it } from "vitest";
import {
  clamp,
  easeOutExpo,
  easeOutQuint,
  lerp,
  progress,
  sectionProgress,
  staggerDelay,
  tiltAngles,
} from "./math";

describe("datum motion math", () => {
  it("clamps values within bounds", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(14, 0, 10)).toBe(10);
    expect(clamp(4.5, 0, 10)).toBe(4.5);
  });

  it("linearly interpolates between endpoints", () => {
    expect(lerp(10, 30, 0)).toBe(10);
    expect(lerp(10, 30, 0.5)).toBe(20);
    expect(lerp(10, 30, 1)).toBe(30);
  });

  it("maps progress across normal and degenerate ranges", () => {
    expect(progress(50, 0, 100)).toBe(0.5);
    expect(progress(-10, 0, 100)).toBe(0);
    expect(progress(120, 0, 100)).toBe(1);
    expect(progress(5, 5, 5)).toBe(1);
    expect(progress(4, 5, 5)).toBe(0);
  });

  it("computes sticky section progress across scroll offsets", () => {
    expect(sectionProgress(100, 100, 1800, 900)).toBe(0);
    expect(sectionProgress(550, 100, 1800, 900)).toBe(0.5);
    expect(sectionProgress(1000, 100, 1800, 900)).toBe(1);
  });

  it("caps stagger delays", () => {
    expect(staggerDelay(0, 65)).toBe(0);
    expect(staggerDelay(3, 65)).toBe(195);
    expect(staggerDelay(20, 65, 500)).toBe(500);
  });

  it("computes symmetric tilt angles from normalized pointer coordinates", () => {
    expect(tiltAngles(0.5, 0.5, 6)).toEqual({ rotateX: -0, rotateY: 0 });
    expect(tiltAngles(1, 0, 5)).toEqual({ rotateX: 5, rotateY: 5 });
    expect(tiltAngles(0, 1, 5)).toEqual({ rotateX: -5, rotateY: -5 });
  });

  it("evaluates easeOutExpo and easeOutQuint cleanly at boundaries", () => {
    expect(easeOutExpo(0)).toBe(0);
    expect(easeOutExpo(1)).toBe(1);
    expect(easeOutExpo(0.5)).toBeGreaterThan(0.95);
    expect(easeOutQuint(0)).toBe(0);
    expect(easeOutQuint(1)).toBe(1);
  });
});
