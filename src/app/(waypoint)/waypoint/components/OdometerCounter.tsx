"use client";

import React from "react";
import { formatOdometerDigits } from "../lib/pricingMath";

interface OdometerCounterProps {
  value: number;
  className?: string;
}

export function OdometerCounter({ value, className = "" }: OdometerCounterProps) {
  const digits = formatOdometerDigits(value);
  const DIGIT_SEQUENCE = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <span
      aria-label={`$${value}`}
      data-odometer-value={value}
      className={`inline-flex items-baseline font-extrabold ${className}`}
    >
      <span className="mr-0.5" aria-hidden="true">$</span>
      {digits.map((digit, i) => {
        const numIndex = Number(digit);
        const translateY = isNaN(numIndex) ? 0 : -numIndex * 10; // percentage per digit

        return (
          <span
            key={i}
            className="wyp-odometer-wheel relative inline-block overflow-hidden h-[1.1em] leading-none"
            style={{ width: "0.62em" }}
          >
            <span
              className="wyp-odometer-strip inline-flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateY(${translateY}%)`,
              }}
            >
              {DIGIT_SEQUENCE.map((d) => (
                <span
                  key={d}
                  className="h-[1.1em] flex items-center justify-center select-none"
                >
                  {d}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
