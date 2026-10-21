import { Eyebrow } from "./Eyebrow";
import { AppointmentForm } from "../forms/AppointmentForm";
import { Picture } from "../assets";

export function Appointments() {
  return (
    <section id="appointment" className="py-24 sm:py-32 bg-[var(--color-oud)] text-[var(--color-calcaire)] vr-dark border-t border-[color-mix(in_srgb,var(--color-ash)_30%,transparent)]">
      <div className="vr-wrap">
        <Eyebrow sectionNumber="§ 06" title="Private Consultations" light />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Left Column: Salon atmosphere & Information (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div>
              <h2 className="vr-serif text-3xl sm:text-5xl font-normal text-[var(--color-calcaire)] leading-tight mb-6">
                The Salon on{" "}
                <em className="text-[var(--color-gilt)] not-italic font-normal">
                  Rue de l&apos;Oratoire.
                </em>
              </h2>

              <p className="text-base sm:text-lg font-light leading-relaxed opacity-85 mb-4">
                Consultations are held privately in our Grasse townhouse. We do not spray on paper cards.
                Each formula is applied directly to warm skin, and we observe the dry-down over ninety
                minutes with cold mountain water and silence.
              </p>

              <p className="text-sm font-light leading-relaxed opacity-90">
                You leave with your bespoke formulation ledger and a numbered flacon from the current edition.
              </p>
            </div>

            {/* Salon Interior Photo */}
            <div className="border border-[color-mix(in_srgb,var(--color-ash)_35%,transparent)] overflow-hidden aspect-[16/9] rounded-2xl">
              <Picture
                assetKey="salon"
                alt="Quiet stone consultation table in the Grasse salon with natural northern window light"
                dark
                className="w-full h-full object-cover"
              />
            </div>

            {/* Practical Details */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[color-mix(in_srgb,var(--color-ash)_30%,transparent)]">
              <div>
                <span className="vr-mono text-xs text-[var(--color-gilt)] uppercase block mb-1">
                  Location
                </span>
                <p className="text-xs font-light opacity-90 leading-relaxed m-0">
                  40 Rue de l&apos;Oratoire<br />
                  06130 Grasse, France
                </p>
              </div>

              <div>
                <span className="vr-mono text-xs text-[var(--color-gilt)] uppercase block mb-1">
                  Hours
                </span>
                <p className="text-xs font-light opacity-90 leading-relaxed m-0">
                  Mardi – Samedi<br />
                  10h00 – 18h00 (Sur rendez-vous)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Appointment Form (6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 border border-[color-mix(in_srgb,var(--color-ash)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-oud)_60%,black)] rounded-2xl">
            <div className="mb-6 pb-4 border-b border-[color-mix(in_srgb,var(--color-ash)_30%,transparent)]">
              <span className="vr-mono text-xs text-[var(--color-gilt)] uppercase block mb-1">
                Registry Reservation
              </span>
              <h3 className="vr-serif text-2xl font-normal text-[var(--color-calcaire)] m-0">
                Request Private Consultation
              </h3>
            </div>

            <AppointmentForm />
          </div>
        </div>
      </div>
    </section>
  );
}
