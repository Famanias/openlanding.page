"use client";
import type { ReactNode } from "react";
import { useInView } from "./useInView";

/**
 * A duplicated track moved by CSS keyframes. It only runs while on screen and pauses on hover. The whole band
 * is hidden from assistive tech: the same service names are real text in the work section below it.
 */
export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, rootMargin: "10% 0px 10% 0px" });
  return (
    <div ref={ref} className={`tv-marquee ${className ?? ""}`} data-running={inView} aria-hidden="true">
      <div className="tv-marquee-track">
        <div className="tv-marquee-set">{children}</div>
        <div className="tv-marquee-set">{children}</div>
      </div>
    </div>
  );
}
