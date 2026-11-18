import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompanyMark } from "../../brand/CompanyMark";
import { Prop } from "../../brand/Props";
import { getAdjacentParts, getPartSyllabus } from "../../content/catalog";
import { PARTS } from "../../content/parts";
import { Dock } from "../../dock/Dock";
import { Finale } from "../../sections/Finale";
import { SubpageHeader } from "../../sections/SubpageHeader";
import { TopBar } from "../../sections/TopBar";
import { ScrollDirector } from "../../stage/ScrollDirector";

type PartPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return PARTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PartPageProps): Promise<Metadata> {
  const { id } = await params;
  const detail = getPartSyllabus(id);
  if (!detail) return {};
  return {
    title: `${detail.part.title} at ${detail.company.name} — Understudy`,
    description: `${detail.part.brief} ${detail.part.weeks}-week studio run with ${detail.part.tools.join(", ")}.`,
    alternates: { canonical: `/templates/understudy/parts/${detail.part.id}` },
  };
}

export default async function UnderstudyPartDetailPage({ params }: PartPageProps) {
  const { id } = await params;
  const detail = getPartSyllabus(id);
  if (!detail) notFound();
  const adjacent = getAdjacentParts(detail.part.id);

  return (
    <>
      <a className="us-skip" href="#main">Skip to part syllabus</a>
      <TopBar activePage="parts" />
      <main id="main" className="us-sub-main">
        <SubpageHeader
          crumbLabel="All 10 parts"
          crumbHref="/templates/understudy/parts"
          eyebrow={`${detail.part.field} · ${detail.company.name}`}
          title={detail.part.title}
          accent={`(${detail.part.weeks}w)`}
          lede={detail.part.brief}
          stats={[
            { label: "Studio set", value: detail.company.name },
            { label: "Run length", value: `${detail.part.weeks} weeks` },
            { label: "Cast size", value: `${detail.castSize} roles` },
            { label: "Pace", value: `${detail.weeklyHours}h / week` },
          ]}
        />

        <section className="us-sub-sec">
          <div className="us-sub-wrap us-detail-grid">
            <div className="us-syllabus">
              <p className="us-eyebrow">Four-stage rehearsal syllabus</p>
              {detail.syllabus.map((step) => (
                <article key={step.week} className="us-week-card">
                  <span className="us-mono" style={{ color: "var(--us-cue)" }}>{step.week}</span>
                  <h2 style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>{step.phase}</h2>
                  <p style={{ fontSize: 15 }}>{step.deliverable}</p>
                  <p className="us-director-note">Director note: “{step.directorNote}”</p>
                </article>
              ))}
            </div>

            <aside className="us-aside-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <CompanyMark company={detail.company} />
                <Prop glyph={detail.part.prop} className="us-card-prop" />
              </div>

              <div>
                <p className="us-mono" style={{ color: "var(--us-cue-light)" }}>What ships to your reel</p>
                <ul style={{ marginTop: 10, display: "grid", gap: 8 }}>
                  {detail.part.ships.map((s) => (
                    <li key={s} style={{ fontSize: 14.5 }}>· {s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="us-mono" style={{ color: "var(--us-cue-light)" }}>Cast around the table</p>
                <div className="us-filter-row" style={{ marginTop: 10 }}>
                  {detail.castRoles.map((role) => (
                    <span key={role} className="us-chip-btn" style={{ minHeight: 32, padding: "0 12px", fontSize: 12 }}>
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <p style={{ fontSize: 14, color: "var(--us-cue-light)" }}>{detail.directorSummary}</p>

              <button
                type="button"
                className="us-btn us-btn--cue us-btn--big"
                data-us-start
                data-us-part={detail.part.id}
              >
                <span className="us-roll" data-text="Rehearse this part"><span>Rehearse this part</span></span>
              </button>
            </aside>
          </div>

          {adjacent ? (
            <div className="us-sub-wrap" style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--us-line)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <Link className="us-link" href={`/templates/understudy/parts/${adjacent.prev.id}`}>
                ← Previous: {adjacent.prev.title}
              </Link>
              <Link className="us-link" href={`/templates/understudy/parts/${adjacent.next.id}`}>
                Next: {adjacent.next.title} →
              </Link>
            </div>
          ) : null}
        </section>
      </main>
      <Finale />
      <Dock />
      <ScrollDirector />
    </>
  );
}
