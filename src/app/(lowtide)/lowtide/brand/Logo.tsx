type LogoProps = { variant?: "lockup" | "mark"; className?: string; title?: string };

/** A crescent moon whose lower edge breaks into a wave line: the tide going out under the moon. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg className={`lt-logo__mark ${className ?? ""}`} viewBox="0 0 32 32" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <mask id="lt-logo-crescent">
        <rect width="32" height="32" fill="white" />
        <circle cx="20.5" cy="9.5" r="8.4" fill="black" />
      </mask>
      <circle className="lt-logo__moon" cx="15" cy="13" r="10" mask="url(#lt-logo-crescent)" />
      <path className="lt-logo__wave" d="M3 25.5c2.2-2.4 4.4-2.4 6.5 0s4.3 2.4 6.5 0 4.3-2.4 6.5 0 4.3 2.4 6.5 0" />
    </svg>
  );
}

export function Logo({ variant = "lockup", className, title }: LogoProps) {
  if (variant === "mark") return <LogoMark className={className} title={title ?? "LOWTIDE"} />;
  return (
    <span className={`lt-logo ${className ?? ""}`}>
      <LogoMark />
      <span className="lt-logo__word">lowtide</span>
    </span>
  );
}
