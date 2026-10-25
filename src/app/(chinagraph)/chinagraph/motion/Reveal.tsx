"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "./useInView";

export type RevealKind = "rise" | "mask" | "focus" | "draw" | "wipe" | "scale" | "slide";

type RevealProps = {
  as?: ElementType;
  kind?: RevealKind;
  index?: number;
  delay?: number;
  className?: string;
  id?: string;
  children?: ReactNode;
};

/** Toggles data-in once in view. The hidden state lives in CSS under prefers-reduced-motion: no-preference only. */
export function Reveal({ as: Tag = "div", kind = "rise", index = 0, delay = 0, className, id, children }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag ref={ref} id={id} className={className} data-reveal={kind} data-in={inView ? "true" : "false"} style={{ "--i": index, "--delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
