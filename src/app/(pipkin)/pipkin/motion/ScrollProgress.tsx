"use client";
import { useEffect } from "react";
import { clamp } from "./math";

/**
 * One rAF-throttled scroll listener for the whole page. Writes --page-p on <html> and two data attributes
 * the header reads (scrolled past 80px, scroll direction). Renders the hairline progress bar.
 */
export function ScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let last = window.scrollY;
    let dir = "up";
    const paint = () => {
      raf = 0;
      const y = window.scrollY;
      const max = Math.max(1, root.scrollHeight - window.innerHeight);
      root.style.setProperty("--page-p", clamp(y / max).toFixed(4));
      root.dataset.pkScrolled = y > 80 ? "true" : "false";
      if (Math.abs(y - last) > 6) {
        dir = y > last ? "down" : "up";
        last = y;
      }
      root.dataset.pkDir = y < 160 ? "up" : dir;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="pk-progress" aria-hidden="true"><i /></div>;
}
