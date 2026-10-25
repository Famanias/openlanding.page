"use client";
import { useEffect } from "react";

const HEADER_OFFSET = 84;

/**
 * Lenis smooth scroll for fine pointers without reduced motion; native momentum everywhere else.
 * Also owns in-page anchor clicks so every "#section" link eases to its target under the sticky header.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let lenis: import("lenis").default | null = null;
    let raf = 0;
    let dead = false;

    if (!reduced && fine) {
      import("lenis").then(({ default: Lenis }) => {
        if (dead) return;
        lenis = new Lenis({ lerp: 0.1, anchors: false });
        const loop = (t: number) => {
          lenis?.raf(t);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      });
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const id = a.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -HEADER_OFFSET, duration: 1.3, easing: (t: number) => 1 - (1 - t) ** 4 });
      else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    // components ask for a scroll position with this event (e.g. the trip rail jumping to a stop)
    const onScrollTo = (e: Event) => {
      const top = (e as CustomEvent<{ top: number }>).detail?.top;
      if (typeof top !== "number") return;
      if (lenis) lenis.scrollTo(top, { duration: 1.4, easing: (t: number) => 1 - (1 - t) ** 4 });
      else window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    };
    document.addEventListener("click", onClick);
    window.addEventListener("pk:scrollto", onScrollTo);
    return () => {
      dead = true;
      document.removeEventListener("click", onClick);
      window.removeEventListener("pk:scrollto", onScrollTo);
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
  return null;
}
