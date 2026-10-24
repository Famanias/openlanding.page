"use client";
import { useEffect } from "react";

export function usePageProgress() {
  useEffect(() => {
    let frame = 0;
    const update = () => { frame = 0; const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); document.documentElement.style.setProperty("--hy-progress", String(Math.min(1, Math.max(0, window.scrollY / max)))); };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); if (frame) cancelAnimationFrame(frame); };
  }, []);
}

