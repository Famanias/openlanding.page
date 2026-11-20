'use client';

import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';

export interface AmbientTargets {
  sunWashRef: RefObject<SVGElement | HTMLDivElement | null>;
  cloudWashRef: RefObject<HTMLDivElement | null>;
  vegetationContainerRef: RefObject<SVGSVGElement | null>;
  travelerCloakRef: RefObject<SVGGElement | null>;
}

/**
 * Coordinates smooth GSAP entrance & subtle atmospheric settle on mount / toggle.
 * Continuous meditative vegetation sway and cloak flutter run via compositor-only
 * CSS keyframes (controlled via data-ambient="playing|paused") so the main thread
 * stays completely idle and responsive on all hardware.
 */
export function useAmbientMotion(
  targets: AmbientTargets,
  playing: boolean,
  reducedMotion: boolean
) {
  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      if (targets.sunWashRef.current) {
        gsap.to(targets.sunWashRef.current, {
          opacity: playing ? 1 : 0.96,
          duration: 0.9,
          ease: 'power2.out',
        });
      }
      if (targets.cloudWashRef.current) {
        gsap.to(targets.cloudWashRef.current, {
          x: playing ? 8 : 0,
          duration: 1.8,
          ease: 'sine.inOut',
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, [playing, reducedMotion, targets.sunWashRef, targets.cloudWashRef]);
}
