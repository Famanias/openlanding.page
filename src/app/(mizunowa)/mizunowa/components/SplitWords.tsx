'use client';

import { CSSProperties, Fragment } from 'react';

interface SplitWordsProps {
  text: string;
  /** Words to set in the accent colour, matched without trailing punctuation. */
  accent?: readonly string[];
}

/** Splits a heading into masked words. Animate it by wrapping the heading in `<Reveal variant="words">`. */
export default function SplitWords({ text, accent = [] }: SplitWordsProps) {
  const words = text.split(' ');

  return (
    <>
      {words.map((word, index) => {
        const isAccent = accent.includes(word.replace(/[.,]$/, ''));
        return (
          <Fragment key={`${index}-${word}`}>
            <span className="mnw-word">
              <span
                className={isAccent ? 'mnw-word-accent' : undefined}
                style={{ '--i': index } as CSSProperties}
              >
                {word}
              </span>
            </span>
            {index < words.length - 1 ? ' ' : null}
          </Fragment>
        );
      })}
    </>
  );
}
