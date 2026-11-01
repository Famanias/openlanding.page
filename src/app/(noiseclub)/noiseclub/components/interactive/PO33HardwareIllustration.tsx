"use client";

import React, { useState } from 'react';
import { SPECIMEN_MAP, SpecimenId } from '../../lib/audio/sampleLibrary';

export type PO33ViewMode = 'hero' | 'macro-mic' | 'front-monolith';

interface PO33HardwareProps {
  mode: PO33ViewMode;
  activeSpecimen: SpecimenId;
  isPlaying?: boolean;
  isRecording?: boolean;
  activeStep?: number;
  onTriggerPad?: (padNumber: number) => void;
  className?: string;
}

interface HotspotInfo {
  id: string;
  label: string;
  title: string;
  detail: string;
  x: string;
  y: string;
}

const HOTSPOTS: HotspotInfo[] = [
  {
    id: 'mic',
    label: '01 · MIC',
    title: 'Built-in Electret Microphone',
    detail: 'Top-mounted condenser capsule samples acoustic sources directly into 40-second memory.',
    x: '76%',
    y: '8%',
  },
  {
    id: 'io',
    label: '02 · 3.5MM I/O',
    title: 'Stereo Line-In & Pocket Operator Sync',
    detail: 'Left 3.5mm jack records line-level audio; right 3.5mm jack outputs audio + click-track sync.',
    x: '16%',
    y: '11%',
  },
  {
    id: 'melodic',
    label: '03 · SLOTS 1–8',
    title: '8 Melodic Sample Slots',
    detail: 'Chromatically pitches any recorded sound across the 16-button keyboard grid.',
    x: '32%',
    y: '62%',
  },
  {
    id: 'drum',
    label: '04 · SLOTS 9–16',
    title: '8 Drum & Slice Kit Slots',
    detail: 'Auto-slices a recording across 16 pads for instant chopping and finger drumming.',
    x: '32%',
    y: '83%',
  },
  {
    id: 'fx',
    label: '05 · 16 PUNCH-IN FX',
    title: 'Real-Time Performance Effects',
    detail: 'Hold FX + 1–16 during playback for stutter, reverse, loop, octave, filter, and bitcrush.',
    x: '86%',
    y: '68%',
  },
];

