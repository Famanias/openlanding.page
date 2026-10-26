import { describe, expect, it } from "vitest";
import { stationAt, clamp01, windowOffset } from "./journey";

describe("nightline journey maths", () => {
  it("maps scroll progress to the current station and local progress", () => {
    expect(stationAt(0)).toEqual({ index: 0, local: 0 });
    expect(stationAt(0.25)).toEqual({ index: 1, local: 0 });
    expect(stationAt(0.5)).toEqual({ index: 2, local: 0 });
    expect(stationAt(0.99)).toEqual({ index: 3, local: 1 });
  });

  it("clamps progress and computes a restrained window offset", () => {
    expect(clamp01(-0.2)).toBe(0);
    expect(clamp01(1.2)).toBe(1);
    expect(windowOffset(0.5, 2)).toEqual({ x: 0, y: 0 });
    expect(windowOffset(0.75, 2)).toEqual({ x: -8, y: 3 });
  });
});
