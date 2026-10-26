"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { clamp, lerp } from "./math";

/** Pulls its child up to 12px towards a fine pointer, eased in one rAF loop, and springs back on leave. */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let frame = 0, x = 0, y = 0, tx = 0, ty = 0;
    const tick = () => {
      x = lerp(x, tx, 0.18); y = lerp(y, ty, 0.18);
      if (Math.abs(x - tx) < 0.05 && Math.abs(y - ty) < 0.05) { x = tx; y = ty; frame = 0; }
      else frame = requestAnimationFrame(tick);
      el.style.setProperty("--mx", `${x.toFixed(2)}px`);
      el.style.setProperty("--my", `${y.toFixed(2)}px`);
    };
    const run = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = clamp((e.clientX - r.left - r.width / 2) * strength, -12, 12);
      ty = clamp((e.clientY - r.top - r.height / 2) * strength, -12, 12);
      run();
    };
    const leave = () => { tx = 0; ty = 0; run(); };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(frame); el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, [strength]);
  return <span ref={ref} className={`us-magnetic ${className ?? ""}`}>{children}</span>;
}
