import { BriefForm } from "../forms/BriefForm";
import { Eyebrow } from "./Eyebrow";

export function Brief() {
  return (
    <section id="brief" className="sa-brief" aria-labelledby="sa-brief-h">
      <div className="sa-wrap sa-brief__grid">
        <div className="sa-brief__copy">
          <Eyebrow n="04">Make a Reel</Eyebrow>
          <h2 id="sa-brief-h" className="sa-h2" data-reveal="mask">
            <span className="sa-mask">
              <span>Tell us what</span>
            </span>
            <span className="sa-mask">
              <span>
                to <em>peel.</em>
              </span>
            </span>
          </h2>
          <p className="sa-lede" data-reveal="rise">
            Five fields, about a minute. We match you with a maker inside a day, and you only pay once you say yes to their treatment.
          </p>
          <ul className="sa-brief__facts" data-reveal="cascade">
            <li style={{ "--i": 0 } as React.CSSProperties}>
              <strong>24 h</strong> to a maker match
            </li>
            <li style={{ "--i": 1 } as React.CSSProperties}>
              <strong>9:16</strong> vertical, captioned
            </li>
            <li style={{ "--i": 2 } as React.CSSProperties}>
              <strong>$0</strong> to send a brief
            </li>
          </ul>
        </div>
        <div data-reveal="scale">
          <BriefForm />
        </div>
      </div>
    </section>
  );
}
