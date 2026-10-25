export function Flower({ className = "", petals = 6 }: { className?: string; petals?: number }) {
  return <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    {Array.from({ length: petals }, (_, i) => <ellipse key={i} cx="32" cy="19" rx="8" ry="13" fill="currentColor" transform={`rotate(${i * 360 / petals} 32 32)`} />)}
    <circle cx="32" cy="32" r="6" fill="var(--fl-butter)" />
  </svg>;
}
