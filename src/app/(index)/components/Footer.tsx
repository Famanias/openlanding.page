import React from "react";
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
        <p>© {new Date().getFullYear()} OpenLanding.page. MIT Licensed.</p>
        <p>Curated with craft for modern AI pair programming.</p>
      </div>
    </footer>
  );
}
