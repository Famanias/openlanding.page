import { Logo } from "../brand/Logo";

export function SiteHeader() {
  return (
    <>
      <a className="tc-skip" href="#main">Skip to content</a>
      <header className="tc-header">
        <div className="tc-container tc-header-inner">
          <a href="#site" aria-label="TRUECUT Works home"><Logo /></a>
          <span className="tc-header-status"><i aria-hidden="true" /> Field engineering / safe / ready</span>
          <a className="tc-button tc-header-cta" href="#book">Book a site visit <span aria-hidden="true">↗</span></a>
        </div>
      </header>
    </>
  );
}
