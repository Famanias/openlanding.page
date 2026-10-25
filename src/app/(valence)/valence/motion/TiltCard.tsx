"use client";

import React, { useEffect, useRef } from "react";
import { tiltAngles } from "./math";

type TiltCardProps = {
  className?: string;
  maxDeg?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export function TiltCard({ className = "", maxDeg = 3.5, style, children }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canTilt = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!canTilt) return;

    let rafId = 0;
    let clientX = 0;
    let clientY = 0;

    const updateVars = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const nx = (clientX - rect.left) / rect.width;
      const ny = (clientY - rect.top) / rect.height;
      const { rx, ry } = tiltAngles(nx, ny, maxDeg);
      el.style.setProperty("--mx", `${(nx * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(ny * 100).toFixed(1)}%`);
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
    };

    const onMove = (e: PointerEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
      if (!rafId) rafId = window.requestAnimationFrame(updateVars);
    };

    const onLeave = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [maxDeg]);

  return (
    <div ref={ref} className={`vl-card ${className}`} style={style}>
      {children}
    </div>
  );
}
