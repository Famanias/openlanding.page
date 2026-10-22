"use client";

import { useInView } from "./useInView";

/** A gliding band: the track is duplicated and translated by CSS. Pauses off-screen, on hover and on focus. */
export function Marquee({ items, className, label }: { items: string[]; className?: string; label: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "100px" });
  const run = (
    <span className="au-marquee__run">
      {items.map((item) => (
        <span key={item} className="au-marquee__item">
          {item}
          <span className="au-marquee__sep" aria-hidden="true">
            ·
          </span>
        </span>
      ))}
    </span>
  );
  return (
    <div ref={ref} className={`au-marquee ${className ?? ""}`} data-playing={inView} role="group" aria-label={label} tabIndex={0}>
      <div className="au-marquee__track">
        {run}
        <span aria-hidden="true">{run}</span>
      </div>
    </div>
  );
}
