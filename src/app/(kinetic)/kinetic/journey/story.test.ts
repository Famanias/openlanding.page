import { describe, expect, it } from "vitest";
import {
  CRUISE_SPEED,
  LANDMARKS,
  MAX_CATCH_UP,
  STOPS,
  buildStoryMap,
  curvatureAt,
  displayMph,
  distanceForScroll,
  elevationAt,
  shotBlendAt,
  stepTruck,
  storyIndexForScroll,
} from "./story";

describe("kinetic journey story data", () => {
  it("locks truck speed to constant 65 km/h (18 m/s = ~40 mph) with zero speed surges", () => {
    expect(CRUISE_SPEED).toBe(18);
    expect(MAX_CATCH_UP).toBe(18);
    expect(displayMph(0)).toBe(0);
    expect(displayMph(18)).toBe(40);
    expect(displayMph(30)).toBe(40); // Capped at constant 65 km/h (40 mph)
  });

  it("advances truck at constant 65 km/h during slide transitions without spiking to 120 km/h", () => {
    const motion = { s: 52, v: 0, a: 0 };
    // Jump 200m ahead to next presentation slide
    stepTruck(motion, 252, 0.016);
    expect(motion.v).toBe(18); // 18 m/s = 65 km/h constant
    expect(motion.s).toBeGreaterThan(52);

    // Continue transitioning
    stepTruck(motion, 252, 0.016);
    expect(motion.v).toBe(18); // Still locked at 18 m/s (65 km/h), never 32 m/s or 120 km/h
  });

  it("defines 9 story beats from pickup to arrival across 5 chapters", () => {
    expect(STOPS).toHaveLength(9);
    expect(STOPS[0].id).toBe("depart");
    expect(STOPS[8].id).toBe("arrive");
    expect(STOPS[8].s).toBe(LANDMARKS.arrival);
  });

  it("calculates smooth elevation and curvature along road distance", () => {
    expect(elevationAt(0)).toBe(0);
    expect(typeof elevationAt(650)).toBe("number");
    expect(typeof curvatureAt(180)).toBe("number");
  });

  it("builds a scroll-to-story map with monotonic sampling", () => {
    const chapters = [
      { stops: ["depart" as const], start: 0, end: 1000 },
      { stops: ["prepare" as const], start: 1000, end: 2000 },
      { stops: ["truck" as const, "driver" as const, "paperwork" as const], start: 2000, end: 3000 },
      { stops: ["workspace" as const, "roles" as const], start: 3000, end: 4000 },
      { stops: ["closeout" as const, "arrive" as const], start: 4000, end: 5000 },
    ];
    const map = buildStoryMap(chapters);
    expect(map.ys.length).toBeGreaterThan(0);

    const s0 = distanceForScroll(map, 0);
    const s1 = distanceForScroll(map, 2500);
    const s2 = distanceForScroll(map, 5000);
    expect(s0).toBeLessThanOrEqual(s1);
    expect(s1).toBeLessThanOrEqual(s2);

    const p0 = storyIndexForScroll(map, 0);
    const pEnd = storyIndexForScroll(map, 5000);
    expect(p0).toBe(0);
    expect(pEnd).toBe(8);
  });

  it("blends camera shots smoothly across story beats", () => {
    const blend0 = shotBlendAt(0);
    expect(blend0.t).toBe(0);
    expect(blend0.a.fov).toBeGreaterThan(0);

    const blendMid = shotBlendAt(1.5);
    expect(blendMid.t).toBeCloseTo(0.5, 1);
  });
});
