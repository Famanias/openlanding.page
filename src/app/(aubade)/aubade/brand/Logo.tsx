type MarkProps = { className?: string; title?: string; rails?: 1 | 2 };

/** The carriage window with the sun half-risen on the rail. The window takes currentColor; the sun takes --au-sun. */
export function Mark({ className, title, rails = 2 }: MarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <rect x="3" y="3" width="42" height="42" rx="13" fill="currentColor" />
      <path d="M13 31a11 11 0 0 1 22 0z" className="au-mark__sun" />
      <rect x="9" y="31" width="30" height="3" rx="1.5" className="au-mark__sun" />
      {rails === 2 && <rect x="15" y="37" width="18" height="2" rx="1" className="au-mark__sun" opacity=".55" />}
    </svg>
  );
}

type LogoProps = { className?: string; strap?: boolean };

/** Lockup: the mark, the Gloock wordmark, and an optional mono strapline. */
export function Logo({ className, strap = false }: LogoProps) {
  return (
    <span className={`au-logo ${className ?? ""}`}>
      <Mark className="au-logo__mark" />
      <span className="au-logo__text">
        <span className="au-logo__word">AUBADE</span>
        {strap && <span className="au-logo__strap">Paris — Venezia · Night sleeper</span>}
      </span>
    </span>
  );
}
