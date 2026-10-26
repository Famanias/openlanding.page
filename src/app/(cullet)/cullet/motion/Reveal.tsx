import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * rise: body copy. cleave: a diagonal clip-path wipe along a cut line (media, panels).
 * scale: cards. draw: rules and connectors. slide: labels. sheen: a light sweep across glass.
 */
export type RevealVariant = "rise" | "cleave" | "scale" | "draw" | "slide" | "sheen";

/**
 * Marks an element for the shared reveal observer (ScrollDirector), which flips `data-in`.
 * The CSS carries the motion; hidden states exist only under `prefers-reduced-motion: no-preference`
 * with scripting on, so no-JS and reduced-motion visitors get the finished page.
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

/** A display line that rises through its own mask. The observer watches the unclipped wrapper. */
export function MaskLine({ children, index = 0 }: { children: ReactNode; index?: number }) {
  return (
    <span className="fc-mask">
      <span className="fc-mask__in" data-reveal="mask" style={{ "--i": index } as CSSProperties}>{children}</span>
    </span>
  );
}
