"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { CASES } from "../content/work";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";

type Mode = "before" | "after";

/** Three shops we fitted, each with the same numbers measured before and after. */
export function Work() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [mode, setMode] = useState<Mode>("after");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = CASES[index];

  const select = (next: number) => {
    const wrapped = (next + CASES.length) % CASES.length;
    setDir(wrapped >= index ? "next" : "prev");
    setIndex(wrapped);
    tabs.current[wrapped]?.focus();
  };

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") { event.preventDefault(); select(index + 1); }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") { event.preventDefault(); select(index - 1); }
    if (event.key === "Home") { event.preventDefault(); select(0); }
    if (event.key === "End") { event.preventDefault(); select(CASES.length - 1); }
  };

  return (
    <section id="work" className="fx-section fx-work" aria-labelledby="fx-work-title">
      <div className="fx-work__slab">
        <div className="fx-container">
          <Reveal className="fx-section-head" kind="rise">
            <p className="fx-eyebrow"><span>Work</span><span>Measured, not guessed</span></p>
            <h2 id="fx-work-title"><SplitText>{"Three shops,\nbefore and after."}</SplitText></h2>
          </Reveal>

          <div className="fx-work__grid">
            <div className="fx-work__tabs" role="tablist" aria-label="Case studies" aria-orientation="vertical" onKeyDown={onKey} style={{ "--tab": index } as CSSProperties}>
              <span className="fx-work__tab-indicator" aria-hidden="true" />
              {CASES.map((entry, n) => (
                <button
                  key={entry.id}
                  ref={(node) => { tabs.current[n] = node; }}
                  id={`fx-tab-${entry.id}`}
                  role="tab"
                  type="button"
                  className="fx-work__tab"
                  aria-selected={n === index}
                  aria-controls={`fx-panel-${entry.id}`}
                  tabIndex={n === index ? 0 : -1}
                  onClick={() => select(n)}
                >
                  <span className="fx-mono">0{n + 1}</span>
                  <span className="fx-work__tab-name">{entry.merchant}</span>
                  <span className="fx-work__tab-meta">{entry.city} · {entry.trade}</span>
                </button>
              ))}
            </div>

            <div key={item.id} id={`fx-panel-${item.id}`} role="tabpanel" aria-labelledby={`fx-tab-${item.id}`} className="fx-work__panel" data-dir={dir}>
              <div className="fx-work__panel-head">
                <h3>{item.merchant}</h3>
                <ul className="fx-work__fitted" aria-label="What we fitted">
                  {item.fitted.map((label) => <li key={label}>{label}</li>)}
                </ul>
              </div>
              <blockquote className="fx-work__quote">“{item.quote}”</blockquote>

              <div className="fx-work__toggle" role="group" aria-label="Show numbers" data-mode={mode}>
                <span className="fx-work__toggle-thumb" aria-hidden="true" />
                <button type="button" aria-pressed={mode === "before"} onClick={() => setMode("before")}>Before</button>
                <button type="button" aria-pressed={mode === "after"} onClick={() => setMode("after")}>After</button>
              </div>

              <ul className="fx-work__metrics">
                {item.metrics.map((metric, n) => {
                  const value = mode === "after" ? metric.after : metric.before;
                  const scale = value / Math.max(metric.before, metric.after);
                  return (
                    <li key={metric.label} className="fx-metric" style={{ "--i": n, "--scale": scale.toFixed(3) } as CSSProperties} data-better={mode === "after" ? "true" : "false"}>
                      <span className="fx-mono fx-metric__label">{metric.label}</span>
                      <CountUp className="fx-metric__value" value={value} from={metric.before} decimals={metric.decimals} prefix={metric.prefix} suffix={metric.suffix} />
                      <span className="fx-metric__bar" aria-hidden="true"><span /></span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
