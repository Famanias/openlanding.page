"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { magnetOffset, round } from "./math";

/**
 * Pulls its child a few pixels toward a fine pointer and lets the CSS spring it back on leave.
 * Writes --tv-mx / --tv-my; no React state. Off for touch and reduced motion.
 */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let box = node.getBoundingClientRect();

    const onEnter = () => {
      box = node.getBoundingClientRect();
      node.dataset.pulled = "true";
    };
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.setProperty("--tv-mx", `${round(magnetOffset(event.clientX, box.left + box.width / 2), 1)}px`);
        node.style.setProperty("--tv-my", `${round(magnetOffset(event.clientY, box.top + box.height / 2), 1)}px`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      node.dataset.pulled = "false";
      node.style.setProperty("--tv-mx", "0px");
      node.style.setProperty("--tv-my", "0px");
    };
    node.addEventListener("pointerenter", onEnter);
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointerenter", onEnter);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <span ref={ref} className={`tv-magnet ${className ?? ""}`}>
      {children}
    </span>
  );
}
