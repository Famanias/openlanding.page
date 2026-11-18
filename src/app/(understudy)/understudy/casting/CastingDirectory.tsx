"use client";
import Link from "next/link";
import { useState } from "react";
import { CompanyMark } from "../brand/CompanyMark";
import { getCompanyProfiles, getCompanySectors } from "../content/catalog";
import { PARTS } from "../content/parts";

export function CastingDirectory() {
  const sectors = getCompanySectors();
  const [sector, setSector] = useState("all");
  const visible = getCompanyProfiles(sector);

  return (
    <section className="us-sub-sec">
      <div className="us-sub-wrap">
        <div className="us-toolbar">
          <div className="us-filter-row" role="group" aria-label="Filter companies by sector">
            <button type="button" className="us-chip-btn" aria-pressed={sector === "all"} onClick={() => setSector("all")}>
              All ({getCompanyProfiles("all").length})
            </button>
            {sectors.map((s) => (
              <button key={s} type="button" className="us-chip-btn" aria-pressed={sector === s} onClick={() => setSector(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="us-grid-3">
          {visible.map((co) => {
            const linkedPart = PARTS.find((p) => p.company === co.id);
            return (
              <article key={co.id} className="us-card-link">
                <div>
                  <div className="us-card-head">
                    <span className="us-tag-pill">{co.sector}</span>
                    {co.isCallbackPartner ? (
                      <span className="us-tag-pill us-tag-pill--tape">Active callback</span>
                    ) : null}
                  </div>
                  <div style={{ marginTop: 18 }}>
                    <CompanyMark company={co} />
                  </div>
                  <p className="us-card-brief" style={{ marginTop: 12 }}>{co.typicalBrief}</p>
                </div>
                <div className="us-card-foot">
                  <span className="us-mono" style={{ color: "var(--us-graphite)" }}>{co.castOpenings} cast seats</span>
                  {linkedPart ? (
                    <Link className="us-link" href={`/templates/understudy/parts/${linkedPart.id}`}>
                      Open {linkedPart.title} ↗
                    </Link>
                  ) : (
                    <Link className="us-link" href="/templates/understudy/parts">
                      View parts ↗
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
