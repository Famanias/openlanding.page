import type { Metadata } from "next";
import Link from "next/link";
import { InterestForm } from "../experience/ExperienceControls";
import { MotionController } from "../motion/MotionController";
import { Footer } from "../sections/Footer";
import { Header } from "../sections/Header";
import { SubpageHeader } from "../sections/SubpageHeader";

export const metadata: Metadata = {
  title: "Reserve & Interest Preview — RADIUS",
  description:
    "Try the local-only RADIUS interest preview form. Nothing is sent, saved, or committed.",
  alternates: { canonical: "/templates/radius/reserve" },
};

export default function RadiusReservePage() {
  return (
    <>
      <a className="rd-skip" href="#main">Skip to reservation preview</a>
      <MotionController />
      <Header activePage="reserve" />
      <main id="main">
        <SubpageHeader
          tone="ink"
          eyebrow="05 / INTEREST PREVIEW"
          title="Ready when"
          accent="you are."
          lede="Try how a rider interest handoff feels after configuring a frame finish, tire profile, and carry setup. Local demo only — nothing is transmitted or saved."
          specs={[
            { label: "Form mode", value: "Local demo" },
            { label: "Finishes", value: "3 options" },
            { label: "Data sent", value: "None" },
            { label: "Next step", value: "Builder / Preview" },
          ]}
        />

        <section className="rd-sub-section">
          <div className="rd-sub-shell rd-grid-2" style={{ alignItems: "start" }}>
            <div style={{ display: "grid", gap: 18 }}>
              <span className="rd-kicker">BEFORE SUBMITTING THIS DEMO</span>
              <h2 style={{ margin: 0, font: "italic 900 clamp(32px, 4vw, 52px)/.92 var(--rd-display)", textTransform: "uppercase" }}>
                Honest validation, <em>zero backend.</em>
              </h2>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65 }}>
                Validation checks required name and email formatting inline before revealing an accessible local confirmation state.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", paddingTop: 8 }}>
                <Link className="rd-button" href="/templates/radius#build">
                  <span>Back to builder</span>
                  <b aria-hidden="true">↗</b>
                </Link>
                <Link className="rd-link" href="/templates/radius/fit-service" style={{ alignSelf: "center" }}>
                  Review pre-ride checklist ↗
                </Link>
              </div>
            </div>
            <InterestForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
