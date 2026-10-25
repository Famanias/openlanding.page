import type { CSSProperties } from "react";
import { BotanicalArt } from "../bouquet/BotanicalArt";
import { PostcardCarousel } from "../bouquet/PostcardCarousel";
import { Flower } from "../brand/Flower";
import type { Feeling } from "../bouquet/model";

const postcards: { feeling: Feeling; label: string; note: string; bg: string }[] = [
  { feeling: "wildthing", label: "A little wild", note: "grow your own way", bg: "pistachio" },
  { feeling: "daydream", label: "Just because", note: "no reason required", bg: "blush" },
  { feeling: "sunbeam", label: "Hello, sunshine", note: "a brighter kind of day", bg: "butter" },
  { feeling: "daydream", label: "Soft mornings", note: "take your sweet time", bg: "lilac" },
  { feeling: "wildthing", label: "For your person", note: "you know the one", bg: "apricot" },
];

export function Hero() {
  return <section id="top" className="fl-hero" aria-labelledby="fl-title" data-ambient>
    <div className="fl-hero-intro">
      <p className="fl-eyebrow fl-load"><Flower /> A little flower club for everyday occasions</p>
      <h1 id="fl-title"><span className="fl-line"><span className="fl-load">A little bloom.</span></span><span className="fl-line"><em className="fl-load">A brighter day.</em></span></h1>
      <p className="fl-hero-lead fl-load">For kitchen tables, just-because days, and someone you love.<br /> Seasonal flowers. A little feeling. No grand occasion required.</p>
    </div>
    <div className="fl-hero-gallery" aria-label="Flowers for every kind of day">
      <span className="fl-hero-note fl-script fl-load">ordinary days,<br />extra lovely.<svg viewBox="0 0 90 65" aria-hidden="true"><path d="M10 8Q71 2 73 53M63 43L73 55L82 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
      <PostcardCarousel>{[...postcards, ...postcards].map((card, index) => {
        const i = index % postcards.length;
        const duplicate = index >= postcards.length;
        return <div key={`${card.label}-${index}`} className="fl-postcard-slot" data-card={index} data-duplicate={duplicate || undefined} aria-hidden={duplicate || undefined} style={{ "--i": i, "--angle": `${(i - 2) * 7}deg`, "--offset": `${Math.abs(i - 2) * 23}px` } as CSSProperties}>
        <a className={`fl-postcard fl-bg-${card.bg} ${i === 1 || i === 3 ? "fl-postcard--square" : ""} fl-load`} href={`?feeling=${card.feeling}#compose`} tabIndex={duplicate ? -1 : undefined}>
          <span className="fl-postcard-note fl-script">{card.note}</span>
          {duplicate ? <svg className="fl-botanical" data-feeling={card.feeling} data-scene={i === 0 || i === 4 ? "single" : "bunch"} viewBox="0 0 400 480" aria-hidden="true"><use href={`#fl-postcard-art-${i}`} /></svg> : <BotanicalArt id={`fl-postcard-art-${i}`} feeling={card.feeling} scene={i === 0 || i === 4 ? "single" : "bunch"} />}
          <span className="fl-postcard-label">{card.label}<span aria-hidden="true">↗</span></span>
        </a>
      </div>;
      })}</PostcardCarousel>
      <div className="fl-hero-seal fl-load"><Flower /><span>freshly<br /><em>gathered</em></span><span className="fl-seal-bottom">happily delivered</span></div>
    </div>
    <div className="fl-hero-bottom fl-load"><a className="fl-button" href="#compose">Find your flowers <span aria-hidden="true">↗</span></a><p>From £24 a bunch <span aria-hidden="true">·</span> A little joy, on repeat</p></div>
    <div className="fl-hero-foot"><span>Good flowers. Good feeling.</span><a href="#flowers">A little look around <span aria-hidden="true">↓</span></a><span>Grown with the season <Flower /></span></div>
  </section>;
}
