export function Logo({ compact = false }: { compact?: boolean }) {
  return <span className="gs-logo"><svg aria-hidden="true" viewBox="0 0 42 42"><path d="M4 36V6h34v30h-6V12H10v24z" fill="currentColor"/><path d="M14 36V18h14v18h-5V23h-4v13z" fill="currentColor"/></svg>{!compact && <span>GRANDSTAND<span className="gs-logo-dot">.</span></span>}</span>;
}
