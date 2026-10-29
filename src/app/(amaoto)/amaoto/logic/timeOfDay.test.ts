import { it, expect } from "vitest";
import { computeTimeOfDay } from "./timeOfDay";
it("clamps light, increases intensity and exposes bounded colours and CSS", () => {
  let intensity = 0;
  for (let i = 0; i <= 100; i++) {
    const d = computeTimeOfDay(i / 100);
    expect(d.sunIntensityMultiplier).toBeGreaterThanOrEqual(intensity);
    intensity = d.sunIntensityMultiplier;
    for (const c of [...d.sunColorRgb, ...d.surfaceBgRgb]) {
      expect(c).toBeGreaterThanOrEqual(0);
      expect(c).toBeLessThanOrEqual(1);
    }
    for (const v of Object.values(d.cssVars))
      expect(v).toMatch(/^rgb\(\d+ \d+ \d+\)$/);
  }
  expect(computeTimeOfDay(-1).value).toBe(0);
  expect(computeTimeOfDay(9).value).toBe(1);
  expect(computeTimeOfDay(NaN).value).toBe(0);
  expect([0, 0.2, 0.5, 0.85].map((t) => computeTimeOfDay(t).timeLabel)).toEqual(
    ["Dusk", "Golden hour", "Morning", "Midday"],
  );
});
