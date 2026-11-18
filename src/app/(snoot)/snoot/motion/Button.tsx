import type { ReactNode } from "react";

type Variant = "pink" | "blue" | "milk" | "ink";

/** The rolling label: two stacked copies slide up through a mask on hover. */
function Label({ children }: { children: string }) {
  return (
    <span className="sn-btn-label">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

function Arrow() {
  return (
    <span className="sn-btn-arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
      <svg viewBox="0 0 24 24">
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

type Common = { children: string; variant?: Variant; arrow?: boolean; className?: string; icon?: ReactNode };

/**
 * A chunky sticker button. The face sits on an ink block; hover lifts the face and wipes the fill in,
 * press pushes it down onto the block, release springs back.
 */
export function ButtonLink({ href, children, variant = "pink", arrow = true, className, icon }: Common & { href: string }) {
  return (
    <a className={`sn-btn ${className ?? ""}`} data-variant={variant} href={href}>
      <span className="sn-btn-face">
        <span className="sn-btn-wipe" aria-hidden="true" />
        {icon}
        <Label>{children}</Label>
        {arrow ? <Arrow /> : null}
      </span>
    </a>
  );
}

export function ButtonFace({ children, arrow = true, icon }: { children: string; arrow?: boolean; icon?: ReactNode }) {
  return (
    <span className="sn-btn-face">
      <span className="sn-btn-wipe" aria-hidden="true" />
      {icon}
      <Label>{children}</Label>
      {arrow ? <Arrow /> : null}
    </span>
  );
}
