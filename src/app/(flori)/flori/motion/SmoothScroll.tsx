"use client";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    let disposed = false;
    let stop = () => {};
    const setup = async () => {
      stop();
      if (!query.matches || disposed) return;
      const { default: Lenis } = await import("lenis");
      if (!query.matches || disposed) return;
      const lenis = new Lenis({ lerp: 0.1, autoRaf: true, anchors: false });
      stop = () => lenis.destroy();
    };
    void setup();
    query.addEventListener("change", setup);
    return () => { disposed = true; stop(); query.removeEventListener("change", setup); };
  }, []);
  return null;
}