export const PO33HardwareIllustration: React.FC<PO33HardwareProps> = ({
  mode,
  activeSpecimen,
  isPlaying = false,
  isRecording = false,
  activeStep = 0,
  onTriggerPad,
  className = '',
}) => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(
    mode === 'front-monolith' ? 'mic' : null
  );
  const [pressedPad, setPressedPad] = useState<number | null>(null);
  const spec = SPECIMEN_MAP[activeSpecimen];

  const handlePadClick = (padNum: number) => {
    setPressedPad(padNum);
    window.setTimeout(() => setPressedPad(null), 160);
    onTriggerPad?.(padNum);
  };

  if (mode === 'macro-mic') {
    return (
      <div className={`relative select-none ${className}`}>
        <div className="relative bg-[#0B0C0C] border border-[#F1EEE5]/20 p-4 sm:p-6 overflow-hidden">
          {/* Top metadata header inside macro frame */}
          <div className="flex items-center justify-between border-b border-[#F1EEE5]/15 pb-3 mb-4 font-mono-meta text-xs text-[#F1EEE5]/70">
            <span>MACRO INSPECTION · TOP PCB BUS</span>
            <span>SCALE 2.4:1 · PO-33 REV C</span>
          </div>

          <svg
            viewBox="0 0 680 380"
            className="w-full h-auto block"
            role="img"
            aria-label="Close-up technical macro view of the Teenage Engineering PO-33 K.O! microphone capsule, line-in jack, and top PCB traces"
          >
            <defs>
              <linearGradient id="pcbMacroSurface" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1B1E1E" />
                <stop offset="55%" stopColor="#121414" />
                <stop offset="100%" stopColor="#0A0B0B" />
              </linearGradient>
              <linearGradient id="goldPad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E6C365" />
                <stop offset="50%" stopColor="#C49A38" />
                <stop offset="100%" stopColor="#8F6B1A" />
              </linearGradient>
              <radialGradient id="micCapsuleGrad" cx="45%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#525757" />
                <stop offset="65%" stopColor="#262929" />
                <stop offset="100%" stopColor="#0E1010" />
              </radialGradient>
            </defs>

            {/* Background dark studio surface */}
            <rect width="680" height="380" fill="#090A0A" />

            {/* Subtle technical coordinate grid */}
            <g stroke="#F1EEE5" strokeOpacity="0.06" strokeWidth="1">
              <line x1="0" y1="76" x2="680" y2="76" />
              <line x1="0" y1="152" x2="680" y2="152" />
              <line x1="0" y1="228" x2="680" y2="228" />
              <line x1="0" y1="304" x2="680" y2="304" />
              <line x1="136" y1="0" x2="136" y2="380" />
              <line x1="272" y1="0" x2="272" y2="380" />
              <line x1="408" y1="0" x2="408" y2="380" />
              <line x1="544" y1="0" x2="544" y2="380" />
            </g>

            {/* PO-33 Upper FR-4 Matte Black PCB Body */}
            <path
              d="M 50 380 L 50 90 Q 50 68 72 68 L 210 68 L 210 28 Q 210 16 222 16 L 458 16 Q 470 16 470 28 L 470 68 L 608 68 Q 630 68 630 90 L 630 380 Z"
              fill="url(#pcbMacroSurface)"
              stroke="#F1EEE5"
              strokeOpacity="0.28"
              strokeWidth="2"
            />

            {/* Top Hanger Cutout & Gold Edge Plating */}
            <rect
              x="248"
              y="30"
              width="184"
              height="32"
              rx="16"
              fill="#090A0A"
              stroke="url(#goldPad)"
              strokeWidth="3"
            />

            {/* Copper / Gold PCB Traces */}
            <g stroke="url(#goldPad)" strokeWidth="1.5" fill="none" opacity="0.55">
              <path d="M 122 165 L 122 230 L 215 265" />
              <path d="M 528 145 L 528 215 L 445 255" />
              <path d="M 498 145 L 498 195 L 425 235" />
              <circle cx="215" cy="265" r="3" fill="url(#goldPad)" />
              <circle cx="445" cy="255" r="3" fill="url(#goldPad)" />
              <circle cx="425" cy="235" r="3" fill="url(#goldPad)" />
            </g>

            {/* Left 3.5mm Stereo Line-In Jack */}
            <g transform="translate(88, 102)">
              <rect x="0" y="0" width="68" height="58" rx="4" fill="#1E2121" stroke="#F1EEE5" strokeOpacity="0.3" />
              <circle cx="34" cy="29" r="19" fill="#0B0C0C" stroke="url(#goldPad)" strokeWidth="4" />
              <circle cx="34" cy="29" r="11" fill="#050505" />
              <text x="34" y="76" textAnchor="middle" fill="#F1EEE5" fontSize="10" fontFamily="IBM Plex Mono">
                LINE IN (3.5MM)
              </text>
            </g>

            {/* Center Top Silkscreen Branding */}
            <text
              x="340"
              y="98"
              textAnchor="middle"
              fill="#FF6748"
              fontSize="18"
              fontWeight="700"
              fontFamily="IBM Plex Mono"
              letterSpacing="2"
            >
              PO-33 K.O!
            </text>
            <text
              x="340"
              y="116"
              textAnchor="middle"
              fill="#F1EEE5"
              fillOpacity="0.65"
              fontSize="10"
              fontFamily="IBM Plex Mono"
              letterSpacing="1.5"
            >
              MICRO SAMPLER · 40S MEMORY
            </text>

            {/* Right Built-In Electret Condenser Microphone Capsule (Focal Point) */}
            <g transform="translate(476, 84)">
              {/* Acoustic capture pulse rings when recording or active */}
              <circle
                cx="42"
                cy="42"
                r={isRecording ? '58' : '46'}
                fill="none"
                stroke={isRecording ? '#FF6748' : '#CBFF49'}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.85"
              />
              <circle
                cx="42"
                cy="42"
                r="34"
                fill="url(#micCapsuleGrad)"
                stroke="url(#goldPad)"
                strokeWidth="3"
              />
              {/* Electret acoustic mesh holes */}
              <circle cx="42" cy="42" r="5" fill="#090A0A" />
              <circle cx="42" cy="27" r="4" fill="#090A0A" />
              <circle cx="42" cy="57" r="4" fill="#090A0A" />
              <circle cx="27" cy="42" r="4" fill="#090A0A" />
              <circle cx="57" cy="42" r="4" fill="#090A0A" />
              <circle cx="31" cy="31" r="3.5" fill="#090A0A" />
              <circle cx="53" cy="31" r="3.5" fill="#090A0A" />
              <circle cx="31" cy="53" r="3.5" fill="#090A0A" />
              <circle cx="53" cy="53" r="3.5" fill="#090A0A" />

              <text x="42" y="96" textAnchor="middle" fill="#CBFF49" fontSize="11" fontFamily="IBM Plex Mono" fontWeight="600">
                ELECTRET MIC
              </text>
            </g>

            {/* Upper portion of Custom LCD Window showing REC & Sample Memory */}
            <g transform="translate(185, 148)">
              <rect
                x="0"
                y="0"
                width="260"
                height="136"
                rx="4"
                fill="#C8C6BC"
                stroke="#2D3131"
                strokeWidth="4"
              />
              {/* LCD inner segments */}
              <text x="16" y="28" fill="#111313" fontSize="14" fontWeight="700" fontFamily="IBM Plex Mono">
                {isRecording ? '● REC IN PROGRESS' : `SLOT ${String(spec.po33SlotNumber).padStart(2, '0')} READY`}
              </text>
              <text x="244" y="28" textAnchor="end" fill="#111313" fontSize="12" fontFamily="IBM Plex Mono">
                {spec.durationLabel}
              </text>
              <line x1="16" y1="38" x2="244" y2="38" stroke="#111313" strokeWidth="1.5" />

              {/* Simulated segmented LCD level meter */}
              <g transform="translate(16, 52)">
                {Array.from({ length: 16 }).map((_, idx) => {
                  const active = idx < (isRecording ? 14 : 11);
                  return (
                    <rect
                      key={idx}
                      x={idx * 14}
                      y={0}
                      width={10}
                      height={26}
                      fill={active ? '#111313' : '#B4B2A8'}
                    />
                  );
                })}
              </g>

              <text x="16" y="102" fill="#111313" fontSize="11" fontFamily="IBM Plex Mono" fontWeight="600">
                BANK: {spec.po33Bank}
              </text>
              <text x="16" y="120" fill="#111313" fontSize="11" fontFamily="IBM Plex Mono">
                MEM REMAINING: 38.4 SEC
              </text>
            </g>

            {/* REC Hardware Button on right */}
            <g transform="translate(495, 220)">
              <rect
                x="0"
                y="0"
                width="74"
                height="58"
                rx="4"
                fill="#1D2020"
                stroke={isRecording ? '#FF6748' : '#F1EEE5'}
                strokeOpacity={isRecording ? '1' : '0.35'}
                strokeWidth="2"
              />
              <circle
                cx="37"
                cy="29"
                r="14"
                fill={isRecording ? '#FF6748' : '#2C3030'}
                stroke="#FF6748"
                strokeWidth="2"
              />
              <text x="37" y="76" textAnchor="middle" fill="#FF6748" fontSize="11" fontFamily="IBM Plex Mono" fontWeight="600">
                HOLD REC + SLOT
              </text>
            </g>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative select-none ${className}`}>
      <div
        className={`relative mx-auto transition-transform duration-700 ${
          mode === 'hero'
            ? 'max-w-[430px] lg:max-w-[460px]'
            : 'max-w-[420px]'
        }`}
      >
        {/* Architectural studio shadow & crisp hardware SVG */}
        <svg
          viewBox="0 0 440 740"
          className="w-full h-auto block drop-shadow-[0_28px_45px_rgba(0,0,0,0.85)]"
          role="img"
          aria-label="Teenage Engineering PO-33 K.O! Pocket Operator micro-sampler hardware"
        >
          <defs>
            <linearGradient id="po33Body" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#202424" />
              <stop offset="45%" stopColor="#141717" />
              <stop offset="100%" stopColor="#0B0D0D" />
            </linearGradient>
            <linearGradient id="po33Gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F0CE73" />
              <stop offset="50%" stopColor="#C79B3B" />
              <stop offset="100%" stopColor="#8A6619" />
            </linearGradient>
            <linearGradient id="lcdScreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D6D3C9" />
              <stop offset="100%" stopColor="#BDBAAD" />
            </linearGradient>
          </defs>

          {/* Main FR-4 Matte Black PCB Silhouette with authentic top hanger tab */}
          <path
            d="M 42 86
               Q 42 66 62 66
               L 132 66
               L 132 24
               Q 132 10 146 10
               L 294 10
               Q 308 10 308 24
               L 308 66
               L 378 66
               Q 398 66 398 86
               L 398 706
               Q 398 726 378 726
               L 62 726
               Q 42 726 42 706
               Z"
            fill="url(#po33Body)"
            stroke="#F1EEE5"
            strokeOpacity="0.26"
            strokeWidth="2"
          />

          {/* Top Hanger Slot */}
          <rect
            x="160"
            y="24"
            width="120"
            height="24"
            rx="12"
            fill="#111313"
            stroke="url(#po33Gold)"
            strokeWidth="2.5"
          />

          {/* Corner Gold-Plated Mounting Holes */}
          {[
            { cx: 66, cy: 90 },
            { cx: 374, cy: 90 },
            { cx: 66, cy: 702 },
            { cx: 374, cy: 702 },
          ].map((hole, i) => (
            <g key={i}>
              <circle
                cx={hole.cx}
                cy={hole.cy}
                r="9"
                fill="#111313"
                stroke="url(#po33Gold)"
                strokeWidth="3"
              />
            </g>
          ))}

          {/* Top Left & Right 3.5mm Stereo Audio / Sync Jacks */}
          <g transform="translate(88, 72)">
            <rect x="0" y="0" width="38" height="34" rx="3" fill="#232727" stroke="#F1EEE5" strokeOpacity="0.25" />
            <circle cx="19" cy="17" r="10" fill="#090A0A" stroke="url(#po33Gold)" strokeWidth="2.5" />
            <text x="19" y="46" textAnchor="middle" fill="#F1EEE5" fillOpacity="0.6" fontSize="8" fontFamily="IBM Plex Mono">
              IN
            </text>
          </g>

          <g transform="translate(314, 72)">
            <rect x="0" y="0" width="38" height="34" rx="3" fill="#232727" stroke="#F1EEE5" strokeOpacity="0.25" />
            <circle cx="19" cy="17" r="10" fill="#090A0A" stroke="url(#po33Gold)" strokeWidth="2.5" />
            <text x="19" y="46" textAnchor="middle" fill="#F1EEE5" fillOpacity="0.6" fontSize="8" fontFamily="IBM Plex Mono">
              OUT
            </text>
          </g>

          {/* Built-in Electret Microphone Capsule (Top Right PCB area) */}
          <g transform="translate(336, 36)">
            <circle cx="16" cy="16" r="14" fill="#262A2A" stroke="url(#po33Gold)" strokeWidth="2" />
            <circle cx="16" cy="16" r="3" fill="#0B0C0C" />
            <circle cx="16" cy="9" r="2.2" fill="#0B0C0C" />
            <circle cx="16" cy="23" r="2.2" fill="#0B0C0C" />
            <circle cx="9" cy="16" r="2.2" fill="#0B0C0C" />
            <circle cx="23" cy="16" r="2.2" fill="#0B0C0C" />
            <text x="-8" y="20" textAnchor="end" fill="#CBFF49" fontSize="8" fontFamily="IBM Plex Mono" fontWeight="600">
              MIC
            </text>
          </g>

          {/* Silkscreen Top Header */}
          <text
            x="220"
            y="84"
            textAnchor="middle"
            fill="#F1EEE5"
            fillOpacity="0.85"
            fontSize="10"
            fontFamily="IBM Plex Mono"
            letterSpacing="1.2"
          >
            teenage engineering
          </text>
          <text
            x="220"
            y="106"
            textAnchor="middle"
            fill="#FF6748"
            fontSize="20"
            fontWeight="700"
            fontFamily="Anton"
            letterSpacing="2"
          >
            PO-33 K.O!
          </text>

          {/* Custom Segmented Monochrome LCD Screen */}
          <g transform="translate(84, 124)">
            <rect
              x="0"
              y="0"
              width="272"
              height="146"
              rx="4"
              fill="url(#lcdScreen)"
              stroke="#2C3030"
              strokeWidth="4"
            />
            {/* Top Status Bar inside LCD */}
            <text x="14" y="24" fill="#111313" fontSize="11" fontWeight="700" fontFamily="IBM Plex Mono">
              {isPlaying ? '▶ PLAY' : '■ READY'} · {spec.po33Bank.split(' ')[0]}
            </text>
            <text x="258" y="24" textAnchor="end" fill="#111313" fontSize="12" fontWeight="700" fontFamily="IBM Plex Mono">
              BPM 116
            </text>
            <line x1="12" y1="32" x2="260" y2="32" stroke="#111313" strokeWidth="1.2" strokeOpacity="0.5" />

            {/* Arcade K.O! Boxer / Sampler Visual LCD Segments */}
            <g transform="translate(18, 44)" fill="#111313">
              {/* Left Arcade Fighter Frame */}
              <rect x="0" y="14" width="18" height="18" />
              <rect x="4" y="34" width="22" height="28" />
              <rect x="26" y="36" width="16" height="8" />
              <rect x="4" y="64" width="8" height="16" />
              <rect x="18" y="64" width="8" height="16" />

              {/* Center K.O! Sampler Meter Bars */}
              {Array.from({ length: 12 }).map((_, idx) => {
                const barH = 14 + ((idx * 17 + (isPlaying ? activeStep * 9 : 5)) % 46);
                return (
                  <rect
                    key={idx}
                    x={56 + idx * 11}
                    y={76 - barH}
                    width="7"
                    height={barH}
                    opacity={idx % 2 === 0 ? 0.9 : 0.65}
                  />
                );
              })}

              {/* Right Slot & Memory readout */}
              <rect x="196" y="8" width="44" height="28" fill="none" stroke="#111313" strokeWidth="2" />
              <text x="218" y="27" textAnchor="middle" fill="#111313" fontSize="15" fontWeight="700" fontFamily="IBM Plex Mono">
                S{String(spec.po33SlotNumber).padStart(2, '0')}
              </text>
              <text x="218" y="54" textAnchor="middle" fill="#111313" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="600">
                40S MEM
              </text>
              <text x="218" y="70" textAnchor="middle" fill="#111313" fontSize="9" fontFamily="IBM Plex Mono">
                STEP {String(activeStep + 1).padStart(2, '0')}
              </text>
            </g>

            {/* Bottom LCD Specimen Ribbon */}
            <rect x="12" y="124" width="248" height="15" fill="#111313" />
            <text x="20" y="135" fill="#D6D3C9" fontSize="9.5" fontFamily="IBM Plex Mono" fontWeight="600">
              {spec.catalogId} · {spec.title.toUpperCase()}
            </text>
          </g>

          {/* Top Utility Buttons + A / B Parameter Knobs Row */}
          <g transform="translate(64, 290)">
            {/* sound, pattern, bpm buttons */}
            {['SOUND', 'PATTERN', 'BPM'].map((label, idx) => (
              <g key={label} transform={`translate(${idx * 58}, 8)`}>
                <rect
                  x="0"
                  y="0"
                  width="46"
                  height="32"
                  rx="3"
                  fill="#1E2222"
                  stroke="#F1EEE5"
                  strokeOpacity="0.28"
                  strokeWidth="1.5"
                />
                <circle cx="23" cy="16" r="7" fill="#323737" stroke="#F1EEE5" strokeOpacity="0.4" />
                <text
                  x="23"
                  y="45"
                  textAnchor="middle"
                  fill="#F1EEE5"
                  fillOpacity="0.8"
                  fontSize="8.5"
                  fontFamily="IBM Plex Mono"
                  fontWeight="600"
                >
                  {label}
                </text>
              </g>
            ))}

            {/* Knob A (Orange/Red Pitch/Trim) & Knob B (Light Bone Filter/Tone) */}
            <g transform="translate(198, 22)">
              <circle cx="20" cy="4" r="20" fill="#181B1B" stroke="#F1EEE5" strokeOpacity="0.3" strokeWidth="1.5" />
              <circle cx="20" cy="4" r="13" fill="#FF6748" />
              <line x1="20" y1="4" x2="12" y2="-5" stroke="#111313" strokeWidth="2.5" strokeLinecap="round" />
              <text x="20" y="37" textAnchor="middle" fill="#FF6748" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="700">
                KNOB A
              </text>
            </g>

            <g transform="translate(260, 22)">
              <circle cx="20" cy="4" r="20" fill="#181B1B" stroke="#F1EEE5" strokeOpacity="0.3" strokeWidth="1.5" />
              <circle cx="20" cy="4" r="13" fill="#F1EEE5" />
              <line x1="20" y1="4" x2="29" y2="-4" stroke="#111313" strokeWidth="2.5" strokeLinecap="round" />
              <text x="20" y="37" textAnchor="middle" fill="#F1EEE5" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="700">
                KNOB B
              </text>
            </g>
          </g>

          {/* Bank Section Dividers */}
          <g transform="translate(64, 356)">
            <text x="0" y="0" fill="#CBFF49" fontSize="8.5" fontFamily="IBM Plex Mono" fontWeight="600" letterSpacing="1">
              MELODIC SLOTS [01–08]
            </text>
            <line x1="118" y1="-3" x2="232" y2="-3" stroke="#CBFF49" strokeOpacity="0.35" strokeWidth="1" />
          </g>

          <g transform="translate(64, 526)">
            <text x="0" y="0" fill="#FF6748" fontSize="8.5" fontFamily="IBM Plex Mono" fontWeight="600" letterSpacing="1">
              DRUM / SLICE SLOTS [09–16]
            </text>
            <line x1="145" y1="-3" x2="232" y2="-3" stroke="#FF6748" strokeOpacity="0.35" strokeWidth="1" />
          </g>

          {/* 4x4 Interactive Button Matrix (Pads 1–16) + Right Column Function Keys */}
          <g transform="translate(64, 368)">
            {Array.from({ length: 16 }).map((_, idx) => {
              const padNum = idx + 1;
              const col = idx % 4;
              const row = Math.floor(idx / 4);
              const x = col * 60;
              const y = row * 78 + (row >= 2 ? 18 : 0);
              const isMelodic = padNum <= 8;
              const isSpecSlot = spec.po33SlotNumber === padNum;
              const isStepActive = isPlaying && activeStep === idx;
              const isPressed = pressedPad === padNum;

              return (
                <g
                  key={padNum}
                  transform={`translate(${x}, ${y})`}
                  onClick={() => handlePadClick(padNum)}
                  className="cursor-pointer"
                >
                  <rect
                    x="0"
                    y="0"
                    width="48"
                    height="52"
                    rx="4"
                    fill={
                      isPressed || isStepActive
                        ? '#CBFF49'
                        : isSpecSlot
                        ? '#282E22'
                        : '#1A1E1E'
                    }
                    stroke={
                      isSpecSlot || isStepActive
                        ? '#CBFF49'
                        : isMelodic
                        ? '#F1EEE5'
                        : '#FF6748'
                    }
                    strokeOpacity={isSpecSlot || isStepActive ? '1' : '0.35'}
                    strokeWidth={isSpecSlot || isStepActive ? '2' : '1.2'}
                  />
                  {/* Tactile silver dome switch */}
                  <circle
                    cx="24"
                    cy="24"
                    r="10"
                    fill={isPressed || isStepActive ? '#111313' : '#2E3434'}
                    stroke="url(#po33Gold)"
                    strokeWidth="1.5"
                  />
                  {/* Pad number badge */}
                  <text
                    x="8"
                    y="13"
                    fill={isPressed || isStepActive ? '#111313' : '#F1EEE5'}
                    fontSize="9.5"
                    fontWeight="700"
                    fontFamily="IBM Plex Mono"
                  >
                    {String(padNum).padStart(2, '0')}
                  </text>
                  {/* LED indicator dot */}
                  <circle
                    cx="39"
                    cy="10"
                    r="2.5"
                    fill={isSpecSlot || isStepActive ? '#FF6748' : '#3A4040'}
                  />
                  {/* Bottom silkscreen sub-label */}
                  <text
                    x="24"
                    y="65"
                    textAnchor="middle"
                    fill="#F1EEE5"
                    fillOpacity="0.6"
                    fontSize="7.5"
                    fontFamily="IBM Plex Mono"
                  >
                    {isMelodic ? `MEL ${padNum}` : `DRM ${padNum}`}
                  </text>
                </g>
              );
            })}

            {/* Right-hand 4 Function Buttons Column: RECORD, FX, PLAY, WRITE */}
            {[
              { code: 'REC', accent: '#FF6748', row: 0 },
              { code: 'FX', accent: '#CBFF49', row: 1 },
              { code: 'PLAY', accent: '#F1EEE5', row: 2 },
              { code: 'WRITE', accent: '#FF6748', row: 3 },
            ].map((fn) => {
              const y = fn.row * 78 + (fn.row >= 2 ? 18 : 0);
              return (
                <g
                  key={fn.code}
                  transform={`translate(256, ${y})`}
                  onClick={() => handlePadClick(fn.row + 1)}
                  className="cursor-pointer"
                >
                  <rect
                    x="0"
                    y="0"
                    width="54"
                    height="52"
                    rx="4"
                    fill="#181C1C"
                    stroke={fn.accent}
                    strokeOpacity="0.55"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="27"
                    cy="24"
                    r="10"
                    fill={fn.code === 'REC' ? '#FF6748' : '#2E3434'}
                    stroke="url(#po33Gold)"
                    strokeWidth="1.5"
                  />
                  <text
                    x="27"
                    y="65"
                    textAnchor="middle"
                    fill={fn.accent}
                    fontSize="8.5"
                    fontWeight="700"
                    fontFamily="IBM Plex Mono"
                  >
                    {fn.code}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Interactive Hardware Inspection Hotspots (shown on Front Monolith or Hero) */}
        {mode === 'front-monolith' && (
          <div className="mt-4 border-t border-[#F1EEE5]/15 pt-4">
            <div className="flex flex-wrap gap-1.5 mb-3" role="tablist" aria-label="Hardware inspection points">
              {HOTSPOTS.map((spot) => {
                const active = selectedHotspot === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedHotspot(spot.id)}
                    className={`nc-btn-interactive px-2.5 py-1.5 font-mono-meta text-xs border whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#CBFF49] text-[#111313] border-[#CBFF49] font-semibold'
                        : 'bg-[#171A1A] text-[#F1EEE5]/80 border-[#F1EEE5]/20 hover:border-[#F1EEE5]/50'
                    }`}
                  >
                    {spot.label}
                  </button>
                );
              })}
            </div>
            {selectedHotspot && (
              <div className="bg-[#171A1A] border border-[#F1EEE5]/20 p-3.5">
                {HOTSPOTS.filter((h) => h.id === selectedHotspot).map((spot) => (
                  <div key={spot.id}>
                    <div className="font-mono-meta text-xs text-[#CBFF49] mb-1">
                      HARDWARE SPECIFICATION · {spot.label}
                    </div>
                    <div className="font-sans-body font-semibold text-sm text-[#F1EEE5] mb-1">
                      {spot.title}
                    </div>
                    <p className="font-sans-body text-xs text-[#F1EEE5]/75 leading-relaxed">
                      {spot.detail}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
