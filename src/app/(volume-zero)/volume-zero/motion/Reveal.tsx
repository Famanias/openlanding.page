"use client";

import { useEffect, useRef } from "react";

export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "span" | "p" | "h2" | "h3" | "article" | "figure" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
  }, []);
  return <Tag ref={ref as never} className={`vz-reveal ${className}`} data-reveal style={{ "--vz-delay": `${delay}ms` } as React.CSSProperties}>{children}</Tag>;
}
