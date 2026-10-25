import { Fragment, type CSSProperties, type ElementType } from "react";

type SplitTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Extra stagger offset in word steps (the hero headline starts later than a section title). */
  start?: number;
};

type Group = { hl: boolean; words: string[] };

function groups(text: string): Group[] {
  return text
    .split(/(\[\[.*?\]\])/g)
    .filter((p) => p.trim().length > 0)
    .map((p) => {
      const hl = p.startsWith("[[");
      return { hl, words: p.replace(/\[\[|\]\]/g, "").split(" ").filter(Boolean) };
    });
}

/**
 * Splits a heading into word masks. Words wrapped in [[double brackets]] get the pill highlight.
 * Each word stays real text (no aria-label tricks), so screen readers read the heading normally.
 */
export function SplitText({ text, as: Tag = "span", className, id, start = 0 }: SplitTextProps) {
  let n = start;
  const word = (w: string, key: string) => (
    <span className="pk-w" key={key}>
      <span className="pk-wi" style={{ "--i": n++ } as CSSProperties}>{w}</span>
    </span>
  );
  const spaced = (words: string[], gi: number) =>
    words.map((w, wi) => (
      <Fragment key={`${gi}-${wi}`}>
        {wi > 0 ? " " : null}
        {word(w, `${gi}-${wi}-w`)}
      </Fragment>
    ));
  return (
    <Tag id={id} className={className}>
      {groups(text).map((g, gi) => (
        <Fragment key={gi}>
          {gi > 0 ? " " : null}
          {g.hl ? <span className="pk-hl">{spaced(g.words, gi)}</span> : spaced(g.words, gi)}
        </Fragment>
      ))}
    </Tag>
  );
}
