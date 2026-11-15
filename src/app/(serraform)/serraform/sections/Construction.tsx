'use client';

import React, { useId } from 'react';
import { CreaseMarker } from '../brand/Logo';
import { PALETTE } from '../fold/config';
import { deriveFold } from '../fold/geometry';

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
      data-plan=""
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-full block"
      role="img"
      aria-label="Top-down zigzag plan diagram of sixteen connected panels"
    >
      <rect width={w} height={h} rx="6" fill="#3D1821" />
      <line
        data-draw=""
        x1="40"
        y1={cy}
        x2={w - 40}
        y2={cy}
        stroke={PALETTE.porcelain}
        strokeOpacity="0.16"
        strokeDasharray="4 4"
      />
      <polygon
        data-plan-poly=""
        points={polygonPoints}
        fill={PALETTE.clay}
        stroke={PALETTE.porcelain}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {pose.hinges.map((pt, i) => (
        <circle
          data-hinge=""
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
        Plan view · 16 panels · <tspan data-plan-open="">50% open</tspan>
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
      <polygon data-face="" points="70,40 200,28 200,220 70,220" fill="#7D362F" />
      <polygon data-face="" points="200,28 330,68 330,220 200,220" fill={PALETTE.clay} />
      <polygon data-face="" points="330,68 450,34 450,220 330,220" fill="#AF594F" />
      <polygon
        data-fade=""
        points="70,40 200,28 330,68 450,34 450,24 330,58 200,18 70,30"
        fill="#C97368"
      />
      <rect data-fade="" width={w} height={h} fill={`url(#${weaveId})`} />
      <line data-draw="" x1="200" y1="28" x2="200" y2="220" stroke={PALETTE.oxblood} strokeOpacity="0.45" strokeWidth="1.5" />
      <line data-draw="" x1="330" y1="68" x2="330" y2="220" stroke={PALETTE.oxblood} strokeOpacity="0.35" strokeWidth="1.5" />
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
        data-draw=""
        x1="36"
        y1="168"
        x2={w - 36}
        y2="168"
        stroke={PALETTE.porcelain}
        strokeOpacity="0.4"
        strokeWidth="1.2"
      />
      <rect
        data-panel=""
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
        data-base=""
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
      <line data-draw="" x1="110" y1="184" x2="410" y2="184" stroke={PALETTE.porcelain} strokeOpacity="0.65" />
      <line data-draw="" x1="110" y1="178" x2="110" y2="190" stroke={PALETTE.porcelain} strokeOpacity="0.65" />
      <line data-draw="" x1="410" y1="178" x2="410" y2="190" stroke={PALETTE.porcelain} strokeOpacity="0.65" />
      <text
        data-fade=""
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

const TEETH_PATH = `M0 0 H160 ${Array.from({ length: 16 }, (_, i) => `L${155 - i * 10} 10 L${150 - i * 10} 0`).join(' ')} Z`;

const CONSTRUCTION_ROWS = [
  {
    index: '01',
    title: 'A continuous profile.',
    body: 'Sixteen connected panels make one continuous silhouette where patterns travel across every fold.',
    Diagram: TopDownDiagram,
    diagram: 'plan',
  },
  {
    index: '02',
    title: 'A tactile surface.',
    body: 'A matte felt grain keeps custom colors and printed illustrations soft and sculptural.',
    Diagram: MacroPleatDetail,
    diagram: 'pleat',
  },
  {
    index: '03',
    title: 'A grounded stance.',
    body: 'Slim floor supports sit beneath the first and last folds.',
    Diagram: SupportSectionDiagram,
    diagram: 'support',
  },
] as const;

const SPEC_ITEMS = [
  { label: 'Height', value: '1,600 mm', count: 1600 },
  { label: 'Panel pitch', value: '180 mm', count: 180 },
  { label: 'Developed length', value: '2,880 mm', count: 2880 },
  { label: 'Model thickness', value: '12 mm', count: 12 },
] as const;

export const Construction: React.FC = () => {
  return (
    <section
      id="construction"
      className="srf-dark-surface relative bg-[var(--srf-oxblood)] text-[var(--srf-porcelain)] pt-20 pb-24 lg:pt-28 lg:pb-32 scroll-mt-20"
    >
      {/* Pleated edge: the light page above gathers away as the dark room scrolls in */}
      <svg
        data-teeth=""
        aria-hidden="true"
        viewBox="0 0 160 10"
        preserveAspectRatio="none"
        className="srf-teeth"
      >
        <path d={TEETH_PATH} fill="var(--srf-rose)" />
      </svg>

      <div className="srf-container">
        <div className="mb-14 max-w-[680px]">
          <div data-m="scramble" className="mb-3 srf-mono-caption text-[var(--srf-rose)]/75">
            Construction
          </div>
          <h2 data-m="heading" className="srf-h2 text-[var(--srf-porcelain)] text-balance">
            The detail is in the fold.
          </h2>
        </div>

        <div className="divide-y divide-[var(--srf-hairline-dark)] border-t border-b border-[var(--srf-hairline-dark)]">
          {CONSTRUCTION_ROWS.map((row) => {
            const Diagram = row.Diagram;
            return (
              <div
                key={row.index}
                className="py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5">
                  <div data-m="draw">
                    <CreaseMarker
                      index={row.index}
                      className="text-[var(--srf-flax)] mb-3"
                    />
                  </div>
                  <h3 data-m="heading" className="srf-h3 text-[var(--srf-porcelain)] mb-3">
                    {row.title}
                  </h3>
                  <p data-m="lines" data-m-delay="180" className="text-[var(--srf-rose)]/85 max-w-[42ch]">
                    {row.body}
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <div
                    data-m="frame"
                    data-diagram={row.diagram}
                    className="aspect-[21/9] rounded-[8px] border border-[var(--srf-hairline-dark)] overflow-hidden"
                  >
                    <Diagram />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-[var(--srf-hairline-dark)]">
          {SPEC_ITEMS.map((spec) => (
            <div key={spec.label}>
              <span data-m="rule" className="srf-spec-rule" />
              <div data-m="scramble" className="srf-mono-caption text-[var(--srf-rose)]/75 mb-1">
                {spec.label}
              </div>
              <div
                data-m="count"
                data-count={spec.count}
                data-suffix=" mm"
                className="font-[family-name:var(--font-display)] text-2xl lg:text-4xl font-medium text-[var(--srf-porcelain)] tabular-nums"
              >
                {spec.value}
              </div>
            </div>
          ))}
        </div>

        <p data-m="lines" className="mt-5 srf-mono-caption text-[var(--srf-rose)]/75 max-w-[64ch]">
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
