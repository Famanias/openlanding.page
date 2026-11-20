'use client';

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { STEMS } from '../lib/botanical/composition';
import { BotanicalRenderer } from '../lib/botanical/renderer';
import {
  advanceTimelineState,
  clamp01,
  computeViewportTransform,
  easeOutCubic,
  evaluateTimeline,
  segmentProgress,
  TIMELINE_DURATION_SEC,
} from '../lib/botanical/timeline';
import type {
  AnimationPhaseInfo,
  DeveloperSettings,
  PointerState,
  ViewportTransform,
} from '../lib/botanical/types';

export interface BotanicalCanvasHandle {
  seekToTime: (timeSec: number, pauseAfterSeek?: boolean) => void;
  restart: () => void;
  jumpToCompleted: () => void;
}

interface BotanicalCanvasProps {
  settings: DeveloperSettings;
  reducedMotion: boolean;
  onSyncHud: (payload: {
    timeSec: number;
    progress: number;
    phase: AnimationPhaseInfo;
    fps: number;
    isPlaying: boolean;
  }) => void;
}

/**
 * Builds an SVG cubic Bezier path string for a stem specification.
 */
function stemToSvgPath(points: Array<{ x: number; y: number }>): string {
  if (points.length < 4) return '';
  const [p0, p1, p2, p3] = points;
  return `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`;
}

const SVG_HAIRLINE_STEMS = STEMS.filter(
  (s) => s.kind === 'stem' || s.kind === 'twig'
).map((s) => ({
  id: s.id,
  d: stemToSvgPath(s.points),
  startSec: s.startSec,
  durationSec: s.durationSec,
  width: Math.max(1.2, s.widthEnd * 0.72),
  depthParallax: s.depthParallax,
}));

