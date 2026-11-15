import { Blaze } from "../brand/Signal";
import { HoldForm } from "../forms/HoldForm";
import { Lines } from "../motion/Lines";
import { Reveal } from "../motion/Reveal";
import { StayPanel } from "../stay/StayPanel";

/** Booking, in the brand's terms: you hold the cabin and ask for the key. Local state only. */
export function Stay() {
  return (
    <section className="ew-stay" id="stay" aria-labelledby="ew-stay-title">
      <div className="ew-stay-head">
        <Reveal variant="slide" className="ew-post ew-section-post">
          <Blaze /> Stay · one cabin, one booking at a time
        </Reveal>
        <Reveal as="h2" variant="lines" className="ew-display ew-h2" id="ew-stay-title">
          <Lines lines={["Hold the cabin."]} />
        </Reveal>
        <Reveal as="p" variant="settle" className="ew-lede" delay={140}>
          Pick a month and a number of nights. We hold the dates for two days, lay the stove, and send a lockbox code the morning you set out.
        </Reveal>
      </div>

      <div className="ew-stay-grid">
        <Reveal variant="approach" className="ew-stay-col">
          <StayPanel />
        </Reveal>
        <Reveal variant="approach" className="ew-stay-col" index={1}>
          <HoldForm />
        </Reveal>
      </div>
    </section>
  );
}
