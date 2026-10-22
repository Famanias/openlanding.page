"use client";

import { useEffect, useRef, useState } from "react";
import { DEPARTURE_MONTHS, departuresIn, type DepartureStatus } from "../content/departures";
import { ROUTE } from "../content/line";

const STATUS: Record<DepartureStatus, string> = { open: "Open", few: "Few left", complet: "Complet" };

/**
 * Split-flap text: each character settles through rotateX in a stagger. Screen readers get the plain string.
 * The first render is plain text (lighter hydration); characters split once the visitor changes month.
 */
function Flap({ text, offset = 0, live }: { text: string; offset?: number; live: boolean }) {
  if (!live) return <span className="au-flap">{text}</span>;
  return (
    <span className="au-flap">
      <span className="au-sr">{text}</span>
      {[...text].map((ch, i) => (
        <span key={i} aria-hidden="true" style={{ "--c": offset + i } as React.CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

export function Departures() {
  const [month, setMonth] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [flipped, setFlipped] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const rows = departuresIn(DEPARTURE_MONTHS[month].year, DEPARTURE_MONTHS[month].month);

  useEffect(() => {
    const place = () => {
      const tab = tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[month];
      const ind = indicatorRef.current;
      if (!tab || !ind) return;
      ind.style.setProperty("--x", `${tab.offsetLeft}px`);
      ind.style.setProperty("--w", `${tab.offsetWidth / 100}`);
    };
    place();
    window.addEventListener("resize", place, { passive: true });
    document.fonts?.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [month]);

  const select = (i: number) => {
    if (i === month) return;
    setDir(i > month ? "next" : "prev");
    setMonth(i);
    setFlipped(true);
  };

  const onKey = (e: React.KeyboardEvent) => {
    const last = DEPARTURE_MONTHS.length - 1;
    let i = month;
    if (e.key === "ArrowRight") i = month === last ? 0 : month + 1;
    else if (e.key === "ArrowLeft") i = month === 0 ? last : month - 1;
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = last;
    else return;
    e.preventDefault();
    select(i);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[i]?.focus();
  };

  return (
    <section id="departures" className="au-departures" aria-labelledby="departures-title">
      <div className="au-wrap">
        <div className="au-departures__head">
          <div>
            <p className="au-eyebrow" data-reveal="slide">
              Departures · Paris-Gare de Lyon, Hall 1, quai 3
            </p>
            <h2 id="departures-title" className="au-h2" data-reveal="mask">
              <span className="au-mask">
                <span>Thursdays and</span>
              </span>
              <span className="au-mask">
                <span>Sundays, {ROUTE.departs}.</span>
              </span>
            </h2>
          </div>
          <div className="au-tabs" role="tablist" aria-label="Month" ref={tabsRef} onKeyDown={onKey}>
            {DEPARTURE_MONTHS.map((m, i) => (
              <button
                key={m.label}
                type="button"
                role="tab"
                id={`dep-tab-${i}`}
                aria-selected={i === month}
                aria-controls="dep-panel"
                tabIndex={i === month ? 0 : -1}
                onClick={() => select(i)}
              >
                {m.label} {m.year}
              </button>
            ))}
            <span ref={indicatorRef} className="au-tabs__indicator" aria-hidden="true" />
          </div>
        </div>

        <div className="au-board" id="dep-panel" role="tabpanel" aria-labelledby={`dep-tab-${month}`}>
          <span className="au-board__rule" data-reveal="draw" aria-hidden="true" />
          <table className="au-board__table">
            <caption className="au-sr">
              Departures in {DEPARTURE_MONTHS[month].label} {DEPARTURE_MONTHS[month].year}
            </caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Departs</th>
                <th scope="col" className="au-board__opt">Arrives</th>
                <th scope="col">Berths</th>
                <th scope="col">Status</th>
                <th scope="col">
                  <span className="au-sr">Reserve</span>
                </th>
              </tr>
            </thead>
            <tbody key={month} data-dir={dir}>
              {rows.map((d, i) => (
                <tr key={d.id} data-status={d.status} style={{ "--i": i } as React.CSSProperties}>
                  <th scope="row">
                    <Flap text={`${d.weekday} ${d.day} ${d.monthShort}`} offset={i} live={flipped} />
                    {d.note && <span className="au-board__note">{d.note}</span>}
                  </th>
                  <td>
                    <Flap text={`${ROUTE.departs} Paris`} offset={i + 2} live={flipped} />
                  </td>
                  <td className="au-board__opt">
                    <Flap text={`${ROUTE.arrives} Venezia`} offset={i + 4} live={flipped} />
                  </td>
                  <td className="au-tabular">
                    <Flap text={String(d.berthsLeft).padStart(2, "0")} offset={i + 6} live={flipped} />
                  </td>
                  <td>
                    <span className="au-board__status">
                      <Flap text={STATUS[d.status]} offset={i + 7} live={flipped} />
                    </span>
                  </td>
                  <td className="au-board__action">
                    {d.status === "complet" ? (
                      <span className="au-board__full">Waitlist by email</span>
                    ) : (
                      <a className="au-link-arrow" href="#reserve" data-departure={d.id}>
                        Reserve
                        <span className="au-sr"> {d.weekday} {d.day} {d.monthShort}</span>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M4 12h15M13 6l6 6-6 6" />
                        </svg>
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="au-board__foot">
            Times are scheduled. If we&rsquo;re late, it&rsquo;s into Venezia, never out of your sleep.
          </p>
        </div>
      </div>
    </section>
  );
}
