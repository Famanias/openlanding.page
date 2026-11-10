"use client";

import { useEffect } from "react";
import { progressFromOffsets } from "./math";

export function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.in = "true";
          observer?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -4% 0px" }) : null;
    items.forEach((item) => observer ? observer.observe(item) : item.setAttribute("data-in", "true"));

    let frame = 0;
    let maximum = Math.max(1, root.scrollHeight - window.innerHeight);
    const update = () => {
      frame = 0;
      root.style.setProperty("--ar-page-progress", String(progressFromOffsets(window.scrollY, 0, maximum)));
      root.style.setProperty("--ar-hero-scroll", String(Math.min(window.scrollY, window.innerHeight)));
      document.querySelector<HTMLElement>(".ar-header")?.setAttribute("data-compact", String(window.scrollY > 60));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onResize = () => { maximum = Math.max(1, root.scrollHeight - window.innerHeight); onScroll(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(onResize);
    resize?.observe(document.body);
    update();

    let disposed = false;
    let stopSmooth = () => {};
    if (window.matchMedia("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)").matches) {
      void import("lenis").then(({ default: Lenis }) => {
        if (disposed) return;
        const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
        let id = 0;
        const tick = (time: number) => { lenis.raf(time); id = requestAnimationFrame(tick); };
        id = requestAnimationFrame(tick);
        stopSmooth = () => { cancelAnimationFrame(id); lenis.destroy(); };
      });
    }
    return () => {
      disposed = true;
      stopSmooth();
      observer?.disconnect();
      resize?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return <div className="ar-progress" aria-hidden="true"><span /></div>;
}
