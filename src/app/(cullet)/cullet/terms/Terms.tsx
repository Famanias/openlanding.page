import type { CSSProperties } from "react";
import { TERMS } from "../content/copy";
import { MaskLine, Reveal } from "../motion/Reveal";
import { Diagram } from "./Diagram";
import { TermRail } from "./TermRail";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Chapter 01, the five terms. On wide screens with motion it is a held scene: the stage pins and the
 * scroll steps through the terms (the director writes `data-active`), each one drawing its ray diagram.
 * Everywhere else it is a plain list of five cards, every diagram drawn.
 */
export function Terms() {
  return (
    <section className="fc-terms" id="terms" data-scene="terms" aria-labelledby="fc-terms-title" style={{ "--count": TERMS.length } as CSSProperties}>
      <div className="fc-terms__stage">
        <header className="fc-terms__head">
          <Reveal as="p" variant="slide" className="fc-eyebrow">Chapter 01 · The vocabulary</Reveal>
          <h2 id="fc-terms-title" className="fc-h2">
            <MaskLine>Real-time glass,</MaskLine> <MaskLine index={1}>in five terms.</MaskLine>
          </h2>
        </header>

        <TermRail names={TERMS.map((t) => t.name)} />

        <div className="fc-terms__list">
          {TERMS.map((t, i) => (
            <article key={t.id} className="fc-term" data-term={i} data-active={i === 0 ? "" : undefined} aria-labelledby={`fc-term-${t.id}`}>
              <Reveal variant="cleave" className="fc-term__fig">
                <div className="fc-term__fig-in">
                  <Diagram kind={t.diagram} label={`${t.name} diagram`} />
                  <span className="fc-term__chip">{t.readout}</span>
                </div>
              </Reveal>
              <div className="fc-term__text">
                <p className="fc-term__n"><span>{pad(i + 1)}</span> / {pad(TERMS.length)}</p>
                <h3 id={`fc-term-${t.id}`} className="fc-term__name">{t.name}</h3>
                <p className="fc-term__body">{t.body}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="fc-terms__meter" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
