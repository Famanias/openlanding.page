"use client";

import { useEffect, useRef, type ReactNode } from "react";

const MAX_TILT_DEG = 5;

/** Writes --mx/--my (spotlight) and --rx/--ry (tilt) from one rAF; fine pointers only. */
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let event: PointerEvent | null = null;

    const write = () => {
      frame = 0;
      if (!event) return;
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      node.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      node.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      node.style.setProperty("--rx", `${((0.5 - py) * 2 * MAX_TILT_DEG).toFixed(2)}deg`);
      node.style.setProperty("--ry", `${((px - 0.5) * 2 * MAX_TILT_DEG).toFixed(2)}deg`);
    };
    const move = (next: PointerEvent) => {
      event = next;
      if (!frame) frame = requestAnimationFrame(write);
    };
    const leave = () => {
      event = null;
      node.style.setProperty("--rx", "0deg");
      node.style.setProperty("--ry", "0deg");
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
    <article ref={ref} className={`pby-tilt ${className ?? ""}`}>
      {children}
    </article>
  );
}
