"use client";

import { useEffect, useRef } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.dataset.in = "true";
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`stl-reveal ${className}`} style={{ "--stl-delay": `${delay}ms` } as React.CSSProperties} data-reveal>{children}</div>;
}

export function TaglineReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const words = Array.from(element.querySelectorAll<HTMLElement>("[data-word]"));
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      words.forEach((word, index) => {
        window.setTimeout(() => { word.dataset.in = "true"; }, index * 70);
      });
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <p ref={ref} className="stl-tagline__text">{text.split(" ").map((word, index) => <span data-word key={`${word}-${index}`}>{word}{index < text.split(" ").length - 1 ? " " : ""}</span>)}</p>;
}
