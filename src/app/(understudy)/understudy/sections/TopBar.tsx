import { Logo } from "../brand/Logo";
import { LiveCount } from "../motion/LiveCount";

/**
 * The top masthead: brand lockup, primary section navigation, live readout,
 * and quick-action audition triggers. Confident, distinct, and functional.
 */
export function TopBar() {
  return (
    <header className="us-top">
      <div className="us-top__brand">
        <a className="us-top__logo" href="#top" data-us-go="top" aria-label="Understudy home">
          <Logo />
        </a>
        <span className="us-top__badge us-mono" aria-hidden="true">Season 2026</span>
      </div>

      <nav className="us-top__nav" aria-label="Main navigation">
        <a className="us-top__link" href="#parts" data-us-go="parts">Repertoire</a>
        <a className="us-top__link" href="#rehearsal" data-us-go="rehearsal">Method</a>
        <a className="us-top__link" href="#casting" data-us-go="casting">Casting</a>
        <a className="us-top__link" href="#pricing" data-us-go="pricing">Tuition</a>
      </nav>

      <div className="us-top__actions">
        <p className="us-live" data-ambient>
          <i className="us-live__dot" aria-hidden="true" />
          <span className="us-mono">Rehearsing now</span>
          <LiveCount />
        </p>
        <button type="button" className="us-btn us-btn--cue us-btn--sm us-top__audition" data-us-start>
          <span className="us-roll" data-text="Audition"><span>Audition</span></span>
        </button>
      </div>
    </header>
  );
}

