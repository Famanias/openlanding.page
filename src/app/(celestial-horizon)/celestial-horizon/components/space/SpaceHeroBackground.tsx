'use client';

import React, { useRef, useState, useSyncExternalStore } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { BASE_CAMERA_POSITION, type BloomConfig } from '../../lib/spaceSceneMath';
import { detectSoftwareWebGL } from '../../lib/proceduralSpaceTextures';
import {
  AsteroidSilhouetteLayer,
  CompanionMoonLayer,
  CosmicDustLayer,
  DeepBackdropLayer,
  HeroPlanetAssembly,
  NebulaCloudLayers,
  SUN_LIGHT_DIRECTION,
  StarfieldLayer,
  type PointerRefState,
} from './CelestialLayers';
import { SpaceCameraRig } from './SpaceCameraRig';
import { SpacePostProcessing } from './SpacePostProcessing';
import { TextSafeZoneOverlay } from './TextSafeZoneOverlay';

const emptySubscribe = () => () => {};

export interface SpaceHeroBackgroundProps {
  /** Enable slow orbital drift, planet rotation, cloud flow, and floating dust */
  motionEnabled?: boolean;
  /** Enable subtle 2.5D depth parallax driven by mouse/pointer position */
  parallaxEnabled?: boolean;
  /** Enable EffectComposer UnrealBloomPass post-processing for stars and nebula glow */
  bloomEnabled?: boolean;
  /** Optional overrides for bloom strength, radius, and luminance threshold */
  bloomConfig?: Partial<BloomConfig>;
  /** Toggle wireframe inspection across planet, rings, moon, asteroids, and nebula planes */
  wireframe?: boolean;
  /** Visualize the uncluttered hero text-safe area */
  showSafeZone?: boolean;
  /** Increment to smoothly glide camera back to neutral hero framing */
  resetTrigger?: number;
  /** Optional className for embedding inside any hero section container */
  className?: string;
  /** Optional future hero headline / CTA slot rendered cleanly above the canvas */
  children?: React.ReactNode;
}

/**
 * Reusable cinematic 2.5D outer-space landing-page background component.
 * Drop into any hero section wrapper (`relative min-h-screen` or fixed full-bleed)
 * and pass hero content as `children` or sibling overlay.
 */
