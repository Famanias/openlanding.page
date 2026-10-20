import { Picture } from "../assets";

const FACTS = [
  ["Completed", "1972"],
  ["Floors", "B1–14F"],
  ["Capsules", "140, plugged into one core"],
  ["Our floor", "14F, three capsules joined"],
];

export function Building() {
  return (
    <section className="kj-slab kj-slab--washi kj-building" id="building" aria-labelledby="kj-building-title">
      <Picture
        assetKey="building-exterior"
        alt="The 1972 Metabolist tower at dusk, capsules with round windows plugged into a concrete core"
        className="kj-photo kj-building__photo"
        sizes="(min-width: 900px) 40vw, 100vw"
      />
      <div className="kj-building__copy">
        <p className="kj-mono">03 · 塔 · The building</p>
        <h2 id="kj-building-title" className="kj-h2">
          A tower built to be rebuilt.
        </h2>
        <p className="kj-lead">
          The Metabolists believed buildings should grow like living things: a permanent core, and capsules you could
          unplug and replace. The capsules were never replaced. We took three of them on the top floor and opened the
          walls between.
        </p>
        <dl className="kj-facts">
          {FACTS.map(([k, v]) => (
            <div key={k}>
              <dt className="kj-mono">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <Picture
          assetKey="stoneware"
          alt="A stack of heavy ash-glazed stoneware bowls on a concrete ledge"
          className="kj-photo kj-photo--square"
          sizes="(min-width: 900px) 20vw, 50vw"
        />
      </div>
    </section>
  );
}
