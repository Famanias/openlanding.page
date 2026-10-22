"use client";

import React from "react";
import { useInView } from "./useInView";

export type RevealVariant = "rise" | "mask" | "wipe" | "scale" | "draw" | "slide-left" | "slide-right";

type RevealProps = {
  as?: React.ElementType;
  variant?: RevealVariant;
  delay?: number;
  index?: number;
  className?: string;
  children: React.ReactNode;
  id?: string;
};

export function Reveal({
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  index = 0,
  className = "",
  children,
  id,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ once: true, rootMargin: "0px 0px -8% 0px" });

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-reveal={variant}
      data-in={inView}
      style={
        {
          "--delay": `${delay}ms`,
          "--i": index,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
