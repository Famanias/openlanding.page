"use client";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col">
          <span className="meta">STUDIO &amp; KILN</span>
          <p>
            Kyoto Studio / Shigaraki Clay Basin
            <br />
            Private visits by prior reservation.
          </p>
        </div>
        <div className="footer-col">
          <span className="meta">DIRECT INQUIRIES</span>
          <p>
            studio@strata-ceramics.com
            <br />
            +81 (0)75 491 8023
          </p>
        </div>
        <div className="footer-col">
          <span className="meta">COLOPHON</span>
          <p>
            Edition 001 · Stoneware Study
            <br />
            Hand-thrown in small batch sequence.
          </p>
        </div>
      </div>

      <div className="footer-brand" aria-hidden="true">
        STRATA
      </div>

      <div className="footer-bottom">
        <div>&copy; 2026 STRATA STUDIO. ALL RIGHTS RESERVED.</div>
        <div className="footer-links">
          <button
            type="button"
            onClick={scrollToTop}
            className="cursor-pointer bg-transparent border-0 text-inherit p-0"
          >
            Back to top &uarr;
          </button>
          <a href="#object">Anatomy</a>
          <a href="#collection">Collection</a>
          <a href="#closing">Inquire</a>
        </div>
      </div>
    </footer>
  );
}
