import { describe, expect, it } from "vitest";
import { stepCalm, stepRoughness } from "./sea-state";

describe("roughness", () => {
  it("settles back to glassy within 1.5 s of stopping", () => {
    expect(stepRoughness(1, 0, 1.5)).toBeLessThan(0.06);
  });

  it("rises quickly under a hard flick", () => {
    let r = 0;
    for (let i = 0; i < 18; i++) r = stepRoughness(r, 9000, 1 / 60);
    expect(r).toBeGreaterThan(0.9);
  });

  it("never exceeds 1", () => {
    expect(stepRoughness(0, 1e9, 1)).toBeLessThanOrEqual(1);
  });

  it("treats scrolling up like scrolling down", () => {
    expect(stepRoughness(0, -2000, 0.1)).toBeCloseTo(stepRoughness(0, 2000, 0.1), 10);
  });
});

describe("calm", () => {
  it("stays at 0 before 1.2 s of stillness", () => {
    expect(stepCalm(0, 800, 1)).toBe(0);
  });

  it("rises over 2 s once still", () => {
    expect(stepCalm(0, 1300, 1)).toBeCloseTo(0.5, 5);
    expect(stepCalm(0.9, 5000, 1)).toBe(1);
  });

  it("sinks fast when movement resumes", () => {
    expect(stepCalm(1, 0, 0.5)).toBeLessThan(0.1);
  });
});
