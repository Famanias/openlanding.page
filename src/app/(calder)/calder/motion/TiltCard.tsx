"use client";

import { useEffect, useRef } from "react";
import { tiltAngles } from "./math";
import { isLive } from "./mode";
import { canHoverFinely } from "./useReducedMotion";

const MAX_TILT = 4;

/** Tilts a few degrees toward the pointer and carries a candle-gold spotlight (--sx/--sy). CSS handles lift and release. */
export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHoverFinely() || !isLive()) return;
    let raf = 0;
    let px = 0.5, py = 0.5;

    const write = () => {
      raf = 0;
      const { rx, ry } = tiltAngles(px, py, MAX_TILT);
      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--sx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--sy", `${(py * 100).toFixed(1)}%`);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width;
      py = (e.clientY - r.top) / r.height;
      if (!raf) raf = requestAnimationFrame(write);
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={`cr-tilt ${className ?? ""}`}>
      {children}
    </div>
  );
}
