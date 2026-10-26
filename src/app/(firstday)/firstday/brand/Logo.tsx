export function DoorMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 33V12h22v21M16 33V20h8v13M20 3v5M3 20h5M32 20h5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function Logo() {
  return (
    <span className="fd-logo">
      <DoorMark />
      <span>
        firstday<span className="fd-logo-dot">.</span>
      </span>
    </span>
  );
}
