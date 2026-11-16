import { Picture } from "../assets";
import { Hatch } from "../brand/Marks";
import { Reveal } from "../motion/Reveal";
import { pad2 } from "../work/services";
import { FLEET, fleetTotal } from "./content";

/** The fleet as a spec sheet, beside three photos of the iron. */
export function Yard() {
  return (
    <section className="tv-section tv-yard" id="yard" aria-labelledby="tv-yard-title">
      <div className="tv-wrap">
        <header className="tv-head">
          <Reveal as="p" variant="slide" className="tv-eyebrow tv-gauge">
            The yard · {fleetTotal()} units
          </Reveal>
          <Reveal as="h2" variant="lines" className="tv-title" id="tv-yard-title">
            <span className="tv-line">
              <span>Our Equipment</span>
            </span>
          </Reveal>
          <Reveal as="p" className="tv-lede" delay={120}>
            Nothing on your job is rented, so nothing on your job is waiting on a rental yard. If it breaks, we fix it
            that night.
          </Reveal>
        </header>

        <div className="tv-yard-grid">
          <div className="tv-yard-photos">
            <Reveal as="figure" variant="push" className="tv-yard-photo tv-yard-photo-a">
              <Picture assetKey="yard-iron" alt="A dozer, a track loader and an excavator parked in a row along a gravel yard road" sizes="(min-width: 1000px) 46vw, 100vw" />
            </Reveal>
            <Reveal as="figure" variant="push" delay={140} className="tv-yard-photo tv-yard-photo-b">
              <Picture assetKey="haul-lowboy" alt="A track loader chained down on a lowboy trailer, ready to move to a job" sizes="(min-width: 1000px) 22vw, 50vw" />
            </Reveal>
            <Reveal as="figure" variant="push" delay={240} className="tv-yard-photo tv-yard-photo-c">
              <Picture assetKey="cut-loading" alt="An excavator loading a tandem dump truck at the foot of a cut bank" sizes="(min-width: 1000px) 22vw, 50vw" />
            </Reveal>
          </div>

          <table className="tv-fleet">
            <caption className="tv-sr">The Tolvar fleet: how many of each machine, its size, and what it does</caption>
            <thead>
              <tr className="tv-gauge">
                <th scope="col">Qty</th>
                <th scope="col">Unit</th>
                <th scope="col">Size</th>
                <th scope="col" className="tv-fleet-job">What it does</th>
              </tr>
            </thead>
            <tbody>
              {FLEET.map((row, index) => (
                <Reveal as="tr" variant="rise" index={index} key={row.name}>
                  <td className="tv-fleet-count">{pad2(row.count)}</td>
                  <th scope="row">{row.name}</th>
                  <td className="tv-gauge">{row.spec}</td>
                  <td className="tv-fleet-job">{row.job}</td>
                </Reveal>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Hatch kind="rock" />
    </section>
  );
}
