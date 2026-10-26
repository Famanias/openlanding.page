import { Logo } from "../brand/Logo";
import { LiveCount } from "../motion/LiveCount";

/** The top of the screen: the lockup and a live readout. Its ink flips on the dark house. */
export function TopBar() {
  return (
    <header className="us-top">
      <a className="us-top__logo" href="#top" data-us-go="top"><Logo /></a>
      <p className="us-live" data-ambient>
        <i className="us-live__dot" aria-hidden="true" />
        <span className="us-mono">Rehearsing now</span>
        <LiveCount />
      </p>
    </header>
  );
}
