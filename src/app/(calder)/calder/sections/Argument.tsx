import { Seal } from "../brand/Seal";
import { CLAUSES } from "../content/argument";
import { BriefDriver } from "../brief/BriefDriver";
import { pageLabel } from "../brief/progress";
import { Eyebrow, Lines, vars } from "./parts";

/**
 * The signature: a bound brief that drafts itself. This server component renders every clause in full (so the
 * static page is finished); BriefDriver, a client leaf, scrubs the words, margin notes and seal from scroll when
 * the pinned layout applies. Sticky stage, tall runway: see calder.css `.cr-arg`.
 */
export function Argument() {
  return (
    <section id="argument" className="cr-arg" aria-labelledby="cr-arg-h" data-brief>
      <BriefDriver />
      <div className="cr-arg__stage">
        <div className="cr-wrap cr-arg__grid">
          <div className="cr-arg__intro">
            <Eyebrow n="§ II" tone="slab">
              The argument
            </Eyebrow>
            <Lines as="h2" id="cr-arg-h" className="cr-h2" lines={["Every matter is", <em key="e">argued the same way.</em>]} />
            <div className="cr-steps">
              <span className="cr-arg__rail" aria-hidden="true">
                <i />
              </span>
              <ol>
                {CLAUSES.map((c, i) => (
                  <li key={c.id} className="cr-step" data-i={i} data-state="idle">
                    <span className="cr-step__n cr-mono">0{i + 1}</span>
                    <div>
                      <h3>{c.stage}</h3>
                      <p>{c.gist}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="cr-arg__sheetwrap" data-reveal="settle">
            <article className="cr-brief" aria-label="Memorandum of counsel: the four clauses of how we argue a matter">
              <header className="cr-brief__head">
                <span className="cr-mono">Memorandum of counsel</span>
                <span className="cr-mono" data-page aria-hidden="true">
                  {pageLabel(0, CLAUSES.length)}
                </span>
              </header>
              <p className="cr-brief__matter">
                In the matter of <em>your decision</em>
              </p>

              {CLAUSES.map((c, i) => {
                const words = c.body.split(/\s+/);
                return (
                  <section key={c.id} className="cr-clause" data-i={i} style={vars({ "--n": words.length })}>
                    <h3 className="cr-clause__h">
                      <span className="cr-clause__n cr-mono">§ {i + 1}</span>
                      {c.heading}
                    </h3>
                    <p className="cr-clause__body">
                      {words.map((w, wi) => (
                        <span key={wi} className="cr-w" style={vars({ "--w": wi })}>
                          {w}{" "}
                        </span>
                      ))}
                    </p>
                    <p className="cr-note cr-note--clause">{c.note}</p>
                  </section>
                );
              })}

              <footer className="cr-brief__foot">
                <span className="cr-brief__sign">
                  <span className="cr-sheet__sig" aria-hidden="true" />
                  <span className="cr-mono">Calder &amp; Rowe LLP</span>
                </span>
                <Seal id="brief" className="cr-brief__seal" caption="FILED" />
              </footer>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
