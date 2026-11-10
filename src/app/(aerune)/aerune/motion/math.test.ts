import { describe, expect, it } from "vitest";
import { clamp, lerp, progressFromOffsets } from "./math";

describe("motion math", () => {
  it("bounds progress and handles invalid numbers", () => {
    expect(clamp(-1, 0, 1)).toBe(0);
    expect(clamp(4, 0, 1)).toBe(1);
    expect(clamp(Number.NaN, 0, 1)).toBe(0);
    expect(lerp(10, 20, 0.25)).toBe(12.5);
  });

  it("calculates progress from real offsets without division by zero", () => {
    expect(progressFromOffsets(50, 100, 300)).toBe(0);
    expect(progressFromOffsets(200, 100, 300)).toBe(0.5);
    expect(progressFromOffsets(400, 100, 300)).toBe(1);
    expect(progressFromOffsets(100, 100, 100)).toBe(0);
  });
});
