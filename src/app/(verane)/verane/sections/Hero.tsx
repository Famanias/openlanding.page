import { Picture } from "../assets";

export function Hero() {
  return (
    <section className="vr-hero">
      {/* Background Photography (16:9 full-bleed) with responsive cover */}
      <div className="vr-hero__bg" aria-hidden="true">
        <Picture
          assetKey="hero-flacon"
          alt="Maison Vérane crystal flacon on honed limestone plinth in quiet northern daylight"
          priority
          sizes="100vw"
          className="w-full h-full"
          dark
        />
      </div>

      <div className="vr-wrap relative z-10">
        <div className="max-w-2xl flex flex-col items-start">
          <div className="vr-mono text-xs text-[var(--color-gilt)] uppercase mb-4 tracking-[0.2em]">
            Maison Vérane · Grasse · Édition 07
          </div>

          <h1 className="vr-serif text-4xl sm:text-6xl lg:text-7xl leading-[0.98] font-normal tracking-tight text-[var(--color-calcaire)] mb-6">
            A fragrance is{" "}
            <em className="text-[var(--color-gilt)] italic font-normal">
              twelve hours long.
            </em>
          </h1>

          <p className="text-lg sm:text-xl font-light leading-relaxed text-[var(--color-calcaire)] opacity-90 max-w-xl mb-8">
            We compose four perfumes a year and rest each in small oak casks for
            eighteen months. Scroll to observe the opening top notes disperse, the
            heart bloom, and the quiet resinous base cling to skin until dawn.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#appointment" className="vr-btn vr-btn--orris">
              Request an Appointment
            </a>
            <a href="#drydown" className="vr-btn vr-btn--outline-dark">
              Observe the Dry-Down ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
