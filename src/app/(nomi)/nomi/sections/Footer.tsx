import { Logo } from "../brand/Logo";

export function Footer() {
  return (
    <footer className="nm-footer">
      <div className="container">
        <div className="nm-mast">
          <Logo mast />
        </div>
        <div className="nm-footer-base">
          <nav aria-label="Footer">
            <ul>
              <li><a href="#launch">Product</a></li>
              <li><a href="#studios">Studios</a></li>
              <li><a href="#plans">Plans</a></li>
              <li><a href="#demo">Request a walkthrough</a></li>
            </ul>
          </nav>
          <p>© 2026 NOMI Workspace. A fictional template, and its form is not connected.</p>
        </div>
      </div>
    </footer>
  );
}
