"use client";
import { useInView } from "./useInView";

type MarqueeProps = {
  items: readonly string[];
  label: string;
};

/** Dual-track architectural telemetry ticker; pauses on hover, focus, or when off-screen. */
export function Marquee({ items, label }: MarqueeProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, rootMargin: "120px" });

  const renderTrack = (hidden: boolean) => (
    <ul className="dt-marquee-track" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item}>
          <span>{item}</span>
          <i className="dt-marquee-dot" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      ref={ref}
      className="dt-marquee"
      role="group"
      aria-label={label}
      tabIndex={0}
      data-offscreen={!inView}
    >
      <div className="dt-marquee-lane">
        {renderTrack(false)}
        {renderTrack(true)}
      </div>
    </div>
  );
}
