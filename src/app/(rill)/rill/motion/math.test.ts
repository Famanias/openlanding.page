import { describe, expect, it } from "vitest";
import { clamp01, lerp, progressFromOffsets, staggerDelay } from "./math";

describe("RILL motion maths", () => {
  it("clamps progress to the unit interval", () => {
    expect(clamp01(-0.4)).toBe(0);
    expect(clamp01(0.42)).toBe(0.42);
    expect(clamp01(1.4)).toBe(1);
  });

  it("interpolates values without leaking beyond the endpoints", () => {
    expect(lerp(10, 30, 0.25)).toBe(15);
    expect(lerp(10, 30, -1)).toBe(10);
    expect(lerp(10, 30, 2)).toBe(30);
  });

  it("maps a sticky section's real offsets to progress", () => {
    expect(progressFromOffsets(0, 3600, 1000)).toBe(0);
    expect(progressFromOffsets(-1300, 3600, 1000)).toBe(0.5);
    expect(progressFromOffsets(-9999, 3600, 1000)).toBe(1);
    expect(progressFromOffsets(-300, 600, 1000)).toBe(0);
  });

  it("returns a stable stagger delay", () => {
    expect(staggerDelay(0, 80)).toBe("0ms");
    expect(staggerDelay(3, 80)).toBe("240ms");
  });
});

