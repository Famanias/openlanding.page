"use client";
import { useState, type CSSProperties } from "react";
import { CUTS, priceFor, type Cadence } from "../content/copy";
import { MaskLine, Reveal } from "../motion/Reveal";
import { goto } from "../motion/SmoothScroll";

const CADENCES: { id: Cadence; label: string }[] = [
  { id: "monthly", label: "Monthly" },
  { id: "annual", label: "Yearly · save 20%" },
];

/** Chapter 06: pricing as three cuts. A cadence switch with a sliding glass pill; prices roll on change. */
export function Pricing() {
  const [cadence, setCadence] = useState<Cadence>("monthly");
  const at = CADENCES.findIndex((c) => c.id === cadence);
  return (
    <section className="fc-price" id="pricing" aria-labelledby="fc-price-title">
      <div className="fc-wrap">
        <header className="fc-head fc-head--center">
          <Reveal as="p" variant="slide" className="fc-eyebrow">Chapter 06 · The cuts</Reveal>
          <h2 id="fc-price-title" className="fc-h2">
            <MaskLine>Pay for the seat,</MaskLine> <MaskLine index={1}>not the render.</MaskLine>
          </h2>
          <div className="fc-toggle" role="radiogroup" aria-label="Billing" style={{ "--at": at } as CSSProperties}>
            <span className="fc-toggle__pill" aria-hidden="true" />
            {CADENCES.map((c) => (
              <button key={c.id} type="button" role="radio" aria-checked={cadence === c.id} className="fc-toggle__opt" onClick={() => setCadence(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
        </header>
        <div className="fc-cuts">
          {CUTS.map((cut, i) => {
            const price = priceFor(cut, cadence);
            return (
              <Reveal as="article" key={cut.id} variant="scale" index={i} className="fc-cut" id={`fc-cut-${cut.id}`}>
                <div className="fc-cut__in" data-featured={cut.featured || undefined}>
                  {cut.featured ? <p className="fc-cut__flag">Most seats</p> : null}
                  <h3 className="fc-cut__name">{cut.name}</h3>
                  <p className="fc-cut__blurb">{cut.blurb}</p>
                  <p className="fc-cut__price">
                    {price === null ? (
                      <span className="fc-cut__amount" key="custom">Custom</span>
                    ) : (
                      <>
                        <span className="fc-cut__amount" key={`${cut.id}-${cadence}`}>${price}</span>
                        <span className="fc-cut__per">{price === 0 ? "forever" : cadence === "annual" ? "per seat / mo, billed yearly" : "per seat / month"}</span>
                      </>
                    )}
                  </p>
                  <ul className="fc-cut__list">
                    {cut.features.map((f) => (
                      <li key={f}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" /></svg>{f}</li>
                    ))}
                  </ul>
                  <a href="#open" className={`fc-btn ${cut.featured ? "fc-btn--ink" : "fc-btn--ghost"}`}
                    onClick={(e) => { e.preventDefault(); goto("open"); }}>
                    <span className="fc-btn__label" data-text={cut.cta}><span>{cut.cta}</span></span>
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
