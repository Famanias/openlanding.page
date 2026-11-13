'use client';

import { useEffect, useState } from 'react';

export interface EnvironmentCapabilities {
  ready: boolean;
  prefersReducedMotion: boolean;
  isCoarsePointer: boolean;
  isNarrowViewport: boolean;
  saveData: boolean;
  shouldAutoStart3D: boolean;
}

const DEFAULT_CAPABILITIES: EnvironmentCapabilities = {
  ready: false,
  prefersReducedMotion: false,
  isCoarsePointer: false,
  isNarrowViewport: false,
  saveData: false,
  shouldAutoStart3D: false,
};

export function useMotionPreference(): EnvironmentCapabilities {
  const [caps, setCaps] = useState<EnvironmentCapabilities>(DEFAULT_CAPABILITIES);

  useEffect(() => {
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const narrowQuery = window.matchMedia('(max-width: 899px)');

    const readCaps = () => {
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      const saveData = Boolean(conn?.saveData);
      const prefersReducedMotion = reducedQuery.matches;
      const isCoarsePointer = coarseQuery.matches;
      const isNarrowViewport = narrowQuery.matches;
      const shouldAutoStart3D = !prefersReducedMotion && !saveData;

      setCaps({
        ready: true,
        prefersReducedMotion,
        isCoarsePointer,
        isNarrowViewport,
        saveData,
        shouldAutoStart3D,
      });
    };

    readCaps();

    reducedQuery.addEventListener('change', readCaps);
    coarseQuery.addEventListener('change', readCaps);
    narrowQuery.addEventListener('change', readCaps);

    return () => {
      reducedQuery.removeEventListener('change', readCaps);
      coarseQuery.removeEventListener('change', readCaps);
      narrowQuery.removeEventListener('change', readCaps);
    };
  }, []);

  return caps;
}
