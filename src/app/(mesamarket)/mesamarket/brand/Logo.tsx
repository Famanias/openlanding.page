export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      <svg
        viewBox="0 0 36 36"
        className="w-9 h-9 shrink-0 drop-shadow-xs"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="18" cy="18" r="16" fill="#D94C32" stroke="#24211D" strokeWidth="2.5" />
        <path
          d="M18 6C18 6 19.5 10 22 11C24.5 12 28 11.5 28 11.5C28 11.5 25.5 14 24 16C22.5 18 22 21 22 21"
          stroke="#3F7047"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="18" cy="18" r="6" fill="#F2C94D" stroke="#24211D" strokeWidth="2" />
        <path d="M15 15L21 21M21 15L15 21" stroke="#24211D" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="mm-display text-2xl font-black tracking-tight text-[#D94C32]">
        MESA MARKET
      </span>
    </div>
  );
}
