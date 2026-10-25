"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { tiltFromPointer } from "./math";
import { canHoverFinely, useReducedMotion } from "./useReducedMotion";

type TiltCardProps = { as?: ElementType; className?: string; max?: number; children: ReactNode };

/** Writes --fx-rx / --fx-ry (tilt) and --fx-sx / --fx-sy (spotlight) from the pointer. CSS decides how much to use. */
export function TiltCard({ as: Tag = "article", className, max = 6, children }: TiltCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !canHoverFinely()) return;
    let frame = 0;
    let box: DOMRect | null = null;
    let px = 0;
    let py = 0;
    const render = () => {
      frame = 0;
      if (!box) return;
      const { rx, ry } = tiltFromPointer(px, py, box.width, box.height, max);
      node.style.setProperty("--fx-rx", `${rx}deg`);
      node.style.setProperty("--fx-ry", `${ry}deg`);
      node.style.setProperty("--fx-sx", `${((px / box.width) * 100).toFixed(1)}%`);
      node.style.setProperty("--fx-sy", `${((py / box.height) * 100).toFixed(1)}%`);
    };
    const onEnter = () => { box = node.getBoundingClientRect(); };
    const onMove = (event: PointerEvent) => {
      if (!box) box = node.getBoundingClientRect();
      px = event.clientX - box.left;
      py = event.clientY - box.top;
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onLeave = () => {
      box = null;
      node.style.setProperty("--fx-rx", "0deg");
      node.style.setProperty("--fx-ry", "0deg");
    };
    node.addEventListener("pointerenter", onEnter);
    node.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointerenter", onEnter);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [max, reduced]);

  return <Tag ref={ref} className={`fx-tilt ${className ?? ""}`}>{children}</Tag>;
}
