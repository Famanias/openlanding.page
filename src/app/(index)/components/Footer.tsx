import React from "react";
import { GithubLogo, ArrowUpRight } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#0C0D0E] text-neutral-400 font-sans" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <a
              href="/"
              className="flex items-center gap-2.5 text-white font-sans font-bold text-lg tracking-[-0.03em] hover:opacity-90 transition-opacity w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
              aria-label="templateflow home"
            >
              <span className="size-2 rounded-full bg-white" aria-hidden="true" />
              <span>templateflow</span>
            </a>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Award-grade web designs with mathematical design briefs and complete source code bundles ready for AI coding agents.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">Navigation</span>
            <ul className="flex flex-col gap-2 text-sm list-none p-0 m-0">
              <li>
                <a
                  href="#gallery"
                  className="hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md py-0.5 inline-block"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md py-0.5 inline-block"
                >
                  How it works
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-300">Resources</span>
            <ul className="flex flex-col gap-2 text-sm list-none p-0 m-0">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md py-0.5"
                >
                  <GithubLogo className="size-4" weight="bold" aria-hidden="true" />
                  <span>GitHub</span>
                  <ArrowUpRight className="size-3 text-neutral-500" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <p>© {new Date().getFullYear()} templateflow. All rights reserved.</p>
          <p>Curated with craft for modern AI pair programming.</p>
        </div>
      </div>
    </footer>
  );
}
