import { Magnetic } from "../motion/Magnetic";
import { CountUp } from "../motion/CountUp";
import { SplitText } from "../motion/SplitText";
import { FORMS } from "../vessel/forms";
import { VesselSvg } from "../vessel/VesselSvg";
import { WheelReadout } from "./WheelReadout";

const HERO_FORM = FORMS[0];

/** Load choreography is CSS keyframes (data-load) so it plays before hydration, with no flash and no CLS. */
export function Hero() {
  return (
    <section id="top" className="tn-hero" aria-labelledby="tn-hero-title">
      <div className="tn-blobs" aria-hidden="true">
        <i className="tn-blob tn-blob-a" />
        <i className="tn-blob tn-blob-b" />
        <i className="tn-blob tn-blob-c" />
      </div>
      <div className="tn-hero-inner">
        <div className="tn-hero-copy">
          <p className="tn-eyebrow" data-load="eyebrow">
            Pottery studio · Tacoma, Washington
          </p>
          <h1 id="tn-hero-title" className="tn-display tn-hero-title" data-load="title">
            <SplitText text="Shape it." className="tn-line" />
            <SplitText text="We throw it." className="tn-line tn-line-clay" startIndex={2} />
          </h1>
          <p className="tn-lede" data-load="lede">
            Pull the clay up on a real wheel, move the belly, choose the glaze. Then two potters in a converted boatyard make exactly that, by hand, in five weeks.
          </p>
          <div className="tn-hero-actions" data-load="actions">
            <Magnetic>
              <a href="#workshop" className="tn-btn tn-btn-clay">
                <span className="tn-btn-label" data-label="Start the wheel">
                  Start the wheel
                </span>
                <span className="tn-btn-arrow" aria-hidden="true" />
              </a>
            </Magnetic>
            <a href="#collection" className="tn-link">
              <span>See the five forms</span>
            </a>
          </div>
          <dl className="tn-hero-stats" data-load="stats">
            <div>
              <dt>Pieces thrown since 2014</dt>
              <dd className="tn-display">
                <CountUp value={11482} />
              </dd>
            </div>
            <div>
              <dt>Top firing, °C</dt>
              <dd className="tn-display">
                <CountUp value={1305} />
              </dd>
            </div>
          </dl>
        </div>
        <div className="tn-hero-visual" data-load="visual">
          <div className="tn-hero-vessel">
            <VesselSvg params={HERO_FORM.params} glazeId="raw" label="A moon jar of raw clay on a potter's wheel" />
          </div>
          <WheelReadout />
        </div>
      </div>
      <div className="tn-scroll-cue" data-load="cue" aria-hidden="true">
        <span>Scroll to throw</span>
        <i />
      </div>
    </section>
  );
}
