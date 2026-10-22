type MarkProps = { className?: string; title?: string };

/** A satsuma seen from the top: six segments under the peel, one leaf. The fruit takes --sa-fruit, the rest takes currentColor. */
export function Mark({ className, title }: MarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <circle cx="24" cy="27" r="18" className="sa-mark__fruit" />
      <path
        d="M24 27V12M24 27l13-7.5M24 27l13 7.5M24 27v15M24 27l-13 7.5M24 27l-13-7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity=".55"
      />
      <path d="M24 10.5c-.4-5.6 3.6-8.6 9.6-8-.4 5.8-4 8.8-9.6 8z" className="sa-mark__leaf" />
      <circle cx="24" cy="27" r="3.4" fill="currentColor" />
    </svg>
  );
}

type LogoProps = { className?: string };

/** Lockup: the mark and the Bricolage wordmark, its full stop in the accent. */
export function Logo({ className }: LogoProps) {
  return (
    <span className={`sa-logo ${className ?? ""}`}>
      <Mark className="sa-logo__mark" />
      <span className="sa-logo__word">
        satsuma<span className="sa-logo__dot">.</span>
      </span>
    </span>
  );
}
