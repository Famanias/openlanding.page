"use client";
import { useEffect, useRef } from "react";
import { easeOutQuint } from "./math";
import { useInView } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

type CountUpProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  durationMs?: number;
};

/** Tabular-numerals count-up keeping the exact final value in a visually hidden span. */
export function CountUp({ value, decimals = 0, suffix = "", durationMs = 820 }: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const displayRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  useEffect(() => {
    const node = displayRef.current;
    if (!node || !inView || reduced) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const current = value * easeOutQuint(t);
      node.textContent = `${current.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, decimals, suffix, durationMs]);

  return (
    <span ref={ref} className="dt-count">
      <span className="dt-sr">
        {formatted}
        {suffix}
      </span>
      <span ref={displayRef} aria-hidden="true">
        {formatted}
        {suffix}
      </span>
    </span>
  );
}
