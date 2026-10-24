import { describe, expect, it } from "vitest";
import { clamp, progressFromOffsets } from "./math";

describe("scroll progress", () => {
  it("maps a real 1500px sticky travel to its midpoint and clamps both edges", () => {
    expect(progressFromOffsets(1250, 500, 2400, 900)).toBe(.5);
    expect(progressFromOffsets(0, 500, 2400, 900)).toBe(0);
    expect(progressFromOffsets(3000, 500, 2400, 900)).toBe(1);
    expect(progressFromOffsets(500, 500, 600, 900)).toBe(1);
    expect(clamp(Number.NaN)).toBe(0);
  });
});
