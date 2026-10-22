"use client";

import { useEffect } from "react";

export function Reveals() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-js");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-oh-reveal]"));
    const reveal = (node: HTMLElement) => node.dataset.ohIn = "true";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(reveal);
      return () => root.classList.remove("has-js");
    }
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target as HTMLElement);
          instance.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    const revealNearViewport = () => {
      const cutoff = window.innerHeight * 1.25;
      nodes.forEach((node) => {
        if (node.getBoundingClientRect().top < cutoff) reveal(node);
      });
    };
    nodes.forEach((node) => observer.observe(node));
    window.addEventListener("scroll", revealNearViewport, { passive: true });
    revealNearViewport();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealNearViewport);
      root.classList.remove("has-js");
    };
  }, []);

  return null;
}
