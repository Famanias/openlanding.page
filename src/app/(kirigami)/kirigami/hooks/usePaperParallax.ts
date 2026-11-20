'use client';

import { useEffect, useRef } from 'react';
import {
  DEPTH_LAYERS,
  DepthLayerId,
  computeLayerParallaxOffset,
} from '../src/utils/sceneCoordinates';

export interface PointerPosition {
  normX: number; // -1 to 1
  normY: number; // -1 to 1
  clientX: number;
  clientY: number;
}

interface UsePaperParallaxOptions {
  enabled: boolean;
  strength: number;
  reducedMotion: boolean;
  getLayerElements: () => Partial<Record<DepthLayerId, SVGGElement | null>>;
  onPointerChange: (pos: PointerPosition) => void;
}

function setNodeTransform(node: SVGGElement, value: string) {
  node.style.setProperty('transform', value);
}

/**
 * Exponentially damped 2.5D pointer parallax that directly updates SVG layer transforms
 * without triggering React re-renders or redundant style writes when settled.
 */
export function usePaperParallax({
  enabled,
  strength,
  reducedMotion,
  getLayerElements,
  onPointerChange,
}: UsePaperParallaxOptions) {
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const getLayersCb = useRef(getLayerElements);
  const pointerCb = useRef(onPointerChange);

  useEffect(() => {
    getLayersCb.current = getLayerElements;
    pointerCb.current = onPointerChange;
  }, [getLayerElements, onPointerChange]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const nx = (e.clientX / w) * 2 - 1;
      const ny = (e.clientY / h) * 2 - 1;
      targetRef.current.x = nx;
      targetRef.current.y = ny;
      pointerCb.current({
        normX: nx,
        normY: ny,
        clientX: e.clientX,
        clientY: e.clientY,
      });
    };

    const handlePointerLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    let rafId = 0;
    const damping = 0.08;
    const layerIds = Object.keys(DEPTH_LAYERS).map(Number) as DepthLayerId[];
    const lastWritten: Partial<Record<DepthLayerId, string>> = {};

    const applyTransforms = (nx: number, ny: number, effStrength: number) => {
      const layers = getLayersCb.current();
      for (const id of layerIds) {
        const el = layers[id];
        if (!el) continue;
        const { tx, ty } = computeLayerParallaxOffset(id, nx, ny, effStrength);
        const nextStr = tx === 0 && ty === 0 ? '' : `translate3d(${tx}px, ${ty}px, 0)`;
        if (lastWritten[id] !== nextStr) {
          setNodeTransform(el, nextStr);
          lastWritten[id] = nextStr;
        }
      }
    };

    if (!enabled || reducedMotion || strength <= 0.001) {
      currentRef.current = { x: 0, y: 0 };
      applyTransforms(0, 0, 0);
      return;
    }

    const tick = () => {
      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      if (Math.abs(dx) > 0.0008 || Math.abs(dy) > 0.0008) {
        currentRef.current.x += dx * damping;
        currentRef.current.y += dy * damping;
        applyTransforms(currentRef.current.x, currentRef.current.y, strength);
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [enabled, strength, reducedMotion]);
}
