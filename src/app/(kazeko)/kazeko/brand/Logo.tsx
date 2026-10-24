export function BirdMark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 64 48" fill="none" aria-hidden="true">
    <path d="m5 22 25 4L48 5l-8 23 18-7-12 13-16-3-12 12 4-16Z" fill="currentColor" />
    <path d="m30 26 10 2M22 27l8 4" stroke="var(--color-paper)" strokeWidth="1.3" />
    <path d="M2 33h10M7 38h5" stroke="currentColor" strokeLinecap="round" />
  </svg>;
}

export function Logo() {
  return <a className="kz-logo" href="#home" aria-label="Studio Kazeko home"><BirdMark /><span><span className="kz-logo-small">STUDIO</span><span className="kz-logo-name">kazeko<span className="kz-logo-dot">.</span></span></span></a>;
}
