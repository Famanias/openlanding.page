"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GithubLogo, MagnifyingGlass, X, BracketsAngle, Star } from "@phosphor-icons/react/dist/ssr";
import { updateGalleryFilters, useGalleryFilters } from "./useGalleryFilters";

export function Header() {
  const { query } = useGalleryFilters();
  const searchRef = useRef<HTMLInputElement>(null);
  const [stars, setStars] = useState<number | null>(null);
  const [starsUnavailable, setStarsUnavailable] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function loadStars() {
      try {
        const response = await fetch("/api/github-stars", { signal: controller.signal });
        if (!response.ok) throw new Error("Star count unavailable");
        const data = await response.json();
        if (!Number.isSafeInteger(data.stars) || data.stars < 0) throw new Error("Invalid star count");
        if (!controller.signal.aborted) setStars(data.stars);
      } catch {
        if (!controller.signal.aborted) setStarsUnavailable(true);
      }
    }
    void loadStars();
    return () => controller.abort();
  }, []);

  const starCount = stars === null ? null : new Intl.NumberFormat("en", {
    notation: "compact", maximumFractionDigits: 1,
  }).format(stars);
  const starDescription = stars === null
    ? (starsUnavailable ? "Star count unavailable" : "Loading star count")
    : `${stars.toLocaleString("en-US")} ${stars === 1 ? "star" : "stars"}`;
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
      <div className="scroll-progress" aria-hidden="true" />
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
            href="#contact"
            className="nav-link"
          >
            Request a template
          </a>
          <a
            href="https://github.com/Famanias/openlanding.page"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-github"
            aria-label={`GitHub repository, ${starDescription}`}
            title={starDescription}
          >
            <GithubLogo className="size-4" weight="bold" aria-hidden="true" />
            <span className="nav-github-label">GitHub</span>
            <span className="nav-github-stars" aria-hidden="true" aria-busy={stars === null && !starsUnavailable}>
              <Star size={12} weight="fill" />
              <span>{starCount ?? (starsUnavailable ? "—" : "…")}</span>
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
