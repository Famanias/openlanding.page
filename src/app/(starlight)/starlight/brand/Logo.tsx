export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`stl-logo${compact ? " stl-logo--compact" : ""}`} aria-label="Starlight Lab">
      <svg className="stl-logo__mark" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="6.5" fill="currentColor" />
        <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M4 16h24M16 4v24" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <circle cx="26" cy="9" r="2" fill="#7DF2D1" />
      </svg>
      {!compact && <span className="stl-logo__word">starlight lab</span>}
    </span>
  );
}
