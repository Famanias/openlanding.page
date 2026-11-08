"use client";

import { useEffect, useRef } from "react";
import { easeOutCubic } from "./math";
import { useInView } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

type CountUpProps = { value: number; suffix?: string; durationMs?: number; className?: string };

function format(value: number, decimals: number): string {
  return value.toFixed(decimals);
}

/** The final value always sits in a visually hidden span; the animated one is aria-hidden. */
export function CountUp({ value, suffix = "", durationMs = 1100, className }: CountUpProps) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>();
  const displayRef = useRef<HTMLSpanElement>(null);
  const decimals = Number.isInteger(value) ? 0 : 2;

  useEffect(() => {
    const node = displayRef.current;
    if (!node) return;
    if (reduced || !inView) {
      node.textContent = format(reduced || inView ? value : 0, decimals);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      node.textContent = format(value * easeOutCubic(t), decimals);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [decimals, durationMs, inView, reduced, value]);

  return (
    <span ref={ref} className={className}>
      <span className="pby-sr">
        {format(value, decimals)}
        {suffix}
      </span>
      <span aria-hidden="true" className="pby-tabular">
        <span ref={displayRef}>{format(value, decimals)}</span>
        {suffix}
      </span>
    </span>
  );
}
