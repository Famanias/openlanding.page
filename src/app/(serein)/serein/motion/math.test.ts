import { describe, expect, it } from "vitest";
import { clamp01, lerp, progressFromOffsets, staggerDelay } from "./math";

describe("serein motion maths", () => {
  it("clamps and interpolates values", () => {
    expect(clamp01(-0.2)).toBe(0);
    expect(clamp01(1.3)).toBe(1);
    expect(lerp(10, 30, 0.25)).toBe(15);
  });

  it("calculates a page progress from real offsets", () => {
    expect(progressFromOffsets(300, 100, 700)).toBe(0.3333333333333333);
    expect(progressFromOffsets(100, 100, 700)).toBe(0);
    expect(progressFromOffsets(900, 100, 700)).toBe(1);
  });

  it("caps the choreographed stagger", () => {
    expect(staggerDelay(0, 70, 600)).toBe(0);
    expect(staggerDelay(4, 70, 600)).toBe(280);
    expect(staggerDelay(20, 70, 600)).toBe(600);
  });
});
