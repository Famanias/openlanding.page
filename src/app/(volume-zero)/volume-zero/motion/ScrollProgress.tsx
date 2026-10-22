"use client";

import { useEffect } from "react";

export function ScrollProgress() {
  useEffect(() => {
    let raf = 0;
    let last = 0;
    const update = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      if (Math.abs(progress - last) > 0.001) {
        document.documentElement.style.setProperty("--vz-progress", progress.toString());
        last = progress;
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <span className="vz-progress" aria-hidden="true" />;
}
