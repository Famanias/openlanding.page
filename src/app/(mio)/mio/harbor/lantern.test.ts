import { describe, expect, it } from "vitest";
import { lanternPose } from "./lantern";

describe("a wish leaving the artist's window", () => {
  it("starts beside the studio and rises clear of the roof", () => {
    expect(lanternPose(0)).toEqual({ x: 0, y: 0, rotate: -4 });
    expect(lanternPose(1)).toEqual({ x: -45, y: -170, rotate: 5 });
    expect(lanternPose(2)).toEqual(lanternPose(1));
    expect(lanternPose(0.5).y).toBe(-85);
  });
});
