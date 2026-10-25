"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "./useInView";

type RevealProps = {
  as?: ElementType;
  variant?: "rise" | "mask" | "wipe" | "scale" | "draw" | "slide-left" | "slide-right";
  delay?: number;
  index?: number;
  className?: string;
  children: ReactNode;
};

export function Reveal({ as: Tag = "div", variant = "rise", delay = 0, index = 0, className, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const style = { "--sr-delay": `${delay}ms`, "--sr-index": index } as CSSProperties;
  return (
    <Tag ref={ref} className={className} data-reveal={variant} data-in={inView ? "true" : "false"} style={style}>
      {children}
    </Tag>
  );
}
