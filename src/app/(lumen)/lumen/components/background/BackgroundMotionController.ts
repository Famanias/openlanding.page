import { useEffect, useState } from 'react';

export interface ScrollAtmosphereState {
  scrollProgress: number; // 0..1 across full document
  parallaxOffsetY: number; // subtle vertical parallax in px
  refractionModulation: number; // gentle optical modulation across scroll
}

/**
 * Pure calculation of environmental scroll state for deterministic unit testing
 * and smooth runtime updates.
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
 * Single global environmental motion hook that tracks document scroll progress
 * passively without competing with content ScrollTrigger timelines.
 */
export function useBackgroundMotionController(): ScrollAtmosphereState {
  const [state, setState] = useState<ScrollAtmosphereState>({
    scrollProgress: 0,
    parallaxOffsetY: 0,
    refractionModulation: 1.0,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const docEl = document.documentElement;
      const maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
      const nextState = computeScrollAtmosphereState(
        window.scrollY || window.pageYOffset || 0,
        maxScroll,
        prefersReducedMotion
      );
      setState(nextState);
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return state;
}
