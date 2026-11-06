"use client";

import { useEffect, useState } from "react";

interface HeaderProps {
  onOpenInquiry: (finish?: string) => void;
}

export function Header({ onOpenInquiry }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.body.classList.add("is-locked");
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.classList.remove("is-locked");
    }
    return () => {
      document.body.classList.remove("is-locked");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="nav" id="nav">
        <div className="nav-inner">
          <div>
            <a href="#top" className="wordmark" aria-label="STRATA home">
              STRATA<i>®</i>
            </a>
          </div>
          <nav className="nav-center" aria-label="Main navigation">
            <a href="#object">The vessel</a>
            <a href="#craft">Our craft</a>
            <a href="#collection">Collection</a>
          </nav>
          <div className="nav-right">
            <button
              type="button"
              className="nav-cta"
              onClick={() => onOpenInquiry()}
              aria-label="Discover STRATA inquiries"
            >
              Discover STRATA
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35">
                <path d="M5 12h13m-5-5 5 5-5 5" />
              </svg>
            </button>
            <button
              type="button"
              className="menu-button"
              id="menu-open"
              aria-expanded={isMenuOpen}
              aria-controls="menu-surface"
              onClick={() => setIsMenuOpen(true)}
            >
              Menu <span className="menu-ic" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`menu-surface ${isMenuOpen ? "is-open" : ""}`}
        id="menu-surface"
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          className="menu-close"
          id="menu-close"
          aria-label="Close menu"
          onClick={() => setIsMenuOpen(false)}
        >
          &times;
        </button>
        <nav className="menu-links">
          <a href="#top" onClick={handleLinkClick}>01 / Discover</a>
          <a href="#manifesto" onClick={handleLinkClick}>02 / Ethos</a>
          <a href="#object" onClick={handleLinkClick}>03 / Anatomy</a>
          <a href="#craft" onClick={handleLinkClick}>04 / Process</a>
          <a href="#interior" onClick={handleLinkClick}>05 / Living</a>
          <a href="#collection" onClick={handleLinkClick}>06 / Finishes</a>
          <a
            href="#closing"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick();
              onOpenInquiry();
            }}
          >
            07 / Inquire
          </a>
        </nav>
      </div>
    </>
  );
}
