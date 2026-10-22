import { describe, expect, it } from "vitest";
import { clamp, lerp, progress } from "./math";

describe("TRUECUT motion math", () => {
  it("clamps values and interpolates a range", () => {
    expect(clamp(-1, 0, 1)).toBe(0);
    expect(clamp(2, 0, 1)).toBe(1);
    expect(lerp(10, 30, 0.25)).toBe(15);
    expect(progress(25, 0, 100)).toBe(0.25);
  });
});
