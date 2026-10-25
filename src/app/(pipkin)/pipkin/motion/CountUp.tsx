"use client";
import { useEffect, useState } from "react";
import { easeOutExpo } from "./math";
import { useInView } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

/** Counts up once in view. The final value is always in the DOM (visually hidden) and is the server-rendered text. */
export function CountUp({ to, suffix = "", decimals = 0, duration = 1400 }: { to: number; suffix?: string; decimals?: number; duration?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const reduced = useReducedMotion();
  const fmt = (v: number) => `${v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
  const final = fmt(to);
  const [shown, setShown] = useState(final);
  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = (now - t0) / duration;
      setShown(fmt(to * easeOutExpo(Math.min(t, 1))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, to, suffix, decimals, duration]);
  return (
    <span ref={ref} className="pk-count">
      <span className="pk-sr">{final}</span>
      <span aria-hidden="true" className="pk-tnum">{shown}</span>
    </span>
  );
}
