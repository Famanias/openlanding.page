import { Magnetic } from "../motion/Magnetic";
import { WaveLine, letterCount } from "../motion/WaveLine";

const A = ["Built", "to", "get", "you"];
const B = ["cast."];
const TOTAL = letterCount(A) + letterCount(B);

/**
 * The end of the story, held. A cue runs through "Built to get you cast."; between "you" and
 * "cast." a contract slides out of the gap, and once the cue reaches the full stop it is signed
 * and sealed. Then the price rises under it.
 */
export function Contract() {
  return (
    <section className="us-contract" id="pricing" data-scene="contract" data-tone="light" aria-labelledby="us-contract-t">
      <div className="us-contract__stage">
        <div className="us-contract__card">
          <p className="us-eyebrow us-contract__eyebrow">Studio Tuition & Term Sheet</p>
          <h2 className="us-contract__t" id="us-contract-t">
            <span className="us-sr">Built to get you cast.</span>
            <WaveLine words={A} total={TOTAL} />
            <span className="us-deal" aria-hidden="true">
              <span className="us-deal__back" />
              <span className="us-deal__sheet">
                <i className="us-deal__k">Offer</i>
                <i className="us-deal__ln" /><i className="us-deal__ln us-deal__ln--s" /><i className="us-deal__ln" />
                <svg className="us-deal__sig" viewBox="0 0 64 24"><path d="M3 17c5-9 8-13 10-11s-3 12 0 12 6-12 9-12-1 10 2 10 5-7 8-7 2 6 5 6 7-4 10-5 6 1 13 0" pathLength={1} /></svg>
                <i className="us-deal__rule" />
              </span>
              <span className="us-deal__seal"><svg viewBox="0 0 24 24"><path d="M6 12.5 10 16.5 18 8" /></svg></span>
            </span>
            <WaveLine words={B} start={letterCount(A)} total={TOTAL} cue={[0]} />
          </h2>
          <p className="us-contract__price">
            <span className="us-contract__l">Opening night is free.</span>{" "}
            <span className="us-contract__l">Then <b>$89</b> a month.</span>
          </p>
          <p className="us-contract__note">7-day risk-free rehearsal trial. No long-term commitments. Cancel anytime with one click.</p>
          <div className="us-contract__acts">
            <Magnetic>
              <a className="us-btn us-btn--ink us-btn--big" href="mailto:hello@understudy.example?subject=Audition" data-us-start>
                <span className="us-roll" data-text="Book your first call time"><span>Book your first call time</span></span>
                <svg className="us-btn__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13m-5-6 6 6-6 6" /></svg>
              </a>
            </Magnetic>
            <a className="us-link" href="mailto:hello@understudy.example" data-us-ask>Ask a question first</a>
          </div>
          <ul className="us-contract__facts">
            <li><b>10 h</b><span>a week, around a day job</span></li>
            <li><b>5–8</b><span>weeks to a finished reel</span></li>
            <li><b>62%</b><span>of reels got a callback last season</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
