import { Hero } from "./sections/Hero";
import { Gap } from "./sections/Gap";
import { Pipeline } from "./sections/Pipeline";
import { Lanes } from "./sections/Lanes";
import { Proof } from "./sections/Proof";
import { Fit } from "./sections/Fit";
import { Close } from "./sections/Close";
import { Logo } from "./brand/Logo";
import { Reveals } from "./motion/Reveals";
import { ScrollVars } from "./motion/ScrollVars";
import { PointerMotion } from "./motion/PointerMotion";
export default function HandoffPage() { return <div className="hf-site"><a className="hf-skip" href="#main">Skip to content</a><div className="hf-progress" aria-hidden="true" /><header className="hf-header"><div className="hf-container hf-header-inner"><a href="#top" className="hf-header-logo" aria-label="HANDOFF home"><Logo /></a><nav className="hf-nav" aria-label="Primary navigation"><a href="#pipeline">How it works</a><a href="#lanes">Services</a><a href="#fit">Fit check</a></nav><div className="hf-header-actions"><a className="hf-header-link" href="#close">Book a call</a><a className="hf-button hf-button--orange" href="#close">Get matched <span aria-hidden="true">↗</span></a></div></div></header><main id="main"><Hero /><Gap /><Pipeline /><Proof /><Lanes /><Fit /><Close /></main><footer className="hf-footer"><div className="hf-container hf-footer-inner"><Logo compact /><p>HANDOFF is a fictional conversion template. The form is local-only until you connect your endpoint.</p><span>© 2026 HANDOFF BUREAU</span></div></footer><Reveals /><ScrollVars /><PointerMotion /></div>; }


