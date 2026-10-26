import { Fragment } from "react";

export function SplitText({ text }: { text: string }) {
  const words = text.split(" ");
  // The space lives between the masks: a trailing space inside an inline-block is collapsed away.
  return <span className="nli-split" aria-label={text}>{words.map((word, index) => <Fragment key={`${word}-${index}`}>{index > 0 ? " " : null}<span className="nli-split__mask" aria-hidden="true"><span style={{ "--i": index } as React.CSSProperties}>{word}</span></span></Fragment>)}</span>;
}
