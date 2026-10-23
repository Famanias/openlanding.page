import { NomiForm } from "../forms/NomiForm";
import { Words } from "../motion/Words";

export function Demo() {
  return (
    <section className="nm-demo" id="demo">
      <div className="container nm-demo-grid">
        <div className="nm-demo-copy">
          <h2 data-nm-reveal="mask"><Words text="Give your studio a softer day." /></h2>
          <p className="lead" data-nm-reveal="rise">Tell us a little about your studio. We’ll send a private walkthrough with no pitch deck attached.</p>
          <ul className="nm-facts" data-nm-reveal="stagger">
            <li>A private 20-minute look.</li>
            <li>No commitment.</li>
          </ul>
        </div>
        <NomiForm />
      </div>
    </section>
  );
}
