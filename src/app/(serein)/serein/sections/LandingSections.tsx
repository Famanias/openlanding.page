import { ForecastStrip } from "./ForecastStrip";
import { PANELS, PanelContent } from "./Panels";

function sectionPanel(id: (typeof PANELS)[number]["id"]) {
  return PANELS.find((panel) => panel.id === id)!;
}

export function LandingSections() {
  const bureau = sectionPanel("bureau");
  const instruments = sectionPanel("instruments");
  const notes = sectionPanel("notes");
  const dispatch = sectionPanel("dispatch");
  const subscribe = sectionPanel("subscribe");

  return (
    <>
      <section id="bureau" className="sr-landing-section sr-landing-section--lavender">
        <div className="sr-panel__inner"><PanelContent panel={bureau} /></div>
      </section>
      <section id="instruments" className="sr-landing-section">
        <div className="sr-panel__inner"><PanelContent panel={instruments} /></div>
      </section>
      <section id="forecast" className="sr-landing-section sr-landing-section--seafoam">
        <div className="sr-panel__inner">
          <div className="sr-panel__header">
            <div className="sr-folio"><span>Desk 04 of 07</span><span>SR-07 / trace</span></div>
            <h2 id="forecast-title" className="sr-panel__title">Read the pressure line.</h2>
            <p className="sr-panel__intro">Three moments from the same day. Choose a window and follow the front as it moves across the city.</p>
          </div>
          <ForecastStrip />
        </div>
      </section>
      <section id="notes" className="sr-landing-section">
        <div className="sr-panel__inner"><PanelContent panel={notes} /></div>
      </section>
      <section id="dispatch" className="sr-landing-section sr-landing-section--lavender">
        <div className="sr-panel__inner"><PanelContent panel={dispatch} /></div>
      </section>
      <section id="subscribe" className="sr-landing-section sr-landing-section--ink">
        <div className="sr-panel__inner"><PanelContent panel={subscribe} /></div>
      </section>
    </>
  );
}
