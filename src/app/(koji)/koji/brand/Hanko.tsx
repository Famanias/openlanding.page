/** The red hanko seal bearing 麹 (kōji). Used as the icon, the stamp on the menu and the footer mark. */
export function Hanko({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={`kj-hanko ${className}`} width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="KŌJI seal: 麹">
      <rect x="2" y="2" width="60" height="60" rx="4" fill="#C8331F" />
      <rect x="6" y="6" width="52" height="52" rx="2" fill="none" stroke="#EDEAE4" strokeWidth="2" />
      <text
        x="32"
        y="44"
        textAnchor="middle"
        fontSize="34"
        fill="#EDEAE4"
        style={{ fontFamily: "var(--font-dela-gothic), serif" }}
      >
        麹
      </text>
    </svg>
  );
}
