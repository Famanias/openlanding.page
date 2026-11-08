import { Logo } from "../brand/Logo";
import { Reveal } from "../motion/Reveal";

export function Footer() {
  return (
    <footer className="tn-footer">
      <Reveal variant="rise" className="tn-footer-inner">
        <Logo className="tn-footer-logo" />
        <p className="tn-footer-line">Made slowly, in a converted boatyard on Foss Waterway.</p>
        <address className="tn-footer-address tn-mono">
          412 Dock Street, Tacoma WA
          <br />
          Open Thursday to Sunday, 10 to 5
        </address>
        <p className="tn-fineprint">TOURNE is a fictional studio. Prices, people and kilns are invented for this template.</p>
      </Reveal>
    </footer>
  );
}
