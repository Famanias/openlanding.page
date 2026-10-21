"use client";

import { LOTS } from "../content/lots";
import { Picture } from "../assets";
import { Eyebrow } from "./Eyebrow";
import { useReveal } from "./useReveal";

function LotCard({ lot }: { lot: (typeof LOTS)[number] }) {
  const { ref, shown } = useReveal<HTMLLIElement>();

  return (
    <li ref={ref} className="sd-lot sd-reveal" data-shown={shown}>
      <div className="sd-lot__head">
        <span className="sd-mono" style={{ color: "var(--color-husk)" }}>
          {lot.code}
        </span>
        <span
          className="sd-bean"
          style={{ width: 26, height: 34, background: "var(--color-espresso)" }}
          aria-hidden="true"
        />
      </div>
      <h3 className="sd-display" style={{ fontSize: "clamp(24px, 2.6vw, 32px)", margin: "10px 0 4px" }}>
        {lot.name}
      </h3>
      <p className="sd-mono" style={{ color: "var(--color-husk)", margin: "0 0 16px" }}>
        {lot.country} · {lot.region} · {lot.process} · {lot.altitude}
      </p>
      <ul className="sd-lot__notes" aria-label="Tasting notes">
        {lot.notes.map((note) => (
          <li key={note} className="sd-chip">
            {note}
          </li>
        ))}
      </ul>
      <p style={{ margin: "16px 0 0", color: "var(--color-husk)", fontSize: "0.95rem" }}>{lot.story}</p>
      <div className="sd-lot__foot">
        <div>
          <span className="sd-readout__value" style={{ fontSize: "2rem", color: "var(--color-espresso)" }}>
            {lot.cuppingScore.toFixed(1)}
          </span>
          <span className="sd-mono" style={{ color: "var(--color-husk)", marginLeft: 8 }}>
            cupped · {lot.roastLevel.split(" — ")[0]} roast
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="sd-mono">${lot.priceUsd} / {lot.bagG} g</span>
          <a href="#subscribe" className="sd-btn sd-btn--espresso" style={{ minHeight: 42 }}>
            Order
          </a>
        </div>
      </div>
    </li>
  );
}

export function Lots() {
  const { ref, shown } = useReveal<HTMLElement>();

  return (
    <section id="lots" ref={ref} className="sd-section sd-chartgrid">
      <div className="sd-wrap">
        <div className="sd-chapter__head sd-reveal" data-shown={shown}>
          <div>
            <Eyebrow>§ 03 — This week&apos;s lots</Eyebrow>
            <h2 className="sd-display" style={{ fontSize: "clamp(34px, 5vw, 64px)", margin: "0 0 12px", maxWidth: "20ch" }}>
              Four lots. Each one with its curve printed on the bag.
            </h2>
            <p style={{ maxWidth: "56ch", color: "var(--color-husk)", margin: "0 0 40px" }}>
              We roast to the bean, not to a colour chip. Every bag carries the batch&apos;s
              actual log — charge temperature, first crack, drop, development.
            </p>
          </div>
          <figure className="sd-photo sd-photo--11 sd-chapter__media">
            <Picture
              assetKey="lot-kraft-bag"
              alt="A 340 g kraft coffee bag with a blank tangerine label, standing on a pale oat counter beside scattered beans"
              sizes="(min-width: 900px) 30vw, 100vw"
            />
          </figure>
        </div>
        <ul className="sd-lots">
          {LOTS.map((lot) => (
            <LotCard key={lot.code} lot={lot} />
          ))}
        </ul>
      </div>
    </section>
  );
}
