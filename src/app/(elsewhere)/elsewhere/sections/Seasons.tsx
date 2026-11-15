import { Blaze } from "../brand/Signal";
import { Lines } from "../motion/Lines";
import { Reveal } from "../motion/Reveal";
import { SeasonFrame } from "../seasons/SeasonFrame";

/** Three plates from one camera position. The month ruler here also sets the month the booking panel quotes. */
export function Seasons() {
  return (
    <section className="ew-seasons" id="seasons" aria-labelledby="ew-seasons-title">
      <div className="ew-seasons-head">
        <div>
          <Reveal variant="slide" className="ew-post ew-section-post">
            <Blaze /> Same door, all year
          </Reveal>
          <Reveal as="h2" variant="lines" className="ew-display ew-h2" id="ew-seasons-title">
            <Lines lines={["The valley keeps", "three seasons."]} />
          </Reveal>
        </div>
        <Reveal as="p" variant="settle" className="ew-lede" delay={140}>
          Green, amber, white. We photograph the cabin from the same rock in each, so you can see exactly what you are walking into. Slide the ruler to a
          month and the rest of the page follows it.
        </Reveal>
      </div>
      <Reveal variant="approach" className="ew-seasons-body">
        <SeasonFrame />
      </Reveal>
    </section>
  );
}
