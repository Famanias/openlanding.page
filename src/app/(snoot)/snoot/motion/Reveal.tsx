"use client";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { jitter } from "./math";
import { useInView } from "./useInView";

/**
 * rise:  short rise (body copy)
 * pop:   rise + scale + a little tilt on the spring curve (cards, tags) — the "wag" verb
 * grow:  scales up from its base like something unfurling (illustrations, blobs) — the "breathe" verb
 * wipe:  clip-path wipe with an inner scale settle (photographs)
 * draw:  scaleX from the left (rules, the paw trail)
 * slide: in from the left along the line (eyebrows, labels)
 * lines: masked line rise for headlines (see Lines)
 */
export type RevealVariant = "rise" | "pop" | "grow" | "wipe" | "draw" | "slide" | "lines";

type RevealProps = {
  as?: ElementType;
  variant?: RevealVariant;
  /** Extra delay in milliseconds. */
  delay?: number;
  /** Stagger index: multiplies the `--stagger` token, plus a small organic jitter. */
  index?: number;
  className?: string;
  children?: ReactNode;
  id?: string;
  style?: CSSProperties;
};

/** Toggles `data-in` when the element scrolls into view; the CSS under `no-preference` does the rest. */
export function Reveal({ as, variant = "rise", delay = 0, index = 0, className, children, id, style }: RevealProps) {
  const Tag: ElementType = as ?? "div";
  const { ref, inView } = useInView<HTMLElement>();
  const organic = index > 0 ? jitter(index, 50) : 0;
  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-reveal={variant}
      data-in={inView}
      style={{ ...style, "--delay": `${delay + organic}ms`, "--i": index } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
