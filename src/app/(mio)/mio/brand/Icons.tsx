import type { SVGProps } from "react";
type Props = SVGProps<SVGSVGElement>;
export function Arrow({ className, ...props }: Props) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}
export function Star({ className, ...props }: Props) {
  return <svg className={className} width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...props}><path d="m16 2 3.6 10.4L30 16l-10.4 3.6L16 30l-3.6-10.4L2 16l10.4-3.6Z" /></svg>;
}
export function Lantern({ className, ...props }: Props) {
  return <svg className={className} width="48" height="64" viewBox="0 0 48 64" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...props}><path d="M14 8q10-8 20 0l5 29q-15 10-30 0Z" fill="currentColor" fillOpacity=".12"/><path d="M14 8q10 4 20 0M9 37q15-6 30 0M20 7l-3 30m11-30 3 30M19 43q-7 9 2 15m8-15q8 9 1 17"/></svg>;
}
