export interface ScrollAtmosphereState {
  scrollProgress: number; // 0..1 across full document
  parallaxOffsetY: number; // subtle vertical parallax in px
  refractionModulation: number; // gentle optical modulation across scroll
}

/**
 * Pure calculation of environmental scroll state for deterministic unit testing.
 * Retained for backward compatibility with existing tests.
 */
export function computeScrollAtmosphereState(
  scrollY: number,
  maxScroll: number,
  reducedMotion = false
): ScrollAtmosphereState {
  const safeMax = Math.max(1, maxScroll);
  const clampedScroll = Math.max(0, Math.min(safeMax, scrollY));
  const scrollProgress = clampedScroll / safeMax;

  if (reducedMotion) {
    return {
      scrollProgress,
      parallaxOffsetY: 0,
      refractionModulation: 1.0,
    };
  }

  // Subtle slow environmental parallax (moves much slower than foreground content)
  const parallaxOffsetY = -clampedScroll * 0.045 || 0;
  const refractionModulation = 0.92 + Math.sin(scrollProgress * Math.PI) * 0.16;

  return {
    scrollProgress,
    parallaxOffsetY,
    refractionModulation,
  };
}

/**
 * Stable non-reactive fallback.
 * Live scroll DOM mutations are handled without React re-renders by LumenMotion.
 */
export function useBackgroundMotionController(): ScrollAtmosphereState {
  return {
    scrollProgress: 0,
    parallaxOffsetY: 0,
    refractionModulation: 1.0,
  };
}
