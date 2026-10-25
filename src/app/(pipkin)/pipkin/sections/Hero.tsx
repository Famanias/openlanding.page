import type { CSSProperties } from "react";
import { Jar } from "../brand/Jar";
import { Berry, Heart, Leaf, Sparkle, Arrow } from "../brand/Marks";
import { Magnetic } from "../motion/Magnetic";
import { SplitText } from "../motion/SplitText";
import { PauseOffscreen } from "../motion/PauseOffscreen";

const d = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/**
 * Hero. Everything above the fold animates from CSS keyframes (pipkin.css, .pk-load / .pk-hero .pk-wi)
 * so the sequence plays before hydration: background settles, logo + nav, headline masks, copy, CTAs, jars.
 */
export function Hero() {
  return (
    <section id="top" className="pk-hero" aria-labelledby="hero-title">
      <PauseOffscreen />
      <div className="pk-hero-bg" aria-hidden="true">
        <span className="pk-blob pk-blob-1" />
        <span className="pk-blob pk-blob-2" />
        <span className="pk-blob pk-blob-3" />
        <span className="pk-blob pk-blob-4" />
      </div>

      <div className="pk-hero-copy">
        <p className="pk-order-pill pk-load" style={d(500)}>
          <span className="pk-order-dot" aria-hidden="true" />
          <span>Order <b>&#35;0412</b> placed · Mon 9:41</span>
        </p>
        <h1 id="hero-title" className="pk-h1">
          <SplitText text="Cooked [[Tuesday.]] At your door Friday." start={3} />
        </h1>
        <p className="pk-lede pk-load" style={d(900)}>
          Pipkin is two cooks, one big pot and 36 jars at a time. Every order is stirred, labelled and packed by hand, then followed all the way to your doorstep.
        </p>
        <div className="pk-cta-row pk-load" style={d(1050)}>
          <Magnetic>
            <a href="#box" className="pk-btn pk-btn-primary">
              <span className="pk-btn-label">Build a box</span>
              <Arrow className="pk-btn-arrow" />
            </a>
          </Magnetic>
          <a href="#trip" className="pk-btn pk-btn-ghost">
            <span className="pk-btn-label">Follow a jar</span>
          </a>
        </div>
        <ul className="pk-hero-facts pk-load" style={d(1200)}>
          <li><b>36</b> jars a batch</li>
          <li><b>31</b> countries</li>
          <li><b>$0</b> shipping from 6 jars</li>
        </ul>
      </div>

      <div className="pk-hero-art" aria-hidden="true">
        <div className="pk-hero-stack">
          <div className="pk-hero-jar pk-hero-jar-1"><Jar tone="lilac" label="No. 05" /></div>
          <div className="pk-hero-jar pk-hero-jar-2"><Jar tone="bubblegum" label="No. 01" /></div>
          <div className="pk-hero-jar pk-hero-jar-3"><Jar tone="butter" label="No. 02" /></div>
          <span className="pk-chip pk-chip-1"><Heart className="pk-chip-ic" /> Made Tuesday</span>
          <span className="pk-chip pk-chip-2"><Leaf className="pk-chip-ic" /> Real fruit, no pectin</span>
          <span className="pk-chip pk-chip-3"><Berry className="pk-chip-ic" /> Batch No. 17</span>
          <Sparkle className="pk-spark pk-spark-1" />
          <Sparkle className="pk-spark pk-spark-2" color="var(--color-bubblegum)" />
          <Sparkle className="pk-spark pk-spark-3" color="var(--color-mint)" />
        </div>
      </div>
    </section>
  );
}
