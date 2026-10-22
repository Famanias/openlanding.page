import { describe, expect, it } from "vitest";
import { clamp01, lerp, progressFromOffsets, smoothstep, staggerDelay } from "./math";

describe("VOLUME ZERO motion maths", () => {
  it("clamps progress without changing values already in range", () => {
    expect(clamp01(-0.4)).toBe(0);
    expect(clamp01(0.42)).toBe(0.42);
    expect(clamp01(2)).toBe(1);
  });

  it("interpolates between values", () => {
    expect(lerp(10, 30, 0.25)).toBe(15);
    expect(smoothstep(0)).toBe(0);
    expect(smoothstep(0.5)).toBe(0.5);
    expect(smoothstep(1)).toBe(1);
  });

  it("maps a real section offset to bounded scroll progress", () => {
    expect(progressFromOffsets({ scrollY: 100, top: 100, height: 1600, viewport: 800 })).toBe(0);
    expect(progressFromOffsets({ scrollY: 500, top: 100, height: 1600, viewport: 800 })).toBe(0.5);
    expect(progressFromOffsets({ scrollY: 1800, top: 100, height: 1600, viewport: 800 })).toBe(1);
  });

  it("creates a predictable child stagger", () => {
    expect(staggerDelay(0, 70)).toBe("0ms");
    expect(staggerDelay(3, 70)).toBe("210ms");
  });
});
