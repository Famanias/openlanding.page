"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const render = () => {
      frame = 0;
      node.style.setProperty("--rl-mx", `${x}px`);
      node.style.setProperty("--rl-my", `${y}px`);
    };
    const onMove = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      x = (event.clientX - (box.left + box.width / 2)) * 0.12;
      y = (event.clientY - (box.top + box.height / 2)) * 0.12;
      if (!frame) frame = requestAnimationFrame(render);
    };
    const reset = () => { x = 0; y = 0; if (!frame) frame = requestAnimationFrame(render); };
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", reset);
    return () => { node.removeEventListener("pointermove", onMove); node.removeEventListener("pointerleave", reset); if (frame) cancelAnimationFrame(frame); };
  }, [reduced]);

  return <span ref={ref} className="rl-magnetic">{children}</span>;
}

