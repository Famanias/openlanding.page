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
          <Reveal as="div" variant="draw" className="tl-eyebrow-row">
            <span className="tl-eyebrow-rule" aria-hidden="true" />
            <span className="tl-mono">§ VI · OPEN YOUR SERVICE COUNTER</span>
          </Reveal>

          <Reveal as="h2" variant="mask" className="tl-h2">
            <span id="tl-intake-heading" className="tl-mask-inner">
              Stamp your first claim ticket <em>in ten minutes.</em>
            </span>
          </Reveal>

          <Reveal as="p" variant="rise" delay={120} className="tl-intake-lede">
            Configure your workshop archetype and deposit percentage on the right to issue a local Merchant Trial Pass—complete with your starter service SKU structure and POS bench settings.
          </Reveal>

          <Reveal as="div" variant="rise" delay={200} className="tl-intake-guarantees">
            <div className="tl-guarantee-row">
              <span className="tl-guarantee-dot" aria-hidden="true">
                01
              </span>
              <div>
                <strong>14-day full bench trial</strong>
                <p>Test online slot booking, partial deposits, and POS ticket printing on a draft theme first.</p>
              </div>
            </div>
            <div className="tl-guarantee-row">
              <span className="tl-guarantee-dot" aria-hidden="true">
                02
              </span>
              <div>
                <strong>Zero per-ticket commission</strong>
                <p>Keep 100% of your service labor and repair parts margin—pay only your flat monthly counter tier.</p>
              </div>
            </div>
            <div className="tl-guarantee-row">
              <span className="tl-guarantee-dot" aria-hidden="true">
                03
              </span>
              <div>
                <strong>Free counter migration</strong>
                <p>Moving from paper tags, Calendly, or spreadsheets? Our team imports your service menu for free.</p>
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
