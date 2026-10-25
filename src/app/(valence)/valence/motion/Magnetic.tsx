"use client";

import React, { useEffect, useRef } from "react";
import { clamp, lerp } from "./math";

type MagneticProps = {
  strength?: number;
  className?: string;
  children: React.ReactNode;
};

export function Magnetic({ strength = 10, className = "", children }: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!canHover) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.22);
      currentY = lerp(currentY, targetY, 0.22);
      if (Math.abs(currentX - targetX) < 0.1 && Math.abs(currentY - targetY) < 0.1) {
        currentX = targetX;
        currentY = targetY;
        el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
        rafId = 0;
        return;
      }
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      rafId = window.requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      targetX = clamp(dx * strength, -strength, strength);
      targetY = clamp(dy * strength, -strength, strength);
      if (!rafId) rafId = window.requestAnimationFrame(tick);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!rafId) rafId = window.requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
