"use client";

import { useState } from "react";
import { CARE_PLANS, formatEuro, planPrice, type Cycle } from "../content/plans";
import { sendNeed } from "../forms/brief-events";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { TiltCard } from "../motion/TiltCard";

/** After launch: three monthly care plans, toggled between monthly and annual billing. */
export function CarePlans() {
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <section id="plans" className="fx-section fx-plans" aria-labelledby="fx-plans-title">
      <div className="fx-container">
        <Reveal className="fx-section-head fx-section-head--row" kind="rise">
          <div>
            <p className="fx-eyebrow"><span>Care plans</span><span>After the sign flips</span></p>
            <h2 id="fx-plans-title"><SplitText>{"Keep it as fast\nas launch day."}</SplitText></h2>
          </div>
          <div className="fx-cycle" role="group" aria-label="Billing" data-cycle={cycle}>
            <span className="fx-cycle__thumb" aria-hidden="true" />
            <button type="button" aria-pressed={cycle === "monthly"} onClick={() => setCycle("monthly")}>Monthly</button>
            <button type="button" aria-pressed={cycle === "annual"} onClick={() => setCycle("annual")}>Annual <span className="fx-cycle__save">−2 mo</span></button>
          </div>
        </Reveal>

        <ul className="fx-plans__list">
          {CARE_PLANS.map((plan, index) => {
            const price = planPrice(plan, cycle);
            return (
              <Reveal as="li" key={plan.id} kind="scale" index={index}>
                <TiltCard className="fx-plan" max={3}>
                  <div className="fx-plan__inner" data-featured={plan.featured ? "true" : undefined}>
                    <div className="fx-plan__top">
                      <span className="fx-mono fx-plan__code">FX-C0{index + 1}</span>
                      {plan.featured ? <span className="fx-mono fx-plan__badge">Most fitted</span> : null}
                    </div>
                    <h3 className="fx-plan__name">{plan.name}</h3>
                    <p className="fx-plan__pitch">{plan.pitch}</p>
                    <p className="fx-plan__price">
                      <span className="fx-plan__amount" key={`${plan.id}-${cycle}`}>{formatEuro(price)}</span>
                      <span className="fx-plan__per">/ month</span>
                    </p>
                    <p className="fx-plan__billed fx-mono">{cycle === "annual" ? `Billed ${formatEuro(price * 12)} yearly` : "Billed monthly · cancel with 30 days"}</p>
                    <ul className="fx-plan__includes">
                      <li className="fx-mono">{plan.hours}</li>
                      {plan.includes.map((line) => <li key={line}>{line}</li>)}
                    </ul>
                    <a className={`fx-button ${plan.featured ? "fx-button--primary" : "fx-button--ghost"} fx-plan__cta`} href="#book" onClick={() => sendNeed("open", true)}>
                      <span className="fx-button__fill" aria-hidden="true" />
                      <span className="fx-button__roll"><span>Choose {plan.name}</span><span aria-hidden="true">Choose {plan.name}</span></span>
                    </a>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
