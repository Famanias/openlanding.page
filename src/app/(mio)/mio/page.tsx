import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Works } from "./sections/Works";
import { About } from "./sections/About";
import { Pricing } from "./sections/Pricing";
import { Process } from "./sections/Process";
import { Contact } from "./sections/Contact";
import { Faq } from "./sections/Faq";
import { Footer } from "./sections/Footer";
import { MotionDirector } from "./motion/MotionDirector";
import { SmoothScroll } from "./motion/SmoothScroll";
export default function MioPage() {
  return <div className="mh-site"><a className="mh-skip-link" href="#main">Skip to content</a><div className="mh-reading-progress" aria-hidden="true"/><Header/><main id="main"><Hero/><Works/><About/><Pricing/><Process/><Contact/><Faq/></main><Footer/><MotionDirector/><SmoothScroll/></div>;
}
