"use client";
import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

/** Lenis smooth scroll for fine pointers only, loaded on idle so it stays out of the first long task. */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let cancelled = false;
    let frame = 0;
    let destroy: (() => void) | undefined;

    const start = () => {
      void import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -84 } });
        const raf = (time: number) => {
          lenis.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
        destroy = () => lenis.destroy();
      });
    };
    const idle = window.requestIdleCallback ? window.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 400);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cancelAnimationFrame(frame);
      destroy?.();
    };
  }, [reduced]);

  return null;
}
