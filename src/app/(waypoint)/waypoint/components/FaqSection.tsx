"use client";

import React, { useState } from "react";
import { AccordionItem } from "./AccordionItem";

const FAQ_ITEMS = [
  {
    question: "How does the direct email outreach integration work?",
    answer:
      "Waypoint connects directly to your personal Gmail or Google Workspace inbox via secure OAuth with send-on-behalf permissions. Your outreach sends directly from your personal account, ensuring 100% authentic deliverability without falling into promotional tabs or spam filters.",
  },
  {
    question: "Is my candidate outreach data kept private from recruiters?",
    answer:
      "Yes. All contact lists, email draft bodies, salary negotiations, and interview round notes are encrypted client-side using local device keys. We never monetize candidate contacts, sell lead data, or train public AI models on your private communications.",
  },
  {
    question: "Can I export my pipeline data to CSV or Notion?",
    answer:
      "At any moment you can export your entire pipeline—including conversation histories, stage timelines, recruiter contact emails, and preparation notes—into structured CSV or JSON format with a single click.",
  },
  {
    question: "What happens when I reach the 25 application limit on the free Starter plan?",
    answer:
      "You retain permanent access to view, update, and manage all existing applications and replies. You only need to upgrade to the Professional plan if you choose to expand your outreach volume.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function handleToggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#EDE6DF] relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5DDD4] text-xs font-bold text-[#1E4F94] mb-3">
            Questions &bull; Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.035em] text-[#121417] leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#2B2F38] leading-relaxed">
            Everything you need to know about direct outreach deliverability, encryption privacy, and pipeline ownership.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
