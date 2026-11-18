import React from "react";
import type { FaqEntry } from "../data/faq";

/** Server-rendered so answers are in the initial HTML; <details> keeps it usable without JavaScript. */
export function Faq({ entries }: { entries: readonly FaqEntry[] }) {
  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <div className="page-container faq-inner">
        <h2 id="faq-title">Frequently asked questions</h2>
        <div className="faq-list">
          {entries.map(entry => (
            <details key={entry.question} className="faq-item">
              <summary>{entry.question}</summary>
              <p>{entry.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
