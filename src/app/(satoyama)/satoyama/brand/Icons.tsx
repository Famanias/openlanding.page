export function Arrow({ direction = "right" }: { direction?: "right" | "left" }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transform: direction === "left" ? "rotate(180deg)" : undefined }}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Leaf({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M25 5C9 4 4 12 8 22c11 5 19-3 17-17Z" fill="currentColor" opacity=".18" /><path d="M6 27 23 8M11 21l-1-8m6 3 7 1M25 5C9 4 4 12 8 22c11 5 19-3 17-17Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function PauseIcon({ paused }: { paused: boolean }) {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">{paused ? <path d="m7 4 9 6-9 6V4Z" fill="currentColor" /> : <><path d="M7 4v12M13 4v12" stroke="currentColor" strokeWidth="2" /></>}</svg>;
}
