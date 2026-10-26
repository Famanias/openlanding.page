"use client";

import { useEffect } from "react";

export function Reveals() {
  useEffect(() => {
    const revealNodes = [...document.querySelectorAll<HTMLElement>("[data-as-reveal]")];
    const wordNodes = [...document.querySelectorAll<HTMLElement>("[data-as-word]")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealNodes.forEach((node) => node.dataset.in = "true");
      wordNodes.forEach((node) => node.dataset.in = "true");
      return;
    }
    const observer = new IntersectionObserver((entries, current) => entries.forEach((entry) => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.in = "true"; current.unobserve(entry.target); }
    }), { threshold: 0.16, rootMargin: "0px 0px -8%" });
    [...revealNodes, ...wordNodes].forEach((node) => observer.observe(node));
    // Clipped headline masks can report no visible intersection even while their parent is in view.
    [...revealNodes, ...wordNodes].forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) node.dataset.in = "true";
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
