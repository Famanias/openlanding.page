"use client";

import React from "react";
import { useInView } from "./useInView";

export type RevealVariant = "rise" | "wipe" | "scale" | "draw";

export type RevealProps = {
  as?: React.ElementType;
  variant?: RevealVariant;
  delay?: number;
  index?: number;
  className?: string;
  children: React.ReactNode;
};

export function Reveal({
  as: Component = "div",
  variant = "rise",
  delay = 0,
  index = 0,
  className = "",
  children,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({
    once: true,
    rootMargin: "0px 0px -12% 0px",
  });

  const style: React.CSSProperties = {
    "--delay": `${delay}ms`,
    "--i": index,
  } as React.CSSProperties;

  return (
    <Component
      ref={ref}
      data-reveal={variant}
      data-in={inView ? "true" : undefined}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
