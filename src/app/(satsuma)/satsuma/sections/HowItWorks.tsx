import { STEPS } from "../content/steps";
import { CountUp } from "../motion/CountUp";
import { Eyebrow } from "./Eyebrow";

export function HowItWorks() {
  return (
    <section id="how" className="sa-how" aria-labelledby="sa-how-h">
      <div className="sa-wrap">
        <Eyebrow n="01">How it works</Eyebrow>
        <h2 id="sa-how-h" className="sa-h2" data-reveal="mask">
          <span className="sa-mask">
            <span>Brief it. Match it.</span>
          </span>
          <span className="sa-mask">
            <span>
              Peel off <em>your reels.</em>
            </span>
          </span>
        </h2>

        <ol className="sa-steps" data-reveal="cascade">
          {STEPS.map((s, i) => (
            <li key={s.n} className="sa-step" style={{ "--i": i } as React.CSSProperties}>
              <span className="sa-step__n" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="sa-step__title">{s.title}</h3>
              <p className="sa-step__body">{s.body}</p>
              <p className="sa-step__figure">
                <CountUp value={s.figure} className="sa-step__num" />
                <span className="sa-step__unit">{s.unit}</span>
                <span className="sa-step__label">{s.figureLabel}</span>
              </p>
              {i < STEPS.length - 1 && (
                <svg className="sa-step__link" viewBox="0 0 120 40" aria-hidden="true" focusable="false">
                  <path pathLength={1} className="sa-draw sa-draw--scroll" d="M2 28C30 4 70 4 112 24" />
                  <path pathLength={1} className="sa-draw sa-draw--scroll" d="M96 14l16 10-18 8" />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
