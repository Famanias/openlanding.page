import { Logo } from "../brand/Logo";

export function Footer() {
  return (
    <footer className="py-16 sm:py-24 bg-[var(--color-oud)] text-[var(--color-calcaire)] vr-dark border-t border-[color-mix(in_srgb,var(--color-ash)_25%,transparent)]">
      <div className="vr-wrap flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b border-[color-mix(in_srgb,var(--color-ash)_30%,transparent)]">
          <div>
            <Logo width={220} height={52} className="mb-4" />
            <p className="vr-serif text-lg text-[var(--color-gilt)] italic font-normal m-0">
              Composed slowly. Worn for hours.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 vr-mono text-xs opacity-90">
            <a href="#drydown" className="hover:text-[var(--color-gilt)] transition-colors">
              The Dry-Down
            </a>
            <a href="#hours" className="hover:text-[var(--color-gilt)] transition-colors">
              The Hours
            </a>
            <a href="#organ" className="hover:text-[var(--color-gilt)] transition-colors">
              The Organ
            </a>
            <a href="#atelier" className="hover:text-[var(--color-gilt)] transition-colors">
              Atelier
            </a>
            <a href="#appointment" className="hover:text-[var(--color-gilt)] transition-colors">
              Appointments
            </a>
            <a href="#top" className="hover:text-[var(--color-gilt)] transition-colors ml-4">
              ↑ Top
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-baseline gap-4 vr-mono text-[11px] opacity-90">
          <div>
            © 2026 Maison Vérane Parfums · 40 Rue de l&apos;Oratoire, 06130 Grasse, France.
          </div>
          <div>
            Single-batch perfumery · 400 numbered flacons per edition.
          </div>
        </div>
      </div>
    </footer>
  );
}
