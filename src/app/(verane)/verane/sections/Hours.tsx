import { FRAGRANCES } from "../content/fragrances";
import { Eyebrow } from "./Eyebrow";
import { FragranceCard } from "./FragranceCard";

export function Hours() {
  return (
    <section id="hours" className="py-24 sm:py-32 bg-[var(--color-calcaire)]">
      <div className="vr-wrap">
        <Eyebrow sectionNumber="§ 03" title="The Annual Editions" />

        <div className="max-w-3xl mb-16">
          <h2 className="vr-serif text-3xl sm:text-5xl font-normal text-[var(--color-oud)] leading-tight mb-6">
            Four flacons composed with the{" "}
            <em className="text-[var(--color-orris)] not-italic font-normal">
              turning seasons.
            </em>
          </h2>

          <p className="text-lg font-light leading-relaxed text-[var(--color-ash)]">
            We do not maintain a permanent commercial catalogue. Every year in Grasse, we
            formulate exactly four editions in batches of four hundred numbered bottles.
            Once an edition is claimed, the formula is catalogued and retired into the cellar vault.
          </p>
        </div>

        {/* 4 Fragrance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FRAGRANCES.map((fragrance) => (
            <FragranceCard key={fragrance.slug} fragrance={fragrance} />
          ))}
        </div>
      </div>
    </section>
  );
}
