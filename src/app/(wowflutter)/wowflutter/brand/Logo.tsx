import type { CSSProperties } from "react";

/** Baseline offsets (em) for each letter: slow swings on "wow", quick small ones on "flutter". */
const WOBBLE = [0, -0.086, 0.034, -0.052, 0.017, -0.026, 0.009, -0.017, 0, -0.009];
const WORD = "wowflutter";

/**
 * The mark: a record whose spindle hole is deliberately off-centre (the physical cause of "wow"),
 * with a pink label. `tone` is the disc colour; the grooves take the colour of whatever it sits on.
 */
export function Mark({ tone = "ink", className, title }: { tone?: "ink" | "paper"; className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`wf-mark wf-mark--${tone} ${className ?? ""}`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path
        className="wf-mark__disc"
        fillRule="evenodd"
        d="M2 32a30 30 0 1 0 60 0a30 30 0 1 0-60 0ZM32 30a3 3 0 1 0 6 0a3 3 0 1 0-6 0Z"
      />
      <g className="wf-mark__grooves" fill="none" strokeWidth="1">
        <circle cx="32" cy="32" r="17.5" />
        <circle cx="32" cy="32" r="21.5" />
        <circle cx="32" cy="32" r="25.5" />
      </g>
      <path
        className="wf-mark__label"
        fillRule="evenodd"
        d="M19 32a13 13 0 1 0 26 0a13 13 0 1 0-26 0ZM32 30a3 3 0 1 0 6 0a3 3 0 1 0-6 0Z"
      />
    </svg>
  );
}

function Letters() {
  return (
    <>
      {[...WORD].map((ch, i) => (
        <span key={i} className="wf-ltr" style={{ "--wob": `${WOBBLE[i]}em` } as CSSProperties}>
          {ch}
        </span>
      ))}
    </>
  );
}

/** "wowflutter" with its wobbling baseline over an off-register pink pass. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`wf-wordmark ${className ?? ""}`}>
      <span className="wf-wordmark__pink" aria-hidden="true">
        <Letters />
      </span>
      <span className="wf-wordmark__ink">
        <span className="wf-vh">wowflutter</span>
        <span aria-hidden="true">
          <Letters />
        </span>
      </span>
    </span>
  );
}

/** Mark plus wordmark, used in the top bar. */
export function Logo({ tone = "paper" }: { tone?: "ink" | "paper" }) {
  return (
    <a className="wf-logo" href="#top">
      <Mark tone={tone} className="wf-logo__mark" />
      <Wordmark />
    </a>
  );
}
