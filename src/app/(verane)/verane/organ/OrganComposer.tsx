"use client";

import { useState } from "react";
import {
  ORGAN_SHELVES,
  deriveBespokeBlend,
  type OrganVial,
} from "./organ";
import { useClock } from "../drydown/ClockProvider";
import { DryDownStrip } from "../drydown/DryDownStrip";
import { Scrubber } from "../drydown/Scrubber";
import { getDominantTier } from "../drydown/evaporation";

export function OrganComposer() {
  const [topId, setTopId] = useState("t1");
  const [heartId, setHeartId] = useState("h1");
  const [baseId, setBaseId] = useState("b1");

  const { hour, setHour } = useClock();

  const blend = deriveBespokeBlend(topId, heartId, baseId);
  const dominantTier = getDominantTier(blend.notes, hour);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: The Shelves (8 cols) */}
      <div className="lg:col-span-8 flex flex-col gap-8">
        {(["top", "heart", "base"] as const).map((tier) => {
          const vials = ORGAN_SHELVES[tier];
          const selectedId =
            tier === "top" ? topId : tier === "heart" ? heartId : baseId;
          const setSelected =
            tier === "top" ? setTopId : tier === "heart" ? setHeartId : setBaseId;

          return (
            <div key={tier} className="flex flex-col gap-3">
              <div className="flex justify-between items-baseline border-b border-[var(--rule-color)] pb-2">
                <span className="vr-mono text-xs font-semibold uppercase text-[var(--color-ash)]">
                  Tier {tier === "top" ? "I" : tier === "heart" ? "II" : "III"} —{" "}
                  {tier} Shelf
                </span>
                <span className="vr-mono text-[11px] text-[var(--color-ash)] font-medium">
                  Select 1 raw distillation
                </span>
              </div>

              <div
                role="radiogroup"
                aria-label={`${tier} tier raw materials`}
                className="grid grid-cols-2 sm:grid-cols-5 gap-2.5"
              >
                {vials.map((vial: OrganVial) => {
                  const isChecked = vial.id === selectedId;
                  return (
                    <button
                      key={vial.id}
                      role="radio"
                      aria-checked={isChecked}
                      onClick={() => setSelected(vial.id)}
                      className="vr-organ-vial"
                    >
                      {/* Stylized vial drop icon */}
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        className="mb-1.5 opacity-90"
                        aria-hidden="true"
                      >
                        <path
                          d="M12 3C10 7 6 12 6 16a6 6 0 0 0 12 0c0-4-4-9-6-13Z"
                          fill={isChecked ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <span className="text-xs font-medium leading-tight">
                        {vial.shortName}
                      </span>
                      <span className="vr-mono text-[9px] mt-1 block">
                        {vial.origin.split(",")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: Derived Blend Result Card (4 cols) */}
      <div className="lg:col-span-4 vr-card sticky top-24 bg-[var(--color-calcaire)] rounded-2xl">
        <div>
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-[var(--rule-color)]">
            <span className="vr-mono text-xs font-semibold text-[var(--color-oud)]">
              Formulation Ledger
            </span>
            <span className="vr-stamp rounded-md">{blend.batchCode}</span>
          </div>

          <p className="vr-mono text-[11px] text-[var(--color-ash)] font-medium mb-1">Bespoke Accord</p>
          <h3 className="vr-serif text-2xl mb-2 font-normal text-[var(--color-oud)]">
            <em>{blend.title}</em>
          </h3>
          <p className="text-sm text-[var(--color-ash)] font-light mb-4">
            {blend.formula}
          </p>

          <div className="vr-mono text-xs text-[var(--color-ash)] mb-3">
            {blend.longevity}
          </div>

          {/* Mini dry-down strip responding to the clock */}
          <div className="my-5 p-3.5 bg-[var(--color-veil)] border border-[color-mix(in_srgb,var(--color-ash)_25%,transparent)] rounded-xl">
            <span className="vr-mono text-[10px] block mb-2 text-[var(--color-oud)] font-medium">
              Accord Dry-Down at {hour.toFixed(1)}h
            </span>
            <DryDownStrip notes={blend.notes} hour={hour} />
          </div>

          {/* Mini scrubber to test the bespoke blend */}
          <Scrubber
            hour={hour}
            dominantTierName={dominantTier.toUpperCase()}
            onHourChange={setHour}
            id="organ-scrubber"
            className="mb-4"
          />
        </div>

        <div className="pt-4 border-t border-[var(--rule-color)] mt-4">
          <a
            href="#appointment"
            className="vr-btn vr-btn--orris w-full text-center"
          >
            Inquire About This Blend
          </a>
        </div>
      </div>
    </div>
  );
}
