export function Mark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 3c1.9 8.4 5.6 12.1 14 14-8.4 1.9-12.1 5.6-14 14C18.1 22.6 14.4 18.9 6 17 14.4 15.1 18.1 11.4 20 3Z" fill="currentColor"/><path d="M30.5 24c.8 3.5 2.2 4.9 5.5 5.5-3.3.7-4.7 2.1-5.5 5.5-.7-3.4-2.1-4.8-5.5-5.5 3.4-.6 4.8-2 5.5-5.5Z" fill="currentColor"/></svg>;
}
export function Logo() { return <span className="avl-logo"><Mark /><span>avel</span><span className="avl-logo-dot">.</span></span>; }
