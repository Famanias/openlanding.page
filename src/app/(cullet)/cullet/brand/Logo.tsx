/**
 * The Cullet mark: an ink tile with one cut shard traced in paper, the same quad the hero prints
 * on its brand shard. The lockup sets "Cullet" in Inter Tight 600 beside it.
 */
export const CULLET_QUAD = "M5.3 6.7 13.4 4.3 19.7 12.5 10.6 19.7Z";

export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect width="24" height="24" rx="5.4" fill="var(--fc-ink)" />
      <path d={CULLET_QUAD} fill="none" stroke="var(--fc-paper)" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`fc-logo ${className ?? ""}`}>
      <Mark className="fc-logo__mark" />
      <span className="fc-logo__word">Cullet</span>
    </span>
  );
}
