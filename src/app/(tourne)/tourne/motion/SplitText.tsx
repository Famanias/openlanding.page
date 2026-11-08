import { Fragment, type CSSProperties, type ElementType } from "react";

type SplitTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Index offset so several headings can continue one cascade. */
  startIndex?: number;
};

/**
 * Splits a heading into masked words. The words stay real text with real spaces between
 * them, so screen readers read the heading as written. Words rise through `.tn-word` masks,
 * driven by an ancestor `[data-in="true"]` or the hero load sequence (CSS only, so it runs
 * before hydration).
 */
export function SplitText({ text, as: Tag = "span", className, startIndex = 0 }: SplitTextProps) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="tn-word">
            <span className="tn-word-inner" style={{ "--wi": startIndex + i } as CSSProperties}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
