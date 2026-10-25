"use client";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "./useInView";

export type RevealVariant = "rise" | "mask" | "wipe" | "scale" | "draw" | "slide-left" | "slide-right" | "pop";

type RevealProps = {
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  index?: number;
  className?: string;
  children: ReactNode;
};

/** Toggles `data-in` once the element scrolls into view; the CSS in pipkin.css does the visuals. */
export function Reveal({ as: Tag = "div", variant = "rise", delay = 0, index = 0, className, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ once: true });
  return (
    <Tag ref={ref} className={className} data-reveal={variant} data-in={inView ? "true" : "false"} style={{ "--delay": `${delay}ms`, "--i": index } as CSSProperties}>
      {children}
    </Tag>
  );
}
