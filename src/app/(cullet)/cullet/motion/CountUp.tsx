"use client";
import { useEffect, useRef, useState } from "react";
import { easeOutCubic } from "./math";

const fmt = (n: number, decimals: number) => n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Counts to `to` once in view, in tabular figures. The final value always sits in a visually hidden span. */
export function CountUp({ to, decimals = 0, suffix = "", duration = 1500 }: { to: number; decimals?: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || to === 0 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    setValue(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(to * easeOutCubic(t));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [to, duration]);
  return (
    <span ref={ref} className="fc-count">
      <span aria-hidden="true">{fmt(value, decimals)}{suffix}</span>
      <span className="fc-sr">{fmt(to, decimals)}{suffix}</span>
    </span>
  );
}
