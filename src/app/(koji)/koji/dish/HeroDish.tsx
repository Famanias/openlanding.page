"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { detectEnv, pickRenderMode, type RenderMode } from "./capabilities";

/** Phones, touch screens and data-saver connections get 3D on request, so it never competes with first paint. */
function shouldAutoStart(): boolean {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return !coarse && !saveData && window.innerWidth >= 900;
}

/** Resolves once the page has loaded and the main thread has a quiet moment. */
function afterIdle(): Promise<void> {
  return new Promise((resolve) => {
    const idle = () =>
      "requestIdleCallback" in window ? window.requestIdleCallback(() => resolve(), { timeout: 2500 }) : setTimeout(resolve, 600);
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
  });
}

/**
 * The hero dish. Shows `poster` first. On desktop it lazy-loads the Three.js scene (WebGPU, or WebGL2 as a
 * fallback) once the page is idle; on phones a "View the dish in 3D" button loads it on request. The canvas
 * fades in over 400 ms. Reduced motion, no GPU, or a lost device keep the poster.
 */
export function HeroDish({ poster }: { poster: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<RenderMode | "pending">("pending");
  const [ready, setReady] = useState(false);
  const [requested, setRequested] = useState<"auto" | "wait" | "go" | null>(null);

  // Decide the render mode once, on the client.
  useEffect(() => {
    let cancelled = false;
    detectEnv().then((env) => {
      if (cancelled) return;
      setMode(pickRenderMode(env));
      setRequested(shouldAutoStart() ? "auto" : "wait");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Load and start the scene when the dish comes near the viewport.
  useEffect(() => {
    if (mode !== "webgpu" && mode !== "webgl2") return;
    if (requested !== "auto" && requested !== "go") return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    let scene: { dispose(): void } | undefined;
    let cancelled = false;

    const start = async () => {
      const { createDishScene } = await import("./createDishScene");
      if (cancelled || !canvasRef.current) return;
      try {
        scene = await createDishScene(canvasRef.current, {
          forceWebGL: mode === "webgl2",
          onReady: () => !cancelled && setReady(true),
          onLost: () => {
            scene?.dispose();
            scene = undefined;
            if (!cancelled) setMode("poster");
          },
        });
        if (cancelled) scene.dispose();
      } catch {
        if (!cancelled) setMode("poster");
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          // Auto-start waits for an idle main thread; a tap starts immediately.
          (requested === "auto" ? afterIdle() : Promise.resolve()).then(() => {
            if (!cancelled) void start();
          });
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(wrap);
    return () => {
      cancelled = true;
      io.disconnect();
      scene?.dispose();
    };
  }, [mode, requested]);

  const gpu = mode === "webgpu" || mode === "webgl2";
  const showCanvas = gpu && (requested === "auto" || requested === "go");
  return (
    <div ref={wrapRef} className="kj-dish" data-mode={mode} data-ready={ready ? "" : undefined}>
      <div className="kj-dish__poster">{poster}</div>
      {showCanvas ? (
        <canvas
          ref={canvasRef}
          className="kj-dish__canvas"
          data-ready={ready ? "true" : "false"}
          aria-label="A piece of miso-glazed nigiri, slowly turning. Drag to rotate."
          role="img"
        />
      ) : null}
      {showCanvas ? (
        <p className="kj-mono kj-dish__hint" aria-hidden="true">
          Drag to turn the plate
        </p>
      ) : null}
      {gpu && requested === "wait" ? (
        <button type="button" className="kj-btn kj-btn--shu kj-dish__start" onClick={() => setRequested("go")}>
          View the dish in 3D
        </button>
      ) : null}
    </div>
  );
}
