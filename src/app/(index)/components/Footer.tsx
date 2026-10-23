import React from "react";

export function Footer() {
  return (
    <footer className="site-footer" aria-label="Site Footer">
      <div className="page-container footer-inner">
        <p>© {new Date().getFullYear()} OpenLanding.page. MIT Licensed.</p>
        <p>Curated with craft for modern AI pair programming.</p>
      </div>
    </footer>
  );
}
