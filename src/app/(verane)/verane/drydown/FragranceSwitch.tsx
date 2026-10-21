import { FRAGRANCES, type Fragrance } from "../content/fragrances";

interface FragranceSwitchProps {
  activeSlug: string;
  onSelect: (slug: string) => void;
  className?: string;
}

export function FragranceSwitch({
  activeSlug,
  onSelect,
  className = "",
}: FragranceSwitchProps) {
  return (
    <div
      role="tablist"
      aria-label="Select perfume for dry-down simulation"
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {FRAGRANCES.map((f: Fragrance) => {
        const isSelected = f.slug === activeSlug;
        return (
          <button
            key={f.slug}
            id={`drydown-tab-${f.slug}`}
            role="tab"
            aria-selected={isSelected}
            aria-controls="drydown-panel"
            onClick={() => onSelect(f.slug)}
            className={`px-3.5 py-1.5 vr-mono text-xs cursor-pointer border rounded-full transition-all duration-150 ${
              isSelected
                ? "bg-[var(--color-orris)] text-[var(--color-calcaire)] border-[var(--color-orris)] font-semibold"
                : "bg-transparent text-[var(--color-calcaire)] border-[color-mix(in_srgb,var(--color-calcaire)_30%,transparent)] hover:border-[var(--color-calcaire)] opacity-85 hover:opacity-100"
            }`}
          >
            <span>{f.number}</span> <span className="ml-1">{f.title}</span>
          </button>
        );
      })}
    </div>
  );
}
