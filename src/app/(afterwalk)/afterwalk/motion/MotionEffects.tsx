"use client";
import { useEffect } from "react";

export function MotionEffects() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const revealsByTarget = new Map<Element, HTMLElement[]>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealsByTarget.get(entry.target)?.forEach((element) => { element.dataset.in = "true"; });
          observer.unobserve(entry.target);
          revealsByTarget.delete(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight) element.dataset.motionReady = "true";
      // An element clipped to zero has no intersection. Observe its visible wrapper instead.
      const target = element.dataset.reveal === "wipe" ? element.parentElement ?? element : element;
      const reveals = revealsByTarget.get(target);
      if (reveals) reveals.push(element);
      else {
        revealsByTarget.set(target, [element]);
        observer.observe(target);
      }
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
