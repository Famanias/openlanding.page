import {
  ArrowDown,
  ArrowUpRight,
  Check,
  NavigationArrow,
  Notebook,
} from "@phosphor-icons/react/dist/ssr";

export function ProductPanorama() {
  return (
    <section className="wyp-panorama wyp-chapter" id="overview">
      <div className="wyp-container">
        <div className="wyp-panorama-heading">
          <div>
            <p className="wyp-kicker">Find your bearings</p>
            <h2>
              Your search,
              <br />
              in one place.
            </h2>
          </div>
          <p>
            Not another tab to keep open.
            <br />A place to bring it all together.
            <br />
            <a className="wyp-text-link" href="#story">
              Follow the journey <ArrowDown size={16} />
            </a>
          </p>
        </div>
        <div className="wyp-panorama-artboard" data-panorama>
          <div className="wyp-workspace">
            <aside className="wyp-workspace-sidebar">
              <span>
                <NavigationArrow weight="fill" /> Waypoint
              </span>
              <p>My workspace</p>
              <strong>
                <span className="wyp-status-dot" /> Overview
              </strong>
              <span>My pipeline</span>
              <span>Conversations</span>
              <span>Interview notes</span>
              <div className="wyp-workspace-aside-note">
                <Notebook size={24} />
                <p>
                  A little space
                  <br />
                  for your next big move.
                </p>
              </div>
            </aside>
            <div className="wyp-workspace-content">
              <div className="wyp-workspace-header">
                <span>Your next chapter</span>
                <span>Personal workspace / Illustration</span>
              </div>
              <div className="wyp-workspace-welcome">
                <h3>
                  A clearer view of
                  <br />
                  what comes next.
                </h3>
                <p>Every possibility, with a next step.</p>
              </div>
              <div className="wyp-overview-grid grid-flow-dense">
                <div className="wyp-overview-opportunities">
                  <span className="wyp-tiny">Conversations in motion</span>
                  {[
                    {
                      name: "Linear",
                      role: "Staff Design Engineer",
                      stage: "Pitched",
                      c: "linear",
                    },
                    {
                      name: "Vercel",
                      role: "Lead Framework Architect",
                      stage: "Panel round",
                      c: "vercel",
                    },
                    {
                      name: "Anthropic",
                      role: "Research Systems",
                      stage: "Offer stage",
                      c: "anthropic",
                    },
                  ].map((c) => (
                    <div className="wyp-opportunity-row" key={c.name}>
                      <span className={`wyp-company-mark wyp-mark-${c.c}`}>
                        {c.name[0]}
                      </span>
                      <div>
                        <strong>{c.name}</strong>
                        <p>{c.role}</p>
                      </div>
                      <span>{c.stage}</span>
                    </div>
                  ))}
                </div>
                <div className="wyp-overview-next">
                  <span className="wyp-tiny">On the horizon</span>
                  <div className="wyp-date-display">
                    <strong>05</strong>
                    <span>
                      November
                      <br />
                      Wednesday
                    </span>
                  </div>
                  <h4>Architecture &amp; systems</h4>
                  <p>Anthropic · 2:00 pm</p>
                  <span className="wyp-prepared">
                    <Check size={13} /> Preparation notes, right here
                  </span>
                </div>
              </div>
              <div className="wyp-workspace-bottom">
                <span>
                  <span className="wyp-status-dot" /> One thoughtful step at a
                  time.
                </span>
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>
        </div>
        <div className="wyp-panorama-caption">
          <span>Built around your search. At your pace.</span>
          <span>Illustrative product workspace · Sample opportunities</span>
        </div>
      </div>
    </section>
  );
}
