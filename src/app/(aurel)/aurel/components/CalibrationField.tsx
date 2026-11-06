'use client';

import React from 'react';

interface CalibrationFieldProps {
  variant?: 'hero' | 'origin' | 'manifesto' | 'cta';
  className?: string;
}

export const CalibrationField: React.FC<CalibrationFieldProps> = ({
  variant = 'hero',
  className = '',
}) => {
  if (variant === 'hero') {
    // Generate 180 precision radial ticks around the main calibration ring (r = 398)
    const ticks = Array.from({ length: 180 }, (_, i) => {
      const angleDeg = i * 2;
      const isMajor = i % 5 === 0;
      const isCardinal = i % 45 === 0;
      const rInner = isCardinal ? 383 : isMajor ? 387 : 390;
      const rOuter = isCardinal ? 403 : 398;
      const rad = (angleDeg * Math.PI) / 180;
      const cx = 720;
      const cy = 480;
      const x1 = cx + rInner * Math.cos(rad);
      const y1 = cy + rInner * Math.sin(rad);
      const x2 = cx + rOuter * Math.cos(rad);
      const y2 = cy + rOuter * Math.sin(rad);
      return {
        key: i,
        x1: x1.toFixed(2),
        y1: y1.toFixed(2),
        x2: x2.toFixed(2),
        y2: y2.toFixed(2),
        opacity: isCardinal ? 0.65 : isMajor ? 0.42 : 0.24,
        strokeWidth: isCardinal ? 1.2 : 0.75,
      };
    });

    // Horizontal ruler graduations across y = 480
    const hGraduations = Array.from({ length: 41 }, (_, i) => {
      const x = 440 + i * 14;
      const isMajor = i % 5 === 0;
      const halfH = isMajor ? 6 : 2.5;
      return { x, halfH, isMajor };
    });

    // Vertical ruler graduations across x = 720
    const vGraduations = Array.from({ length: 33 }, (_, i) => {
      const y = 256 + i * 14;
      const isMajor = i % 4 === 0;
      const halfW = isMajor ? 6 : 2.5;
      return { y, halfW, isMajor };
    });

    return (
      <div
        className={`pointer-events-none select-none overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 960"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Outermost structural rings matching reference screenshot */}
          <circle
            cx="720"
            cy="480"
            r="650"
            stroke="#374047"
            strokeWidth="0.8"
            strokeOpacity="0.45"
          />
          <circle
            cx="720"
            cy="480"
            r="532"
            stroke="#9DB8C9"
            strokeWidth="0.9"
            strokeOpacity="0.34"
          />
          <circle
            cx="720"
            cy="480"
            r="514"
            stroke="#9DB8C9"
            strokeWidth="0.7"
            strokeOpacity="0.22"
          />

          {/* Tangential geometric construction lines on left and right arcs */}
          <line
            x1="286"
            y1="195"
            x2="210"
            y2="375"
            stroke="#9DB8C9"
            strokeWidth="0.75"
            strokeOpacity="0.26"
          />
          <line
            x1="192"
            y1="432"
            x2="262"
            y2="564"
            stroke="#374047"
            strokeWidth="0.75"
            strokeOpacity="0.45"
          />
          <line
            x1="1154"
            y1="195"
            x2="1230"
            y2="375"
            stroke="#9DB8C9"
            strokeWidth="0.75"
            strokeOpacity="0.26"
          />
          <line
            x1="1248"
            y1="432"
            x2="1178"
            y2="564"
            stroke="#9DB8C9"
            strokeWidth="0.75"
            strokeOpacity="0.26"
          />

          {/* Outer calibration tick ring enclosure */}
          <circle
            cx="720"
            cy="480"
            r="410"
            stroke="#374047"
            strokeWidth="0.85"
            strokeOpacity="0.55"
          />
          <circle
            cx="720"
            cy="480"
            r="376"
            stroke="#374047"
            strokeWidth="0.75"
            strokeOpacity="0.45"
          />

          {/* Rotating subtle tick track */}
          <g className=" origin-[720px_480px] animate-ring-crawl">
            {ticks.map((t) => (
              <line
                key={t.key}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="#C7CDD2"
                strokeWidth={t.strokeWidth}
                strokeOpacity={t.opacity}
              />
            ))}
          </g>

          {/* Secondary offset metrology circle on the left (as seen in hero screenshot) */}
          <circle
            cx="492"
            cy="480"
            r="68"
            stroke="#9DB8C9"
            strokeWidth="0.8"
            strokeOpacity="0.28"
          />
          {/* Inner technical ring framing the watch head */}
          <circle
            cx="720"
            cy="480"
            r="236"
            stroke="#9DB8C9"
            strokeWidth="0.8"
            strokeOpacity="0.26"
          />
          <circle
            cx="720"
            cy="480"
            r="192"
            stroke="#374047"
            strokeWidth="0.7"
            strokeOpacity="0.35"
          />

          {/* Diagonal axis hairlines through center */}
          <line
            x1="530"
            y1="290"
            x2="910"
            y2="670"
            stroke="#374047"
            strokeWidth="0.7"
            strokeOpacity="0.32"
          />
          <line
            x1="530"
            y1="670"
            x2="910"
            y2="290"
            stroke="#374047"
            strokeWidth="0.7"
            strokeOpacity="0.32"
          />

          {/* Horizontal cardinal axis and fine scale graduations */}
          <line
            x1="108"
            y1="480"
            x2="306"
            y2="480"
            stroke="#374047"
            strokeWidth="0.75"
            strokeOpacity="0.45"
          />
          <line
            x1="1134"
            y1="480"
            x2="1332"
            y2="480"
            stroke="#374047"
            strokeWidth="0.75"
            strokeOpacity="0.45"
          />
          <line
            x1="406"
            y1="480"
            x2="1034"
            y2="480"
            stroke="#9DB8C9"
            strokeWidth="0.7"
            strokeOpacity="0.24"
          />
          {hGraduations.map((g, idx) => (
            <line
              key={`hg-${idx}`}
              x1={g.x}
              y1={480 - g.halfH}
              x2={g.x}
              y2={480 + g.halfH}
              stroke="#9DB8C9"
              strokeWidth={g.isMajor ? '0.8' : '0.6'}
              strokeOpacity={g.isMajor ? '0.32' : '0.18'}
            />
          ))}

          {/* Vertical axis and fine scale graduations */}
          <line
            x1="720"
            y1="215"
            x2="720"
            y2="765"
            stroke="#9DB8C9"
            strokeWidth="0.7"
            strokeOpacity="0.24"
          />
          {vGraduations.map((g, idx) => (
            <line
              key={`vg-${idx}`}
              x1={720 - g.halfW}
              y1={g.y}
              x2={720 + g.halfW}
              y2={g.y}
              stroke="#9DB8C9"
              strokeWidth={g.isMajor ? '0.8' : '0.6'}
              strokeOpacity={g.isMajor ? '0.32' : '0.18'}
            />
          ))}
        </svg>
      </div>
    );
  }

  if (variant === 'origin') {
    return (
      <div
        className={`pointer-events-none select-none overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle
            cx="600"
            cy="400"
            r="360"
            stroke="#374047"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
          <circle
            cx="600"
            cy="400"
            r="295"
            stroke="#9DB8C9"
            strokeWidth="0.8"
            strokeOpacity="0.25"
            strokeDasharray="6 10"
          />
          <line
            x1="120"
            y1="400"
            x2="1080"
            y2="400"
            stroke="#374047"
            strokeWidth="0.7"
            strokeOpacity="0.3"
          />
          <line
            x1="600"
            y1="40"
            x2="600"
            y2="760"
            stroke="#374047"
            strokeWidth="0.7"
            strokeOpacity="0.3"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'manifesto') {
    return (
      <div
        className={`pointer-events-none select-none overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle
            cx="500"
            cy="500"
            r="430"
            stroke="#374047"
            strokeWidth="0.9"
            strokeOpacity="0.55"
          />
          <circle
            cx="500"
            cy="500"
            r="392"
            stroke="#9DB8C9"
            strokeWidth="0.75"
            strokeOpacity="0.28"
          />
          <path
            d="M 500 50 A 450 450 0 0 1 950 500"
            stroke="#9DB8C9"
            strokeWidth="1"
            strokeOpacity="0.45"
          />
          <path
            d="M 500 950 A 450 450 0 0 1 50 500"
            stroke="#9DB8C9"
            strokeWidth="1"
            strokeOpacity="0.32"
          />
          {/* Cardinal ticks */}
          <line x1="500" y1="45" x2="500" y2="95" stroke="#9DB8C9" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="500" y1="905" x2="500" y2="955" stroke="#9DB8C9" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="45" y1="500" x2="95" y2="500" stroke="#9DB8C9" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="905" y1="500" x2="955" y2="500" stroke="#9DB8C9" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
      </div>
    );
  }

  // 'cta' incomplete calibration ring
  return (
    <div
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M 190 740 A 410 410 0 1 1 845 710"
          stroke="#9DB8C9"
          strokeWidth="1"
          strokeOpacity="0.38"
        />
        <circle
          cx="500"
          cy="500"
          r="355"
          stroke="#374047"
          strokeWidth="0.75"
          strokeOpacity="0.45"
        />
        <line x1="500" y1="65" x2="500" y2="120" stroke="#9DB8C9" strokeWidth="1" strokeOpacity="0.55" />
        <line x1="90" y1="500" x2="145" y2="500" stroke="#374047" strokeWidth="0.8" strokeOpacity="0.5" />
        <line x1="855" y1="500" x2="910" y2="500" stroke="#374047" strokeWidth="0.8" strokeOpacity="0.5" />
      </svg>
    </div>
  );
};
