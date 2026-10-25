import { Reveal } from "../motion/Reveal";
import { Subscribe } from "../forms/Subscribe";

export type PanelKey = "outlook" | "bureau" | "instruments" | "forecast" | "notes" | "dispatch" | "subscribe";

export type PanelSpec = {
  id: PanelKey;
  label: string;
  eyebrow: string;
  code: string;
  tone: "paper" | "seafoam" | "lavender" | "ink";
};

export const PANELS: PanelSpec[] = [
  { id: "outlook", label: "Today's outlook", eyebrow: "Desk 01 of 07", code: "SR-07 / 08:10", tone: "paper" },
  { id: "bureau", label: "The bureau note", eyebrow: "Desk 02 of 07", code: "SR-07 / note", tone: "lavender" },
  { id: "instruments", label: "Instruments", eyebrow: "Desk 03 of 07", code: "SR-07 / tools", tone: "paper" },
  { id: "forecast", label: "The forecast strip", eyebrow: "Desk 04 of 07", code: "SR-07 / trace", tone: "seafoam" },
  { id: "notes", label: "Field notes", eyebrow: "Desk 05 of 07", code: "SR-07 / field", tone: "paper" },
  { id: "dispatch", label: "Dispatch index", eyebrow: "Desk 06 of 07", code: "SR-07 / index", tone: "lavender" },
  { id: "subscribe", label: "Subscribe", eyebrow: "Desk 07 of 07", code: "SR-07 / send", tone: "ink" },
];

function Folio({ panel }: { panel: PanelSpec }) {
  return (
    <div className="sr-folio">
      <span>{panel.eyebrow}</span>
      <span>{panel.code}</span>
    </div>
  );
}

function CloudGlyph({ variant = "cloud" }: { variant?: "cloud" | "rain" | "sun" }) {
  return (
    <svg className={`sr-cloud sr-cloud--${variant}`} viewBox="0 0 320 190" role="img" aria-label={`${variant} weather glyph`}>
      {variant === "sun" ? (
        <>
          <circle cx="160" cy="92" r="48" fill="var(--sr-lavender)" />
          <g fill="none" stroke="var(--sr-ink)" strokeWidth="3" strokeLinecap="round">
            <path d="M160 22v20M160 142v20M90 92H70M250 92h-20M111 43 96 28M209 43l15-15M111 141l-15 15M209 141l15 15" />
          </g>
        </>
      ) : (
        <>
          <path d="M57 132c-13-24 4-53 33-53 10-30 54-43 80-14 38-11 69 14 69 46 31 0 48 18 48 38H62c-12 0-20-7-5-17Z" fill="var(--sr-paper)" stroke="var(--sr-ink)" strokeWidth="3" />
          {variant === "rain" && (
            <g stroke="var(--sr-seafoam)" strokeWidth="4" strokeLinecap="round">
              <path d="M105 155v20M154 155v20M203 155v20" />
            </g>
          )}
        </>
      )}
    </svg>
  );
}

function IsobarField() {
  return (
    <svg className="sr-isobar" viewBox="0 0 680 330" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity=".24">
        <path d="M0 42c120-52 215 52 345 0s220 56 335 0" />
        <path d="M0 100c120-52 215 52 345 0s220 56 335 0" />
        <path d="M0 158c120-52 215 52 345 0s220 56 335 0" />
        <path d="M0 216c120-52 215 52 345 0s220 56 335 0" />
        <path d="M0 274c120-52 215 52 345 0s220 56 335 0" />
      </g>
      <path d="M-20 240c110-88 179-15 281-84 100-67 167 12 249-55 63-52 117-22 187-59" fill="none" stroke="var(--sr-seafoam)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="440" cy="101" r="11" fill="var(--sr-lavender)" />
      <circle cx="440" cy="101" r="28" fill="none" stroke="var(--sr-lavender)" strokeWidth="1" opacity=".7" />
      <text x="458" y="96" fill="currentColor" fontFamily="var(--font-ibm-plex-mono)" fontSize="12">LOW / 1008</text>
    </svg>
  );
}

