type LogoProps = { inverse?: boolean; compact?: boolean };

export function Logo({ inverse = false, compact = false }: LogoProps) {
  const ink = inverse ? "#F7F2E9" : "#12101A";
  const accent = "#FF5B47";
  return (
    <span className={`iso-logo${compact ? " iso-logo--compact" : ""}`}>
      <svg className="iso-logo__mark" viewBox="0 0 42 42" aria-hidden="true">
        <circle cx="21" cy="21" r="17" fill="none" stroke={ink} strokeWidth="1.5" />
        <path d="M7 25.5c5-6.4 10.7-9.6 17.1-9.6 4.4 0 7.9 1.2 10.9 3.7" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <path d="M10 31c5-5.1 10.2-7.5 15.7-7.5 3.8 0 6.4.7 8.6 1.8" fill="none" stroke={ink} strokeWidth="1.5" strokeLinecap="round" opacity=".6" />
        <circle cx="31.6" cy="12.5" r="2.5" fill={accent} />
      </svg>
      {!compact && <span className="iso-logo__word" style={{ color: ink }}>ISOBAR<span>.</span></span>}
    </span>
  );
}
