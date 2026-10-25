"use client";

import { useEffect } from "react";

function syncScrollState() {
  const root = document.documentElement;
  const body = document.body;
  const range = Math.max(1, root.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / range));
  root.style.setProperty("--sr-scroll-progress", progress.toFixed(3));
  body.dataset.scrolled = window.scrollY > 24 ? "true" : "false";
}

export function ScrollEffects() {
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        syncScrollState();
      });
    };

    syncScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".sr-nav a[href^='#']"));
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach((link) => {
            const active = link.getAttribute("href") === `#${id}`;
            if (active) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-24% 0px -62% 0px", threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return null;
}
