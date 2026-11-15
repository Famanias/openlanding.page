"use client";
import { useEffect, useRef } from "react";
import { easeOutQuint } from "./math";
import { useInView } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

type CountUpProps = { value: number; duration?: number; className?: string; suffix?: string };

/**
 * Counts up to `value` the first time it is seen. The final value is server-rendered and kept in a visually
 * hidden span, so no-JS, reduced motion and screen readers all get the real number.
 */
export function CountUp({ value, duration = 1400, className, suffix = "" }: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ rootMargin: "0px 0px -8% 0px" });
  const visible = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();
  const final = `${value.toLocaleString("en-US")}${suffix}`;

  useEffect(() => {
    const node = visible.current;
    if (!node || !inView || reduced) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      node.textContent = `${Math.round(value * easeOutQuint(t)).toLocaleString("en-US")}${suffix}`;
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      node.textContent = final;
    };
  }, [inView, reduced, value, duration, suffix, final]);

  return (
    <span ref={ref} className={`ew-count ${className ?? ""}`}>
      <span ref={visible} aria-hidden="true">
        {final}
      </span>
      <span className="ew-sr">{final}</span>
    </span>
  );
}
