"use client";
import type { ReactNode } from "react";
import { useInView } from "./useInView";

/**
 * A duplicated track moved by CSS keyframes. It only runs while on screen, pauses on hover and focus, and
 * the copy is hidden from assistive tech (the same words appear as real text beside it).
 */
export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, rootMargin: "10% 0px 10% 0px" });
  return (
    <div ref={ref} className={`sn-marquee ${className ?? ""}`} data-running={inView} aria-hidden="true">
      <div className="sn-marquee-track">
        <div className="sn-marquee-set">{children}</div>
        <div className="sn-marquee-set">{children}</div>
      </div>
    </div>
  );
}
