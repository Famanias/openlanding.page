"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function TiltCard({ children, className = "", dataAlign }: { children: ReactNode; className?: string; dataAlign?: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let rx = 0;
    let ry = 0;
    const render = () => { frame = 0; node.style.setProperty("--rl-rx", `${rx}deg`); node.style.setProperty("--rl-ry", `${ry}deg`); };
    const onMove = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      const px = (event.clientX - box.left) / box.width - 0.5;
      const py = (event.clientY - box.top) / box.height - 0.5;
      ry = px * 4;
      rx = py * -4;
      if (!frame) frame = requestAnimationFrame(render);
    };
    const reset = () => { rx = 0; ry = 0; if (!frame) frame = requestAnimationFrame(render); };
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", reset);
    return () => { node.removeEventListener("pointermove", onMove); node.removeEventListener("pointerleave", reset); if (frame) cancelAnimationFrame(frame); };
  }, [reduced]);

  return <article ref={ref} className={`rl-tilt-card ${className}`} data-align={dataAlign}>{children}</article>;
}

