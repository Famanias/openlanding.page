type MarkProps = { className?: string; title?: string };

/**
 * A squircle parcel folding into a forward "K" with an optical mint telemetry dot.
 */
export function Mark({ className, title }: MarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="60" height="60" rx="18" fill="#1B1522" />
      <path d="M20 18V46" stroke="#FAF7F2" strokeWidth="4.5" strokeLinecap="round" />
      <path
        d="M42 20L26 33L44 46"
        stroke="#FF6B2B"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="38" cy="20" r="3.5" fill="#00D4B2" />
    </svg>
  );
}

type LogoProps = { className?: string };

/**
 * Lockup: squircle mark + Bricolage wordmark "kinetic." + MEGAMARKET pill badge.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <Mark className="w-8 h-8 shrink-0" />
      <span className="font-display font-extrabold text-xl tracking-tight text-[#1B1522]">
        kinetic<span className="text-[#FF6B2B]">.</span>
      </span>
      <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-[#FFE6D2] text-[#1B1522]">
        MEGAMARKET
      </span>
    </span>
  );
}
