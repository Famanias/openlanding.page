import { HOURS } from "../hours/hours";
import { OpenNow } from "../hours/OpenNow";
import { Reveal } from "../motion/Reveal";
import { CLINIC } from "./content";

const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
// Monday first, as a door sign reads
const WEEK = [...HOURS.slice(1), HOURS[0]];

export function AfterHours() {
  return (
    <section className="sn-after" aria-labelledby="sn-after-title">
      <div className="sn-after-inner">
        <div>
          <Reveal as="p" variant="slide" className="sn-eyebrow">
            After hours
          </Reveal>
          <Reveal as="h2" variant="rise" className="sn-h2" id="sn-after-title">
            Something wrong at 3 a.m.? Ring the night vet.
          </Reveal>
          <Reveal variant="rise" delay={120}>
            <OpenNow />
          </Reveal>
        </div>
        <Reveal variant="pop" delay={160} className="sn-after-call">
          <a className="sn-after-phone" href={CLINIC.emergencyHref}>
            <span className="sn-chart">Emergency line, 24/7</span>
            <span className="sn-after-number">
              <span>{CLINIC.emergency}</span>
              <span aria-hidden="true">{CLINIC.emergency}</span>
            </span>
          </a>
          <table className="sn-hours sn-chart">
            <caption className="sn-sr">Opening hours</caption>
            <tbody>
              {WEEK.map((d) => (
                <tr key={d.day}>
                  <th scope="row">{d.day}</th>
                  <td>
                    {fmt(d.open)}–{fmt(d.close)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
