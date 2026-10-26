import type { CSSProperties, ReactNode } from "react";

/**
 * A held line that a cue runs through, letter by letter: grey until the wave reaches it,
 * cue-coloured inside the wave, ink once it has passed. The CSS works it out from the
 * scene's `--p` and each letter's `--i`; no script writes per letter.
 * Words never break inside; `cue` marks words that stay in the accent once lit.
 */
export function WaveLine({ words, start = 0, total, cue = [], after }: {
  words: string[]; start?: number; total: number; cue?: number[]; after?: ReactNode;
}) {
  let i = start;
  return (
    <span className="us-wave" style={{ "--n": total } as CSSProperties} aria-hidden="true">
      {words.map((word, w) => (
        <span key={w} className={`us-wave__w${cue.includes(w) ? " us-wave__w--cue" : ""}`}>
          {[...word].map((ch) => <span key={i} className="us-wave__c" style={{ "--i": i++ } as CSSProperties}>{ch}</span>)}
          {w === words.length - 1 ? after : null}
        </span>
      )).flatMap((el, w) => (w === 0 ? [el] : [" ", el]))}
    </span>
  );
}

export const letterCount = (words: string[]) => words.reduce((n, w) => n + [...w].length, 0);
