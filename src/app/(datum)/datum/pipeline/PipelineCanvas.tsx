"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useReducedMotion } from "../motion/useReducedMotion";
import { passById } from "./passes";
import { usePipeline } from "./PipelineProvider";
import type { PipelineScene } from "./PipelineScene";
import { PipelineSvg } from "./PipelineSvg";

type Phase = "poster" | "loading" | "live" | "lost";

/**
 * Interactive 3D render-pipeline Z-stack.
 * Always server-renders PipelineSvg for instant LCP, reduced-motion safety, and no-JS fallback.
 * Mounts WebGL on desktop idle (or stage interaction) and on explicit tap on coarse touch screens;
 * never mounts WebGL under prefers-reduced-motion.
 */
export function PipelineCanvas() {
  const { state, dispatch, explodeRef } = usePipeline();
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<PipelineScene | null>(null);
  const [armed, setArmed] = useState(false);
  const [phase, setPhase] = useState<Phase>("poster");
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    setCoarse(isCoarse);
    if (reduced || isCoarse) return;

    const arm = () => setArmed(true);
    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(arm, { timeout: 2200 });
      return () => window.cancelIdleCallback(handle);
    }
    const timer = globalThis.setTimeout(arm, 1200);
    return () => globalThis.clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (reduced) {
      setPhase("poster");
      return;
    }
    if (!armed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let scene: PipelineScene | null = null;
    let resizeObserver: ResizeObserver | null = null;
    setPhase("loading");

    void import("./PipelineScene")
      .then(({ PipelineScene }) => {
        if (cancelled) return;
        scene = new PipelineScene({
          canvas,
          getExplode: () => explodeRef.current,
          onSelectPass: (passId) => dispatch({ type: "selectPass", passId }),
          onContextLost: () => setPhase("lost"),
          onContextRestored: () => setPhase("live"),
        });
        sceneRef.current = scene;
        resizeObserver = new ResizeObserver(() => scene?.resize());
        resizeObserver.observe(canvas);
        setPhase("live");
      })
      .catch(() => {
        if (!cancelled) setPhase("lost");
      });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      scene?.dispose();
      sceneRef.current = null;
    };
  }, [armed, reduced, dispatch, explodeRef]);

  useEffect(() => {
    if (phase !== "live") return;
    sceneRef.current?.setInputs({
      activePassId: state.activePassId,
      enabledPassIds: state.enabledPassIds,
      wireframe: state.wireframe,
      paused: state.paused,
      resetTick: state.resetTick,
    });
  }, [
    phase,
    state.activePassId,
    state.enabledPassIds,
    state.wireframe,
    state.paused,
    state.resetTick,
  ]);

  const activePass = passById(state.activePassId);

  const onStageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      dispatch({ type: "stepPass", delta: 1 });
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      dispatch({ type: "stepPass", delta: -1 });
    } else if (event.key.toLowerCase() === "e") {
      event.preventDefault();
      dispatch({ type: "toggleExploded" });
    } else if (event.key.toLowerCase() === "w") {
      event.preventDefault();
      dispatch({ type: "toggleWireframe" });
    } else if (event.key.toLowerCase() === "r" || event.key === "Home") {
      event.preventDefault();
      dispatch({ type: "reset" });
    }
  };

  const live = phase === "live" && !reduced;

  return (
    <div
      className="dt-stage-card"
      data-phase={phase}
      data-exploded={state.exploded}
      data-wireframe={state.wireframe}
      data-paused={state.paused}
    >
      <div className="dt-stage-bar">
        <span className="dt-mono dt-stage-id">
          STAGE // {activePass.code} · {activePass.shortName.toUpperCase()}
        </span>
        <span className="dt-mono dt-stage-badge" data-live={live}>
          {live ? "WEBGL2 LIVE" : reduced ? "STATIC SCHEMATIC" : "SCHEMATIC READY"}
        </span>
      </div>

      <div
        className="dt-canvas"
        tabIndex={0}
        role="region"
        aria-label="Interactive 3D five-pass render pipeline stack. Use Left or Right arrow keys to step passes, E to explode, W for wireframe, R to reset."
        onKeyDown={onStageKeyDown}
        onPointerEnter={() => {
          if (!reduced && !coarse && !armed) setArmed(true);
        }}
      >
        <PipelineSvg
          className="dt-canvas-poster"
          activePassId={state.activePassId}
          enabledPassIds={state.enabledPassIds}
          wireframe={state.wireframe}
          label={`Isometric schematic focused on ${activePass.name}`}
          onSelectPass={(passId) => dispatch({ type: "selectPass", passId })}
        />
        {!reduced ? (
          <canvas
            ref={canvasRef}
            className="dt-canvas-gl"
            data-live={live}
            data-datum-renderer="true"
            aria-hidden="true"
          />
        ) : null}

        {coarse && !armed && !reduced ? (
          <button
            type="button"
            className="dt-btn dt-btn-primary dt-btn-small dt-canvas-start"
            onClick={() => setArmed(true)}
          >
            <span className="dt-btn-label" data-label="Launch 3D Stack">
              Launch 3D Stack
            </span>
            <span className="dt-btn-arrow" aria-hidden="true" />
          </button>
        ) : null}

        {phase === "lost" ? (
          <p className="dt-canvas-note dt-mono">WebGL context paused — showing isometric vector schematic.</p>
        ) : null}
      </div>

      <div className="dt-stage-hud" role="toolbar" aria-label="3D Pipeline Controls">
        <button
          type="button"
          className="dt-hud-btn"
          aria-pressed={state.exploded}
          onClick={() => dispatch({ type: "toggleExploded" })}
        >
          {state.exploded ? "Collapse Z-Stack" : "Explode Z-Stack"}
        </button>
        <button
          type="button"
          className="dt-hud-btn"
          aria-pressed={state.wireframe}
          onClick={() => dispatch({ type: "toggleWireframe" })}
        >
          Wireframe
        </button>
        <button
          type="button"
          className="dt-hud-btn"
          aria-pressed={state.paused}
          onClick={() => dispatch({ type: "togglePaused" })}
        >
          {state.paused ? "Resume Loop" : "Pause Loop"}
        </button>
        <button
          type="button"
          className="dt-hud-btn"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset View
        </button>
      </div>
    </div>
  );
}
