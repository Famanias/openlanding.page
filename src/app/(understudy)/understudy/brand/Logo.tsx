/**
 * The mark is a proscenium: a rounded-top arch with the curtain parted at its foot.
 * The same arch is the dark house's clip-path in the hero, so the logo is the door you scroll through.
 */
export const ARCH_PATH = "M6 46V22C6 12.06 14.06 4 24 4s18 8.06 18 18v24H28.6L24 30.5 19.4 46H6Z";

export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d={ARCH_PATH} fill="currentColor" />
    </svg>
  );
}

export function Logo({ className, label = "Understudy" }: { className?: string; label?: string }) {
  return (
    <span className={`us-logo ${className ?? ""}`} role="img" aria-label={label}>
      <Mark className="us-logo__mark" />
      <span className="us-logo__word" aria-hidden="true">understudy</span>
    </span>
  );
}
