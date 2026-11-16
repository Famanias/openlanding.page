/** The mark: a slab of ground with a notch dug out, and the block that came out of it set down on grade. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={`tv-mark ${className ?? ""}`} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M6 34h8v15h18V34h26v24H6z" />
      <rect className="tv-mark-block" x="36" y="13" width="18" height="15" />
    </svg>
  );
}

/** Lockup: mark, TOLVAR in the plate face, EARTHWORKS spaced out underneath. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`tv-logo ${className ?? ""}`}>
      <Mark />
      <span className="tv-logo-text">
        <span className="tv-logo-word">Tolvar</span>
        <span className="tv-logo-sub tv-gauge">Earthworks</span>
      </span>
    </span>
  );
}
