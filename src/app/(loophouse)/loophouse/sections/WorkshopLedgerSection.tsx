import { HOST_DEPOTS } from "../workbench/workbench-data";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";

export function WorkshopLedgerSection() {
  return (
    <section id="ledger" className="lh-section lh-ledger-section" aria-label="Workshop Ledger and Depots">
      <div className="lh-wrap">
        <div className="lh-section-head">
          <div className="lh-kicker">NETWORK LEDGER // HOST DEPOTS &amp; BENCHES</div>
          <h2 className="lh-section-title">Community Shelf Hosts &amp; Workshop Bays</h2>
          <p className="lh-section-desc">
            Shared equipment requires shared accountability. Every host location is an active maker space with
            certified bench technicians, calibration jigs, and secure keyless locker banks.
          </p>
        </div>

        {/* Live Ledger Count-Up Meters */}
        <div className="lh-metrics-grid">
          <div className="lh-metric-card">
            <span className="lh-metric-label">TOTAL REGISTERED INVENTORY</span>
            <div className="lh-metric-number">
              <CountUp end={428} duration={1200} />
            </div>
            <span className="lh-metric-sub">Calibrated trade tools</span>
          </div>
          <div className="lh-metric-card">
            <span className="lh-metric-label">VERIFIED ON-TIME RETURN RATE</span>
            <div className="lh-metric-number">
              <CountUp end={98.4} decimals={1} suffix="%" duration={1400} />
            </div>
            <span className="lh-metric-sub">Across 1,840 loans in 2026</span>
          </div>
          <div className="lh-metric-card">
            <span className="lh-metric-label">ACTIVE WORKBENCH BAYS</span>
            <div className="lh-metric-number">
              <CountUp end={44} duration={1000} />
            </div>
            <span className="lh-metric-sub">Foundry, Millrace &amp; St. Jude</span>
          </div>
          <div className="lh-metric-card">
            <span className="lh-metric-label">MONTHLY CALIBRATION BENCH TIME</span>
            <div className="lh-metric-number">
              <CountUp end={124} suffix=" hrs" duration={1300} />
            </div>
            <span className="lh-metric-sub">Spindle &amp; blade tolerances</span>
          </div>
        </div>

        {/* 3 Host Depots */}
        <div className="lh-depots-grid">
          {HOST_DEPOTS.map((depot, idx) => (
            <Reveal key={depot.id} variant="rise" index={idx} className="lh-depot-card">
              <div className="lh-depot-head">
                <span className="lh-depot-tag">HOST DEPOT #{idx + 1}</span>
                <span className="lh-depot-dist">{depot.distanceWalk}</span>
              </div>
              <h3 className="lh-depot-name">{depot.name}</h3>
              <p className="lh-depot-addr">{depot.address}</p>
              <div className="lh-depot-meta">
                <div className="lh-depot-meta-row">
                  <span>Hours:</span>
                  <strong>{depot.hours}</strong>
                </div>
                <div className="lh-depot-meta-row">
                  <span>Capacity:</span>
                  <strong>{depot.shelfBays} Dedicated Shelf Bays</strong>
                </div>
                <div className="lh-depot-meta-row">
                  <span>Lead Technician:</span>
                  <strong>{depot.hostName}</strong>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Member Testimonials with Guild Numbers */}
        <div className="lh-quotes-grid">
          <Reveal variant="rise" index={0} className="lh-quote-card">
            <blockquote className="lh-quote-text">
              “Having a Festool Domino mortise joiner and dual track saw rails four minutes away completely changes
              what our two-person woodworking guild can build. No contractor loans, no downtime.”
            </blockquote>
            <cite className="lh-quote-cite">
              <strong>Devon Vance</strong>
              <span>Guild Badge No. 1042 · Cabinetry Specialist</span>
            </cite>
          </Reveal>

          <Reveal variant="rise" index={1} className="lh-quote-card">
            <blockquote className="lh-quote-text">
              “We needed an SDS-Plus rotary hammer and a laser elevation level for a 3-day retaining wall project.
              Reserved in two minutes, collected after breakfast, and returned clean. Pure utility.”
            </blockquote>
            <cite className="lh-quote-cite">
              <strong>Priya Patel</strong>
              <span>Guild Badge No. 0891 · Landscape Builder</span>
            </cite>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
