"use client";

import { useEffect, useRef } from "react";
import styles from "./flashlightStyles";

// Brand accent (#FF6B2B) as an RGB triplet; the landing page always uses the default palette.
const ACCENT = "255, 107, 43";
const BRUSH_RADIUS = 40; // px, radius of a fresh stroke
const STAMP_SPACING = 10; // px between stamps along the path, so fast strokes stay continuous
const TRAIL_LIFE = 1400; // ms until a stamp has fully faded
const STAMP_ALPHA = 0.06; // per-stamp peak; overlapping stamps build up the stroke's core
const MAX_STAMPS = 320;

type Stamp = { x: number; y: number; t: number };

// One soft orange dot, drawn once and reused for every stamp.
function createBrush(radius: number): HTMLCanvasElement {
  const size = radius * 2;
  const brush = document.createElement("canvas");
  brush.width = size;
  brush.height = size;
  const ctx = brush.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
    gradient.addColorStop(0, `rgba(${ACCENT}, 1)`);
    gradient.addColorStop(0.45, `rgba(${ACCENT}, 0.4)`);
    gradient.addColorStop(1, `rgba(${ACCENT}, 0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  return brush;
}

/**
 * Orange "paint" trail that follows the mouse across the landing page. The pointer lays
 * down soft stamps along its path and each one fades and shrinks away, so the strokes
 * dissolve behind the cursor. It is a fixed, click-through canvas: the native cursor stays
 * visible and nothing underneath is intercepted. Drawing runs only while a trail is alive
 * and never touches React state. Touch input and reduced-motion users get no effect.
 */
export function CursorFlashlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

    const brush = createBrush(BRUSH_RADIUS);
    let stamps: Stamp[] = [];
    let last: { x: number; y: number; t: number } | null = null;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      frame = 0;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Stamps are time-ordered, so expired ones are always at the front.
      let expired = 0;
      while (expired < stamps.length && now - stamps[expired].t >= TRAIL_LIFE) expired++;
      if (expired) stamps = stamps.slice(expired);

      for (const stamp of stamps) {
        const life = 1 - (now - stamp.t) / TRAIL_LIFE;
        const radius = BRUSH_RADIUS * (0.35 + 0.65 * life);
        ctx.globalAlpha = STAMP_ALPHA * life * life;
        ctx.drawImage(brush, stamp.x - radius, stamp.y - radius, radius * 2, radius * 2);
      }
      ctx.globalAlpha = 1;

      if (stamps.length) frame = requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const now = performance.now();
      const { clientX: x, clientY: y } = event;

      if (last) {
        // Fill the gap since the previous event so quick swipes paint a solid line.
        const dx = x - last.x;
        const dy = y - last.y;
        const steps = Math.max(1, Math.round(Math.hypot(dx, dy) / STAMP_SPACING));
        for (let i = 1; i <= steps; i++) {
          const k = i / steps;
          stamps.push({ x: last.x + dx * k, y: last.y + dy * k, t: last.t + (now - last.t) * k });
        }
      } else {
        stamps.push({ x, y, t: now });
      }
      if (stamps.length > MAX_STAMPS) stamps = stamps.slice(-MAX_STAMPS);
      last = { x, y, t: now };
      if (!frame) frame = requestAnimationFrame(draw);
    };

    // Re-entering the window must start a new stroke, not a line from where the mouse left.
    const endStroke = () => {
      last = null;
    };
    const onOut = (event: MouseEvent) => {
      if (!event.relatedTarget) endStroke();
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    window.addEventListener("blur", endStroke);
    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("blur", endStroke);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.trail} aria-hidden="true" />;
}
