export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`ac-logo${compact ? " ac-logo--compact" : ""}`} aria-label="AFTERCART">
      <svg className="ac-logo-mark" width={compact ? 34 : 30} height="30" viewBox="0 0 30 30" aria-hidden="true">
        <rect x="1" y="1" width="28" height="28" rx="8" fill="var(--color-ac-ink)" />
        <path d="M8 9h14M8 15h10M8 21h14" stroke="var(--color-ac-paper)" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="21" cy="15" r="3" fill="var(--color-ac-mint)" />
      </svg>
      {!compact && <span className="ac-logo-word">AFTERCART<span aria-hidden="true">.</span></span>}
    </span>
  );
}
