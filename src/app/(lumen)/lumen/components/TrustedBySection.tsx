import React from 'react';

interface PlaceholderCompany {
  id: string;
  name: string;
  renderMark: () => React.ReactNode;
}

const PLACEHOLDER_COMPANIES: PlaceholderCompany[] = [
  {
    id: 'kinetic',
    name: 'KINETIC LABS',
    renderMark: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#1E2432]" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <path d="M11 7H17V13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'aether',
    name: 'AETHER SYSTEMS',
    renderMark: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#1E2432]" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
        <ellipse cx="12" cy="12" rx="8" ry="3.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'veridian',
    name: 'VERIDIAN OPS',
    renderMark: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#1E2432]" aria-hidden="true">
        <path
          d="M4 6L12 19L20 6"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 6L12 12L15.5 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'northstar',
    name: 'NORTHSTAR AI',
    renderMark: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#1E2432]" aria-hidden="true">
        <path
          d="M12 3L14.4 9.6L21 12L14.4 14.4L12 21L9.6 14.4L3 12L9.6 9.6L12 3Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'solaris',
    name: 'SOLARIS GROUP',
    renderMark: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#1E2432]" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M12 3V5.5M12 18.5V21M3 12H5.5M18.5 12H21M5.6 5.6L7.4 7.4M16.6 16.6L18.4 18.4M18.4 5.6L16.6 7.4M7.4 16.6L5.6 18.4"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'vanguard',
    name: 'VANGUARD STUDIO',
    renderMark: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#1E2432]" aria-hidden="true">
        <polygon
          points="12,3 21,8.5 21,15.5 12,21 3,15.5 3,8.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export const TrustedBySection: React.FC = () => {
  return (
    <section
      id="trusted-by"
      aria-label="Trusted by organizations"
      className="landing-section py-10 sm:py-12"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[#657187]">
              TRUSTED BY WORKFLOW &amp; OPERATIONS TEAMS
            </p>
            <p className="text-xs text-[#657187]">
              Frameworks adopted across product, delivery, and technical operations groups
            </p>
          </div>

          <div
            role="list"
            aria-label="Placeholder company logos"
            className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
          >
            {PLACEHOLDER_COMPANIES.map((company) => (
              <div
                key={company.id}
                role="listitem"
                className="glass-panel-subtle flex items-center justify-center gap-2.5 rounded-xl px-4 py-3.5 text-[#1E2432]/80 hover:text-[#1E2432] transition-colors"
              >
                <span className="shrink-0">{company.renderMark()}</span>
                <span className="font-mono text-[11px] font-semibold tracking-wider whitespace-nowrap">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
