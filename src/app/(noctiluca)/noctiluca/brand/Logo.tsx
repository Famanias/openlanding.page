/**
 * The mark is a doorway with light pooled on its floor: the house in one glyph.
 * Arch-topped opening, a lilac pool of light, and one spark rising (the cell
 * the house is named after).
 */

type MarkProps = { size?: number; className?: string; title?: string };

export function Mark({ size = 32, className, title }: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        d="M18 56 V26 a14 14 0 0 1 28 0 V56"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <ellipse cx="32" cy="55" rx="12" ry="3.2" fill="var(--color-glow)" />
      <circle cx="32" cy="30" r="3.6" fill="var(--color-glow)" />
    </svg>
  );
}

type LogoProps = { className?: string; showTagline?: boolean };

export function Logo({ className, showTagline = false }: LogoProps) {
  return (
    <span className={`nl-logo ${className ?? ""}`}>
      <Mark size={30} className="nl-logo-mark" />
      <span className="nl-logo-text">
        <span className="nl-logo-word">Noctiluca</span>
        {showTagline ? <span className="nl-logo-tag">House of moving light</span> : null}
      </span>
    </span>
  );
}
