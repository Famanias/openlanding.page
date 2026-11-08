import { LogoMark } from "../brand/Logo";
import { PROFILE } from "../content/profile";

export function Footer() {
  return (
    <footer className="pby-footer">
      <div className="pby-shell pby-footer-inner">
        <p className="pby-footer-brand">
          <LogoMark className="pby-logo-mark" />
          <span>
            {PROFILE.name} · {PROFILE.location}
          </span>
        </p>
        <ul className="pby-footer-links">
          {PROFILE.links.map((link) => (
            <li key={link.label}>
              <a className="pby-link" href={link.href} rel="noreferrer noopener" target="_blank">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="pby-mono pby-footer-note">Built on Patchbay, a role-switching portfolio template.</p>
      </div>
    </footer>
  );
}
