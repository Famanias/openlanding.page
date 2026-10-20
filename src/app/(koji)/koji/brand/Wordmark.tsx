/** "KŌJI" set in Dela Gothic One. The macron is part of the name; the kanji 麹 is its shadow. */
export function Wordmark({ as: Tag = "span", className = "" }: { as?: "span" | "h1"; className?: string }) {
  return (
    <Tag className={`kj-wordmark ${className}`}>
      K<span className="kj-wordmark__o">Ō</span>JI
    </Tag>
  );
}
