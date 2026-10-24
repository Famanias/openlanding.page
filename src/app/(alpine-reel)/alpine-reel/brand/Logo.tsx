export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox={compact ? "0 0 80 80" : "0 0 360 80"} role="img" aria-label="Alpine Reel" aria-hidden={compact ? "true" : undefined} className={compact ? "arl-brand-mark" : "arl-brand-lockup"}>
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="40" cy="40" r="27" />
        <path d="M13 52 28 32 40 45 53 24 67 52" />
        <path d="M26 63h28" />
      </g>
      <circle cx="61" cy="20" r="4" fill="var(--arl-ice)" />
      {!compact && <text x="92" y="52" fill="currentColor" fontFamily="var(--font-arl-display)" fontSize="42" letterSpacing="-1.6">ALPINE REEL</text>}
    </svg>
  );
}
