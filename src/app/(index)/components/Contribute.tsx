import React from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ActionLabel } from "./ActionLabel";

export function Contribute() {
  return (
    <section id="contribute" className="contribute-section" aria-labelledby="contribute-title">
      <div className="gradient-field" aria-hidden="true"><div className="gradient-ribbon" /></div>
      <div className="page-container contribute-inner">
        <div className="request-copy">
          <h2 id="contribute-title">Your site, templated.</h2>
          <p>Get a landing page designed for your website. Choose a free design for the gallery or a paid commission that is yours alone.</p>
          <p>No name needed. Share your email and tell us about your idea if you like.</p>
        </div>
        <form className="request-form" action="https://formsubmit.co/famianas.dev@gmail.com" method="POST">
          <input type="hidden" name="_subject" value="New OpenLanding.page template request" />
          <fieldset className="request-options">
            <legend>Choose your project</legend>
            <label className="request-option">
              <input type="radio" name="project_type" value="Free gallery template" defaultChecked />
              <span><strong>Free gallery template</strong><small>Your design becomes an official OpenLanding.page gallery template, open source under the MIT license for everyone to use.</small></span>
            </label>
            <label className="request-option">
              <input type="radio" name="project_type" value="Paid private commission" />
              <span><strong>Paid private commission</strong><small>You own the code, and your design stays out of the gallery.</small></span>
            </label>
          </fieldset>
          <label htmlFor="request-email">Email address <span>Required</span></label>
          <input id="request-email" type="email" name="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required />
          <label htmlFor="request-idea">Tell us about your website <span>Optional</span></label>
          <textarea id="request-idea" name="idea" rows={4} maxLength={3000} placeholder="What are you building? Share a link or an idea." />
          <button type="submit" className="primary-action"><ActionLabel>Send request</ActionLabel><ArrowUpRight size={16} aria-hidden="true" /></button>
          <p className="request-privacy">Your request is sent through <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer">FormSubmit</a> to our inbox.</p>
        </form>
      </div>
    </section>
  );
}
