import React from "react";
import Link from "next/link";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0C0D0E]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white font-sans font-bold text-lg tracking-[-0.03em] hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
          aria-label="templateflow home"
        >
          <span className="size-2 rounded-full bg-white" aria-hidden="true" />
          <span>templateflow</span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6 text-sm font-sans" aria-label="Main Navigation">
          <a
            href="#gallery"
            className="hidden sm:inline-flex text-neutral-400 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md px-1.5 py-1"
          >
            Gallery
          </a>
          <a
            href="#how-it-works"
            className="hidden sm:inline-flex text-neutral-400 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md px-1.5 py-1"
          >
            How it works
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md px-1.5 py-1"
            aria-label="GitHub repository"
          >
            <GithubLogo className="size-4" weight="bold" aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
