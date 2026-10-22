"use client";

import { PROJECT_KITS } from "../workbench/workbench-data";
import { Reveal } from "../motion/Reveal";

export function ProjectKitsSection() {
  const handleReserve = () => {
    const el = document.getElementById("requisition");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="kits" className="lh-section lh-kits-section" aria-label="Curated Project Field Packs">
      <div className="lh-wrap">
        <div className="lh-section-head">
          <div className="lh-kicker">CURATED FIELD PACKS // ALL-IN-ONE RIGS</div>
          <h2 className="lh-section-title">Tested Project Packs for Heavy Builds</h2>
          <p className="lh-section-desc">
            Assemble complete trade workflows in one click. Packed in modular stackable Systainers with all
            matching collets, guide rails, carbide bits, and safety respirators.
          </p>
        </div>

        <div className="lh-kits-grid">
          {PROJECT_KITS.map((kit, idx) => (
            <Reveal key={kit.id} variant="rise" index={idx} className="lh-kit-card">
              <div className="lh-kit-header">
                <span className="lh-kit-code">{kit.code}</span>
                <span className="lh-kit-days">{kit.loanDays} DAY STANDARD LOAN</span>
              </div>

              <div className="lh-kit-body">
                <span className="lh-kit-category">{kit.category.toUpperCase()}</span>
                <h3 className="lh-kit-title">{kit.title}</h3>
                <p className="lh-kit-desc">{kit.description}</p>

                <div className="lh-kit-manifest">
                  <span className="lh-manifest-heading">PACK MANIFEST:</span>
                  <ul className="lh-manifest-list">
                    {kit.toolsIncluded.map((item) => (
                      <li key={item} className="lh-manifest-item">
                        <span className="lh-manifest-check">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lh-kit-spec-note">
                  <span className="lh-spec-note-icon">ℹ</span>
                  <p className="lh-spec-note-text">{kit.specNotes}</p>
                </div>
              </div>

              <div className="lh-kit-footer">
                <button
                  type="button"
                  className="lh-btn lh-btn-dark w-full"
                  onClick={handleReserve}
                  aria-label={`Requisition ${kit.title}`}
                >
                  Requisition Pack ({kit.code}) →
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
