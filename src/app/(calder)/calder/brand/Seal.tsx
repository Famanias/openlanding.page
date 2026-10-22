import { MarkPaths } from "./Logo";

type SealProps = {
  /** Unique per instance: the lettering runs along a path with this id. */
  id: string;
  className?: string;
  /** Short line set under the mark (a docket number). */
  caption?: string;
};

const RING_TEXT = "CALDER & ROWE LLP · ATTORNEYS AT LAW · NEW YORK · EST. 1987 · ";

/**
 * The firm's seal, as two stacked SVGs so the ring can turn on the compositor: an SVG's own children are repainted on the
 * main thread every frame, but a whole <svg> element is just a layer. The ring (rules, lettering; class cr-seal__ring)
 * turns slowly when it's ambient; the mark and caption stay still on top.
 * Colours come from --seal-ink (rings, lettering), --seal-mark (the monogram) and --seal-bg (a disc behind it), so the
 * same seal reads on midnight and on ivory.
 */
export function Seal({ id, className, caption }: SealProps) {
  const ink = "var(--seal-ink, var(--color-gold))";
  return (
    <span className={`cr-seal ${className ?? ""}`} aria-hidden="true">
      <svg className="cr-seal__ring" viewBox="0 0 200 200" fill="none">
        <defs>
          <path id={`${id}-ring`} d="M100 100m-76 0a76 76 0 1 1 152 0a76 76 0 1 1-152 0" />
        </defs>
        <circle cx="100" cy="100" r="98" fill="var(--seal-bg, transparent)" />
        <circle cx="100" cy="100" r="97" stroke={ink} strokeWidth="1.2" />
        <circle cx="100" cy="100" r="58" stroke={ink} strokeWidth="0.8" />
        <text className="cr-seal__text" fill={ink}>
          <textPath href={`#${id}-ring`} startOffset="0" textLength="472" lengthAdjust="spacing">
            {RING_TEXT}
          </textPath>
        </text>
      </svg>
      <svg className="cr-seal__core" viewBox="0 0 200 200" fill="none">
        <svg x="68" y={caption ? 52 : 68} width="64" height="64" viewBox="0 0 48 48" style={{ color: "var(--seal-mark, var(--color-ivory))" }}>
          <MarkPaths />
        </svg>
        {caption ? (
          <text className="cr-seal__caption" x="100" y="133" textAnchor="middle" fill={ink}>
            {caption}
          </text>
        ) : null}
      </svg>
    </span>
  );
}
