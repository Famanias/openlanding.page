"use client";

import { useState } from "react";
import { Reveal } from "../motion/Reveal";
import { SEASONAL_LEDGER } from "../content/field-data";

export function SeasonalLedger() {
  const [active, setActive] = useState(0);
  const selected = SEASONAL_LEDGER[active];
  return (
    <section className="rl-section rl-ledger" id="ledger" aria-labelledby="rl-ledger-title">
      <div className="rl-container rl-ledger__grid">
        <div className="rl-ledger__intro"><Reveal className="rl-eyebrow">05 / SEASONAL LEDGER</Reveal><h2 id="rl-ledger-title">Keep a year in view.</h2><p>The field is a conversation between storms, roots and time. Pick a month; the detail moves with it.</p></div>
        <div><div className="rl-ledger__months" role="tablist" aria-label="Seasonal months"><div className="rl-ledger__line" aria-hidden="true" />{SEASONAL_LEDGER.map((entry, index) => <button key={entry.month} className="rl-ledger__month" type="button" role="tab" aria-selected={active === index} data-active={active === index ? "true" : "false"} data-marker={entry.marker} onClick={() => setActive(index)}><span className="rl-ledger__month-code rl-mono">{entry.code} / {entry.month}</span><span className="rl-ledger__month-title">{entry.title}</span></button>)}</div><div className="rl-ledger__detail" role="tabpanel"><span className="rl-mono">{selected.month} / {selected.marker}</span><h3>{selected.title}</h3><p>{selected.detail}</p></div></div>
      </div>
    </section>
  );
}

