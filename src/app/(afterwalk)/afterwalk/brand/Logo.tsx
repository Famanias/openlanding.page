export function Logo({ light = false }: { light?: boolean }) {
  return <a className={`aw-logo${light ? " aw-logo-light" : ""}`} href="#top" aria-label="Afterwalk, back to top">
    <svg viewBox="0 0 34 34" width="34" height="34" fill="none" aria-hidden="true"><path d="M17 2.5v29M2.5 17h29M6.8 6.8l20.4 20.4M27.2 6.8 6.8 27.2" stroke="currentColor" strokeWidth="2.4"/><circle cx="17" cy="17" r="5.2" fill="currentColor"/></svg>
    <span>afterwalk<span className="aw-logo-dot">.</span></span>
  </a>;
}
