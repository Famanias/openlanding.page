"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "../motion/useReducedMotion";
import { clamp, lerp } from "../motion/math";
import { additive, glow, toRgb, type Creature, type DrawState, type Rgb } from "./draw";
import { placeCreature, travelX } from "./placement";
import { createSiphonophore } from "./siphonophore";
import { createAnglerfish } from "./anglerfish";
import { createDumbo } from "./dumbo";
import { createSnailfish } from "./snailfish";

/**
 * Deep-sea fauna, drawn in 2D on a canvas over the page with screen blending.
 * Each animal is anchored to a depth in the dive: it rises into view as you
 * scroll toward that depth, drifts slowly across, and sinks away again, always
 * lagging the page so it reads as part of the water. Screen blending can only
 * add light, never darken, so a creature can't hide text, cards or controls,
 * and its near-black parts (an anglerfish's body) simply disappear. The layer
 * ignores the pointer.
 */

const KEYS = ["trench", "navy", "titanium", "cyan", "amber", "glass", "slate", "mist"] as const;

type Spark = { x: number; y: number; r: number; age: number; life: number };

type Track = { x: number; y: number; vx: number; vy: number; seen: boolean };

export function DeepLife() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const style = getComputedStyle(document.documentElement);
    const rgb = Object.fromEntries(KEYS.map((k) => [k, toRgb(style.getPropertyValue(`--color-${k}`))])) as Rgb;

    const creatures: Creature[] = [createSiphonophore(), createAnglerfish(), createDumbo(), createSnailfish()];
    const tracks = new Map<string, Track>();
    const sparks: Spark[] = [];
    let vw = 0;
    let vh = 0;
    let raf = 0;
    let last = performance.now();
    let sparkClock = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = Math.round(vw * dpr);
      canvas.height = Math.round(vh * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;
      const scrollY = window.scrollY;
      const docMax = Math.max(document.documentElement.scrollHeight - vh, 1);
      const dive = clamp(scrollY / docMax, 0, 1);
      // keep animals a sensible size on small and ultra-wide screens
      const base = clamp(Math.min(vw, vh * 1.6) / 1440, 0.5, 1.15) * 1.3;

      ctx.clearRect(0, 0, vw, vh);

      for (const cr of creatures) {
        const place = placeCreature({ scrollY, docMax, vh, center: cr.center, parallax: cr.parallax });
        if (place.visibility <= 0.003) {
          tracks.delete(cr.id);
          continue;
        }
        const tx = travelX(place.progress, cr.from, cr.to, vw);
        let tr = tracks.get(cr.id);
        if (!tr) {
          tr = { x: tx, y: place.y, vx: 0, vy: 0, seen: true };
          tracks.set(cr.id, tr);
        }
        // ease toward the scroll-driven target so jumps become glides
        const k = 1 - Math.exp(-dt * 2.6);
        const nx = lerp(tr.x, tx, k);
        const ny = lerp(tr.y, place.y, k);
        const ivx = (nx - tr.x) / Math.max(dt, 0.001);
        const ivy = (ny - tr.y) / Math.max(dt, 0.001);
        tr.vx = lerp(tr.vx, ivx, 1 - Math.exp(-dt * 4));
        tr.vy = lerp(tr.vy, ivy, 1 - Math.exp(-dt * 4));
        tr.x = nx;
        tr.y = ny;

        const state: DrawState = {
          t,
          dt,
          x: tr.x,
          y: tr.y,
          scale: base,
          facing: cr.to >= cr.from ? 1 : -1,
          alpha: place.visibility * 0.8,
          vx: tr.vx,
          vy: tr.vy,
        };
        cr.draw(ctx, state, rgb);
      }

      // rare flashes of plankton, more of them the deeper you are
      sparkClock -= dt;
      if (sparkClock <= 0) {
        sparkClock = lerp(1.1, 0.4, dive) * (0.5 + Math.random());
        const cx = Math.random() * vw;
        const cy = Math.random() * vh;
        const n = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < n; i++) {
          sparks.push({
            x: cx + (Math.random() - 0.5) * 70,
            y: cy + (Math.random() - 0.5) * 70,
            r: 3 + Math.random() * 5,
            age: -i * 0.14,
            life: 0.7 + Math.random() * 0.8,
          });
        }
      }
      additive(ctx, () => {
        for (let i = sparks.length - 1; i >= 0; i--) {
          const sp = sparks[i];
          sp.age += dt;
          if (sp.age >= sp.life) {
            sparks.splice(i, 1);
            continue;
          }
          if (sp.age < 0) continue;
          const u = sp.age / sp.life;
          const env = Math.sin(Math.PI * Math.min(u * 1.6, 1)) ** 2 * (1 - u * 0.6);
          glow(ctx, sp.x, sp.y, sp.r * 4, rgb.cyan, 0.5 * env);
          glow(ctx, sp.x, sp.y, sp.r, rgb.titanium, 0.5 * env);
        }
      });
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="bat-life pointer-events-none fixed inset-0 z-[4] overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
