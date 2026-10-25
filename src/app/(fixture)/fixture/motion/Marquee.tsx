"use client";

import type { ReactNode } from "react";
import { useInView } from "./useInView";

/** A duplicated track translated by CSS. It runs only while in view and pauses on hover or focus. */
export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, rootMargin: "0px", threshold: 0 });
  return (
    <div ref={ref} className={`fx-marquee ${className ?? ""}`} data-play={inView ? "true" : "false"}>
      <div className="fx-marquee__track">
        <div className="fx-marquee__group">{children}</div>
        <div className="fx-marquee__group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
