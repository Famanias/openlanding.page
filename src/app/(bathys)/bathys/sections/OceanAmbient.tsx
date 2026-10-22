"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "../motion/useReducedMotion";

/**
 * Page-wide water column, fixed behind every section. Scroll progress is
 * written to --dive (0 at the surface, 1 at the seafloor); the CSS in
 * bathys.css uses it to fade the sunlit layer out, bring bioluminescent motes
 * in and raise the trench floor into view at the bottom of the page.
 * Marine snow drifts upward and speeds up with scroll, so scrolling reads as
 * descending rather than as a page moving.
 */

type Flake = { x: number; y: number; r: number; z: number; vy: number; vx: number; a: number; ph: number };

const TICK_PERIOD = 80;
const FALLBACK_RGB = "141, 168, 194";

function tokenToRgb(value: string): string {
  const v = value.trim().replace("#", "");
  if (v.length !== 3 && v.length !== 6) return FALLBACK_RGB;
  const full = v.length === 3 ? [...v].map((c) => c + c).join("") : v;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return FALLBACK_RGB;
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export function OceanAmbient() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rulerRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ruler = rulerRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rgb = tokenToRgb(getComputedStyle(root).getPropertyValue("--color-mist"));

    let w = 0;
    let h = 0;
    let flakes: Flake[] = [];
    let raf = 0;
    let scrollQueued = false;
    let lastScroll = window.scrollY;
    let last = performance.now();

    const seed = () => {
      const count = w < 700 ? 36 : 84;
      flakes = Array.from({ length: count }, () => {
        const z = 0.25 + Math.random() * 0.75;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + z * 1.5,
          z,
          vy: 5 + z * 13,
          vx: (Math.random() - 0.5) * 5,
          a: 0.1 + z * 0.4,
          ph: Math.random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(performance.now());
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        const twinkle = 0.7 + 0.3 * Math.sin(t * 0.0011 + f.ph);
        ctx.fillStyle = `rgba(${rgb}, ${(f.a * twinkle).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const wrap = (f: Flake) => {
      if (f.y < -6) f.y += h + 12;
      else if (f.y > h + 6) f.y -= h + 12;
      if (f.x < -6) f.x += w + 12;
      else if (f.x > w + 6) f.x -= w + 12;
    };

    const syncScroll = () => {
      scrollQueued = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      root.style.setProperty("--dive", p.toFixed(3));
      if (!reduced) {
        if (ruler) ruler.style.transform = `translate3d(0, ${-((y * 0.3) % TICK_PERIOD)}px, 0)`;
        const dy = y - lastScroll;
        lastScroll = y;
        for (const f of flakes) {
          f.y -= dy * f.z * 0.45;
          wrap(f);
        }
      }
    };

    const onScroll = () => {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(syncScroll);
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      for (const f of flakes) {
        f.y -= f.vy * dt;
        f.x += (f.vx + Math.sin(now * 0.0004 + f.ph) * 4) * dt;
        wrap(f);
      }
      draw(now);
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (document.hidden || reduced) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    resize();
    syncScroll();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="bat-ocean pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="bat-ocean-shallow absolute inset-0" />
      <div className="bat-ocean-motes absolute inset-0" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Sounding-line ruler: ticks slide upward as you descend */}
      <div className="absolute bottom-0 left-0 top-16 hidden w-6 overflow-hidden opacity-60 md:block">
        <div
          ref={rulerRef}
          className="bat-ruler absolute left-0 top-0 w-full"
          style={{ height: `calc(100% + ${TICK_PERIOD}px)` }}
        />
      </div>

      {/* Trench floor rises into view as the dive completes */}
      <div className="bat-seafloor absolute inset-x-0 bottom-0 h-[22vh]">
        <svg viewBox="0 0 1200 220" preserveAspectRatio="none" className="h-full w-full" fill="none">
          <path
            d="M0 96 L90 78 L170 100 L260 64 L350 92 L450 58 L540 88 L640 70 L730 102 L830 62 L930 94 L1030 72 L1120 90 L1200 76 L1200 220 L0 220 Z"
            className="fill-navy"
            fillOpacity="0.55"
          />
          <path
            d="M0 140 L70 124 L160 146 L250 116 L340 142 L440 112 L540 140 L640 122 L740 148 L840 118 L940 144 L1040 124 L1130 140 L1200 126 L1200 220 L0 220 Z"
            className="fill-trench"
          />
          <path
            d="M0 140 L70 124 L160 146 L250 116 L340 142 L440 112 L540 140 L640 122 L740 148 L840 118 L940 144 L1040 124 L1130 140 L1200 126"
            className="stroke-slate"
            strokeOpacity="0.6"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 168 L100 154 L210 172 L330 148 L450 170 L570 152 L690 174 L810 150 L930 170 L1060 154 L1200 166"
            className="stroke-slate"
            strokeOpacity="0.14"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 196 L140 186 L280 200 L430 184 L580 198 L730 186 L880 200 L1040 188 L1200 196"
            className="stroke-slate"
            strokeOpacity="0.1"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="250" cy="116" r="3" className="bat-strobe fill-cyan" />
          <circle cx="840" cy="118" r="3" className="bat-strobe fill-cyan" style={{ animationDelay: "-1.3s" }} />
          <circle cx="540" cy="140" r="2.5" className="bat-strobe fill-amber" style={{ animationDelay: "-0.7s" }} />
        </svg>
      </div>
    </div>
  );
}
