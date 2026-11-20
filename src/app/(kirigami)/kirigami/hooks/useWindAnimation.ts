'use client';

import { useEffect, useRef } from 'react';
import {
  BLOSSOM_SPAWN_ANCHORS,
  SCENE_HEIGHT,
  SCENE_WIDTH,
} from '../src/utils/sceneCoordinates';
import { PetalParticleState, stepPetalParticle } from '../src/utils/paperGeometry';
import type { PointerPosition } from './usePaperParallax';

export interface WindAnimatedRefs {
  blossomUpperRightMain: SVGGElement | null;
  blossomUpperRightTwigA: SVGGElement | null;
  blossomUpperRightTwigB: SVGGElement | null;
  blossomMidLeftMain: SVGGElement | null;
  blossomMidLeftTwig: SVGGElement | null;
  blossomLowerRightMain: SVGGElement | null;
  blossomLowerRightTwig: SVGGElement | null;
  cloudGroups: Array<SVGGElement | null>;
  bambooGroups: Array<SVGGElement | null>;
  grassGroups: Array<SVGGElement | null>;
  pineTips: Array<SVGGElement | null>;
  petalNodes: Array<SVGGElement | null>;
}

interface UseWindAnimationOptions {
  ambientEnabled: boolean;
  petalsEnabled: boolean;
  windIntensity: number;
  interactive: boolean;
  reducedMotion: boolean;
  getTargets: () => WindAnimatedRefs;
  getPointer: () => PointerPosition;
  onFpsSample?: (fps: number) => void;
}

export const PETAL_POOL_SIZE = 16;

function setSvgTransform(el: SVGGElement | null, value: string) {
  if (el) el.style.setProperty('transform', value);
}

function setSvgOpacity(el: SVGGElement | null, value: string) {
  if (el) el.style.setProperty('opacity', value);
}

function createInitialPetals(): PetalParticleState[] {
  const petals: PetalParticleState[] = [];
  for (let i = 0; i < PETAL_POOL_SIZE; i++) {
    const anchorIdx = i % BLOSSOM_SPAWN_ANCHORS.length;
    const anchor = BLOSSOM_SPAWN_ANCHORS[anchorIdx];
    const driftStep = (i * 41) % 340;
    petals.push({
      id: i,
      x: anchor.x - driftStep * 0.52 + ((i * 23) % 24) - 12,
      y: anchor.y + driftStep * 0.78,
      vx: -14 - (i % 5) * 4.5,
      vy: 22 + (i % 4) * 6.5,
      rotation: (i * 53) % 360,
      vRot: (i % 2 === 0 ? 1 : -1) * (22 + (i % 4) * 9),
      scale: (0.72 + (i % 4) * 0.16) * anchor.scale,
      phase: i * 0.85,
      opacity: 0.9,
      anchorIndex: anchorIdx,
    });
  }
  return petals;
}

/**
 * Procedural living-paper animation loop using multi-frequency wind oscillations,
 * hierarchical cherry blossom branch flexing, subtle cloud drift, vegetation sway,
 * and a pooled SVG falling sakura petal simulation.
 */
