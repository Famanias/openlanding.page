export function Footer() {
  return (
    <footer className="nx-footer">
      <div className="nx-container">
        <div className="nx-footer-grid">
          <div>
            <a href="#top" className="nx-wordmark">
              nexus
            </a>
            <p style={{ margin: "0.35rem 0 0", fontSize: "0.95rem", color: "var(--ink-muted)" }}>
              © 2026 nexus creative studio. Hand-crafted with care &amp; serif type.
            </p>
          </div>

          <ul className="nx-footer-links">
            <li>
              <a href="#top" className="nx-drawn-link">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="nx-drawn-link">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="nx-drawn-link">
                Services
              </a>
            </li>
            <li>
              <a href="#work" className="nx-drawn-link">
                Work
              </a>
            </li>
            <li>
              <a href="#contact" className="nx-drawn-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
