import type { ReactNode } from "react";
import { Reveal } from "../motion/Reveal";

/** A civil-drawing section hatch (earth, gravel or rock) used as the divider between sections. */
export function Hatch({ kind = "earth", className }: { kind?: "earth" | "gravel" | "rock"; className?: string }) {
  return <Reveal variant="draw" className={`tv-hatch tv-hatch-${kind} ${className ?? ""}`} />;
}

/** A stamped load ticket: dashed, mono, with an optional check. */
export function Ticket({ children, check, className }: { children: ReactNode; check?: boolean; className?: string }) {
  return (
    <span className={`tv-ticket tv-gauge ${className ?? ""}`}>
      {check ? (
        <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
          <path d="M1.500 6.500 4.500 9.500 10.500 2.500" />
        </svg>
      ) : null}
      {children}
    </span>
  );
}

/** A locate flag, the kind left by a utility locator. Blue marks water. */
export function Flag({ className }: { className?: string }) {
  return (
    <svg className={`tv-flag ${className ?? ""}`} viewBox="0 0 14 20" aria-hidden="true" focusable="false">
      <path d="M2 1v18" />
      <path className="tv-flag-cloth" d="M2 2h10l-3 3.500 3 3.500H2z" />
    </svg>
  );
}
