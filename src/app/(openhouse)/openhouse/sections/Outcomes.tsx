import type { CSSProperties } from "react";

const outcomes = [
  ["01", "One offer", "The sentence a new visitor should understand before they scroll."],
  ["02", "One path", "The few fields and choices that help the right person keep moving."],
  ["03", "One handoff", "The next step your team can actually answer when the page is live."],
] as const;

export function Outcomes() {
  return (
    <section className="oh-section oh-section--paper" id="outcomes">
      <div className="oh-container oh-section-grid">
        <div className="oh-section-intro" data-oh-reveal="rise">
          <h2>Make the next step feel obvious.</h2>
          <p className="oh-section-lead">Small businesses do not need more noise. They need a page that helps the right visitor decide.</p>
        </div>
        <div className="oh-outcome-list">
          {outcomes.map(([number, title, copy], index) => (
            <article className="oh-outcome" data-oh-reveal="draw" style={{ "--oh-index": index } as CSSProperties} key={number}>
              <span className="oh-outcome-number">{number}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
              <span className="oh-outcome-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
