import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Picture } from "../../assets";
import { FIELD_NOTES, getAdjacentNotes, getFieldNote } from "../../content/cms";
import { MotionController } from "../../motion/MotionController";
import { Footer } from "../../sections/Footer";
import { Header } from "../../sections/Header";
import { SubpageHeader } from "../../sections/SubpageHeader";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return FIELD_NOTES.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) return {};
  return {
    title: `${note.title} — RADIUS Field Notes`,
    description: note.excerpt,
    alternates: { canonical: `/templates/radius/journal/${note.slug}` },
  };
}

export default async function RadiusNoteDetailPage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) notFound();
  const adjacent = getAdjacentNotes(note.slug);

  return (
    <>
      <a className="rd-skip" href="#main">Skip to field note</a>
      <MotionController />
      <Header activePage="journal" />
      <main id="main">
        <SubpageHeader
          crumbLabel="All field notes"
          crumbHref="/templates/radius/journal"
          eyebrow={`${note.number} · ${note.category}`}
          title={note.title}
          lede={note.excerpt}
          specs={[
            { label: "Dispatch", value: note.number },
            { label: "Track", value: note.category },
            { label: "Length", value: note.readTime },
            { label: "Route log", value: note.routeTag },
          ]}
        />

        <section className="rd-sub-section">
          <div className="rd-sub-shell rd-article">
            <figure style={{ margin: 0, border: "1px solid var(--rd-ink)", overflow: "hidden" }}>
              <Picture assetKey={note.assetKey} alt={note.alt} sizes="(min-width: 900px) 820px, 100vw" priority />
              <figcaption className="rd-kicker" style={{ padding: "12px 16px", borderTop: "1px solid var(--rd-ink)" }}>
                {note.dateLabel} — {note.routeTag}
              </figcaption>
            </figure>

            <blockquote className="rd-article__quote">“{note.pullQuote}”</blockquote>

            {note.body.map((para) => (
              <p key={para}>{para}</p>
            ))}

            <div style={{ border: "1px solid var(--rd-ink)", padding: "24px 28px", background: "var(--rd-paper)" }}>
              <span className="rd-kicker">FIELD TAKEAWAYS</span>
              <ul style={{ margin: "14px 0 0", paddingLeft: 18, display: "grid", gap: 10 }}>
                {note.takeaways.map((item) => (
                  <li key={item} style={{ fontSize: 15, lineHeight: 1.5 }}>{item}</li>
                ))}
              </ul>
            </div>

            {adjacent ? (
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, paddingTop: 20, borderTop: "1px solid var(--rd-ink)" }}>
                <Link className="rd-link" href={`/templates/radius/journal/${adjacent.prev.slug}`}>
                  ← {adjacent.prev.number}: {adjacent.prev.title}
                </Link>
                <Link className="rd-link" href={`/templates/radius/journal/${adjacent.next.slug}`}>
                  {adjacent.next.number}: {adjacent.next.title} →
                </Link>
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
