"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { CAMPS } from "./camps";

/** The Abruzzi Spur, from base camp on the Godwin-Austen Glacier (lower right) up the SE ridge to the summit. */
const ROUTE =
  "M860 905 C 850 840, 836 760, 820 690 S 786 572, 768 520 S 742 448, 732 404 S 714 346, 702 318 " +
  "C 690 300, 668 292, 640 284 S 590 258, 572 232 S 540 178, 522 146";

type Point = { x: number; y: number };

/**
 * K2 from Concordia: the classic south-face pyramid above the Baltoro and Godwin-Austen glaciers.
 * Hand-drawn in palette tints only. `progress` (0..1) moves the climber along the route.
 */
export function K2Silhouette({ progress }: { progress: number }) {
  const routeRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);
  const [camps, setCamps] = useState<Point[]>([]);

  useLayoutEffect(() => {
    const path = routeRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    setLength(total);
    setCamps(CAMPS.map((_, i) => path.getPointAtLength((i / (CAMPS.length - 1)) * total)));
  }, []);

  const climber = length && routeRef.current ? routeRef.current.getPointAtLength(progress * length) : { x: 860, y: 905 };

  return (
    <svg className="crn-k2" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      {/* Distant Karakoram ridges */}
      <path d="M-700 760 L-480 700 L-260 742 L-80 690 L0 770 L70 720 L140 745 L215 680 L300 724 L360 690 L360 1000 L-700 1000Z" fill="#16294A" />
      <path d="M1700 750 L1480 690 L1260 735 L1080 684 L1000 760 L940 706 L880 735 L815 676 L760 712 L760 1000 L1700 1000Z" fill="#16294A" />

      {/* K2: lit east face */}
      <path
        d="M522 146 L548 186 L572 232 L600 262 L650 282 L702 300 L730 346 L762 402 L792 462 L832 532 L882 612 L942 690 L1000 736 L1120 790 L1700 840 L1700 1000 L-700 1000 L-700 850 L-200 830 L0 806 L92 742 L172 662 L242 582 L302 502 L352 432 L394 362 L432 302 L458 252 L490 192 Z"
        fill="#2A3D5E"
      />
      {/* K2: shadowed south-west face */}
      <path
        d="M522 146 L490 192 L458 252 L432 302 L394 362 L352 432 L302 502 L242 582 L172 662 L92 742 L0 806 L-200 830 L-700 850 L-700 1000 L430 1000 L452 770 L478 560 L500 400 L514 262 Z"
        fill="#16294A"
      />
      {/* Snow: summit cap, shoulder, couloirs */}
      <path d="M522 146 L548 186 L538 202 L524 192 L511 214 L499 197 L490 192 Z" fill="#F5F6F7" />
      <path d="M600 262 L650 282 L702 300 L694 314 L648 302 L604 284 Z" fill="#DDE1E7" />
      <path d="M514 262 L506 330 L500 400 L494 470 L488 540" stroke="#A5AEBD" strokeWidth="3" fill="none" opacity="0.55" />
      <path d="M560 300 L552 380 L548 470 L540 560" stroke="#A5AEBD" strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M640 340 L628 420 L618 520" stroke="#A5AEBD" strokeWidth="2" fill="none" opacity="0.35" />

      {/* Glacier foreground with moraine stripes */}
      <path d="M-700 896 L0 900 L190 878 L420 906 L640 884 L830 902 L1000 888 L1700 896 L1700 1000 L-700 1000Z" fill="#0B0C0E" />
      <path d="M-700 945 C 0 935, 300 925, 600 950 S 1300 925, 1700 940" stroke="#2A3D5E" strokeWidth="2" fill="none" />
      <path d="M-700 975 C 0 966, 320 958, 640 982 S 1300 958, 1700 970" stroke="#2A3D5E" strokeWidth="1.5" fill="none" />

      {/* Route: full path dashed, climbed portion solid */}
      <path ref={routeRef} d={ROUTE} className="crn-k2__route" />
      <path
        d={ROUTE}
        className="crn-k2__climbed"
        style={length ? { strokeDasharray: length, strokeDashoffset: length * (1 - progress) } : { opacity: 0 }}
      />

      {/* Camp markers */}
      {camps.map((p, i) => (
        <g key={CAMPS[i].id} className="crn-k2__camp" data-reached={progress >= i / (CAMPS.length - 1) - 0.0001 ? "" : undefined}>
          <circle cx={p.x} cy={p.y} r={5} />
        </g>
      ))}

      {/* Climber */}
      <g className="crn-k2__climber" transform={`translate(${climber.x} ${climber.y})`}>
        <circle r={16} className="crn-k2__halo" />
        <circle r={6.5} />
      </g>
    </svg>
  );
}
