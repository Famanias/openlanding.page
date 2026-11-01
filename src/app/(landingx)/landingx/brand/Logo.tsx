export function XMark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M8 8l32 32M40 8L8 40" stroke="currentColor" strokeWidth="5"/><path d="M24 2v8M24 38v8M2 24h8M38 24h8" stroke="currentColor" strokeWidth="1.5"/></svg>;
}
export function Logo() { return <span className="lx-logo"><XMark/><span>landing<span className="lx-logo-hyphen">—</span>x</span><small>®</small></span>; }
