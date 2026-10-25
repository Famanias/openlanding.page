type MarkProps = { className?: string; color?: string };

/** Four-point sparkle. */
export function Sparkle({ className, color = "var(--color-butter)" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <path d="M20 3 C22 14 26 18 37 20 C26 22 22 26 20 37 C18 26 14 22 3 20 C14 18 18 14 20 3 Z" fill={color} stroke="var(--color-plum)" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

export function Heart({ className, color = "var(--color-bubblegum)" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 40 36" aria-hidden="true" focusable="false">
      <path d="M20 33 C6 24 3 16 3 11 C3 6 7 3 11 3 C15 3 18 5 20 9 C22 5 25 3 29 3 C33 3 37 6 37 11 C37 16 34 24 20 33 Z" fill={color} stroke="var(--color-plum)" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

export function Leaf({ className, color = "var(--color-mint)" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 44 36" aria-hidden="true" focusable="false">
      <path d="M4 30 C4 12 16 4 40 4 C40 24 28 32 4 30 Z" fill={color} stroke="var(--color-plum)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M8 27 C18 20 26 14 34 9" fill="none" stroke="var(--color-plum)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Berry({ className, color = "var(--color-bubblegum)" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 40 44" aria-hidden="true" focusable="false">
      <path d="M20 40 C8 36 4 24 6 16 C8 10 14 9 20 12 C26 9 32 10 34 16 C36 24 32 36 20 40 Z" fill={color} stroke="var(--color-plum)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M20 12 C18 6 14 4 10 5 C13 8 16 9 20 12 Z M20 12 C22 6 26 4 30 5 C27 8 24 9 20 12 Z" fill="var(--color-mint)" stroke="var(--color-plum)" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="15" cy="22" r="1.6" fill="var(--color-plum)" />
      <circle cx="24" cy="26" r="1.6" fill="var(--color-plum)" />
      <circle cx="19" cy="31" r="1.6" fill="var(--color-plum)" />
    </svg>
  );
}

/** A flat, rounded cloud used in the courier scene. */
export function Cloud({ className, color = "var(--color-cream)" }: MarkProps) {
  return (
    <svg className={className} viewBox="0 0 120 56" aria-hidden="true" focusable="false">
      <path d="M22 50 C8 50 4 36 14 31 C12 18 28 12 36 22 C40 8 66 6 72 22 C84 14 102 22 98 36 C112 36 114 50 100 50 Z" fill={color} stroke="var(--color-plum)" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path className="pk-check-path" d="M5 12.5 L10 17.5 L19 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
    </svg>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 12 H19 M13 6 L19 12 L13 18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
