"use client";

import { useEffect } from "react";

export function Reveals() {
  useEffect(() => {
    if (document.documentElement.dataset.nuloMotion !== "live") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.nuIn = "true";
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    document.querySelectorAll<HTMLElement>("[data-nu-reveal]:not([data-nu-in='true'])").forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  return null;
}
