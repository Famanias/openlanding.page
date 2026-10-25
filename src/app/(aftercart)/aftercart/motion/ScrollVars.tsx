"use client";

import { useEffect } from "react";
import { clamp } from "./math";

export function ScrollVars() {
  useEffect(() => {
    let frame = 0;
    const root = document.documentElement;
    const write = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--ac-progress", String(clamp(max > 0 ? window.scrollY / max : 0, 0, 1)));
      root.style.setProperty("--ac-scroll-y", `${Math.min(window.scrollY, 520)}px`);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(write);
    };
    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
