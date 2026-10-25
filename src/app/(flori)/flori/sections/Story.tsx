import { BotanicalArt } from "../bouquet/BotanicalArt";
import { Flower } from "../brand/Flower";
import { Reveal } from "../motion/Reveal";
export function Story() {
  return <section id="club" className="fl-section fl-story" aria-labelledby="fl-story-title">
    <Reveal variant="wipe" className="fl-story-art"><span className="fl-script">Life’s little things<br />are the big things.</span><BotanicalArt feeling="sunbeam" scene="table" title="An everyday flower gathering on a sunny table" /><span className="fl-story-art-label">A Tuesday well spent.</span></Reveal>
    <div className="fl-story-copy"><Reveal variant="mask"><p className="fl-eyebrow">Welcome to our little club</p><h2 id="fl-story-title">Not for a birthday.<br />Not for an apology.<br /><em>Just for living.</em></h2></Reveal><Reveal><p>We started Flori with a small thought: why do flowers have to wait for a big occasion?</p><p>So we made a little club. We find what’s growing beautifully, gather it with care, and send a little of the outside to your inside. A different bunch, every time.</p><p>For the table you eat at. The friend you miss. The very ordinary, very lovely life you’re making.</p><a className="fl-text-link" href="#plans">A little something to look forward to <span aria-hidden="true">↗</span></a></Reveal><Reveal variant="draw"><div className="fl-story-signature"><Flower /><span className="fl-script">With a little love,<br />the Flori folk</span></div></Reveal></div>
  </section>;
}
