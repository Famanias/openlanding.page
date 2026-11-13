"use client";
import { useEffect } from "react";

export function MotionEffects() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.in = "true";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight) element.dataset.motionReady = "true";
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
