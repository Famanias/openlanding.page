import type { PartTag, PropGlyph } from "../content/parts";

/** The prop each part's card stands in its spotlight: one line drawing per kind of work. */
const PROPS: Record<PropGlyph, string> = {
  chart: "M14 84V40M38 84V22M62 84V52M86 84V30M6 84h88",
  braces: "M34 14c-12 0-12 8-12 18s-2 18-12 18c10 0 12 8 12 18s0 18 12 18M66 14c12 0 12 8 12 18s2 18 12 18c-10 0-12 8-12 18s0 18-12 18M44 66l12-32",
  cursor: "M24 12v64l18-17 12 27 12-5-12-27h25Z",
  nib: "M50 10 74 46 56 88H44L26 46ZM50 10v44M50 54a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z",
  megaphone: "M14 40v20h14l40 22V18L28 40ZM28 60l8 26h12l-6-24M78 38c6 4 6 20 0 24",
  gear: "M50 30a20 20 0 1 0 0 40 20 20 0 0 0 0-40ZM50 6v14M50 80v14M6 50h14M80 50h14M19 19l10 10M71 71l10 10M19 81l10-10M71 29l10-10",
  flask: "M40 10h20M44 10v28L18 82c-2 5 1 8 6 8h52c5 0 8-3 6-8L56 38V10M28 66h44",
  compass: "M50 8a42 42 0 1 1 0 84 42 42 0 0 1 0-84ZM64 36 56 56 36 64l8-20Z",
  bubble: "M14 22h72v44H44L26 82V66H14ZM30 40h40M30 52h26",
  stack: "M50 12 88 32 50 52 12 32ZM12 50l38 20 38-20M12 68l38 20 38-20",
};

export function Prop({ glyph, className }: { glyph: PropGlyph; className?: string }) {
  return (
    <svg className={`us-prop ${className ?? ""}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path d={PROPS[glyph]} fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
    </svg>
  );
}

export function TagIcon({ tag }: { tag: PartTag }) {
  const d = tag === "hot" ? "M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-3-1-6 1-9Z"
    : tag === "rising" ? "M3 17 10 10l4 4 7-7M15 7h6v6" : "M12 3 14 10 21 12 14 14 12 21 10 14 3 12 10 10Z";
  return (
    <svg className="us-tag__i" viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill={tag === "rising" ? "none" : "currentColor"} stroke={tag === "rising" ? "currentColor" : "none"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** An abstract face for the cast and the director: a head, shoulders and a tone. */
export function Face({ tone = 0, className }: { tone?: 0 | 1 | 2 | 3; className?: string }) {
  return (
    <svg className={`us-face us-face--${tone} ${className ?? ""}`} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <circle className="us-face__bg" cx="20" cy="20" r="20" />
      <circle className="us-face__head" cx="20" cy="16" r="7" />
      <path className="us-face__body" d="M7 36c1.5-7 6.5-11 13-11s11.5 4 13 11a19.9 19.9 0 0 1-26 0Z" />
    </svg>
  );
}

/** The cue light that pops at the end of a held line: a small bulb on a stand, glowing. */
export function CueDot({ className }: { className?: string }) {
  return (
    <span className={`us-cuedot ${className ?? ""}`} aria-hidden="true">
      <Face tone={1} className="us-cuedot__face" />
      <i className="us-cuedot__ring" />
    </span>
  );
}
