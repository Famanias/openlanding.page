'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import CityScene from './CityScene';
import {
  DEFAULT_CITY_SETTINGS,
  DitherCitySettings,
  QualityPreset,
  RenderStats,
  getDprCap,
  resolveQualityTier,
} from '../lib/cityConfig';

export interface DitherCityBackgroundProps {
  motionEnabled?: boolean;
  parallaxEnabled?: boolean;
  scrollProgress?: number;
  ditherEnabled?: boolean;
  halftoneEnabled?: boolean;
  wireframe?: boolean;
  ditherIntensity?: number;
  ditherResolution?: number;
  halftoneScale?: number;
  contrast?: number;
  grainIntensity?: number;
  accentIntensity?: number;
  fogDensity?: number;
  quality?: QualityPreset;
  resetCameraToken?: number;
  onStatsUpdate?: (stats: RenderStats) => void;
  className?: string;
}

/**
 * Probes WebGL2 renderer string once to detect CPU/software WebGL (SwiftShader, llvmpipe, WARP)
 * so we pace rendering cleanly without altering scene visuals or layout.
 */
function detectSoftwareWebGL(): { supported: boolean; isSoftware: boolean } {
  if (typeof document === 'undefined') {
    return { supported: true, isSoftware: false };
  }
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      return { supported: false, isSoftware: true };
    }
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    const isSoftware = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    return { supported: true, isSoftware };
  } catch {
    return { supported: false, isSoftware: true };
  }
}

export default function DitherCityBackground({
  motionEnabled = DEFAULT_CITY_SETTINGS.motionEnabled,
  parallaxEnabled = DEFAULT_CITY_SETTINGS.parallaxEnabled,
  scrollProgress = DEFAULT_CITY_SETTINGS.scrollProgress,
  ditherEnabled = DEFAULT_CITY_SETTINGS.ditherEnabled,
  halftoneEnabled = DEFAULT_CITY_SETTINGS.halftoneEnabled,
  wireframe = DEFAULT_CITY_SETTINGS.wireframe,
  ditherIntensity = DEFAULT_CITY_SETTINGS.ditherIntensity,
  ditherResolution = DEFAULT_CITY_SETTINGS.ditherResolution,
  halftoneScale = DEFAULT_CITY_SETTINGS.halftoneScale,
  contrast = DEFAULT_CITY_SETTINGS.contrast,
  grainIntensity = DEFAULT_CITY_SETTINGS.grainIntensity,
  accentIntensity = DEFAULT_CITY_SETTINGS.accentIntensity,
  fogDensity = DEFAULT_CITY_SETTINGS.fogDensity,
  quality = DEFAULT_CITY_SETTINGS.quality,
  resetCameraToken = 0,
  onStatsUpdate,
  className = '',
}: DitherCityBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [webglState, setWebglState] = useState({ supported: true, isSoftware: false });
  const [contextLost, setContextLost] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(1440);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const rafId = window.requestAnimationFrame(() => {
      setMounted(true);
      setWebglState(detectSoftwareWebGL());
      setViewportWidth(window.innerWidth);
      setPrefersReducedMotion(mq.matches);
    });
    const onMqChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', onMqChange);

    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize, { passive: true });

    const onVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibility);

    let observer: IntersectionObserver | null = null;
    if (containerRef.current && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            setIsVisible(entry.isIntersecting && !document.hidden);
          }
        },
        { threshold: 0.02 },
      );
      observer.observe(containerRef.current);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      mq.removeEventListener('change', onMqChange);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      observer?.disconnect();
    };
  }, []);

  const effectiveMotion = motionEnabled && !prefersReducedMotion;
  const effectiveParallax = parallaxEnabled && !prefersReducedMotion;

  const qualityTier = useMemo(
    () => resolveQualityTier(quality, viewportWidth, webglState.isSoftware),
    [quality, viewportWidth, webglState.isSoftware],
  );

  const dprCap = useMemo(
    () => getDprCap(qualityTier, webglState.isSoftware),
    [qualityTier, webglState.isSoftware],
  );

  const settings: DitherCitySettings = useMemo(
    () => ({
      motionEnabled: effectiveMotion,
      parallaxEnabled: effectiveParallax,
      scrollProgress,
      ditherEnabled,
      halftoneEnabled,
      wireframe,
      ditherIntensity,
      ditherResolution,
      halftoneScale,
      contrast,
      grainIntensity,
      accentIntensity,
      fogDensity,
      quality,
    }),
    [
      effectiveMotion,
      effectiveParallax,
      scrollProgress,
      ditherEnabled,
      halftoneEnabled,
      wireframe,
      ditherIntensity,
      ditherResolution,
      halftoneScale,
      contrast,
      grainIntensity,
      accentIntensity,
      fogDensity,
      quality,
    ],
  );

  // Use demand frameloop when paused, hidden, or running on software WebGL (paced via afterDraw)
  const frameloop: 'always' | 'demand' =
    !isVisible || webglState.isSoftware ? 'demand' : 'always';

  return (
    <div
      ref={containerRef}
      data-testid="dither-city-canvas-container"
      data-state={contextLost ? 'context-lost' : mounted ? 'ready' : 'initializing'}
      data-dither={ditherEnabled ? 'on' : 'off'}
      data-halftone={halftoneEnabled ? 'on' : 'off'}
      data-wireframe={wireframe ? 'on' : 'off'}
      data-motion={effectiveMotion ? 'on' : 'off'}
      className={`fixed inset-0 w-full h-full bg-[#0A0B09] overflow-hidden select-none ${className}`}
    >
      {mounted && webglState.supported && !contextLost ? (
        <Canvas
          frameloop={frameloop}
          dpr={[1, dprCap]}
          camera={{ position: [-2.6, 3.4, 34.5], fov: 39, near: 0.5, far: 300 }}
          gl={{
            antialias: false,
            alpha: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
          onCreated={({ gl }) => {
            gl.outputColorSpace = THREE.SRGBColorSpace;
            const canvas = gl.domElement;
            const handleLost = (e: Event) => {
              e.preventDefault();
              setContextLost(true);
            };
            const handleRestored = () => {
              setContextLost(false);
            };
            canvas.addEventListener('webglcontextlost', handleLost, false);
            canvas.addEventListener('webglcontextrestored', handleRestored, false);
          }}
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <CityScene
            settings={settings}
            qualityTier={qualityTier}
            isSoftwareGl={webglState.isSoftware}
            isVisible={isVisible}
            resetCameraToken={resetCameraToken}
            onStatsUpdate={onStatsUpdate}
          />
        </Canvas>
      ) : (
        /* Graceful stylized dark architectural fallback while mounting or if WebGL unavailable */
        <div
          aria-hidden="true"
          className="w-full h-full bg-gradient-to-tr from-[#0A0B09] via-[#171915] to-[#2e302a]"
        />
      )}
    </div>
  );
}
