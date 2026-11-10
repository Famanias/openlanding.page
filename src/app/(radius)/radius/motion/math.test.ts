import { describe, expect, it } from "vitest";
import { clamp, lerp, sectionProgress } from "./math";

describe("RADIUS scroll motion maths", () => {
  it("clamps values including before and after the scene", () => {
    expect(clamp(-0.2)).toBe(0);
    expect(clamp(0.35)).toBe(0.35);
    expect(clamp(2)).toBe(1);
  });

  it("maps a pinned section's actual travel into bounded progress", () => {
    expect(sectionProgress(30, 1600, 800)).toBe(0);
    expect(sectionProgress(-400, 1600, 800)).toBe(0.5);
    expect(sectionProgress(-900, 1600, 800)).toBe(1);
    expect(sectionProgress(-20, 800, 800)).toBe(0);
  });

  it("interpolates a value without forcing integer steps", () => {
    expect(lerp(2, 10, 0.25)).toBe(4);
  });
});
