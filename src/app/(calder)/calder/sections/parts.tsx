import type { CSSProperties, ElementType, ReactNode } from "react";

/** Typed way to set CSS custom properties from props. */
export const vars = (o: Record<string, string | number>) => o as CSSProperties;

type LinesProps = {
  as?: ElementType;
  id?: string;
  className?: string;
  lines: ReactNode[];
  /** Hero headlines rise through their masks on load (CSS keyframes); everything else when scrolled into view. */
  load?: boolean;
  /** First line's place in the stagger. */
  start?: number;
};

/** Display type that rises line by line through an `overflow: clip` mask. The lines stay one readable string. */
export function Lines({ as: Tag = "span", id, className, lines, load, start = 0 }: LinesProps) {
  return (
    <Tag id={id} className={className} data-reveal={load ? undefined : "mask"} data-load={load ? "mask" : undefined}>
      {lines.map((line, i) => (
        <span key={i}>
          <span className="cr-line">
            <span className="cr-line__in" style={vars({ "--i": i + start })}>
              {line}
            </span>
          </span>
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

/** "§ I ── Matters": a section number, a rule that draws itself, then the label. */
export function Eyebrow({ n, children, tone = "paper" }: { n: string; children: ReactNode; tone?: "paper" | "slab" }) {
  return (
    <p className={`cr-eyebrow cr-eyebrow--${tone}`} data-reveal="slide">
      <span className="cr-eyebrow__n">{n}</span>
      <span className="cr-eyebrow__rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 8h10.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ButtonProps = {
  href: string;
  tone?: "gold" | "ivory" | "ghost";
  children: string;
  className?: string;
  /** Form hooks: preselects the matter in the filing form. */
  matter?: string;
  ariaLabel?: string;
};

/** Pill button: the label rolls, the arrow disc slides, a fill rises from below. Press scales it down. */
export function Button({ href, tone = "gold", children, className, matter, ariaLabel }: ButtonProps) {
  return (
    <a className={`cr-btn cr-btn--${tone} ${className ?? ""}`} href={href} data-matter={matter} aria-label={ariaLabel}>
      <span className="cr-btn__label">
        <span data-text={children}>{children}</span>
      </span>
      <span className="cr-btn__disc" aria-hidden="true">
        <Arrow className="cr-btn__arrow" />
        <Arrow className="cr-btn__arrow cr-btn__arrow--b" />
      </span>
    </a>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="cr-link" href={href}>
      <span>{children}</span>
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 2.5v10.5M3.5 8.5 8 13l4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
