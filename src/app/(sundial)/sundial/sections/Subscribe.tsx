"use client";

import { PLANS, pricePerBagUsd } from "../content/plans";
import { Eyebrow } from "./Eyebrow";
import { useReveal } from "./useReveal";

function PlanCard({ plan }: { plan: (typeof PLANS)[number] }) {
  const { ref, shown } = useReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className="sd-plan sd-reveal"
      data-shown={shown}
      data-featured={plan.featured}
    >
      <p className="sd-mono" style={{ color: plan.featured ? "var(--color-espresso)" : "var(--color-husk)", margin: "0 0 12px" }}>
        {plan.cadence} · {plan.bagsPerDelivery} × {plan.bagG} g
        {plan.featured && (
          <span className="sd-plan__badge">Most ordered</span>
        )}
      </p>
      <h3 className="sd-display" style={{ fontSize: "clamp(26px, 3vw, 38px)", margin: "0 0 6px" }}>
        {plan.name}
      </h3>
      <p className="sd-plan__price">
        <span className="sd-readout__value" style={{ fontSize: "clamp(38px, 5vw, 58px)", color: "inherit" }}>
          ${plan.priceUsd}
        </span>
        <span className="sd-mono" style={{ marginLeft: 6 }}>/ delivery</span>
      </p>
      <p className="sd-mono" style={{ color: "var(--color-husk)", margin: "-10px 0 0" }}>
        ${pricePerBagUsd(plan)} a bag
      </p>
      <ul className="sd-plan__perks">
        {plan.perks.map((perk) => (
          <li key={perk}>{perk}</li>
        ))}
      </ul>
      <a
        href="#wholesale"
        className={`sd-btn ${plan.featured ? "sd-btn--tangerine" : "sd-btn--outline"}`}
        style={{ width: "100%" }}
      >
        Start {plan.name.toLowerCase()}
      </a>
    </li>
  );
}

export function Subscribe() {
  const { ref, shown } = useReveal<HTMLElement>();

  return (
    <section id="subscribe" ref={ref} className="sd-section sd-chartgrid">
      <div className="sd-wrap">
        <div className="sd-reveal" data-shown={shown}>
          <Eyebrow>§ 05 — Subscriptions</Eyebrow>
          <h2 className="sd-display" style={{ fontSize: "clamp(34px, 5vw, 64px)", margin: "0 0 12px", maxWidth: "20ch" }}>
            Fresh is a schedule, not a promise.
          </h2>
          <p style={{ maxWidth: "54ch", color: "var(--color-husk)", margin: "0 0 40px" }}>
            Bags leave the roastery the same afternoon they drop. Skip, swap or cancel
            from any bag&apos;s curve card.
          </p>
        </div>
        <ul className="sd-plans">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </ul>
      </div>
    </section>
  );
}
