"use client";

import { useEffect } from "react";
import { progress } from "./math";
import { isLive, onIdle } from "./mode";

/**
 * One rAF-throttled scroll listener. It writes transform and opacity straight onto the three elements it moves (the
 * hero grid, the colonnade and the progress hairline) rather than through custom properties on a parent: a variable set
 * on <html> or the hero is inherited by every descendant and would recalculate their styles on every scroll frame.
 * No React state, and nothing at all under reduced motion.
 */
export function ScrollVars() {
  useEffect(() => {
    if (!isLive()) return;
    const hero = document.getElementById("top");
    const grid = hero?.querySelector<HTMLElement>(".cr-hero__grid");
    const lines = hero?.querySelector<HTMLElement>(".cr-hero__lines");
    const bar = document.querySelector<HTMLElement>(".cr-progress");
    const root = document.documentElement;
    let raf = 0;
    const frame = () => {
      raf = 0;
      const y = window.scrollY;
      if (hero && grid && lines) {
        // How far the first slab has lapped the hero: it settles back (scale .95) and dims.
        const out = progress(y, 0, hero.offsetHeight * 0.9);
        grid.style.transform = `scale(${(1 - out * 0.05).toFixed(4)})`;
        grid.style.opacity = (1 - out * 0.55).toFixed(3);
        lines.style.transform = `translate3d(0, ${(out * -7).toFixed(3)}%, 0)`;
      }
      if (bar) bar.style.transform = `scaleX(${progress(y, 0, root.scrollHeight - window.innerHeight).toFixed(4)})`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const cancelIdle = onIdle(() => {
      frame();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
    });
    return () => {
      cancelIdle();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      for (const el of [grid, lines, bar]) el?.style.removeProperty("transform");
      grid?.style.removeProperty("opacity");
    };
  }, []);
  return null;
}
