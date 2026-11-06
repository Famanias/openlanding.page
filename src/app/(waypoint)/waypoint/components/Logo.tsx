import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 28 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className="flex items-center justify-center rounded-xl bg-[#121417] text-[#F5EFEB] shadow-sm transition-transform hover:scale-105"
        style={{ width: size, height: size }}
      >
        <svg
          width={Math.round(size * 0.58)}
          height={Math.round(size * 0.58)}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2L13 13L8 10.5L3 13L8 2Z"
            fill="#F5EFEB"
            stroke="#F5EFEB"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="10.5" r="1" fill="#DBE8FA" />
        </svg>
      </div>
      <span className="text-[17px] font-extrabold tracking-[-0.03em] text-[#121417]">
        Waypoint
      </span>
    </div>
  );
}
