import type { Metadata } from "next";
import Link from "next/link";
import { Dock } from "../dock/Dock";
import { Finale } from "../sections/Finale";
import { SubpageHeader } from "../sections/SubpageHeader";
import { TopBar } from "../sections/TopBar";
import { ScrollDirector } from "../stage/ScrollDirector";

export const metadata: Metadata = {
  title: "Opening Night & Tuition — Understudy",
  description:
    "Your first week on stage is free. Transparent $89/month studio agreement with zero long-term lock-in.",
  alternates: { canonical: "/templates/understudy/tuition" },
};

const TERMS = [
  { label: "Opening Night", value: "$0", note: "First 7 days of your first part free. Read the brief, meet your cast, turn in draft one." },
  { label: "Studio Tuition", value: "$89 / mo", note: "Covers your seat, director line notes, weekly table reads, and hosted reel." },
  { label: "Contract Lock-in", value: "None", note: "Stop cleanly between runs or pause before Opening Night wraps." },
];

export default function UnderstudyTuitionPage() {
  return (
    <>
      <a className="us-skip" href="#main">Skip to tuition terms</a>
      <TopBar activePage="tuition" />
      <main id="main" className="us-sub-main">
        <SubpageHeader
          eyebrow="Tuition · Studio Agreement"
          title="Built to get you"
          accent="cast."
          lede="No income-share agreements, no five-figure tuition deposits. Start on Opening Night free for seven days, then keep your seat for $89 a month."
          stats={[
            { label: "Opening week", value: "$0" },
            { label: "Monthly rate", value: "$89 / mo" },
            { label: "Weekly effort", value: "10 hours" },
            { label: "Notice period", value: "Pause anytime" },
          ]}
        />

        <section className="us-sub-sec">
          <div className="us-sub-wrap us-grid-3">
            {TERMS.map((item) => (
              <article key={item.label} className="us-card-link">
                <div>
                  <span className="us-mono" style={{ color: "var(--us-cue)" }}>{item.label}</span>
                  <h2 className="us-card-title" style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}>{item.value}</h2>
                  <p className="us-card-brief">{item.note}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="us-sub-wrap us-aside-card" style={{ marginTop: 28 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
              <div style={{ maxWidth: 620 }}>
                <span className="us-mono" style={{ color: "var(--us-tape)" }}>Weekly Call Time · Weekdays 09:00 / Async Friendly</span>
                <h2 className="us-card-title" style={{ color: "var(--us-house)", marginTop: 8 }}>
                  Take the first week free before spending a dollar.
                </h2>
                <p style={{ color: "var(--us-cue-light)", marginTop: 8 }}>
                  Leave with a reviewed first deliverable even if you step off before billing begins.
                </p>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button type="button" className="us-btn us-btn--cue us-btn--big" data-us-start>
                  <span className="us-roll" data-text="Book call time"><span>Book call time</span></span>
                </button>
                <Link className="us-chip-btn" href="/templates/understudy/parts">
                  Browse 10 parts →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Finale />
      <Dock />
      <ScrollDirector />
    </>
  );
}
