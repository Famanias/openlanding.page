"use client";

import React, { useState } from "react";
import { BillingCadence } from "../lib/pricingMath";
import { PricingCard } from "./PricingCard";

export function PricingSection() {
  const [cadence, setCadence] = useState<BillingCadence>("monthly");

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#EDE6DF] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5DDD4] text-xs font-bold text-[#1E4F94] mb-3">
            Pricing &bull; Direct Agency
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.035em] text-[#121417] leading-tight mb-4">
            Transparent while you search.
          </h2>
          <p className="text-base text-[#2B2F38] leading-relaxed">
            No agency middleman taking 25% of your signing bonus. You write the pitches, you own the relationship, and your first 25 tracked applications cost nothing.
          </p>

          {/* Cadence Switcher */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-[#E5DDD4] border border-[#D8D0C5]">
            <button
              type="button"
              onClick={() => setCadence("monthly")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                cadence === "monthly"
                  ? "bg-[#FFFFFF] text-[#121417] shadow-xs"
                  : "text-[#666E7D] hover:text-[#121417]"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setCadence("annual")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                cadence === "annual"
                  ? "bg-[#FFFFFF] text-[#121417] shadow-xs"
                  : "text-[#666E7D] hover:text-[#121417]"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D8EADF] text-[#216143]">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch max-w-5xl mx-auto">
          <PricingCard
            planId="starter"
            cadence={cadence}
            title="Starter"
            tagline="For engineers tracking their initial outreach and warm intros."
            badge="Permanent Free"
            badgeStyle="free"
            features={[
              "25 active tracked applications a month",
              "Verified personal Gmail/OAuth integration",
              "Standard follow-up pacing reminders",
              "Direct company contact directory",
              "Client-side local encryption",
            ]}
            ctaText="Get started free"
          />

          <PricingCard
            planId="pro"
            cadence={cadence}
            title="Professional"
            tagline="For focused job hunts across multiple companies and stages."
            badge="Most Popular"
            badgeStyle="popular"
            isPopular
            features={[
              "350 tracked applications a month",
              "AI pitch personalization tailored to company",
              "Automated multi-step reply sequences",
              "Read receipts & recruiter view telemetry",
              "Calendar round prep notes & checklist sync",
              "Priority support & direct pipeline import",
            ]}
            ctaText="Start 14-day trial"
          />

          <PricingCard
            planId="studio"
            cadence={cadence}
            title="Studio & Coaching"
            tagline="For career coaches, bootcamps, and shared pipeline mentoring."
            badge="Team Scale"
            badgeStyle="studio"
            features={[
              "Unlimited applications and outreach sends",
              "Custom domain sender addresses (SPF/DKIM)",
              "Shared pipeline collaboration & notes",
              "Priority AI drafting & review queue",
              "Calendar interview link routing",
              "Bulk CSV and Notion export sync",
            ]}
            ctaText="Join the waitlist"
          />
        </div>

        <p className="mt-12 text-center text-xs text-[#666E7D]">
          All plans include client-side zero-knowledge encryption. Cancel or export anytime in one click.
        </p>
      </div>
    </section>
  );
}
