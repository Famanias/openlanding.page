"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { clamp, damp } from "./math";
import { useReducedMotion } from "./useReducedMotion";

const MAX_TILT = 6; // degrees

/**
 * Tilts toward a fine pointer and lights a spotlight under it. Values go to CSS custom properties from one
 * rAF loop (`--rx`, `--ry`, `--mx`, `--my`); the CSS does the drawing. Off on touch and reduced motion.
 */
export function TiltCard({ children, className, as: Tag = "article" }: { children: ReactNode; className?: string; as?: "article" | "div" | "li" }) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let last = 0;
    let rx = 0;
    let ry = 0;
    let trx = 0;
    let try_ = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      rx = damp(rx, trx, 10, dt);
      ry = damp(ry, try_, 10, dt);
      node.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      node.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      if (Math.abs(trx - rx) < 0.02 && Math.abs(try_ - ry) < 0.02) frame = 0;
      else frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / rect.width);
      const y = clamp((event.clientY - rect.top) / rect.height);
      node.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      node.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      trx = (0.5 - y) * 2 * MAX_TILT;
      try_ = (x - 0.5) * 2 * MAX_TILT;
      wake();
    };
    const onLeave = () => {
      trx = 0;
      try_ = 0;
      wake();
    };
    node.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <Tag ref={ref as never} className={`sn-tilt ${className ?? ""}`}>
      {children}
    </Tag>
  );
}
