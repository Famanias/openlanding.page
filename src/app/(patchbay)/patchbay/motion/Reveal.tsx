"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "./useInView";

export type RevealVariant = "rise" | "wipe" | "scale" | "draw" | "slide-left" | "slide-right";

type RevealProps = {
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  index?: number;
  className?: string;
  children?: ReactNode;
};

export function Reveal({ as: Tag = "div", variant = "rise", delay = 0, index = 0, className, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={className} data-reveal={variant} data-in={inView} style={{ "--delay": `${delay}ms`, "--i": index } as CSSProperties}>
      {children}
    </Tag>
  );
}
