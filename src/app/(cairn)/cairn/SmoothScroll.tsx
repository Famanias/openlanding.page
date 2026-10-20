"use client";

import { useEffect } from "react";

/** Lenis smooth scrolling, driven by GSAP's ticker and kept in sync with ScrollTrigger. Off under reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let destroy = () => {};
    let cancelled = false;

    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ lerp: 0.12 });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        destroy = () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      },
    );

    return () => {
      cancelled = true;
      destroy();
    };
  }, []);

  return null;
}
