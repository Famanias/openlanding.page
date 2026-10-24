import { ProjectForm } from "../forms/ProjectForm";
import { Reveal } from "../motion/Reveal";
export function Contact() {
  return <section className="kz-contact kz-section" id="contact" aria-labelledby="kz-contact-title"><div className="kz-container"><div className="kz-contact-intro"><Reveal><span className="kz-eyebrow">04 / There’s a story in there</span><h2 id="kz-contact-title">Something on<br /><em>your mind?</em></h2></Reveal><Reveal><p>A film. A feeling. A beautifully odd idea.<br />We’d love to help you bring it to life.</p><span className="kz-contact-japanese" lang="ja">いっしょに、物語を。</span></Reveal></div><Reveal><ProjectForm /></Reveal><p className="kz-no-js">This demonstration form needs JavaScript to prepare a brief. No personal information is sent.</p></div></section>;
}
