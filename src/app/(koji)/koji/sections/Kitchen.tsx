import { Picture } from "../assets";

const PILLARS = [
  { kanji: "麹", name: "Kōji", text: "The mould that makes Japanese food taste like itself. We grow our own on rice, every three days." },
  { kanji: "味噌", name: "Miso", text: "Seven misos ageing in cedar, the oldest started when the kitchen opened. Each course uses one." },
  { kanji: "塩", name: "Shio", text: "Salt from the Noto coast, cured with kōji into shio-kōji. It seasons, softens and deepens." },
];

export function Kitchen() {
  return (
    <section className="kj-slab kj-slab--beton kj-kitchen" id="kitchen" aria-labelledby="kj-kitchen-title">
      <header className="kj-section-head">
        <p className="kj-mono">01 · 厨房 · The kitchen</p>
        <h2 id="kj-kitchen-title" className="kj-h2">
          Fermentation is the kitchen.
        </h2>
      </header>
      <ol className="kj-pillars">
        {PILLARS.map((p) => (
          <li key={p.name} className="kj-pillar">
            <span className="kj-pillar__kanji" aria-hidden="true">
              {p.kanji}
            </span>
            <h3 className="kj-h3">{p.name}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ol>
      <div className="kj-kitchen__photos">
        <Picture
          assetKey="counter"
          alt="The twelve-seat concrete counter, steam rising in a shaft of light"
          className="kj-photo kj-photo--wide"
          sizes="(min-width: 900px) 62vw, 100vw"
        />
        <Picture
          assetKey="fermentation"
          alt="Fermentation crocks lined up along a raw concrete cellar wall"
          className="kj-photo kj-photo--tall"
          sizes="(min-width: 900px) 30vw, 100vw"
        />
      </div>
    </section>
  );
}
