'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { detectSoftwareWebGL } from '../../lib/webgl-utils';
import { ScenicStage, type ScenicCameraPreset } from './ScenicStage';

const subscribeNoop = () => () => {};
let cachedSoftwareGl: boolean | null = null;

function getClientSoftwareGlSnapshot(): boolean {
  if (cachedSoftwareGl === null) {
    cachedSoftwareGl = detectSoftwareWebGL();
  }
  return cachedSoftwareGl;
}

function getServerSoftwareGlSnapshot(): boolean | null {
  return null;
}

export interface JapaneseScenicBackgroundProps {
  /** Optional wrapper class name (e.g. "fixed inset-0 -z-10" for future landing pages) */
  className?: string;
  /** Toggle drifting petals, mist flow, water shimmer, and gentle camera breathing */
  enableMotion?: boolean;
  /** Toggle pointer-driven 2.5D depth parallax between scenic layers */
  enableParallax?: boolean;
  /** Toggle 3D/2.5D wireframe rendering for inspecting layered geometry */
  wireframe?: boolean;
  /** Increment this counter to smoothly reset camera and pointer offset to neutral */
  resetSignal?: number;
  /** Initial phase in [0, 1) for the 30-second day-night cycle (0 = Dawn, 0.25 = Day, 0.5 = Dusk, 0.75 = Night) */
  initialCyclePhase?: number;
  /** Duration in seconds for one complete day-night cycle (default 30s) */
  cycleDuration?: number;
  /** Optional camera viewpoint preset (default hero framing or inspection angle) */
  cameraPreset?: ScenicCameraPreset;
  /** Optional callback fired once the first WebGL frame is initialized */
  onReady?: () => void;
}

/**
 * Reusable 2.5D Japanese scenic hero background component powered by
 * Three.js, React Three Fiber, and Drei.
 *
 * Designed specifically for landing-page hero sections: all prominent visual
 * anchors (sun, sacred peak, pagoda silhouette, torii gate, lantern, sakura
 * bough) are composed on the right side while keeping the left-center field
 * serene and visually quiet for headline and CTA typography.
 */
export function JapaneseScenicBackground({
  className = '',
  enableMotion = true,
  enableParallax = true,
  wireframe = false,
  resetSignal = 0,
  initialCyclePhase = 0,
  cycleDuration = 30,
  cameraPreset = 'default',
  onReady,
}: JapaneseScenicBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const invalidateRef = useRef<(() => void) | null>(null);

  const isSoftwareGl = useSyncExternalStore(
    subscribeNoop,
    getClientSoftwareGlSnapshot,
    getServerSoftwareGlSnapshot
  );
  const [contextLost, setContextLost] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  // Track pointer movement across the window for gentle, unobtrusive parallax
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!enableParallax) return;
      const nx = (e.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      const ny = -((e.clientY / Math.max(window.innerHeight, 1)) * 2 - 1);
      pointerRef.current.x = Math.max(-1, Math.min(1, nx));
      pointerRef.current.y = Math.max(-1, Math.min(1, ny));
      invalidateRef.current?.();
    };

    const handlePointerLeave = () => {
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
      invalidateRef.current?.();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [enableParallax]);

  const handleStageReady = useCallback(() => {
    setSceneReady(true);
    onReady?.();
  }, [onReady]);

  return (
    <div
      ref={containerRef}
      data-testid="japanese-scenic-canvas"
      data-ready={sceneReady ? 'true' : 'false'}
      data-motion={enableMotion ? 'on' : 'off'}
      data-parallax={enableParallax ? 'on' : 'off'}
      data-wireframe={wireframe ? 'on' : 'off'}
      className={`relative w-full h-full overflow-hidden select-none bg-gradient-to-b from-[#1E2B3C] via-[#4C6178] to-[#D4CBC2] ${className}`}
      aria-label="Serene Japanese dawn landscape background"
      role="img"
    >
      {/* Graceful fallback gradient if WebGL context is unavailable or lost */}
      {contextLost && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#1E2B3C] via-[#4D637A] to-[#D8CFC6] text-[#F4EFE6]/80 text-sm">
          <span>Restoring scenic background viewport…</span>
        </div>
      )}

      {isSoftwareGl !== null && !contextLost && (
        <Canvas
          shadows={!isSoftwareGl}
          frameloop={isSoftwareGl ? 'demand' : 'always'}
          dpr={isSoftwareGl ? 1 : [1, 2]}
          gl={{
            antialias: !isSoftwareGl,
            alpha: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.04,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          onCreated={({ gl, invalidate }) => {
            invalidateRef.current = invalidate;
            const domElement = gl.domElement;
            const onLost = (event: Event) => {
              event.preventDefault();
              setContextLost(true);
            };
            const onRestored = () => {
              setContextLost(false);
              invalidate();
            };
            domElement.addEventListener('webglcontextlost', onLost, false);
            domElement.addEventListener('webglcontextrestored', onRestored, false);
          }}
        >
          <ScenicStage
            enableMotion={enableMotion}
            enableParallax={enableParallax}
            wireframe={wireframe}
            resetSignal={resetSignal}
            initialCyclePhase={initialCyclePhase}
            cycleDuration={cycleDuration}
            cameraPreset={cameraPreset}
            isSoftwareGl={isSoftwareGl}
            pointerRef={pointerRef}
            onReady={handleStageReady}
          />
        </Canvas>
      )}

      {/* Subtle architectural vignette anchoring top & left-edge typography legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1A2533]/42 via-[#1A2533]/12 to-transparent"
      />
    </div>
  );
}
