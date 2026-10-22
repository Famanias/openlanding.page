type LogoProps = { compact?: boolean };

export function Logo({ compact = false }: LogoProps) {
  return (
    <span className={`tc-logo${compact ? " tc-logo--compact" : ""}`}>
      <svg className="tc-logo-mark" viewBox="0 0 120 120" role="img" aria-label="TRUECUT mark" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="112" height="112" fill="currentColor" />
        <path d="M24 30h44M24 46h29M24 62h44M24 78h29M24 94h44" stroke="var(--tc-accent)" strokeWidth="6" strokeLinecap="square" />
        <path d="M82 26v68M72 26h20M72 94h20" stroke="var(--tc-paper)" strokeWidth="4" fill="none" />
        <circle cx="91" cy="60" r="8" fill="var(--tc-accent)" />
      </svg>
      <span className="tc-logo-word">TRUECUT<span>WORKS</span></span>
    </span>
  );
}
