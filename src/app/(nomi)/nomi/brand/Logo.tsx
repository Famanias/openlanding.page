export function Logo({ mast = false }: { mast?: boolean }) {
  return (
    <span className={`nm-logo${mast ? " nm-logo--mast" : ""}`}>
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="4" y="4" width="24" height="24" rx="9" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M10 16c0-4 3-6 6-6s6 2 6 6-3 6-6 6-6-2-6-6Z" fill="var(--color-accent)" />
      </svg>
      <b>nomi</b>
    </span>
  );
}
