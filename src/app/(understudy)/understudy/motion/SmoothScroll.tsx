"use client";
import { useEffect } from "react";

type LenisLike = { scrollTo: (target: Element | number, opts?: object) => void; stop: () => void; start: () => void; destroy: () => void };

const expo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Lenis on fine pointers with motion allowed (lerp .105, the weight of a heavy curtain).
 * Also answers `us:goto` (scroll to an id) and `us:lock` (hold the page while a sheet is open),
 * falling back to native scrolling when Lenis is off.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: LenisLike | null = null;
    let disposed = false;
    const setup = async () => {
      lenis?.destroy();
      lenis = null;
      if (!query.matches || disposed) return;
      const { default: Lenis } = await import("lenis");
      if (!query.matches || disposed) return;
      lenis = new Lenis({ lerp: 0.105, autoRaf: true, anchors: false }) as unknown as LenisLike;
    };
    // Off-screen content renders lazily (content-visibility) and can change height while the page travels,
    // so once the scroll settles, re-aim at the target if it has moved.
    const settle = (target: HTMLElement, tries = 2) => {
      const off = target.getBoundingClientRect().top;
      if (Math.abs(off) <= 2 || tries === 0) return;
      if (lenis) lenis.scrollTo(target, { duration: 0.5, easing: expo, onComplete: () => settle(target, tries - 1) });
      else { window.scrollBy({ top: off, behavior: "instant" }); requestAnimationFrame(() => settle(target, tries - 1)); }
    };
    const goto = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      const target = id === "top" ? 0 : document.getElementById(id);
      if (target === null) return;
      if (typeof target === "number") {
        if (lenis) lenis.scrollTo(0, { duration: 1.5, easing: expo });
        else window.scrollTo({ top: 0, behavior: reduced.matches ? "instant" : "smooth" });
        return;
      }
      if (lenis) { lenis.scrollTo(target, { duration: 1.5, easing: expo, onComplete: () => settle(target) }); return; }
      target.scrollIntoView({ behavior: reduced.matches ? "instant" : "smooth", block: "start" });
      if (reduced.matches) requestAnimationFrame(() => settle(target));
      else window.addEventListener("scrollend", () => settle(target), { once: true });
    };
    const lock = (event: Event) => {
      const on = (event as CustomEvent<boolean>).detail;
      document.documentElement.toggleAttribute("data-us-lock", on);
      if (on) lenis?.stop(); else lenis?.start();
    };
    void setup();
    query.addEventListener("change", setup);
    window.addEventListener("us:goto", goto);
    window.addEventListener("us:lock", lock);
    return () => {
      disposed = true;
      lenis?.destroy();
      query.removeEventListener("change", setup);
      window.removeEventListener("us:goto", goto);
      window.removeEventListener("us:lock", lock);
    };
  }, []);
  return null;
}
