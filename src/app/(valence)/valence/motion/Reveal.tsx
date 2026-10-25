"use client";

import React from "react";
import { useInView } from "./useInView";

export type RevealVariant = "rise" | "mask" | "wipe" | "scale" | "draw" | "slide-left";

type RevealProps = {
  as?: "div" | "section" | "article" | "header" | "p" | "span" | "h2" | "h3" | "li";
  variant?: RevealVariant;
  delay?: number;
  index?: number;
  className?: string;
  children?: React.ReactNode;
};

export function Reveal({
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  index = 0,
  className = "",
  children,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ once: true, rootMargin: "0px 0px -8% 0px" });

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={className}
      data-reveal={variant}
      data-in={inView ? "true" : "false"}
      style={
        {
          "--delay": `${delay}ms`,
          "--i": index,
        } as React.CSSProperties
      }
    >
      {variant === "mask" ? <span className="vl-mask-inner">{children}</span> : children}
    </Tag>
  );
}
