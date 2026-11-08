"use client";

import { useEffect } from "react";
import { progress } from "./math";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Writes --progress (page) and --hero-p (first viewport) on <html> from one
 * rAF-throttled listener, so scroll never touches React state.
 */
export function ScrollProgress() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    if (reduced) {
      root.style.setProperty("--progress", "0");
      root.style.setProperty("--hero-p", "0");
      return;
    }
    let frame = 0;
    let viewport = window.innerHeight;
    let maxScroll = Math.max(1, root.scrollHeight - viewport);

    const measure = () => {
      viewport = window.innerHeight;
      maxScroll = Math.max(1, root.scrollHeight - viewport);
    };
    const write = () => {
      frame = 0;
      const y = window.scrollY;
      root.style.setProperty("--progress", progress(y, 0, maxScroll).toFixed(4));
      root.style.setProperty("--hero-p", progress(y, 0, viewport * 0.9).toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    const resize = new ResizeObserver(() => {
      measure();
      schedule();
    });
    resize.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduced]);

  return <div className="pby-progress" aria-hidden="true" />;
}
