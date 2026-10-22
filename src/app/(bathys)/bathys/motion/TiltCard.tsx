"use client";

import React, { useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

type TiltCardProps = {
  className?: string;
  children: React.ReactNode;
  maxTilt?: number;
};

export function TiltCard({
  className = "",
  children,
  maxTilt = 6,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    card.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    card.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    card.style.setProperty("--ry", `${((x - 0.5) * maxTilt * 2).toFixed(2)}deg`);
    card.style.setProperty("--rx", `${((0.5 - y) * maxTilt * 2).toFixed(2)}deg`);
    card.style.setProperty("--lift", "-4px");
  };

  const handlePointerLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.removeProperty("--rx");
    card.style.removeProperty("--ry");
    card.style.removeProperty("--lift");
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`bat-card ${className}`}
      style={
        {
          transform: "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(var(--lift, 0px))",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
