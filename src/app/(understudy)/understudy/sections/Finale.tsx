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
          <nav className="us-finale__legal" aria-label="Legal">
            <a href="#top" data-us-go="top">Back to the top</a>
            <a href="mailto:hello@understudy.example">hello@understudy.example</a>
            <span>© 2026 Understudy · a fictional brand for a landing-page template</span>
          </nav>
          <nav className="us-finale__social" aria-label="Understudy elsewhere">
            <a href="https://example.com/understudy/letters">Letters</a>
            <a href="https://example.com/understudy/press">Press</a>
            <a href="https://example.com/understudy/jobs">Directors wanted</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
