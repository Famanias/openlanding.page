"use client";

import { useId, useState } from "react";
import { FAQS } from "../content/firm";

/** One answer open at a time. Panels open by animating grid rows 0fr → 1fr, so they reverse cleanly mid-flight. */
export function Accordion() {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="cr-acc">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="cr-acc__item" data-open={isOpen} data-reveal="cascade" style={{ "--i": i } as React.CSSProperties}>
            <h3>
              <button
                type="button"
                id={`${uid}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="cr-acc__q">{f.q}</span>
                <span className="cr-acc__icon" aria-hidden="true">
                  <i />
                  <i />
                </span>
              </button>
            </h3>
            <div id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`} className="cr-acc__panel">
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
