type LogoProps = {
  className?: string;
  theme?: "light" | "dark" | "accent";
  size?: number;
};

export function Mark({ className, size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="IRIDIA Prism Mark"
    >
      <polygon points="32,8 56,52 8,52" stroke="#F5F3EF" strokeWidth="3" fill="#141724" strokeLinejoin="round" />
      <line x1="32" y1="8" x2="32" y2="52" stroke="#00F0FF" strokeWidth="2" strokeDasharray="3 2" />
      <line x1="18" y1="34" x2="46" y2="34" stroke="#FF3366" strokeWidth="1.8" />
      <circle cx="32" cy="8" r="4.5" fill="#00F0FF" />
    </svg>
  );
}

export function Logo({ className, theme = "dark" }: LogoProps) {
  const textColor = theme === "light" ? "#0A0B10" : "#F5F3EF";
  const subColor = theme === "light" ? "#141724" : "#8D93A8";

  return (
    <div className={`inline-flex items-center gap-3.5 ${className ?? ""}`} aria-label="IRIDIA Brand Logo">
      <Mark size={32} />
      <div className="flex flex-col">
        <span
          className="font-display text-xl font-bold tracking-widest leading-none"
          style={{ color: textColor }}
        >
          IRIDIA
        </span>
        <span
          className="font-mono text-[9px] tracking-[0.24em] uppercase leading-tight mt-1"
          style={{ color: subColor }}
        >
          Prismatic Foundry
        </span>
      </div>
    </div>
  );
}
