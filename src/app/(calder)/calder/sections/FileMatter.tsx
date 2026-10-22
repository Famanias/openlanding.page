import { FIRM } from "../content/firm";
import { MatterForm } from "../forms/MatterForm";
import { Eyebrow, Lines } from "./parts";

/** The close: contact details on a midnight slab, the filing form on an ivory card. */
export function FileMatter() {
  return (
    <section id="file" className="cr-slab cr-slab--slab cr-file" aria-labelledby="cr-file-h">
      <div className="cr-grain" aria-hidden="true" />
      <div className="cr-wrap cr-file__grid">
        <div className="cr-file__copy">
          <Eyebrow n="§ VI" tone="slab">
            File a matter
          </Eyebrow>
          <Lines as="h2" id="cr-file-h" className="cr-h2" lines={["Bring us the", <em key="e">hard one.</em>]} />
          <p className="cr-lede" data-reveal="rise">
            Tell us a little about what you are facing. A partner reads every message and replies within one business day.
          </p>
          <dl className="cr-contact" data-reveal="rise">
            <div>
              <dt>Direct line</dt>
              <dd>
                <a href={FIRM.phoneHref}>{FIRM.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
              </dd>
            </div>
            <div>
              <dt>Chambers</dt>
              <dd>
                {FIRM.addressLines[0]}
                <br />
                {FIRM.addressLines[1]}
              </dd>
            </div>
          </dl>
        </div>
        <div className="cr-file__form" data-reveal="settle">
          <MatterForm />
        </div>
      </div>
    </section>
  );
}
