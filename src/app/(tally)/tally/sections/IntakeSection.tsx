import React from "react";
import { CounterForm } from "../forms/CounterForm";
import { Reveal } from "../motion/Reveal";

export function IntakeSection() {
  return (
    <section
      id="open-counter"
      className="tl-section tl-intake-section"
      aria-labelledby="tl-intake-heading"
    >
      <div className="tl-container tl-intake-grid">
        <div className="tl-intake-copy">
          <Reveal as="h2" variant="mask" className="tl-h2">
            <span id="tl-intake-heading" className="tl-mask-inner">
              Stamp your first claim ticket <em>in ten minutes.</em>
            </span>
          </Reveal>

          <Reveal as="p" variant="rise" delay={120} className="tl-intake-lede">
            Select your workshop archetype and deposit split to generate a live merchant trial pass.
          </Reveal>

          <Reveal as="div" variant="rise" delay={200} className="tl-intake-guarantees">
            <div className="tl-guarantee-row">
              <span className="tl-guarantee-dot" aria-hidden="true">
                01
              </span>
              <div>
                <strong>14-day free trial</strong>
                <p>Full access on a draft or live theme.</p>
              </div>
            </div>
            <div className="tl-guarantee-row">
              <span className="tl-guarantee-dot" aria-hidden="true">
                02
              </span>
              <div>
                <strong>Zero commission</strong>
                <p>Keep 100% of your labor and parts revenue.</p>
              </div>
            </div>
            <div className="tl-guarantee-row">
              <span className="tl-guarantee-dot" aria-hidden="true">
                03
              </span>
              <div>
                <strong>Free migration</strong>
                <p>We import your existing service menu for free.</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal as="div" variant="cascade" delay={140} className="tl-intake-form-col">
          <CounterForm />
        </Reveal>
      </div>
    </section>
  );
}
