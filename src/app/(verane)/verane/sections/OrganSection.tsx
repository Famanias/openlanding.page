import { Eyebrow } from "./Eyebrow";
import { OrganComposer } from "../organ/OrganComposer";

export function OrganSection() {
  return (
    <section id="organ" className="py-24 sm:py-32 bg-[var(--color-calcaire)] border-t border-b border-[var(--rule-color)]">
      <div className="vr-wrap">
        <Eyebrow sectionNumber="§ 04" title="The Perfumer's Organ" />

        <div className="max-w-3xl mb-14">
          <h2 className="vr-serif text-3xl sm:text-5xl font-normal text-[var(--color-oud)] leading-tight mb-4">
            The Organ: compose your own{" "}
            <em className="text-[var(--color-oud)] font-medium not-italic">
              dry-down.
            </em>
          </h2>

          <p className="text-base sm:text-lg font-light leading-relaxed text-[var(--color-oud)]">
            A perfumer creates seated at an <em>orgue</em> — stepped semi-circular shelves of single distillations.
            Select one botanical harvest from each tier to assemble a bespoke accord, observe its batch code,
            and inspect how its sillage evolves through twelve hours.
          </p>
        </div>

        <OrganComposer />
      </div>
    </section>
  );
}
