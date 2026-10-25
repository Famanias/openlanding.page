export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** 0 at `from`, 1 at `to`, clamped. Works in either direction. */
export const progress = (v: number, from: number, to: number) => (from === to ? 0 : clamp((v - from) / (to - from)));

export const smoothstep = (t: number) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};

/** Index of a child inside a staggered group, capped so long lists never wait more than `cap` steps. */
export const staggerIndex = (i: number, cap = 8) => Math.min(Math.max(0, Math.floor(i)), cap);

/** Delay in ms for child `i` of a stagger, never exceeding `maxTotal`. */
export const staggerDelay = (i: number, step = 70, maxTotal = 600) => Math.min(staggerIndex(i, 99) * step, maxTotal);

/** Eased tween value for count-ups: easeOutExpo-like. */
export const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * clamp(t)));

/** Tilt in degrees for a pointer at (px, py) in 0..1 across a card, centred on 0.5, limited to ±max. */
export const tiltAngles = (px: number, py: number, max = 6) => ({
  rx: lerp(max, -max, clamp(py)),
  ry: lerp(-max, max, clamp(px)),
});

/**
 * How far the viewport has travelled through a tall pinned section: 0 when its top reaches the top of the
 * viewport, 1 when its bottom reaches the bottom. `top` and `height` are the section's page offset and size.
 */
export const sectionProgress = (scrollY: number, top: number, height: number, viewportH: number) =>
  progress(scrollY, top, top + Math.max(0, height - viewportH));

/**
 * Maps linear scroll progress to a stop-space value 0..(stops-1) that lingers on every stop: each segment
 * between stops is eased, so the page seems to arrive, settle and then leave.
 */
export const dwell = (p: number, stops: number) => {
  if (stops < 2) return 0;
  const raw = clamp(p) * (stops - 1);
  const base = Math.min(Math.floor(raw), stops - 2);
  return base + smoothstep(smoothstep(raw - base));
};

/** The stop nearest to a stop-space value. */
export const nearestStop = (s: number, stops: number) => clamp(Math.round(s), 0, Math.max(0, stops - 1));
