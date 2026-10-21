import React from "react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#0C0D0E] text-neutral-400 font-sans" aria-label="Site Footer">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
        <p>© {new Date().getFullYear()} OpenLanding.page. MIT Licensed.</p>
        <p>Curated with craft for modern AI pair programming.</p>
      </div>
    </footer>
  );
}
