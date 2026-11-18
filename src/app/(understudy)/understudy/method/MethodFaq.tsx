"use client";
import { useState } from "react";
import { filterFaq } from "../content/catalog";

export function MethodFaq() {
  const [query, setQuery] = useState("");
  const items = filterFaq(query);

  return (
    <section id="faq" className="us-sub-sec us-sub-sec--tinted" aria-labelledby="us-faq-title">
      <div className="us-sub-wrap">
        <div className="us-toolbar">
          <div>
            <p className="us-eyebrow">Direct answers</p>
            <h2 id="us-faq-title" className="us-h2" style={{ marginTop: 8 }}>Studio &amp; Director FAQ</h2>
          </div>
          <div>
            <label className="us-sr" htmlFor="us-faq-search">Search questions</label>
            <input
              id="us-faq-search"
              className="us-search"
              type="search"
              placeholder="Search hours, price, director…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div>
          {items.map((item, i) => (
            <details key={item.id} className="us-faq-item" open={i === 0}>
              <summary>
                <span>{item.question}</span>
                <span className="us-mono" style={{ color: "var(--us-cue)" }}>+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
