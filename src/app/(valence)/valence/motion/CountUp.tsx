"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

type CountUpProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = 850,
  className = "",
}: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState<number>(value);

  useEffect(() => {
    if (!inView || reduced) {
      setDisplay(value);
      return;
    }

    let rafId = 0;
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) {
        rafId = window.requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };

    rafId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(rafId);
  }, [inView, reduced, value, durationMs]);

  const formattedFinal = `${prefix}${value.toFixed(decimals)}${suffix}`;
  const formattedCurrent = `${prefix}${display.toFixed(decimals)}${suffix}`;

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span className="sr-only">{formattedFinal}</span>
      <span aria-hidden="true">{formattedCurrent}</span>
    </span>
  );
}
