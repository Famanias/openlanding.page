import { describe, expect, it } from "vitest";
import { computePose } from "./pose";

const base = { heroHeight: 800, docMax: 7000, vh: 900 };

describe("computePose", () => {
  it("parks the vehicle large on the right of the hero at the surface", () => {
    const pose = computePose({ ...base, scrollY: 0, vw: 1440 });
    expect(pose.cx).toBeGreaterThan(1440 / 2);
    expect(pose.width).toBeGreaterThan(400);
    expect(pose.opacity).toBe(1);
    expect(pose.callouts).toBe(1);
  });

  it("shrinks into the right gutter once the hero is scrolled past", () => {
    const pose = computePose({ ...base, scrollY: 800, vw: 1440 });
    expect(pose.width).toBeLessThanOrEqual(170);
    expect(pose.cx - pose.width / 2).toBeGreaterThanOrEqual(1296 - 30);
    expect(pose.cx + pose.width / 2).toBeLessThanOrEqual(1440 - 40);
    expect(pose.callouts).toBe(0);
  });

  it("stays on screen for the whole dive at desktop widths", () => {
    for (let y = 0; y <= 7000; y += 250) {
      const pose = computePose({ ...base, scrollY: y, vw: 1440 });
      expect(pose.cx + pose.width / 2).toBeLessThanOrEqual(1440);
      expect(pose.cy).toBeGreaterThan(0);
      expect(pose.cy).toBeLessThan(900);
    }
  });

  it("keeps the yaw continuous and always advancing with scroll", () => {
    let last = -Infinity;
    for (let y = 0; y <= 7000; y += 100) {
      const { yaw } = computePose({ ...base, scrollY: y, vw: 1440 });
      expect(yaw).toBeGreaterThan(last);
      last = yaw;
    }
  });

  it("dims the vehicle on narrow screens so it never fights the copy", () => {
    expect(computePose({ ...base, scrollY: 0, vw: 390 }).opacity).toBeLessThanOrEqual(0.3);
    expect(computePose({ ...base, scrollY: 3000, vw: 390 }).opacity).toBeLessThanOrEqual(0.4);
  });

  it("handles a page with nothing to scroll", () => {
    const pose = computePose({ scrollY: 0, heroHeight: 0, docMax: 0, vw: 1440, vh: 900 });
    expect(Number.isFinite(pose.cx)).toBe(true);
    expect(pose.yaw).toBeCloseTo(-0.55);
  });
});
