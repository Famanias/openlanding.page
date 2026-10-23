import { describe, expect, it } from "vitest";
import { clamp01, sceneAt, sceneOffset, stageProgress } from "./progress";

describe("stageProgress", () => {
  const section = { height: 4000, viewport: 800 };

  it("is 0 before the stage pins and 1 after it releases", () => {
    expect(stageProgress({ ...section, top: 600 })).toBe(0);
    expect(stageProgress({ ...section, top: 0 })).toBe(0);
    expect(stageProgress({ ...section, top: -3200 })).toBe(1);
    expect(stageProgress({ ...section, top: -5000 })).toBe(1);
  });

  it("moves linearly while pinned", () => {
    expect(stageProgress({ ...section, top: -1600 })).toBeCloseTo(0.5);
  });

  it("never divides by zero when the section is shorter than the viewport", () => {
    expect(stageProgress({ top: -10, height: 500, viewport: 800 })).toBe(0);
  });
});

describe("sceneAt", () => {
  it("splits progress into equal scenes and clamps the ends", () => {
    expect([0, 0.24, 0.25, 0.49, 0.5, 0.74, 0.75, 1].map((p) => sceneAt(p, 4))).toEqual([0, 0, 1, 1, 2, 2, 3, 3]);
    expect(sceneAt(-1, 4)).toBe(0);
    expect(sceneAt(9, 4)).toBe(3);
  });
});

describe("sceneOffset", () => {
  it("lands in the middle of each scene, so sceneAt reads the same index back", () => {
    const metrics = { height: 4000, viewport: 800 };
    for (let i = 0; i < 4; i += 1) {
      const p = clamp01(sceneOffset(i, 4, metrics) / (metrics.height - metrics.viewport));
      expect(sceneAt(p, 4)).toBe(i);
    }
  });
});
