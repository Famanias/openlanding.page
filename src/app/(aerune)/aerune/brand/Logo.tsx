export function Logo({ markOnly = false }: { markOnly?: boolean }) {
  return (
    <span className="ar-logo" aria-label="AERUNE">
      <svg aria-hidden="true" viewBox="0 0 40 40" fill="none" className="ar-logo__mark">
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" strokeDasharray="83 18" transform="rotate(-42 20 20)" />
        <path d="M9 23c5-7 10-9 22-9M9 28c7-6 13-7 22-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="30.5" cy="10" r="2.5" fill="currentColor" />
      </svg>
      {!markOnly && <span className="ar-logo__word">aerune<span className="ar-logo__dot">.</span></span>}
    </span>
  );
}
