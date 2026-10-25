"use client";

import { useEffect } from "react";
import { progress } from "./math";

export function ScrollVars() {
  useEffect(() => {
    if (document.documentElement.dataset.nuloMotion !== "live") return;
    const root = document.documentElement;
    let raf = 0;
    const frame = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const value = progress(window.scrollY, 0, max);
      root.style.setProperty("--nu-scroll", value.toFixed(4));
      root.style.setProperty("--nu-progress", `${Math.round(value * 100)}%`);
    };
    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(frame);
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
