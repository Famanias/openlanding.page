"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../motion/useReducedMotion";
import { glazeById } from "./glazes";
import type { VesselScene } from "./VesselScene";
import { useVessel } from "./VesselProvider";
import { VesselSvg } from "./VesselSvg";

type Phase = "poster" | "loading" | "live" | "lost";

/**
 * The 3D wheel. The SVG poster is always server-rendered and stays until the lathe is live,
 * which only happens when the browser is idle on desktop, or on tap on touch screens.
 * It never mounts under reduced motion.
 */
export function VesselCanvas() {
  const { state, throwRef } = useVessel();
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<VesselScene | null>(null);
  const [armed, setArmed] = useState(false);
  const [phase, setPhase] = useState<Phase>("poster");
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    setCoarse(isCoarse);
    if (reduced || isCoarse) return;
    const arm = () => setArmed(true);
    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(arm, { timeout: 3500 });
      return () => window.cancelIdleCallback(handle);
    }
    const handle = globalThis.setTimeout(arm, 2000);
    return () => globalThis.clearTimeout(handle);
  }, [reduced]);

  useEffect(() => {
    if (reduced || !armed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let scene: VesselScene | null = null;
    let resizeObserver: ResizeObserver | null = null;
    setPhase("loading");

    void import("./VesselScene")
      .then(({ VesselScene }) => {
        if (cancelled) return;
        scene = new VesselScene({
          canvas,
          getThrow: () => throwRef.current,
          getSpinBoost: () => Number.parseFloat(document.documentElement.style.getPropertyValue("--vel")) || 0,
          onContextLost: () => setPhase("lost"),
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
  }, [armed, reduced, throwRef]);

  useEffect(() => {
    if (phase !== "live") return;
    sceneRef.current?.setInputs({ target: state.params, glaze: glazeById(state.glazeId) });
    sceneRef.current?.start();
  }, [phase, state.params, state.glazeId]);

  const live = phase === "live";
  return (
    <div className="tn-canvas" data-phase={phase}>
      <VesselSvg
        className="tn-canvas-poster"
        params={state.params}
        glazeId={state.glazeId}
        label={`Preview of the ${glazeById(state.glazeId).name} vessel on the wheel`}
      />
      <canvas ref={canvasRef} className="tn-canvas-gl" data-live={live} aria-hidden="true" />
      {coarse && !armed && !reduced ? (
        <button type="button" className="tn-btn tn-btn-ghost tn-canvas-start" onClick={() => setArmed(true)}>
          <span className="tn-btn-label">Start the wheel</span>
        </button>
      ) : null}
      {phase === "lost" ? <p className="tn-canvas-note">The wheel stopped. Showing the still preview.</p> : null}
    </div>
  );
}
