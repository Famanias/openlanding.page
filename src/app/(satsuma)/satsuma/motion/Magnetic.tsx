"use client";

import { useEffect, useRef } from "react";
import { clamp, lerp } from "./math";
import { canHoverFinely } from "./useReducedMotion";

const PULL = 14;

/** Pulls its child toward the pointer (≤ 14px) and springs back on leave. Fine pointers, motion allowed only. */
export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHoverFinely() || document.documentElement.dataset.saMotion !== "live") return;
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;

    const tick = () => {
      x = lerp(x, tx, 0.18);
      y = lerp(y, ty, 0.18);
      el.style.setProperty("--mx", `${x.toFixed(2)}px`);
      el.style.setProperty("--my", `${y.toFixed(2)}px`);
      raf = Math.abs(x - tx) + Math.abs(y - ty) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = clamp((e.clientX - (r.left + r.width / 2)) * 0.3, -PULL, PULL);
      ty = clamp((e.clientY - (r.top + r.height / 2)) * 0.3, -PULL, PULL);
      kick();
    };
    const leave = () => {
      tx = 0;
      ty = 0;
      kick();
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
    <span ref={ref} className={`sa-magnetic ${className ?? ""}`}>
      {children}
    </span>
  );
}
