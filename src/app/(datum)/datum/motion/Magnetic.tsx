"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { clamp, lerp } from "./math";
import { useReducedMotion } from "./useReducedMotion";

const MAX_PULL_PX = 10;
const RADIUS_PX = 84;

/** Subtle clockwork pointer magnetism for primary fine-pointer CTAs. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;

    const tick = () => {
      x = lerp(x, tx, 0.22);
      y = lerp(y, ty, 0.22);
      node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      frame = Math.abs(x - tx) > 0.05 || Math.abs(y - ty) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      const near = Math.hypot(dx, dy) < RADIUS_PX + box.width / 2;
      tx = near ? clamp(dx * 0.22, -MAX_PULL_PX, MAX_PULL_PX) : 0;
      ty = near ? clamp(dy * 0.22, -MAX_PULL_PX, MAX_PULL_PX) : 0;
      kick();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      node.style.transform = "";
    };
  }, [reduced]);

  return (
    <span ref={ref} className={`dt-magnetic ${className ?? ""}`}>
      {children}
    </span>
  );
}
