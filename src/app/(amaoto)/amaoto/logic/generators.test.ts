import { it, expect } from "vitest";
import {
  generateFibres,
  generateRain,
  generateMotes,
  gustField,
} from "./generators";
import { clamp01, smoothstep, createSeededRandom } from "./rng";
it("generates identical seeded worlds with bounded, layer-ordered oil arrival", () => {
  const a = generateFibres();
  expect(a).toEqual(generateFibres());
  expect(a).toHaveLength(1500);
  expect(generateRain()).toEqual(generateRain());
  expect(generateRain()).toHaveLength(30000);
  expect(generateMotes()).toEqual(generateMotes());
  expect(generateMotes()).toHaveLength(1260);
  for (let layer = 0; layer < 6; layer++) {
    const f = a.filter((x) => x.layer === layer);
    expect(f.length).toBe(250);
    for (const x of f) {
      expect(x.oilArrival).toBeGreaterThanOrEqual(layer / 6);
      expect(x.oilArrival).toBeLessThan((layer + 1) / 6);
      expect(x.length).toBeGreaterThan(0);
      expect(x.thickness).toBeGreaterThan(0);
    }
  }
});
it("guards math and expires the outward gust", () => {
  expect(clamp01(NaN)).toBe(0);
  expect(smoothstep(1, 1, 1)).toBe(1);
  expect(smoothstep(1, 1, 0)).toBe(0);
  const r = createSeededRandom(1);
  for (let i = 0; i < 100; i++) {
    const n = r();
    expect(n).toBeGreaterThanOrEqual(0);
    expect(n).toBeLessThan(1);
  }
  expect(gustField(1).radius).toBe(6.5);
  expect(gustField(4).alive).toBe(false);
  expect(gustField(4).amplitude).toBe(0);
});
