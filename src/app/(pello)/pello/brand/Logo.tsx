export function Logo({ mark = false, className = "" }: { mark?: boolean; className?: string }) {
  return <span className={"pel-logo " + className} aria-label="Pello"><svg viewBox="0 0 64 64" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" d="M14 52V17a5 5 0 0 1 5-5h15a17 17 0 1 1 0 34H24v6H14Zm10-30v14h10a7 7 0 1 0 0-14H24Z"/><circle cx="47" cy="50" r="6" className="pel-logo-dot"/></svg>{!mark && <span>pello</span>}</span>;
}
