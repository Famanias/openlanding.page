"use client";
import { useEffect } from "react";

export function Runtime() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    root.dataset.avlMotion = "live";
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.hasAttribute("data-loop")) entry.target.setAttribute("data-visible", String(entry.isIntersecting));
        else if (entry.isIntersecting) { entry.target.setAttribute("data-in", "true"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll("[data-reveal], [data-loop]").forEach((el) => observer.observe(el));
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty("--avl-progress", String(max > 0 ? window.scrollY / max : 0));
      root.style.setProperty("--avl-hero-shift", `${Math.min(window.scrollY * 0.05, 26)}px`);
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const visibility = () => { root.dataset.avlHidden = String(document.hidden); };
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    visibility();
    update();
    return () => { observer.disconnect(); window.removeEventListener("scroll", scroll); document.removeEventListener("visibilitychange", visibility); cancelAnimationFrame(frame); delete root.dataset.avlMotion; delete root.dataset.avlHidden; };
  }, []);
  return null;
}
