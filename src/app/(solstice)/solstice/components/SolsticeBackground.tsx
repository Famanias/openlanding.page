'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  LAYER_DEPTH_SPECS,
  SCENE_BLEED_X,
  SCENE_BLEED_Y,
  SCENE_HEIGHT,
  SCENE_WIDTH,
  clamp,
  computeLayerTransform,
  computeViewportFraming,
  type SceneControlState,
  type ViewportFraming,
} from '../utils/sceneLayout';
import { useParallax, type ParallaxPointerState } from '../hooks/useParallax';
import {
  sharedWindField,
  type PointerWindImpulse,
} from '../systems/DesertWindField';
import {
  OPENING_DURATION_SEC,
  evaluatePaintingReveal,
  type RevealableLayerHandle,
} from '../systems/PaintingRevealTimeline';
import {
  TRAVELER_BASE_X,
  TRAVELER_BASE_Y,
  computeTravelerPose,
} from '../systems/TravelerAnimator';
import { evaluateCinematicScroll } from '../systems/CinematicScrollController';
import { DesertSky } from './DesertSky';
import { DesertSun } from './DesertSun';
import { DistantRidges } from './DistantRidges';
import { CanyonLayers } from './CanyonLayers';
import { CliffWall } from './CliffWall';
import { ForegroundLedge } from './ForegroundLedge';
import {
  LivingBrushOverlay,
  type LivingBrushOverlayHandle,
} from './LivingBrushOverlay';
import {
  TravelerFigure,
  type TravelerFigureHandle,
} from './TravelerFigure';
import {
  DesertVegetation,
  type DesertVegetationHandle,
} from './DesertVegetation';
import {
  AtmosphereLayer,
  type AtmosphereLayerHandle,
} from './AtmosphereLayer';

export interface SolsticeBackgroundProps {
  controls: SceneControlState;
  scrollProgress: number;
  controlsOpen?: boolean;
  onFpsSample?: (fps: number) => void;
  onRevealSample?: (progress: number) => void;
  className?: string;
}

const BLEED_WIDTH = SCENE_WIDTH + SCENE_BLEED_X * 2;
const BLEED_HEIGHT = SCENE_HEIGHT + SCENE_BLEED_Y * 2;

const LAYER_BASE_STYLE: React.CSSProperties = {
  position: 'absolute',
  left: -SCENE_BLEED_X,
  top: -SCENE_BLEED_Y,
  width: BLEED_WIDTH,
  height: BLEED_HEIGHT,
  transformOrigin: '50% 54%',
};

