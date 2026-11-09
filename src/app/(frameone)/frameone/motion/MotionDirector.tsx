"use client";

import { useEffect } from "react";
import { pinProgress } from "./math";

export function MotionDirector() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.in = "true"; observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    reveals.forEach((element) => observer.observe(element));

    let scrollFrame = 0;
    const progressBar = document.querySelector<HTMLElement>(".fo-transport__progress");
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-scene]"));
    const wide = matchMedia("(min-width: 651px)");
    const updateScroll = () => {
      scrollFrame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progressBar) progressBar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const picture = scene.querySelector<HTMLElement>(".fo-reel__image > .fo-picture");
        if (picture) {
          const progress = pinProgress(scrollY, rect.top + scrollY, rect.height, innerHeight);
          picture.style.transform = !reduce.matches && wide.matches ? `scale(1.08) translate3d(0, ${-30 * progress}px, 0)` : "";
        }
      });
    };
    const onScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    reduce.addEventListener("change", onScroll);
    updateScroll();

    let pointerFrame = 0;
    let current: { element: HTMLElement; x: number; y: number } | null = null;
    const onPointerMove = (event: PointerEvent) => {
      if (reduce.matches || !fine.matches) return;
      const element = (event.target as Element).closest<HTMLElement>("[data-pointer]");
      if (!element) return;
      current = { element, x: event.clientX, y: event.clientY };
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!current) return;
        const { element: target, x, y } = current;
        const rect = target.getBoundingClientRect();
        const nx = (x - rect.left) / rect.width - 0.5;
        const ny = (y - rect.top) / rect.height - 0.5;
        if (target.classList.contains("fo-magnetic")) {
          target.style.setProperty("--fo-pull-x", `${nx * 10}px`);
          target.style.setProperty("--fo-pull-y", `${ny * 8}px`);
        }
        if (target.classList.contains("fo-proof-card")) {
          target.style.transform = `perspective(900px) rotateX(${-ny * 5}deg) rotateY(${nx * 5}deg)`;
          const glow = target.querySelector<HTMLElement>(".fo-proof-card__glow");
          if (glow) glow.style.transform = `translate3d(${x - rect.left - 200}px, ${y - rect.top - 200}px, 0)`;
        }
        const scan = target.querySelector<HTMLElement>(".fo-cell__scan");
        if (scan) scan.style.transform = `translate3d(0, ${y - rect.top}px, 0)`;
      });
    };
    const onPointerOut = (event: PointerEvent) => {
      const element = (event.target as Element).closest<HTMLElement>("[data-pointer]");
      if (!element || (event.relatedTarget instanceof Node && element.contains(event.relatedTarget))) return;
      ["--fo-pull-x", "--fo-pull-y"].forEach((property) => element.style.removeProperty(property));
      if (element.classList.contains("fo-proof-card")) element.style.removeProperty("transform");
    };
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    return () => {
      observer.disconnect(); cancelAnimationFrame(scrollFrame); cancelAnimationFrame(pointerFrame);
      removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); reduce.removeEventListener("change", onScroll);
      document.removeEventListener("pointermove", onPointerMove); document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);
  return null;
}
