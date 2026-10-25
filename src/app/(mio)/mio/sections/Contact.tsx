import { CommissionForm } from "../forms/CommissionForm";
import { Reveal } from "../motion/Reveal";
import { Lantern, Star } from "../brand/Icons";
export function Contact() {
  return <section className="mh-contact" id="inquiry" aria-labelledby="mh-contact-title">
    <div className="mh-contact-shore" aria-hidden="true"><svg viewBox="0 0 1600 60" preserveAspectRatio="none"><path d="M0 0h1600v25c-223 37-357-14-524-1S752 56 555 31 233 55 0 29Z" fill="var(--mh-paper)"/></svg></div>
    <div className="mh-contact-inner mh-section"><div className="mh-contact-copy"><Reveal variant="mask"><h2 id="mh-contact-title">Your daydream.<br/>My paintbrush.</h2></Reveal><Reveal><p>Have a little world in mind?<br/>I&apos;d love to hear about it.</p><p className="mh-contact-note">Big ideas, small ideas, “I&apos;m not quite sure yet” ideas.<br/>They&apos;re all welcome here.</p></Reveal><div className="mh-contact-illustration" aria-hidden="true"><svg viewBox="0 0 300 150" fill="none"><path d="M0 131q53-9 107 0t108 0 85 0m-270 13q59-9 101 0m69 0q49-8 98 0" stroke="currentColor" strokeWidth="1"/><path d="M61 49q37-17 66 1t66-3" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6"/><path d="m167 39 27 7-21 14" stroke="currentColor" strokeWidth="1"/></svg><Lantern/><Star/></div></div><Reveal className="mh-contact-form-wrap"><CommissionForm/><noscript><p>This demo form needs JavaScript to prepare a commission brief. Explore the sample prices above to plan your idea.</p></noscript></Reveal></div>
  </section>;
}
