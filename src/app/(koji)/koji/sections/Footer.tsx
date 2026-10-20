import { Hanko } from "../brand/Hanko";
import { Wordmark } from "../brand/Wordmark";

export function Footer() {
  return (
    <footer className="kj-footer">
      <div className="kj-footer__brand">
        <Hanko size={64} />
        <Wordmark className="kj-footer__wordmark" />
      </div>
      <dl className="kj-footer__info">
        <div>
          <dt className="kj-mono">Address</dt>
          <dd>Tower 1972, 14F · 8-chōme Ginza, Chūō-ku, Tokyo</dd>
        </div>
        <div>
          <dt className="kj-mono">Hours</dt>
          <dd>Tue–Sat · 18:00–23:00</dd>
        </div>
        <div>
          <dt className="kj-mono">Contact</dt>
          <dd>reserve@koji.example</dd>
        </div>
      </dl>
      <p className="kj-mono kj-footer__legal">© 2026 KŌJI 麹</p>
    </footer>
  );
}
