"use client";
import { useEffect } from "react";

export function Runtime() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.setAttribute("data-in", "true"); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    let frame = 0;
    const update = () => { frame = 0; const height = document.documentElement.scrollHeight - innerHeight; root.style.setProperty("--lx-progress", String(height > 0 ? scrollY / height : 0)); root.style.setProperty("--lx-shift", `${Math.min(scrollY * .035, 30)}px`); };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", scroll, { passive: true }); update();
    return () => { observer.disconnect(); window.removeEventListener("scroll", scroll); cancelAnimationFrame(frame); };
  }, []);
  return null;
}
