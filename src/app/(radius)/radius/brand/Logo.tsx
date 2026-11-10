type LogoProps = { markOnly?: boolean; className?: string };

export function Logo({ markOnly = false, className }: LogoProps) {
  return (
    <svg className={className} viewBox={markOnly ? "0 0 100 100" : "0 0 510 100"} role="img" aria-label="RADIUS">
      <g transform="translate(2 2) scale(.96)" fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="36" strokeWidth="8" />
        <path d="M49 50 77 22" strokeWidth="10" strokeLinecap="square" />
        <circle cx="49" cy="50" r="7" fill="currentColor" stroke="none" />
      </g>
      {!markOnly && <text x="110" y="73" fill="currentColor" fontFamily="var(--rd-display),sans-serif" fontWeight="900" fontStyle="italic" fontSize="76" letterSpacing="3">RADIUS</text>}
    </svg>
  );
}
