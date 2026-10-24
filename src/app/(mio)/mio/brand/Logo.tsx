export function Logo({ mark = false }: { mark?: boolean }) {
  return <span className="mh-logo"><svg width="39" height="42" viewBox="0 0 44 48" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M17 5q5-4 10 0l4 21q-9 5-18 0Z"/><path d="M17 5q5 3 10 0M13 26q9-3 18 0M22 7v18m0 7q-5 4 0 8M3 39q6-5 12 0t12 0 14 0M8 45q7-4 14 0t14 0"/><path d="m36 5 1 3 3 1-3 1-1 3-1-3-3-1 3-1Z" fill="currentColor" stroke="none"/></svg>{!mark && <span>mio hazuki<span className="mh-logo-caption">ILLUSTRATION & LITTLE WORLDS</span></span>}</span>;
}
