export function Mark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 38 38" fill="none" aria-hidden="true"><path d="M4 25.5C10 12 18.4 6 33.5 6" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/><path d="M4 33C12 20.5 22 16 33.5 16" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg>;
}

export function Logo() {
  return <a href="#top" className="asc-logo"><Mark/><span>arc<span className="asc-logo-amp">&</span>signal<span className="asc-logo-dot">.</span></span></a>;
}
