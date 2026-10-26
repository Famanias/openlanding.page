import { Logo } from "../brand/Logo";
import { Arrow } from "../brand/Arrow";
export function Footer() {
  return (
    <footer className="fd-footer fd-wrap">
      <div className="fd-footer-top">
        <a href="#top" aria-label="Firstday back to top">
          <Logo />
        </a>
        <p>
          A little experience
          <br />
          changes everything.
        </p>
        <a href="#top" className="fd-text-link">
          Back to the beginning <Arrow diagonal />
        </a>
      </div>
      <div className="fd-footer-word" aria-hidden="true">
        firstday<span>®</span>
      </div>
      <div className="fd-footer-bottom">
        <span>© 2026 FIRSTDAY. A fictional world, made for possibility.</span>
        <span>
          Dream a little. Do a little. <span aria-hidden="true">✳</span>
        </span>
      </div>
    </footer>
  );
}
