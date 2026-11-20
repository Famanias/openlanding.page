'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, PerspectiveCamera, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import {
  DEFAULT_CAMERA_POSITION,
  DEFAULT_CAMERA_TARGET,
  computeCameraRigTarget,
  dampValue,
} from '../../lib/scenic-math';
import {
  DAY_NIGHT_CYCLE_DURATION_SECONDS,
  computeCyclePhase,
  evaluateDayNightPalette,
  type DayNightPalette,
} from '../../lib/day-night-cycle';
import { createProceduralTextureSet } from '../../lib/procedural-textures';
import { LANTERN_ANCHOR, WATER_LEVEL, sampleTerrainHeight } from '../../lib/terrain';
import type { BlossomEmitter } from '../../lib/petal-sim';
import {
  createWaterRipplePool,
  seedInitialCalmRipples,
  type WaterObstacleCircle,
  type WaterRipplePool,
} from '../../lib/water-ripples';
import { SkyAndSunLayer } from './layers/SkyAndSunLayer';
import { MountainRangesLayer } from './layers/MountainRangesLayer';
import { ShorelineTerrainLayer } from './layers/ShorelineTerrainLayer';
import { WaterReflectionLayer } from './layers/WaterReflectionLayer';
import { ArchitectureLayer } from './layers/ArchitectureLayer';
import { BotanicalLayer } from './layers/BotanicalLayer';
import { AtmosphereLayer } from './layers/AtmosphereLayer';

export type ScenicCameraPreset = 'default' | 'torii' | 'shore' | 'tree';

export interface ScenicStageProps {
  enableMotion: boolean;
  enableParallax: boolean;
  wireframe: boolean;
  resetSignal: number;
  isSoftwareGl: boolean;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  initialCyclePhase?: number;
  cycleDuration?: number;
  cameraPreset?: ScenicCameraPreset;
  onReady?: () => void;
}

const CAMERA_PRESETS: Record<
  ScenicCameraPreset,
  { pos: [number, number, number]; target: [number, number, number] }
> = {
  default: {
    pos: [DEFAULT_CAMERA_POSITION.x, DEFAULT_CAMERA_POSITION.y, DEFAULT_CAMERA_POSITION.z],
    target: [DEFAULT_CAMERA_TARGET.x, DEFAULT_CAMERA_TARGET.y, DEFAULT_CAMERA_TARGET.z],
  },
  // Inspection angles used for geometric verification of grounding & shoreline coherence
  torii: {
    pos: [0.3, -0.35, -0.2],
    target: [3.2, -1.35, -5.0],
  },
  shore: {
    pos: [1.5, -0.1, 2.2],
    target: [4.6, -1.5, -2.5],
  },
  tree: {
    pos: [1.6, 1.4, 4.6],
    target: [5.6, 0.8, -1.6],
  },
};

const _lookAtVec = new THREE.Vector3(
  DEFAULT_CAMERA_TARGET.x,
  DEFAULT_CAMERA_TARGET.y,
  DEFAULT_CAMERA_TARGET.z
);

