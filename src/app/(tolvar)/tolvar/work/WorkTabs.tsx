"use client";
import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Picture } from "../assets";
import { Flag } from "../brand/Marks";
import { useJobKind } from "./JobKindProvider";
import { KINDS, nextTab, pad2, panelState } from "./services";

/**
 * Cut / Fill / Pipe / Haul. All four panels stay in the DOM stacked in one grid cell; `data-state` slides the
 * open one in and pushes the others out (before = left, after = right), so a change can reverse mid-flight.
 */
export function WorkTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { setKind } = useJobKind();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const next = nextTab(active, event.key, KINDS.length);
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="tv-work-body" data-tv-work data-active={KINDS[active].id}>
      <div className="tv-tabs" role="tablist" aria-label="Kinds of work" aria-orientation="horizontal" onKeyDown={onKeyDown} style={{ "--tv-tab": active } as CSSProperties}>
        <span className="tv-tab-marker" aria-hidden="true" />
        {KINDS.map((kind, index) => (
          <button
            key={kind.id}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`tv-tab-${kind.id}`}
            className="tv-tab"
            aria-selected={index === active}
            aria-controls={`tv-panel-${kind.id}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
          >
            <span className="tv-tab-no tv-gauge">{pad2(index + 1)}</span>
            <span className="tv-tab-name">{kind.label}</span>
            <span className="tv-tab-move tv-gauge">{kind.move}</span>
          </button>
        ))}
      </div>

      <div className="tv-panels">
        {KINDS.map((kind, index) => (
          <div
            key={kind.id}
            role="tabpanel"
            id={`tv-panel-${kind.id}`}
            aria-labelledby={`tv-tab-${kind.id}`}
            className="tv-panel"
            data-state={panelState(index, active)}
            inert={index !== active}
          >
            <figure className="tv-panel-photo">
              <Picture assetKey={kind.assetKey} alt={kind.alt} sizes="(min-width: 1000px) 44vw, 100vw" />
              <figcaption className="tv-gauge">{kind.caption}</figcaption>
            </figure>
            <div className="tv-panel-copy">
              <p className="tv-eyebrow tv-gauge">
                {kind.id === "pipe" ? <Flag /> : <i className="tv-chip" aria-hidden="true" />}
                {kind.label} · {kind.services.length} services
              </p>
              <h3 className="tv-panel-verb">{kind.verb}</h3>
              <p className="tv-panel-blurb">{kind.blurb}</p>
              <ul className="tv-services">
                {kind.services.map((service, row) => (
                  <li key={service.name} style={{ "--i": row } as CSSProperties}>
                    <span className="tv-service-name">{service.name}</span>
                    <span className="tv-service-line">{service.line}</span>
                  </li>
                ))}
              </ul>
              <a className="tv-btn tv-btn-dark" href="#estimate" onClick={() => setKind(kind.id)} data-tv-quote={kind.id}>
                <span className="tv-btn-label">Get {kind.label.toLowerCase()} work quoted</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
