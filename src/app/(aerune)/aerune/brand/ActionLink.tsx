export function ActionLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <a className={`ar-action${light ? " ar-action--light" : ""}`} href={href}><span>{children}</span><span className="ar-action__arrow" aria-hidden="true">↗</span></a>;
}
