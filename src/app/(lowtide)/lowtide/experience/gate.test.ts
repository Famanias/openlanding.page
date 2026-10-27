import { describe, expect, it } from "vitest";
import { canMountExperience } from "./gate";

describe("canMountExperience", () => {
  it("never mounts the 3D night under reduced motion", () => {
    expect(canMountExperience({ reducedMotion: true, webgl2: true })).toBe(false);
  });

  it("falls back to the tide table without WebGL2", () => {
    expect(canMountExperience({ reducedMotion: false, webgl2: false })).toBe(false);
  });

  it("mounts when motion is welcome and WebGL2 exists", () => {
    expect(canMountExperience({ reducedMotion: false, webgl2: true })).toBe(true);
  });
});
