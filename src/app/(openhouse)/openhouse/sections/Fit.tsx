import type { CSSProperties } from "react";

const fits = [
  ["Service business", "For work that starts with a conversation."],
  ["Local shop", "For a place people should choose today."],
  ["Specialist practice", "For expertise that needs a calm first step."],
] as const;

export function Fit() {
  return (
    <section className="oh-section oh-section--board" id="fit">
      <div className="oh-container oh-fit-grid">
        <div data-oh-reveal="mask">
          <h2>Warm enough to welcome. Clear enough to act.</h2>
        </div>
        <div className="oh-fit-side" data-oh-reveal="rise">
          <p>OPENHOUSE is for teams with a real offer and a real person on the other side of the form.</p>
          <p className="oh-fit-rule">If a stranger can understand the value in one sentence, this is a good place to begin.</p>
        </div>
        <div className="oh-fit-list">
          {fits.map(([title, copy], index) => (
            <article className="oh-fit-item" data-oh-reveal="settle" style={{ "--oh-index": index } as CSSProperties} key={title}>
              <span className="oh-fit-marker">0{index + 1}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
