"use client";

import React from "react";
import { BillingCadence, calculatePlanPrice, PlanId } from "../lib/pricingMath";
import { OdometerCounter } from "./OdometerCounter";

interface PricingCardProps {
  planId: PlanId;
  cadence: BillingCadence;
  title: string;
  tagline: string;
  badge?: string;
  badgeStyle?: "free" | "popular" | "studio";
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

export function PricingCard({
  planId,
  cadence,
  title,
  tagline,
  badge,
  badgeStyle = "popular",
  features,
  ctaText,
  isPopular = false,
}: PricingCardProps) {
  const priceData = calculatePlanPrice(planId, cadence);

  return (
    <div
      className={`rounded-2xl p-7 md:p-8 flex flex-col justify-between transition-all ${
        isPopular
          ? "bg-[#FFFFFF] border-2 border-[#1E4F94] shadow-xl md:-translate-y-2 relative"
          : "bg-[#FFFFFF] border border-[#E5DDD4] shadow-xs hover:border-[#D8D0C5]"
      }`}
    >
      <div>
        {/* Card Header & Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-xl font-extrabold text-[#121417]">{title}</h3>
          {badge && (
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                badgeStyle === "free"
                  ? "bg-[#D8EADF] text-[#216143]"
                  : badgeStyle === "popular"
                  ? "bg-[#DBE8FA] text-[#1E4F94]"
                  : "bg-[#FAF8F5] text-[#2B2F38] border border-[#E5DDD4]"
              }`}
            >
              {badge}
            </span>
          )}
        </div>

        <p className="text-xs text-[#666E7D] mb-6 leading-relaxed">{tagline}</p>

        {/* Dynamic Odometer Price */}
        <div className="flex items-baseline gap-1.5 mb-6">
          <OdometerCounter
            value={priceData.amount}
            className="text-4xl sm:text-5xl font-black text-[#121417] tracking-tight"
          />
          <span className="text-xs font-semibold text-[#666E7D]">
            {priceData.cadenceText}
          </span>
        </div>

        {/* Feature List */}
        <div className="space-y-3 pt-6 border-t border-[#E5DDD4]">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-[#2B2F38]">
              <span className="text-[#216143] font-bold text-sm leading-none shrink-0">
                ✓
              </span>
              <span className="leading-normal">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8 pt-4">
        <a
          href="#get-started"
          className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-center block transition-all ${
            isPopular
              ? "bg-[#121417] text-[#F5EFEB] shadow-md hover:bg-[#2B2F38]"
              : "bg-[#FAF8F5] text-[#121417] border border-[#E5DDD4] hover:bg-[#E5DDD4]/60"
          }`}
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}
