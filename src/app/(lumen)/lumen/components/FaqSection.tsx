import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../utils/workflowLogic';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    free: true,
    receive: true,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="landing-section py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium text-[#657187]">
            07 · FREQUENTLY ASKED QUESTIONS
          </p>
          <h2
            id="faq-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
          >
            Everything you need to know.
          </h2>
          <p className="mt-4 text-base text-[#657187] leading-relaxed">
            Clear answers about what is inside the playbook, how to apply the frameworks, and how this interactive preview handles your email.
          </p>
        </div>

        <div className="mt-10 divide-y divide-[#1E2432]/10 rounded-3xl glass-panel px-6 py-2 sm:px-8">
          {FAQ_ITEMS.map((item) => {
            const isOpen = Boolean(openIds[item.id]);
            const contentId = `faq-answer-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div key={item.id} className="py-5">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full items-center justify-between gap-4 text-left text-base font-semibold text-[#1E2432] hover:text-[#252C43] transition-colors duration-160 ease-[var(--lm-ease-feedback)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#657187] shrink-0 transition-transform duration-160 ease-[var(--lm-ease-feedback)] ${
                        isOpen ? 'rotate-180 text-[#1E2432]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={isOpen ? 'mt-3 pr-8 text-sm text-[#657187] leading-relaxed' : 'hidden'}
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
