import { ATELIER_METRICS, MACERATION_LEDGER } from "../content/atelier";
import { Eyebrow } from "./Eyebrow";
import { Picture } from "../assets";

export function Atelier() {
  return (
    <section id="atelier" className="py-24 sm:py-32 bg-[var(--color-calcaire)]">
      <div className="vr-wrap">
        <Eyebrow sectionNumber="§ 05" title="The Atelier in Grasse" />

        <div className="max-w-3xl mb-16">
          <h2 className="vr-serif text-3xl sm:text-5xl font-normal text-[var(--color-oud)] leading-tight mb-6">
            Patience, measured in{" "}
            <em className="text-[var(--color-orris)] not-italic font-normal">
              eighteen months.
            </em>
          </h2>

          <p className="text-lg font-light leading-relaxed text-[var(--color-ash)]">
            Located on Rue de l&apos;Oratoire, our workshop operates without commercial production schedules.
            Distillates are compounded in small glass carboys, then poured into Limousin oak barrels
            to soften ethanol edges and allow the resinous molecules to harmonize.
          </p>
        </div>

        {/* 4 Metrics in Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ATELIER_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="p-6 sm:p-8 bg-[var(--color-calcaire)] border border-[var(--rule-color)] flex flex-col justify-between rounded-2xl"
            >
              <div className="vr-serif text-4xl sm:text-5xl text-[var(--color-oud)] mb-3">
                {metric.number}
              </div>
              <div>
                <h3 className="vr-mono text-xs font-semibold text-[var(--color-oud)] uppercase mb-2">
                  {metric.label}
                </h3>
                <p className="text-xs font-light text-[var(--color-ash)] leading-relaxed m-0">
                  {metric.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Three Craft Photography Plates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="flex flex-col">
            <div className="aspect-[4/3] border border-[var(--rule-color)] overflow-hidden bg-[var(--color-veil)] rounded-2xl">
              <Picture
                assetKey="orris-roots"
                alt="Florentine and Grasse orris roots curing on open wooden racks"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="vr-mono text-[10px] text-[var(--color-ash)] font-medium mt-2.5">
              Fig. 01 — Aged Iris pallida rhizomes cured 36 months
            </span>
          </div>

          <div className="flex flex-col">
            <div className="aspect-[4/3] border border-[var(--rule-color)] overflow-hidden bg-[var(--color-veil)] rounded-2xl">
              <Picture
                assetKey="hands-scale"
                alt="Artisan hands weighing raw resin tears on mechanical brass scale"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="vr-mono text-[10px] text-[var(--color-ash)] font-medium mt-2.5">
              Fig. 02 — Precision weighing of Cistus labdanum tears
            </span>
          </div>

          <div className="flex flex-col">
            <div className="aspect-[4/3] border border-[var(--rule-color)] overflow-hidden bg-[var(--color-veil)] rounded-2xl">
              <Picture
                assetKey="oak-casks"
                alt="Limousin oak barrels resting in dim stone aging cellar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="vr-mono text-[10px] text-[var(--color-ash)] font-medium mt-2.5">
              Fig. 03 — 50-litre oak casks in the Rue de l&apos;Oratoire cellar
            </span>
          </div>
        </div>

        {/* Maceration Ledger Table */}
        <div className="border border-[var(--rule-color)] bg-[var(--color-calcaire)] p-6 sm:p-10 mb-20 rounded-2xl">
          <div className="flex flex-col sm:flex-row justify-between sm:items-baseline border-b border-[var(--rule-color)] pb-4 mb-6">
            <div>
              <span className="vr-mono text-xs text-[var(--color-oud)] font-semibold uppercase block mb-1">
                Cellar Archive
              </span>
              <h3 className="vr-serif text-2xl font-normal text-[var(--color-oud)] m-0">
                The Maceration Ledger
              </h3>
            </div>
            <span className="vr-mono text-xs text-[var(--color-ash)] font-medium mt-2 sm:mt-0">
              Audited Grasse Registry · Vol. VII
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[var(--rule-color)] vr-mono text-[11px] text-[var(--color-ash)] font-medium">
                  <th className="py-3 pr-4 font-normal">Edition</th>
                  <th className="py-3 px-4 font-normal">Vintage</th>
                  <th className="py-3 px-4 font-normal">Cask ID</th>
                  <th className="py-3 px-4 font-normal">Key Terroir</th>
                  <th className="py-3 px-4 font-normal">Bottling</th>
                  <th className="py-3 px-4 font-normal">Allocation</th>
                  <th className="py-3 pl-4 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--rule-color)] font-light text-[var(--color-oud)]">
                {MACERATION_LEDGER.map((entry) => (
                  <tr key={entry.edition} className="hover:bg-[color-mix(in_srgb,var(--color-veil)_50%,transparent)]">
                    <td className="py-4 pr-4 font-medium text-[var(--color-oud)]">
                      {entry.edition}
                    </td>
                    <td className="py-4 px-4">{entry.vintage}</td>
                    <td className="py-4 px-4 vr-mono text-xs">{entry.caskId}</td>
                    <td className="py-4 px-4">{entry.source}</td>
                    <td className="py-4 px-4">{entry.bottledDate}</td>
                    <td className="py-4 px-4 vr-mono text-xs">{entry.flacons} btl</td>
                    <td className="py-4 pl-4">
                      <span className="vr-stamp rounded-md text-[10px]">
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Full-width Iris Fields Banner */}
        <div className="relative overflow-hidden border border-[var(--rule-color)] aspect-[21/9] rounded-2xl">
          <Picture
            assetKey="iris-fields"
            alt="Terraced iris fields in Grasse morning mist"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-[var(--color-oud)] border border-[color-mix(in_srgb,var(--color-ash)_40%,transparent)] px-4 py-2 sm:px-6 sm:py-3 text-[var(--color-calcaire)] rounded-xl">
            <span className="vr-mono text-[10px] text-[var(--color-gilt)] uppercase block">
              Fieldwork
            </span>
            <span className="vr-serif text-sm sm:text-base">
              Dawn harvest of <em>Iris pallida</em> · Collines de Grasse
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
