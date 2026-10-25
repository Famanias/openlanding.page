"use client";
import type { CSSProperties, ReactNode } from "react";
import { useInView } from "./useInView";

/** A looping band. The duplicate track is aria-hidden; it pauses on hover and focus, and while off-screen. */
export function Marquee({ children, reverse = false, speed = 38, className, label }: { children: ReactNode; reverse?: boolean; speed?: number; className?: string; label?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false });
  return (
    <div ref={ref} className={`pk-marquee ${className ?? ""}`} data-live={inView ? "true" : "false"} data-reverse={reverse ? "true" : "false"} style={{ "--speed": `${speed}s` } as CSSProperties} role="group" aria-label={label}>
      <div className="pk-marquee-track">{children}</div>
      <div className="pk-marquee-track" aria-hidden="true">{children}</div>
    </div>
  );
}
