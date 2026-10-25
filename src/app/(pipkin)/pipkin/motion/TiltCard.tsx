"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { tiltAngles } from "./math";
import { finePointer } from "./useReducedMotion";

/** Tilt plus a spotlight that follows the pointer. Values go to CSS variables from rAF; touch and reduced motion get nothing. */
export function TiltCard({ children, className, max = 6, style }: { children: ReactNode; className?: string; max?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let ev: PointerEvent | null = null;
    const paint = () => {
      raf = 0;
      if (!ev) return;
      const r = el.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width;
      const py = (ev.clientY - r.top) / r.height;
      const { rx, ry } = tiltAngles(px, py, max);
      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    };
    const move = (e: PointerEvent) => { ev = e; if (!raf) raf = requestAnimationFrame(paint); };
    const leave = () => {
      ev = null;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [max]);
  return <div ref={ref} className={className} style={style} data-tilt>{children}</div>;
}
