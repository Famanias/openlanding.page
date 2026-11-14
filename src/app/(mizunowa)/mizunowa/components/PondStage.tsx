'use client';

import { MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, Play, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { useMotionPreference } from '../hooks/useMotionPreference';
import { useInView } from '../hooks/useInView';
import type { PondSceneController, PondSceneOptions } from '../pond/scene';

export type StageMode = 'poster' | 'opt-in' | 'loading' | 'live' | 'reduced' | 'error';

export type PondSceneLoader = (
  container: HTMLElement,
  options: PondSceneOptions,
) => Promise<PondSceneController | null>;

export interface PondStageProps {
  sceneLoader?: PondSceneLoader;
  journeyActive?: boolean;
  startSignal?: number;
  onStageModeChange?: (mode: StageMode) => void;
  children?: ReactNode;
}

interface StaticRing {
  cx: number;
  cy: number;
  id: number;
}

const STAGE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PondStage({
  sceneLoader,
  journeyActive = false,
  startSignal = 0,
  onStageModeChange,
  children,
}: PondStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<PondSceneController | null>(null);
  const generationRef = useRef(0);

  const caps = useMotionPreference();
  const inView = useInView(stageRef, { threshold: 0.05 });

  const [mode, setMode] = useState<StageMode>('poster');
  const [liveReady, setLiveReady] = useState(false);
  const [staticRing, setStaticRing] = useState<StaticRing | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const announceSeqRef = useRef(0);

  const announce = useCallback((message: string) => {
    announceSeqRef.current += 1;
    setAnnouncement(announceSeqRef.current % 2 === 0 ? `${message}\u200B` : message);
  }, []);

  const announceRipple = useCallback(() => {
    announce('Ripple added');
  }, [announce]);

  const announcePellet = useCallback(() => {
    announce('Koi food dropped');
  }, [announce]);

  const teardownScene = useCallback(() => {
    generationRef.current += 1;
    if (controllerRef.current) {
      controllerRef.current.destroy();
      controllerRef.current = null;
    }
    setLiveReady(false);
  }, []);

  const startScene = useCallback(async () => {
    const host = canvasHostRef.current;
    if (!host) return;

    teardownScene();
    const myGen = generationRef.current;
    setMode('loading');

    try {
      // Allow testing renderer initialization failure via query param
      if (typeof window !== 'undefined' && window.location.search.includes('pondError=1')) {
        throw new Error('Simulated renderer failure');
      }

      const loadFn: PondSceneLoader =
        sceneLoader ??
        (async (el, opts) => {
          const mod = await import('../pond/scene');
          return mod.createPondScene(el, opts);
        });

      if (myGen !== generationRef.current) return;

      const controller = await loadFn(host, {
        isMobile: caps.isNarrowViewport || caps.isCoarsePointer,
        isDisposed: () => myGen !== generationRef.current,
        onFirstFrame: () => {
          if (myGen === generationRef.current) {
            setLiveReady(true);
            setMode('live');
          }
        },
        onDeviceLostOrError: () => {
          if (myGen === generationRef.current) {
            controllerRef.current = null;
            setLiveReady(false);
            setMode('error');
          }
        },
        onRippleAdded: () => {
          if (myGen === generationRef.current) {
            announceRipple();
          }
        },
        onPelletAdded: () => {
          if (myGen === generationRef.current) {
            announcePellet();
          }
        },
      });

      if (myGen !== generationRef.current) {
        controller?.destroy();
        return;
      }

      if (!controller) {
        setLiveReady(false);
        setMode('error');
        return;
      }

      controllerRef.current = controller;
      controller.setViewportActive(inView);
    } catch {
      if (myGen === generationRef.current) {
        setLiveReady(false);
        setMode('error');
      }
    }
  }, [
    announcePellet,
    announceRipple,
    caps.isCoarsePointer,
    caps.isNarrowViewport,
    inView,
    sceneLoader,
    teardownScene,
  ]);

  // Synchronize environment capabilities cleanly without auto-starting when reduced motion or touch/mobile
  useEffect(() => {
    if (!caps.ready) return;

    if (caps.prefersReducedMotion) {
      const cleanupTimer = window.setTimeout(() => {
        teardownScene();
        setMode('reduced');
      }, 0);
      return () => window.clearTimeout(cleanupTimer);
    }

    if (caps.shouldAutoStart3D) {
      if (!controllerRef.current && mode === 'poster') {
        const start = () => {
          if (inView) {
            void startScene();
          }
        };
        if (typeof window.requestIdleCallback === 'function') {
          const idleId = window.requestIdleCallback(start, { timeout: 600 });
          return () => window.cancelIdleCallback(idleId);
        }
        const timerId = window.setTimeout(start, 40);
        return () => window.clearTimeout(timerId);
      }
    } else if (!controllerRef.current && mode !== 'error' && mode !== 'loading' && mode !== 'opt-in') {
      const optTimer = window.setTimeout(() => setMode('opt-in'), 0);
      return () => window.clearTimeout(optTimer);
    }
  }, [caps.ready, caps.prefersReducedMotion, caps.shouldAutoStart3D, inView, mode, startScene, teardownScene]);

  // Trigger opt-in start externally (e.g., from Hero "Journey in 3D")
  useEffect(() => {
    if (startSignal > 0 && !caps.prefersReducedMotion && !controllerRef.current) {
      const t = window.setTimeout(() => {
        void startScene();
      }, 0);
      return () => window.clearTimeout(t);
    }
  }, [startSignal, caps.prefersReducedMotion, startScene]);

  // Pause render loop when scrolled out of viewport without modifying explicit user pause
  useEffect(() => {
    controllerRef.current?.setViewportActive(inView);
  }, [inView]);

  const prevJourneyRef = useRef(journeyActive);
  // Synchronize journey camera mode with Three.js controller
  useEffect(() => {
    if (!liveReady) return;
    controllerRef.current?.setJourneyActive(journeyActive);
    if (prevJourneyRef.current !== journeyActive) {
      prevJourneyRef.current = journeyActive;
      announce(journeyActive ? '3D pond walk view active' : 'Returned to garden overview');
    }
  }, [announce, journeyActive, liveReady]);

  const displayMode: StageMode = caps.prefersReducedMotion ? 'reduced' : mode;
  const isRunning3D = displayMode === 'live' && liveReady;

  useEffect(() => {
    onStageModeChange?.(displayMode);
  }, [displayMode, onStageModeChange]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      teardownScene();
    };
  }, [teardownScene]);

  const handleStillPondClick = (e: MouseEvent<HTMLDivElement>) => {
    if (mode === 'live') return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const svgX = ((e.clientX - rect.left) / rect.width) * 1600;
    const svgY = ((e.clientY - rect.top) / rect.height) * 1200;
    // Match pond ellipse in pond-poster.svg (cx=800, cy=668, rx=486, ry=274)
    const nx = (svgX - 800) / 486;
    const ny = (svgY - 668) / 274;
    if (nx * nx + ny * ny <= 1) {
      setStaticRing({ cx: svgX, cy: svgY, id: Date.now() });
      announceRipple();
    }
  };

  return (
    <div ref={stageRef} className="mnw-stage-wrap" data-pond-mode={displayMode}>
      {/* Full-hero 3D stage & static fallback backdrop */}
      <div
        className="mnw-stage-frame"
        onClick={handleStillPondClick}
        data-testid="pond-stage-frame"
      >
        {/* Always-present static SVG poster at first paint and as fallback */}
        <img
          src="/templates/mizunowa/pond-poster.svg"
          alt="Four patterned koi swim through an imagined pond beneath a sakura tree, near a shrine courtyard."
          width={1600}
          height={1200}
          className={`mnw-stage-poster ${isRunning3D ? 'is-hidden' : ''}`}
          referrerPolicy="no-referrer"
        />

        {/* Non-animated static ripple overlay for still/reduced-motion/opt-in modes */}
        {!isRunning3D && staticRing && (
          <svg
            viewBox="0 0 1600 1200"
            className="mnw-stage-static-ripple"
            aria-hidden="true"
            data-testid="pond-static-ripple"
          >
            <ellipse
              cx={staticRing.cx}
              cy={staticRing.cy}
              rx="34"
              ry="19"
              fill="none"
              stroke="#F4EFE2"
              strokeOpacity="0.68"
              strokeWidth="2.2"
            />
            <ellipse
              cx={staticRing.cx}
              cy={staticRing.cy}
              rx="68"
              ry="38"
              fill="none"
              stroke="#F4EFE2"
              strokeOpacity="0.36"
              strokeWidth="1.6"
            />
          </svg>
        )}

        {/* Dedicated empty mount container for WebGPURenderer canvas */}
        <div
          ref={canvasHostRef}
          data-testid="pond-canvas-host"
          className={`mnw-stage-canvas-host ${isRunning3D ? 'is-live' : ''} ${
            isRunning3D ? 'is-interactive' : ''
          }`}
        />

        {/* Directional atmospheric scrim preserving crisp text readability without dimming the garden */}
        <div className="mnw-stage-scrim" aria-hidden="true" />
      </div>

      {/* Semantic foreground UI layered over the expansive garden environment */}
      <div className="mnw-container mnw-hero-foreground">
        {children}

        <p className="mnw-sr-only">
          Four patterned koi swim through an imagined pond beneath a sakura tree, near a shrine
          courtyard.
        </p>

        <div className="mnw-sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>

        <motion.div
          className="mnw-stage-bar"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: caps.prefersReducedMotion ? 0 : 0.8,
            delay: caps.prefersReducedMotion ? 0 : 1.72,
            ease: STAGE_EASE,
          }}
        >
          <a href="#koi" className="mnw-scroll-cue">
            <span>SCROLL TO ENTER</span>
            <ArrowDown size={13} aria-hidden="true" />
          </a>

          {(displayMode === 'opt-in' || displayMode === 'reduced' || displayMode === 'error') && (
            <div className="mnw-stage-controls mnw-js-only">
              {displayMode === 'opt-in' && (
                <button
                  type="button"
                  className="mnw-stage-btn mnw-stage-btn-accent"
                  onClick={() => void startScene()}
                >
                  <Play size={14} aria-hidden="true" />
                  <span>Explore the 3D pond</span>
                </button>
              )}

              {displayMode === 'reduced' && (
                <span className="mnw-stage-status" data-testid="pond-reduced-status">
                  Still pond view
                </span>
              )}

              {displayMode === 'error' && (
                <button
                  type="button"
                  className="mnw-stage-btn mnw-stage-btn-accent"
                  onClick={() => void startScene()}
                >
                  <RotateCcw size={14} aria-hidden="true" />
                  <span>Try 3D again</span>
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
