import { Picture } from "../assets";

export function Footer() {
  return (
    <footer className="hy-footer" id="footer">
      <div className="hy-footer__scene">
        <Picture assetKey="footer-mountain" alt="Layered Himalayan mountain dusk scene" className="hy-footer__backdrop" />
        <div className="hy-container">
          <div className="hy-footer__grid">
            <div>
              <h3>HIYAS</h3>
              <p>Guided eight-thousand-metre expeditions, planned with precision and a route home.</p>
            </div>
            <div>
              <h3>Expeditions</h3>
              <a href="#peaks">The fourteen</a>
              <a href="#planner">Route planner</a>
              <a href="#notes">Field notes</a>
            </div>
            <div>
              <h3>Navigation</h3>
              <a href="#stages">Expedition architecture</a>
              <a href="#support">Sherpa partnership</a>
              <a href="#inquiry">Inquiry</a>
            </div>
            <div>
              <h3>Coordinates</h3>
              <p>27°43&prime; N<br/>86°55&prime; E</p>
            </div>
          </div>
          <div className="hy-footer__wordmark">HIYAS</div>
        </div>
        <div className="hy-footer__copy">
          <span>BASE CAMP / RETURN PLAN</span>
          <span>HIYAS / ALPINE EXPEDITIONS / 2026</span>
        </div>
      </div>
    </footer>
  );
}

