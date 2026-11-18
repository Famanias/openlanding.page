"use client";
import Link from "next/link";
import { useState } from "react";
import { CompanyMark } from "../brand/CompanyMark";
import { Prop } from "../brand/Props";
import { filterParts } from "../content/catalog";
import { companyById } from "../content/companies";
import { FIELDS, TAG_LABEL, type Field } from "../content/parts";

export function PartsCatalog() {
  const [field, setField] = useState<Field | "all">("all");
  const [query, setQuery] = useState("");
  const visible = filterParts(query, field);

  return (
    <section className="us-sub-sec" aria-labelledby="us-catalog-heading">
      <div className="us-sub-wrap">
        <div className="us-toolbar">
          <div className="us-filter-row" role="group" aria-label="Filter parts by field">
            {FIELDS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="us-chip-btn"
                aria-pressed={field === item.id}
                onClick={() => setField(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <label className="us-sr" htmlFor="us-parts-search">Search parts by role, tool, or studio</label>
          <input
            id="us-parts-search"
            className="us-search"
            type="search"
            placeholder="Filter by tool, role, or studio…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <p id="us-catalog-heading" className="us-mono" style={{ color: "var(--us-graphite)", marginBottom: 18 }}>
          Showing {visible.length} of 10 studio parts
        </p>

        {visible.length === 0 ? (
          <div className="us-week-card">
            <p className="us-card-brief" style={{ marginTop: 0 }}>No parts match “{query}”.</p>
            <div>
              <button type="button" className="us-chip-btn" onClick={() => { setField("all"); setQuery(""); }}>
                Reset filters
              </button>
            </div>
          </div>
        ) : (
          <div className="us-grid-2">
            {visible.map((part) => {
              const company = companyById(part.company);
              return (
                <article key={part.id} className="us-card-link">
                  <div>
                    <div className="us-card-head">
                      <span className="us-tag-pill">{part.field} · {part.weeks} wks</span>
                      {part.tag ? (
                        <span className={`us-tag-pill ${part.tag === "hot" ? "us-tag-pill--tape" : ""}`}>
                          {TAG_LABEL[part.tag]}
                        </span>
                      ) : null}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginTop: 14 }}>
                      <h2 className="us-card-title" style={{ marginTop: 0 }}>{part.title}</h2>
                      <Prop glyph={part.prop} className="us-card-prop" />
                    </div>
                    <p className="us-card-brief">{part.brief}</p>
                  </div>

                  <ul className="us-ship-list" aria-label="Deliverables">
                    {part.ships.map((ship, idx) => (
                      <li key={ship}>
                        <span>0{idx + 1}</span>
                        <strong>{ship}</strong>
                      </li>
                    ))}
                  </ul>

                  <div className="us-card-foot">
                    <CompanyMark company={company} />
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <Link className="us-link" href={`/templates/understudy/parts/${part.id}`}>
                        Full brief ↗
                      </Link>
                      <button
                        type="button"
                        className="us-btn us-btn--ink us-btn--sm"
                        data-us-start
                        data-us-part={part.id}
                      >
                        <span className="us-roll" data-text="Audition"><span>Audition</span></span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
