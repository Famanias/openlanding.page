import { clamp01, createSeededRandom, type Vec3 } from "./rng";
export type Fibre = {
  position: Vec3;
  layer: number;
  length: number;
  thickness: number;
  curl: number;
  phase: number;
  oilArrival: number;
  angle: number;
};
export function generateFibres(seed = 481, count = 1500): Fibre[] {
  const r = createSeededRandom(seed);
  return Array.from({ length: count }, (_, i) => {
    const layer = Math.floor((i * 6) / count);
    return {
      position: [(r() - 0.5) * 2.8, (r() - 0.5) * 2.8, -layer * 0.11] as Vec3,
      layer,
      length: 0.18 + r() * 0.6,
      thickness: 0.0015 + r() * 0.004,
      curl: (r() - 0.5) * 0.18,
      phase: r() * Math.PI * 2,
      oilArrival: (layer + r() * 0.85) / 6,
      angle: r() * Math.PI * 2,
    };
  });
}
export function generateRain(seed = 2026, count = 6000) {
  const r = createSeededRandom(seed),
    data = new Float32Array(count * 5);
  for (let i = 0; i < count; i++)
    data.set(
      [(r() - 0.5) * 26, (r() - 0.5) * 26, 3 + r() * 6, r(), 0.08 + r() * 0.24],
      i * 5,
    );
  return data;
}
export function generateMotes(seed = 91, count = 180) {
  const r = createSeededRandom(seed),
    data = new Float32Array(count * 7);
  for (let i = 0; i < count; i++)
    data.set(
      [
        (r() - 0.5) * 15,
        r() * 8 - 2.2,
        (r() - 0.5) * 15,
        (r() - 0.5) * 0.2,
        0.03 + r() * 0.08,
        (r() - 0.5) * 0.2,
        r() * 6.28,
      ],
      i * 7,
    );
  return data;
}
export function gustField(age: number, distance = 0) {
  const t = clamp01(age / 3.6),
    radius = Math.max(0, Math.min(3.6, age)) * 6.5;
  const amplitude =
    age >= 0 && age < 3.6
      ? Math.sin(Math.PI * t) * Math.exp(-Math.pow((distance - radius) / 2, 2))
      : 0;
  return { radius, amplitude, alive: age >= 0 && age < 3.6 };
}
