"use client";
import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

export type SnootWindow = Window & { __snLenis?: { scrollTo: (target: number, options?: { duration?: number }) => void } };

/** Scrolls to a page offset through Lenis when it is running, natively otherwise. */
export function scrollToY(top: number) {
  const lenis = (window as SnootWindow).__snLenis;
  if (lenis) lenis.scrollTo(top, { duration: 1.2 });
  else window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}

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
        const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -96 } });
        const raf = (time: number) => {
          lenis.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
        (window as SnootWindow).__snLenis = lenis;
        destroy = () => {
          lenis.destroy();
          delete (window as SnootWindow).__snLenis;
        };
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
