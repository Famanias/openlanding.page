'use client';

import { useEffect, useState } from 'react';

export interface MotionPreferences {
  ready: boolean;
  prefersReducedMotion: boolean;
  isFinePointer: boolean;
  canHover: boolean;
}

const FALLBACK_PREFERENCES: MotionPreferences = {
  ready: false,
  prefersReducedMotion: true, // safe non-kinetic fallback until real media-query read
  isFinePointer: false,
  canHover: false,
};

export function useMotionPreferences(): MotionPreferences {
  const [prefs, setPrefs] = useState<MotionPreferences>(FALLBACK_PREFERENCES);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const hoverQuery = window.matchMedia('(hover: hover)');

    const update = () => {
      setPrefs({
        ready: true,
        prefersReducedMotion: reducedQuery.matches,
        isFinePointer: pointerQuery.matches,
        canHover: hoverQuery.matches,
      });
    };

    update();

    reducedQuery.addEventListener('change', update);
    pointerQuery.addEventListener('change', update);
    hoverQuery.addEventListener('change', update);

    return () => {
      reducedQuery.removeEventListener('change', update);
      pointerQuery.removeEventListener('change', update);
      hoverQuery.removeEventListener('change', update);
    };
  }, []);

  return prefs;
}
