import type { CSSProperties } from "react";
import { Picture } from "../assets";
import { NoseBullet } from "../brand/Logo";
import { Reveal } from "../motion/Reveal";
import { VISIT_STEPS } from "./content";
import { Heading } from "./Heading";

export function Visit() {
  return (
    <section id="visit" className="sn-sec sn-visit" aria-labelledby="sn-visit-title">
      <Heading eyebrow="Your visit" lines={["Four steps, nose", "to tail-wag."]} id="sn-visit-title">
        The fear-free routine every patient gets, from the door to the car park.
      </Heading>
      <div className="sn-visit-path">
        <svg className="sn-visit-trail" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M20 60C200 0 300 120 480 60S760 0 900 60S1100 110 1180 50" />
        </svg>
        <ol className="sn-visit-steps">
          {VISIT_STEPS.map((step, i) => (
            <li key={step.n} className="sn-step" style={{ "--i": i } as CSSProperties}>
              <Reveal variant="wipe" index={i} className="sn-step-photo">
                <Picture assetKey={step.image} alt={step.alt} sizes="(min-width: 1000px) 25vw, (min-width: 640px) 45vw, 90vw" />
              </Reveal>
              <Reveal variant="pop" index={i} className="sn-step-copy">
                <span className="sn-step-n sn-chart" aria-hidden="true">
                  {step.n}
                </span>
                <h3 className="sn-h3">{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
      <Reveal as="ul" variant="rise" className="sn-promises">
        {["Price before we start", "No upsell on food", "Same vet for follow-ups", "Home visits for the last goodbye"].map((p) => (
          <li key={p}>
            <NoseBullet />
            {p}
          </li>
        ))}
      </Reveal>
    </section>
  );
}
