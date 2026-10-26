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
                <li><a href="#parts" data-us-go="parts">Engineering Repertoire</a></li>
                <li><a href="#parts" data-us-go="parts">Design & Product Parts</a></li>
                <li><a href="#parts" data-us-go="parts">Growth & Operations</a></li>
                <li><a href="#parts" data-us-go="parts">18 Partner Companies</a></li>
              </ul>
            </div>
            <div className="us-finale__col">
              <span className="us-mono">The Method</span>
              <ul className="us-finale__list">
                <li><a href="#rehearsal" data-us-go="rehearsal">Act I: The Lot</a></li>
                <li><a href="#rehearsal" data-us-go="rehearsal">Act II: The Cast</a></li>
                <li><a href="#rehearsal" data-us-go="rehearsal">Act III: The Notes</a></li>
                <li><a href="#rehearsal" data-us-go="rehearsal">Act IV: The Reel</a></li>
              </ul>
            </div>
            <div className="us-finale__col">
              <span className="us-mono">Studio Cast</span>
              <ul className="us-finale__list">
                <li><a href="#casting" data-us-go="casting">3,400+ Casting Studios</a></li>
                <li><a href="#pricing" data-us-go="pricing">Tuition & Term Sheet</a></li>
                <li><a href="mailto:director@understudy.example" data-us-ask>Audition Inquiries</a></li>
                <li><a href="https://example.com/understudy/jobs">Directors Wanted</a></li>
              </ul>
            </div>
          </div>
          <div className="us-finale__row">
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
      </div>
    </footer>
  );
}
