export function Logo({ compact = false }: { compact?: boolean }) {
  return <span className={`fo-logo${compact ? " fo-logo--compact" : ""}`} aria-label="Frame One">
    <svg viewBox="0 0 64 72" aria-hidden="true" fill="none">
      <path d="M4 5h56v62H4zM14 15h36v41H14zM9 14v5m0 8v5m0 8v5m0 8v5M55 14v5m0 8v5m0 8v5m0 8v5" stroke="currentColor" strokeWidth="2.5" />
      <path d="m24 47 16-24" stroke="currentColor" strokeWidth="4" />
    </svg>
    {!compact && <span>FRAME<span className="fo-red">/</span>ONE</span>}
  </span>;
}
