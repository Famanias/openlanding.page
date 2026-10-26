import type { CSSProperties, ElementType, ReactNode } from "react";

export type RevealVariant = "rise" | "mask" | "wipe" | "scale" | "draw" | "slide";

/**
 * Marks an element for the shared reveal observer (ScrollDirector). The CSS carries the motion:
 * hidden states exist only under `prefers-reduced-motion: no-preference` with scripting on,
 * so no-JS and reduced-motion visitors get the finished page.
 */
export function Reveal({ as: Tag = "div", variant = "rise", index = 0, delay = 0, className, children, id }: {
  as?: ElementType; variant?: RevealVariant; index?: number; delay?: number; className?: string; children: ReactNode; id?: string;
}) {
  return (
    <Tag id={id} className={className} data-reveal={variant} style={{ "--i": index, "--delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

/** A display line that rises through its own mask. */
export function MaskLine({ children, index = 0 }: { children: ReactNode; index?: number }) {
  return (
    <span className="us-mask" data-reveal="mask" style={{ "--i": index } as CSSProperties}>
      <span className="us-mask__in">{children}</span>
    </span>
  );
}
