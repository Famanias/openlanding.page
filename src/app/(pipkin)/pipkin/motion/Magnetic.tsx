"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { lerp } from "./math";
import { finePointer } from "./useReducedMotion";

/** Pulls its child a few pixels toward the pointer. Fine pointers only; written to CSS variables from one rAF loop. */
export function Magnetic({ children, strength = 14, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0, active = false;
    const loop = () => {
      x = lerp(x, tx, 0.18);
      y = lerp(y, ty, 0.18);
      el.style.setProperty("--tx", `${x.toFixed(2)}px`);
      el.style.setProperty("--ty", `${y.toFixed(2)}px`);
      if (active || Math.abs(x - tx) > 0.05 || Math.abs(y - ty) > 0.05) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const reach = Math.max(r.width, r.height) * 0.9;
      active = Math.hypot(dx, dy) < reach;
      tx = active ? (dx / reach) * strength : 0;
      ty = active ? (dy / reach) * strength : 0;
      kick();
    };
    const leave = () => { active = false; tx = 0; ty = 0; kick(); };
    window.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return <span ref={ref} className={`pk-magnet ${className ?? ""}`}>{children}</span>;
}
