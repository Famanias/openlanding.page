"use client";
import { useEffect } from "react";
import { progress } from "./math";

export function Director() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const section = document.querySelector<HTMLElement>("[data-curtain]");
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const height = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--gs-progress", `${height > 0 ? window.scrollY / height : 0}`);
      if (section && !reduce.matches) {
        const rect = section.getBoundingClientRect();
        section.style.setProperty("--gs-cue", `${progress(rect.top, rect.height, window.innerHeight)}`);
      } else section?.style.setProperty("--gs-cue", "1");
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    reduce.addEventListener("change", schedule);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.setAttribute("data-in", "true"); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    schedule();
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); reduce.removeEventListener("change", schedule); observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  return null;
}
