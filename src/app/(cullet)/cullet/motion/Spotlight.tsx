"use client";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * One delegated listener for a grid of cards: writes `--mx`/`--my` (pointer position inside the card
 * under it) once per frame, which a radial gradient on the card's glass reads. Fine pointers only.
 */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let frame = 0;
    let pending: { card: HTMLElement; x: number; y: number } | null = null;
    const flush = () => {
      frame = 0;
      if (!pending) return;
      pending.card.style.setProperty("--mx", `${pending.x.toFixed(1)}px`);
      pending.card.style.setProperty("--my", `${pending.y.toFixed(1)}px`);
      pending = null;
    };
    const move = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>(".fc-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      pending = { card, x: e.clientX - r.left, y: e.clientY - r.top };
      if (!frame) frame = requestAnimationFrame(flush);
    };
    root.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(frame); root.removeEventListener("pointermove", move); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
