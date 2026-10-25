type LogoProps = { compact?: boolean; className?: string };

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      role="img"
      aria-label="SEREIN Bureau mark"
      focusable="false"
    >
      <title>SEREIN Bureau mark</title>
      <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 36c12-7 25-7 48 0" fill="none" stroke="var(--sr-seafoam)" strokeWidth="3" />
      <path d="M13 44c10-5 22-5 38 0" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".55" />
      <circle cx="32" cy="22" r="8" fill="var(--sr-lavender)" />
      <circle cx="32" cy="22" r="3" fill="var(--sr-ink)" />
    </svg>
  );
}

export function Logo({ compact = false, className }: LogoProps) {
  return (
    <a className={`sr-logo ${className ?? ""}`} href="#outlook" aria-label="SEREIN Bureau home">
      <Mark className="sr-logo__mark" />
      {!compact && (
        <span className="sr-logo__words">
          <span>SEREIN</span>
          <small>Bureau / SR-07</small>
        </span>
      )}
    </a>
  );
}
