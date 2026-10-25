"use client";

import { useEffect, useRef } from "react";
import { lerp } from "./math";
import { useInView } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";

type CountUpProps = {
  value: number;
  /** Where the first count starts. Later changes count from the previous value. */
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

export function format(value: number, decimals: number, prefix = "", suffix = "") {
  return `${prefix}${value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
}

/** Tabular count-up written straight into a text node; the final value is always in a visually hidden span. */
export function CountUp({ value, from = 0, decimals = 0, prefix, suffix, duration = 900, className }: CountUpProps) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const shown = useRef<HTMLSpanElement | null>(null);
  const current = useRef(from);
  const reduced = useReducedMotion();

  // The server renders the final value (no-JS); once hydrated, park it at `from` until it scrolls in.
  useEffect(() => {
    if (!reduced && shown.current && current.current !== value) shown.current.textContent = format(current.current, decimals, prefix, suffix);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const node = shown.current;
    if (!node || !inView) return;
    const start = current.current;
    if (reduced || start === value) {
      current.current = value;
      node.textContent = format(value, decimals, prefix, suffix);
      return;
    }
    let frame = 0;
    const begin = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - begin) / duration);
      const next = lerp(start, value, easeOutExpo(t));
      current.current = next;
      node.textContent = format(next, decimals, prefix, suffix);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [decimals, duration, inView, prefix, reduced, suffix, value]);

  return (
    <span ref={ref} className={`fx-count ${className ?? ""}`}>
      <span ref={shown} aria-hidden="true">{format(value, decimals, prefix, suffix)}</span>
      <span className="fx-sr">{format(value, decimals, prefix, suffix)}</span>
    </span>
  );
}
