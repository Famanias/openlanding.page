"use client";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "./useInView";

/**
 * approach: scale and rise toward the reader (blocks, cards)
 * settle:   short rise (body copy)
 * wipe:     clip-path wipe of the child with an inner scale settle (photographs)
 * draw:     scaleX from the left (rules)
 * slide:    in from the left along the line (posts, labels)
 * lines:    masked line rise for headlines (see Lines)
 */
export type RevealVariant = "approach" | "settle" | "wipe" | "draw" | "slide" | "lines";

type RevealProps = {
  as?: ElementType;
  variant?: RevealVariant;
  /** Extra delay in milliseconds. */
  delay?: number;
  /** Stagger index: multiplies the `--stagger` token. */
  index?: number;
  className?: string;
  children?: ReactNode;
  id?: string;
};

/** Toggles `data-in` when the element scrolls into view; the CSS under `no-preference` does the rest. */
export function Reveal({ as, variant = "settle", delay = 0, index = 0, className, children, id }: RevealProps) {
  const Tag: ElementType = as ?? "div";
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-reveal={variant}
      data-in={inView}
      style={{ "--delay": `${delay}ms`, "--i": index } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
