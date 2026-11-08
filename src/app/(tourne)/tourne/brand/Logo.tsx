import type { SVGProps } from "react";

/** The mark: a thrown vessel standing on its wheel inside a round seal. */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" {...props}>
      <circle cx="32" cy="32" r="32" fill="var(--color-clay)" />
      <path
        d="M25 14h14c1 0 1.5 1 1 2-1.5 3-1 5.5 1.5 9 3.5 5 5 10 3 15-1.5 4-4 6-8 6h-9c-4 0-6.5-2-8-6-2-5-.5-10 3-15 2.5-3.500 3-6 1.500-9-.5-1 0-2 1-2z"
        fill="var(--color-bone)"
      />
      <ellipse cx="32" cy="54" rx="17" ry="3" fill="var(--color-soot)" />
    </svg>
  );
}

/** Mark plus the lowercase wordmark; the wordmark is live text in the display face. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`tn-logo ${className ?? ""}`}>
      <LogoMark className="tn-logo-mark" />
      <span className="tn-logo-word">tourne</span>
    </span>
  );
}
