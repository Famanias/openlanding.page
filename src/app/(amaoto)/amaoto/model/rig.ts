/** Local metres. Solve the rigid linkage before applying visual separation. */
export const HUB_Y = 1.7;
export const RIB_COUNT = 40;
export const RIB_LENGTH = 2.25;
export const ATTACH = 1.02;
export const LINK_LENGTH = 1.12;
export const SKIN_OFFSET = 0.019;
export type Point = { x: number; y: number; z: number };
export const clamp01 = (n: number) =>
  Math.max(0, Math.min(1, Number.isFinite(n) ? n : 0));
export const ribAngle = (open: number) =>
  0.035 + clamp01(open) * ((Math.PI * 75) / 180 - 0.035);
export function runnerHeight(open: number) {
  const theta = ribAngle(open);
  const radius = 0.065 + ATTACH * Math.sin(theta);
  return (
    HUB_Y - ATTACH * Math.cos(theta) - Math.sqrt(LINK_LENGTH ** 2 - radius ** 2)
  );
}
export function waveOpen(open: number, index: number, spread = 0) {
  const s = clamp01(spread) * 0.28;
  return clamp01((open - (index / (RIB_COUNT - 1)) * s) / (1 - s));
}
export function ribPoint(
  open: number,
  index: number,
  t: number,
  explode = 0,
  spread = 0,
): Point {
  const theta = ribAngle(open);
  const wave = ribAngle(waveOpen(open, index, spread));
  // Only the flexible outer length waves: the shared collar and fixed links stay connected.
  const outer = Math.max(0, (t * RIB_LENGTH - ATTACH) / (RIB_LENGTH - ATTACH));
  const bend = (wave - theta) * outer * outer;
  const distance = RIB_LENGTH * t;
  const a = (index / RIB_COUNT) * Math.PI * 2;
  const bow = Math.sin(Math.PI * outer) * 0.085 * clamp01(open);
  const r = 0.065 + distance * Math.sin(theta + bend) + bow;
  return {
    x: Math.cos(a) * r,
    y:
      HUB_Y -
      distance * Math.cos(theta + bend) +
      bow * 0.85 +
      clamp01(explode) * (0.3 + 0.28 * t),
    z: Math.sin(a) * r,
  };
}
export function paperPoint(
  open: number,
  gore: number,
  t: number,
  across: number,
  explode = 0,
  spread = 0,
): Point {
  const a = ribPoint(open, gore, t, explode, spread);
  const b = ribPoint(open, (gore + 1) % RIB_COUNT, t, explode, spread);
  const fold = Math.sin(Math.PI * across);
  const pinch = 1 - fold * (0.018 * open + 0.24 * (1 - open)) * t;
  const normal = skinNormal(open, gore, across);
  return {
    x: (a.x + (b.x - a.x) * across) * pinch + normal.x * SKIN_OFFSET,
    y:
      a.y +
      (b.y - a.y) * across +
      normal.y * SKIN_OFFSET -
      fold * 0.018 * open * t,
    z: (a.z + (b.z - a.z) * across) * pinch + normal.z * SKIN_OFFSET,
  };
}
function skinNormal(open: number, gore: number, across: number): Point {
  const angle = ((gore + across) / RIB_COUNT) * Math.PI * 2;
  const theta = ribAngle(open);
  return {
    x: Math.cos(angle) * Math.cos(theta),
    y: Math.sin(theta),
    z: Math.sin(angle) * Math.cos(theta),
  };
}
export function rimPoint(
  open: number,
  gore: number,
  across: number,
  explode = 0,
  spread = 0,
): Point {
  const point = paperPoint(open, gore, 1, across, explode, spread);
  const normal = skinNormal(open, gore, across);
  point.x -= normal.x * SKIN_OFFSET;
  point.y -= normal.y * SKIN_OFFSET;
  point.z -= normal.z * SKIN_OFFSET;
  return point;
}
export function solveRig(open: number, explode = 0, spread = 0) {
  return {
    open: clamp01(open),
    runner: { x: 0, y: runnerHeight(open), z: 0 },
    ribs: Array.from({ length: RIB_COUNT }, (_, i) => ({
      hinge: ribPoint(open, i, 0, explode, spread),
      attach: ribPoint(open, i, ATTACH / RIB_LENGTH),
      tip: ribPoint(open, i, 1, explode, spread),
      rim: rimPoint(open, i, 0, explode, spread),
    })),
  };
}