export const SolsticeBackground: React.FC<SolsticeBackgroundProps> = ({
  controls,
  scrollProgress,
  controlsOpen = false,
  onFpsSample,
  onRevealSample,
  className = '',
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [framing, setFraming] = useState<ViewportFraming>(() =>
    computeViewportFraming(1440, 900)
  );

  // Root DOM ref for imperative data attributes (testable without React rerenders)
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  // Layer transform DOM refs
  const skyLayerRef = useRef<HTMLDivElement | null>(null);
  const sunLayerRef = useRef<HTMLDivElement | null>(null);
  const ridgesLayerRef = useRef<HTMLDivElement | null>(null);
  const canyonLayerRef = useRef<HTMLDivElement | null>(null);
  const cliffLayerRef = useRef<HTMLDivElement | null>(null);
  const foregroundLayerRef = useRef<HTMLDivElement | null>(null);
  const atmosphereLayerRef = useRef<HTMLDivElement | null>(null);

  // Subtle ambient child refs
  const sunWashRef = useRef<HTMLDivElement | null>(null);
  const cloudWashRef = useRef<HTMLDivElement | null>(null);

  // Imperative handles for directional painting reveal & living systems
  const sunRevealRef = useRef<RevealableLayerHandle | null>(null);
  const ridgesRevealRef = useRef<RevealableLayerHandle | null>(null);
  const canyonRevealRef = useRef<RevealableLayerHandle | null>(null);
  const cliffRevealRef = useRef<RevealableLayerHandle | null>(null);
  const foregroundRevealRef = useRef<RevealableLayerHandle | null>(null);

  const midBrushRef = useRef<LivingBrushOverlayHandle | null>(null);
  const cliffBrushRef = useRef<LivingBrushOverlayHandle | null>(null);
  const fgBrushRef = useRef<LivingBrushOverlayHandle | null>(null);

  const travelerRef = useRef<TravelerFigureHandle | null>(null);
  const vegetationRef = useRef<DesertVegetationHandle | null>(null);
  const atmosphereRef = useRef<AtmosphereLayerHandle | null>(null);

  // Live mutable animation state stored strictly in refs (zero 60Hz setState)
  const revealProgressRef = useRef<number>(controls.revealProgress);
  const lastReplayTokenRef = useRef<number>(controls.revealReplayToken);
  const pointerStateRef = useRef<{
    parallax: { x: number; y: number };
    sceneX: number;
    sceneY: number;
    prevSceneX: number;
    prevSceneY: number;
    lastMoveTime: number;
    active: boolean;
    windImpulse: PointerWindImpulse;
  }>({
    parallax: { x: 0, y: 0 },
    sceneX: 1180,
    sceneY: 620,
    prevSceneX: 1180,
    prevSceneY: 620,
    lastMoveTime: 0,
    active: false,
    windImpulse: { x: 1180, y: 620, vx: 0, vy: 0, strength: 0 },
  });

  const latestRef = useRef({
    controls,
    scrollProgress,
    controlsOpen,
    framing,
    reducedMotion,
    onFpsSample,
    onRevealSample,
  });

  useEffect(() => {
    latestRef.current = {
      controls,
      scrollProgress,
      controlsOpen,
      framing,
      reducedMotion,
      onFpsSample,
      onRevealSample,
    };

    // Respond immediately to manual scrubbing or Skip-to-Complete
    if (controls.revealManualScrub) {
      revealProgressRef.current = clamp(controls.revealProgress, 0, 1);
    }

    // Respond to Replay Opening button token immediately (zero stale frame flash)
    if (controls.revealReplayToken !== lastReplayTokenRef.current) {
      lastReplayTokenRef.current = controls.revealReplayToken;
      revealProgressRef.current = 0;
      sunRevealRef.current?.applyReveal(0);
      ridgesRevealRef.current?.applyReveal(0);
      canyonRevealRef.current?.applyReveal(0);
      cliffRevealRef.current?.applyReveal(0);
      foregroundRevealRef.current?.applyReveal(0);
      travelerRef.current?.applyPose(
        computeTravelerPose(0, sharedWindField.sampleAt(TRAVELER_BASE_X, TRAVELER_BASE_Y, 0, {
          windStrength: controls.windStrength,
          motionIntensity: controls.motionIntensity,
          scrollGustBoost: 0,
          pointerWind: null,
          pointerEnabled: false,
        }), scrollProgress, {
          enabled: false,
          motionIntensity: 0,
          lifeBlend: 0,
        }),
        0
      );
      vegetationRef.current?.applyWind(
        0,
        sharedWindField,
        {
          enabled: false,
          windStrength: 0,
          motionIntensity: 0,
          scrollGustBoost: 0,
          pointerWind: null,
          pointerEnabled: false,
          lifeBlend: 0,
        },
        0
      );
    }
  }, [
    controls,
    scrollProgress,
    controlsOpen,
    framing,
    reducedMotion,
    onFpsSample,
    onRevealSample,
  ]);

  // Respect system prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setReducedMotion(mq.matches);
      if (mq.matches) {
        revealProgressRef.current = 1;
      }
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Responsive desktop / tablet / mobile reframing
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setFraming(computeViewportFraming(window.innerWidth, window.innerHeight));
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track pointer scene coordinates & localized wind velocity impulse
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePointerMove = (e: PointerEvent) => {
      const f = latestRef.current.framing;
      const sx = clamp((e.clientX - f.offsetX) / f.coverScale, 0, SCENE_WIDTH);
      const sy = clamp((e.clientY - f.offsetY) / f.coverScale, 0, SCENE_HEIGHT);
      const now = performance.now();
      const ps = pointerStateRef.current;

      const dtSec = Math.max(0.012, (now - ps.lastMoveTime) / 1000);
      if (ps.active && dtSec < 0.35) {
        const rawVx = clamp((sx - ps.prevSceneX) / dtSec, -980, 980);
        const rawVy = clamp((sy - ps.prevSceneY) / dtSec, -720, 720);
        // Smooth velocity slightly so fast jitter feels like natural desert airflow
        ps.windImpulse.vx = ps.windImpulse.vx * 0.45 + rawVx * 0.55;
        ps.windImpulse.vy = ps.windImpulse.vy * 0.45 + rawVy * 0.55;
        const speed = Math.hypot(ps.windImpulse.vx, ps.windImpulse.vy);
        ps.windImpulse.strength = clamp(
          Math.max(ps.windImpulse.strength, speed / 520),
          0.18,
          1
        );
      } else {
        ps.windImpulse.vx = 0;
        ps.windImpulse.vy = 0;
        ps.windImpulse.strength = 0.16;
      }

      ps.prevSceneX = sx;
      ps.prevSceneY = sy;
      ps.sceneX = sx;
      ps.sceneY = sy;
      ps.windImpulse.x = sx;
      ps.windImpulse.y = sy;
      ps.lastMoveTime = now;
      ps.active = true;
    };

    const handlePointerLeave = () => {
      pointerStateRef.current.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  // Preserve smooth GSAP pointer parallax subscriber
  const handleParallaxUpdate = useCallback((pState: ParallaxPointerState) => {
    pointerStateRef.current.parallax = pState.current;
  }, []);

  useParallax(
    controls.pointerInteractionEnabled,
    reducedMotion,
    handleParallaxUpdate
  );

  // Unified master animation coordinator:
  // - Lightweight rAF handles FPS measurement & dirty-checked parallax transforms
  // - Clean 50ms timer drives directional reveal, living brushwork, traveler, vegetation & atmosphere
  //   (prevents BeginMainFrame starvation on software compositors & drops to 0% work when paused)
  useEffect(() => {
    let rafId = 0;
    let timerId = 0;
    let lastStepTime = performance.now();
    let elapsed = 0;
    let lastRevealNotify = 0;
    let frameCount = 0;
    let fpsWindowStart = lastStepTime;

    let lastTransformSig = '';
    let lastDatasetSig = '';
    let lastControlSig = '';
    let lastForcedReveal = -1;

    const applyStageAndLayerTransforms = (
      s: typeof latestRef.current,
      scrollCinematic: ReturnType<typeof evaluateCinematicScroll>
    ) => {
      const f = s.framing;
      const ptr = pointerStateRef.current.parallax;
      const effectiveParallax =
        s.controls.pointerInteractionEnabled && !s.reducedMotion
          ? s.controls.parallaxStrength * f.parallaxScale
          : 0;

      const sig = `${ptr.x.toFixed(3)}|${ptr.y.toFixed(3)}|${s.scrollProgress.toFixed(4)}|${effectiveParallax.toFixed(3)}|${f.coverScale.toFixed(4)}|${f.offsetX.toFixed(1)}|${f.offsetY.toFixed(1)}|${s.reducedMotion}`;
      if (sig === lastTransformSig) return;
      lastTransformSig = sig;

      const effectiveZoom = s.reducedMotion ? 1 : scrollCinematic.cameraZoom;
      const totalScale = f.coverScale * effectiveZoom;
      const w = typeof window !== 'undefined' ? window.innerWidth : 1440;
      const h = typeof window !== 'undefined' ? window.innerHeight : 900;

      const renderedW = SCENE_WIDTH * totalScale;
      const renderedH = SCENE_HEIGHT * totalScale;
      const rawOffsetX =
        w * 0.5 -
        f.focalX * renderedW +
        (s.reducedMotion ? 0 : scrollCinematic.cameraPanX * f.coverScale);
      const rawOffsetY =
        h * 0.5 -
        f.focalY * renderedH +
        (s.reducedMotion ? 0 : scrollCinematic.cameraPanY * f.coverScale);

      const safeOffsetX = clamp(rawOffsetX, w - renderedW, 0);
      const safeOffsetY = clamp(rawOffsetY, h - renderedH, 0);

      if (stageRef.current) {
        stageRef.current.style.transform = `translate3d(${safeOffsetX.toFixed(2)}px, ${safeOffsetY.toFixed(2)}px, 0) scale(${totalScale.toFixed(5)})`;
      }

      const pairs: Array<[HTMLDivElement | null, keyof typeof LAYER_DEPTH_SPECS]> = [
        [skyLayerRef.current, 'sky'],
        [sunLayerRef.current, 'sun'],
        [ridgesLayerRef.current, 'distantRidges'],
        [canyonLayerRef.current, 'canyonMid'],
        [cliffLayerRef.current, 'cliffWall'],
        [foregroundLayerRef.current, 'foreground'],
        [atmosphereLayerRef.current, 'atmosphere'],
      ];

      for (const [el, key] of pairs) {
        if (!el) continue;
        const spec = LAYER_DEPTH_SPECS[key];
        const { tx, ty, scale } = computeLayerTransform(
          spec,
          ptr,
          s.scrollProgress,
          effectiveParallax,
          s.reducedMotion
        );
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
      }
    };

    const stepLivingScene = () => {
      const now = performance.now();
      const s = latestRef.current;
      const dt = clamp((now - lastStepTime) / 1000, 0.001, 0.1);
      lastStepTime = now;

      const shouldAnimate = s.controls.ambientPlaying && !s.reducedMotion;

      // Advance 8-second opening creation sequence (unless manually scrubbed or complete)
      if (s.reducedMotion) {
        revealProgressRef.current = 1;
      } else if (!s.controls.revealManualScrub && revealProgressRef.current < 1) {
        if (s.controls.ambientPlaying) {
          revealProgressRef.current = clamp(
            revealProgressRef.current + dt / OPENING_DURATION_SEC,
            0,
            1
          );
        }
      }

      const controlSig = [
        s.controls.brushAnimationEnabled,
        s.controls.dustEnabled,
        s.controls.travelerEnabled,
        s.controls.vegetationWindEnabled,
        s.controls.heatShimmerEnabled,
        s.controls.pointerInteractionEnabled,
        s.controls.motionIntensity.toFixed(2),
        s.controls.windStrength.toFixed(2),
        s.controls.brushActivity.toFixed(2),
        s.scrollProgress.toFixed(3),
        s.reducedMotion,
      ].join('|');

      const revealChanged = Math.abs(revealProgressRef.current - lastForcedReveal) > 0.002;
      const controlsChanged = controlSig !== lastControlSig;

      // When paused and nothing changed, skip all SVG/canvas redraws cleanly
      if (!shouldAnimate && !revealChanged && !controlsChanged) {
        return;
      }

      if (shouldAnimate) {
        elapsed += dt;
      }
      lastForcedReveal = revealProgressRef.current;
      lastControlSig = controlSig;

      const scrollCinematic = evaluateCinematicScroll(s.scrollProgress);
      const reveal = evaluatePaintingReveal(revealProgressRef.current);

      // Decay pointer wind impulse smoothly when cursor stops moving
      const ps = pointerStateRef.current;
      const idleSinceMove = (now - ps.lastMoveTime) / 1000;
      if (idleSinceMove > 0.06 && ps.windImpulse.strength > 0) {
        const decay = Math.exp(-dt * 3.8);
        ps.windImpulse.strength *= decay;
        ps.windImpulse.vx *= decay;
        ps.windImpulse.vy *= decay;
        if (ps.windImpulse.strength < 0.01) {
          ps.windImpulse.strength = 0;
          ps.windImpulse.vx = 0;
          ps.windImpulse.vy = 0;
        }
      }

      applyStageAndLayerTransforms(s, scrollCinematic);

      // 1. Progressive directional brushstroke reveals (zero cost once each layer hits 1.0)
      sunRevealRef.current?.applyReveal(reveal.sunProgress);
      ridgesRevealRef.current?.applyReveal(reveal.distantWashProgress);
      canyonRevealRef.current?.applyReveal(reveal.canyonMidProgress);
      cliffRevealRef.current?.applyReveal(reveal.cliffWallProgress);
      foregroundRevealRef.current?.applyReveal(reveal.foregroundProgress);

      // 2. Living geological brushstrokes
      const brushOptions = {
        hatchingProgress: reveal.hatchingProgress,
        brushEnabled: s.controls.brushAnimationEnabled && !s.reducedMotion,
        brushActivity: s.controls.brushActivity,
        motionIntensity: s.controls.motionIntensity,
        geologicalScrollReveal: scrollCinematic.geologicalDetailReveal,
        pointerX: ps.sceneX,
        pointerY: ps.sceneY,
        pointerActive: ps.active,
        pointerEnabled: s.controls.pointerInteractionEnabled && !s.reducedMotion,
      };
      midBrushRef.current?.update(elapsed, brushOptions);
      cliffBrushRef.current?.update(elapsed, brushOptions);
      fgBrushRef.current?.update(elapsed, brushOptions);

      // 3. Articulated 2D traveler pose & grounded ridge walking
      const travelerWind = sharedWindField.sampleAt(
        TRAVELER_BASE_X,
        TRAVELER_BASE_Y,
        elapsed,
        {
          windStrength: s.controls.windStrength,
          motionIntensity: s.controls.motionIntensity,
          scrollGustBoost: scrollCinematic.scrollGustBoost,
          pointerWind: ps.windImpulse,
          pointerEnabled: s.controls.pointerInteractionEnabled && !s.reducedMotion,
        }
      );
      const travelerPose = computeTravelerPose(
        elapsed,
        travelerWind,
        s.scrollProgress,
        {
          enabled: s.controls.travelerEnabled && !s.reducedMotion,
          motionIntensity: s.controls.motionIntensity,
          lifeBlend: reveal.lifeBlend,
        }
      );
      travelerRef.current?.applyPose(travelerPose, reveal.travelerProgress);

      // 4. Rooted desert vegetation (grass blades + hierarchical branching shrubs)
      vegetationRef.current?.applyWind(
        elapsed,
        sharedWindField,
        {
          enabled: s.controls.vegetationWindEnabled && !s.reducedMotion,
          windStrength: s.controls.windStrength,
          motionIntensity: s.controls.motionIntensity,
          scrollGustBoost: scrollCinematic.scrollGustBoost,
          pointerWind: ps.windImpulse,
          pointerEnabled: s.controls.pointerInteractionEnabled && !s.reducedMotion,
          lifeBlend: reveal.lifeBlend,
        },
        reveal.vegetationProgress
      );

      // 5. Compact live atmosphere canvas (dust washes, gusts, sun-dust, cliff light, heat shimmer)
      atmosphereRef.current?.renderFrame({
        t: elapsed,
        dt: shouldAnimate ? dt : 0,
        windField: sharedWindField,
        dustEnabled: s.controls.dustEnabled,
        heatShimmerEnabled: s.controls.heatShimmerEnabled && !s.reducedMotion,
        brushAnimationEnabled: s.controls.brushAnimationEnabled && !s.reducedMotion,
        pointerEnabled: s.controls.pointerInteractionEnabled && !s.reducedMotion,
        windStrength: s.controls.windStrength,
        motionIntensity: s.controls.motionIntensity,
        brushActivity: s.controls.brushActivity,
        scrollHazeMultiplier: scrollCinematic.hazeMultiplier,
        passageDustBoost: scrollCinematic.passageDustBoost,
        scrollGustBoost: scrollCinematic.scrollGustBoost,
        cliffLightShift: scrollCinematic.cliffLightShift,
        geologicalScrollReveal: scrollCinematic.geologicalDetailReveal,
        lifeBlend: reveal.lifeBlend,
        sunProgress: reveal.sunProgress,
        pointerX: ps.sceneX,
        pointerY: ps.sceneY,
        pointerActive: ps.active,
        pointerWind: ps.windImpulse,
      });

      // Dirty-checked DOM test attributes
      const dsSig = `${reveal.progress.toFixed(2)}|${reveal.stage}|${scrollCinematic.act}|${travelerPose.mode}`;
      if (rootRef.current && dsSig !== lastDatasetSig) {
        lastDatasetSig = dsSig;
        rootRef.current.dataset.revealProgress = reveal.progress.toFixed(3);
        rootRef.current.dataset.revealStage = reveal.stage;
        rootRef.current.dataset.scrollAct = scrollCinematic.act;
        rootRef.current.dataset.travelerMode = travelerPose.mode;
      }

      if (s.controlsOpen && now - lastRevealNotify >= 220) {
        lastRevealNotify = now;
        s.onRevealSample?.(reveal.progress);
      }
    };

    const rafTick = (now: number) => {
      const s = latestRef.current;
      const scrollCinematic = evaluateCinematicScroll(s.scrollProgress);
      applyStageAndLayerTransforms(s, scrollCinematic);

      frameCount++;
      const fpsWindow = now - fpsWindowStart;
      if (fpsWindow >= 600) {
        if (s.controlsOpen && s.controls.showFps) {
          const measuredFps = Math.min(
            120,
            Math.round((frameCount * 1000) / fpsWindow)
          );
          s.onFpsSample?.(measuredFps);
        }
        frameCount = 0;
        fpsWindowStart = now;
      }

      rafId = window.requestAnimationFrame(rafTick);
    };

    stepLivingScene();
    timerId = window.setInterval(stepLivingScene, 50);
    rafId = window.requestAnimationFrame(rafTick);

    return () => {
      window.clearInterval(timerId);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollCinematicStatic = evaluateCinematicScroll(scrollProgress);
  const effectiveHazeOpacity = controls.dustEnabled
    ? scrollCinematicStatic.hazeMultiplier
    : 0;

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 overflow-hidden bg-[#F3E9DA] select-none ${className}`}
      data-testid="solstice-background"
      data-scroll-progress={scrollProgress.toFixed(3)}
      data-viewport-profile={framing.profile}
      data-ambient={controls.ambientPlaying && !reducedMotion ? 'playing' : 'paused'}
      data-dust={controls.dustEnabled ? 'on' : 'off'}
      data-brush={controls.brushAnimationEnabled ? 'on' : 'off'}
      data-traveler={controls.travelerEnabled ? 'on' : 'off'}
      data-vegetation={controls.vegetationWindEnabled ? 'on' : 'off'}
      data-shimmer={controls.heatShimmerEnabled ? 'on' : 'off'}
      data-pointer={controls.pointerInteractionEnabled && !reducedMotion ? 'on' : 'off'}
      data-textures={controls.texturesEnabled ? 'on' : 'off'}
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
      aria-label="Solstice living interactive painted desert background"
      role="img"
    >
      {/* Responsive artboard stage (1920x1080 logical space, scaled, zoomable & safely clamped) */}
      <div
        ref={stageRef}
        className="pointer-events-none absolute top-0 left-0 origin-top-left"
        style={{
          width: SCENE_WIDTH,
          height: SCENE_HEIGHT,
          transform: `translate3d(${framing.offsetX.toFixed(2)}px, ${framing.offsetY.toFixed(2)}px, 0) scale(${framing.coverScale.toFixed(5)})`,
        }}
      >
        {/* Layer 0: Warm Chalk Cream Sky & Archival Paper Substrate */}
        <div ref={skyLayerRef} style={LAYER_BASE_STYLE}>
          <DesertSky
            texturesEnabled={controls.texturesEnabled}
            textureIntensity={1.0}
          />
        </div>

        {/* Layer 1: Pale Muted Golden Sun & Atmospheric Veil (Stage 1 pigment bloom) */}
        <div ref={sunLayerRef} style={LAYER_BASE_STYLE}>
          <DesertSun
            ref={sunRevealRef}
            sunWashRef={sunWashRef}
            hazeOpacity={effectiveHazeOpacity}
          />
        </div>

        {/* Layer 2: Diagonal Atmospheric Gouache Washes & Distant Ridges */}
        <div ref={ridgesLayerRef} style={LAYER_BASE_STYLE}>
          <DistantRidges
            ref={ridgesRevealRef}
            cloudWashRef={cloudWashRef}
            hazeOpacity={effectiveHazeOpacity}
          />
        </div>

        {/* Layer 3: Midground Stepped Canyon Strata + Living Midground Brushstrokes */}
        <div ref={canyonLayerRef} style={LAYER_BASE_STYLE}>
          <CanyonLayers ref={canyonRevealRef} />
          <LivingBrushOverlay ref={midBrushRef} layer="canyonMid" />
        </div>

        {/* Layer 4: Monumental Right Cliff Wall + Living Cliff Brushstrokes */}
        <div ref={cliffLayerRef} style={LAYER_BASE_STYLE}>
          <CliffWall ref={cliffRevealRef} />
          <LivingBrushOverlay ref={cliffBrushRef} layer="cliffWall" />
        </div>

        {/* Unified Live Atmosphere Canvas: Dust Washes, Gusts, Sun-Dust, Cliff Light, Heat Shimmer & Paper Grain */}
        <div ref={atmosphereLayerRef} style={LAYER_BASE_STYLE}>
          <AtmosphereLayer
            ref={atmosphereRef}
            texturesEnabled={controls.texturesEnabled}
          />
        </div>

        {/* Layer 5: Foreground Promontory, Living Rim Strokes, Articulated Traveler & Rooted Flora */}
        <div ref={foregroundLayerRef} style={LAYER_BASE_STYLE}>
          <ForegroundLedge ref={foregroundRevealRef} />
          <LivingBrushOverlay ref={fgBrushRef} layer="foreground" />
          <TravelerFigure ref={travelerRef} />
          <DesertVegetation ref={vegetationRef} />
        </div>
      </div>
    </div>
  );
};
