/**
 * Lumen Motion Timings and Curves
 * Mirrors the CSS custom properties under .landing-shell in lumen.css.
 */

export const LM_DURATIONS = {
  press: 0.12, // 120ms
  feedback: 0.16, // 160ms
  select: 0.22, // 220ms
  sheet: 0.28, // 280ms
  reveal: 0.48, // 480ms
  panelEntrance: 0.52, // 520ms
  demoTotal: 1.6, // 1600ms
} as const;

export const LM_EASING = {
  // GSAP easing equivalencies
  optical: 'power3.out', // corresponds to cubic-bezier(0.16, 1, 0.3, 1)
  travel: 'power2.inOut', // corresponds to cubic-bezier(0.77, 0, 0.175, 1)
  feedback: 'power1.out', // corresponds to cubic-bezier(0.23, 1, 0.32, 1)
} as const;

/**
 * Storyboard timestamps for the Hero Glass Workspace demonstration (in seconds).
 * Total finite duration: 1.6s
 */
export const HERO_DEMO_BEATS = {
  panelsStart: 0.0,
  panelsStagger: 0.06,
  inputIdentified: 0.24,
  classifyResolved: 0.54,
  summarizeResolved: 0.84,
  routeResolved: 1.04,
  reviewSettled: 1.24,
  total: 1.6,
} as const;
