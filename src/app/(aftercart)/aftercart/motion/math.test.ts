import { describe, expect, it } from "vitest";
import { clamp, lerp, progressFromOffsets, staggerDelay } from "./math";

describe("AFTERCART motion maths", () => {
  it("clamps values to a range", () => {
    expect(clamp(-0.2, 0, 1)).toBe(0);
    expect(clamp(0.4, 0, 1)).toBe(0.4);
    expect(clamp(1.2, 0, 1)).toBe(1);
  });

  it("lerps between two values", () => {
    expect(lerp(10, 30, 0.25)).toBe(15);
  });

  it("maps scroll offsets to a clamped section progress", () => {
    expect(progressFromOffsets(150, 100, 300, 100)).toBe(0.25);
    expect(progressFromOffsets(50, 100, 300, 100)).toBe(0);
    expect(progressFromOffsets(420, 100, 300, 100)).toBe(1);
  });

  it("returns a bounded stagger delay", () => {
    expect(staggerDelay(3, 70, 600)).toBe(210);
    expect(staggerDelay(20, 70, 600)).toBe(600);
  });
});
