import { Flower } from "./Flower";

export function Logo({ large = false }: { large?: boolean }) {
  return <span className={`fl-logo${large ? " fl-logo--large" : ""}`}><Flower /><svg viewBox="0 0 157 82" role="img" aria-label="Flori"><text x="0" y="66" fill="currentColor" fontFamily="var(--font-flori-lora), Georgia, serif" fontSize="80" letterSpacing="-7">flori</text></svg></span>;
}
