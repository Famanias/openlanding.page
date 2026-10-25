"use client";

import { useRef, type CSSProperties } from "react";
import { STAGES } from "../fitout/scene";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";
import { useScrollVar } from "../motion/useScrollVar";

const WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4", "Launch"];
/** [first column, last column exclusive] on the five-column week track. */
const SPANS: Record<string, [number, number]> = { shell: [1, 2], fixtures: [2, 4], wiring: [3, 4], signage: [4, 5], open: [5, 6] };

/** The fit-out schedule as a drawn Gantt. A "today" marker sweeps the weeks as the section passes. */
export function Schedule() {
  const ref = useRef<HTMLElement | null>(null);
  useScrollVar(ref, "--fx-pass");

  return (
    <section ref={ref} id="schedule" className="fx-section fx-schedule" aria-labelledby="fx-schedule-title">
      <div className="fx-container">
        <Reveal className="fx-section-head fx-section-head--split" kind="rise">
          <p className="fx-eyebrow"><span>Schedule</span><span>Door to door</span></p>
          <h2 id="fx-schedule-title"><SplitText>{"Four weeks from\nshell to open."}</SplitText></h2>
          <p className="fx-section-lead">A typical full fit-out. Smaller jobs, like a speed audit or two apps, take days, not weeks. Every client gets the schedule on day one and a written update every Friday.</p>
        </Reveal>

        <Reveal className="fx-gantt" kind="rise">
          <div className="fx-gantt__weeks" aria-hidden="true">
            <span />
            {WEEKS.map((week) => <span key={week} className="fx-mono">{week}</span>)}
          </div>
          <ol className="fx-gantt__rows">
            {STAGES.map((stage, index) => {
              const [from, to] = SPANS[stage.id];
              return (
                <li key={stage.id} className="fx-gantt__row" style={{ "--i": index } as CSSProperties}>
                  <span className="fx-gantt__label"><span className="fx-mono">{stage.n}</span>{stage.name}</span>
                  <span className="fx-gantt__track">
                    <span className="fx-gantt__bar" style={{ gridColumn: `${from} / ${to}` } as CSSProperties}>
                      <span className="fx-gantt__bar-text">{stage.service}</span>
                    </span>
                  </span>
                  <span className="fx-sr">{stage.week}</span>
                </li>
              );
            })}
          </ol>
          <div className="fx-gantt__marker" aria-hidden="true"><span className="fx-gantt__marker-line"><span className="fx-mono">Today</span></span></div>
          <p className="fx-gantt__after fx-mono">Then: monthly care, same team →</p>
        </Reveal>
      </div>
    </section>
  );
}
