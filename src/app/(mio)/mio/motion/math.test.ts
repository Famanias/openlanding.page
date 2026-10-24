import { describe, expect, it } from "vitest";
import { clamp, progress, lerp } from "./math";

describe("harbor reading progress", () => {
  it("stays at the shoreline before entry and finishes after departure", () => {
    expect(progress(-90, 0, 800)).toBe(0);
    expect(progress(400, 0, 800)).toBe(0.5);
    expect(progress(1000, 0, 800)).toBe(1);
    expect(progress(20, 20, 20)).toBe(0);
  });
  it("keeps easing values inside the scene", () => {
    expect(clamp(-3)).toBe(0);
    expect(clamp(4)).toBe(1);
    expect(lerp(10, 50, 0.25)).toBe(20);
  });
});
