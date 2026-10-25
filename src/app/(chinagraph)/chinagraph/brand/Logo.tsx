/** The mark: one film frame with a grease-pencil loop drawn round it, the way an editor marks a select. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect x="9" y="9" width="14" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path className="cg-mark__loop" d="M16 4.5c7.2-.4 12.4 4.2 11.6 11.4-.7 6.6-6.2 11.4-12.6 11.1C8.8 26.7 4.3 21.6 4.6 15.2 4.9 9 10 4.9 17.8 5.6" fill="none" stroke="var(--color-grease)" strokeWidth="2.2" strokeLinecap="round" pathLength={1} />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`cg-logo ${className ?? ""}`}>
      <Mark className="cg-logo__mark" />
      <span className="cg-logo__word">Chinagraph</span>
    </span>
  );
}
