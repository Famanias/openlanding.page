"use client";
import { useState, type CSSProperties } from "react";
import { FILTERS, filterFlavors, type FlavorTag } from "../data/shop";
import { Jar, toneVar } from "../brand/Jar";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";
import { useOrder } from "../box/OrderContext";
import { money } from "../box/logic";
import { SectionHead } from "./SectionHead";

/** The shelf: six flavour cards. Filter chips swap the set; cards tilt and glow with the pointer; "Add" drops a jar into the shared box. */
export function Shelf() {
  const [filter, setFilter] = useState<"all" | FlavorTag>("all");
  const { box, dispatch } = useOrder();
  const items = filterFlavors(filter);

  return (
    <section id="shelf" className="pk-sec pk-sec--blush" aria-labelledby="shelf-title">
      <div className="pk-wrap">
        <SectionHead id="shelf-title" eyebrow="The shelf" title="Six jars, [[six moods.]]" lede="One batch of each, always. When a flavour is gone it is gone until its fruit comes round again." />
        <Reveal variant="rise" delay={240}>
          <div className="pk-filters" role="group" aria-label="Filter flavours">
            {FILTERS.map((f) => (
              <button key={f.id} type="button" className="pk-chipbtn" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                <span className="pk-btn-label">{f.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <ul className="pk-shelf-grid" data-filter={filter}>
          {items.map((f, i) => {
            const n = box.jars[f.id] ?? 0;
            return (
              <li key={`${filter}-${f.id}`} className="pk-card-li" style={{ "--i": i, "--tone": toneVar(f.tone) } as CSSProperties}>
                <TiltCard className="pk-card">
                  <span className="pk-card-glow" aria-hidden="true" />
                  <span className="pk-card-lidno">{f.lid}</span>
                  <div className="pk-card-art">
                    <Jar tone={f.tone} label={f.lid.replace("No. ", "")} />
                  </div>
                  <h3 className="pk-card-name">{f.name}</h3>
                  <p className="pk-card-line">{f.line}</p>
                  <ul className="pk-tags" aria-label="Tags">
                    {f.tags.map((t) => <li key={t} className="pk-tag">{t}</li>)}
                  </ul>
                  <div className="pk-card-foot">
                    <span className="pk-price">{money(f.price)}<small> / jar</small></span>
                    <button type="button" className="pk-btn pk-btn-primary pk-btn-sm pk-add" onClick={() => dispatch({ type: "add", id: f.id })}>
                      <span className="pk-btn-label">{n ? "Add another" : "Add to box"}</span>
                      {n ? <span key={n} className="pk-add-count">×{n}</span> : null}
                      <span className="pk-sr">: {f.name}</span>
                    </button>
                  </div>
                </TiltCard>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
