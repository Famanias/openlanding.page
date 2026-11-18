"use client";
import Link from "next/link";
import { useState } from "react";
import { Picture } from "../assets";
import { filterFieldNotes, type NoteCategory } from "../content/cms";

const CATS: { id: NoteCategory | "all"; label: string }[] = [
  { id: "all", label: "All notes (6)" },
  { id: "routes", label: "Routes" },
  { id: "craft", label: "Craft" },
  { id: "care", label: "Care" },
];

export function JournalFeed() {
  const [category, setCategory] = useState<NoteCategory | "all">("all");
  const [query, setQuery] = useState("");
  const visible = filterFieldNotes(category, query);

  return (
    <section className="rd-sub-section">
      <div className="rd-sub-shell">
        <div className="rd-sub-toolbar">
          <div className="rd-tabs-row" role="group" aria-label="Filter field notes by category">
            {CATS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className="rd-tab-btn"
                aria-pressed={category === cat.id}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div>
            <label className="rd-sr" htmlFor="rd-journal-search">Search field notes</label>
            <input
              id="rd-journal-search"
              className="rd-sub-search"
              type="search"
              placeholder="Search routes, grommet, basket…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <p className="rd-kicker" style={{ marginBottom: 18 }}>
          CMS COLLECTION · SHOWING {visible.length} OF 6 DISPATCHES
        </p>

        {visible.length === 0 ? (
          <div className="rd-cell-card" style={{ borderTop: "1px solid var(--rd-ink)", borderLeft: "1px solid var(--rd-ink)" }}>
            <p className="rd-cell-card__body">No dispatches match “{query}”.</p>
            <div>
              <button type="button" className="rd-tab-btn" onClick={() => { setCategory("all"); setQuery(""); }}>
                Reset filter
              </button>
            </div>
          </div>
        ) : (
          <div className="rd-grid-3">
            {visible.map((note) => (
              <article key={note.slug} className="rd-cell-card">
                <div>
                  <div className="rd-cell-card__media">
                    <Picture assetKey={note.assetKey} alt={note.alt} sizes="(min-width: 900px) 30vw, 100vw" />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
                    <span className="rd-kicker">{note.number}</span>
                    <span className="rd-kicker">{note.readTime}</span>
                  </div>
                  <h2 className="rd-cell-card__title">{note.title}</h2>
                  <p className="rd-cell-card__body">{note.excerpt}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid color-mix(in srgb, var(--rd-ink) 20%, transparent)" }}>
                  <span className="rd-kicker">{note.category}</span>
                  <Link className="rd-link" href={`/templates/radius/journal/${note.slug}`}>
                    Read note ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
