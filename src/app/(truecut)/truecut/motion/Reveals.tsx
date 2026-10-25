"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  kind?: "rise" | "wipe" | "rule" | "stagger";
  delay?: number;
};

export function Reveal({ children, className = "", kind = "rise", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-8% 0px -10%", threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} data-tc-reveal={kind} data-tc-in={inView ? "true" : "false"} style={{ "--tc-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}
