type MarkProps = { className?: string; title?: string };

/**
 * The mark: a gable drawn in one routed line with the lit door inside it. The amber rectangle is the same
 * shape as the painted blazes that mark the trail.
 */
export function Mark({ className, title }: MarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      width="32"
      height="32"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d="M4 28V14.500L16 4l12 10.500V28" fill="none" stroke="currentColor" strokeWidth="2.400" strokeLinecap="round" strokeLinejoin="round" />
      <rect className="ew-mark-door" x="15.500" y="17" width="7" height="11" rx="0.800" />
    </svg>
  );
}

/** Lockup: the mark and the routed wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`ew-logo ${className ?? ""}`}>
      <Mark className="ew-logo-mark" />
      <span className="ew-logo-word">Elsewhere</span>
    </span>
  );
}
