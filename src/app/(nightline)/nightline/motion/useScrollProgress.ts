"use client";
import { useEffect, useState } from "react";
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => { let frame = 0; const update = () => { frame = 0; const max = document.documentElement.scrollHeight - innerHeight; setProgress(max > 0 ? scrollY / max : 0); }; const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); }; update(); addEventListener("scroll", onScroll, { passive: true }); return () => { removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); }; }, []);
  return progress;
}
