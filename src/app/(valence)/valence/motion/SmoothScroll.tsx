"use client";

import { useEffect } from "react";
import { onIdle } from "./mode";

export function SmoothScroll() {
  useEffect(() => {
    const canSmooth = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!canSmooth) return;

    let disposed = false;
    let rafId = 0;
    let cleanupLenis: (() => void) | null = null;

    const cancelIdle = onIdle(() => {
      import("lenis")
        .then(({ default: Lenis }) => {
          if (disposed) return;
          const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
          });
          const loop = (time: number) => {
            lenis.raf(time);
            rafId = window.requestAnimationFrame(loop);
          };
          rafId = window.requestAnimationFrame(loop);
          cleanupLenis = () => {
            if (rafId) window.cancelAnimationFrame(rafId);
            lenis.destroy();
          };
        })
        .catch(() => {
          // Graceful fallback to native scroll
        });
    });

    return () => {
      disposed = true;
      cancelIdle();
      cleanupLenis?.();
    };
  }, []);

  return null;
}
