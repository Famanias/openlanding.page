"use client";
import { useEffect } from "react";

type LenisLike = { scrollTo: (target: Element | number, opts?: object) => void; stop: () => void; start: () => void; destroy: () => void };

const expo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/** Ask the page to travel somewhere: an element id, "top", or a document y. */
export const goto = (target: string | number) => window.dispatchEvent(new CustomEvent("fc:goto", { detail: target }));
/** Hold the page still (a dialog is open) or let it go. */
export const lockScroll = (on: boolean) => window.dispatchEvent(new CustomEvent("fc:lock", { detail: on }));

/**
 * Lenis on fine pointers with motion allowed (lerp .1: glass sliding on glass), dynamically imported.
 * Answers `fc:goto` and `fc:lock`, falling back to native scrolling when Lenis is off.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let lenis: LenisLike | null = null;
    let disposed = false;
    const setup = async () => {
      lenis?.destroy();
      lenis = null;
      if (!query.matches || disposed) return;
      const { default: Lenis } = await import("lenis");
      if (!query.matches || disposed) return;
      lenis = new Lenis({ lerp: 0.1, autoRaf: true, anchors: false }) as unknown as LenisLike;
      if (root.hasAttribute("data-fc-lock")) lenis.stop();
    };
    const travel = (event: Event) => {
      const detail = (event as CustomEvent<string | number>).detail;
      const target = detail === "top" ? 0 : typeof detail === "number" ? detail : document.getElementById(detail);
      if (target === null) return;
      if (lenis) { lenis.scrollTo(target, { duration: 1.4, easing: expo }); return; }
      const behavior = reduced.matches ? "instant" : "smooth";
      if (typeof target === "number") window.scrollTo({ top: target, behavior });
      else target.scrollIntoView({ behavior, block: "start" });
    };
    const lock = (event: Event) => {
      const on = (event as CustomEvent<boolean>).detail;
      root.toggleAttribute("data-fc-lock", on);
      if (on) lenis?.stop(); else lenis?.start();
    };
    void setup();
    query.addEventListener("change", setup);
    window.addEventListener("fc:goto", travel);
    window.addEventListener("fc:lock", lock);
    return () => {
      disposed = true;
      lenis?.destroy();
      query.removeEventListener("change", setup);
      window.removeEventListener("fc:goto", travel);
      window.removeEventListener("fc:lock", lock);
    };
  }, []);
  return null;
}
