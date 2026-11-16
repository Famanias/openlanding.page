import { Flag } from "../brand/Marks";
import { EstimateForm } from "../forms/EstimateForm";
import { Reveal } from "../motion/Reveal";
import { COMPANY } from "./content";

export function Estimate() {
  return (
    <section className="tv-section tv-estimate" id="estimate" aria-labelledby="tv-estimate-title">
      <div className="tv-wrap tv-estimate-grid">
        <div className="tv-estimate-copy">
          <Reveal as="p" variant="slide" className="tv-eyebrow tv-gauge">
            Free estimate
          </Reveal>
          <Reveal as="h2" variant="lines" className="tv-title" id="tv-estimate-title">
            <span className="tv-line">
              <span>Call Dale.</span>
            </span>{" "}
            <span className="tv-line">
              <span>Or write it down.</span>
            </span>
          </Reveal>
          <Reveal as="p" className="tv-lede" delay={100}>
            Tell us what needs digging. We walk the site, give you a number in writing, and it does not cost you
            anything to find out.
          </Reveal>

          <Reveal as="dl" variant="rise" className="tv-contact" delay={160}>
            <div>
              <dt className="tv-gauge">Cell</dt>
              <dd>
                <a className="tv-contact-big tv-link" href={COMPANY.cell.href}>
                  {COMPANY.cell.label}
                </a>
              </dd>
            </div>
            <div>
              <dt className="tv-gauge">Office</dt>
              <dd>
                <a className="tv-link" href={COMPANY.office.href}>
                  {COMPANY.office.label}
                </a>
              </dd>
            </div>
            <div>
              <dt className="tv-gauge">Email</dt>
              <dd>
                <a className="tv-link" href={COMPANY.email.href}>
                  {COMPANY.email.label}
                </a>
              </dd>
            </div>
            <div>
              <dt className="tv-gauge">Yard</dt>
              <dd>
                {COMPANY.legal}
                <br />
                {COMPANY.street}
                <br />
                {COMPANY.city}
              </dd>
            </div>
            <div>
              <dt className="tv-gauge">Hours</dt>
              <dd>{COMPANY.hours}</dd>
            </div>
            <div>
              <dt className="tv-gauge">We work in</dt>
              <dd>{COMPANY.area.join(", ")}</dd>
            </div>
          </Reveal>

          <Reveal as="p" variant="rise" className="tv-locate" delay={220}>
            <Flag />
            <span>
              Planning to dig it yourself? Call 811 first. Locates are free, and they are the law.
            </span>
          </Reveal>
        </div>

        <Reveal variant="drop" delay={120} className="tv-estimate-form">
          <EstimateForm />
        </Reveal>
      </div>
    </section>
  );
}
