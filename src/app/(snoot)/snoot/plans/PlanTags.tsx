"use client";
import { useState, type CSSProperties } from "react";
import { NoseBullet } from "../brand/Logo";
import { MAX_PETS, PLANS, quote, type Billing, type PlanId } from "./plans";

/**
 * Plans as collar tags. A billing switch (one sliding knob) and a pets stepper re-price all three tags;
 * the price rolls in on change (keyed span). Each tag hangs from a ring and swings on hover; "What's in it"
 * flips the tag over in 3D to show the list.
 */
export function PlanTags() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [pets, setPets] = useState(1);
  const [flipped, setFlipped] = useState<PlanId | null>(null);

  return (
    <div className="sn-plans-ui">
      <div className="sn-plans-controls">
        <div className="sn-switch" role="radiogroup" aria-label="Billing" data-billing={billing}>
          <span className="sn-switch-knob" aria-hidden="true" />
          {(["monthly", "yearly"] as const).map((b) => (
            <button key={b} type="button" role="radio" aria-checked={billing === b} onClick={() => setBilling(b)} data-sn-billing={b}>
              {b === "monthly" ? "Monthly" : "Yearly · 2 months free"}
            </button>
          ))}
        </div>
        <div className="sn-stepper" role="group" aria-label="Pets in your household">
          <button type="button" onClick={() => setPets((p) => Math.max(1, p - 1))} disabled={pets <= 1} aria-label="One fewer pet">
            −
          </button>
          <output aria-live="polite" data-sn-pets>
            <span key={pets} className="sn-roll">
              {pets}
            </span>{" "}
            {pets === 1 ? "pet" : "pets"}
          </output>
          <button type="button" onClick={() => setPets((p) => Math.min(MAX_PETS, p + 1))} disabled={pets >= MAX_PETS} aria-label="One more pet">
            +
          </button>
        </div>
      </div>

      <ul className="sn-tags">
        {PLANS.map((plan, i) => {
          const q = quote(plan.id, pets, billing);
          const isFlipped = flipped === plan.id;
          return (
            <li key={plan.id} className="sn-tag-hang" style={{ "--i": i } as CSSProperties} data-plan={plan.id}>
              <span className="sn-tag-ring" aria-hidden="true" />
              <article className="sn-tag" data-flipped={isFlipped} aria-label={`${plan.name} plan`}>
                <div className="sn-tag-face sn-tag-front" inert={isFlipped}>
                  <span className="sn-tag-hole" aria-hidden="true" />
                  <p className="sn-chart sn-tag-who">{plan.who}</p>
                  <h3 className="sn-tag-name">{plan.name}</h3>
                  <p className="sn-tag-price" data-sn-price={plan.id}>
                    <span key={`${q.perMonth}-${billing}`} className="sn-roll">
                      £{q.perMonth}
                    </span>
                    <small>/month</small>
                  </p>
                  <p className="sn-chart sn-tag-note">
                    {billing === "yearly" ? `£${q.dueNow} a year` : "Cancel any month"}
                    {q.saving > 0 ? ` · save £${q.saving}` : ""}
                  </p>
                  <button type="button" className="sn-tag-flip" onClick={() => setFlipped(plan.id)} aria-label={`What's in ${plan.name}`}>
                    What&apos;s in it
                  </button>
                </div>
                <div className="sn-tag-face sn-tag-back" inert={!isFlipped}>
                  <span className="sn-tag-hole" aria-hidden="true" />
                  <h3 className="sn-tag-name">{plan.name}</h3>
                  <ul>
                    {plan.includes.map((item) => (
                      <li key={item}>
                        <NoseBullet />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="sn-tag-flip" onClick={() => setFlipped(null)} aria-label={`Back to ${plan.name} price`}>
                    Flip back
                  </button>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
