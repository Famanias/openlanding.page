import { describe, expect, it } from "vitest";
import { advanceDrift, CLOCKWISE_SPEED, MANUAL_SPEED, MATERIALS, carouselDistance, carouselLayout, carouselPose, nearestSlide, releaseSlide, stepSpring, wrapIndex } from "./physics";

describe("material carousel", () => {
  it("continues clockwise while slowing for interaction and recovers without stopping", () => {
    const drift = { speed: CLOCKWISE_SPEED };
    for (let frame = 0; frame < 180; frame++) expect(advanceDrift(drift, 1 / 60, true)).toBeLessThan(0);
    expect(drift.speed).toBeCloseTo(MANUAL_SPEED, 5);
    for (let frame = 0; frame < 180; frame++) expect(advanceDrift(drift, 1 / 60, false)).toBeLessThan(0);
    expect(drift.speed).toBeCloseTo(CLOCKWISE_SPEED, 5);
    expect(carouselPose(0, -.1).x).toBeGreaterThan(0);
  });
  it("keeps the same travel at 30 and 120 fps and disables drift for reduced motion", () => {
    const travel = (fps: number) => {
      const drift = { speed: CLOCKWISE_SPEED }; let distance = 0;
      for (let frame = 0; frame < fps * 2; frame++) distance += advanceDrift(drift, 1 / fps, true);
      return distance;
    };
    expect(travel(30)).toBeCloseTo(travel(120), 10);
    const drift = { speed: CLOCKWISE_SPEED };
    expect(advanceDrift(drift, 1, true, true)).toBe(0); expect(drift.speed).toBe(0);
  });
  it("wraps forward and backward across any number of cycles", () => {
    expect(wrapIndex(-1)).toBe(3); expect(wrapIndex(4)).toBe(0);
    expect(wrapIndex(-17)).toBe(3); expect(wrapIndex(21)).toBe(1);
    expect(nearestSlide(0, 3)).toBe(4); expect(nearestSlide(3, 0)).toBe(-1);
  });
  it("projects a fling to a bounded destination and snaps a slow release to the closest sheet", () => {
    expect(releaseSlide(.2, 0)).toBe(0); expect(releaseSlide(.7, 0)).toBe(1);
    expect(releaseSlide(.4, 4)).toBe(1); expect(releaseSlide(.4, -4)).toBe(0);
    expect(releaseSlide(.4, 100)).toBe(1);
  });
  it("keeps the focused sheet centered and wraps the opposite sheet while invisible", () => {
    for (let index = 0; index < MATERIALS.length; index++) {
      expect(carouselPose(index, index).x).toBe(0);
      expect(carouselPose(index, index).opacity).toBe(1);
      expect(carouselPose(wrapIndex(index + 2), index).opacity).toBe(0);
      expect(carouselDistance(index, index + 4)).toBe(0);
    }
  });
  it("keeps visible neighboring sheets apart throughout a slide transition", () => {
    for (let position = -4; position <= 4; position += .05) {
      const layout = carouselLayout(position);
      const poses = MATERIALS.map((material, index) => {
        const pose = layout[index];
        const perspective = 9.8 / (9.8 - pose.z);
        return { x: pose.x * perspective, half: (material.width * Math.abs(Math.cos(pose.ry)) + material.height * Math.abs(Math.sin(pose.rz))) * pose.scale * perspective / 2, opacity: pose.opacity };
      });
      for (let a = 0; a < poses.length; a++) for (let b = a + 1; b < poses.length; b++) {
        if (poses[a].opacity < .1 || poses[b].opacity < .1) continue;
        expect(Math.abs(poses[a].x - poses[b].x)).toBeGreaterThan(poses[a].half + poses[b].half);
      }
    }
  });
  it("reduces the visible gap by exactly half without resizing either sheet", () => {
    const before = carouselLayout(.5, 4.1, 9.8, 1), after = carouselLayout(.5);
    const gap = (layout: typeof before) => {
      const [left, right] = [layout[0], layout[1]];
      const scale = (pose: typeof left) => 9.8 / (9.8 - pose.z);
      const half = (pose: typeof left, index: number) => (MATERIALS[index].width * Math.abs(Math.cos(pose.ry)) + MATERIALS[index].height * Math.abs(Math.sin(pose.rz))) * pose.scale * scale(pose) / 2;
      return right.x * scale(right) - left.x * scale(left) - half(left, 0) - half(right, 1);
    };
    expect(gap(after)).toBeCloseTo(gap(before) / 2, 10);
    after.forEach((pose, index) => expect(pose.scale).toBe(before[index].scale));
  });
  it("settles a released carousel and honors immediate reduced-motion changes", () => {
    const spring = { value: -.3, velocity: 8 };
    for (let i = 0; i < 150; i++) stepSpring(spring, 1, i % 5 ? .016 : .2);
    expect(spring.value).toBeCloseTo(1, 3); expect(Math.abs(spring.velocity)).toBeLessThan(.001);
    stepSpring(spring, 3, .016, true); expect(spring).toEqual({ value: 3, velocity: 0 });
  });
});
