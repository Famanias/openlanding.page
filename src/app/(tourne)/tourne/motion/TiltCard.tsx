"use client";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { tiltAngles } from "./math";
import { useReducedMotion } from "./useReducedMotion";

const MAX_TILT_DEG = 5;

type TiltCardProps = { as?: ElementType; className?: string; children: ReactNode };

/** Writes --rx/--ry/--mx/--my from one rAF loop; CSS turns them into tilt and a pointer spotlight. */
export function TiltCard({ as: Tag = "div", className, children }: TiltCardProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let pending: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!pending) return;
      const box = node.getBoundingClientRect();
      const px = (pending.clientX - box.left) / box.width;
      const py = (pending.clientY - box.top) / box.height;
      const { rotateX, rotateY } = tiltAngles(px, py, MAX_TILT_DEG);
      node.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
      node.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
      node.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      node.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    };
    const onMove = (event: PointerEvent) => {
      pending = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      pending = null;
      node.style.setProperty("--rx", "0deg");
      node.style.setProperty("--ry", "0deg");
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
    <Tag ref={ref} className={className} data-tilt>
      {children}
    </Tag>
  );
}
