import { CueDot } from "../brand/Props";
import { WaveLine, letterCount } from "../motion/WaveLine";
import { RehearsalCarousel } from "../rehearsal/RehearsalCarousel";

const LINE = ["Learn", "the", "part", "by", "playing", "it."];

/**
 * The house lights come back up over a dark bowl that flattens as you arrive.
 * The signature headline introduces the four acts of rehearsal, organized as an interactive
 * stage carousel with dedicated act controls and scene navigation.
 */
export function Rehearsal() {
  return (
    <section className="us-rehearse" id="rehearsal" data-scene="rehearse" data-flow data-line="1" data-tone="light" aria-labelledby="us-rehearse-t">
      <i className="us-bowl" aria-hidden="true" />
      {/* a measuring strip: feeds cue progress to the headline */}
      <i className="us-rehearse__cue" data-scene="wave" data-flow data-line="0.8" data-feeds=".us-rehearse__hold" aria-hidden="true" />
      <div className="us-rehearse__hold">
        <h2 className="us-rehearse__t" id="us-rehearse-t">
          <span className="us-sr">Learn the part by playing it.</span>
          <WaveLine words={LINE} total={letterCount(LINE)} cue={[4, 5]} after={<CueDot className="us-wave__pop" />} />
        </h2>
        <p className="us-rehearse__sub">
          Eighteen simulated companies. Real briefs. Daily director critique. Walk out with a verified reel the casting network opens.
        </p>
      </div>

      <div className="us-thread" data-scene="thread" data-flow data-line="0.7">
        <svg className="us-thread__lead" viewBox="0 0 1200 180" preserveAspectRatio="none" aria-hidden="true">
          <path d="M600 0C600 112 24 68 24 178" pathLength={1} />
        </svg>
        <i className="us-thread__rail" aria-hidden="true"><b /></i>
        <RehearsalCarousel />
      </div>
    </section>
  );
}
