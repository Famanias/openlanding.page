import { describe, expect, it } from "vitest";
import { postcardPose } from "./carousel";

describe("the looping postcard fan", () => {
  it("moves each card along the arc rather than translating a fixed fan", () => {
    expect(postcardPose(3, 0, 206, 10)).toEqual({ x: 206, y: 23, rotation: 7 });
    expect(postcardPose(3, 206, 206, 10)).toEqual({ x: 0, y: 0, rotation: 0 });
  });
  it("recycles cards beyond the visible edges and returns exactly after a full loop", () => {
    expect(postcardPose(0, 617, 206, 10).x).toBe(-1029);
    expect(postcardPose(0, 619, 206, 10).x).toBe(1029);
    expect(postcardPose(2, 2060, 206, 10)).toEqual({ x: 0, y: 0, rotation: 0 });
    expect(postcardPose(2, -2060, 206, 10)).toEqual({ x: 0, y: 0, rotation: 0 });
  });
});
