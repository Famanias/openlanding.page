/** Mono label that slides in from the side of its line. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`au-eyebrow ${className ?? ""}`} data-reveal="slide">
      {children}
    </p>
  );
}
