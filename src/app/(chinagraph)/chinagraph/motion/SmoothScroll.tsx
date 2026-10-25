"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import { canHoverFinely } from "./useReducedMotion";

let instance: Lenis | null = null;
const HEADER_OFFSET = -72;

/** Scroll to a document y (or element), through Lenis when it runs, natively otherwise. */
export function scrollToTarget(target: number | HTMLElement) {
  if (instance) {
    instance.scrollTo(target, { offset: typeof target === "number" ? 0 : HEADER_OFFSET, duration: 1.1, easing: (t) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t)) });
    return;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
}

/** Lenis on fine pointers with motion allowed; native momentum on touch. Also routes in-page anchor clicks. */
export function SmoothScroll() {
  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduced && canHoverFinely()) {
      import("lenis").then(({ default: LenisCtor }) => {
        if (cancelled) return;
        instance = new LenisCtor({ lerp: 0.1, smoothWheel: true });
        const raf = (time: number) => {
          instance?.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
      });
    }

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href^='#']");
      if (!link || link.hasAttribute("data-goto")) return;
      const id = link.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      event.preventDefault();
      scrollToTarget(target);
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick);
      if (frame) cancelAnimationFrame(frame);
      instance?.destroy();
      instance = null;
    };
  }, []);

  return null;
}
