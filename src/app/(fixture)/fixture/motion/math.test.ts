import { describe, expect, it } from "vitest";
import { clamp01, lerp, passProgress, progressFromOffsets, segment, staggerDelay, tiltFromPointer } from "./math";

describe("FIXTURE motion maths", () => {
  it("clamps to the unit interval and rejects non-finite input", () => {
    expect(clamp01(-0.2)).toBe(0);
    expect(clamp01(0.4)).toBe(0.4);
    expect(clamp01(3)).toBe(1);
    expect(clamp01(Number.NaN)).toBe(0);
  });

  it("interpolates without overshooting the endpoints", () => {
    expect(lerp(4.1, 1.2, 0)).toBe(4.1);
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(0, 10, 2)).toBe(10);
  });

  it("maps a pinned section's real offsets to progress", () => {
    expect(progressFromOffsets(0, 5000, 1000)).toBe(0);
    expect(progressFromOffsets(-2000, 5000, 1000)).toBe(0.5);
    expect(progressFromOffsets(-8000, 5000, 1000)).toBe(1);
    expect(progressFromOffsets(-200, 800, 1000)).toBe(0);
  });

  it("measures how far an element has passed through the viewport", () => {
    expect(passProgress(1000, 500, 1000)).toBe(0);
    expect(passProgress(250, 500, 1000)).toBe(0.5);
    expect(passProgress(-500, 500, 1000)).toBe(1);
  });

  it("reads a sub-range of a progress value", () => {
    expect(segment(0.25, 0.2, 0.3)).toBeCloseTo(0.5);
    expect(segment(0.1, 0.2, 0.3)).toBe(0);
    expect(segment(0.9, 0.2, 0.3)).toBe(1);
    expect(segment(0.5, 0.5, 0.5)).toBe(1);
  });

  it("produces a capped stagger delay", () => {
    expect(staggerDelay(0, 70)).toBe("0ms");
    expect(staggerDelay(4, 70)).toBe("280ms");
    expect(staggerDelay(40, 70)).toBe("600ms");
  });

  it("turns a pointer position into a bounded tilt", () => {
    expect(tiltFromPointer(50, 50, 100, 100, 6)).toEqual({ rx: 0, ry: 0 });
    expect(tiltFromPointer(100, 0, 100, 100, 6)).toEqual({ rx: 3, ry: 3 });
    expect(tiltFromPointer(-500, 900, 100, 100, 6)).toEqual({ rx: -3, ry: -3 });
  });
});
