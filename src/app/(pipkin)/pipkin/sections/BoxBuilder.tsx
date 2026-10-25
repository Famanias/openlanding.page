"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FLAVORS } from "../data/shop";
import { Jar, toneVar } from "../brand/Jar";
import { Check, Arrow } from "../brand/Marks";
import { Magnetic } from "../motion/Magnetic";
import { Reveal } from "../motion/Reveal";
import { useOrder } from "../box/OrderContext";
import { BOX_SIZES, jarCount, money, nextOrderNumber, slots, totals } from "../box/logic";
import { SectionHead } from "./SectionHead";

type Ticket = { number: string; lines: { name: string; n: number }[]; total: number; free: boolean };

const NOTICE: Record<string, string> = {
  grew: "That jar didn't fit, so the box grew to the next size.",
  full: "Twelve is the biggest box we pack. Swap a jar instead.",
  shrank: "Trimmed from the end of the shelf to fit the smaller box.",
};

/** Build a box: pick a size, add jars, watch them pack in, see the total, place the order. No network; success is a ticket. */
export function BoxBuilder() {
  const { box, dispatch, placed, placeOrder } = useOrder();
  const [status, setStatus] = useState<"idle" | "loading" | "placed">("idle");
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const t = totals(box.jars);
  const filled = slots(box.jars);
  const cols = box.size === 12 ? 4 : 3;
  const sizeIndex = BOX_SIZES.indexOf(box.size);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const place = () => {
    if (t.count === 0 || status !== "idle") return;
    setStatus("loading");
    timer.current = window.setTimeout(() => {
      setTicket({
        number: nextOrderNumber(412, placed),
        lines: FLAVORS.filter((f) => (box.jars[f.id] ?? 0) > 0).map((f) => ({ name: f.name, n: box.jars[f.id] })),
        total: t.total,
        free: t.freeShipping,
      });
      placeOrder();
      setStatus("placed");
    }, 900);
  };
  const reset = () => {
    setStatus("idle");
    setTicket(null);
    dispatch({ type: "clear" });
  };

  return (
    <section id="box" className="pk-sec pk-sec--sky" aria-labelledby="box-title">
      <div className="pk-wrap">
        <SectionHead id="box-title" eyebrow="Build a box" title="Pack your own, [[we'll cook it.]]" lede="Pick a size, tuck in your jars and we'll price it as you go. Six jars or more ships free." />

        <div className="pk-bb" data-status={status}>
          <Reveal variant="scale" className="pk-bb-box-wrap">
            <div className="pk-box" data-size={box.size} aria-label={`Your box: ${jarCount(box.jars)} of ${box.size} jars`} role="group">
              <div className="pk-box-lid" aria-hidden="true"><span>PIPKIN · small batch</span></div>
              <ul className="pk-slots" style={{ "--cols": cols } as CSSProperties}>
                {Array.from({ length: box.size }, (_, i) => {
                  const id = filled[i];
                  const f = id ? FLAVORS.find((x) => x.id === id) : null;
                  return (
                    <li key={`${i}-${id ?? "empty"}`} className="pk-slot" data-filled={f ? "true" : "false"}>
                      {f ? <Jar tone={f.tone} label={f.lid.replace("No. ", "")} className="pk-slot-jar" /> : <span className="pk-slot-empty" aria-hidden="true">+</span>}
                    </li>
                  );
                })}
              </ul>
              <p className="pk-box-count" aria-live="polite">
                <b>{jarCount(box.jars)}</b> / {box.size} jars{box.notice ? <span className="pk-box-notice" key={box.notice + t.count}> · {NOTICE[box.notice]}</span> : null}
              </p>
            </div>
          </Reveal>

          <div className="pk-bb-panel">
            <div className="pk-panel-inner">
              <fieldset className="pk-seg" style={{ "--k": sizeIndex } as CSSProperties}>
                <legend className="pk-sr">Box size</legend>
                <span className="pk-seg-thumb" aria-hidden="true" />
                {BOX_SIZES.map((s) => (
                  <label key={s} className="pk-seg-opt">
                    <input type="radio" name="pk-size" value={s} checked={box.size === s} onChange={() => dispatch({ type: "size", size: s })} />
                    <span>{s} jars</span>
                  </label>
                ))}
              </fieldset>

              <ul className="pk-rows">
                {FLAVORS.map((f) => {
                  const n = box.jars[f.id] ?? 0;
                  return (
                    <li key={f.id} className="pk-row" data-has={n > 0 ? "true" : "false"} style={{ "--tone": toneVar(f.tone) } as CSSProperties}>
                      <span className="pk-row-dot" aria-hidden="true" />
                      <span className="pk-row-name">{f.name}</span>
                      <span className="pk-stepper" role="group" aria-label={`${f.name} quantity`}>
                        <button type="button" className="pk-step" disabled={n === 0} onClick={() => dispatch({ type: "remove", id: f.id })} aria-label={`Remove one ${f.name}`}>−</button>
                        <output key={n} className="pk-step-n" aria-live="polite">{n}</output>
                        <button type="button" className="pk-step" disabled={t.count >= 12} onClick={() => dispatch({ type: "add", id: f.id })} aria-label={`Add one ${f.name}`}>+</button>
                      </span>
                    </li>
                  );
                })}
              </ul>

              <dl className="pk-sum">
                <div><dt>{t.count} {t.count === 1 ? "jar" : "jars"}</dt><dd>{money(t.subtotal)}</dd></div>
                <div data-dim={t.discount ? "false" : "true"}><dt>Box discount</dt><dd>−{money(t.discount)}</dd></div>
                <div><dt>Shipping</dt><dd>{t.count === 0 ? "—" : t.freeShipping ? "Free" : money(t.shipping)}</dd></div>
                <div className="pk-sum-total"><dt>Total</dt><dd key={t.total} className="pk-tnum">{money(t.total)}</dd></div>
              </dl>

              <Magnetic className="pk-block">
                <button type="button" className="pk-btn pk-btn-primary pk-btn-wide" data-loading={status === "loading" ? "true" : "false"} disabled={t.count === 0 || status === "loading"} onClick={place}>
                  <span className="pk-btn-label">{status === "loading" ? "Placing your order" : t.count === 0 ? "Add a jar to start" : `Place order · ${money(t.total)}`}</span>
                  {status === "loading" ? <span className="pk-spinner" aria-hidden="true" /> : <Arrow className="pk-btn-arrow" />}
                </button>
              </Magnetic>
            </div>

            <div className="pk-ticket" aria-hidden={status !== "placed"} inert={status !== "placed"} role="status">
              {ticket ? (
                <div className="pk-ticket-inner">
                  <span className="pk-ticket-check"><Check /></span>
                  <p className="pk-eyebrow">Order {ticket.number} placed</p>
                  <h3 className="pk-h3">It&rsquo;s in the kitchen queue.</h3>
                  <ul className="pk-ticket-lines">
                    {ticket.lines.map((l) => <li key={l.name}><span>{l.name}</span><b>×{l.n}</b></li>)}
                  </ul>
                  <p className="pk-ticket-total">Paid {money(ticket.total)}{ticket.free ? " · shipping on us" : ""}. Cook day is Tuesday, doorstep day is Friday.</p>
                  <div className="pk-ticket-actions">
                    <a href="#trip" className="pk-btn pk-btn-primary pk-btn-sm"><span className="pk-btn-label">Follow it</span><Arrow className="pk-btn-arrow" /></a>
                    <button type="button" className="pk-btn pk-btn-ghost pk-btn-sm" onClick={reset}><span className="pk-btn-label">Start another</span></button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
