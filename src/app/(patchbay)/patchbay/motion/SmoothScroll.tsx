"use client";

import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

/** Lenis is imported lazily and skipped on touch screens (native momentum is better) and under reduced motion. */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    let cancelled = false;
    let frame = 0;
    let destroy = () => {};

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.1 });
      const raf = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
      const onAnchor = (event: MouseEvent) => {
        const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
        const id = link?.getAttribute("href")?.slice(1);
        const target = id ? document.getElementById(id) : null;
        if (!target) return;
        event.preventDefault();
        lenis.scrollTo(target, { offset: -72 });
      };
      document.addEventListener("click", onAnchor);
      destroy = () => {
        document.removeEventListener("click", onAnchor);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      destroy();
    };
  }, [reduced]);

  return null;
}
