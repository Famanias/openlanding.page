"use client";

import { useEffect } from "react";

/**
 * Behaviour for the slab header, attached to markup the server already rendered:
 * it hides while scrolling down and returns on the way up, and a sliding underline
 * follows whichever section owns the middle of the screen.
 */
export function SiteChrome() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-nm-header]");
    const nav = header?.querySelector<HTMLElement>("[data-nm-nav]");
    if (!header || !nav) return;

    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
    const targets = links.map((link) => document.querySelector<HTMLElement>(link.getAttribute("href") ?? ""));

    const place = (index: number) => {
      const link = links[index];
      if (!link) {
        nav.dataset.on = "false";
        return;
      }
      nav.style.setProperty("--x", `${link.offsetLeft}px`);
      nav.style.setProperty("--s", String(link.offsetWidth / 100));
      nav.dataset.on = "true";
      links.forEach((l, i) => (i === index ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current")));
    };

    let current = -1;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = targets.indexOf(entry.target as HTMLElement);
          if (index === -1) continue;
          if (entry.isIntersecting) current = index;
          else if (current === index) current = -1;
        }
        place(current);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    targets.forEach((t) => t && io.observe(t));

    let lastY = window.scrollY;
    let frame = 0;
    const read = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      header.dataset.scrolled = y > 8 ? "true" : "false";
      if (y < 160 || delta < -4 || header.contains(document.activeElement)) header.dataset.hidden = "false";
      else if (delta > 6) header.dataset.hidden = "true";
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    const onResize = () => place(current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    header.addEventListener("focusin", () => (header.dataset.hidden = "false"));
    read();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
