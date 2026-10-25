import { Logo } from "../brand/Logo";
import { Arrow } from "../brand/Icons";
import { FooterScene } from "../harbor/FooterScene";
import { Reveal } from "../motion/Reveal";
const EXPLORE = [{ href: "#work", label: "Selected work" }, { href: "#about", label: "A little about me" }, { href: "#process", label: "How it works" }];
const COMMISSIONS = [{ href: "#commissions", label: "Sample prices" }, { href: "#faq", label: "Questions" }, { href: "#inquiry", label: "Send a brief" }];
function LinkColumn({ label, links, index }: { label: string; links: { href: string; label: string }[]; index: number }) {
  return <Reveal index={index}><nav aria-label={label}><p className="mh-footer-label" aria-hidden="true">{label}</p><ul>{links.map(link => <li key={link.href}><a className="mh-footer-link" href={link.href}>{link.label}</a></li>)}</ul></nav></Reveal>;
}
export function Footer() {
  return <footer className="mh-footer">
    <div className="mh-footer-inner mh-section">
      <Reveal className="mh-footer-rule" variant="draw"><div className="mh-footer-line"/></Reveal>
      <div className="mh-footer-grid">
        <Reveal className="mh-footer-brand"><a href="#home" aria-label="Mio Hazuki, back to the harbor"><Logo/></a><p>Thanks for finding your way here.<br/>I hope you stay a little curious.</p><p className="mh-availability"><span aria-hidden="true"/>A few commission spots open</p></Reveal>
        <LinkColumn label="Explore" links={EXPLORE} index={1}/>
        <LinkColumn label="Commissions" links={COMMISSIONS} index={2}/>
      </div>
      <div className="mh-footer-bottom"><span>© 2026 Mio Hazuki · A fictional artist portfolio</span><a className="mh-back-top" href="#home">Back to the harbor <Arrow/></a><a className="mh-footer-cta" href="#inquiry">Start a commission brief <Arrow/></a></div>
    </div>
    <div className="mh-footer-scene" data-mh-ambient aria-hidden="true"><FooterScene/></div>
  </footer>;
}
