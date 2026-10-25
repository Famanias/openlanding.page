"use client";

import { useEffect } from "react";
import { canHoverFinely, reducedMotion } from "./useReducedMotion";

type LenisLike = { raf: (time: number) => void; destroy: () => void; scrollTo: (target: HTMLElement | string, options?: Record<string, unknown>) => void };

declare global {
  interface Window {
    __nuloLenis?: LenisLike;
  }
}

const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion() || !canHoverFinely() || document.documentElement.dataset.nuloMotion !== "live") return;
    let lenis: LenisLike | null = null;
    let raf = 0;
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true }) as unknown as LenisLike;
      window.__nuloLenis = lenis;
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || !lenis) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.15, easing: ease });
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
      delete window.__nuloLenis;
    };
  }, []);
  return null;
}
