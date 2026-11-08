"use client";
import { useEffect } from "react";
import { clamp, lerp, progress } from "./math";
import { useReducedMotion } from "./useReducedMotion";

const COMPRESS_AFTER_PX = 80;
const HIDE_DELTA_PX = 6;
const MAX_VELOCITY = 1;

/**
 * The single scroll loop. It writes CSS custom properties on <html>
 * (--page-progress, --hero-p, --vel) and the header's data-state; no React state.
 */
export function ScrollEngine() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const header = document.getElementById("tn-header");
    let lastY = window.scrollY;
    let velocity = 0;
    let frame = 0;
    let running = false;

    const write = () => {
      const y = window.scrollY;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      const delta = y - lastY;
      velocity = lerp(velocity, clamp(delta / 60, -MAX_VELOCITY, MAX_VELOCITY), 0.2);
      root.style.setProperty("--page-progress", (y / max).toFixed(4));
      root.dataset.heroAway = String(y > window.innerHeight * 1.2);
      if (!reduced) {
        root.style.setProperty("--hero-p", progress(y, 0, window.innerHeight).toFixed(4));
        root.style.setProperty("--vel", velocity.toFixed(3));
      }
      if (header) {
        const hidden = y > window.innerHeight * 0.6 && delta > HIDE_DELTA_PX;
        const shown = delta < -HIDE_DELTA_PX || y < window.innerHeight * 0.6;
        if (hidden) header.dataset.hidden = "true";
        else if (shown) header.dataset.hidden = "false";
        header.dataset.compact = String(y > COMPRESS_AFTER_PX);
      }
      lastY = y;
      velocity *= 0.9;
      running = Math.abs(velocity) > 0.002;
      frame = running ? requestAnimationFrame(write) : 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
      root.style.removeProperty("--vel");
      root.style.removeProperty("--hero-p");
    };
  }, [reduced]);

  return null;
}