const BotanicalCanvas = forwardRef<BotanicalCanvasHandle, BotanicalCanvasProps>(
  function BotanicalCanvas({ settings, reducedMotion, onSyncHud }, ref) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const svgGroupRef = useRef<SVGGElement | null>(null);
    const svgPathRefs = useRef<Map<string, SVGPathElement>>(new Map());
    const rendererRef = useRef<BotanicalRenderer | null>(null);

    // Keep latest props & callbacks in refs so the RAF loop never restarts on UI changes
    const settingsRef = useRef<DeveloperSettings>(settings);
    const reducedMotionRef = useRef<boolean>(reducedMotion);
    const onSyncHudRef = useRef(onSyncHud);

    useEffect(() => {
      settingsRef.current = settings;
    }, [settings]);

    useEffect(() => {
      reducedMotionRef.current = reducedMotion;
    }, [reducedMotion]);

    useEffect(() => {
      onSyncHudRef.current = onSyncHud;
    }, [onSyncHud]);

    // Mutable animation engine state (zero 60Hz React state updates!)
    const engineRef = useRef({
      timeSec: reducedMotion ? TIMELINE_DURATION_SEC : 0,
      loopPhase: 'playing' as 'playing' | 'holding' | 'dissolving',
      loopTimerSec: 0,
      visibilityEnvelope: 1,
      ambientClockSec: 0,
      isPlaying: reducedMotion ? false : settings.isPlaying,
      manualOverrideReduced: false,
      viewportW: 1440,
      viewportH: 900,
      dpr: 1,
      transform: computeViewportTransform(1440, 900) as ViewportTransform,
    });

    // Smoothly interpolated pointer state for gentle 2.5D parallax & hover response
    const pointerTargetRef = useRef({ nx: 0, ny: 0, clientX: 0, clientY: 0, active: false });
    const pointerSmoothRef = useRef<PointerState>({
      nx: 0,
      ny: 0,
      artX: -9999,
      artY: -9999,
      active: false,
    });

    // Sync play/pause toggle from settings into engineRef
    useEffect(() => {
      const eng = engineRef.current;
      if (settings.isPlaying) {
        eng.manualOverrideReduced = true;
        // If user hits Play while at the completed end, cleanly restart from 0
        if (eng.timeSec >= TIMELINE_DURATION_SEC - 0.05 && eng.loopPhase === 'playing') {
          eng.timeSec = 0;
          eng.loopTimerSec = 0;
          eng.visibilityEnvelope = 1;
        }
      }
      eng.isPlaying = settings.isPlaying;
    }, [settings.isPlaying]);

    // Expose deterministic imperative seeking/restart API
    useImperativeHandle(
      ref,
      () => ({
        seekToTime(timeSec: number, pauseAfterSeek = false) {
          const eng = engineRef.current;
          eng.manualOverrideReduced = true;
          eng.timeSec = Math.max(0, Math.min(TIMELINE_DURATION_SEC, timeSec));
          eng.loopPhase = 'playing';
          eng.loopTimerSec = 0;
          eng.visibilityEnvelope = 1;
          if (pauseAfterSeek) {
            eng.isPlaying = false;
          }
          const snap = evaluateTimeline(eng.timeSec, {
            ambientClockSec: eng.ambientClockSec,
            visibilityEnvelope: 1,
            reducedMotion: false,
          });
          onSyncHudRef.current({
            timeSec: snap.timeSec,
            progress: snap.progress,
            phase: snap.phase,
            fps: 60,
            isPlaying: eng.isPlaying,
          });
        },
        restart() {
          const eng = engineRef.current;
          eng.manualOverrideReduced = true;
          eng.timeSec = 0;
          eng.loopPhase = 'playing';
          eng.loopTimerSec = 0;
          eng.visibilityEnvelope = 1;
          eng.isPlaying = true;
          if (settingsRef.current.mode === 'scroll') {
            window.scrollTo({ top: 0, behavior: 'auto' });
          }
        },
        jumpToCompleted() {
          const eng = engineRef.current;
          eng.manualOverrideReduced = true;
          eng.timeSec = TIMELINE_DURATION_SEC;
          eng.loopPhase = 'playing';
          eng.loopTimerSec = 0;
          eng.visibilityEnvelope = 1;
          eng.isPlaying = false;
          if (settingsRef.current.mode === 'scroll') {
            const maxScroll = Math.max(
              0,
              document.documentElement.scrollHeight - window.innerHeight
            );
            window.scrollTo({ top: maxScroll, behavior: 'auto' });
          }
          const snap = evaluateTimeline(TIMELINE_DURATION_SEC, {
            ambientClockSec: eng.ambientClockSec,
            visibilityEnvelope: 1,
            reducedMotion: false,
          });
          onSyncHudRef.current({
            timeSec: snap.timeSec,
            progress: snap.progress,
            phase: snap.phase,
            fps: 60,
            isPlaying: false,
          });
        },
      }),
      []
    );

    // Lightweight state attribute mirror for inspection & accessibility
    const [dataAttrs, setDataAttrs] = useState({
      phase: 'phase-01',
      progress: '0.00',
    });

    const handleResize = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;

      engineRef.current.viewportW = vw;
      engineRef.current.viewportH = vh;
      engineRef.current.dpr = dpr;
      engineRef.current.transform = computeViewportTransform(vw, vh);

      if (svgRef.current) {
        svgRef.current.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
      }
      if (svgGroupRef.current) {
        const tf = engineRef.current.transform;
        svgGroupRef.current.setAttribute(
          'transform',
          `translate(${tf.offsetX.toFixed(2)}, ${tf.offsetY.toFixed(2)}) scale(${tf.scale.toFixed(4)})`
        );
      }
    }, []);

    // Scroll-driven mode synchronization
    useEffect(() => {
      const onScroll = () => {
        if (settingsRef.current.mode !== 'scroll') return;
        const maxScroll = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const ratio = clamp01(window.scrollY / maxScroll);
        const eng = engineRef.current;
        eng.manualOverrideReduced = true;
        eng.timeSec = ratio * TIMELINE_DURATION_SEC;
        eng.loopPhase = 'playing';
        eng.visibilityEnvelope = 1;
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Pointer tracking for subtle 2.5D depth parallax & local flower proximity
    useEffect(() => {
      const onPointerMove = (e: PointerEvent) => {
        const vw = window.innerWidth || 1;
        const vh = window.innerHeight || 1;
        pointerTargetRef.current = {
          nx: clamp01(e.clientX / vw) * 2 - 1,
          ny: clamp01(e.clientY / vh) * 2 - 1,
          clientX: e.clientX,
          clientY: e.clientY,
          active: true,
        };
      };

      const onPointerLeave = () => {
        pointerTargetRef.current.active = false;
        pointerTargetRef.current.nx = 0;
        pointerTargetRef.current.ny = 0;
      };

      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerleave', onPointerLeave, { passive: true });
      return () => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerleave', onPointerLeave);
      };
    }, []);

    // Main deterministic RAF animation loop (mounted once)
    useEffect(() => {
      if (!rendererRef.current) {
        rendererRef.current = new BotanicalRenderer();
      }
      handleResize();
      window.addEventListener('resize', handleResize);

      let rafId = 0;
      let lastFrameTs = performance.now();
      let fpsFrameCount = 0;
      let fpsWindowStart = lastFrameTs;
      let currentFps = 60;
      let lastHudSync = 0;
      let lastRenderSig = '';
      const lastSvgCache = new Map<string, string>();

      const tick = (now: number) => {
        rafId = requestAnimationFrame(tick);

        const dtSec = Math.min(0.1, Math.max(0.001, (now - lastFrameTs) / 1000));
        lastFrameTs = now;

        // Rolling FPS counter
        fpsFrameCount++;
        if (now - fpsWindowStart >= 500) {
          currentFps = Math.round((fpsFrameCount * 1000) / (now - fpsWindowStart));
          fpsFrameCount = 0;
          fpsWindowStart = now;
        }

        const eng = engineRef.current;
        const cfg = settingsRef.current;
        const useReduced = reducedMotionRef.current && !eng.manualOverrideReduced;

        // Advance timeline deterministically in Auto mode
        if (cfg.mode === 'auto' && !useReduced) {
          const next = advanceTimelineState({
            timeSec: eng.timeSec,
            loopPhase: eng.loopPhase,
            loopTimerSec: eng.loopTimerSec,
            isPlaying: eng.isPlaying,
            loop: cfg.loop,
            speed: cfg.speed,
            dtSec,
          });
          eng.timeSec = next.timeSec;
          eng.loopPhase = next.loopPhase;
          eng.loopTimerSec = next.loopTimerSec;
          eng.visibilityEnvelope = next.visibilityEnvelope;
          eng.isPlaying = next.isPlaying;
        } else if (useReduced) {
          eng.timeSec = TIMELINE_DURATION_SEC;
          eng.isPlaying = false;
          eng.visibilityEnvelope = 1;
        }

        // Advance gentle ambient clock continuously
        if (cfg.ambientMotion && !useReduced) {
          eng.ambientClockSec += dtSec;
        }

        // Smooth pointer interpolation
        const ptrTgt = pointerTargetRef.current;
        const ptr = pointerSmoothRef.current;
        const lerpRate = Math.min(1, dtSec * 5.5);
        ptr.nx += (ptrTgt.nx - ptr.nx) * lerpRate;
        ptr.ny += (ptrTgt.ny - ptr.ny) * lerpRate;
        ptr.active = ptrTgt.active;

        const tf = eng.transform;
        ptr.artX = (ptrTgt.clientX - tf.offsetX) / (tf.scale || 1);
        ptr.artY = (ptrTgt.clientY - tf.offsetY) / (tf.scale || 1);

        const snapshot = evaluateTimeline(eng.timeSec, {
          ambientClockSec: eng.ambientClockSec,
          visibilityEnvelope: eng.visibilityEnvelope,
          reducedMotion: useReduced,
        });

        const ambientActive = cfg.ambientMotion && !useReduced && snapshot.ambientWeight > 0.01;
        const renderSig = [
          snapshot.timeSec.toFixed(3),
          snapshot.visibilityEnvelope.toFixed(3),
          ambientActive ? Math.floor(eng.ambientClockSec * 15) : 0,
          ptr.nx.toFixed(3),
          ptr.ny.toFixed(3),
          eng.viewportW,
          eng.viewportH,
          cfg.paperTexture ? 1 : 0,
          cfg.inkDiffusion ? 1 : 0,
          cfg.flowerGrowth ? 1 : 0,
          cfg.pointerParallax ? 1 : 0,
          cfg.ambientMotion ? 1 : 0,
        ].join('|');

        if (renderSig !== lastRenderSig) {
          lastRenderSig = renderSig;

          // 1. Render Canvas 2D multi-layered mixed-media painting
          const canvas = canvasRef.current;
          const renderer = rendererRef.current;
          if (canvas && renderer) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.save();
              ctx.setTransform(eng.dpr, 0, 0, eng.dpr, 0, 0);
              renderer.render(
                ctx,
                eng.viewportW,
                eng.viewportH,
                tf,
                snapshot,
                cfg,
                ptr
              );
              ctx.restore();
            }
          }

          // 2. Synchronize precision SVG vector botanical stroke-dash overlay (only when changed)
          const maxShift = cfg.pointerParallax ? 18 : 0;
          for (const item of SVG_HAIRLINE_STEMS) {
            const pathEl = svgPathRefs.current.get(item.id);
            if (!pathEl) continue;
            const p = cfg.flowerGrowth
              ? easeOutCubic(segmentProgress(snapshot.timeSec, item.startSec, item.durationSec))
              : 1;
            const dash = (1 - p).toFixed(3);
            const opa = (p > 0.01 ? 0.34 * snapshot.visibilityEnvelope : 0).toFixed(2);
            const ox = (ptr.nx * maxShift * item.depthParallax).toFixed(1);
            const oy = (ptr.ny * maxShift * 0.72 * item.depthParallax).toFixed(1);
            const svgSig = `${dash}|${opa}|${ox}|${oy}`;
            if (lastSvgCache.get(item.id) !== svgSig) {
              lastSvgCache.set(item.id, svgSig);
              pathEl.style.strokeDashoffset = dash;
              pathEl.style.opacity = opa;
              pathEl.setAttribute('transform', `translate(${ox}, ${oy})`);
            }
          }
        }

        // 3. Throttled HUD sync (~8Hz) to keep React overhead near zero
        if (now - lastHudSync >= 125) {
          lastHudSync = now;
          onSyncHudRef.current({
            timeSec: snapshot.timeSec,
            progress: snapshot.progress,
            phase: snapshot.phase,
            fps: currentFps,
            isPlaying: eng.isPlaying,
          });
          setDataAttrs((prev) => {
            const nextProg = snapshot.progress.toFixed(2);
            if (prev.phase === snapshot.phase.id && prev.progress === nextProg) {
              return prev;
            }
            return { phase: snapshot.phase.id, progress: nextProg };
          });
        }
      };

      rafId = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', handleResize);
      };
    }, [handleResize]);

    const isScrollMode = settings.mode === 'scroll';

    return (
      <div
        className={
          isScrollMode
            ? 'relative w-full min-h-[420vh] bg-[#E9E1D3]'
            : 'relative h-dvh w-screen overflow-hidden bg-[#E9E1D3]'
        }
        data-testid="botanical-stage"
        data-phase={dataAttrs.phase}
        data-progress={dataAttrs.progress}
        data-mode={settings.mode}
      >
        <div
          className={
            isScrollMode
              ? 'sticky top-0 left-0 h-dvh w-full overflow-hidden'
              : 'fixed inset-0 h-dvh w-screen overflow-hidden'
          }
        >
          {/* Primary High-DPI Mixed-Media Botanical Canvas */}
          <canvas
            ref={canvasRef}
            data-testid="botanical-canvas"
            aria-label="BLOOM//DECAY living botanical mixed-media timelapse artwork"
            role="img"
            className="block h-full w-full select-none"
          />

          {/* Synchronized Crisp SVG Botanical Ink Contour Layer (1:1 pixel aligned pathLength stroke-dash reveal) */}
          <svg
            ref={svgRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 h-full w-full overflow-visible"
            viewBox="0 0 1440 900"
          >
            <g ref={svgGroupRef}>
              {SVG_HAIRLINE_STEMS.map((stem) => (
                <path
                  key={stem.id}
                  ref={(el) => {
                    if (el) svgPathRefs.current.set(stem.id, el);
                    else svgPathRefs.current.delete(stem.id);
                  }}
                  d={stem.d}
                  pathLength={1}
                  stroke="#1C191A"
                  strokeWidth={stem.width}
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="1"
                  strokeDashoffset="1"
                  style={{ opacity: 0 }}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    );
  }
);

export default BotanicalCanvas;
