import { describe, expect, it } from "vitest";
import { materialPose, stepSpring } from "./physics";

describe("paper studio motion", () => {
  it("settles after a fling even with dropped frames", () => {
    const spring = { value: -3, velocity: 24 };
    for (let i = 0; i < 150; i++) stepSpring(spring, 1.2, i % 5 ? .016 : .2);
    expect(spring.value).toBeCloseTo(1.2, 3);
    expect(Math.abs(spring.velocity)).toBeLessThan(.001);
  });
  it("honors an immediate reduced motion update", () => {
    const spring = { value: -3, velocity: 24 };
    stepSpring(spring, 1.2, .016, true);
    expect(spring).toEqual({ value: 1.2, velocity: 0 });
  });
  it("unpacks each layer outward and raises only the picked layer", () => {
    const closed = materialPose(2, "compose", 0, 0, null);
    const open = materialPose(2, "unpack", 0, 0, null);
    expect(open.x).toBeLessThan(closed.x);
    expect(open.z).toBeGreaterThan(closed.z);
    expect(materialPose(2, "compose", 0, 0, "ink").z).toBeCloseTo(closed.z + 1.15);
    expect(materialPose(1, "compose", 0, 0, "ink")).toEqual(materialPose(1, "compose", 0, 0, null));
  });
  it("recomposition is deterministic and has bounded displacement", () => {
    const pose = materialPose(0, "compose", 0, 3, null);
    expect(pose).toEqual(materialPose(0, "compose", 0, 3, null));
    expect(pose.x).not.toBe(materialPose(0, "compose", 0, 0, null).x);
    for (let revision = 1; revision < 80; revision++) {
      const value = materialPose(0, "compose", 0, revision, null);
      expect(Math.abs(value.x + .48)).toBeLessThanOrEqual(.5);
    }
  });
});
