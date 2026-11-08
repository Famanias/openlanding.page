import type { ReactNode } from "react";

/** Server component: the track is duplicated so the CSS keyframe loops seamlessly; the copy is aria-hidden. */
export function Marquee({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="pby-marquee" role="group" aria-label={label}>
      <div className="pby-marquee-track">
        <div className="pby-marquee-set">{children}</div>
        <div className="pby-marquee-set" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