export function useWindAnimation({
  ambientEnabled,
  petalsEnabled,
  windIntensity,
  interactive,
  reducedMotion,
  getTargets,
  getPointer,
  onFpsSample,
}: UseWindAnimationOptions) {
  const petalsRef = useRef<PetalParticleState[]>(createInitialPetals());
  const fpsCallbackRef = useRef(onFpsSample);
  const targetsGetterRef = useRef(getTargets);
  const pointerGetterRef = useRef(getPointer);

  useEffect(() => {
    fpsCallbackRef.current = onFpsSample;
    targetsGetterRef.current = getTargets;
    pointerGetterRef.current = getPointer;
  }, [onFpsSample, getTargets, getPointer]);

  useEffect(() => {
    if (reducedMotion || (!ambientEnabled && !petalsEnabled)) {
      const r = targetsGetterRef.current();
      const clearList = [
        r.blossomUpperRightMain,
        r.blossomUpperRightTwigA,
        r.blossomUpperRightTwigB,
        r.blossomMidLeftMain,
        r.blossomMidLeftTwig,
        r.blossomLowerRightMain,
        r.blossomLowerRightTwig,
        ...r.bambooGroups,
        ...r.grassGroups,
        ...r.pineTips,
      ];
      for (const el of clearList) {
        setSvgTransform(el, '');
      }
      if (!petalsEnabled) {
        for (const pEl of r.petalNodes) {
          setSvgOpacity(pEl, '0');
        }
      }
      return;
    }

    let rafId = 0;
    let lastTime = performance.now();
    let elapsed = 0;
    let frameCount = 0;
    let fpsTimer = lastTime;

    let pointerInfluenceLeft = 0;
    let pointerInfluenceRight = 0;

    const tick = (now: number) => {
      const dtMs = Math.min(50, Math.max(0, now - lastTime));
      const dt = dtMs / 1000;
      lastTime = now;
      elapsed += dt;

      frameCount += 1;
      if (now - fpsTimer >= 600) {
        const fps = Math.round((frameCount * 1000) / (now - fpsTimer));
        fpsCallbackRef.current?.(Math.min(120, Math.max(1, fps)));
        frameCount = 0;
        fpsTimer = now;
      }

      const r = targetsGetterRef.current();
      const w = Math.max(0, windIntensity);

      if (ambientEnabled) {
        const gust = 1 + 0.42 * Math.sin(elapsed * 0.37) * Math.sin(elapsed * 0.19 + 1.1);
        const effWind = w * gust;

        const ptr = pointerGetterRef.current();
        const px = ptr.normX;
        const py = ptr.normY;
        const targetRightProx =
          interactive && px > 0.25 ? (px - 0.25) * (1 - Math.abs(py) * 0.4) * 2.1 : 0;
        const targetLeftProx =
          interactive && px < -0.25 ? (px + 0.25) * (1 - Math.abs(py) * 0.4) * 2.1 : 0;
        pointerInfluenceRight += (targetRightProx - pointerInfluenceRight) * 0.06;
        pointerInfluenceLeft += (targetLeftProx - pointerInfluenceLeft) * 0.06;

        // 1. Hierarchical cherry blossom branch movement
        const urMainRot =
          (Math.sin(elapsed * 0.85) * 1.15 + Math.sin(elapsed * 0.42 + 0.6) * 0.65) * effWind +
          pointerInfluenceRight;
        const urTwigARot =
          (Math.sin(elapsed * 1.35 + 0.9) * 1.85 + Math.cos(elapsed * 0.72) * 0.75) * effWind +
          pointerInfluenceRight * 0.7;
        const urTwigBRot =
          (Math.sin(elapsed * 1.55 + 2.1) * 2.1 + Math.sin(elapsed * 0.88) * 0.65) * effWind +
          pointerInfluenceRight * 0.85;

        setSvgTransform(r.blossomUpperRightMain, `rotate(${urMainRot.toFixed(2)}deg)`);
        setSvgTransform(r.blossomUpperRightTwigA, `rotate(${urTwigARot.toFixed(2)}deg)`);
        setSvgTransform(r.blossomUpperRightTwigB, `rotate(${urTwigBRot.toFixed(2)}deg)`);

        const mlMainRot =
          (Math.sin(elapsed * 0.78 + 1.8) * 1.25 + Math.cos(elapsed * 0.39) * 0.6) * effWind +
          pointerInfluenceLeft;
        const mlTwigRot = Math.sin(elapsed * 1.48 + 2.7) * 2.0 * effWind + pointerInfluenceLeft * 0.8;
        setSvgTransform(r.blossomMidLeftMain, `rotate(${mlMainRot.toFixed(2)}deg)`);
        setSvgTransform(r.blossomMidLeftTwig, `rotate(${mlTwigRot.toFixed(2)}deg)`);

        const lrMainRot =
          (Math.sin(elapsed * 0.92 + 3.4) * 1.1 + Math.sin(elapsed * 0.45) * 0.5) * effWind +
          pointerInfluenceRight * 0.65;
        const lrTwigRot = Math.sin(elapsed * 1.62 + 0.5) * 1.85 * effWind + pointerInfluenceRight * 0.6;
        setSvgTransform(r.blossomLowerRightMain, `rotate(${lrMainRot.toFixed(2)}deg)`);
        setSvgTransform(r.blossomLowerRightTwig, `rotate(${lrTwigRot.toFixed(2)}deg)`);

        // 2. Subtle ornamental paper cloud drift
        const cloudSpeeds = [0.22, 0.16, 0.25, 0.19];
        const cloudAmps = [14, 10, 16, 11];
        for (let i = 0; i < r.cloudGroups.length; i++) {
          const speed = cloudSpeeds[i % cloudSpeeds.length];
          const amp = cloudAmps[i % cloudAmps.length] * Math.max(0.35, w);
          const dx = Math.sin(elapsed * speed + i * 1.7) * amp;
          const dy = Math.cos(elapsed * (speed * 0.7) + i * 2.3) * (amp * 0.16);
          setSvgTransform(r.cloudGroups[i], `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`);
        }

        // 3. Bamboo, grasses & pine tips sway
        for (let i = 0; i < r.bambooGroups.length; i++) {
          const rot = Math.sin(elapsed * (1.05 + i * 0.18) + i * 1.4) * 1.45 * effWind;
          setSvgTransform(r.bambooGroups[i], `rotate(${rot.toFixed(2)}deg)`);
        }
        for (let i = 0; i < r.grassGroups.length; i++) {
          const rot = Math.sin(elapsed * (1.35 + (i % 4) * 0.24) + i * 1.15) * 2.1 * effWind;
          setSvgTransform(r.grassGroups[i], `rotate(${rot.toFixed(2)}deg)`);
        }
        for (let i = 0; i < r.pineTips.length; i++) {
          const rot = Math.sin(elapsed * (0.65 + i * 0.12) + i * 2.0) * 0.75 * effWind;
          setSvgTransform(r.pineTips[i], `rotate(${rot.toFixed(2)}deg)`);
        }
      }

      // 4. Pooled falling sakura petals
      if (petalsEnabled) {
        const pool = petalsRef.current;
        for (let i = 0; i < pool.length; i++) {
          const updated = stepPetalParticle(
            pool[i],
            dt,
            Math.max(0.3, w),
            elapsed,
            BLOSSOM_SPAWN_ANCHORS,
            { width: SCENE_WIDTH, height: SCENE_HEIGHT }
          );
          pool[i] = updated;
          const node = r.petalNodes[i];
          if (node) {
            const tumbleX = 0.55 + 0.45 * Math.abs(Math.cos(elapsed * 2.4 + updated.phase));
            node.setAttribute(
              'transform',
              `translate(${updated.x.toFixed(1)}, ${updated.y.toFixed(1)}) rotate(${updated.rotation.toFixed(1)}) scale(${(updated.scale * tumbleX).toFixed(2)}, ${updated.scale.toFixed(2)})`
            );
            setSvgOpacity(node, String(updated.opacity));
          }
        }
      } else {
        for (const pEl of r.petalNodes) {
          setSvgOpacity(pEl, '0');
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [ambientEnabled, petalsEnabled, windIntensity, interactive, reducedMotion]);
}
