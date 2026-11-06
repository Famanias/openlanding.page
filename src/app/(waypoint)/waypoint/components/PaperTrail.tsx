"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
} from "@phosphor-icons/react";
import { SuppliedArtwork } from "./SuppliedArtwork";

const moments = [
  {
    stage: "First pitch",
    date: "October 22",
    title: "Start with something specific.",
    body: "Shared my distributed systems write-up with Elena. Mentioned the scheduling problem their team is working on.",
    next: "Follow up with the benchmark notes.",
  },
  {
    stage: "A real conversation",
    date: "October 28",
    title: "Keep the context close.",
    body: "Elena replied. The team is interested in cluster failover. Bring a practical example, and ask how they measure reliability.",
    next: "Prepare for Wednesday’s architecture discussion.",
  },
  {
    stage: "The next chapter",
    date: "November 05",
    title: "Make the next step yours.",
    body: "Architecture conversation complete. Good alignment on the work. Revisit the team’s priorities and my own before the next round.",
    next: "Send a considered follow-up and a short technical recap.",
  },
];

export function PaperTrail() {
  const [selected, setSelected] = useState(1);
  const moment = moments[selected];
  return (
    <section id="paper-trail" className="wyp-paper-trail wyp-chapter">
      <div className="wyp-container">
        <p className="wyp-kicker">The details make the difference</p>
        <h2 className="wyp-statement">
          {["Every", "conversation"].map((w) => (
            <span data-word key={w}>
              {w}{" "}
            </span>
          ))}
          <span className="wyp-inline-landscape" aria-hidden="true" />
          <br />
          {["has", "a", "next", "step."].map((w) => (
            <span data-word key={w}>
              {w}{" "}
            </span>
          ))}
        </h2>
        <div className="wyp-paper-layout">
          <div>
            <p className="wyp-paper-intro">
              The first note. The detail you almost forgot. The question you
              want to ask next. Give your search a memory, so you can give each
              conversation your attention.
            </p>
            <div className="wyp-timeline">
              <div className="wyp-timeline-line" aria-hidden="true">
                <span data-route-line />
              </div>
              {moments.map((item, i) => (
                <button
                  type="button"
                  key={item.stage}
                  className={`wyp-timeline-moment ${selected === i ? "is-selected" : ""}`}
                  onClick={() => setSelected(i)}
                  aria-pressed={selected === i}
                >
                  <span>
                    {i < selected ? (
                      <Check size={13} />
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </span>
                  <div>
                    <strong>{item.stage}</strong>
                    <small>{item.date}</small>
                  </div>
                  <ArrowUpRight size={17} />
                </button>
              ))}
            </div>
          </div>
          <div className="wyp-note-stack">
            <div className="wyp-note-under" data-stack-note />
            <div className="wyp-note-under" data-stack-note />
            <figure className="wyp-journal-artwork">
              <SuppliedArtwork id={10} />
              <figcaption>Supplied journal workspace concept</figcaption>
            </figure>
            <article
              className="wyp-opportunity-note"
              aria-label="Sample opportunity notes"
            >
              <div key={selected} className="wyp-journal-entry">
                <p className="wyp-tiny">
                  {moment.date} · {moment.stage}
                </p>
                <h3>{moment.title}</h3>
                <p>{moment.body}</p>
                <div className="wyp-journal-next">
                  <span className="wyp-tiny">A clear next step</span>
                  <p>{moment.next}</p>
                </div>
              </div>
              <div className="wyp-journal-controls">
                <span>
                  Illustrative notes · {String(selected + 1).padStart(2, "0")} /
                  03
                </span>
                <div>
                  <button
                    type="button"
                    aria-label="Previous opportunity note"
                    onClick={() => setSelected((selected + 2) % 3)}
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next opportunity note"
                    onClick={() => setSelected((selected + 1) % 3)}
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
