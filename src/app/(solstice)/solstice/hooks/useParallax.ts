'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { PointerOffset } from '../utils/sceneLayout';

export interface ParallaxPointerState {
  /** Current smoothly damped normalized pointer (-1..1) */
  current: PointerOffset;
  /** Viewport normalized pointer (0..1) for paint-reveal interaction */
  uv: { x: number; y: number };
  /** Whether pointer is actively hovering inside the viewport */
  active: boolean;
}

/**
 * Smooth GSAP-damped pointer parallax hook.
 * Mutates a ref and notifies subscribers without causing React re-renders on pointermove.
 */
export function useParallax(
  enabled: boolean,
  reducedMotion: boolean,
  onUpdate: (state: ParallaxPointerState) => void
) {
  const onUpdateRef = useRef(onUpdate);
  const stateRef = useRef<ParallaxPointerState>({
    current: { x: 0, y: 0 },
    uv: { x: 0.65, y: 0.55 },
    active: false,
  });

  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  useEffect(() => {
    const state = stateRef.current;
    const target = { x: 0, y: 0, u: 0.65, v: 0.55 };

    const quickX = gsap.quickTo(state.current, 'x', {
      duration: 0.95,
      ease: 'power3.out',
      onUpdate: () => onUpdateRef.current(state),
    });
    const quickY = gsap.quickTo(state.current, 'y', {
      duration: 0.95,
      ease: 'power3.out',
    });
    const quickU = gsap.quickTo(state.uv, 'x', {
      duration: 0.65,
      ease: 'power2.out',
      onUpdate: () => onUpdateRef.current(state),
    });
    const quickV = gsap.quickTo(state.uv, 'y', {
      duration: 0.65,
      ease: 'power2.out',
    });

    if (!enabled || reducedMotion) {
      quickX(0);
      quickY(0);
      state.active = false;
      onUpdateRef.current(state);
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const u = Math.max(0, Math.min(1, e.clientX / w));
      const v = Math.max(0, Math.min(1, e.clientY / h));

      target.x = (u - 0.5) * 2;
      target.y = (v - 0.5) * 2;
      target.u = u;
      target.v = v;

      state.active = true;
      quickX(target.x);
      quickY(target.y);
      quickU(target.u);
      quickV(target.v);
    };

    const handlePointerLeave = () => {
      state.active = false;
      quickX(0);
      quickY(0);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      gsap.killTweensOf(state.current);
      gsap.killTweensOf(state.uv);
    };
  }, [enabled, reducedMotion]);

  return stateRef;
}
