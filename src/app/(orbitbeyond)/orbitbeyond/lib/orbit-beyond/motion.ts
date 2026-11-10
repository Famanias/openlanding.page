import { useEffect, useState } from 'react';

export const MOTION_TIMINGS = {
  microHover: 0.22,
  disclosure: 0.48,
  editorialMask: 0.82,
  heroSequenceTotal: 1.45,
} as const;

export const MOTION_EASINGS = {
  cinematicOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  editorialInOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

/**
 * Shared reduced-motion hook that respects `prefers-reduced-motion: reduce`.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
