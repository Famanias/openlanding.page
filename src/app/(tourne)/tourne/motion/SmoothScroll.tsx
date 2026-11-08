"use client";
import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

/** Lenis smooth scroll, fine pointers only; loaded dynamically so it stays out of the first long task. */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let cancelled = false;
    let frame = 0;
    let destroy: (() => void) | undefined;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -88 } });
      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
      destroy = () => lenis.destroy();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      destroy?.();
    };
  }, [reduced]);

  return null;
}
