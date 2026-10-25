type MarkProps = { className?: string; title?: string };

export function Mark({ className, title }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="24" r="9" fill="var(--nulo-lilac)" stroke="currentColor" strokeWidth="1.4" />
      <path d="M24 4v7M24 37v7M4 24h7M37 24h7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M29.5 8.5c2.7-3.3 6.4-3.9 9.8-2.5-1.5 3.6-4.5 5.3-8.9 4.7" fill="var(--nulo-peach)" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="2.2" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`nu-logo ${className ?? ""}`}>
      <Mark className="nu-logo__mark" />
      <span className="nu-logo__word">nulo<span className="nu-logo__dot">.</span></span>
    </span>
  );
}
