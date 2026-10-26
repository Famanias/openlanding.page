import type { ReactNode } from "react";

/**
 * A duplicated track translating by half its width in CSS. It pauses on hover and focus,
 * and when the director marks it off screen (`data-active="false"`). The copy is hidden from readers.
 */
export function Marquee({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="fc-marquee" data-ambient aria-label={label} role="group">
      <div className="fc-marquee__track">
        <div className="fc-marquee__set">{children}</div>
        <div className="fc-marquee__set" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
