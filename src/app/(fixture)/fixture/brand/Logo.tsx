type MarkProps = { className?: string; tone?: "light" | "dark" };

/** The mark: an F built from a wall bracket and two shelves, with one crimson product on the lower shelf. */
export function Mark({ className, tone = "light" }: MarkProps) {
  const plate = tone === "light" ? "var(--color-ink)" : "var(--color-paper)";
  const bracket = tone === "light" ? "var(--color-paper)" : "var(--color-ink)";
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="7" fill={plate} />
      <rect x="9" y="7" width="4" height="18" fill={bracket} />
      <rect x="9" y="7" width="15" height="3.6" fill={bracket} />
      <rect x="9" y="17" width="11" height="3.2" fill={bracket} />
      <rect className="fx-mark__item" x="15.5" y="12.4" width="4.2" height="4.6" fill="var(--color-crimson)" />
    </svg>
  );
}

type LogoProps = { className?: string; tone?: "light" | "dark" };

export function Logo({ className, tone = "light" }: LogoProps) {
  return (
    <span className={`fx-logo ${className ?? ""}`} data-tone={tone}>
      <Mark className="fx-logo__mark" tone={tone} />
      <span className="fx-logo__word">FIXTURE</span>
    </span>
  );
}
