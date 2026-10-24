import { Landscape } from "../illustrations/Landscape";
import { Arrow } from "../brand/Arrow";
import { Magnetic } from "../motion/Magnetic";
import { SplitText } from "../motion/SplitText";
export function Hero() {
  return <section className="kz-hero" id="home" aria-labelledby="kz-title" data-kz-ambient>
    <div className="kz-hero-copy"><div className="kz-eyebrow kz-hero-eyebrow"><span className="kz-star" aria-hidden="true">✳</span> Independent animation, from Japan <span lang="ja">風の子</span></div>
      <h1 id="kz-title"><SplitText lines={["A little wonder.", "A world of feeling."]} /></h1>
      <p>We draw the little things.<br className="kz-mobile-break" /> And the worlds they become.</p>
      <Magnetic><a className="kz-button" href="#films"><span>Step into our stories</span><Arrow /></a></Magnetic>
    </div>
    <div className="kz-hero-landscape"><Landscape /></div>
    <div className="kz-hero-side kz-mono" aria-hidden="true">HAND-DRAWN. HEART-FELT. FRAME BY FRAME.</div>
    <div className="kz-hero-caption"><span><span className="kz-caption-dot" /> A breeze. A beginning.</span><a href="#films">Scroll, take your time <span aria-hidden="true">↓</span></a><span className="kz-mono" lang="ja">小さな物語、大きな世界。</span></div>
  </section>;
}
