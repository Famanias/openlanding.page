'use client';

import React from 'react';
import { BriefForm } from '../forms/BriefForm';

export const BriefSection: React.FC = () => {
  return (
    <section
      id="brief"
      className="py-16 lg:py-24 border-b border-[var(--srf-hairline)] scroll-mt-20"
    >
      <div className="srf-container">
        <div className="max-w-[660px] mb-10">
          <div className="mb-3 srf-mono-caption text-[var(--srf-mauve)]">
            Room brief
          </div>
          <h2
            id="brief-heading"
            tabIndex={-1}
            className="srf-h2 text-[var(--srf-oxblood)] text-balance mb-4 focus:outline-none"
          >
            Start with the room you have.
          </h2>
          <p className="text-[var(--srf-mauve)] max-w-[50ch]">
            Keep your chosen shape, custom palette, print, and placement notes together in a local room brief.
          </p>
        </div>

        <BriefForm />
      </div>
    </section>
  );
};
