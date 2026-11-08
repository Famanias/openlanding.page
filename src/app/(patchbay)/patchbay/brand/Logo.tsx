type MarkProps = { className?: string; title?: string };

/** A jack seen from the front with a patch cable leaving it: the template's one recurring shape. */
export function LogoMark({ className, title }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} fill="none">
      <rect x="1" y="1" width="30" height="30" stroke="var(--color-seam)" strokeWidth="1.5" />
      <circle cx="16" cy="12" r="6" stroke="var(--color-bone)" strokeWidth="1.5" />
      <circle cx="16" cy="12" r="2.4" fill="var(--color-amber)" />
      <path d="M16 18 C16 29 6 22 6 31" stroke="var(--color-amber)" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function Logo({ name }: { name: string }) {
  return (
    <span className="pby-logo">
      <LogoMark className="pby-logo-mark" />
      <span className="pby-logo-name">{name}</span>
    </span>
  );
}
