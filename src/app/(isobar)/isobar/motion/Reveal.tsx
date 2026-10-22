"use client";

import type { ElementType, ReactNode, CSSProperties } from "react";
import { useInView } from "./useInView";

type RevealProps = {
  as?: ElementType;
  variant?: "rise" | "mask" | "wipe" | "scale";
  delay?: number;
  index?: number;
  className?: string;
  children: ReactNode;
};

export function Reveal({ as: Tag = "div", variant = "rise", delay = 0, index = 0, className, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const style = { "--delay": `${delay}ms`, "--i": index } as CSSProperties;
  return <Tag ref={ref} className={className} data-reveal={variant} data-in={inView} style={style}>{children}</Tag>;
}
