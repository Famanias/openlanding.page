import type { CSSProperties } from "react";
import { NOTES } from "../data/shop";
import { Marquee } from "../motion/Marquee";
import { toneVar } from "../brand/Jar";
import { Heart } from "../brand/Marks";
import { SectionHead } from "./SectionHead";

const A = NOTES.slice(0, 4);
const B = NOTES.slice(4);

function NoteCard({ n }: { n: (typeof NOTES)[number] }) {
  return (
    <figure className="pk-note" style={{ "--tone": toneVar(n.tone) } as CSSProperties}>
      <blockquote>{n.text}</blockquote>
      <figcaption><Heart className="pk-note-heart" /> <b>{n.who}</b> · {n.where}</figcaption>
    </figure>
  );
}

/** Doorstep notes: customer notes on two drifting rows that move against each other and pause on hover. */
export function Notes() {
  return (
    <section id="notes" className="pk-sec pk-sec--lilac" aria-labelledby="notes-title">
      <div className="pk-wrap">
        <SectionHead id="notes-title" eyebrow="Doorstep notes" title="Little letters, [[big smiles.]]" lede="Every box carries a postcard. Some come back. These are our favourites." />
      </div>
      <div className="pk-notes">
        <Marquee label="Notes from customers, first row" speed={60}>{A.map((n) => <NoteCard key={n.id} n={n} />)}</Marquee>
        <Marquee label="Notes from customers, second row" speed={72} reverse>{B.map((n) => <NoteCard key={n.id} n={n} />)}</Marquee>
      </div>
    </section>
  );
}
