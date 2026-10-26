"use client";

import { useEffect } from "react";

export function ScrollMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const progress = document.querySelector<HTMLElement>(".as-progress-bar");
    const back = document.querySelector<HTMLElement>("[data-as-scroll-layer=back]");
    const photo = document.querySelector<HTMLElement>("[data-as-scroll-layer=photo]");
    const front = document.querySelector<HTMLElement>("[data-as-scroll-layer=front]");
    const acetate = document.querySelector<HTMLElement>("[data-as-scroll-layer=acetate]");
    if (!progress || !back || !photo || !front || !acetate) return;
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pageProgress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      progress.style.transform = `scaleX(${pageProgress})`;
      back.style.setProperty("--as-scroll-y", `${pageProgress * -28}px`);
      photo.style.setProperty("--as-scroll-y", `${pageProgress * 18}px`);
      front.style.setProperty("--as-scroll-y", `${pageProgress * -12}px`);
      acetate.style.setProperty("--as-scroll-y", `${pageProgress * 26}px`);
    };
    const onScroll = () => { if (frame === null) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame !== null) cancelAnimationFrame(frame); };
  }, []);
  return null;
}
