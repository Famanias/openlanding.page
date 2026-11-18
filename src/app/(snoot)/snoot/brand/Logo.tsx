/** The heart-shaped nose that runs through the whole brand: logo, bullets, the collar tag and Frank himself. */
export const NOSE_PATH = "M32 27c-3-8-17-7-15 4c1 7 9 11 15 15c6-4 14-8 15-15c2-11-12-12-15-4z";

/** The mark: a pink snout squircle with the heart nose. */
export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path
        d="M32 3c18 0 29 9 29 27c0 19-11 31-29 31S3 49 3 30C3 12 14 3 32 3z"
        fill="var(--color-pink)"
        stroke="var(--color-ink)"
        strokeWidth="4"
      />
      <path d={NOSE_PATH} fill="var(--color-ink)" />
      <ellipse cx="24.5" cy="29" rx="3.2" ry="2.2" fill="var(--color-milk)" transform="rotate(-24 24.5 29)" />
    </svg>
  );
}

/** Mark plus the lowercase wordmark. The wordmark is real text in the display face. */
export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  return (
    <span className={`sn-logo ${className ?? ""}`} data-tone={tone}>
      <Mark className="sn-logo-mark" />
      <span className="sn-logo-word">snoot</span>
    </span>
  );
}

/** A tiny nose used as a list bullet. */
export function NoseBullet() {
  return (
    <svg className="sn-nose-bullet" viewBox="14 20 36 30" aria-hidden="true">
      <path d={NOSE_PATH} fill="currentColor" />
    </svg>
  );
}
