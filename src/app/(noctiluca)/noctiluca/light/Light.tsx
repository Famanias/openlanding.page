"use client";

import { useEffect, useRef, useState } from "react";
import { frame, onFrame } from "../house/frame";
import { LightEngine } from "./light-engine";
import { startPolicy, type StartPolicy } from "./start-policy";

/**
 * The live light. A still poster (CSS gradients, see Poster) is always there;
 * the WebGL canvas fades in over it once it may start: on idle on desktop, on a
 * tap on touch screens, never under reduced motion.
 */
export function Light() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [policy, setPolicy] = useState<StartPolicy>("never");
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => {
      const next = startPolicy({
        reducedMotion: reduced.matches,
        coarsePointer: window.matchMedia("(pointer: coarse)").matches,
        width: window.innerWidth,
        webgl2: "WebGL2RenderingContext" in window,
      });
      setPolicy(next);
      if (next === "never") setOn(false);
      return next;
    };

    let idle = 0;
    if (decide() === "idle") {
      const start = () => setOn(true);
      idle =
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(start, { timeout: 2500 })
          : window.setTimeout(start, 1200);
    }
    reduced.addEventListener("change", decide);
    return () => {
      reduced.removeEventListener("change", decide);
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      window.clearTimeout(idle);
    };
  }, []);

  useEffect(() => {
    if (!on || !canvasRef.current) return;
    let engine: LightEngine;
    try {
      engine = new LightEngine(canvasRef.current);
    } catch (error) {
      console.warn(error);
      setOn(false);
      setPolicy("never");
      return;
    }
    let first = true;
    const off = onFrame((now) => {
      if (document.hidden) return;
      engine.render(frame, now);
      if (first) {
        first = false;
        setReady(true);
      }
    });
    return () => {
      off();
      engine.dispose();
      setReady(false);
    };
  }, [on]);

  return (
    <>
      {on ? <canvas ref={canvasRef} className="nl-light" data-ready={ready} aria-hidden="true" /> : null}
      {policy === "tap" ? (
        <button
          type="button"
          className="nl-switch"
          aria-pressed={on}
          onClick={() => setOn((v) => !v)}
        >
          <span className="nl-switch-dot" aria-hidden="true" />
          {on ? "Lights down" : "Turn the lights on"}
        </button>
      ) : null}
    </>
  );
}
