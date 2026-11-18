"use client";
import { useEffect, useRef, useState } from "react";
import { FETCH_EVENT } from "../forms/BookingForm";
import { useReducedMotion } from "../motion/useReducedMotion";
import type { BallScene } from "./ballScene";

type Mode = "poster" | "loading" | "live";

/** The poster: the same ball, drawn flat. It is the LCP-safe default and the reduced-motion state. */
function Poster() {
  return (
    <svg className="sn-ball-poster" viewBox="0 0 200 220" aria-hidden="true">
      <ellipse className="sn-ball-poster-shadow" cx="100" cy="206" rx="62" ry="10" />
      <g className="sn-ball-poster-ball">
        <circle cx="100" cy="100" r="84" className="sn-f-yolk sn-f-line" />
        <path className="sn-ball-poster-seam" d="M30 56c40 20 40 68 0 92M170 52c-40 22-40 74 0 96" />
        <ellipse cx="70" cy="64" rx="18" ry="10" className="sn-ball-poster-gloss" transform="rotate(-30 70 64)" />
      </g>
    </svg>
  );
}

/**
 * Loads the real-time ball late: on desktop when the browser is idle and the stage is within a viewport,
 * on touch screens only when tapped. It never mounts under reduced motion. Listens for the booking form's
 * success and throws the ball (or the poster, if the 3D isn't running).
 */
export function BallStage() {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>("poster");
  const [throwing, setThrowing] = useState(0);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<BallScene | null>(null);
  const startRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    startRef.current = () => {
      if (sceneRef.current || !canvasRef.current) return;
      setMode("loading");
      void import("./ballScene")
        .then(({ createBallScene }) =>
          createBallScene(canvasRef.current!, {
            onReady: () => !cancelled && setMode("live"),
            onLost: () => {
              sceneRef.current?.dispose();
              sceneRef.current = null;
              setMode("poster");
            },
          }),
        )
        .then((scene) => {
          if (cancelled) scene.dispose();
          else sceneRef.current = scene;
        })
        .catch(() => !cancelled && setMode("poster"));
    };

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let idle = 0;
    let io: IntersectionObserver | undefined;
    if (fine && hostRef.current) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io?.disconnect();
          idle = window.requestIdleCallback ? window.requestIdleCallback(() => startRef.current(), { timeout: 2000 }) : window.setTimeout(() => startRef.current(), 600);
        },
        { rootMargin: "100% 0px" },
      );
      io.observe(hostRef.current);
    }
    return () => {
      cancelled = true;
      io?.disconnect();
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    const onFetch = () => {
      if (sceneRef.current) sceneRef.current.throwBall();
      else if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setThrowing((n) => n + 1);
    };
    window.addEventListener(FETCH_EVENT, onFetch);
    return () => window.removeEventListener(FETCH_EVENT, onFetch);
  }, []);

  return (
    <div ref={hostRef} className="sn-ball" data-mode={mode} data-throw={throwing ? throwing % 2 : undefined}>
      <Poster />
      {!reduced ? <canvas ref={canvasRef} className="sn-ball-canvas" aria-label="A 3D tennis ball. Drag to spin it." data-sn-ball-canvas /> : null}
      {!reduced && mode === "poster" ? (
        <button type="button" className="sn-ball-play sn-chart" onClick={() => startRef.current()}>
          Tap to play fetch
        </button>
      ) : null}
    </div>
  );
}
