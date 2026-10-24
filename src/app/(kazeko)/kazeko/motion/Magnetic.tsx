"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const reduce = useReducedMotion();
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  return <span className="kz-magnetic" ref={ref} onPointerMove={(event) => {
    if (reduce || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-8, Math.min(8, (event.clientX - box.left - box.width / 2) * .07));
    const y = Math.max(-8, Math.min(8, (event.clientY - box.top - box.height / 2) * .1));
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => { ref.current?.style.setProperty("--mx", `${x}px`); ref.current?.style.setProperty("--my", `${y}px`); });
  }} onPointerLeave={() => { cancelAnimationFrame(frame.current); ref.current?.style.setProperty("--mx", "0px"); ref.current?.style.setProperty("--my", "0px"); }}>{children}</span>;
}
