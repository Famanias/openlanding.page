"use client";

import { useInView } from "./useInView";

/** A slow band of matter types: the track is duplicated and translated by CSS. Pauses off-screen, on hover and on focus. */
export function Marquee({ items, className, label }: { items: string[]; className?: string; label: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "100px" });
  const run = (
    <span className="cr-marquee__run">
      {items.map((item) => (
        <span key={item} className="cr-marquee__item">
          {item}
          <span className="cr-marquee__sep" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </span>
  );
  return (
    <div ref={ref} className={`cr-marquee ${className ?? ""}`} data-playing={inView} role="group" aria-label={label} tabIndex={0}>
      <div className="cr-marquee__track">
        {run}
        <span aria-hidden="true">{run}</span>
      </div>
    </div>
  );
}
