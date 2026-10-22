/** The mark's drawing: a C and an R inside a fine ring, a gold full stop between them. Strokes follow currentColor. */
export function MarkPaths() {
  return (
    <>
      <circle cx="24" cy="24" r="22" stroke="var(--color-gold)" strokeWidth="1.2" />
      <g stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24.6 17.6A8.5 8.5 0 1 0 24.6 30.4" />
        <path d="M29 16v16" />
        <path d="M29 16h4.2a4.3 4.3 0 0 1 0 8.6H29" />
        <path d="M32.4 24.6 36 32" />
      </g>
      <circle cx="24" cy="38.4" r="1.1" fill="var(--color-gold)" />
    </>
  );
}

export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <MarkPaths />
    </svg>
  );
}

type LogoProps = { className?: string; href?: string; label?: string };

/** Lockup: mark + wordmark. On dark slabs set `color` to ivory; on paper, to ink. */
export function Logo({ className, href, label = "Calder & Rowe, home" }: LogoProps) {
  const inner = (
    <>
      <Mark className="cr-logo__mark" />
      <span className="cr-logo__word">
        <span className="cr-logo__name">
          Calder <i>&amp;</i> Rowe
        </span>
        <span className="cr-logo__sub">Attorneys at law</span>
      </span>
    </>
  );
  return href ? (
    <a href={href} className={`cr-logo ${className ?? ""}`} aria-label={label}>
      {inner}
    </a>
  ) : (
    <span className={`cr-logo ${className ?? ""}`}>{inner}</span>
  );
}
