import React from 'react';

export const BenefitsSection: React.FC = () => {
  return (
    <section
      id="benefits"
      aria-labelledby="benefits-heading"
      className="landing-section py-20 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium text-[#657187]">
            03 · THE BENEFITS — WHAT BETTER WORKFLOWS ENABLE
          </p>
          <h2
            id="benefits-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
          >
            Less busywork. More meaningful work.
          </h2>
          <p className="mt-4 text-base text-[#657187] leading-relaxed">
            Well-designed workflows do not replace human judgment—they remove repetitive formatting, sorting, and first-pass synthesis so your team can focus on decisions that matter.
          </p>
        </div>

        {/* Asymmetric Bento Grid with 3 distinct SVG visual compositions */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Benefit 01 — Find opportunities (col-span-4) */}
          <article
            data-lm-reveal="card"
            style={{ transitionDelay: '0ms' }}
            className="glass-panel rounded-3xl p-6 sm:p-7 lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs font-semibold text-[#657187]">
                01. FIND OPPORTUNITIES
              </span>
              <h3 className="mt-2 text-xl font-bold text-[#1E2432]">
                Identify repetitive tasks worth improving.
              </h3>
              <p className="mt-2.5 text-sm text-[#657187] leading-relaxed">
                Spot high-frequency intake, triage, and summarization patterns before investing time in tooling.
              </p>
            </div>

            {/* Illustration 1: Scattered fragments classified into organized lanes */}
            <div className="mt-6 rounded-2xl border border-white/85 bg-white/70 p-4">
              <svg
                viewBox="0 0 320 150"
                className="h-36 w-full"
                role="img"
                aria-label="Scattered task fragments sorting into organized category groups"
              >
                {/* Left scattered fragments */}
                <rect x="14" y="18" width="54" height="24" rx="6" fill="#D8D0F7" fillOpacity="0.65" stroke="#1E2432" strokeOpacity="0.15" />
                <rect x="24" y="58" width="54" height="24" rx="6" fill="#C9DAFA" fillOpacity="0.75" stroke="#1E2432" strokeOpacity="0.15" />
                <rect x="12" y="98" width="54" height="24" rx="6" fill="#F6DCCA" fillOpacity="0.75" stroke="#1E2432" strokeOpacity="0.15" />

                {/* Sorting curves */}
                <path d="M 68 30 C 115 30, 120 32, 162 32" fill="none" stroke="#657187" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 78 70 C 120 70, 125 74, 162 74" fill="none" stroke="#657187" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 66 110 C 115 110, 120 116, 162 116" fill="none" stroke="#657187" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Organized Group Lanes on Right */}
                <g transform="translate(164, 16)">
                  <rect width="142" height="32" rx="8" fill="#F8F9FC" stroke="#1E2432" strokeOpacity="0.12" />
                  <rect x="8" y="8" width="16" height="16" rx="4" fill="#D8D0F7" />
                  <text x="32" y="20" fontSize="10" fontWeight="600" fill="#1E2432">Client Intake</text>
                </g>
                <g transform="translate(164, 58)">
                  <rect width="142" height="32" rx="8" fill="#F8F9FC" stroke="#1E2432" strokeOpacity="0.12" />
                  <rect x="8" y="8" width="16" height="16" rx="4" fill="#C9DAFA" />
                  <text x="32" y="20" fontSize="10" fontWeight="600" fill="#1E2432">Doc Extraction</text>
                </g>
                <g transform="translate(164, 100)">
                  <rect width="142" height="32" rx="8" fill="#F8F9FC" stroke="#1E2432" strokeOpacity="0.12" />
                  <rect x="8" y="8" width="16" height="16" rx="4" fill="#F6DCCA" />
                  <text x="32" y="20" fontSize="10" fontWeight="600" fill="#1E2432">Meeting Actions</text>
                </g>
              </svg>
            </div>
          </article>

          {/* Benefit 02 — Build repeatable workflows (col-span-4) */}
          <article
            data-lm-reveal="card"
            style={{ transitionDelay: '50ms' }}
            className="glass-panel rounded-3xl p-6 sm:p-7 lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs font-semibold text-[#657187]">
                02. BUILD REPEATABLE WORKFLOWS
              </span>
              <h3 className="mt-2 text-xl font-bold text-[#1E2432]">
                Create practical systems with clear steps and responsibilities.
              </h3>
              <p className="mt-2.5 text-sm text-[#657187] leading-relaxed">
                Connect inputs, prompt templates, and destination tools into a documented sequence anyone on your team can follow.
              </p>
            </div>

            {/* Illustration 2: Glass panels connected through clear SVG pathways */}
            <div className="mt-6 rounded-2xl border border-white/85 bg-white/70 p-4">
              <svg
                viewBox="0 0 320 150"
                className="h-36 w-full"
                role="img"
                aria-label="Three workflow nodes linked by SVG pathways"
              >
                <path
                  d="M 88 45 C 120 45, 115 75, 136 75 C 185 75, 195 105, 228 105"
                  fill="none"
                  stroke="#C9DAFA"
                  strokeWidth="3"
                />
                <path
                  d="M 88 45 C 120 45, 115 75, 136 75 C 185 75, 195 105, 228 105"
                  fill="none"
                  stroke="#252C43"
                  strokeWidth="2.5"
                />

                {/* Step Node 1 */}
                <g transform="translate(14, 24)">
                  <rect width="76" height="42" rx="10" fill="#FFFFFF" stroke="#1E2432" strokeOpacity="0.16" />
                  <text x="12" y="18" fontSize="8" fontFamily="monospace" fill="#657187">STEP 01</text>
                  <text x="12" y="31" fontSize="10" fontWeight="600" fill="#1E2432">Trigger</text>
                </g>

                {/* Step Node 2 */}
                <g transform="translate(122, 54)">
                  <rect width="80" height="42" rx="10" fill="#FFFFFF" stroke="#252C43" strokeOpacity="0.28" />
                  <text x="12" y="18" fontSize="8" fontFamily="monospace" fill="#657187">STEP 02</text>
                  <text x="12" y="31" fontSize="10" fontWeight="600" fill="#1E2432">Structure</text>
                </g>

                {/* Step Node 3 */}
                <g transform="translate(228, 84)">
                  <rect width="78" height="42" rx="10" fill="#FFFFFF" stroke="#5BA59A" strokeOpacity="0.45" />
                  <text x="12" y="18" fontSize="8" fontFamily="monospace" fill="#5BA59A">STEP 03</text>
                  <text x="12" y="31" fontSize="10" fontWeight="600" fill="#1E2432">Deliver</text>
                </g>
              </svg>
            </div>
          </article>

          {/* Benefit 03 — Stay in control (col-span-4) */}
          <article
            data-lm-reveal="card"
            style={{ transitionDelay: '100ms' }}
            className="glass-panel rounded-3xl p-6 sm:p-7 lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs font-semibold text-[#657187]">
                03. STAY IN CONTROL
              </span>
              <h3 className="mt-2 text-xl font-bold text-[#1E2432]">
                Keep reviews, approvals, and important decisions in human hands.
              </h3>
              <p className="mt-2.5 text-sm text-[#657187] leading-relaxed">
                Place explicit verification checkpoints before external communication or critical updates take effect.
              </p>
            </div>

            {/* Illustration 3: AI route passing through a clear human review checkpoint */}
            <div className="mt-6 rounded-2xl border border-white/85 bg-white/70 p-4">
              <svg
                viewBox="0 0 320 150"
                className="h-36 w-full"
                role="img"
                aria-label="AI draft route passing through a human approval checkpoint gate"
              >
                {/* Horizontal flow line */}
                <line x1="24" y1="75" x2="296" y2="75" stroke="#C9DAFA" strokeWidth="2.5" />

                {/* Left Node: AI Draft */}
                <g transform="translate(16, 48)">
                  <rect width="76" height="54" rx="10" fill="#F8F9FC" stroke="#1E2432" strokeOpacity="0.15" />
                  <text x="12" y="22" fontSize="8" fontFamily="monospace" fill="#657187">AI STEP</text>
                  <text x="12" y="38" fontSize="10" fontWeight="600" fill="#1E2432">Draft Ready</text>
                </g>

                {/* Center Checkpoint Gate */}
                <g transform="translate(114, 34)">
                  <rect width="94" height="82" rx="14" fill="#252C43" />
                  <text x="14" y="26" fontSize="8" fontFamily="monospace" fill="#C9DAFA">CHECKPOINT</text>
                  <text x="14" y="45" fontSize="10" fontWeight="600" fill="#FFFFFF">Human Review</text>
                  <rect x="14" y="56" width="66" height="16" rx="5" fill="#5BA59A" />
                  <text x="25" y="67" fontSize="8" fontWeight="600" fill="#FFFFFF">Approved</text>
                </g>

                {/* Right Node: Released Output */}
                <g transform="translate(228, 48)">
                  <rect width="76" height="54" rx="10" fill="#F8F9FC" stroke="#5BA59A" strokeOpacity="0.5" />
                  <text x="12" y="22" fontSize="8" fontFamily="monospace" fill="#5BA59A">VERIFIED</text>
                  <text x="12" y="38" fontSize="10" fontWeight="600" fill="#1E2432">Sent Safely</text>
                </g>
              </svg>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
