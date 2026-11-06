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
      data-popular={isPopular ? "true" : undefined}
      style={isPopular ? { backgroundColor: "#836953", color: "#ffffff", border: 0, outline: 0 } : undefined}
      className={`rounded-2xl p-7 md:p-8 flex flex-col justify-between transition-[border-color,box-shadow,transform] duration-200 ease-out ${
        isPopular
          ? "bg-[#836953] text-white border-0 outline-none shadow-xl md:-translate-y-2 relative"
          : "bg-[#FFFFFF] border border-[#E5DDD4] shadow-xs hover:border-[#D8D0C5]"
      }`}
    >
      <div>
        {/* Card Header & Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className={`text-xl font-extrabold ${isPopular ? "text-white" : "text-[#121417]"}`}>{title}</h3>
          {badge && (
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                isPopular
                  ? "bg-[#121417] text-white border border-white/20"
                  : badgeStyle === "free"
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

        <p className={`text-xs mb-6 leading-relaxed ${isPopular ? "text-white/90" : "text-[#666E7D]"}`}>{tagline}</p>

        {/* Dynamic Odometer Price */}
        <div className="flex items-baseline gap-1.5 mb-6">
          <OdometerCounter
            value={priceData.amount}
            className={`text-4xl sm:text-5xl font-black tracking-tight ${isPopular ? "text-white" : "text-[#121417]"}`}
          />
          <span className={`text-xs font-semibold ${isPopular ? "text-white/85" : "text-[#666E7D]"}`}>
            {priceData.cadenceText}
          </span>
        </div>

        {cadence === "annual" && planId !== "starter" && (
          <p className={`text-xs mb-5 ${isPopular ? "text-white/80" : "text-[#666E7D]"}`}>
            Billed ${priceData.amount * 12} yearly. Save $
            {((planId === "pro" ? 28 : 58) - priceData.amount) * 12} a year.
          </p>
        )}

        {/* Feature List */}
        <div className={`space-y-3 pt-6 border-t ${isPopular ? "border-white/20" : "border-[#E5DDD4]"}`}>
          {features.map((feature, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 text-xs ${isPopular ? "text-white" : "text-[#2B2F38]"}`}
            >
              <span className={`font-bold text-sm leading-none shrink-0 ${isPopular ? "text-white" : "text-[#216143]"}`}>
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
          data-dialog-title={`Explore ${title}${planId !== "starter" ? ` ($${priceData.amount}/month, ${cadence})` : ""}`}
          style={isPopular ? { backgroundColor: "#ffffff", color: "#836953", border: 0, outline: 0 } : undefined}
          className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-center block transition-[background-color,color,box-shadow,transform] duration-160 ease-out active:scale-[0.97] ${
            isPopular
              ? "bg-white text-[#836953] shadow-md hover:bg-[#F5EFEB] border-0 outline-none"
              : "bg-[#FAF8F5] text-[#121417] border border-[#E5DDD4] hover:bg-[#E5DDD4]/60"
          }`}
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}
