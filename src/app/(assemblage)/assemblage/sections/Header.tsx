import { Logo } from "../brand/Logo";

export function Header() {
  return (
    <header className="as-header" data-as-reveal="header">
      <div className="as-header-inner">
        <a className="as-header-logo" href="#top" aria-label="Assemblage home"><Logo /></a>
        <nav className="as-nav" aria-label="Primary navigation">
          <a href="#process">The method</a>
          <a href="#materials">Materials</a>
          <a href="#faq">Questions</a>
        </nav>
        <a className="as-button as-button--small" href="#request">Request a study <span aria-hidden="true">↗</span></a>
      </div>
      <span className="as-progress" aria-hidden="true"><span className="as-progress-bar" /></span>
    </header>
  );
}
