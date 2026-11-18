import Link from "next/link";
import { Mark } from "../brand/Logo";
import { StageFloor } from "../brand/StageFloor";

const RING = "START · TAKE THE STAGE · START · TAKE THE STAGE · ";

/**
 * The foot of the page: the studio floor again, pale, held for a little while you scroll.
 * The house lights come up from the ghost light outwards, and on the stage a ring turns:
 * the whole ring is the Start key.
 */
export function Finale() {
  return (
    <footer className="us-finale" id="stage" data-scene="finale" data-tone="light">
      <div className="us-finale__stage">
        <div className="us-finale__floor" aria-hidden="true">
          <StageFloor variant="pale" />
          <div className="us-finale__lit"><StageFloor variant="lit" /></div>
          <i className="us-finale__mist" />
        </div>
        <p className="us-finale__line"><span>House lights up.</span> <span>Take the stage.</span></p>
        <a className="us-ring" href="mailto:hello@understudy.example?subject=Audition" data-us-start data-ambient>
          <svg className="us-ring__text" viewBox="0 0 200 200" aria-hidden="true">
            <defs><path id="us-ring-path" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" /></defs>
            <text><textPath href="#us-ring-path" textLength="488">{RING}</textPath></text>
          </svg>
          <span className="us-ring__core"><Mark /><span>Start</span></span>
          <span className="us-sr">Start with Understudy</span>
        </a>
        <div className="us-finale__foot">
          <div className="us-finale__cols">
            <div className="us-finale__col">
              <span className="us-mono">Rehearsal Stages</span>
              <ul className="us-finale__list">
                <li><Link href="/templates/understudy/parts">All 10 Repertoire Parts</Link></li>
                <li><Link href="/templates/understudy/parts/product-designer">Product Design Brief</Link></li>
                <li><Link href="/templates/understudy/parts/ai-engineer">AI Engineer Brief</Link></li>
                <li><Link href="/templates/understudy/casting">18 Partner Companies</Link></li>
              </ul>
            </div>
            <div className="us-finale__col">
              <span className="us-mono">The Method</span>
              <ul className="us-finale__list">
                <li><Link href="/templates/understudy/method">Four-Act Production Method</Link></li>
                <li><Link href="/templates/understudy/method#faq">Studio &amp; Director FAQ</Link></li>
                <li><Link href="/templates/understudy#rehearsal">Rehearsal Stage</Link></li>
                <li><Link href="/templates/understudy">Studio Home</Link></li>
              </ul>
            </div>
            <div className="us-finale__col">
              <span className="us-mono">Studio Cast</span>
              <ul className="us-finale__list">
                <li><Link href="/templates/understudy/casting">3,400+ Casting Studios</Link></li>
                <li><Link href="/templates/understudy/tuition">Tuition &amp; Term Sheet</Link></li>
                <li><a href="mailto:director@understudy.example" data-us-ask>Audition Inquiries</a></li>
                <li><button type="button" data-us-start style={{ textAlign: "left" }}>Book Opening Night</button></li>
              </ul>
            </div>
          </div>
          <div className="us-finale__row">
            <nav className="us-finale__legal" aria-label="Legal">
              <a href="#top" data-us-go="top">Back to the top</a>
              <a href="mailto:hello@understudy.example">hello@understudy.example</a>
              <span>© 2026 Understudy · a fictional brand for a multi-page studio showcase</span>
            </nav>
            <nav className="us-finale__social" aria-label="Understudy pages">
              <Link href="/templates/understudy/parts">Parts</Link>
              <Link href="/templates/understudy/method">Method</Link>
              <Link href="/templates/understudy/casting">Casting</Link>
              <Link href="/templates/understudy/tuition">Tuition</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
