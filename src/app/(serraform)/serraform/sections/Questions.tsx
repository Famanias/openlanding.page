'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { FAQ_ITEMS } from '../fold/config';

export const Questions: React.FC = () => {
  return (
    <section
      id="questions"
      className="py-16 lg:py-24 border-b border-[var(--srf-hairline)] scroll-mt-20"
    >
      <div className="srf-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-start">
          <div className="lg:col-span-4">
            <div className="mb-3 srf-mono-caption text-[var(--srf-mauve)]">
              Questions
            </div>
            <h2 className="srf-h2 text-[var(--srf-oxblood)] text-balance">
              Practical notes.
            </h2>
          </div>

          <div className="lg:col-start-6 lg:col-span-7">
            <div>
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="srf-faq-item group">
                  <summary className="srf-faq-summary">
                    <span>{item.question}</span>
                    <Plus
                      className="srf-faq-icon text-[var(--srf-oxblood)]"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="srf-faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
