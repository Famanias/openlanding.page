import type { Metadata } from "next";
import Link from "next/link";
import { WORKSHOPS } from "../content/cms";
import { MotionController } from "../motion/MotionController";
import { Footer } from "../sections/Footer";
import { Header } from "../sections/Header";
import { SubpageHeader } from "../sections/SubpageHeader";
import { PreRideChecklist } from "./PreRideChecklist";

export const metadata: Metadata = {
  title: "Fit, Care & Workshops — RADIUS",
  description:
    "Pre-ride safety checklist, comfort posture guidance, and local bicycle workshop bays for adjustments and routine care.",
  alternates: { canonical: "/templates/radius/fit-service" },
};

const FIT_FAQ = [
  {
    q: "How should my elbows and wrists sit on city bars?",
    a: "Keep a gentle bend in your elbows so sudden pavement joints don't lock directly into your shoulders.",
  },
  {
    q: "When should a shop inspect rack and basket mounts?",
    a: "Have a qualified mechanic check mount fastener torque after your first few weeks of regular cargo trips.",
  },
  {
    q: "Can I switch between City and Gravel tread on the same bike?",
    a: "Yes — consult a bicycle mechanic to confirm rim seating and tire clearance before swapping tread compounds.",
  },
];

export default function RadiusFitServicePage() {
  return (
    <>
      <a className="rd-skip" href="#main">Skip to fit and service</a>
      <MotionController />
      <Header activePage="fit" />
      <main id="main">
        <SubpageHeader
          eyebrow="04 / FIT & PRACTICAL CARE"
          title="Set it up"
          accent="right."
          lede="Practical steps before you roll out: verify tires, brakes, beam cutoff, and fasteners cleanly, or bring your bike by a local service bench."
          specs={[
            { label: "Check steps", value: "6 points" },
            { label: "Partner bays", value: "3 benches" },
            { label: "Posture guide", value: "Neutral reach" },
            { label: "Service", value: "Local mechanics" },
          ]}
        />

        <section className="rd-sub-section">
          <div className="rd-sub-shell">
            <PreRideChecklist />
          </div>
        </section>

        <section className="rd-sub-section rd-sub-section--alt">
          <div className="rd-sub-shell">
            <div className="rd-sub-head">
              <div>
                <p className="rd-kicker">SERVICE PARTNER BAYS</p>
                <h2>Independent <em>workbenches.</em></h2>
              </div>
              <Link className="rd-link" href="/templates/radius/reserve">Request local intro ↗</Link>
            </div>

            <div className="rd-grid-3">
              {WORKSHOPS.map((shop) => (
                <article key={shop.id} className="rd-cell-card">
                  <div>
                    <span className="rd-kicker">{shop.district} · {shop.bay}</span>
                    <h3 className="rd-cell-card__title">{shop.city}</h3>
                    <p className="rd-cell-card__body">{shop.focus}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rd-sub-section">
          <div className="rd-sub-shell">
            <p className="rd-kicker">COMMON FIT &amp; CARE QUESTIONS</p>
            <div className="rd-fit-questions" style={{ marginTop: 20 }}>
              {FIT_FAQ.map((row, idx) => (
                <details key={row.q} className="rd-fit-question" open={idx === 0}>
                  <summary>
                    <span>0{idx + 1}</span>
                    <strong>{row.q}</strong>
                    <b aria-hidden="true">+</b>
                  </summary>
                  <p>{row.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
