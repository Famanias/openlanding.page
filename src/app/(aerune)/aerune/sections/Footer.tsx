import { Logo } from "../brand/Logo";

export function Footer() {
  return <footer className="ar-footer"><div className="ar-footer__top"><div><Logo /><p>Make room for better air.</p></div><nav aria-label="Footer navigation"><a href="#air-demo">The live demo</a><a href="#platform">Platform</a><a href="#approach">How it works</a><a href="#faq">Questions</a></nav><a className="ar-footer__toplink" href="#top">Back to top ↑</a></div><div className="ar-footer__large" aria-hidden="true">aerune<span>.</span></div><div className="ar-footer__bottom"><span>© 2026 AERUNE / A FICTIONAL CONCEPT</span><span>THE AIR HAS A STORY</span><span>MADE FOR THE PLACES WE SHARE</span></div></footer>;
}
