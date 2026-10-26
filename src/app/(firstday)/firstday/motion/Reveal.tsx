"use client";
import { useEffect, useRef } from "react";
let observer: IntersectionObserver | undefined;
const observed = new Map<Element, Set<HTMLElement>>();
export function Reveal({
  children,
  className = "",
  variant = "rise",
  index = 0,
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: "rise" | "mask" | "wipe" | "draw" | "card";
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
      el.dataset.in = "true";
      return;
    }
    // Observe unmasked layout geometry: a fully clipped target has no intersection.
    const target =
      variant === "mask" || variant === "wipe" ? (el.parentElement ?? el) : el;
    const group = observed.get(target) ?? new Set<HTMLElement>();
    group.add(el);
    observed.set(target, group);
    observer ??= new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observed
              .get(entry.target)
              ?.forEach((node) => (node.dataset.in = "true"));
            observed.delete(entry.target);
            observer?.unobserve(entry.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -25px 0px" },
    );
    observer.observe(target);
    return () => {
      const current = observed.get(target);
      current?.delete(el);
      if (!current?.size) {
        observed.delete(target);
        observer?.unobserve(target);
      }
    };
  }, [variant]);
  return (
    <div
      ref={ref}
      className={className}
      data-reveal={variant}
      style={{ "--i": index } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
