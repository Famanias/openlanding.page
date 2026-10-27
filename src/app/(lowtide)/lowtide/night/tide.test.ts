import { describe, expect, it } from "vitest";
import { lerp } from "../motion/math";
import { CHAPTER_POINTS } from "./clock";
import { nearestChapter, stepChapter, tideLevel } from "./tide";

const LOWS = ["problem", "sensors", "smart-wake", "proof", "reveal"] as const;

describe("tide level", () => {
  it("starts at high tide", () => {
    expect(tideLevel(0)).toBe(1);
  });

  it("is fully out at every low-tide chapter", () => {
    for (const id of LOWS) expect(tideLevel(CHAPTER_POINTS[id])).toBeCloseTo(0, 6);
  });

  it("is fully in halfway between two lows", () => {
    expect(tideLevel((CHAPTER_POINTS.problem + CHAPTER_POINTS.sensors) / 2)).toBeCloseTo(1, 6);
  });

  it("is coming back in at dawn", () => {
    expect(tideLevel(1)).toBeCloseTo(0.5, 6);
  });

  it("clamps progress outside the night", () => {
    expect(tideLevel(2)).toBe(tideLevel(1));
    expect(tideLevel(-1)).toBe(1);
  });

  it("falls monotonically from a high to the next low", () => {
    const a = (CHAPTER_POINTS.problem + CHAPTER_POINTS.sensors) / 2;
    const b = CHAPTER_POINTS.sensors;
    for (let i = 0; i < 20; i++) {
      expect(tideLevel(lerp(a, b, (i + 1) / 20))).toBeLessThanOrEqual(tideLevel(lerp(a, b, i / 20)) + 1e-12);
    }
  });
});

describe("chapter navigation", () => {
  it("finds the nearest chapter", () => {
    expect(nearestChapter(CHAPTER_POINTS.sensors + 0.01)).toBe("sensors");
    expect(nearestChapter(-5)).toBe("hook");
    expect(nearestChapter(0.999)).toBe("dawn");
  });

  it("steps to the next and previous chapter", () => {
    expect(stepChapter(CHAPTER_POINTS.sensors, 1)).toBe("smart-wake");
    expect(stepChapter(CHAPTER_POINTS.sensors, -1)).toBe("problem");
    expect(stepChapter(CHAPTER_POINTS.sensors + 0.03, 1)).toBe("smart-wake");
  });

  it("stops at both ends", () => {
    expect(stepChapter(0, -1)).toBe("hook");
    expect(stepChapter(1, 1)).toBe("dawn");
  });
});
