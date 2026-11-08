'use client';
import React from 'react';

export interface LensTunnelProps {
  approachOpacity: number;
  apertureOpacity: number;
  apertureRotationDeg: number;
  copperGlintOpacity: number;
  arrivalOpacity: number;
  sequenceFrame: number;
}

export const LensTunnel: React.FC<LensTunnelProps> = ({
  approachOpacity,
  apertureOpacity,
  apertureRotationDeg,
  copperGlintOpacity,
  arrivalOpacity,
  sequenceFrame,
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {/* Subtle warm copper optical flash as aperture iris opens into the city */}
      {copperGlintOpacity > 0.01 && (
        <div
          aria-hidden="true"
          style={{ opacity: copperGlintOpacity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(230,143,99,0.55),rgba(18,19,21,0.1)_65%,transparent_100%)] mix-blend-screen"
        />
      )}

      {/* Scene 2: THE APPROACH caption */}
      {approachOpacity > 0.02 && (
        <div
          style={{ opacity: approachOpacity }}
          className="absolute inset-x-0 bottom-14 flex flex-col items-center text-center px-6"
        >
          <span className="font-mono-kairo text-[11px] tracking-[0.22em] text-[#e68f63] mb-2">
            02 / THE APPROACH · OPTICAL AXIS
          </span>
          <p className="font-display-kairo text-2xl md:text-4xl font-medium tracking-tight text-[#f2efe9] drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
            Look closer. Follow the light into the glass.
          </p>
        </div>
      )}

      {/* Scene 3: THE APERTURE optical reticle & transient copy */}
      {apertureOpacity > 0.02 && (
        <div
          style={{ opacity: apertureOpacity }}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          {/* Restrained optical coordinate ring */}
          <div
            aria-hidden="true"
            style={{ transform: `rotate(${apertureRotationDeg}deg)` }}
            className="relative flex items-center justify-center w-[68vw] max-w-[540px] aspect-square rounded-full border border-[#f2efe9]/15"
          >
            <div className="w-[76%] aspect-square rounded-full border border-dashed border-[#e68f63]/35" />
            <span className="absolute -top-6 font-mono-kairo text-[10px] tracking-[0.2em] text-[#e68f63]/80">
              IRIS · 9-BLADE CIRCULAR GEOMETRY
            </span>
            <span className="absolute -bottom-6 font-mono-kairo text-[10px] tracking-[0.2em] text-[#f2efe9]/60">
              FRAME {String(sequenceFrame).padStart(3, '0')} / 120
            </span>
          </div>

          {/* Transient statement */}
          <div className="absolute inset-x-0 flex flex-col items-center text-center px-6">
            <div className="bg-[#121315]/65 backdrop-blur-md px-6 py-4 rounded-[2px] border border-[#f2efe9]/12">
              <span className="block font-mono-kairo text-[11px] tracking-[0.22em] text-[#e68f63] mb-1.5">
                03 / THE APERTURE THRESHOLD
              </span>
              <p className="font-display-kairo text-2xl md:text-4xl font-semibold tracking-tight text-[#f2efe9]">
                Every detail changes the story.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Scene 4: THROUGH THE FRAME city arrival caption */}
      {arrivalOpacity > 0.02 && (
        <div
          style={{ opacity: arrivalOpacity }}
          className="absolute inset-x-0 bottom-14 flex flex-col items-center text-center px-6"
        >
          <div className="bg-[#121315]/75 backdrop-blur-md px-6 py-4 rounded-[2px] border border-[#f2efe9]/15 max-w-xl">
            <span className="block font-mono-kairo text-[11px] tracking-[0.22em] text-[#e68f63] mb-1.5">
              04 / THROUGH THE FRAME
            </span>
            <p className="font-display-kairo text-2xl md:text-4xl font-semibold tracking-tight text-[#f2efe9]">
              Make the ordinary impossible to overlook.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