export function PressureTrace() {
  return (
    <svg className="sr-pressure-trace" viewBox="0 0 720 260" role="img" aria-label="Pressure trace rising from 1008 to 1024 hectopascals">
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity=".25">
        <path d="M24 32h672M24 98h672M24 164h672M24 230h672" />
        <path d="M24 24v214M135 24v214M246 24v214M357 24v214M468 24v214M579 24v214M690 24v214" />
      </g>
      <path className="sr-pressure-trace__line" d="M24 207C74 196 86 162 137 172s64-22 101-28 62 28 91 9 61-52 97-31 48-30 82-23 60 11 96-48" fill="none" stroke="var(--sr-ink)" strokeWidth="4" strokeLinecap="round" />
      <circle className="sr-pressure-trace__dot" cx="24" cy="207" r="7" fill="var(--sr-seafoam)" />
      <text x="24" y="18" fill="currentColor" fontFamily="var(--font-ibm-plex-mono)" fontSize="12">1008</text>
      <text x="644" y="18" fill="currentColor" fontFamily="var(--font-ibm-plex-mono)" fontSize="12">1024</text>
    </svg>
  );
}

function WindRose() {
  return (
    <svg className="sr-wind-rose" viewBox="0 0 220 220" role="img" aria-label="Wind rose showing a south-west wind">
      <circle cx="110" cy="110" r="86" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="110" cy="110" r="54" fill="none" stroke="currentColor" strokeWidth="1" opacity=".4" />
      <path d="M110 16v188M16 110h188M43 43l134 134M177 43 43 177" stroke="currentColor" strokeWidth="1" opacity=".25" />
      <path d="m110 110 34-69 6 50 35 19-35 19-6 50z" fill="var(--sr-seafoam)" stroke="var(--sr-ink)" strokeWidth="2" />
      <circle cx="110" cy="110" r="8" fill="var(--sr-lavender)" stroke="var(--sr-ink)" strokeWidth="2" />
      <text x="102" y="13" fill="currentColor" fontFamily="var(--font-ibm-plex-mono)" fontSize="10">N</text>
      <text x="198" y="114" fill="currentColor" fontFamily="var(--font-ibm-plex-mono)" fontSize="10">E</text>
      <text x="103" y="218" fill="currentColor" fontFamily="var(--font-ibm-plex-mono)" fontSize="10">S</text>
      <text x="10" y="114" fill="currentColor" fontFamily="var(--font-ibm-plex-mono)" fontSize="10">W</text>
    </svg>
  );
}

function Barometer() {
  return (
    <svg className="sr-barometer" viewBox="0 0 220 220" role="img" aria-label="Barometer reading 1016 hectopascals">
      <circle cx="110" cy="110" r="85" fill="var(--sr-paper)" stroke="currentColor" strokeWidth="2" />
      <path d="M54 154a70 70 0 0 1 112-80" fill="none" stroke="var(--sr-seafoam)" strokeWidth="12" strokeLinecap="round" />
      <path d="M110 110 162 78" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="110" cy="110" r="10" fill="var(--sr-lavender)" stroke="var(--sr-ink)" strokeWidth="2" />
      <text x="73" y="179" fill="currentColor" fontFamily="var(--font-ibm-plex-mono)" fontSize="13">1016 HPA</text>
    </svg>
  );
}

function PanelHeader({ panel, title, intro }: { panel: PanelSpec; title: string; intro?: string }) {
  return (
    <div className="sr-panel__header">
      <Folio panel={panel} />
      <Reveal as="h2" variant="mask" index={0} className="sr-panel__title">{title}</Reveal>
      {intro && <Reveal as="p" variant="rise" index={1} className="sr-panel__intro">{intro}</Reveal>}
    </div>
  );
}

