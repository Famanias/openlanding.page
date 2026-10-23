export type StageMetrics = {
  /** The launch section's `getBoundingClientRect().top`. */
  top: number;
  /** The launch section's full height. */
  height: number;
  /** `window.innerHeight`. */
  viewport: number;
};

export const clamp01 = (n: number): number => Math.min(1, Math.max(0, n));

/** 0 when the sticky stage pins, 1 when it lets go. */
export function stageProgress({ top, height, viewport }: StageMetrics): number {
  const travel = height - viewport;
  if (travel <= 0) return 0;
  return clamp01(-top / travel);
}

/** Which of `count` scenes owns progress `p`. */
export function sceneAt(p: number, count: number): number {
  if (count <= 0) return 0;
  return Math.min(count - 1, Math.max(0, Math.floor(clamp01(p) * count)));
}

/** The scroll distance past the pin that lands in the middle of scene `index`. */
export function sceneOffset(index: number, count: number, { height, viewport }: Pick<StageMetrics, "height" | "viewport">): number {
  const travel = Math.max(0, height - viewport);
  return ((index + 0.5) / count) * travel;
}
