import { RequisitionForm } from "../forms/RequisitionForm";
import { Reveal } from "../motion/Reveal";

export function RequisitionSection() {
  return (
    <section id="requisition" className="lh-section lh-req-section" aria-label="Tool Requisition and Intake">
      <div className="lh-wrap">
        <div className="lh-req-grid">
          <div className="lh-req-content">
            <div className="lh-kicker">EQUIPMENT INTAKE // 24-HOUR HOLD</div>
            <h2 className="lh-section-title">Requisition a Tool or Reserve a Bench</h2>
            <p className="lh-section-desc">
              Lock your project kit for pickup at Foundry Way, Millrace, or St. Jude. No hidden hire fees, no credit
              checks, no proprietary battery locks.
            </p>

            <div className="lh-req-features">
              <div className="lh-req-feat">
                <span className="lh-feat-num">01</span>
                <div>
                  <h4 className="lh-feat-title">Zero Deposit for Guild Members</h4>
                  <p className="lh-feat-desc">
                    Annual membership is $60/yr ($5/mo), unlocking unlimited tool borrows across all three depots.
                  </p>
                </div>
              </div>
              <div className="lh-req-feat">
                <span className="lh-feat-num">02</span>
                <div>
                  <h4 className="lh-feat-title">Smart Locker or In-Person Handoff</h4>
                  <p className="lh-feat-desc">
                    Collect 24/7 from secure weather-sealed smart lockers, or visit during bench hours to consult our
                    technicians.
                  </p>
                </div>
              </div>
              <div className="lh-req-feat">
                <span className="lh-feat-num">03</span>
                <div>
                  <h4 className="lh-feat-title">Included Consumables &amp; Jigs</h4>
                  <p className="lh-feat-desc">
                    Every kit ships with sharp carbide blades, router collet wrenches, and dust extractor adapters.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lh-req-form-wrap">
            <Reveal variant="scale" className="lh-form-card">
              <div className="lh-form-card-head">
                <span className="lh-form-card-tag">OFFICIAL REQUISITION INTAKE</span>
                <span className="lh-form-card-status">SYSTEM READY ●</span>
              </div>
              <RequisitionForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
