"use client";
import { useEffect } from "react";
export function SmoothScroll() {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(pointer: fine)");
    let destroy: (() => void) | undefined;
    let generation = 0;
    async function setup() {
      const current = ++generation;
      destroy?.(); destroy = undefined;
      if (preference.matches || !fine.matches) return;
      const { default: Lenis } = await import("lenis");
      if (current !== generation) return;
      const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -85 }, autoRaf: true });
      destroy = () => lenis.destroy();
    }
    void setup();
    preference.addEventListener("change", setup); fine.addEventListener("change", setup);
    return () => { ++generation; destroy?.(); preference.removeEventListener("change", setup); fine.removeEventListener("change", setup); };
  }, []);
  return null;
}
