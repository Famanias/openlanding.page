import { it, expect } from "vitest";
import { atmosphereAtProgress } from "./atmosphere";
import { getChapterStateAtProgress, REST_POINTS } from "./chapters";
import { computeTimeOfDay } from "./timeOfDay";
const numbers = (v: unknown): number[] =>
  typeof v === "number"
    ? [v]
    : v && typeof v === "object"
      ? Object.values(v).flatMap(numbers)
      : [];
it("keeps the horizon and fog identical, finite and continuous across every seam", () => {
  const day = computeTimeOfDay(0.75);
  let prev = atmosphereAtProgress(getChapterStateAtProgress(0), day, 0);
  for (let i = 0; i <= 2000; i++) {
    const s = getChapterStateAtProgress(i / 2000),
      a = atmosphereAtProgress(s, day, s.rainIntensity);
    expect(a.background).toEqual(a.fogColor);
    expect(a.fogDensity).toBeGreaterThan(0);
    expect(a.fogDensity).toBeLessThan(0.2);
    numbers(a).forEach((n) => expect(Number.isFinite(n)).toBe(true));
    expect(a.key.intensity).toBeGreaterThanOrEqual(0);
    const aa = numbers(a),
      bb = numbers(prev);
    aa.forEach((v, k) => expect(Math.abs(v - bb[k])).toBeLessThan(0.4));
    prev = a;
  }
  for (const p of REST_POINTS) {
    const a = atmosphereAtProgress(getChapterStateAtProgress(p), day, 0);
    expect(a.exposure).toBeGreaterThan(0.6);
  }
});
it("makes daylight a real change to paper, sky, lanterns and exposure", () => {
  const s = getChapterStateAtProgress(0.72),
    a = atmosphereAtProgress(s, computeTimeOfDay(0), 1),
    b = atmosphereAtProgress(s, computeTimeOfDay(1), 1);
  expect(a.background).not.toEqual(b.background);
  expect(a.accent.intensity).toBeGreaterThan(b.accent.intensity);
  expect(b.key.intensity).toBeGreaterThan(a.key.intensity);
});
