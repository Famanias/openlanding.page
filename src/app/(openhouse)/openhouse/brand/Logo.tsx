type LogoProps = { compact?: boolean };

export function Logo({ compact = false }: LogoProps) {
  return (
    <span className={`oh-logo${compact ? " oh-logo--compact" : ""}`}>
      <svg className="oh-logo-mark" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 27V8.5C6 6.6 7.6 5 9.5 5h13C24.4 5 26 6.6 26 8.5V27" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 27V13h12v14" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M16 13v14" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
      </svg>
      <span className="oh-logo-word">openhouse</span>
    </span>
  );
}
