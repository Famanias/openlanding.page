"use client";

import { useEffect, useRef } from "react";
import { progress } from "./math";

const DURATION = 1400;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/** Counts from 0 to `value` once in view. The final value always sits in a visually hidden span for readers. */
export function CountUp({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || document.documentElement.dataset.saMotion !== "live") return;
    let raf = 0;
    el.textContent = `0${suffix}`;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = easeOut(progress(now - start, 0, DURATION));
          el.textContent = `${Math.round(value * t)}${suffix}`;
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, suffix]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" className="sa-tabular">
        {value}
        {suffix}
      </span>
      <span className="sa-sr">
        {value}
        {suffix}
      </span>
    </span>
  );
}
