"use client";

import { useEffect, useRef } from "react";

export function Reveal({ children, className = "", kind = "mask" }: { children: React.ReactNode; className?: string; kind?: "mask" | "line" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.dataset.in = "true"; observer.disconnect(); }
    }, { threshold: 0.18 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={className} data-reveal={kind}>{children}</div>;
}
