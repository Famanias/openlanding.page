"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;
    let frame = 0;
    let destroy: (() => void) | undefined;
    import("lenis").then(({ default: Lenis }) => {
      if (reduce.matches || !fine.matches) return;
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
      const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
      frame = requestAnimationFrame(raf);
      destroy = () => { cancelAnimationFrame(frame); lenis.destroy(); };
    });
    return () => destroy?.();
  }, []);
  return null;
}
