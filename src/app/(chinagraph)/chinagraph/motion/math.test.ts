import { describe, expect, it } from "vitest";
import { clamp01, flashCurve, lerp, passProgress, progressFromOffsets, segment } from "./math";

describe("CHINAGRAPH motion maths", () => {
  it("clamps and interpolates", () => {
    expect(clamp01(-1)).toBe(0);
    expect(clamp01(Number.NaN)).toBe(0);
    expect(clamp01(0.3)).toBe(0.3);
    expect(lerp(0, 10, 0.25)).toBe(2.5);
    expect(lerp(0, 10, 5)).toBe(10);
  });

  it("maps a pinned section's offsets to progress", () => {
    expect(progressFromOffsets(0, 4000, 1000)).toBe(0);
    expect(progressFromOffsets(-1500, 4000, 1000)).toBe(0.5);
    expect(progressFromOffsets(-9000, 4000, 1000)).toBe(1);
    expect(progressFromOffsets(0, 900, 1000)).toBe(0);
  });

  it("measures how far an element has passed the viewport", () => {
    expect(passProgress(1000, 1000, 1000)).toBe(0);
    expect(passProgress(0, 1000, 1000)).toBe(0.5);
    expect(passProgress(-1000, 1000, 1000)).toBe(1);
  });

  it("reads a sub-range", () => {
    expect(segment(0.5, 0.25, 0.75)).toBe(0.5);
    expect(segment(0, 0.25, 0.75)).toBe(0);
    expect(segment(1, 0.25, 0.75)).toBe(1);
    expect(segment(0.4, 0.4, 0.4)).toBe(1);
  });

  it("shapes a strobe: zero outside its window, one at the peak", () => {
    expect(flashCurve(0.1, 0.4, 0.6)).toBe(0);
    expect(flashCurve(0.9, 0.4, 0.6)).toBe(0);
    expect(flashCurve(0.5, 0.4, 0.6)).toBe(1);
    expect(flashCurve(0.45, 0.4, 0.6)).toBeCloseTo(0.5);
    expect(flashCurve(0.55, 0.4, 0.6)).toBeCloseTo(0.5);
  });
});
