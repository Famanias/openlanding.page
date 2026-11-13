import { Fragment, type CSSProperties, type ElementType } from "react";

type SplitTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  startIndex?: number;
};

/**
 * Splits a heading into masked words while preserving natural spaces and
 * full text semantics for screen readers without placing aria-label on a bare span.
 */
export function SplitText({ text, as: Tag = "span", className, startIndex = 0 }: SplitTextProps) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <span className="dt-sr">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="dt-word">
              <span className="dt-word-inner" style={{ "--wi": startIndex + i } as CSSProperties}>
                {word}
              </span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
