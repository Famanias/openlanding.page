import { Reveal } from "../motion/Reveal";

const STATIONS = [
  {
    step: "01",
    title: "Requisition & Hold",
    tag: "STATION 01 // DIGITAL MANIFEST",
    description:
      "Filter the pegboard wall or select a curated field pack. Lock your 1 to 14-day build window with zero deposit for active guild members.",
    detail: "Real-time shelf inventory holds your kit for up to 24 hours prior to collection.",
  },
  {
    step: "02",
    title: "Locker or Bench Pickup",
    tag: "STATION 02 // LOCAL DEPOT",
    description:
      "Walk 6 minutes to Foundry Way, Millrace, or St. Jude Arch. Access your assigned smart bay with your member PIN or consult the volunteer benchmaster.",
    detail: "Every kit is handed over in a heavy-duty weather-sealed Systainer with complete bit sets.",
  },
  {
    step: "03",
    title: "Make, Cut & Build",
    tag: "STATION 03 // ACTIVE LOAN",
    description:
      "Tackle your joinery, timber framing, masonry boring, or electrical tracing with industrial-grade precision. Keep your project moving on schedule.",
    detail: "Extend loan periods with a single tap if no neighbor is queued behind your reservation.",
  },
  {
    step: "04",
    title: "Calibrated Check & Return",
    tag: "STATION 04 // MAINTENANCE LOG",
    description:
      "Return clean to the depot shelf. Our bench technician checks runout tolerances, inspects carbide blades, and tests battery cell health.",
    detail: "98.4% of equipment is verified and re-docked on the pegboard within 35 minutes.",
  },
];

export function CirculationRoute() {
  return (
    <section id="route" className="lh-section lh-route-section" aria-label="Tool Circulation Route">
      <div className="lh-wrap">
        <div className="lh-section-head">
          <div className="lh-kicker">CIRCULATION WORKFLOW // FOUR STOPS</div>
          <h2 className="lh-section-title">How a Borrow Travels Through the Block</h2>
          <p className="lh-section-desc">
            No centralized warehouses, no plastic courier packaging, no delivery vans idling on residential streets.
            Tools stay in tight local rotation between community makers and certified neighborhood shelves.
          </p>
        </div>

        {/* 4-Step Route Connector */}
        <div className="lh-route-grid">
          {STATIONS.map((st, idx) => (
            <Reveal key={st.step} variant="rise" index={idx} className="lh-route-card">
              <div className="lh-route-card-head">
                <span className="lh-route-badge">{st.step}</span>
                <span className="lh-route-tag">{st.tag}</span>
              </div>
              <h3 className="lh-route-title">{st.title}</h3>
              <p className="lh-route-desc">{st.description}</p>
              <div className="lh-route-detail-box">
                <span className="lh-detail-bullet">↳</span>
                <p className="lh-detail-text">{st.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
