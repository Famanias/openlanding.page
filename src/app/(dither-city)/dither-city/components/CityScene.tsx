'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import Atmosphere from './Atmosphere';
import RingedPlanet from './RingedPlanet';
import BuildingCluster from './BuildingCluster';
import CameraController from './CameraController';
import { createDitherPostMaterial } from '../lib/shaders/DitherShader';
import { DitherCitySettings, RenderStats } from '../lib/cityConfig';

interface CitySceneProps {
  settings: DitherCitySettings;
  qualityTier: 'high' | 'medium' | 'low';
  isSoftwareGl: boolean;
  isVisible: boolean;
  resetCameraToken: number;
  onStatsUpdate?: (stats: RenderStats) => void;
}

export default function CityScene({
  settings,
  qualityTier,
  isSoftwareGl,
  isVisible,
  resetCameraToken,
  onStatsUpdate,
}: CitySceneProps) {
  const { gl, size, invalidate } = useThree();

  const [planetTransform, setPlanetTransform] = useState<{
    offset: [number, number, number];
    scale: number;
  }>({ offset: [0, 0, 0], scale: 1 });

  const handlePlanetTransform = useCallback(
    (offset: [number, number, number], scale: number) => {
      setPlanetTransform((prev) => {
        if (
          Math.abs(prev.offset[0] - offset[0]) < 0.05 &&
          Math.abs(prev.offset[1] - offset[1]) < 0.05 &&
          Math.abs(prev.scale - scale) < 0.005
        ) {
          return prev;
        }
        return { offset, scale };
      });
    },
    [],
  );

  // Store latest settings & callbacks in refs synced via effect (zero render-phase ref writes)
  const settingsRef = useRef(settings);
  const statsCallbackRef = useRef(onStatsUpdate);
  const isVisibleRef = useRef(isVisible);

  useEffect(() => {
    settingsRef.current = settings;
    statsCallbackRef.current = onStatsUpdate;
    isVisibleRef.current = isVisible;
  }, [settings, onStatsUpdate, isVisible]);

  // Post-processing single-pass pipeline stored in a mutable ref created lazily in effect
  const postRef = useRef<{
    rt: THREE.WebGLRenderTarget;
    postScene: THREE.Scene;
    postCamera: THREE.OrthographicCamera;
    postMaterial: THREE.ShaderMaterial;
    quadGeo: THREE.PlaneGeometry;
  } | null>(null);

  const [envTexture, setEnvTexture] = useState<THREE.Texture | null>(null);

  // Initialize post-processing & RoomEnvironment once
  useEffect(() => {
    const rt = new THREE.WebGLRenderTarget(1, 1, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
      depthBuffer: true,
      stencilBuffer: false,
    });
    const postScene = new THREE.Scene();
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const postMaterial = createDitherPostMaterial();
    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const quadMesh = new THREE.Mesh(quadGeo, postMaterial);
    quadMesh.frustumCulled = false;
    postScene.add(quadMesh);

    const dpr = gl.getPixelRatio();
    const w = Math.max(1, Math.floor(size.width * dpr));
    const h = Math.max(1, Math.floor(size.height * dpr));
    rt.setSize(w, h);
    postMaterial.uniforms.uResolution.value.set(w, h);

    postRef.current = { rt, postScene, postCamera, postMaterial, quadGeo };

    const pmrem = new THREE.PMREMGenerator(gl);
    const envRoom = new RoomEnvironment();
    const envRT = pmrem.fromScene(envRoom, 0.04);
    envRoom.dispose();
    pmrem.dispose();

    const rafId = window.requestAnimationFrame(() => {
      setEnvTexture(envRT.texture);
      invalidate();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
      setEnvTexture(null);
      envRT.dispose();
      rt.dispose();
      postMaterial.dispose();
      quadGeo.dispose();
      postRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl]);

  // Resize render target when viewport or pixel ratio changes
  useEffect(() => {
    const post = postRef.current;
    if (!post) return;
    const dpr = gl.getPixelRatio();
    const w = Math.max(1, Math.floor(size.width * dpr));
    const h = Math.max(1, Math.floor(size.height * dpr));
    post.rt.setSize(w, h);
    post.postMaterial.uniforms.uResolution.value.set(w, h);
    invalidate();
  }, [gl, size.width, size.height, invalidate]);

  // Trigger a fresh frame whenever visual settings change (important in demand mode)
  useEffect(() => {
    invalidate();
  }, [settings, qualityTier, resetCameraToken, invalidate]);

  // Software-WebGL paced render loop (afterDraw with fenceSync + 80ms pause)
  const softwareTimerRef = useRef<number | null>(null);
  const softwarePendingRef = useRef(false);

  useEffect(() => {
    return () => {
      if (softwareTimerRef.current !== null) {
        window.clearTimeout(softwareTimerRef.current);
        softwareTimerRef.current = null;
      }
    };
  }, []);

  // FPS & draw-call telemetry accumulators (updated <= 3Hz)
  const frameCountRef = useRef(0);
  const lastStatTimeRef = useRef(0);
  const elapsedRef = useRef(0);

  // Priority 1 takes over rendering from R3F to execute:
  // Pass 1: Render 3D scene -> WebGLRenderTarget
  // Pass 2: Full-screen Dither + Halftone + Grain + Green Accent shader -> Screen
  useFrame((state, delta) => {
    if (!isVisibleRef.current) return;
    const post = postRef.current;
    if (!post) return;

    const s = settingsRef.current;
    const dt = Math.min(delta, 0.1);
    if (s.motionEnabled) {
      elapsedRef.current += dt;
    }

    // Update post-processing shader uniforms
    const uniforms = post.postMaterial.uniforms;
    uniforms.tDiffuse.value = post.rt.texture;
    uniforms.uTime.value = elapsedRef.current;
    uniforms.uDitherEnabled.value = s.ditherEnabled ? 1.0 : 0.0;
    uniforms.uHalftoneEnabled.value = s.halftoneEnabled ? 1.0 : 0.0;
    uniforms.uDitherIntensity.value = s.ditherIntensity;
    uniforms.uDitherResolution.value = s.ditherResolution;
    uniforms.uHalftoneScale.value = s.halftoneScale;
    uniforms.uContrast.value = s.contrast;
    uniforms.uGrainIntensity.value = s.grainIntensity;
    uniforms.uAccentIntensity.value = s.accentIntensity;

    // 1. Render 3D scene into offscreen render target
    state.gl.setRenderTarget(post.rt);
    state.gl.clear();
    state.gl.render(state.scene, state.camera);

    // Capture scene draw calls + triangles before fullscreen quad
    const sceneCalls = state.gl.info.render.calls;
    const sceneTriangles = state.gl.info.render.triangles;

    // 2. Render unified Dither + Halftone post-processing quad to screen
    state.gl.setRenderTarget(null);
    state.gl.render(post.postScene, post.postCamera);

    // Throttled FPS / draw-call reporting (~2.5Hz)
    frameCountRef.current += 1;
    const now = performance.now();
    if (lastStatTimeRef.current === 0) {
      lastStatTimeRef.current = now;
    } else if (now - lastStatTimeRef.current >= 400) {
      const elapsedSec = (now - lastStatTimeRef.current) / 1000;
      const fps = Math.round(frameCountRef.current / Math.max(0.001, elapsedSec));
      frameCountRef.current = 0;
      lastStatTimeRef.current = now;
      statsCallbackRef.current?.({
        fps,
        drawCalls: sceneCalls + 1,
        triangles: sceneTriangles + 2,
      });
    }

    // Software WebGL pacing: wait for GPU/CPU fence completion + 85ms cooldown before next frame
    if (isSoftwareGl && s.motionEnabled && !softwarePendingRef.current) {
      softwarePendingRef.current = true;
      const context = state.gl.getContext();
      const scheduleNext = () => {
        softwarePendingRef.current = false;
        if (isVisibleRef.current && settingsRef.current.motionEnabled) {
          invalidate();
        }
      };

      if (typeof WebGL2RenderingContext !== 'undefined' && context instanceof WebGL2RenderingContext) {
        const sync = context.fenceSync(context.SYNC_GPU_COMMANDS_COMPLETE, 0);
        context.flush();
        const poll = () => {
          const status = sync ? context.getSyncParameter(sync, context.SYNC_STATUS) : context.SIGNALED;
          if (status === context.UNSIGNALED) {
            softwareTimerRef.current = window.setTimeout(poll, 8);
          } else {
            if (sync) context.deleteSync(sync);
            softwareTimerRef.current = window.setTimeout(scheduleNext, 85);
          }
        };
        softwareTimerRef.current = window.setTimeout(poll, 8);
      } else {
        softwareTimerRef.current = window.setTimeout(scheduleNext, 110);
      }
    }
  }, 1);

  return (
    <>
      <color attach="background" args={['#0a0b09']} />
      {envTexture && <primitive object={envTexture} attach="environment" />}
      <fogExp2 attach="fog" args={['#111310', settings.fogDensity]} />

      {/* Stark Chiaroscuro Lighting Rig: bright upper-right key light, pitch-dark left shadows */}
      <directionalLight
        position={[54, 20, 14]}
        intensity={4.2}
        color="#faf7eb"
      />
      {/* Minimal ambient fill so shadowed faces drop to near-black ink while preserving subtle form */}
      <hemisphereLight
        args={['#585a52', '#060705', 0.14]}
      />
      {/* Rim backlight from upper-right sky glow */}
      <directionalLight
        position={[24, 30, -24]}
        intensity={1.15}
        color="#e4e2d0"
      />
      {/* Localized acid-green industrial bounce lights inside foreground tower trusses */}
      {settings.accentIntensity > 0.05 && (
        <>
          <pointLight
            position={[5.2, 4.8, 6.6]}
            color="#7aff24"
            intensity={6.5 * settings.accentIntensity}
            distance={12}
            decay={2}
          />
          <pointLight
            position={[14.8, 10.2, 7.2]}
            color="#7aff24"
            intensity={5.0 * settings.accentIntensity}
            distance={11}
            decay={2}
          />
        </>
      )}

      {/* Atmospheric Sky Backdrop, Drifting Haze & Dust Motes */}
      <Atmosphere
        motionEnabled={settings.motionEnabled}
        fogDensity={settings.fogDensity}
        qualityTier={qualityTier}
      />

      {/* Real 3D Ringed Planet, Companion Moon & Subtle Distant Orb */}
      <RingedPlanet
        motionEnabled={settings.motionEnabled}
        wireframe={settings.wireframe}
        fogDensity={settings.fogDensity}
        offset={planetTransform.offset}
        scale={planetTransform.scale}
      />

      {/* Procedural Brutalist Megacity Skyline */}
      <BuildingCluster
        motionEnabled={settings.motionEnabled}
        wireframe={settings.wireframe}
        accentIntensity={settings.accentIntensity}
      />

      {/* Depth-Aware Pointer Parallax, Scroll Glide & Responsive Reframing */}
      <CameraController
        parallaxEnabled={settings.parallaxEnabled}
        scrollProgress={settings.scrollProgress}
        resetCameraToken={resetCameraToken}
        onPlanetTransform={handlePlanetTransform}
      />
    </>
  );
}
