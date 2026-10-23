"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { GithubLogo, MagnifyingGlass, X, BracketsAngle } from "@phosphor-icons/react/dist/ssr";
import { updateGalleryFilters, useGalleryFilters } from "./useGalleryFilters";

export function Header() {
  const { query } = useGalleryFilters();
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);
  return (
    <header className="site-header">
      <a href="#gallery" className="skip-link">Skip to templates</a>
      <div className="page-container header-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label="openlandingpage home"
        >
          <BracketsAngle size={24} weight="bold" aria-hidden="true" />
          <span>openlandingpage</span>
        </Link>

        <form role="search" className="header-search" action="/#gallery" onSubmit={(event) => {
          event.preventDefault();
          document.getElementById("gallery")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        }}>
          <MagnifyingGlass size={20} aria-hidden="true" />
          <input ref={searchRef} type="search" name="q" aria-label="Search templates" placeholder="Find your next starting point…" value={query} maxLength={160}
            onChange={(event) => updateGalleryFilters({ query: event.target.value })}
            onKeyDown={(event) => { if (event.key === "Escape") { updateGalleryFilters({ query: "" }); searchRef.current?.blur(); } }} />
          {query ? <button type="button" aria-label="Clear search" onClick={() => { updateGalleryFilters({ query: "" }); searchRef.current?.focus(); }}><X size={16} /></button>
            : <kbd aria-hidden="true">Ctrl K</kbd>}
        </form>
        <nav className="header-nav" aria-label="Main Navigation">
          <a
            href="#gallery"
            className="nav-link"
          >
            Gallery
          </a>
          <a
            href="#contribute"
            className="nav-link"
          >
            Contribute
          </a>
          <a
            href="https://github.com/Famanias/openlanding.page"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-github"
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
