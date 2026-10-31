import { Fragment, type CSSProperties } from 'react';

export function SplitText({ text }: { text: string }) {
  return (
    <span className="lm-split">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(' ').map((word, i) => (
          <Fragment key={i}><span className="lm-word">
            <span className="lm-word__in" style={{ '--word': i } as CSSProperties}>{word}</span>
          </span>{' '}</Fragment>
        ))}
      </span>
    </span>
  );
}
