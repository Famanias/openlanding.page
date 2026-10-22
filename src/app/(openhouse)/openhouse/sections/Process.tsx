import type { CSSProperties } from "react";

const process = [
  ["Welcome", "We read the brief and find the sentence worth leading with."],
  ["Listen", "We pressure-test the offer against the questions a good lead asks."],
  ["Invite", "We turn the answer into one page and one action your team can own."],
] as const;

export function Process() {
  return (
    <section className="oh-section oh-section--desk" id="process">
      <div className="oh-container">
        <div className="oh-process-head" data-oh-reveal="rise">
          <h2>The welcome, the question, the next step.</h2>
        </div>
        <div className="oh-process-list">
          {process.map(([title, copy], index) => (
            <article className="oh-process-item" data-oh-reveal="draw" style={{ "--oh-index": index } as CSSProperties} key={title}>
              <span className="oh-process-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
