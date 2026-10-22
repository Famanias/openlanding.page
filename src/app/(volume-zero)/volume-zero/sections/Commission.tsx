import { CommissionForm } from "../forms/CommissionForm";

export function Commission() {
  return (
    <section id="commission" className="vz-commission" aria-labelledby="vz-commission-title">
      <div className="vz-wrap vz-commission__layout">
        <div><p className="vz-eyebrow">05 / Commission a room</p><h2 id="vz-commission-title" className="vz-section-title">Bring us the first note.</h2><p className="vz-lead">Tell us what the room needs to hold. We will return a measured field plan, a listening route and a first surface study.</p><div className="vz-commission__notes"><div className="vz-commission__note"><span>Response</span><strong>48 hours</strong></div><div className="vz-commission__note"><span>First field</span><strong>10 working days</strong></div><div className="vz-commission__note"><span>Studio</span><strong>Rotterdam / remote</strong></div></div></div>
        <CommissionForm />
      </div>
    </section>
  );
}
