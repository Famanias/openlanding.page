export function Logo({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <span className={`lc-logo ${className}`} aria-label="Lucentra">
      <svg className="lc-logo__mark" viewBox="0 0 48 48" aria-hidden="true"><rect x="2" y="2" width="44" height="44" rx="7" /><path d="M12 15 24 9 35 17 22 37 12 30 12 15Z" /><path className="lc-logo__signal" d="M24 9 22 37M12 15 35 17" /></svg>
      {!compact && <span className="lc-logo__word">LUCENTRA</span>}
    </span>
  );
}

export function LogoLockup() {
  return <Logo />;
}
