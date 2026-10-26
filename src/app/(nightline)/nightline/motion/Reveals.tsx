"use client";
import { useEffect } from "react";

export function Reveals() {
  useEffect(() => {
    if (!document.documentElement.dataset.nlMotion) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.querySelector("[data-reveal]")?.setAttribute("data-in", "true"); observer.unobserve(entry.target); }
    }), { threshold: 0.16, rootMargin: "0px 0px -8%" });
    document.querySelectorAll<HTMLElement>(".nli-reveal-trigger").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}
