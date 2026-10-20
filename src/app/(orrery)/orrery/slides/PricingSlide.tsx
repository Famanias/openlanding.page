import { Check } from "@phosphor-icons/react";
import { Eyebrow, rv } from "./Eyebrow";

const TIERS = [
  {
    name: "Starter",
    price: "$49",
    unit: "per month",
    blurb: "For one team trying its first multi-agent workflow.",
    features: ["Up to 3 agents", "One shared memory", "7-day hand-off history"],
    featured: false,
  },
  {
    name: "Team",
    price: "$390",
    unit: "per month",
    blurb: "For teams running agents on real work, every day.",
    features: ["Up to 25 agents", "Approval gates", "Full audit log", "Priority support"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "annual agreement",
    blurb: "For organisations with security and residency requirements.",
    features: ["Unlimited agents", "SSO and SCIM", "Private deployment", "Named engineer"],
    featured: false,
  },
];

export function PricingSlide() {
  return (
    <div className="orr-slide-inner orr-pricing">
      <Eyebrow n={8}>Pricing</Eyebrow>
      <h2 className="orr-h2 orr-pricing__title orr-reveal" style={rv(1)}>
        Priced by the team, <em>not the token.</em>
      </h2>
      <ul className="orr-tiers">
        {TIERS.map((t, i) => (
          <li key={t.name} className="orr-tier orr-reveal" data-featured={t.featured ? "" : undefined} style={rv(i + 2)}>
            <div className="orr-tier__head">
              <h3 className="orr-label">{t.name}</h3>
              {t.featured ? <span className="orr-tier__badge orr-label">Most teams</span> : null}
            </div>
            <p className="orr-tier__price">
              {t.price} <span className="orr-label">{t.unit}</span>
            </p>
            <p className="orr-tier__blurb">{t.blurb}</p>
            <ul className="orr-tier__features">
              {t.features.map((f) => (
                <li key={f}>
                  <Check size={14} weight="bold" aria-hidden /> {f}
                </li>
              ))}
            </ul>
            <a className={t.featured ? "orr-btn orr-btn--solid" : "orr-btn"} href="#cta">
              {t.price === "Custom" ? "Talk to us" : "Start with " + t.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
