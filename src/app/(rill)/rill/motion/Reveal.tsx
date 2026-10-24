"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  index?: number;
  kind?: "rise" | "line" | "wipe";
};

export function Reveal({ children, className, index = 0, kind = "rise" }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || typeof IntersectionObserver === "undefined") {
      node?.setAttribute("data-in", "true");
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        node.setAttribute("data-in", "true");
        observer.disconnect();
      }
    }, { threshold: 0.16, rootMargin: "0px 0px -8%" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return <div ref={ref} className={className} data-reveal={kind} style={{ "--rl-index": index } as CSSProperties}>{children}</div>;
}

