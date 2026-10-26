import { describe, expect, it } from "vitest";
import { criticalImpactParameter, traceSchwarzschild } from "./geodesic";

describe("Schwarzschild reference integrator", () => {
  it("keeps the critical impact parameter at 2.598 Rs", () => expect(criticalImpactParameter()).toBeCloseTo(2.598, 2));
  it("captures a central ray and escapes a distant ray", () => {
    expect(traceSchwarzschild({ x: 0, y: 0, z: 12 }, { x: 0, y: 0, z: -1 }).captured).toBe(true);
    expect(traceSchwarzschild({ x: 30, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }).escaped).toBe(true);
  });
});
