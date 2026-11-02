import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/poppyPatchData';
import { ChevronDown } from 'lucide-react';

export function FaqSection() {
  const [openIds, setOpenIds] = useState<string[]>([FAQ_ITEMS[0].id]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-16 sm:py-24 relative border-t border-[#4A2E25]/10 bg-[#FAF3E3]/45"
    >
      <div className="max-w-[1040px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs sm:text-sm font-bold tracking-[0.12em] uppercase text-[#8A4D38] mb-2">
            CARE, STORAGE & REALISTIC ANSWERS
          </p>
          <h2
            id="faq-heading"
            className="font-serif-display font-bold text-[#4A2E25] text-[clamp(2rem,3.8vw,3.1rem)] leading-[1.08] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Questions from curious first-time growers.
          </h2>
          <p className="mt-3 text-[15px] text-[#5E4137]">
            Straightforward tips on storing, misting, and cooking your harvest—no mycology degree required.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openIds.includes(item.id);
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-btn-${item.id}`;

            return (
              <div
                key={item.id}
                className="card-papier bg-[#FAF3E3] border border-[#4A2E25]/15 overflow-hidden"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left px-6 py-5 sm:px-7 sm:py-6 flex items-center justify-between gap-4 hover:bg-[#F4E8D0]/60 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#4A2E25]"
                  >
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-[#8A4D38] mb-1">
                        {item.category}
                      </span>
                      <span className="font-serif-display font-bold text-lg sm:text-xl text-[#4A2E25]">
                        {item.question}
                      </span>
                    </div>
                    <span
                      className={`w-9 h-9 rounded-full border border-[#4A2E25]/20 bg-[#F7ECD6] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#E58267]/30' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 text-[#4A2E25]" aria-hidden="true" />
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 border-t border-[#4A2E25]/10 text-[15px] text-[#563A32] leading-relaxed"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
