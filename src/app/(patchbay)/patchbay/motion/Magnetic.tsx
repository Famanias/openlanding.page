"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { lerp } from "./math";

const MAX_PULL = 12;

/** Pointer-proximity pull on fine pointers only; the label follows at 40% so the button feels weighty. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    const tick = () => {
      x = lerp(x, targetX, 0.18);
      y = lerp(y, targetY, 0.18);
      node.style.setProperty("--mag-x", `${x.toFixed(2)}px`);
      node.style.setProperty("--mag-y", `${y.toFixed(2)}px`);
      frame = Math.abs(x - targetX) + Math.abs(y - targetY) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      targetX = Math.max(-MAX_PULL, Math.min(MAX_PULL, dx * 0.25));
      targetY = Math.max(-MAX_PULL, Math.min(MAX_PULL, dy * 0.25));
      kick();
    };
    const leave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };

    node.addEventListener("pointermove", move, { passive: true });
    node.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <span ref={ref} className={`pby-magnetic ${className ?? ""}`}>
      {children}
    </span>
  );
}
