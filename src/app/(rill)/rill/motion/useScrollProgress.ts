"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import { progressFromOffsets } from "./math";

export function useScrollProgress(ref: RefObject<HTMLElement | null>, onProgress: (progress: number) => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      onProgress(progressFromOffsets(rect.top, rect.height, window.innerHeight));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, [enabled, onProgress, ref]);
}

