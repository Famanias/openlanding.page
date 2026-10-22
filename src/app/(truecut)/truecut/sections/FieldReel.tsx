"use client";

import { useEffect, useState } from "react";
import { VideoFrame } from "../assets";
import { FieldLogNote } from "../mechanic/FieldLogNote";
import { Reveal } from "../motion/Reveals";

const notes = [
  { index: "01 / SITE", title: "Start with the signal.", body: "We arrive with the drawings, the instruments, and the question that needs a real answer.", tag: "Scope / ready" },
  { index: "02 / PROOF", title: "Show the reading.", body: "Testing and commissioning become visible: what changed, what held, and what is ready for sign-off.", tag: "Test / verified" },
  { index: "03 / HANDOFF", title: "Leave it legible.", body: "The closeout is part of the work: clean panels, clear notes, and a person who owns the next step.", tag: "Handoff / clear" },
];

export function FieldReel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".tc-reel-note"));
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = items.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActive(index);
        }
      }),
      { threshold: 0.55 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="reel" className="tc-section tc-section--dark tc-field-section" data-field-section="reel" aria-labelledby="reel-title">
      <div className="tc-container">
        <Reveal className="tc-section-head" kind="rule">
          <div>
            <span className="tc-eyebrow">Field reel / handoff</span>
            <h2 id="reel-title">A site walk you can feel.</h2>
          </div>
          <p>One pinned stage keeps the proof in view while the field log moves from arrival to reading to sign-off.</p>
        </Reveal>
        <div className="tc-reel-grid">
          <div className="tc-reel-stage">
            <VideoFrame videoKey="process-proof" posterKey="project-panel-detail" posterAlt="Relay panel before and after commissioning" label="Process proof reel" />
            <span className="tc-reel-caption">{notes[active].index} / SIGNAL: CLEAR</span>
          </div>
          <ol className="tc-reel-notes">
            {notes.map((note, index) => <FieldLogNote key={note.index} {...note} active={active === index} />)}
          </ol>
        </div>
      </div>
    </section>
  );
}
