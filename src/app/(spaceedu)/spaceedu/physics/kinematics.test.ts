import { describe, expect, it } from "vitest";
import { clockRate, dopplerFactor, gravitationalRedshift } from "./kinematics";

describe("relativistic readouts", () => {
  it("approaches one far away and zero at the horizon", () => {
    expect(gravitationalRedshift(1)).toBe(0);
    expect(gravitationalRedshift(1000)).toBeCloseTo(1, 2);
  });
  it("beams toward the observer on the approaching side", () => {
    expect(dopplerFactor(8, true)).toBeGreaterThan(1);
    expect(dopplerFactor(8, false)).toBeLessThan(1);
  });
  it("uses the same factor for the near clock", () => expect(clockRate(4)).toBeCloseTo(Math.sqrt(.75), 5));
});
