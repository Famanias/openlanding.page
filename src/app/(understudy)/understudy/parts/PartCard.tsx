"use client";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Picture } from "../assets";
import { Prop, TagIcon } from "../brand/Props";
import { companyById } from "../content/companies";
import { TAG_LABEL, type Part } from "../content/parts";

/**
 * A tall card: the part's prop standing in a spotlight that follows the pointer, its tag, name
 * and tools. Press it and it turns over to the brief, what you ship, and the key that starts it.
 * The outer slot is placed by the carousel; the card inside keeps its own lift and flip.
 * A `copy` repeats a card to fill the ring: clickable, but hidden from readers and the tab order.
 */
export function PartCard({ part, index, copy = false }: { part: Part; index: number; copy?: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const back = useRef<HTMLButtonElement>(null);
  const front = useRef<HTMLButtonElement>(null);
  const company = companyById(part.company);
  const tab = copy ? -1 : undefined;

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    e.currentTarget.style.setProperty("--sy", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };
  const turn = (to: boolean) => {
    setFlipped(to);
    if (!copy) requestAnimationFrame(() => (to ? back : front).current?.focus({ preventScroll: true }));
  };

  return (
    <li className="us-part-slot" style={{ "--i": index } as CSSProperties} aria-hidden={copy || undefined} data-copy={copy || undefined}>
      <div className="us-part" data-flipped={flipped} onPointerMove={move}>
        <div className="us-part__in">
          <div className="us-part__face us-part__front" inert={flipped}>
            <Picture assetKey={`part-${part.id}`} alt="" className="us-part__pic">
              <div className="us-part__scene" aria-hidden="true">
                <i className="us-part__cone" />
                <i className="us-part__pool" />
                <Prop glyph={part.prop} className="us-part__prop" />
              </div>
            </Picture>
            {part.tag && <span className={`us-tag us-tag--${part.tag}`}><TagIcon tag={part.tag} />{TAG_LABEL[part.tag]}</span>}
            <div className="us-part__meta">
              <p className="us-mono">{part.weeks}-week run · {company.name}</p>
              <h3 className="us-part__t">{part.title}</h3>
              <ul className="us-part__tools" aria-label="Tools">{part.tools.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <button ref={front} type="button" className="us-part__flip" aria-expanded={flipped} tabIndex={tab} onClick={() => turn(true)}>
              <span className="us-sr">Read the brief for {part.title}</span>
              <span className="us-part__hint" aria-hidden="true">Brief <svg viewBox="0 0 24 24"><path d="M5 12h13m-5-6 6 6-6 6" /></svg></span>
            </button>
          </div>
          <div className="us-part__face us-part__back" inert={!flipped} aria-hidden={!flipped}>
            <p className="us-mono">The brief · {company.name}</p>
            <p className="us-part__brief">{part.brief}</p>
            <p className="us-mono us-part__k">You ship</p>
            <ol className="us-part__ships">{part.ships.map((s) => <li key={s}>{s}</li>)}</ol>
            <div className="us-part__acts">
              <a className="us-btn us-btn--cue" href="mailto:hello@understudy.example?subject=Audition" data-us-start data-us-part={part.id} tabIndex={tab}>
                <span className="us-roll" data-text="Rehearse this part"><span>Rehearse this part</span></span>
              </a>
              <button ref={back} type="button" className="us-link us-link--light" tabIndex={tab} onClick={() => turn(false)}>Back to the card</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
