/**
 * When may the live light (WebGL) start?
 * - never under prefers-reduced-motion: the rooms stay as still posters;
 * - on desktop (fine pointer, wide): when the browser is idle after load;
 * - on touch screens and phones: only after the visitor taps "Turn the lights on".
 */

export type Environment = {
  reducedMotion: boolean;
  coarsePointer: boolean;
  width: number;
  webgl2: boolean;
};

export type StartPolicy = "never" | "idle" | "tap";

export function startPolicy(env: Environment): StartPolicy {
  if (env.reducedMotion || !env.webgl2) return "never";
  if (env.coarsePointer || env.width < 900) return "tap";
  return "idle";
}

/** Device-pixel scale for the light canvas: the field is soft, so half resolution is plenty. */
export function renderScale(devicePixelRatio: number, width: number): number {
  const base = width > 1800 ? 0.4 : 0.5;
  return Math.min(1, base * Math.max(1, Math.min(devicePixelRatio, 2)));
}
