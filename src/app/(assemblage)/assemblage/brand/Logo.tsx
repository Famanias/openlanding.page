export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`as-logo${compact ? " as-logo--compact" : ""}`} aria-label="Assemblage">
      <svg className="as-logo-mark" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 8.5 17 4l9 6.5-2 13L12 28 5 19.5Z" fill="var(--as-sand)" stroke="currentColor" strokeWidth="1.5" />
        <path d="m10 12 7-3 6 4-1 8-7 3-6-4Z" fill="var(--as-ochre)" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="16" r="3" fill="var(--as-vermilion)" />
      </svg>
      {!compact && <span className="as-logo-word">assemblage<span>.</span></span>}
    </span>
  );
}
