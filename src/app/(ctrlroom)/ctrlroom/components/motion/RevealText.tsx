import { Fragment, type CSSProperties } from 'react';

/** Real text remains readable on the server and is announced once. */
export function RevealText({ text }: { text: string }) {
  return <span className="cr-split">
    <span className="sr-only">{text}</span>
    <span aria-hidden="true">{text.split(' ').map((word, index) => (
      <Fragment key={index}><span className="cr-word"><span
        className="cr-word-in" style={{ '--cr-word': index } as CSSProperties}
      >{word}</span></span>{' '}</Fragment>
    ))}</span>
  </span>;
}
