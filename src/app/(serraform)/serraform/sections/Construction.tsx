'use client';

import React, { useId } from 'react';
import { CreaseMarker } from '../brand/Logo';
import { PALETTE } from '../fold/config';
import { deriveFold } from '../fold/geometry';
import { Reveal } from '../motion/Reveal';

const TopDownDiagram: React.FC = () => {
  const pose = deriveFold(50);
  const w = 520;
  const h = 220;
  const scale = 230;
  const cx = w * 0.5;
  const cy = h * 0.5;

  const toPt = (p: { x: number; z: number }) =>
    `${(cx + p.x * scale).toFixed(1)},${(cy + p.z * scale).toFixed(1)}`;

  const polygonPoints = [
    ...pose.front.map(toPt),
    ...[...pose.back].reverse().map(toPt),
  ].join(' ');

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-full block"
      role="img"
      aria-label="Top-down zigzag plan diagram of sixteen connected panels"
    >
      <rect width={w} height={h} rx="6" fill="#3D1821" />
      <line
        x1="40"
        y1={cy}
        x2={w - 40}
        y2={cy}
        stroke={PALETTE.porcelain}
        strokeOpacity="0.16"
        strokeDasharray="4 4"
      />
      <polygon
        points={polygonPoints}
        fill={PALETTE.clay}
        stroke={PALETTE.porcelain}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {pose.hinges.map((pt, i) => (
        <circle
          key={i}
          cx={cx + pt.x * scale}
          cy={cy + pt.z * scale}
          r="2.4"
          fill={PALETTE.porcelain}
        />
      ))}
      <text
        x="24"
        y={h - 18}
        fill={PALETTE.porcelain}
        fillOpacity="0.72"
        fontSize="11"
        fontFamily="var(--font-mono)"
      >
        Plan view · 16 panels · 180 mm pitch
      </text>
    </svg>
  );
};

const MacroPleatDetail: React.FC = () => {
  const uid = useId().replace(/:/g, '');
  const weaveId = `srf-felt-weave-${uid}`;
  const w = 520;
  const h = 220;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-full block"
      role="img"
      aria-label="Close material study of three matte felt pleats showing 12 mm edge thickness"
    >
      <defs>
        <pattern id={weaveId} width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="transparent" />
          <circle cx="3" cy="4" r="0.6" fill={PALETTE.porcelain} fillOpacity="0.12" />
          <circle cx="9" cy="8" r="0.6" fill={PALETTE.oxblood} fillOpacity="0.18" />
          <circle cx="6" cy="2" r="0.5" fill={PALETTE.porcelain} fillOpacity="0.08" />
        </pattern>
      </defs>
      <rect width={w} height={h} rx="6" fill="#3D1821" />
      <polygon points="70,40 200,28 200,220 70,220" fill="#7D362F" />
      <polygon points="200,28 330,68 330,220 200,220" fill={PALETTE.clay} />
      <polygon points="330,68 450,34 450,220 330,220" fill="#AF594F" />
      <polygon
        points="70,40 200,28 330,68 450,34 450,24 330,58 200,18 70,30"
        fill="#C97368"
      />
      <rect width={w} height={h} fill={`url(#${weaveId})`} />
      <line x1="200" y1="28" x2="200" y2="220" stroke={PALETTE.oxblood} strokeOpacity="0.45" strokeWidth="1.5" />
      <line x1="330" y1="68" x2="330" y2="220" stroke={PALETTE.oxblood} strokeOpacity="0.35" strokeWidth="1.5" />
      <text
        x="24"
        y={h - 18}
        fill={PALETTE.porcelain}
        fillOpacity="0.72"
        fontSize="11"
        fontFamily="var(--font-mono)"
      >
        Surface study · Matte wool felt · 12 mm edge
      </text>
    </svg>
  );
};

