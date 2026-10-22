"use client";

import { useEffect } from "react";
import { progress } from "./math";

/**
 * One rAF-throttled scroll listener. It writes --sa-out (0–1: how far the hero has been covered) on the hero,
 * which scales and dims the frame as the next band slides over it. No React state, and nothing under reduced motion.
 */
export function ScrollVars() {
  useEffect(() => {
    if (document.documentElement.dataset.saMotion !== "live") return;
    const hero = document.getElementById("top");
    if (!hero) return;
    let raf = 0;
    const frame = () => {
      raf = 0;
      hero.style.setProperty("--sa-out", progress(window.scrollY, 0, hero.offsetHeight * 0.9).toFixed(4));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return null;
}
