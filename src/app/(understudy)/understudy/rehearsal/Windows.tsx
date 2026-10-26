import type { CSSProperties, ReactNode } from "react";
import { CompanyMark } from "../brand/CompanyMark";
import { Face } from "../brand/Props";
import { companyById } from "../content/companies";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";
import type { SceneKind } from "./scenes";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** A window in the house frame: a bar with three stage pips and a title, then the scene's mock. */
export function Win({ title, children, label, className }: { title: string; children: ReactNode; label: string; className?: string }) {
  return (
    <Reveal variant="wipe" className={`us-win ${className ?? ""}`}>
      <figure className="us-win__in" role="img" aria-label={label}>
        <div className="us-win__bar" aria-hidden="true">
          <div className="us-win__pips"><i /><i /><i /></div>
          <span className="us-win__title">{title}</span>
          <span className="us-win__status us-mono">Active Stage</span>
        </div>
        <div className="us-win__body" aria-hidden="true">{children}</div>
      </figure>
    </Reveal>
  );
}

const LOT = ["parcelpost", "halcyon", "fernway", "lumen", "tidewell", "brightloop", "saltbox", "kestrel"];

function Lot() {
  return (
    <div className="us-lot">
      <div className="us-lot__map">
        {LOT.map((id, n) => (
          <span key={id} className={`us-lot__b${id === "parcelpost" ? " us-lot__b--on" : ""}`} style={i(n)}>
            <CompanyMark company={companyById(id)} />
            {id === "parcelpost" && <i className="us-lot__pin" data-ambient />}
          </span>
        ))}
      </div>
      <div className="us-lot__brief">
        <div className="us-lot__briefhead">
          <p className="us-mono">Brief No. 204 · Product Analyst</p>
          <span className="us-lot__urgent us-mono">Active Sprint</span>
        </div>
        <p className="us-lot__q">31% of carts stall at the address step. Find out why.</p>
        <p className="us-lot__meta"><span>Due Fri 18:00</span><span>Director: Ines Duarte</span></p>
        <span className="us-lot__take">Take the part</span>
      </div>
    </div>
  );
}

const CHAT = [
  { who: "Ravi", role: "Engineer", tone: 2, text: "Address autocomplete fails on 1 in 9 postcodes. Logs are in the drive." },
  { who: "You", role: "Analyst", tone: 1, text: "That lines up: the stall is worst on mobile, right after autocomplete." },
  { who: "Lena", role: "Designer", tone: 3, text: "I can mock a manual-entry fallback by Thursday." },
  { who: "Ines", role: "Director", tone: 0, text: "Good. Size it before you build it. What's the upside?" },
] as const;

function Cast() {
  return (
    <div className="us-chat">
      <div className="us-chat__log">
        {CHAT.map((m, n) => (
          <div key={n} className={`us-msg${m.who === "You" ? " us-msg--you" : ""}`} style={i(n)}>
            <Face tone={m.tone} className="us-msg__face" />
            <div><p className="us-msg__who">{m.who} <span>{m.role}</span></p><p className="us-msg__t">{m.text}</p></div>
          </div>
        ))}
        <div className="us-msg us-msg--typing" style={i(4)}><Face tone={2} className="us-msg__face" /><p className="us-dots"><i /><i /><i /></p></div>
      </div>
      <aside className="us-chat__side">
        <p className="us-mono">Standup · Tue</p>
        <ul>{["Pull checkout logs", "Segment by device", "Size the fallback", "Draft the readout"].map((t, n) => (
          <li key={t} className={n < 3 ? "is-done" : undefined} style={i(n)}><svg viewBox="0 0 16 16"><path d="M3 8.5 6.5 12 13 4.5" pathLength={1} /></svg>{t}</li>
        ))}</ul>
      </aside>
    </div>
  );
}

function Notes() {
  return (
    <div className="us-doc">
      <div className="us-doc__page">
        <p className="us-doc__h">Readout: checkout drop-off</p>
        <p className="us-doc__p">Mobile shoppers abandon at the address step <mark style={i(0)}>31% of the time</mark>, against 12% on desktop.</p>
        <p className="us-doc__bars"><span className="us-doc__bar" /><span className="us-doc__bar us-doc__bar--s" /></p>
        <p className="us-doc__p">Autocomplete misses <mark style={i(1)}>1 in 9 postcodes</mark>; a manual fallback recovers most of them.</p>
        <p className="us-doc__bars"><span className="us-doc__bar" /><span className="us-doc__bar us-doc__bar--m" /></p>
      </div>
      <ol className="us-doc__notes">
        {["Lead with the 31%. It's the whole story.", "Cut the chart: the table already says it.", "Ship it. This is a hiring-manager readout."].map((t, n) => (
          <li key={t} style={i(n)}><Face tone={0} className="us-doc__face" /><p>{t}</p></li>
        ))}
      </ol>
      <span className="us-doc__stamp">Approved</span>
    </div>
  );
}

function Reel() {
  return (
    <div className="us-reel">
      <div className="us-reel__head">
        <Face tone={1} className="us-reel__face" />
        <div><p className="us-reel__name">Maya Ortiz</p><p className="us-mono">Product Analyst · Level 7</p></div>
        <span className="us-reel__ready">Callback-ready</span>
      </div>
      <ul className="us-reel__stats">
        <li><b><CountUp to={18} prefix="−" suffix="%" /></b><span>checkout drop-off</span></li>
        <li><b><CountUp to={4} /></b><span>fixes shipped</span></li>
        <li><b><CountUp to={9} /></b><span>director notes</span></li>
      </ul>
      <ul className="us-reel__work">
        {[["Parcelpost", "Checkout funnel model"], ["Sundry", "Win-back experiment"], ["Tidewell", "Demand forecast"]].map(([c, t], n) => (
          <li key={t} style={i(n)}><span className="us-reel__thumb" /><span><b>{t}</b><span>{c} · signed off</span></span></li>
        ))}
      </ul>
    </div>
  );
}

const LABELS: Record<SceneKind, string> = {
  lot: "A map of the studio's companies, with a brief from Parcelpost: 31% of carts stall at the address step.",
  cast: "A team chat: an engineer, the analyst, a designer and the director working the checkout brief, beside a standup checklist.",
  notes: "A readout with highlighted findings and three margin notes from the director, stamped approved.",
  reel: "Maya Ortiz's reel: Product Analyst, level 7, checkout drop-off down 18%, four fixes shipped, nine director notes.",
};

export function SceneWindow({ kind, title }: { kind: SceneKind; title: string }) {
  const body = kind === "lot" ? <Lot /> : kind === "cast" ? <Cast /> : kind === "notes" ? <Notes /> : <Reel />;
  return <Win title={title} label={LABELS[kind]} className={`us-win--${kind}`}>{body}</Win>;
}

/** The reel as it sits in the casting scene: the same page, a little smaller. */
export function ReelFigure() {
  return (
    <figure className="us-win__in us-cast__win" role="img" aria-label={LABELS.reel}>
      <div className="us-win__bar" aria-hidden="true">
        <div className="us-win__pips"><i /><i /><i /></div>
        <span className="us-win__title">understudy.example/maya</span>
        <span className="us-win__status us-mono">Certified Reel</span>
      </div>
      <div className="us-win__body" aria-hidden="true"><Reel /></div>
    </figure>
  );
}
