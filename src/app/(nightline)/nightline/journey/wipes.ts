export const MAX_WIPES = 32;
const MIN_LENGTH = 0.004;

export type Wipes = { starts: Float32Array; ends: Float32Array; cursor: number };
type Point = { x: number; y: number };

export function createWipes(): Wipes {
  return { starts: new Float32Array(MAX_WIPES * 4), ends: new Float32Array(MAX_WIPES * 2), cursor: 0 };
}

/** Records one pointer segment (x, y in 0..1, y up) as a ring buffer the shader re-fogs over time. */
export function pushWipe(wipes: Wipes, from: Point, to: Point, time: number) {
  if (Math.hypot(to.x - from.x, to.y - from.y) < MIN_LENGTH) return false;
  const i = wipes.cursor;
  wipes.starts.set([from.x, from.y, time, 1], i * 4);
  wipes.ends.set([to.x, to.y], i * 2);
  wipes.cursor = (i + 1) % MAX_WIPES;
  return true;
}
