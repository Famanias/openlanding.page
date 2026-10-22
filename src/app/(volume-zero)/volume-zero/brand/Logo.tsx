type MarkProps = { className?: string; title?: string };

export function Mark({ className, title }: MarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32 3 56 17v30L32 61 8 47V17z" stroke="currentColor" strokeWidth="2.5" />
      <path d="M32 11 49 21v22L32 53 15 43V21z" stroke="currentColor" strokeWidth="1" opacity=".45" />
      <path d="M32 18v28M18 26l28 14M46 26 18 40" stroke="currentColor" strokeWidth="1.5" opacity=".7" />
      <circle cx="32" cy="32" r="5" fill="var(--color-accent)" />
      <circle cx="32" cy="32" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`vz-logo ${className ?? ""}`}>
      <Mark className="vz-logo__mark" title="VOLUME ZERO mark" />
      <span className="vz-logo__type">
        VOLUME<span> ZERO</span>
      </span>
    </span>
  );
}
