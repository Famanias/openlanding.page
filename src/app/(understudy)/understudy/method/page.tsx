import type { Metadata } from "next";
import Link from "next/link";
import { Dock } from "../dock/Dock";
import { Finale } from "../sections/Finale";
import { SubpageHeader } from "../sections/SubpageHeader";
import { TopBar } from "../sections/TopBar";
import { ScrollDirector } from "../stage/ScrollDirector";
import { MethodFaq } from "./MethodFaq";

export const metadata: Metadata = {
  title: "The Four-Act Method & FAQ — Understudy",
  description:
    "How an Understudy run works from table read to signed-off reel: the lot, the cast, director notes, and weekly call-time rhythm.",
  alternates: { canonical: "/templates/understudy/method" },
};

const ACTS = [
  {
    no: "Act I",
    name: "The Lot",
    summary: "Real simulated repos, Figma systems, analytics schemas, and operational playbooks waiting on day one.",
    detail: "No contrived toy prompts — you step onto an existing product codebase or backlog with messy constraints already in place.",
  },
  {
    no: "Act II",
    name: "The Cast",
    summary: "A four-to-six person cross-functional cast working the same sprint from different chairs.",
    detail: "Design hands off specs to Engineering; Product aligns tradeoffs with Data and Growth before the Friday critique.",
  },
  {
    no: "Act III",
    name: "The Notes",
    summary: "Principal-level directors leave timestamped line notes on every draft.",
    detail: "Notes focus on clarity, product judgement, and execution speed rather than grades or quizzes.",
  },
  {
    no: "Act IV",
    name: "The Reel",
    summary: "Signed-off case artifacts packaged for hiring teams.",
    detail: "Every shipped brief becomes an inspectable work sample that 3,400+ partner studios can open directly.",
  },
];

export default function UnderstudyMethodPage() {
  return (
    <>
      <a className="us-skip" href="#main">Skip to method</a>
      <TopBar activePage="method" />
      <main id="main" className="us-sub-main">
        <SubpageHeader
          eyebrow="Curriculum · Four-Act Method"
          title="Learn the part by"
          accent="playing it."
          lede="Lectures teach vocabulary. A live studio run teaches judgment: scoping ambiguous briefs, defending tradeoffs to a director, and shipping with peers."
          stats={[
            { label: "Structure", value: "4 Acts" },
            { label: "Critiques", value: "Weekly" },
            { label: "Async SLA", value: "< 24 hrs" },
            { label: "Callback rate", value: "62%" },
          ]}
        />

        <section className="us-sub-sec">
          <div className="us-sub-wrap us-grid-2">
            {ACTS.map((act) => (
              <article key={act.no} className="us-week-card">
                <span className="us-mono" style={{ color: "var(--us-cue)" }}>{act.no}</span>
                <h2 className="us-card-title" style={{ marginTop: 4 }}>{act.name}</h2>
                <p style={{ fontSize: 16 }}>{act.summary}</p>
                <p className="us-card-brief">{act.detail}</p>
              </article>
            ))}
          </div>

          <div className="us-sub-wrap" style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link className="us-btn us-btn--ink" href="/templates/understudy/parts">
              <span className="us-roll" data-text="Explore all 10 parts"><span>Explore all 10 parts</span></span>
            </Link>
            <button type="button" className="us-btn us-btn--cue" data-us-start>
              <span className="us-roll" data-text="Book Opening Night"><span>Book Opening Night</span></span>
            </button>
          </div>
        </section>

        <MethodFaq />
      </main>
      <Finale />
      <Dock />
      <ScrollDirector />
    </>
  );
}
