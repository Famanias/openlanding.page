import React from "react";
import Link from "next/link";
import { FooterScene } from "./FooterScene";
import { Contribute } from "./Contribute";
import "./footer/footer-scene.css";

export function Footer() {
  return (
    <footer id="contact" className="site-footer" aria-labelledby="contact-title">
      <FooterScene />
      <div className="contact-shell">
        <Contribute />
      </div>
      <div className="page-container footer-inner">
        <p>
          © {new Date().getFullYear()} OpenLanding.page. MIT Licensed. Templates and contributed
          HTML downloads use the MIT License. External community websites keep their own terms.
        </p>
        <p className="footer-meta-links">
          <span>Curated with craft for modern AI pair programming.</span>{" "}
          <Link href="/community-terms" className="community-credit-link">
            Community terms
          </Link>{" "}
          ·{" "}
          <Link href="/community-privacy" className="community-credit-link">
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  );
}
