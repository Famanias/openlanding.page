type LogoProps = {
  variant?: "lockup" | "mark";
  className?: string;
};

export function Logo({ variant = "lockup", className }: LogoProps) {
  if (variant === "mark") {
    return (
      <svg className={className} viewBox="0 0 100 100" role="img" aria-labelledby="rill-mark-title" xmlns="http://www.w3.org/2000/svg">
        <title id="rill-mark-title">RILL mark</title>
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="32" opacity=".24" />
          <path d="M20 57c17-20 34-22 57-7 8 5 14 7 22 3" />
          <path d="M18 72c18-15 34-16 52-5 9 5 16 6 24 1" opacity=".72" />
          <path d="M30 37c10-10 23-14 39-10" opacity=".48" />
        </g>
        <path d="M20 57c17-20 34-22 57-7 8 5 14 7 22 3" fill="none" stroke="var(--color-oxide)" strokeWidth="3.8" strokeLinecap="round" />
        <circle cx="50" cy="50" r="4.5" fill="var(--color-oxide)" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 360 112" role="img" aria-labelledby="rill-lockup-title" xmlns="http://www.w3.org/2000/svg">
      <title id="rill-lockup-title">RILL field hydrology</title>
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="48" cy="56" r="31" opacity=".22" />
        <path d="M19 62c17-20 34-22 57-7 13 8 25 8 37-2" />
        <path d="M17 76c18-15 34-16 52-5 13 8 25 8 39-2" opacity=".72" />
        <path d="M30 42c10-10 23-14 39-10" opacity=".48" />
      </g>
      <path d="M19 62c17-20 34-22 57-7 13 8 25 8 37-2" fill="none" stroke="var(--color-oxide)" strokeWidth="3.8" strokeLinecap="round" />
      <circle cx="48" cy="56" r="4.5" fill="var(--color-oxide)" />
      <text x="112" y="61" fill="currentColor" fontFamily="var(--font-cormorant)" fontSize="52" fontWeight="600" letterSpacing=".06em">RILL</text>
      <text x="116" y="83" fill="currentColor" opacity=".62" fontFamily="var(--font-fira-mono)" fontSize="9" letterSpacing=".2em">FIELD HYDROLOGY</text>
    </svg>
  );
}

