import { CommissionForm } from "../forms/CommissionForm";
import { StageAnchor } from "../bg/StageAnchor";
export function Commission({
  canopy,
  onSuccess,
}: {
  canopy: string;
  onSuccess: () => void;
}) {
  return (
    <section id="commission" className="am-section am-commission">
      <StageAnchor />
      <div className="am-chapter-copy">
        <span className="am-kicker">05 / your umbrella</span>
        <h2>
          <span className="am-line">
            <span>Made for the</span>
          </span>
          <em className="am-line">
            <span>weather ahead.</span>
          </em>
        </h2>
        <p>
          Tell us where you will carry it. We will answer with a paper, bamboo
          and palette that belongs there.
        </p>
        <dl>
          <div>
            <dt>Lead time</dt>
            <dd>14 weeks</dd>
          </div>
          <div>
            <dt>Atelier</dt>
            <dd>Kurokawa / 1963</dd>
          </div>
          <div>
            <dt>Commission</dt>
            <dd>From ¥84,000</dd>
          </div>
        </dl>
        <CommissionForm canopy={canopy} onSuccess={onSuccess} />
      </div>
    </section>
  );
}
