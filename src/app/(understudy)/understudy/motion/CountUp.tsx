"use client";
import { useEffect, useRef, useState } from "react";

const ease = (t: number) => 1 - (1 - t) ** 4;

/** Counts to `to` once in view, in tabular figures. The final value is always in a visually hidden span. */
export function CountUp({ to, prefix = "", suffix = "", duration = 1400 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    setValue(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setValue(Math.round(to * ease(t)));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [to, duration]);
  const text = `${prefix}${to.toLocaleString("en-US")}${suffix}`;
  return (
    <span ref={ref} className="us-count">
      <span aria-hidden="true">{prefix}{value.toLocaleString("en-US")}{suffix}</span>
      <span className="us-sr">{text}</span>
    </span>
  );
}
