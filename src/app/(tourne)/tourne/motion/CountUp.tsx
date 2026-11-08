"use client";
import { useEffect, useRef } from "react";
import { easeOutQuint } from "./math";
import { useInView } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

type CountUpProps = { value: number; suffix?: string; durationMs?: number };

/** Tweens to `value`; DOM update via ref so React never re-renders during animation. */
export function CountUp({ value, suffix = "", durationMs = 900 }: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const displayRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = displayRef.current;
    if (!node || !inView || reduced) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      node.textContent = `${Math.round(value * easeOutQuint(t)).toLocaleString("en-US")}${suffix}`;
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    node.textContent = `0${suffix}`;
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value, suffix, durationMs]);

  return (
    <span ref={ref} className="tn-count">
      <span className="tn-sr">
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
      <span ref={displayRef} aria-hidden="true">
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
    </span>
  );
}
