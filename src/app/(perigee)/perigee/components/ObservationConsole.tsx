"use client";

import React, { useState } from 'react';
import { gravitationalAudio } from '../audio/gravitationalAudio';
import {
  TARGET_BANDS,
  validateObservationForm,
  type TargetBandOption,
  type ValidatedObservationRecord,
} from '../forms/observation';

export type { TargetBandOption };
export type EphemerisSubmission = ValidatedObservationRecord;

interface ObservationConsoleProps {
  visible: boolean;
  onFirePolarPulse: () => void;
}

export const ObservationConsole: React.FC<ObservationConsoleProps> = ({
  visible,
  onFirePolarPulse,
}) => {
  const [observerName, setObserverName] = useState('');
  const [institutionEmail, setInstitutionEmail] = useState('');
  const [targetBand, setTargetBand] = useState<TargetBandOption>('Optical Geodesic');
  const [inclinationAngle, setInclinationAngle] = useState('81.4');
  const [note, setNote] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lockedSubmission, setLockedSubmission] = useState<EphemerisSubmission | null>(null);

  if (!visible) return null;

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
      const firstError = Object.values(result.errors)[0] ?? 'Invalid form submission.';
      setErrorMsg(firstError);
      return;
    }

    setErrorMsg(null);
    setLockedSubmission(result.value);
    gravitationalAudio.triggerEphemerisLock();
    onFirePolarPulse();
  };

  return (
    <section
      aria-label="Request Observation Window and Telemetry Feed"
      data-testid="observation-console"
      className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 w-[calc(100vw-3rem)] max-w-md bg-black/90 border border-[#f6f1ea]/20 p-6 text-[#f6f1ea] pointer-events-auto"
    >
      <div className="flex items-center justify-between border-b border-[#f6f1ea]/15 pb-3 mb-4">
        <div>
          <h2 className="text-base font-medium tracking-tight text-[#f6f1ea]">
            Request Observation Window / Telemetry Feed
          </h2>
          <p className="text-xs font-mono-tech text-[#f6f1ea]/60 mt-0.5">
            NORTH POLAR MAGNETIC AXIS · EPHEMERIS ALLOCATION
          </p>
        </div>
      </div>

      {lockedSubmission ? (
        <div data-testid="ephemeris-locked-state" className="space-y-4 py-2">
          <div className="p-3.5 border border-[#ffb36b]/45 bg-[#ffb36b]/10">
            <div className="text-xs font-mono-tech text-[#ffb36b] uppercase tracking-wider">
              ● Ephemeris locked. Telemetry stream active.
            </div>
            <p className="text-xs text-[#f6f1ea]/80 mt-1.5 leading-relaxed">
              Collimated polar jet relay aligned for{' '}
              <span className="text-[#f6f1ea] font-medium">{lockedSubmission.observerName}</span> (
              {lockedSubmission.institutionEmail}).
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono-tech border-t border-b border-[#f6f1ea]/15 py-3">
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

          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={onFirePolarPulse}
              className="px-4 py-2 text-xs font-mono-tech bg-[#ffb36b] text-black font-medium hover:bg-[#ff8a3d] transition-colors cursor-pointer whitespace-nowrap"
            >
              Fire Polar Jet Pulse
            </button>
            <button
              type="button"
              onClick={() => setLockedSubmission(null)}
              className="px-3 py-2 text-xs font-mono-tech border border-[#f6f1ea]/20 text-[#f6f1ea]/80 hover:text-[#f6f1ea] hover:border-[#f6f1ea]/40 transition-colors cursor-pointer whitespace-nowrap"
            >
              Modify Window
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-3.5 text-xs">
          <div>
            <label htmlFor="obs-name" className="block font-mono-tech text-[#f6f1ea]/70 mb-1">
              Observer Name
            </label>
            <input
              id="obs-name"
              type="text"
              value={observerName}
              onChange={(e) => setObserverName(e.target.value)}
              placeholder="Dr. Elena Vance"
              className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 text-[#f6f1ea] placeholder:text-[#f6f1ea]/30 focus:outline-none focus:border-[#ffb36b]"
            />
          </div>

          <div>
            <label htmlFor="obs-email" className="block font-mono-tech text-[#f6f1ea]/70 mb-1">
              Institution / Email
            </label>
            <input
              id="obs-email"
              type="email"
              value={institutionEmail}
              onChange={(e) => setInstitutionEmail(e.target.value)}
              placeholder="vance@perimeter.observatory.org"
              className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 text-[#f6f1ea] placeholder:text-[#f6f1ea]/30 focus:outline-none focus:border-[#ffb36b]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="obs-band" className="block font-mono-tech text-[#f6f1ea]/70 mb-1">
                Target Band
              </label>
              <select
                id="obs-band"
                value={targetBand}
                onChange={(e) => setTargetBand(e.target.value as TargetBandOption)}
                className="w-full bg-black border border-[#f6f1ea]/20 px-2.5 py-2 text-[#f6f1ea] focus:outline-none focus:border-[#ffb36b]"
              >
                <option value="Optical Geodesic">Optical Geodesic</option>
                <option value="X-Ray Accretion">X-Ray Accretion</option>
                <option value="Gravitational Wave">Gravitational Wave</option>
              </select>
            </div>

            <div>
              <label htmlFor="obs-angle" className="block font-mono-tech text-[#f6f1ea]/70 mb-1">
                Inclination Angle (0°–90°)
              </label>
              <input
                id="obs-angle"
                type="number"
                step="0.1"
                min="0"
                max="90"
                value={inclinationAngle}
                onChange={(e) => setInclinationAngle(e.target.value)}
                className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 font-mono-tech text-[#f6f1ea] focus:outline-none focus:border-[#ffb36b]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="obs-note" className="block font-mono-tech text-[#f6f1ea]/70 mb-1">
              Optional Note
            </label>
            <input
              id="obs-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="VLBI baseline phase calibration"
              className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 text-[#f6f1ea] placeholder:text-[#f6f1ea]/30 focus:outline-none focus:border-[#ffb36b]"
            />
          </div>

          {errorMsg && (
            <div
              role="alert"
              data-testid="observation-form-error"
              className="text-xs font-mono-tech text-[#ff8a3d] border border-[#ff8a3d]/40 bg-[#ff8a3d]/10 px-3 py-2"
            >
              ▲ {errorMsg}
            </div>
          )}

          <div className="pt-1">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#f6f1ea] text-black font-mono-tech text-xs font-medium hover:bg-[#ffb36b] transition-colors cursor-pointer whitespace-nowrap"
            >
              Lock Ephemeris &amp; Ignite Polar Relay
            </button>
          </div>
        </form>
      )}
    </section>
  );
};