const SupportSectionDiagram: React.FC = () => {
  const w = 520;
  const h = 220;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-full block"
      role="img"
      aria-label="Section drawing of the slim steel floor support seated beneath the end fold"
    >
      <rect width={w} height={h} rx="6" fill="#3D1821" />
      <line
        x1="36"
        y1="168"
        x2={w - 36}
        y2="168"
        stroke={PALETTE.porcelain}
        strokeOpacity="0.4"
        strokeWidth="1.2"
      />
      <rect
        x="244"
        y="24"
        width="32"
        height="130"
        fill={PALETTE.clay}
        stroke={PALETTE.porcelain}
        strokeOpacity="0.6"
        strokeWidth="1"
      />
      <rect
        x="110"
        y="154"
        width="300"
        height="14"
        rx="5"
        fill={PALETTE.porcelain}
        fillOpacity="0.16"
        stroke={PALETTE.porcelain}
        strokeWidth="1.4"
      />
      <line x1="110" y1="184" x2="410" y2="184" stroke={PALETTE.porcelain} strokeOpacity="0.65" />
      <line x1="110" y1="178" x2="110" y2="190" stroke={PALETTE.porcelain} strokeOpacity="0.65" />
      <line x1="410" y1="178" x2="410" y2="190" stroke={PALETTE.porcelain} strokeOpacity="0.65" />
      <text
        x="260"
        y="202"
        textAnchor="middle"
        fill={PALETTE.porcelain}
        fillOpacity="0.82"
        fontSize="11"
        fontFamily="var(--font-mono)"
      >
        Support depth 380 mm · Height 12 mm
      </text>
    </svg>
  );
};

const CONSTRUCTION_ROWS = [
  {
    index: '01',
    title: 'A continuous profile.',
    body: 'Sixteen connected panels make one continuous silhouette where patterns travel across every fold.',
    Diagram: TopDownDiagram,
  },
  {
    index: '02',
    title: 'A tactile surface.',
    body: 'A matte felt grain keeps custom colors and printed illustrations soft and sculptural.',
    Diagram: MacroPleatDetail,
  },
  {
    index: '03',
    title: 'A grounded stance.',
    body: 'Slim floor supports sit beneath the first and last folds.',
    Diagram: SupportSectionDiagram,
  },
] as const;

const SPEC_ITEMS = [
  { label: 'Height', value: '1,600 mm' },
  { label: 'Panel pitch', value: '180 mm' },
  { label: 'Developed length', value: '2,880 mm' },
  { label: 'Model thickness', value: '12 mm' },
] as const;

export const Construction: React.FC = () => {
  return (
    <section
      id="construction"
      className="srf-dark-surface relative bg-[var(--srf-oxblood)] text-[var(--srf-porcelain)] pt-20 pb-24 lg:pt-28 lg:pb-32 scroll-mt-20"
    >
      <div className="srf-container">
        <div className="mb-14 max-w-[680px]">
          <div className="mb-3 srf-mono-caption text-[var(--srf-rose)]/75">
            Construction
          </div>
          <h2 className="srf-h2 text-[var(--srf-porcelain)] text-balance">
            The detail is in the fold.
          </h2>
        </div>

        <div className="divide-y divide-[var(--srf-hairline-dark)] border-t border-b border-[var(--srf-hairline-dark)]">
          {CONSTRUCTION_ROWS.map((row, idx) => {
            const Diagram = row.Diagram;
            return (
              <Reveal
                key={row.index}
                role="rise"
                delayMs={idx * 60}
                className="py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5">
                  <CreaseMarker
                    index={row.index}
                    className="text-[var(--srf-flax)] mb-3"
                  />
                  <h3 className="srf-h3 text-[var(--srf-porcelain)] mb-3">
                    {row.title}
                  </h3>
                  <p className="text-[var(--srf-rose)]/85 max-w-[42ch]">
                    {row.body}
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <div className="aspect-[21/9] rounded-[8px] border border-[var(--srf-hairline-dark)] overflow-hidden">
                    <Diagram />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-[var(--srf-hairline-dark)]">
          {SPEC_ITEMS.map((spec) => (
            <div key={spec.label}>
              <div className="srf-mono-caption text-[var(--srf-rose)]/75 mb-1">
                {spec.label}
              </div>
              <div className="font-[family-name:var(--font-display)] text-2xl font-medium text-[var(--srf-porcelain)] tabular-nums">
                {spec.value}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 srf-mono-caption text-[var(--srf-rose)]/75 max-w-[64ch]">
          Outer span is calculated directly from opening across the constant 2,880 mm developed length. These are concept parameters.
        </p>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-12 bg-[var(--srf-rose)]"
        style={{
          clipPath: 'polygon(0 100%, 48px 0, 100% 0, 100% 100%)',
        }}
      />
    </section>
  );
};
