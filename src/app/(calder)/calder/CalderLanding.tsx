"use client";

import { useEffect, useState } from "react";

const practices = [
  ["01", "Business formation & contracts", "Practical agreements, operating documents, and counsel for the decisions that keep a company moving."],
  ["02", "Commercial disputes", "Focused representation for contract disputes, shareholder matters, and business litigation."],
  ["03", "Employment matters", "Clear guidance for executives and employers navigating agreements, exits, and workplace risk."],
  ["04", "Trusts & estates", "Thoughtful planning for the people, property, and responsibilities you want to protect."],
];

function CalderMark() {
  return <span className="calder-mark" aria-hidden="true"><span>C</span><i>&amp;</i><span>R</span></span>;
}

export function CalderLanding() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
      { threshold: 0.14 },
    );
    document.querySelectorAll(".calder-reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="calder-site">
      <a className="calder-skip" href="#main">Skip to content</a>
      <header className="calder-topbar">
        <a className="calder-wordmark" href="#top" aria-label="Calder and Rowe home">
          <CalderMark />
          <span className="calder-wordmark-name">CALDER <b>&amp;</b> ROWE <small>ATTORNEYS AT LAW</small></span>
        </a>
        <nav className="calder-nav" aria-label="Primary navigation">
          <a href="#services">Legal services</a>
          <a href="#firm">Our firm</a>
          <a href="#faq">FAQs</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="calder-top-contact">
          <a className="calder-phone" href="tel:+12125550187">212 555 0187</a>
          <a className="calder-top-cta" href="#contact">Schedule a consultation</a>
        </div>
      </header>

      <main id="main">
        <section id="top" className="calder-hero" aria-labelledby="calder-title">
          <div className="calder-wrap calder-hero-grid">
            <div className="calder-hero-copy calder-reveal">
              <p className="calder-eyebrow">Business law · New York, NY</p>
              <h1 id="calder-title">Practical counsel for difficult decisions.</h1>
              <p className="calder-hero-lead">Calder &amp; Rowe LLP helps business owners, executives, and families make sound decisions when the answer matters.</p>
              <div className="calder-actions">
                <a className="calder-button calder-button-primary" href="#contact">Schedule a consultation <span aria-hidden="true">→</span></a>
                <a className="calder-text-link" href="#services">View legal services <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <div className="calder-hero-visual calder-reveal" aria-label="Calder and Rowe office details">
              <div className="calder-visual-top"><span>CALDER &amp; ROWE LLP</span><span>EST. 1987</span></div>
              <div className="calder-visual-architecture" aria-hidden="true"><span /><span /><span /><span /></div>
              <div className="calder-visual-bottom"><strong>Clear advice.<br />Steady representation.</strong><span>Manhattan · Brooklyn · Westchester</span></div>
            </div>
          </div>
        </section>

        <section className="calder-trust-strip" aria-label="Firm details">
          <div className="calder-wrap calder-trust-grid">
            <div><span>Direct line</span><a href="tel:+12125550187">212 555 0187</a></div>
            <div><span>Our approach</span><strong>Clear, practical advice</strong></div>
            <div><span>Serving clients</span><strong>Since 1987</strong></div>
            <div><span>Confidentiality</span><strong>Always protected</strong></div>
          </div>
        </section>

        <section id="services" className="calder-section calder-services" aria-labelledby="services-title">
          <div className="calder-wrap">
            <div className="calder-section-intro calder-reveal">
              <p className="calder-eyebrow">Legal services</p>
              <h2 id="services-title">Focused advice for the matters in front of you.</h2>
              <p>We explain the issue, outline your options, and stay close to the decision until it is resolved.</p>
            </div>
            <div className="calder-practice-list">
              {practices.map(([number, title, copy]) => (
                <article className="calder-practice-row calder-reveal" key={number}>
                  <span className="calder-practice-number">{number}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                  <a href="#contact" aria-label={`Ask about ${title}`}>Learn more <span aria-hidden="true">↗</span></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="firm" className="calder-section calder-firm" aria-labelledby="firm-title">
          <div className="calder-wrap calder-firm-grid">
            <div className="calder-attorney-card calder-reveal">
              <div className="calder-attorney-monogram" aria-hidden="true">CR</div>
              <div className="calder-attorney-caption"><strong>Mara Calder</strong><span>Founding partner</span><span>New York, NY</span></div>
            </div>
            <div className="calder-firm-copy calder-reveal">
              <p className="calder-eyebrow">Our firm</p>
              <h2 id="firm-title">A smaller firm by design.</h2>
              <p>Clients work directly with the attorneys handling their matter. That means fewer layers, faster answers, and advice grounded in the realities of your business and your life.</p>
              <a className="calder-text-link" href="#contact">Meet the firm <span aria-hidden="true">↗</span></a>
              <dl className="calder-firm-facts"><div><dt>38</dt><dd>Years serving clients</dd></div><div><dt>4.9/5</dt><dd>Client satisfaction</dd></div><div><dt>1:1</dt><dd>Attorney attention</dd></div></dl>
            </div>
          </div>
        </section>

        <section className="calder-section calder-proof" aria-labelledby="proof-title">
          <div className="calder-wrap calder-proof-grid">
            <div className="calder-proof-copy calder-reveal"><p className="calder-eyebrow">Why clients call us</p><h2 id="proof-title">Legal advice that helps you move forward.</h2></div>
            <div className="calder-proof-quote calder-reveal"><blockquote>“Mara gave us a plan we could understand and act on. We felt represented from the first call.”</blockquote><cite>— Founder, private technology company</cite></div>
          </div>
        </section>

        <section id="faq" className="calder-section calder-faq" aria-labelledby="faq-title">
          <div className="calder-wrap calder-faq-grid">
            <div className="calder-section-intro calder-reveal"><p className="calder-eyebrow">Before we speak</p><h2 id="faq-title">Common questions.</h2></div>
            <div className="calder-faq-list">
              <details className="calder-faq-item calder-reveal"><summary>What happens in a consultation?</summary><p>We listen to the facts, clarify what you need to decide, and explain the next practical steps. You leave with a clearer sense of your options.</p></details>
              <details className="calder-faq-item calder-reveal"><summary>Do you work with individuals or businesses?</summary><p>Both. Our work spans small businesses, founders, executives, and families who need thoughtful legal guidance.</p></details>
              <details className="calder-faq-item calder-reveal"><summary>Where do you meet with clients?</summary><p>Our office is in Midtown Manhattan. We also meet by video and serve clients throughout New York.</p></details>
            </div>
          </div>
        </section>

        <section id="contact" className="calder-contact" aria-labelledby="contact-title">
          <div className="calder-wrap calder-contact-grid">
            <div className="calder-contact-copy calder-reveal"><p className="calder-eyebrow">Contact Calder &amp; Rowe</p><h2 id="contact-title">Start with a conversation.</h2><p>Tell us a little about what you are facing. We will respond within one business day.</p><div className="calder-contact-details"><a href="tel:+12125550187">212 555 0187</a><a href="mailto:hello@calderrowe.com">hello@calderrowe.com</a><span>130 Madison Avenue, 12th Floor<br />New York, NY 10016</span></div></div>
            <form className="calder-form calder-reveal" onSubmit={handleSubmit}>
              {sent ? <div className="calder-form-success"><span className="calder-success-mark">✓</span><h3>Thank you.</h3><p>Your message has been noted. A member of our team will be in touch within one business day.</p><button type="button" onClick={() => setSent(false)}>Send another message</button></div> : <><label>Name<input name="name" type="text" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>How can we help?<textarea name="message" rows={4} required /></label><button className="calder-button calder-button-primary" type="submit">Request a consultation <span aria-hidden="true">→</span></button><p className="calder-form-note">Information submitted here is for general inquiries only and does not create an attorney-client relationship.</p></>}
            </form>
          </div>
        </section>
      </main>

      <footer className="calder-footer"><div className="calder-wrap calder-footer-grid"><div><a className="calder-wordmark" href="#top"><CalderMark /><span className="calder-wordmark-name">CALDER <b>&amp;</b> ROWE <small>ATTORNEYS AT LAW</small></span></a><p>Business law, litigation, and estate planning for New York clients.</p></div><div><span className="calder-footer-label">Explore</span><a href="#services">Legal services</a><a href="#firm">Our firm</a><a href="#contact">Contact</a></div><div><span className="calder-footer-label">Legal</span><a href="#faq">FAQs</a><a href="#top">Privacy policy</a><a href="#top">Disclaimer</a></div></div><div className="calder-footer-bottom"><span>© 2026 Calder &amp; Rowe LLP</span><span>Attorney advertising. Prior results do not guarantee a similar outcome.</span></div></footer>
    </div>
  );
}
