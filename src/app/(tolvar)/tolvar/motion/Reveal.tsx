"use client";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "./useInView";

/**
 * push:  a blade pass. The element is wiped in from the left and its photo settles from a slight over-scale.
 * drop:  lands from above and settles a hair past level (cards, tickets, tiles).
 * rise:  short rise for body copy.
 * draw:  scaleX from the left (rules, hatch dividers, the grade line).
 * slide: in along its own line from the left (labels, eyebrows).
 * lines: masked line rise for headlines. Wrap each line as <span class="tv-line"><span>…</span></span>.
 */
export type RevealVariant = "push" | "drop" | "rise" | "draw" | "slide" | "lines";

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
export function Reveal({ as, variant = "rise", delay = 0, index = 0, className, children, id }: RevealProps) {
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