export function SpaceHeroBackground({
  motionEnabled = true,
  parallaxEnabled = true,
  bloomEnabled = true,
  bloomConfig,
  wireframe = false,
  showSafeZone = false,
  resetTrigger = 0,
  className = '',
  children,
}: SpaceHeroBackgroundProps) {
  const isSoftwareGl = useSyncExternalStore<boolean | null>(
    emptySubscribe,
    detectSoftwareWebGL,
    () => null,
  );
  const [webglLost, setWebglLost] = useState(false);

  const pointerRef = useRef<PointerRefState>({ x: 0, y: 0 });
  const timeRef = useRef<number>(0);

  const lightPos: [number, number, number] = [
    SUN_LIGHT_DIRECTION.x * 24,
    SUN_LIGHT_DIRECTION.y * 24,
    SUN_LIGHT_DIRECTION.z * 24,
  ];

  return (
    <div
      data-testid="space-hero-background"
      data-motion={motionEnabled ? 'on' : 'off'}
      data-parallax={parallaxEnabled ? 'on' : 'off'}
      data-bloom={bloomEnabled ? 'on' : 'off'}
      data-wireframe={wireframe ? 'on' : 'off'}
      data-safe-zone={showSafeZone ? 'on' : 'off'}
      data-webgl-mode={isSoftwareGl === null ? 'init' : isSoftwareGl ? 'software' : 'hardware'}
      className={`relative h-full w-full overflow-hidden bg-[#04070f] select-none ${className}`}
    >
      {/* Atmospheric CSS base layer visible immediately during WebGL boot or fallback */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 68% 62% at 72% 52%, rgba(28, 56, 98, 0.42) 0%, rgba(10, 18, 38, 0.55) 45%, rgba(4, 7, 15, 1) 100%)',
        }}
      />

      {/* Isolated WebGL canvas container */}
      <div className="absolute inset-0">
        {isSoftwareGl !== null && !webglLost && (
          <Canvas
            frameloop={isSoftwareGl ? 'demand' : 'always'}
            dpr={isSoftwareGl ? 1 : [1, 2]}
            camera={{
              fov: 38,
              near: 0.1,
              far: 120,
              position: [
                BASE_CAMERA_POSITION.x,
                BASE_CAMERA_POSITION.y,
                BASE_CAMERA_POSITION.z,
              ],
            }}
            gl={{
              antialias: !isSoftwareGl,
              powerPreference: 'high-performance',
              alpha: false,
              stencil: false,
            }}
            onCreated={({ gl }) => {
              gl.outputColorSpace = THREE.SRGBColorSpace;
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.08;
              gl.setClearColor('#04070f', 1);

              const canvas = gl.domElement;
              const onLost = (event: Event) => {
                event.preventDefault();
                setWebglLost(true);
              };
              const onRestored = () => {
                setWebglLost(false);
              };
              canvas.addEventListener('webglcontextlost', onLost, false);
              canvas.addEventListener('webglcontextrestored', onRestored, false);
            }}
          >
            {/* Horizon-matched atmospheric depth fog */}
            <fogExp2 attach="fog" args={['#050a16', 0.014]} />

            {/* Warm/cool celestial 3-point lighting rig for dramatic crescent depth */}
            <directionalLight
              position={lightPos}
              intensity={3.05}
              color="#fff0d8"
            />
            <hemisphereLight
              args={['#356099', '#040710', 0.22]}
            />
            <directionalLight
              position={[14, -10, -14]}
              intensity={0.42}
              color="#4f95de"
            />

            <SpaceCameraRig
              motionEnabled={motionEnabled}
              parallaxEnabled={parallaxEnabled}
              wireframe={wireframe}
              resetTrigger={resetTrigger}
              isSoftwareGl={isSoftwareGl}
              pointerRef={pointerRef}
              timeRef={timeRef}
            />

            <DeepBackdropLayer timeRef={timeRef} />

            <StarfieldLayer
              motionEnabled={motionEnabled}
              parallaxEnabled={parallaxEnabled}
              wireframe={wireframe}
              pointerRef={pointerRef}
              timeRef={timeRef}
            />

            <NebulaCloudLayers
              motionEnabled={motionEnabled}
              parallaxEnabled={parallaxEnabled}
              wireframe={wireframe}
              pointerRef={pointerRef}
              timeRef={timeRef}
            />

            <CompanionMoonLayer
              motionEnabled={motionEnabled}
              parallaxEnabled={parallaxEnabled}
              wireframe={wireframe}
              pointerRef={pointerRef}
              timeRef={timeRef}
            />

            <HeroPlanetAssembly
              motionEnabled={motionEnabled}
              parallaxEnabled={parallaxEnabled}
              wireframe={wireframe}
              pointerRef={pointerRef}
              timeRef={timeRef}
            />

            <AsteroidSilhouetteLayer
              motionEnabled={motionEnabled}
              parallaxEnabled={parallaxEnabled}
              wireframe={wireframe}
              pointerRef={pointerRef}
              timeRef={timeRef}
            />

            <CosmicDustLayer
              motionEnabled={motionEnabled}
              parallaxEnabled={parallaxEnabled}
              wireframe={wireframe}
              pointerRef={pointerRef}
              timeRef={timeRef}
            />

            <SpacePostProcessing
              enabled={bloomEnabled}
              isSoftwareGl={isSoftwareGl}
              bloomConfig={bloomConfig}
            />
          </Canvas>
        )}
      </div>

      {/* Subtle left-edge contrast scrim to guarantee landing-page text legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(4, 7, 15, 0.54) 0%, rgba(4, 7, 15, 0.24) 44%, rgba(4, 7, 15, 0) 72%)',
        }}
      />

      {/* Optional architectural Text-Safe Area visualization */}
      <TextSafeZoneOverlay visible={showSafeZone} />

      {/* Optional future hero headline / CTA slot */}
      {children ? (
        <div className="relative z-10 h-full w-full pointer-events-none">
          {children}
        </div>
      ) : null}
    </div>
  );
}
