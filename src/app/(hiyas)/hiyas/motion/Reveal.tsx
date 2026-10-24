"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function Reveal({ children, className, index = 0, kind = "rise" }: { children: ReactNode; className?: string; index?: number; kind?: "rise" | "draw" }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || typeof IntersectionObserver === "undefined") { node?.setAttribute("data-in", "true"); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) { node.setAttribute("data-in", "true"); observer.disconnect(); } }, { threshold: .15, rootMargin: "0px 0px -8%" });
    observer.observe(node); return () => observer.disconnect();
  }, [reduced]);
  return <div ref={ref} className={className} data-reveal={kind} style={{ "--hy-index": index } as CSSProperties}>{children}</div>;
}

