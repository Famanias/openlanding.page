import type { CSSProperties } from 'react';

const lines = ['Less busywork.', 'More meaningful work.'];
export function WorkflowStatement() {
  let index = 0;
  return (
    <section className="lm-statement" aria-label="Less busywork. More meaningful work." data-lm-statement="">
      <div className="lm-statement__mark" aria-hidden="true"><span /><span /><span /></div>
      <p>
        {lines.map((line) => (
          <span className="lm-statement__line" key={line}>
            {line.split(' ').map((word) => <span key={word} style={{ '--word': index++ } as CSSProperties}>{word}{' '}</span>)}
          </span>
        ))}
      </p>
      <span className="lm-statement__note">A clearer way to work. A little more room to think.</span>
    </section>
  );
}
