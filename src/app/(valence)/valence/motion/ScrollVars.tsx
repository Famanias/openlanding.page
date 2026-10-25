"use client";

import { useEffect } from "react";
import { clamp } from "./math";

export function ScrollVars() {
  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const scrollY = window.scrollY;
      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const p = clamp(scrollY / docHeight, 0, 1);
      document.documentElement.style.setProperty("--vl-progress", p.toFixed(4));

      const header = document.querySelector<HTMLElement>(".vl-header");
      if (header) {
        header.dataset.scrolled = scrollY > 64 ? "true" : "false";
      }
    };

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="vl-progress-track" aria-hidden="true">
      <div className="vl-progress-bar" />
    </div>
  );
}
