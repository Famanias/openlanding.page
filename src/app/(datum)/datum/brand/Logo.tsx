type LogoProps = {
  variant?: "lockup" | "mark";
  className?: string;
  tone?: "light" | "dark";
};

/** Original stacked render-pass isometric slab mark paired with the DATUM architectural wordmark. */
export function Logo({ variant = "lockup", className, tone = "light" }: LogoProps) {
  const accent = tone === "dark" ? "#10D98E" : "#007A4D";
  const ink = tone === "dark" ? "#F3F4F0" : "#111418";

  const mark = (
    <svg className="dt-logo-mark" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <polygon
        points="18,4 32,11 18,18 4,11"
        fill={accent}
        fillOpacity="0.16"
        stroke={accent}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <polygon
        points="18,11 32,18 18,25 4,18"
        stroke={ink}
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
      <polygon
        points="18,18 32,25 18,32 4,25"
        stroke={ink}
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="11" r="2" fill={accent} />
    </svg>
  );

  if (variant === "mark") {
    return <span className={`dt-logo ${className ?? ""}`}>{mark}</span>;
  }

  return (
    <span className={`dt-logo ${className ?? ""}`}>
      {mark}
      <span className="dt-logo-word">DATUM</span>
    </span>
  );
}
