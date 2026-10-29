import { describe, it, expect } from "vitest";
import {
  WORLD_CHAPTERS,
  REST_POINTS,
  CAMERA_KEYFRAMES,
  computeCameraPoseAtProgress,
  getChapterStateAtProgress,
  getNextChapterProgress,
  getNearestChapterSnapProgress,
} from "./chapters";
describe("world journey", () => {
  it("tiles the story and includes the seven deliberate rests", () => {
    expect(REST_POINTS).toEqual([0, 0.18, 0.45, 0.66, 0.72, 0.86, 1]);
    WORLD_CHAPTERS.forEach((c, i) => {
      expect(c.startProgress).toBeLessThanOrEqual(c.restProgress);
      expect(c.restProgress).toBeLessThanOrEqual(c.endProgress);
      if (i) expect(c.startProgress).toBe(WORLD_CHAPTERS[i - 1].endProgress);
    });
  });
  it("is bounded, fully reversible and never leaves an empty world", () => {
    for (let i = 0; i <= 2000; i++) {
      const p = i / 2000,
        s = getChapterStateAtProgress(p);
      expect(s).toEqual(getChapterStateAtProgress(p));
      expect(
        Object.values(s.worldVisibility).reduce((a, b) => a + b, 0),
      ).toBeCloseTo(1, 10);
      for (const v of [
        ...s.chapterOpacities,
        ...Object.values(s.worldVisibility),
        s.paperDive,
        s.oilSoak,
        s.rainIntensity,
        s.benchAssembly,
        s.genkanSettle,
        s.open,
      ]) {
        expect(Number.isFinite(v)).toBe(true);
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(1);
      }
    }
    expect(getChapterStateAtProgress(NaN).progress).toBe(0);
    expect(getChapterStateAtProgress(1).activeChapterIndex).toBe(5);
  });
  it("steps without skipping the nearby rest from either direction", () => {
    expect(getNextChapterProgress(0.49, -1)).toBe(0.45);
    expect(getNextChapterProgress(0.63, 1)).toBe(0.66);
    expect(getNextChapterProgress(0.66, 1)).toBe(0.72);
    expect(getNextChapterProgress(0.72, -1)).toBe(0.66);
    expect(getNextChapterProgress(0, -1)).toBe(0);
    expect(getNextChapterProgress(1, 1)).toBe(1);
    expect(getNearestChapterSnapProgress(0.445)).toBe(0.45);
  });
  it("reaches every exact camera key and stays continuous above the floor", () => {
    for (const k of CAMERA_KEYFRAMES) {
      const c = computeCameraPoseAtProgress(k.progress);
      expect(c.position).toEqual(k.position);
      expect(c.target).toEqual(k.target);
      expect(c.fov).toBe(k.fov);
    }
    let previous = computeCameraPoseAtProgress(0);
    for (let i = 1; i <= 2000; i++) {
      const c = computeCameraPoseAtProgress(i / 2000);
      expect(
        Math.hypot(...c.position.map((v, k) => v - previous.position[k])),
      ).toBeLessThan(0.35);
      expect(c.position[1]).toBeGreaterThanOrEqual(-2.25);
      expect(c.fov).toBeGreaterThanOrEqual(34);
      expect(c.fov).toBeLessThanOrEqual(46);
      previous = c;
    }
  });
});
