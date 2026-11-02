import { describe, expect, it } from "vitest";
import { orbitAngle } from "./orbit";

describe("company orbit", () => {
  it("spaces six marks evenly around a full circle", () => {
    expect([0, 1, 2, 3, 4, 5].map((index) => orbitAngle(index, 6))).toEqual([0, 60, 120, 180, 240, 300]);
  });

  it("returns a stable position when there are no marks", () => {
    expect(orbitAngle(0, 0)).toBe(0);
  });
});