export function ScenicStage({
  enableMotion,
  enableParallax,
  wireframe,
  resetSignal,
  isSoftwareGl,
  pointerRef,
  initialCyclePhase = 0,
  cycleDuration = DAY_NIGHT_CYCLE_DURATION_SECONDS,
  cameraPreset = 'default',
  onReady,
}: ScenicStageProps) {
  const { gl, invalidate, size, get } = useThree();
  const isPortrait = size.height > size.width;
  const portraitOffsetX = isPortrait && cameraPreset === 'default' ? 1.85 : 0;
  const responsiveFov = isPortrait && cameraPreset === 'default' ? 48 : 38;

  const elapsedRef = useRef(0);
  const cycleElapsedRef = useRef(0);
  const cyclePaletteRef = useRef<DayNightPalette>(evaluateDayNightPalette(initialCyclePhase));

  // Shared live refs connecting BotanicalLayer -> AtmosphereLayer -> WaterReflectionLayer
  const blossomEmittersRef = useRef<BlossomEmitter[]>([]);
  const shoreObstaclesRef = useRef<WaterObstacleCircle[]>([]);
  const waterRipplePoolRef = useRef<WaterRipplePool>(createWaterRipplePool());

  useEffect(() => {
    seedInitialCalmRipples(waterRipplePoolRef.current);
  }, []);

  // Shared zero-404 procedural PBR texture set (granite, vermilion wood, sakura bark, contact shadows)
  const textures = useMemo(() => {
    const maxAniso = isSoftwareGl ? 1 : Math.min(gl.capabilities.getMaxAnisotropy(), 8);
    return createProceduralTextureSet(maxAniso);
  }, [gl, isSoftwareGl]);

  useEffect(() => {
    return () => {
      textures.dispose();
    };
  }, [textures]);

  // Compute exact grounded lantern firebox elevation for warm point light alignment
  const lanternLightY = useMemo(() => {
    const groundY = sampleTerrainHeight(LANTERN_ANCHOR.x, LANTERN_ANCHOR.z);
    const padTopY = Math.max(groundY + 0.14, WATER_LEVEL + 0.52);
    return padTopY + 1.16 * 0.95;
  }, []);

  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const lanternLightRef = useRef<THREE.PointLight>(null);
  const fogRef = useRef<THREE.Fog>(null);
  const bgColorRef = useRef<THREE.Color>(null);

  const presetSpec = CAMERA_PRESETS[cameraPreset] ?? CAMERA_PRESETS.default;

  const currentLookAtRef = useRef(
    new THREE.Vector3(presetSpec.target[0], presetSpec.target[1], presetSpec.target[2])
  );
  const isResettingRef = useRef(false);
  const readyNotifiedRef = useRef(false);

  // Sync cycle palette if initialCyclePhase prop changes externally
  useEffect(() => {
    cycleElapsedRef.current = 0;
    cyclePaletteRef.current = evaluateDayNightPalette(initialCyclePhase);
    invalidate();
  }, [initialCyclePhase, invalidate]);

  // Snap camera immediately when switching explicit inspection preset
  useEffect(() => {
    const activeCamera = get().camera;
    const spec = CAMERA_PRESETS[cameraPreset] ?? CAMERA_PRESETS.default;
    activeCamera.position.set(
      spec.pos[0] + portraitOffsetX,
      spec.pos[1],
      spec.pos[2]
    );
    currentLookAtRef.current.set(
      spec.target[0] + portraitOffsetX,
      spec.target[1],
      spec.target[2]
    );
    activeCamera.lookAt(currentLookAtRef.current);
    activeCamera.updateMatrixWorld();
    invalidate();
  }, [cameraPreset, portraitOffsetX, get, invalidate]);

  // Notify parent after first frame renders
  useEffect(() => {
    if (!readyNotifiedRef.current) {
      readyNotifiedRef.current = true;
      onReady?.();
    }
  }, [onReady]);

  // Trigger camera reset smoothly (or snap cleanly under software WebGL) when resetSignal increments
  useEffect(() => {
    if (resetSignal === 0) return;
    if (pointerRef.current) {
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
    }
    elapsedRef.current = 0;
    isResettingRef.current = true;

    if (isSoftwareGl) {
      const activeCamera = get().camera;
      const spec = CAMERA_PRESETS[cameraPreset] ?? CAMERA_PRESETS.default;
      activeCamera.position.set(spec.pos[0] + portraitOffsetX, spec.pos[1], spec.pos[2]);
      currentLookAtRef.current.set(spec.target[0] + portraitOffsetX, spec.target[1], spec.target[2]);
      activeCamera.lookAt(currentLookAtRef.current);
      activeCamera.updateMatrixWorld();
      isResettingRef.current = false;
      invalidate();
    }
  }, [resetSignal, get, isSoftwareGl, invalidate, pointerRef, portraitOffsetX, cameraPreset]);

  // Invalidate on-demand renderer when key visual props change
  useEffect(() => {
    invalidate();
  }, [enableMotion, enableParallax, wireframe, invalidate]);

  // Software-WebGL frame pacer: waits for GL command completion via fenceSync,
  // then pauses briefly so CPU rendering never starves UI interaction or screenshots.
  useEffect(() => {
    if (!isSoftwareGl) return;

    let cancelled = false;
    let timerId = 0;

    const scheduleAfterDraw = () => {
      if (cancelled || !enableMotion) return;
      const ctx = gl.getContext();
      if (ctx instanceof WebGL2RenderingContext) {
        const sync = ctx.fenceSync(ctx.SYNC_GPU_COMMANDS_COMPLETE, 0);
        ctx.flush();
        const poll = () => {
          if (cancelled) {
            if (sync) ctx.deleteSync(sync);
            return;
          }
          const status = sync ? ctx.getSyncParameter(sync, ctx.SYNC_STATUS) : ctx.SIGNALED;
          if (status === ctx.UNSIGNALED) {
            timerId = window.setTimeout(poll, 8);
          } else {
            if (sync) ctx.deleteSync(sync);
            timerId = window.setTimeout(() => {
              if (!cancelled && enableMotion) {
                invalidate();
                scheduleAfterDraw();
              }
            }, 140);
          }
        };
        timerId = window.setTimeout(poll, 8);
      } else {
        timerId = window.setTimeout(() => {
          if (!cancelled && enableMotion) {
            invalidate();
            scheduleAfterDraw();
          }
        }, 160);
      }
    };

    invalidate();
    if (enableMotion) {
      scheduleAfterDraw();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timerId);
    };
  }, [isSoftwareGl, enableMotion, gl, invalidate]);

  useFrame((state, delta) => {
    const safeDt = Math.min(delta, 0.1);
    if (enableMotion) {
      elapsedRef.current += safeDt;
      cycleElapsedRef.current += safeDt;
    }

    // Evaluate smooth 30-second day-night lighting and atmospheric palette
    const phase = computeCyclePhase(cycleElapsedRef.current, cycleDuration, initialCyclePhase);
    const palette = evaluateDayNightPalette(phase);
    cyclePaletteRef.current = palette;

    if (ambientLightRef.current) {
      ambientLightRef.current.color.setRGB(
        palette.ambientColor.r,
        palette.ambientColor.g,
        palette.ambientColor.b
      );
      ambientLightRef.current.intensity = palette.ambientIntensity;
    }

    if (hemiLightRef.current) {
      hemiLightRef.current.color.setRGB(
        palette.hemiSkyColor.r,
        palette.hemiSkyColor.g,
        palette.hemiSkyColor.b
      );
      hemiLightRef.current.groundColor.setRGB(
        palette.hemiGroundColor.r,
        palette.hemiGroundColor.g,
        palette.hemiGroundColor.b
      );
      hemiLightRef.current.intensity = palette.hemiIntensity;
    }

    if (keyLightRef.current) {
      keyLightRef.current.color.setRGB(
        palette.keyLightColor.r,
        palette.keyLightColor.g,
        palette.keyLightColor.b
      );
      keyLightRef.current.intensity = palette.keyLightIntensity;
    }

    if (fillLightRef.current) {
      fillLightRef.current.color.setRGB(
        palette.fillLightColor.r,
        palette.fillLightColor.g,
        palette.fillLightColor.b
      );
      fillLightRef.current.intensity = palette.fillLightIntensity;
    }

    // Very subtle calm candle breath on the lantern point light
    if (lanternLightRef.current) {
      const subtleBreath = 0.975 + Math.sin(elapsedRef.current * 1.15) * 0.025;
      lanternLightRef.current.intensity = palette.lanternPointIntensity * subtleBreath;
    }

    if (fogRef.current) {
      fogRef.current.color.setRGB(palette.fogColor.r, palette.fogColor.g, palette.fogColor.b);
    }

    if (bgColorRef.current) {
      bgColorRef.current.setRGB(palette.skyZenith.r, palette.skyZenith.g, palette.skyZenith.b);
    }

    // Smooth camera parallax & gentle breathing drift on default hero framing
    const activeCamera = state.camera;
    if (cameraPreset === 'default') {
      const pointer = pointerRef.current ?? { x: 0, y: 0 };
      const target = computeCameraRigTarget({
        pointerX: pointer.x,
        pointerY: pointer.y,
        enableParallax,
        enableMotion,
        elapsedTime: elapsedRef.current,
      });

      const dampLambda = isResettingRef.current ? 7.5 : 3.6;
      const goalX = target.x + portraitOffsetX;
      const goalLookX = target.lookAtX + portraitOffsetX;

      const nextX = dampValue(activeCamera.position.x, goalX, dampLambda, safeDt);
      const nextY = dampValue(activeCamera.position.y, target.y, dampLambda, safeDt);
      const nextZ = dampValue(activeCamera.position.z, target.z, dampLambda, safeDt);
      activeCamera.position.set(nextX, nextY, nextZ);

      currentLookAtRef.current.x = dampValue(currentLookAtRef.current.x, goalLookX, dampLambda, safeDt);
      currentLookAtRef.current.y = dampValue(currentLookAtRef.current.y, target.lookAtY, dampLambda, safeDt);
      currentLookAtRef.current.z = dampValue(currentLookAtRef.current.z, target.lookAtZ, dampLambda, safeDt);

      _lookAtVec.copy(currentLookAtRef.current);
      activeCamera.lookAt(_lookAtVec);

      if (
        isResettingRef.current &&
        Math.abs(nextX - goalX) < 0.01 &&
        Math.abs(nextY - target.y) < 0.01
      ) {
        isResettingRef.current = false;
      }
    } else {
      _lookAtVec.copy(currentLookAtRef.current);
      activeCamera.lookAt(_lookAtVec);
    }
  });

  return (
    <>
      <color ref={bgColorRef} attach="background" args={['#1E2B3C']} />

      {/* Horizon-matched atmospheric fog shifting smoothly across the 30-second day-night cycle */}
      <fog ref={fogRef} attach="fog" args={['#BFC6CE', 13.5, 31.0]} />

      <PerspectiveCamera
        makeDefault
        fov={responsiveFov}
        near={0.1}
        far={85}
        position={[
          presetSpec.pos[0] + portraitOffsetX,
          presetSpec.pos[1],
          presetSpec.pos[2],
        ]}
      />

      {/* Procedural reflection environment (zero external HDRI files) */}
      <Environment resolution={64} frames={1}>
        <Lightformer
          form="circle"
          intensity={2.2}
          color="#FBE2C4"
          position={[8, 4, -10]}
          scale={8}
        />
        <Lightformer
          form="rect"
          intensity={0.95}
          color="#6C85A0"
          position={[-6, 8, 4]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[18, 12, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.5}
          color="#3A4C60"
          position={[0, -6, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[20, 20, 1]}
        />
      </Environment>

      {/* Dynamic 30-second day-night lighting rig with coherent shadow direction */}
      <ambientLight ref={ambientLightRef} color="#9BB0C6" intensity={0.34} />
      <hemisphereLight ref={hemiLightRef} args={['#9CB0C4', '#233040', 0.92]} />
      <directionalLight
        ref={keyLightRef}
        position={[10, 6.8, -7.5]}
        intensity={1.75}
        color="#F9DAC0"
        castShadow={!isSoftwareGl}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={34}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0005}
        shadow-normalBias={0.025}
      />
      <directionalLight ref={fillLightRef} position={[-8, 5, 7]} intensity={0.48} color="#9BB4CE" />

      {/* Localized warm stone lantern glow illuminating nearby granite & shoreline rocks */}
      <pointLight
        ref={lanternLightRef}
        position={[LANTERN_ANCHOR.x, lanternLightY, LANTERN_ANCHOR.z]}
        intensity={1.25}
        distance={4.2}
        decay={2}
        color="#F6BE74"
      />

      {/* Unified Layered Japanese Scenic Environment */}
      <SkyAndSunLayer
        enableMotion={enableMotion}
        wireframe={wireframe}
        cyclePaletteRef={cyclePaletteRef}
      />
      <MountainRangesLayer
        enableParallax={enableParallax}
        wireframe={wireframe}
        pointerRef={pointerRef}
        cyclePaletteRef={cyclePaletteRef}
      />
      <ShorelineTerrainLayer
        enableMotion={enableMotion}
        wireframe={wireframe}
        textures={textures}
        shoreObstaclesRef={shoreObstaclesRef}
      />
      <WaterReflectionLayer
        enableMotion={enableMotion}
        wireframe={wireframe}
        cyclePaletteRef={cyclePaletteRef}
        waterRipplePoolRef={waterRipplePoolRef}
        shoreObstaclesRef={shoreObstaclesRef}
        lanternLightY={lanternLightY}
      />
      <ArchitectureLayer
        enableMotion={enableMotion}
        enableParallax={enableParallax}
        wireframe={wireframe}
        pointerRef={pointerRef}
        cyclePaletteRef={cyclePaletteRef}
        textures={textures}
      />
      <BotanicalLayer
        enableMotion={enableMotion}
        wireframe={wireframe}
        cyclePaletteRef={cyclePaletteRef}
        textures={textures}
        blossomEmittersRef={blossomEmittersRef}
      />
      <AtmosphereLayer
        enableMotion={enableMotion}
        enableParallax={enableParallax}
        wireframe={wireframe}
        pointerRef={pointerRef}
        cyclePaletteRef={cyclePaletteRef}
        blossomEmittersRef={blossomEmittersRef}
        waterRipplePoolRef={waterRipplePoolRef}
      />

      {/* Restrained golden atmospheric mist motes concentrated softly near sunlit right air */}
      {!wireframe && (
        <Sparkles
          count={14}
          scale={[9.5, 5.2, 5.5]}
          position={[3.8, 0.35, -3.5]}
          size={1.35}
          speed={enableMotion ? 0.13 : 0}
          opacity={0.18}
          color="#F7E4C8"
        />
      )}
    </>
  );
}
