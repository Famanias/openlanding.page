"use client";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "./useInView";

export type RevealVariant = "rise" | "mask" | "wipe" | "scale" | "draw" | "unfurl" | "slide-left" | "slide-right";

type RevealProps = {
  as?: ElementType;
  variant?: RevealVariant;
  /** Milliseconds added on top of the stagger. */
  delay?: number;
  /** Position in a cascade; multiplied by --stagger. */
  index?: number;
  className?: string;
  children?: ReactNode;
};

/** CSS carries the visuals; React only flips `data-in` once the element is in view. */
export function Reveal({ as: Tag = "div", variant = "rise", delay = 0, index = 0, className, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={variant}
      data-in={inView}
      style={{ "--delay": `${delay}ms`, "--i": index } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
