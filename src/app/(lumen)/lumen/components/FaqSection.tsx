'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQ_ITEMS } from '../utils/workflowLogic';
import { SplitText } from '../motion/SplitText';

export function FaqSection() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ free: true, receive: true });
  return (
    <section id="faq" aria-labelledby="faq-heading" className="landing-section py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div>
          <h2 id="faq-heading" data-lm-heading=""><SplitText text="Everything you need to know." /></h2>
          <p>Clear answers about what is inside the playbook, how to apply the frameworks, and how this interactive preview handles your email.</p>
          <a className="lm-text-link" href="#hero-download-form"><span>Ready to get started?</span><Plus size={14} aria-hidden="true" /></a>
        </div>
        <div className="divide-y divide-[#1E2432]/10">
          {FAQ_ITEMS.map((item) => {
            const open = Boolean(openIds[item.id]);
            return (
              <div key={item.id} className="lm-faq-row">
                <h3><button id={'faq-button-' + item.id} type="button" aria-expanded={open} aria-controls={'faq-answer-' + item.id} onClick={() => setOpenIds((old) => ({ ...old, [item.id]: !old[item.id] }))} className="flex w-full items-center justify-between gap-4 text-left font-medium cursor-pointer"><span>{item.question}</span><Plus aria-hidden="true" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }} /></button></h3>
                <div id={'faq-answer-' + item.id} role="region" aria-labelledby={'faq-button-' + item.id} aria-hidden={!open} inert={!open} className="lm-faq-answer" data-open={open}><div><p>{item.answer}</p></div></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
