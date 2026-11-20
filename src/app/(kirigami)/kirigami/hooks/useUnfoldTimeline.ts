'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { clamp01 } from '../src/utils/unfoldMath';

export interface UnfoldTargetRefs {
  sun: SVGGElement | null;
  clouds: SVGGElement | null;
  farMountains: SVGGElement | null;
  midMountains: SVGGElement | null;
  riverValley: SVGGElement | null;
  terraces: SVGGElement | null;
  villageHouses: SVGGElement | null;
  toriiGate: SVGGElement | null;
  midTrees: SVGGElement | null;
  foregroundRocks: SVGGElement | null;
  cherryBlossomsLeft: SVGGElement | null;
  cherryBlossomsRight: SVGGElement | null;
}

interface UseUnfoldTimelineOptions {
  unfoldProgress: number; // 0 to 1
  targetsRef: React.MutableRefObject<UnfoldTargetRefs>;
  reducedMotion: boolean;
}

/**
 * GSAP master pop-up unfolding timeline.
 * Progress 0 = compressed folded paper landscape.
 * Progress 0.25-0.65 = staggered hinged rising of mountains, terraces, houses, torii, trees, and rocks.
 * Progress 1 = exact full reference paper-cut world.
 */
export function useUnfoldTimeline({
  unfoldProgress,
  targetsRef,
  reducedMotion,
}: UseUnfoldTimelineOptions) {
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const t = targetsRef.current;

    // Build a deterministic paused GSAP timeline normalized over duration 1.0
    const tl = gsap.timeline({ paused: true });

    if (t.sun) {
      tl.fromTo(
        t.sun,
        { y: 115, scaleY: 0.78, scaleX: 0.92, transformOrigin: '50% 100%' },
        { y: 0, scaleY: 1, scaleX: 1, duration: 0.55, ease: 'power3.out' },
        0.0
      );
    }

    if (t.clouds) {
      tl.fromTo(
        t.clouds,
        { y: 58, x: -20, scaleY: 0.7, rotate: -1.8, transformOrigin: '50% 50%' },
        { y: 0, x: 0, scaleY: 1, rotate: 0, duration: 0.65, ease: 'power2.out' },
        0.05
      );
    }

    if (t.farMountains) {
      tl.fromTo(
        t.farMountains,
        { y: 145, scaleY: 0.58, transformOrigin: '50% 100%' },
        { y: 0, scaleY: 1, duration: 0.62, ease: 'power3.out' },
        0.0
      );
    }

    if (t.midMountains) {
      tl.fromTo(
        t.midMountains,
        { y: 175, scaleY: 0.52, transformOrigin: '50% 100%' },
        { y: 0, scaleY: 1, duration: 0.66, ease: 'power3.out' },
        0.08
      );
    }

    if (t.riverValley) {
      tl.fromTo(
        t.riverValley,
        { y: 80, scaleY: 0.82, transformOrigin: '50% 100%' },
        { y: 0, scaleY: 1, duration: 0.62, ease: 'power2.out' },
        0.06
      );
    }

    if (t.terraces) {
      tl.fromTo(
        t.terraces,
        { y: 105, x: 42, scaleY: 0.62, rotate: 2.8, transformOrigin: '100% 100%' },
        { y: 0, x: 0, scaleY: 1, rotate: 0, duration: 0.65, ease: 'power3.out' },
        0.14
      );
    }

    if (t.villageHouses) {
      tl.fromTo(
        t.villageHouses,
        { y: 46, scaleY: 0.24, scaleX: 0.93, skewX: -6, transformOrigin: '50% 100%' },
        { y: 0, scaleY: 1, scaleX: 1, skewX: 0, duration: 0.64, ease: 'back.out(1.25)' },
        0.22
      );
    }

    if (t.toriiGate) {
      tl.fromTo(
        t.toriiGate,
        { y: 38, scaleY: 0.18, rotate: 6, transformOrigin: '50% 100%' },
        { y: 0, scaleY: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.35)' },
        0.26
      );
    }

    if (t.midTrees) {
      tl.fromTo(
        t.midTrees,
        { y: 82, scaleY: 0.4, rotate: -3.2, transformOrigin: '50% 100%' },
        { y: 0, scaleY: 1, rotate: 0, duration: 0.68, ease: 'back.out(1.15)' },
        0.2
      );
    }

    if (t.foregroundRocks) {
      tl.fromTo(
        t.foregroundRocks,
        { y: 165, scaleY: 0.54, transformOrigin: '50% 100%' },
        { y: 0, scaleY: 1, duration: 0.7, ease: 'power3.out' },
        0.18
      );
    }

    if (t.cherryBlossomsLeft) {
      tl.fromTo(
        t.cherryBlossomsLeft,
        { x: -135, y: -32, rotate: -18, scale: 0.78, transformOrigin: '0% 35%' },
        { x: 0, y: 0, rotate: 0, scale: 1, duration: 0.68, ease: 'back.out(1.1)' },
        0.28
      );
    }

    if (t.cherryBlossomsRight) {
      tl.fromTo(
        t.cherryBlossomsRight,
        { x: 145, y: -36, rotate: 18, scale: 0.78, transformOrigin: '100% 30%' },
        { x: 0, y: 0, rotate: 0, scale: 1, duration: 0.68, ease: 'back.out(1.1)' },
        0.28
      );
    }

    tl.progress(reducedMotion ? 1 : clamp01(unfoldProgress));
    tlRef.current = tl;

    return () => {
      tl.kill();
      tlRef.current = null;
    };
    // Build once on mount; progress updates are driven below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    tl.progress(reducedMotion ? 1 : clamp01(unfoldProgress));
  }, [unfoldProgress, reducedMotion]);
}
