"use client";

import { useEffect, useRef } from "react";

export function Tagline() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const node = ref.current; if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { node?.querySelectorAll("span").forEach((span) => { span.dataset.active = "true"; }); return; } const spans = [...node.querySelectorAll("span")]; const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; spans.forEach((span, index) => window.setTimeout(() => { span.dataset.active = "true"; }, index * 90)); observer.disconnect(); }, { threshold: .6 }); observer.observe(node); return () => observer.disconnect(); }, []);
  return <section className="lc-section lc-tagline" ref={ref} aria-label="Lucentra motto"><p>{"Make light legible. Before the handoff.".split(" ").map((word, index) => <span key={`${word}-${index}`}>{word} </span>)}</p></section>;
}
