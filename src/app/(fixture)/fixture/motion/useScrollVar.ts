"use client";

import { useEffect, type RefObject } from "react";
import { passProgress } from "./math";

/** Writes how far `ref` has passed through the viewport (0–1) to a CSS custom property on it, from one rAF per scroll. */
export function useScrollVar(ref: RefObject<HTMLElement | null>, name: string, enabled = true) {
  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let visible = false;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      node.style.setProperty(name, passProgress(rect.top, rect.height, window.innerHeight).toFixed(4));
    };
    const onScroll = () => { if (visible && !frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) onScroll();
    });
    observer.observe(node);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled, name, ref]);
}
