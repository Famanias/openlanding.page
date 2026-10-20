/** The Orrery wordmark: Instrument Serif with an ultramarine full stop. */
export function Logo({ className = "orr-logo" }: { className?: string }) {
  return (
    <a href="#title" className={className} aria-label="Orrery, back to the first slide">
      Orrery<span aria-hidden="true">.</span>
    </a>
  );
}

/** The mark: a core inside two orbits with one ultramarine satellite. Also used for icon.svg. */
export function OrreryMark({ size = 32, title }: { size?: number; title?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="16" cy="16" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="16" cy="16" r="2.75" fill="currentColor" />
      <circle cx="25.2" cy="6.8" r="2.6" fill="#2F3BFF" />
    </svg>
  );
}
