"use client";

import { useEffect, useRef } from "react";
import { progress } from "../motion/math";

/**
 * Sticky stack: as each card is covered by the next, it scales down and dims. Writes --cover (0–1) per card
 * from one rAF on scroll; layout is pure CSS sticky. Offsets are cached and refreshed on resize.
 */
export function NightStack({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list || document.documentElement.dataset.auMotion !== "live") return;
    const cards = Array.from(list.children) as HTMLElement[];
    let tops: number[] = [];
    let vh = window.innerHeight;
    let raf = 0;

    const measure = () => {
      vh = window.innerHeight;
      // Natural (un-stuck) positions: offsetTop inside the list plus the list's document top.
      const listTop = list.getBoundingClientRect().top + window.scrollY;
      tops = cards.map((c) => listTop + c.offsetTop);
      schedule();
    };
    const frame = () => {
      raf = 0;
      const y = window.scrollY;
      cards.forEach((card, i) => {
        const next = tops[i + 1];
        const cover = next === undefined ? 0 : progress(y + vh, next, next + vh * 0.85);
        card.style.setProperty("--cover", cover.toFixed(3));
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <ol ref={ref} className="au-night__stack">
      {children}
    </ol>
  );
}
