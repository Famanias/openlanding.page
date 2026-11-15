"use client";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type SpotlightProps = { as?: ElementType; className?: string; children: ReactNode };

/**
 * Lamplight that follows a fine pointer across a card: writes `--mx` / `--my` (in px) from one rAF, and the
 * CSS draws a radial glow from them. No tilt: these cards hold text you might select.
 */
export function Spotlight({ as, className, children }: SpotlightProps) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const write = () => {
      frame = 0;
      node.style.setProperty("--mx", `${x.toFixed(1)}px`);
      node.style.setProperty("--my", `${y.toFixed(1)}px`);
    };
    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(write);
    };
    node.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      node.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Tag ref={ref} className={`ew-spot ${className ?? ""}`}>
      {children}
    </Tag>
  );
}
