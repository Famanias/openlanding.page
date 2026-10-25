"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { lerp } from "./math";
import { canHoverFinely, useReducedMotion } from "./useReducedMotion";

const PULL = 0.18;
const MAX = 14;

/** Pulls its child toward the pointer (fine pointers only), eased in one rAF loop, springing back on leave. */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !canHoverFinely()) return;
    let frame = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const tick = () => {
      x = lerp(x, tx, 0.22);
      y = lerp(y, ty, 0.22);
      node.style.setProperty("--cg-mx", `${x.toFixed(2)}px`);
      node.style.setProperty("--cg-my", `${y.toFixed(2)}px`);
      frame = Math.abs(x - tx) + Math.abs(y - ty) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const onMove = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      tx = Math.max(-MAX, Math.min(MAX, (event.clientX - (box.left + box.width / 2)) * PULL));
      ty = Math.max(-MAX, Math.min(MAX, (event.clientY - (box.top + box.height / 2)) * PULL));
      kick();
    };
    const onLeave = () => { tx = 0; ty = 0; kick(); };
    node.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return <span ref={ref} className="cg-magnetic">{children}</span>;
}
