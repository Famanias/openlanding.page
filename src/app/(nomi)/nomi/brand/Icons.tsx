import type { SceneId } from "../launch/scenes";

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function SceneIcon({ id, className }: { id: SceneId } & IconProps) {
  switch (id) {
    case "inbox":
      return (
        <svg {...base} className={className}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="3" />
          <path d="m5 8 7 5 7-5" />
        </svg>
      );
    case "schedule":
      return (
        <svg {...base} className={className}>
          <rect x="4" y="5.5" width="16" height="14" rx="3" />
          <path d="M8 3.5v4M16 3.5v4M4 10.5h16" />
        </svg>
      );
    case "progress":
      return (
        <svg {...base} className={className}>
          <path d="M4 18.5h16" />
          <path d="m6 15 4-4.5 3 2.5 5-6" />
        </svg>
      );
    case "payments":
      return (
        <svg {...base} className={className}>
          <rect x="3.5" y="6" width="17" height="12" rx="3" />
          <path d="M3.5 10.5h17M7 15h3" />
        </svg>
      );
  }
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.2} className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" pathLength={1} />
    </svg>
  );
}
