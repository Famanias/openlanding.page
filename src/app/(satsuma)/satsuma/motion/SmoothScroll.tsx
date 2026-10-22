"use client";

import { useEffect } from "react";
import { canHoverFinely } from "./useReducedMotion";

type LenisLike = { scrollTo: (target: number | string | HTMLElement, opts?: Record<string, unknown>) => void; destroy: () => void };

declare global {
  interface Window {
    __saLenis?: LenisLike;
  }
}

const HEADER_OFFSET = -72;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Lenis on desktop fine pointers with motion allowed; native scroll everywhere else. In-page anchors glide. */
export function SmoothScroll() {
  useEffect(() => {
    if (document.documentElement.dataset.saMotion !== "live" || !canHoverFinely()) return;
    let lenis: (LenisLike & { raf: (t: number) => void }) | null = null;
    let raf = 0;
    let cancelled = false;

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || !lenis || e.defaultPrevented) return;
      const id = a.getAttribute("href")!.slice(1);
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: id === "top" ? 0 : HEADER_OFFSET, duration: 1.4, easing: easeOutExpo });
      history.replaceState(null, "", `#${id}`);
    };

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true }) as unknown as LenisLike & { raf: (t: number) => void };
      window.__saLenis = lenis;
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      document.addEventListener("click", onClick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
      delete window.__saLenis;
    };
  }, []);

  return null;
}

/** Scroll to a document offset, through Lenis when it's running. */
export function scrollToY(y: number, smooth: boolean) {
  const lenis = window.__saLenis;
  if (lenis) lenis.scrollTo(y, smooth ? { duration: 1.2, easing: easeOutExpo } : { immediate: true });
  else window.scrollTo({ top: y, behavior: smooth && document.documentElement.dataset.saMotion === "live" ? "smooth" : "instant" });
}
