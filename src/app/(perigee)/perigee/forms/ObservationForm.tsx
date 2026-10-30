"use client";

import React, { useState } from "react";
import {
  TARGET_BANDS,
  validateObservationForm,
  type TargetBandOption,
  type ValidatedObservationRecord,
} from "./observation";

interface ObservationFormProps {
  onSuccess?: (record: ValidatedObservationRecord) => void;
  className?: string;
}

export const ObservationForm: React.FC<ObservationFormProps> = ({
  onSuccess,
  className = "",
}) => {
  const [observerName, setObserverName] = useState("");
  const [institutionEmail, setInstitutionEmail] = useState("");
  const [targetBand, setTargetBand] = useState<TargetBandOption>("Optical Geodesic");
  const [inclinationAngle, setInclinationAngle] = useState("81.4");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lockedSubmission, setLockedSubmission] = useState<ValidatedObservationRecord | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateObservationForm({
      observerName,
      institutionEmail,
      targetBand,
      inclinationAngle,
      note,
    });

    if (!result.ok) {
      setErrors(result.errors as Record<string, string>);
      return;
    }

    setErrors({});
    setLockedSubmission(result.value);
    onSuccess?.(result.value);
  };

  if (lockedSubmission) {
    return (
      <div data-testid="ephemeris-locked-fallback" className="space-y-4 py-2 text-xs font-mono-tech">
        <div className="p-3.5 border border-[#ffb36b]/45 bg-[#ffb36b]/10">
          <div className="text-[#ffb36b] uppercase tracking-wider">
            ● Ephemeris locked. Telemetry stream active.
          </div>
          <p className="text-[#f6f1ea]/80 mt-1.5 leading-relaxed">
            Collimated polar jet relay aligned for{" "}
            <span className="text-[#f6f1ea] font-medium">{lockedSubmission.observerName}</span> (
            {lockedSubmission.institutionEmail}).
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-b border-[#f6f1ea]/15 py-3">
          <div>
            <div className="text-[#f6f1ea]/50">TARGET BAND</div>
            <div className="text-[#e6f0ff] mt-0.5">{lockedSubmission.targetBand}</div>
          </div>
          <div>
            <div className="text-[#f6f1ea]/50">INCLINATION</div>
            <div className="text-[#f6f1ea] mt-0.5">{lockedSubmission.inclinationAngle.toFixed(1)}°</div>
          </div>
          <div>
            <div className="text-[#f6f1ea]/50">LOCK EPOCH</div>
            <div className="text-[#f6f1ea] mt-0.5">{lockedSubmission.timestampIso}</div>
          </div>
          <div>
            <div className="text-[#f6f1ea]/50">POLAR FLUX</div>
            <div className="text-[#ffb36b] mt-0.5">1.42 × 10⁴³ erg/s</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setLockedSubmission(null)}
          className="px-4 py-2 border border-[#f6f1ea]/20 text-[#f6f1ea]/80 hover:text-[#f6f1ea] hover:border-[#f6f1ea]/40 transition-colors cursor-pointer"
        >
          Modify Ephemeris Parameters
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`space-y-4 text-xs font-mono-tech ${className}`}>
      <div>
        <label htmlFor="static-observer-name" className="block text-[#f6f1ea]/70 mb-1">
          OBSERVER NAME
        </label>
        <input
          id="static-observer-name"
          name="observerName"
          type="text"
          value={observerName}
          onChange={(e) => {
            setObserverName(e.target.value);
            if (errors.observerName) setErrors((prev) => ({ ...prev, observerName: "" }));
          }}
          placeholder="Dr. K. Thorne"
          className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 text-[#f6f1ea] focus:border-[#ffb36b] outline-none"
        />
        {errors.observerName && (
          <p className="text-[#ff8a3d] text-[11px] mt-1">{errors.observerName}</p>
        )}
      </div>

      <div>
        <label htmlFor="static-observer-email" className="block text-[#f6f1ea]/70 mb-1">
          INSTITUTION / EMAIL
        </label>
        <input
          id="static-observer-email"
          name="institutionEmail"
          type="email"
          value={institutionEmail}
          onChange={(e) => {
            setInstitutionEmail(e.target.value);
            if (errors.institutionEmail) setErrors((prev) => ({ ...prev, institutionEmail: "" }));
          }}
          placeholder="observer@caltech.edu"
          className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 text-[#f6f1ea] focus:border-[#ffb36b] outline-none"
        />
        {errors.institutionEmail && (
          <p className="text-[#ff8a3d] text-[11px] mt-1">{errors.institutionEmail}</p>
        )}
      </div>

      <div>
        <label htmlFor="static-target-band" className="block text-[#f6f1ea]/70 mb-1">
          TARGET BAND
        </label>
        <select
          id="static-target-band"
          name="targetBand"
          value={targetBand}
          onChange={(e) => setTargetBand(e.target.value as TargetBandOption)}
          className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 text-[#f6f1ea] focus:border-[#ffb36b] outline-none"
        >
          {TARGET_BANDS.map((band) => (
            <option key={band} value={band} className="bg-black text-[#f6f1ea]">
              {band}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="static-inclination-angle" className="block text-[#f6f1ea]/70 mb-1">
          INCLINATION ANGLE (DEGREES, 0.0 - 90.0)
        </label>
        <input
          id="static-inclination-angle"
          name="inclinationAngle"
          type="text"
          value={inclinationAngle}
          onChange={(e) => {
            setInclinationAngle(e.target.value);
            if (errors.inclinationAngle) setErrors((prev) => ({ ...prev, inclinationAngle: "" }));
          }}
          className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 text-[#f6f1ea] focus:border-[#ffb36b] outline-none"
        />
        {errors.inclinationAngle && (
          <p className="text-[#ff8a3d] text-[11px] mt-1">{errors.inclinationAngle}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-[#f6f1ea] text-black font-semibold uppercase tracking-wider hover:bg-[#ffb36b] transition-colors cursor-pointer"
      >
        Allocate Ephemeris Slot
      </button>
    </form>
  );
};
