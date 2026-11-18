'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { isCoarseOrTouchDevice } from '../../lib/forum/motion';
import type { MonolithScene } from '../../lib/forum/monolithScene';

/** Horizontal placement of the slab per breakpoint, matching the plate's object-position. */
function framingFor(width: number): number {
  if (width >= 1280) return 0.7;
  if (width >= 1024) return 0.72;
  return 0.74;
}

/**
 * The real-time 2.5D monolith. It sits over the static plate (which stays the LCP image, the reduced-motion
 * state and the touch-screen state) and fades in once its first dithered frame has rendered. three.js is loaded
 * only on fine-pointer desktops, when the browser is idle.
 */
export const HeroMonolith: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion || isCoarseOrTouchDevice() || window.innerWidth < 768) return;
    let scene: MonolithScene | null = null;
    let cancelled = false;

    const onPointer = (event: PointerEvent) => {
      if (!scene) return;
      scene.setPointer(event.clientX / window.innerWidth - 0.5, event.clientY / window.innerHeight - 0.5);
    };
    const onResize = () => scene?.setFraming(framingFor(window.innerWidth));

    const start = () => {
      void import('../../lib/forum/monolithScene').then(({ createMonolithScene }) => {
        if (cancelled) return;
        try {
          scene = createMonolithScene(canvas, { onReady: () => !cancelled && setReady(true) });
          scene.setFraming(framingFor(window.innerWidth));
        } catch {
          // no WebGL: the static plate stays
          scene = null;
        }
      });
    };
    const idle = window.requestIdleCallback ? window.requestIdleCallback(start, { timeout: 1800 }) : window.setTimeout(start, 600);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', onResize);
      scene?.dispose();
      setReady(false);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-forum-monolith={ready ? 'live' : 'pending'}
      className={`absolute inset-0 h-full w-full transition-opacity duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${ready ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};
