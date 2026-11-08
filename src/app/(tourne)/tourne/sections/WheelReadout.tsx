"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "../motion/useReducedMotion";

const BASE_RPM = 62;

/** Live readout of the wheel; ticks every second, writes text via ref so React never re-renders. */
export function WheelReadout() {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      node.textContent = String(BASE_RPM + Math.round(Math.sin(Date.now() / 1700) * 4));
    }, 1000);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <p className="tn-readout tn-mono">
      <i className="tn-readout-dot" aria-hidden="true" />
      Wheel <span ref={ref}>{BASE_RPM}</span> rpm
    </p>
  );
}
