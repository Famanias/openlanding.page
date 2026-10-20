"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { detectEnv, pickRenderMode, type RenderMode } from "./capabilities";

/**
 * The hero dish. Shows `poster` first; once the dish is near the viewport it lazy-loads the Three.js scene
 * (WebGPU, or WebGL2 as a fallback) and fades the canvas in over 400 ms. Reduced motion, no GPU, or a lost
 * device keep the poster.
 */
export function HeroDish({ poster }: { poster: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<RenderMode | "pending">("pending");
  const [ready, setReady] = useState(false);

  // Decide the render mode once, on the client.
  useEffect(() => {
    let cancelled = false;
    detectEnv().then((env) => {
      if (!cancelled) setMode(pickRenderMode(env));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Load and start the scene when the dish comes near the viewport.
  useEffect(() => {
    if (mode !== "webgpu" && mode !== "webgl2") return;
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
          start();
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
  }, [mode]);

  const showCanvas = mode === "webgpu" || mode === "webgl2";
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
    </div>
  );
}
