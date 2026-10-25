/** The Pipkin mark: a squat jar with a butter lid and a cream label, drawn with a plum line. */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" role="img" aria-label="Pipkin jar mark" focusable="false">
      <rect x="8" y="17" width="32" height="26" rx="12" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="2.6" />
      <rect x="12" y="6" width="24" height="12" rx="6" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="2.6" />
      <rect x="15" y="25" width="18" height="10" rx="5" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="2" />
      <circle cx="24" cy="30" r="1.9" fill="var(--color-plum)" />
      <rect x="12" y="21" width="5" height="3" rx="1.5" fill="var(--color-cream)" opacity=".8" />
    </svg>
  );
}

/** Mark plus the wordmark, set in the display face. */
export function Logo({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <span className={`pk-logo ${className ?? ""}`}>
      <LogoMark size={size} />
      <span className="pk-logo-word">Pipkin</span>
    </span>
  );
}