export function PanelContent({ panel }: { panel: PanelSpec }) {
  switch (panel.id) {
    case "outlook":
      return (
        <>
          <PanelHeader panel={panel} title="A little weather, held close." intro="A morning report for the places between the forecast and the feeling. Filed from the SEREIN desk, 51.52° N / 0.09° W." />
          <div className="sr-outlook__art" aria-label="A coded weather scene">
            <IsobarField />
            <div className="sr-outlook__clouds"><CloudGlyph variant="cloud" /><CloudGlyph variant="sun" /></div>
            <div className="sr-outlook__stamp"><span>SR</span><b>07</b><small>Field / 08:10</small></div>
          </div>
          <div className="sr-panel__actions">
            <a className="sr-button" href="#forecast">Open the forecast</a>
            <a className="sr-text-link" href="#bureau">Read the bureau note</a>
          </div>
        </>
      );
    case "bureau":
      return (
        <>
          <PanelHeader panel={panel} title="Forecasts are a way of paying attention." intro="We keep the numbers close to the ordinary: the damp rail, the bright corner of a kitchen, the hour when the wind turns." />
          <div className="sr-bureau__grid">
            <Reveal as="div" variant="rise" index={0} className="sr-bureau__note"><span className="sr-note-index">01</span><p>Weather is a shared language. A pressure trace can still tell you where to look.</p></Reveal>
            <Reveal as="div" variant="rise" index={1} className="sr-bureau__note"><span className="sr-note-index">02</span><p>SEREIN keeps a record of small shifts and sends one issue every new moon.</p></Reveal>
            <Reveal as="div" variant="rise" index={2} className="sr-bureau__note"><span className="sr-note-index">03</span><p>Read the strip left to right. Let the day arrive at its own pace.</p></Reveal>
          </div>
          <div className="sr-bureau__field"><IsobarField /><span>Isobar field / observation 07</span></div>
        </>
      );
    case "instruments":
      return (
        <>
          <PanelHeader panel={panel} title="Three instruments. One attentive morning." intro="The desk uses simple tools, held steady long enough for a pattern to appear." />
          <div className="sr-instruments">
            <Reveal as="article" variant="scale" index={0} className="sr-instrument"><Barometer /><div><span className="sr-instrument__code">01 / Barometer</span><h3>Pressure</h3><p>Steady at 1016 hPa. A good day to take the long way.</p></div></Reveal>
            <Reveal as="article" variant="scale" index={1} className="sr-instrument"><WindRose /><div><span className="sr-instrument__code">02 / Wind rose</span><h3>Direction</h3><p>South-west, 12 knots. The windows will hear it first.</p></div></Reveal>
            <Reveal as="article" variant="scale" index={2} className="sr-instrument sr-instrument--cloud"><CloudGlyph variant="rain" /><div><span className="sr-instrument__code">03 / Cloud deck</span><h3>Ceiling</h3><p>High, then lower by dusk. Carry a layer for the return.</p></div></Reveal>
          </div>
          <a className="sr-text-link" href="#forecast">Calibrate the strip</a>
        </>
      );
    case "forecast":
      return (
        <>
          <PanelHeader panel={panel} title="Read the pressure line." intro="The day's front is a quiet rise. Open the folds and follow it from first light to the last train home." />
          <div className="sr-forecast__trace"><PressureTrace /></div>
          <div className="sr-forecast__readings"><div><span>Now</span><strong>1016</strong><small>hPa</small></div><div><span>Wind</span><strong>12</strong><small>kt / SW</small></div><div><span>Visibility</span><strong>8.4</strong><small>km</small></div></div>
          <div className="sr-forecast__rule"><span>First light</span><i /><span>Last train home</span></div>
        </>
      );
    case "notes":
      return (
        <>
          <PanelHeader panel={panel} title="Field notes from a day in motion." intro="Three small observations, filed without hurry. Each one is a place the forecast touched." />
          <div className="sr-field-notes">
            <Reveal as="article" variant="rise" index={0} className="sr-field-note"><span className="sr-field-note__dot" /><span className="sr-field-note__time">06:42 / East platform</span><h3>The rail is dark with rain.</h3><p>It holds the first blue of the morning for a few seconds, then gives it back.</p></Reveal>
            <Reveal as="article" variant="rise" index={1} className="sr-field-note"><span className="sr-field-note__dot" /><span className="sr-field-note__time">12:16 / Market roof</span><h3>Wind finds the paper bags.</h3><p>South-west, as promised. The forecast is a note you can hear.</p></Reveal>
            <Reveal as="article" variant="rise" index={2} className="sr-field-note"><span className="sr-field-note__dot" /><span className="sr-field-note__time">19:08 / Back garden</span><h3>The cloud line opens.</h3><p>One clear window before dusk. Enough for the long way home.</p></Reveal>
          </div>
        </>
      );
    case "dispatch":
      return (
        <>
          <PanelHeader panel={panel} title="The dispatch index." intro="Previous reports from the SEREIN desk. Keep the ones that change the way a place feels." />
          <div className="sr-dispatch-list">
            {["A room that keeps the rain", "The wind behind the station", "Notes on a blue hour", "A forecast for the long way"].map((item, itemIndex) => (
              <a className="sr-dispatch-row" href="#subscribe" key={item}>
                <span>{String(itemIndex + 3).padStart(2, "0")}</span><strong>{item}</strong><small>Issue {String(itemIndex + 4).padStart(2, "0")} / 2026</small><i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
          <div className="sr-dispatch__footer"><span>7 reports / 4 cities / one open window</span><span>Keep the weather close</span></div>
        </>
      );
    case "subscribe":
      return (
        <>
          <PanelHeader panel={panel} title="Let the next report find you." intro="One small dispatch every new moon. No noise, no forecasts for sale, just a closer look at the weather already around you." />
          <Subscribe />
          <div className="sr-back-cover"><span>SR-07</span><b>SEREIN</b><small>Small weather / closely observed</small></div>
        </>
      );
    default:
      return null;
  }
}

